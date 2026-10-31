import { useEffect, useRef, useState } from 'react'
import { useApp } from '../lib/app-context'
import { navigate } from '../lib/router'
import { REPLAY_SCRIPTS, replayById, type ReplayScript } from '../data/replays'
import { paperDocById } from '../data/documents'
import { NOTICE_FIELDS, NOTICE_NEXT_STEPS } from '../data/notice-interpretation'
import { buildFinding, factsFromRows } from '../lib/matter-facts'
import { LANGUAGES } from '../data/languages'
import { AppShell } from '../components/ui/shell'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Chip } from '../components/ui/Chip'
import { Thread } from '../components/chat/Thread'
import { MessageBubble } from '../components/chat/MessageBubble'
import { StreamText } from '../components/chat/StreamText'
import { FindingCard } from '../components/cards/FindingCard'
import { ActionLadder } from '../components/cards/ActionLadder'
import { CautionCard } from '../components/cards/CautionCard'
import { FactCheckCard, type FactItem } from '../components/cards/FactCheckCard'
import { HandoverCard } from '../components/cards/HandoverCard'
import { ProtectiveCard } from '../components/stop/ProtectiveCard'
import { DocumentPaper } from '../components/documents/DocumentPaper'
import { VoiceOrb } from '../components/voice/VoiceOrb'
import { IconDoc, IconPlay } from '../components/ui/icons'

/**
 * Replay mode: a prepared conversation plays itself with simulated HUMAN
 * actions — thinking pauses, char-by-char typing with punctuation and
 * hesitation beats, tapping a reply chip, the voice beat, sending a document.
 * The viewer watches (play/pause/restart/speed). Nothing is live.
 */

type ReplayCardKind =
  | 'factcheck'
  | 'finding'
  | 'ladder'
  | 'caution'
  | 'protective'
  | 'handover'
  | 'noticecard'
  | 'noticeSummary'

type ReplayItem =
  | { id: number; kind: 'user'; text: string }
  | { id: number; kind: 'assistant'; text: string; stream?: boolean }
  | { id: number; kind: 'system'; text: string }
  | { id: number; kind: 'chips'; question: string; options: string[]; select: number; tapped: boolean }
  | { id: number; kind: 'voice'; seconds: number; transcript: string; revealed: boolean }
  | { id: number; kind: 'document'; docId: string }
  | { id: number; kind: 'card'; card: ReplayCardKind; why?: string; mode?: 'full' | 'free'; facts?: FactItem[] }

const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

const streamMs = (text: string) => text.split(/\s+/).length * 45 + 600

/** Omit that distributes over the union (plain Omit collapses it). */
type DistOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

/**
 * Human typing pacing (deterministic): a base beat per character, extra time
 * after punctuation and spaces, and a hesitation beat every 9th character —
 * the rhythm of someone typing on a phone in their second script.
 */
function charDelay(text: string, i: number): number {
  let d = 42
  const prev = text[i - 1]
  if (prev && /[,.;:!?।]/.test(prev)) d += 110
  else if (prev === ' ') d += 26
  if (i > 0 && i % 9 === 0) d += 170
  return d
}

export default function ReplayPage({ id }: { id?: string }) {
  const script = replayById(id)
  if (!id) return <ReplayPicker />
  if (!script) return <ReplayPicker missing />
  return <ReplayPlayer key={script.id} script={script} />
}

const outcomeTone = { proceed: 'brand', notice: 'neutral', caution: 'warning', stop: 'danger' } as const

function ReplayPicker({ missing = false }: { missing?: boolean }) {
  const { tr } = useApp()
  return (
    <AppShell showTabs={false} onBack={() => navigate('/')}>
      <div className="scroll-calm flex-1 overflow-y-auto px-4 py-5">
        <div className="mx-auto flex max-w-[340px] flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-fg-primary">{tr('replayBadge')}</h1>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-secondary">{tr('replayHint')}</p>
          </div>
          {missing && <p className="text-sm text-fg-tertiary">Unknown replay.</p>}
          {REPLAY_SCRIPTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => navigate(`/replay/${s.id}`)}
              className="pressable bg-card rounded-[22px] p-4 text-start"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={outcomeTone[s.outcome]} variant="outline">
                  {s.outcome === 'proceed'
                    ? tr('tierProceed')
                    : s.outcome === 'notice'
                      ? tr('chipNotice')
                      : s.outcome === 'caution'
                        ? tr('tierCaution')
                        : tr('tierHardStop')}
                </Badge>
                <span className="text-2xs font-semibold text-fg-tertiary">{LANGUAGES[s.lang].native}</span>
                <span className="text-2xs text-fg-tertiary">· {s.mode === 'voice' ? tr('listen') : tr('typeInstead')}</span>
              </div>
              <p className="mt-2 text-base font-semibold text-fg-primary">{s.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-secondary" lang="en">{s.blurb}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-2xs font-semibold text-brand-fg">
                <IconPlay className="size-3.5" /> {tr('replayPlay')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  )
}

export function ReplayPlayer({ script }: { script: ReplayScript }) {
  const { tr, lang: appLang, setLang } = useApp()
  const [items, setItems] = useState<ReplayItem[]>([])
  const [typing, setTyping] = useState('')
  const [playing, setPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [finished, setFinished] = useState(false)
  /** bumped by restart to tear down the running loop (state, not a ref:
      a ref in the deps array would restart the loop on every render) */
  const [runToken, setRunToken] = useState(0)
  const idRef = useRef(0)
  const stepRef = useRef(0)
  const speedRef = useRef(1)
  speedRef.current = speed

  /* Full immersion: the replay plays as that user would see it — chrome,
     cards and reassurance all in the script's language. Transient, not
     persisted: a reload mid-replay never rewrites the viewer's own setting,
     and leaving restores it. */
  const restoreLangRef = useRef(appLang)
  useEffect(() => {
    setLang(script.lang, false)
    return () => setLang(restoreLangRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [script.lang])

  const nextId = () => ++idRef.current
  const push = (item: DistOmit<ReplayItem, 'id'>) => {
    const id = nextId()
    setItems((prev) => [...prev, { ...item, id } as ReplayItem])
    return id
  }
  const patch = (id: number, change: Partial<ReplayItem>) =>
    setItems((prev) => prev.map((i) => (i.id === id ? ({ ...i, ...change } as ReplayItem) : i)))

  /* the replay's cards are built from the SAME builders as the live thread,
     fed the script's facts — the theater and the product can never disagree */
  const replayFacts = factsFromRows(script.facts ?? [])
  const replayFinding = buildFinding(replayFacts, script.lang)

  useEffect(() => {
    if (!playing) return
    let dead = false
    const alive = () => !dead

    const run = async () => {
      const steps = script.steps
      while (!dead && stepRef.current < steps.length) {
        const step = steps[stepRef.current]!
        const s = speedRef.current
        switch (step.kind) {
          case 'think':
          case 'pause': {
            await sleep(step.ms / s)
            break
          }
          case 'typing': {
            for (let i = 0; i < step.text.length; i++) {
              if (!alive()) return
              await sleep(charDelay(step.text, i) / s)
              if (!alive()) return
              setTyping(step.text.slice(0, i + 1))
            }
            if (!alive()) return
            await sleep(420 / s)
            push({ kind: 'user', text: step.text })
            setTyping('')
            await sleep(500 / s)
            break
          }
          case 'assistant': {
            if (!alive()) return
            const itemId = push({ kind: 'assistant', text: step.text, stream: step.stream ?? false })
            await sleep((step.stream ? streamMs(step.text) : 320) / s)
            if (!alive()) return
            if (step.stream) patch(itemId, { stream: false })
            await sleep(320 / s)
            break
          }
          case 'system': {
            if (!alive()) return
            push({ kind: 'system', text: step.text })
            await sleep(600 / s)
            break
          }
          case 'chips': {
            if (!alive()) return
            const itemId = push({
              kind: 'chips',
              question: step.question,
              options: step.options,
              select: step.select,
              tapped: false,
            })
            await sleep(900 / s)
            if (!alive()) return
            patch(itemId, { tapped: true })
            await sleep(560 / s)
            if (!alive()) return
            push({ kind: 'user', text: step.options[step.select]! })
            setItems((prev) => prev.filter((i) => i.id !== itemId))
            await sleep(400 / s)
            break
          }
          case 'voice': {
            if (!alive()) return
            const itemId = push({
              kind: 'voice',
              seconds: step.seconds,
              transcript: step.transcript,
              revealed: false,
            })
            await sleep((step.seconds * 1000 + 700) / s)
            if (!alive()) return
            patch(itemId, { revealed: true })
            await sleep(1400 / s)
            if (!alive()) return
            push({ kind: 'user', text: step.transcript })
            await sleep(500 / s)
            break
          }
          case 'document': {
            if (!alive()) return
            push({ kind: 'document', docId: step.doc })
            await sleep(1200 / s)
            break
          }
          case 'card': {
            if (!alive()) return
            const itemId = push({
              kind: 'card',
              card: step.card,
              why: step.why,
              mode: 'mode' in step ? step.mode : undefined,
              facts: step.card === 'factcheck' ? script.facts : undefined,
            })
            // the human-correction beat (deep-audit §6b): the simulated
            // human catches a wrong fact in the gate and fixes it — proof
            // of WHY the gate exists
            if (step.card === 'factcheck' && step.correction && script.facts) {
              await sleep((step.correctionAfterMs ?? 1600) / s)
              if (!alive()) return
              patch(itemId, {
                facts: script.facts.map((f) =>
                  f.key === step.correction!.key ? { ...f, value: step.correction!.value } : f,
                ),
              })
              await sleep(900 / s)
            }
            await sleep((step.card === 'factcheck' ? 1700 : 900) / s)
            break
          }
        }
        if (!alive()) return
        stepRef.current += 1
      }
      if (alive()) {
        setPlaying(false)
        setFinished(true)
      }
    }
    void run()
    return () => {
      dead = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, runToken])

  const restart = () => {
    stepRef.current = 0
    idRef.current = 0
    setItems([])
    setTyping('')
    setFinished(false)
    setPlaying(true)
    setRunToken((t) => t + 1)
  }

  const progress = Math.round((stepRef.current / script.steps.length) * 100)

  return (
    <AppShell
      showTabs={false}
      onBack={() => navigate('/replay')}
      title={LANGUAGES[script.lang].native}
      topBarExtra={<Badge tone="brand" variant="outline">{tr('replayBadge')}</Badge>}
      footer={
        <div className="rounded-[26px] bg-sunken px-4 py-3">
          {typing ? (
            <p className="min-h-6 truncate text-base text-fg-primary" aria-label="Simulated typing">
              {typing}
              <span className="stream-caret" aria-hidden="true" />
            </p>
          ) : (
            <p className="min-h-6 text-base text-fg-tertiary">
              {finished ? tr('replayFinished') : tr('replayHint')}
            </p>
          )}
        </div>
      }
    >
      <div className="flex min-h-0 flex-1 flex-col">
        {/* player control bar */}
        <div className="flex items-center gap-2 border-b border-line-default bg-shell px-3.5 py-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPlaying((p) => !p)}
            disabled={finished}
          >
            {playing ? tr('replayPause') : tr('replayPlay')}
          </Button>
          <Button variant="ghost" size="sm" onClick={restart}>
            {tr('replayRestart')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSpeed((v) => (v === 1 ? 1.5 : v === 1.5 ? 2 : 1))}
            aria-pressed={speed !== 1}
          >
            {speed}×
          </Button>
          <div className="ms-auto flex min-w-8 items-center gap-1.5">
            <div className="h-1 w-16 overflow-hidden rounded-full bg-sunken" aria-hidden="true">
              {/* transform-only: scaleX instead of animated width (DESIGN-AUDIT P3) */}
              <div
                className="h-full w-full origin-left rounded-full bg-brand-solid transition-transform duration-300"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>
            <span className="text-2xs tabular-nums text-fg-tertiary">{progress}%</span>
          </div>
        </div>

        <Thread scrollKey={`${items.length}-${typing.length}-${playing}`} autoScroll>
          <div className="flex flex-col gap-1 px-3.5 pb-6 pt-3">
            <p className="mb-1 text-lg font-semibold text-fg-primary">{script.label}</p>
            <p className="mb-2 text-sm leading-relaxed text-fg-secondary" lang="en">
              {script.blurb}
            </p>

            {items.map((item) => {
              switch (item.kind) {
                case 'user':
                  return (
                    <MessageBubble key={item.id} role="user">
                      {item.text}
                    </MessageBubble>
                  )
                case 'assistant':
                  return (
                    <MessageBubble key={item.id} role="assistant">
                      {item.stream ? (
                        <p className="whitespace-pre-line text-sm leading-relaxed">
                          <StreamText
                            text={item.text}
                            onDone={() => patch(item.id, { stream: false })}
                          />
                        </p>
                      ) : (
                        <p className="whitespace-pre-line text-sm leading-relaxed">{item.text}</p>
                      )}
                    </MessageBubble>
                  )
                case 'system':
                  return (
                    <MessageBubble key={item.id} role="system">
                      {item.text}
                    </MessageBubble>
                  )
                case 'chips':
                  return (
                    <div key={item.id} className="flex flex-col gap-2.5 ps-7">
                      <p className="text-sm font-medium text-fg-primary">{item.question}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.options.map((o, idx) => (
                          <Chip key={o} selected={item.tapped && idx === item.select}>
                            {o}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )
                case 'voice':
                  return (
                    <MessageBubble key={item.id} role="assistant">
                      <Card className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <VoiceOrb state={item.revealed ? 'idle' : 'listening'} size="md" />
                          <span className="font-mono text-2xs text-fg-tertiary" lang="en">
                            0:0{item.seconds} / 0:0{item.seconds}
                          </span>
                          <Badge tone="warning" variant="subtle">{tr('simulatedTag')}</Badge>
                        </div>
                        <div className="waveform" aria-hidden="true">
                          {Array.from({ length: 24 }, (_, i) => (
                            <span key={i} className="wave-bar" />
                          ))}
                        </div>
                        {item.revealed && (
                          <p className="text-sm leading-relaxed text-fg-primary">
                            “{item.transcript}”
                          </p>
                        )}
                      </Card>
                    </MessageBubble>
                  )
                case 'document': {
                  const doc = paperDocById(item.docId)
                  if (!doc) return null
                  return (
                    <div key={item.id} className="flex flex-col items-end gap-2">
                      <MessageBubble role="user">
                        <span className="inline-flex items-center gap-1.5">
                          <IconDoc className="size-3.5 shrink-0" />
                          {doc.fileName}
                        </span>
                      </MessageBubble>
                      <div className="w-full">
                        <DocumentPaper doc={doc} />
                      </div>
                    </div>
                  )
                }
                case 'card':
                  if (item.card === 'factcheck')
                    return (
                      <MessageBubble key={item.id} role="assistant">
                        <FactCheckCard
                          key={JSON.stringify(item.facts ?? script.facts ?? [])}
                          facts={item.facts ?? script.facts ?? []}
                          onConfirm={() => {
                            /* simulated tap: the script continues */
                          }}
                        />
                      </MessageBubble>
                    )
                  if (item.card === 'finding')
                    return (
                      <MessageBubble key={item.id} role="assistant">
                        <FindingCard data={replayFinding} />
                      </MessageBubble>
                    )
                  if (item.card === 'ladder')
                    return (
                      <div key={item.id} className="ps-7">
                        <ActionLadder mode={item.mode ?? 'full'} onOpenNotice={() => navigate('/notice')} facts={replayFacts} />
                      </div>
                    )
                  if (item.card === 'caution')
                    return (
                      <MessageBubble key={item.id} role="assistant">
                        <CautionCard />
                      </MessageBubble>
                    )
                  if (item.card === 'noticecard')
                    return (
                      <MessageBubble key={item.id} role="assistant">
                        <Card className="flex flex-col gap-2.5">
                          <h3 className="text-lg font-semibold text-fg-primary">
                            {tr('noticeCardTitle')}
                          </h3>
                          <p className="text-sm leading-relaxed text-fg-secondary">{tr('noticeCardBody')}</p>
                          <Button variant="primary" size="sm" className="self-start" onClick={() => navigate('/notice')}>
                            {tr('noticeCardOpen')}
                          </Button>
                        </Card>
                      </MessageBubble>
                    )
                  if (item.card === 'noticeSummary')
                    return (
                      <MessageBubble key={item.id} role="assistant">
                        <NoticeSummaryCard />
                      </MessageBubble>
                    )
                  if (item.card === 'protective')
                    return (
                      <MessageBubble key={item.id} role="assistant">
                        <ProtectiveCard
                          decision={{ tier: 'hard-stop', label: 'Threats and intimidation', why: item.why ?? '', certainty: 'matched' }}
                          onOpenGuide={() => navigate('/')}
                          onReRoute={() => navigate('/')}
                        />
                      </MessageBubble>
                    )
                  return (
                    <div key={item.id} className="ps-7">
                      <HandoverCard tierLabel={tr('tierHardStop')} why={item.why ?? ''} />
                    </div>
                  )
                default:
                  return null
              }
            })}
          </div>
        </Thread>
      </div>
    </AppShell>
  )
}

/** Static reading of the interpreter's key points (the editable live version lives on the notice page). */
function NoticeSummaryCard() {
  const { tr } = useApp()
  return (
    <Card className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-fg-primary">{tr('keyPoints')}</h3>
      <ol className="flex flex-col gap-2">
        {NOTICE_FIELDS.map((field, i) => (
          <li key={field.id}>
            <div className="flex items-center gap-3 rounded-xl bg-sunken px-3 py-2.5">
              <span
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-2xs font-semibold tabular-nums text-on-brand-subtle"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-2xs text-fg-tertiary" lang="en">{field.label}</span>
                <span className="block text-sm font-medium text-fg-primary" lang="en">{field.value}</span>
              </span>
              {field.confidence !== 'clear' && (
                <Badge tone="warning" variant="subtle">{tr('confLikely')}</Badge>
              )}
            </div>
          </li>
        ))}
      </ol>
      <div className="flex flex-col gap-1.5">
        <p className="text-2xs font-semibold text-fg-secondary">{tr('whatNext')}</p>
        {NOTICE_NEXT_STEPS.map((step) => (
          <div key={step.id} className="rounded-xl border border-line-default px-3.5 py-2.5 text-sm text-fg-primary" lang="en">
            {step.label}
          </div>
        ))}
      </div>
      <Button variant="primary" size="sm" className="self-start" onClick={() => navigate('/notice')}>
        {tr('noticeCardOpen')}
      </Button>
    </Card>
  )
}
