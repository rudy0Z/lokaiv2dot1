import { useApp } from '../../lib/app-context'
import { JOURNEY_STRINGS } from '../../data/refund-journey'
import { CAUTION_UNCLEAR, CAUTION_REASONING, INFORMAL_CAUTION } from '../../data/localized-content'
import { domainPack } from '../../data/domain-playbooks'
import { legalById } from '../../data/legal-content'
import type { ScopeDecision } from '../../data/scope-rules'
import { Badge } from '../ui/Badge'
import { Chip } from '../ui/Chip'
import { ConfidenceIndicator } from '../trust/ConfidenceIndicator'
import { VerificationBadge } from '../trust/VerificationBadge'
import { ReasoningPill } from '../trust/ReasoningPill'
import { SectionRef } from '../trust/SectionRef'
import { CardActions } from './CardActions'

/**
 * Caution state — NOT an automatic stop (A2.4 / Phase 1 spec). THREE honest
 * faces (the downgrade law must never claim a fact the user did not give):
 *  - time-barred ('possible-time-barred'): time limits may apply…
 *  - informal ('informal-seller'): a different dispute rail, human check first
 *  - unclear (any other caution): "I did not understand — one more detail",
 *    with three disambiguation doors, never a fabricated limitation warning.
 */
export function CautionCard({
  decision,
  onConsumer,
  onNotice,
  onOther,
  onDiscard,
}: {
  decision?: ScopeDecision
  onConsumer?: () => void
  onNotice?: () => void
  onOther?: () => void
  onDiscard?: () => void
}) {
  const { tr, lang } = useApp()
  const timeBarred = decision?.ruleId === 'possible-time-barred'
  const informal = decision?.ruleId === 'informal-seller'
  // domain-playbook caution (deposit no-agreement, salary bond, …)
  const domainCaution = decision?.domain
    ? domainPack(decision.domain.id as never, decision.domain.branch, lang).caution
    : undefined
  const legal = legalById('cpa-limitation')
  const unclear = CAUTION_UNCLEAR[lang] ?? CAUTION_UNCLEAR.en!
  const informalPack = INFORMAL_CAUTION[lang] ?? INFORMAL_CAUTION.en!
  const reasoning = (CAUTION_REASONING[lang] ?? CAUTION_REASONING.en!)[
    timeBarred ? 'timeBarred' : 'unclear'
  ]

  return (
    /* Inline assessment block (same family as FindingCard): left hairline
       with a warning accent, not a boxed card */
    <div className="flex flex-col gap-3.5 border-s-2 border-warning-line py-0.5 ps-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold leading-snug text-fg-primary">
          {timeBarred ? tr('cautionTitle') : domainCaution ? domainCaution.title : informal ? informalPack.title : unclear.title}
        </h3>
        <Badge tone="warning" variant="subtle">{tr('tierCaution')}</Badge>
      </div>

      {domainCaution ? (
        <>
          <p className="text-sm leading-relaxed text-fg-primary">{domainCaution.body}</p>
          <ConfidenceIndicator level="likely" />
        </>
      ) : timeBarred ? (
        <>
          <p className="text-sm text-fg-primary">{JOURNEY_STRINGS.cautionIntro![lang]}</p>
          {legal && (
            <div className="flex flex-wrap items-center gap-2" lang="en">
              <span className="text-2xs text-fg-secondary">{legal.source}</span>
              <SectionRef sectionRef={legal.sectionRef} />
              <VerificationBadge verified={legal.verified} />
            </div>
          )}
          <ConfidenceIndicator level="likely" />
        </>
      ) : informal ? (
        <>
          <p className="text-sm leading-relaxed text-fg-primary">{informalPack.body}</p>
          <ConfidenceIndicator level="likely" />
        </>
      ) : (
        <>
          <p className="text-sm leading-relaxed text-fg-primary">{unclear.body}</p>
          <div className="flex flex-col gap-1.5">
            <p className="text-2xs font-semibold text-fg-secondary">{tr('pickClosest')}</p>
            <div className="flex flex-wrap gap-2">
              {onConsumer && <Chip onClick={onConsumer}>{tr('chipItConsumer')}</Chip>}
              {onNotice && <Chip onClick={onNotice}>{tr('chipItOfficial')}</Chip>}
              {onOther && <Chip onClick={onOther}>{tr('chipOther')}</Chip>}
            </div>
          </div>
          <ConfidenceIndicator level="unsure" />
        </>
      )}

      <div className="rounded-xl bg-sunken px-3.5 py-3">
        <ReasoningPill steps={domainCaution ? domainCaution.steps : informal ? informalPack.steps : reasoning} />
      </div>
      <CardActions onDiscard={onDiscard} />
    </div>
  )
}
