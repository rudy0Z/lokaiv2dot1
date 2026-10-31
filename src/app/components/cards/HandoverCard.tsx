import { useApp } from '../../lib/app-context'
import { legalById } from '../../data/legal-content'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { VerificationBadge } from '../trust/VerificationBadge'

export const WHAT_TO_BRING = [
  'The bill or order confirmation',
  'Photos of the damaged item',
  'A written timeline of dates',
  'Any ID the office asks for',
]

const GATE_TRAIL = [
  'Script boundary check — passed',
  'Scope classification — hard stop confirmed',
  'Safety routing — DLSA suggested',
  'Nothing left this device',
]

/**
 * What the user receives when LokAI stops (ported from v1's HandoverPacket
 * + decision receipt): the facts collected, what to bring, and the visible
 * trail of checks — trust made physical. Simulated-tagged (A7).
 */
export function HandoverCard({ tierLabel, why }: { tierLabel: string; why: string }) {
  const { tr } = useApp()
  const legal = legalById('dlsa-routing')
  return (
    <Card className="flex flex-col gap-3.5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-fg-primary">{tr('handoverTitle')}</h3>
        <Badge tone="warning" variant="subtle">{tierLabel}</Badge>
      </div>
      <p className="text-sm leading-relaxed text-fg-secondary">{why}</p>

      <div>
        <p className="text-2xs font-semibold text-fg-secondary">{tr('handoverWhat')}</p>
        <ul className="mt-1.5 flex flex-col gap-1.5" lang="en">
          {WHAT_TO_BRING.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-fg-primary">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-solid" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-sunken px-3.5 py-3">
        <p className="text-2xs font-semibold text-fg-secondary" lang="en">
          Gate trail
        </p>
        <ol className="mt-1.5 flex flex-col gap-1" lang="en">
          {GATE_TRAIL.map((g) => (
            <li key={g} className="text-2xs text-fg-secondary">
              · {g}
            </li>
          ))}
        </ol>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge tone="warning" variant="subtle">{tr('simulatedTag')}</Badge>
          {legal && <VerificationBadge verified={legal.verified} />}
        </div>
      </div>
    </Card>
  )
}
