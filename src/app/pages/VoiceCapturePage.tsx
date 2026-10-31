import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import { useApp } from '../lib/app-context'
import { navigate } from '../lib/router'
import { LANG_ORDER, LANGUAGES, type LangCode } from '../data/languages'
import { VOICE_SAMPLES, formatClock } from '../data/voice-samples'
import { extractFacts } from '../lib/matter-facts'
import { ISSUE_LABELS } from '../data/localized-content'
import { AppShell } from '../components/ui/shell'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { VoiceOrb } from '../components/voice/VoiceOrb'
import { ListGroup } from '../components/ui/ListGroup'
import { IconCamera, IconCheck, IconChevronRight, IconClock, IconGlobe, IconSend, IconX } from '../components/ui/icons'

type CaptureState = 'listening' | 'review'

/**
 * Simulated voice capture (Phase V): listening (timer + waveform, mic never
 * touched) -> review & send ("Here's what I heard", editable transcript).
 * The whole surface is tagged simulated (A7).
 */
export default function VoiceCapturePage() {
  const { tr, lang, setLang } = useApp()
  const [phase, setPhase] = useState<CaptureState>('listening')
  const [seconds, setSeconds] = useState(0)
  const [transcript, setTranscript] = useState(VOICE_SAMPLES[lang] ?? VOICE_SAMPLES.en!)
  const [detected, setDetected] = useState<LangCode | 'auto'>(lang)
  const secondsRef = useRef(0)

  useEffect(() => {
    if (phase !== 'listening') return
    const t = window.setInterval(() => {
      secondsRef.current += 1
      setSeconds(secondsRef.current)
    }, 1000)
    return () => window.clearInterval(t)
  }, [phase])

  /* simulated live transcript: words land at a speaking pace */
  const liveWords = (VOICE_SAMPLES[lang] ?? VOICE_SAMPLES.en!).split(/\s+/)
  const [shownWords, setShownWords] = useState(0)
  useEffect(() => {
    if (phase !== 'listening') return
    const t = window.setInterval(() => setShownWords((n) => Math.min(liveWords.length, n + 1)), 280)
    return () => window.clearInterval(t)
  }, [phase, liveWords.length])

  const stop = () => setPhase('review')

  const send = () => {
    const text = transcript.trim()
    if (!text) {
      toast.error(tr('errorTitle'))
      return
    }
    // deep-audit fix: the reviewed "Detected language" is authoritative —
    // the reply language follows it instead of ignoring the user's choice
    if (detected !== 'auto' && detected !== lang) setLang(detected)
    try {
      window.sessionStorage.setItem('lokai.pendingTranscript', text)
    } catch {
      /* ignore */
    }
    navigate('/')
  }

  if (phase === 'listening') {
    return (
      <AppShell
        showTabs={false}
        onBack={() => navigate('/')}
        title={tr('listening')}
        topBarExtra={<Badge tone="warning" variant="subtle">{tr('simulatedTag')}</Badge>}
        footer={
          <div className="flex flex-col items-center gap-3 pb-1">
            <div className="flex items-start justify-center gap-12">
              <RoundControl label={tr('voiceCancel')} onClick={() => navigate('/')}>
                <IconX className="size-5" />
              </RoundControl>
              <RoundControl label={tr('voiceDone')} onClick={stop} primary>
                <IconCheck className="size-6" />
              </RoundControl>
            </div>
            <p className="text-center text-2xs text-fg-tertiary">{tr('simulatedVoiceNote')}</p>
          </div>
        }
      >
        <div className="flex flex-1 flex-col items-center px-6 pb-4">
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <VoiceOrb state="listening" size="lg" />
            <p className="font-mono text-sm tabular-nums text-fg-tertiary" lang="en">
              {formatClock(seconds)}
            </p>
          </div>
          {/* live transcript: words land as they are "heard"; older lines fade
              off the top so the newest words always sit at eye level */}
          <div
            className="flex h-32 w-full max-w-[320px] flex-col justify-end overflow-hidden text-center [mask-image:linear-gradient(to_bottom,transparent,black_40%)]"
            aria-live="polite"
          >
            {shownWords === 0 ? (
              <p className="text-body text-fg-tertiary">{tr('speakNaturally')}</p>
            ) : (
              <p className="text-lg leading-relaxed text-fg-primary">
                {liveWords.slice(0, shownWords).join(' ')}
                {shownWords < liveWords.length && <span className="stream-caret" aria-hidden="true" />}
              </p>
            )}
          </div>
          <div className="waveform mt-5" aria-hidden="true">
            {Array.from({ length: 24 }, (_, i) => (
              <span key={i} className="wave-bar" />
            ))}
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell
      showTabs={false}
      onBack={() => setPhase('listening')}
      title={tr('heardTitle')}
      topBarExtra={<Badge tone="warning" variant="subtle">{tr('simulatedTag')}</Badge>}
      footer={
        <Button variant="primary" size="lg" block leadingIcon={<IconSend className="size-4" />} onClick={send}>
          {tr('sendToLokai')}
        </Button>
      }
    >
      <div className="scroll-calm flex-1 overflow-y-auto px-4 pb-6 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-[360px] flex-col gap-6"
        >
          <p className="px-1 text-sm text-fg-secondary">{tr('heardSub')}</p>

          <div className="overflow-hidden rounded-2xl border border-line-subtle bg-card focus-within:border-line-strong">
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={6}
              aria-label={tr('heardTitle')}
              className="block w-full resize-none bg-transparent p-4 text-base leading-relaxed text-fg-primary focus:outline-none"
            />
            {/* entity spotting: extracted facts as quiet chips so a stressed
                user verifies the speech-to-text in one glance */}
            {(() => {
              const ef = extractFacts(transcript)
              const timeHit = /\b\d+\s*(?:days?|hours?|weeks?|महीने|दिन|घंटे|நாட்கள்|மணி|دن|گھنٹے)\s*(?:ago|back|पहले|முன்|پہلے)?/i.exec(transcript)?.[0]
              const ISSUE_L = ISSUE_LABELS[lang] ?? ISSUE_LABELS.en!
              const spotted = [ef.amount, ef.seller, ef.item, ef.issue ? ISSUE_L[ef.issue]! : '', timeHit ?? ''].filter(Boolean)
              if (spotted.length === 0) return null
              return (
                <div className="border-t border-line-subtle px-4 py-3">
                  <p className="text-2xs text-fg-tertiary">{tr('voiceSpotted')}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {spotted.map((x) => (
                      <span
                        key={x}
                        className="rounded-full bg-brand-subtle px-2.5 py-1 text-2xs font-medium text-on-brand-subtle"
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>

          <ListGroup label={tr('detectedLang')}>
            <select
              value={detected}
              onChange={(e) => setDetected(e.target.value as LangCode | 'auto')}
              aria-label={tr('detectedLang')}
              className="min-h-12 w-full cursor-pointer bg-transparent px-4 text-sm text-fg-primary focus-visible:outline-none"
            >
              <option value="auto">{`${LANGUAGES[lang].english} (${tr('autoDetect')})`}</option>
              {LANG_ORDER.map((c) => (
                <option key={c} value={c}>
                  {LANGUAGES[c].english}
                </option>
              ))}
            </select>
          </ListGroup>

          <ListGroup label={tr('addDetails')}>
            <ul className="divide-y divide-line-subtle">
              {(
                [
                  { icon: <IconCamera className="size-4" />, label: tr('addFilePhoto') },
                  { icon: <IconGlobe className="size-4" />, label: tr('addLocation') },
                  { icon: <IconClock className="size-4" />, label: tr('specifyDate') },
                ] as const
              ).map((row) => (
                <li key={row.label}>
                  <button
                    type="button"
                    onClick={() => toast('Attachments are mocked in this prototype')}
                    className="flex min-h-12 w-full items-center gap-3 px-4 text-start text-sm text-fg-primary transition-colors hover:bg-hover-veil"
                  >
                    <span className="text-fg-tertiary">{row.icon}</span>
                    <span className="min-w-0 flex-1">{row.label}</span>
                    <IconChevronRight className="size-4 text-fg-tertiary rtl:-scale-x-100" />
                  </button>
                </li>
              ))}
            </ul>
          </ListGroup>
        </motion.div>
      </div>
    </AppShell>
  )
}

/** ChatGPT voice-mode control: a round target with its label beneath. */
function RoundControl({
  label,
  onClick,
  primary = false,
  children,
}: {
  label: string
  onClick: () => void
  primary?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={label}
        whileTap={{ scale: 0.92 }}
        className={
          'pressable inline-flex items-center justify-center rounded-full transition-colors ' +
          (primary
            ? 'size-16 bg-ink text-on-ink'
            : 'size-14 border border-line-default bg-card text-fg-primary hover:bg-component-hover')
        }
      >
        {children}
      </motion.button>
      <span className="text-2xs font-medium text-fg-secondary">{label}</span>
    </div>
  )
}
