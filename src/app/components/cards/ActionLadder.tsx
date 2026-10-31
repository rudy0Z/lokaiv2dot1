import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { useApp } from '../../lib/app-context'
import { cn } from '../../lib/cn'
import { copyText } from '../../lib/format'
import { legalById } from '../../data/legal-content'
import { buildDrafts } from '../../lib/matter-facts'
import type { FactRecord } from '../../lib/matter-facts'
import type { DomainChannel } from '../../data/domain-playbooks'
import { Badge } from '../ui/Badge'
import { Banner } from '../ui/Banner'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Disclosure } from '../ui/Disclosure'
import { IconCheck, IconCopy, IconPhone, IconRefresh } from '../ui/icons'
import { VerificationBadge } from '../trust/VerificationBadge'

export interface ActionLadderProps {
  /** full = all three steps; free = steps 1-2 + human help (caution branch) */
  mode?: 'full' | 'free'
  onOpenNotice?: () => void
  /** the signed matter record — every draft is built from it, never hardcoded */
  facts?: FactRecord
  /** domain playbook overrides (master spec Part 1): when present the ladder
      speaks the domain's own drafts, prep list, step titles and channel */
  drafts?: string[]
  prep?: string[]
  stepTitles?: [string, string, string]
  channel?: DomainChannel
  className?: string
  initialExpandedStep?: 1 | 2 | 3
}

function StepNumber({
  n,
  tone = 'brand',
  current = false,
}: {
  n: number
  tone?: 'brand' | 'positive' | 'warning'
  current?: boolean
}) {
  return (
    <span
      className={cn(
        /* ring-card masks the rail spine behind the marker */
        'relative flex size-7 shrink-0 items-center justify-center rounded-full text-2xs font-semibold tabular-nums ring-4 ring-card',
        current && 'bg-positive-solid text-on-positive-solid',
        !current && tone === 'brand' && 'bg-brand-subtle text-on-brand-subtle',
        !current && tone === 'positive' && 'bg-positive-subtle text-on-positive-subtle',
        !current && tone === 'warning' && 'bg-warning-subtle text-on-warning-subtle',
      )}
      aria-hidden="true"
    >
      {n}
    </span>
  )
}

/** Cost / time / risk metadata, split from the existing localized
    " · "-joined step subtitle — no new claims, just clearer scanning. */
function StepMeta({ sub }: { sub: string }) {
  const parts = sub.split(' · ').map((x) => x.trim()).filter(Boolean)
  return (
    <span className="mt-1.5 flex flex-wrap gap-1">
      {parts.map((m) => (
        <span key={m} className="rounded-full bg-sunken px-2 py-0.5 text-2xs font-medium text-fg-secondary">
          {m}
        </span>
      ))}
    </span>
  )
}

type RailPosition = 'only' | 'first' | 'middle' | 'last'

/** One step on the rail. Marker centre = 16px button padding + 14px half
    marker = 30px on both axes (Disclosure align="start" pins it). */
function RailStep({
  position,
  leading,
  title,
  sub,
  defaultOpen,
  children,
}: {
  position: RailPosition
  leading: ReactNode
  title: ReactNode
  sub: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  return (
    <li className="relative">
      {position !== 'only' && (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute start-[29.5px] w-px bg-line-default',
            position === 'first' && 'bottom-0 top-[30px]',
            position === 'middle' && 'inset-y-0',
            position === 'last' && 'top-0 h-[30px]',
          )}
        />
      )}
      <Disclosure
        bare
        align="start"
        leading={leading}
        title={title}
        subtitle={<StepMeta sub={sub} />}
        defaultOpen={defaultOpen}
        contentClassName="pb-4 pe-4 ps-14"
      >
        {children}
      </Disclosure>
    </li>
  )
}

/** Step 1: editable, copyable WhatsApp draft — built from the signed facts,
    or supplied verbatim by a domain playbook. */
function WhatsAppStep({ facts, drafts: draftsProp }: { facts?: FactRecord; drafts?: string[] }) {
  const { tr, lang } = useApp()
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [copied, setCopied] = useState(false)
  /* overhaul Part 4: the draft previews at 3 lines so Step 2 stays in view;
     the full editable draft opens on demand — Copy is visible either way */
  const [expanded, setExpanded] = useState(false)

  const drafts = useMemo<string[]>(
    () =>
      draftsProp ??
      buildDrafts(facts ?? { item: '', seller: '', amount: '', issue: '', ask: '', when: '' }, lang).drafts,
    [facts, lang, draftsProp],
  )

  useEffect(() => {
    setText(drafts[idx] ?? '')
    // re-build whenever the signed facts, language or variant change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facts, lang, idx, drafts])

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-2xs text-fg-tertiary">{tr('whatsappHint')}</p>
      {expanded ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={9}
          aria-label="WhatsApp draft"
          className="scroll-calm w-full resize-y rounded-xl border border-line-default bg-sunken p-3 font-sans text-sm leading-relaxed text-fg-primary focus-visible:border-brand-line focus-visible:outline-none"
        />
      ) : (
        <div className="relative rounded-xl border border-line-default bg-sunken p-3">
          <p className="line-clamp-3 whitespace-pre-line font-sans text-sm leading-relaxed text-fg-primary">
            {text}
          </p>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-7 rounded-b-xl bg-gradient-to-t from-sunken to-transparent"
            aria-hidden="true"
          />
        </div>
      )}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="pressable -mt-1.5 self-start rounded-full px-1.5 py-1 text-2xs font-medium text-brand-fg underline-offset-4 hover:underline"
      >
        {expanded ? tr('hideFullDraft') : tr('readFullDraft')}
      </button>
      {copied && (
        <p className="rounded-xl bg-positive-subtle px-3 py-2 text-2xs text-on-positive-subtle">
          {tr('ladderCopied')}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="primary"
          size="sm"
          leadingIcon={<IconCopy className="size-3.5" />}
          onClick={async () => {
            const ok = await copyText(text)
            if (ok) {
              toast.success(tr('copied'))
              setCopied(true)
            } else toast.error(tr('errorTitle'))
          }}
        >
          {tr('copy')}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          leadingIcon={<IconRefresh className="size-3.5" />}
          onClick={() => setIdx((i) => (i + 1) % drafts.length)}
        >
          {tr('regenerate')}
        </Button>
      </div>
    </div>
  )
}

/** Step 2: the domain's escalation channel (1915 / 1930 / DLSA / SAMADHAN)
    with its prep list — tokens come only from legal-content-backed data. */
function ChannelStep({ prep, channel }: { prep?: string[]; channel?: DomainChannel }) {
  const { tr } = useApp()
  const legal = legalById(channel?.legalId ?? 'national-consumer-helpline')
  const prepItems = prep ?? (['prepItem1', 'prepItem2', 'prepItem3', 'prepItem4'] as const).map((k) => tr(k))
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-brand-line-subtle bg-brand-subtle px-3.5 py-3">
        <div className="flex items-baseline gap-2">
          <IconPhone className="size-4 translate-y-0.5 text-on-brand-subtle" />
          <span className="font-mono text-2xl font-semibold text-on-brand-subtle" lang="en">
            {channel?.token ?? '1915'}
          </span>
          <Badge tone="positive" variant="subtle">{tr('badgeFree')}</Badge>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="text-2xs text-on-brand-subtle">{legal?.source}</span>
          <VerificationBadge verified={legal?.verified ?? false} />
        </div>
      </div>
      <div>
        <p className="text-2xs font-semibold text-fg-secondary">{tr('haveReady')}</p>
        <ul className="mt-1.5 flex flex-col gap-1.5">
          {prepItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-fg-primary">
              <IconCheck className="mt-1 size-3.5 shrink-0 text-positive-fg" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ActionLadder({
  mode = 'full',
  onOpenNotice,
  facts,
  drafts,
  prep,
  stepTitles,
  channel,
  className,
  initialExpandedStep,
}: ActionLadderProps) {
  const { tr, lang } = useApp()
  const count = mode === 'full' ? 3 : 2
  const pos = (i: number): RailPosition => (i === 0 ? 'first' : i === count - 1 ? 'last' : 'middle')
  return (
    <section className={cn('flex flex-col gap-2', className)} aria-label={tr('ladderTitle')}>
      <div className="flex items-baseline justify-between gap-3 px-1">
        <h3 className="text-base font-semibold text-fg-primary">{tr('ladderTitle')}</h3>
        <span className="shrink-0 text-2xs tabular-nums text-fg-tertiary">
          {tr('ladderSteps').replace('{n}', String(count))}
        </span>
      </div>
      {/* ONE container, a numbered step rail — cheapest, fastest step first */}
      <Card className="overflow-hidden border border-line-default p-0 py-1">
        <ol className="flex flex-col">
          <RailStep
            position={pos(0)}
            leading={<StepNumber n={1} tone="positive" current />}
            title={
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>{stepTitles?.[0] ?? tr('step1Title')}</span>
                <span
                  className={cn(
                    'rounded-full bg-positive-subtle px-2 py-0.5 text-2xs font-semibold text-on-positive-subtle',
                    lang === 'en' && 'tracking-wide',
                  )}
                >
                  {tr('ladderStartHere')}
                </span>
              </span>
            }
            sub={tr('step1Sub')}
            defaultOpen={initialExpandedStep === 1 || initialExpandedStep === undefined}
          >
            <WhatsAppStep facts={facts} drafts={drafts} />
          </RailStep>
          <RailStep
            position={pos(1)}
            leading={<StepNumber n={2} />}
            title={stepTitles?.[1] ?? tr('step2Title')}
            sub={tr('step2Sub')}
            defaultOpen={initialExpandedStep === 2}
          >
            <ChannelStep prep={prep} channel={channel} />
          </RailStep>
          {mode === 'full' && (
            <RailStep
              position={pos(2)}
              leading={<StepNumber n={3} tone="warning" />}
              title={stepTitles?.[2] ?? tr('step3Title')}
              sub={tr('step3Sub')}
              defaultOpen={initialExpandedStep === 3}
            >
              <div className="flex flex-col gap-2.5">
                <Banner tone="warning">{tr('ladderBanner')}</Banner>
                <Button variant="secondary" size="sm" className="self-start" onClick={onOpenNotice}>
                  {tr('openNotice')}
                </Button>
              </div>
            </RailStep>
          )}
        </ol>
      </Card>
      {mode === 'free' && (
        <p className="px-1 text-2xs text-fg-tertiary">{tr('ladderPausedNote')}</p>
      )}
    </section>
  )
}
