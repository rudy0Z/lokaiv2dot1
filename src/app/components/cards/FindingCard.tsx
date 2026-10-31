import { useState } from 'react'
import { toast } from 'sonner'
import { useApp } from '../../lib/app-context'
import { cn } from '../../lib/cn'
import { legalById } from '../../data/legal-content'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { IconScales } from '../ui/icons'
import { Textarea } from '../ui/Field'
import { type ConfidenceLevel } from '../trust/ConfidenceIndicator'
import { VerificationBadge } from '../trust/VerificationBadge'
import { SectionRef } from '../trust/SectionRef'
import { ReasoningPill } from '../trust/ReasoningPill'
import { LegalText } from '../trust/LegalText'
import { SpeakPill } from '../trust/SpeakPill'
import { CardActions } from './CardActions'

export interface FindingCardData {
  title: string
  whatHappened: string
  lawSays: string
  means: string
  legalId: string
  confidence: ConfidenceLevel
  reasoningSteps: string[]
  /** alternate wording produced by Regenerate */
  variants?: { whatHappened: string; means: string }[]
}

export interface FindingCardProps {
  data: FindingCardData
  stale?: boolean
  onUpdate?: (data: FindingCardData) => void
  onDiscard?: () => void
}

/**
 * The generative finding card as an executive legal brief: serif heading
 * (the "law register" is a READING surface, allowed), the bottom line first,
 * then what happened / what the law says, a verified-or-not citation,
 * confidence in plain words, reasoning pill, and full user control.
 */
export function FindingCard({ data, stale, onUpdate, onDiscard }: FindingCardProps) {
  const { tr, lang } = useApp()
  const legal = legalById(data.legalId)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(data)
  const [variantIdx, setVariantIdx] = useState(0)
  /** A4b: uppercase + tracking are Latin-only niceties */
  const labelClass = cn(
    'text-2xs font-semibold text-fg-tertiary',
    lang === 'en' && 'uppercase tracking-wide',
  )

  const variants = data.variants ?? []
  const regenerate = () => {
    if (variants.length === 0) {
      toast('No alternate draft prepared for this card')
      return
    }
    const next = (variantIdx + 1) % (variants.length + 1)
    setVariantIdx(next)
    const v = next === 0 ? data : variants[next - 1]!
    const merged = { ...draft, ...v }
    setDraft(merged)
    onUpdate?.(merged)
  }

  const save = () => {
    setEditing(false)
    onUpdate?.(draft)
    toast.success(tr('saveChanges'))
  }

  const confLabel =
    draft.confidence === 'clear' ? tr('confClear') : draft.confidence === 'likely' ? tr('confLikely') : tr('confUnsure')

  const dtLang = lang === 'en' ? undefined : lang

  return (
    /* Executive brief (Phase A/B): verdict first. A status strip names what
       this is and how sure we are; the bottom line sits in a brand-tinted
       callout above the supporting evidence; the source + verification live
       in one well; user controls sit in a quiet footer toolbar (law 4). */
    <Card className={cn('overflow-hidden border border-line-default p-0', stale && 'opacity-70')}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 border-b border-line-subtle bg-sunken px-4 py-2.5">
        <span className="inline-flex min-w-0 items-center gap-1.5">
          <IconScales className="size-4 shrink-0 text-brand-fg" />
          <span className={labelClass} lang={dtLang}>
            {tr('findingKicker')}
          </span>
        </span>
        <span className="ms-auto flex flex-wrap items-center gap-1.5">
          {stale && <Badge tone="warning" variant="subtle">{tr('stale')}</Badge>}
          {!editing && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line-default bg-card px-2.5 py-0.5 text-2xs font-medium text-fg-secondary">
              <span
                className={cn(
                  'size-2 shrink-0 rounded-full',
                  draft.confidence === 'clear' && 'bg-positive-solid',
                  draft.confidence === 'likely' && 'bg-warning-solid',
                  draft.confidence === 'unsure' && 'bg-danger-solid',
                )}
                aria-hidden="true"
              />
              {confLabel}
            </span>
          )}
        </span>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-3 pt-4">
        {editing ? (
          <div className="flex flex-col gap-2">
            <Textarea value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} rows={2} aria-label="title" />
            <Textarea value={draft.whatHappened} onChange={(e) => setDraft({ ...draft, whatHappened: e.target.value })} aria-label="what happened" />
            <Textarea value={draft.means} onChange={(e) => setDraft({ ...draft, means: e.target.value })} aria-label="what this means" />
          </div>
        ) : (
          <>
            <h3 className="font-serif text-lg font-semibold leading-snug text-fg-primary">
              {draft.title}
            </h3>

            {/* the bottom line — the one thing to remember, read first */}
            <div className="rounded-xl border border-brand-line-subtle bg-brand-subtle px-3.5 py-3">
              <p className={cn(labelClass, 'text-on-brand-subtle')} lang={dtLang}>
                {tr('findingMeans')}
              </p>
              <p className="mt-1 text-body font-medium text-on-brand-subtle">{draft.means}</p>
            </div>

            {/* NO lang="en" here: buildFinding localizes the body — an English
                scope would strip :lang() font stacks and Nastaliq leading from
                the card's main reading surface (DESIGN-AUDIT P1-2) */}
            <dl className="flex flex-col gap-3.5">
              <div className="border-s-2 border-line-default ps-3">
                <dt className={labelClass} lang={dtLang}>
                  {tr('findingWhatHappened')}
                </dt>
                <dd className="mt-1 text-sm text-fg-secondary">{draft.whatHappened}</dd>
              </div>
              <div className="border-s-2 border-brand-line ps-3">
                <dt className={labelClass} lang={dtLang}>
                  {tr('findingLawSays')}
                </dt>
                <dd className="mt-1 text-sm text-fg-primary">
                  <LegalText text={draft.lawSays} />
                </dd>
              </div>
            </dl>
          </>
        )}

        {/* the evidence well — concentric nested radius: outer 24px card,
            16px padding → inner rounded-lg well */}
        {legal && (
          <div className="flex flex-col gap-2 rounded-lg bg-sunken px-3.5 py-3">
            <p className={labelClass} lang={dtLang}>
              {tr('findingSource')}
            </p>
            <div className="flex flex-wrap items-center gap-2" lang="en">
              <span className="text-2xs text-fg-secondary">{legal.source}</span>
              <SectionRef sectionRef={legal.sectionRef} />
            </div>
            <div>
              <VerificationBadge verified={legal.verified} />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-start gap-2">
          <SpeakPill text={`${draft.title}. ${draft.whatHappened} ${draft.lawSays} ${draft.means}`} />
          <ReasoningPill steps={draft.reasoningSteps} />
        </div>
      </div>

      <div className="border-t border-line-subtle px-2 py-1.5">
        <CardActions
          editing={editing}
          onEdit={() => (editing ? save() : setEditing(true))}
          onRegenerate={regenerate}
          onDiscard={onDiscard}
        />
      </div>
    </Card>
  )
}
