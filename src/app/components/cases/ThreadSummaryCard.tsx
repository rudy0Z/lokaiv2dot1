import { useApp } from '../../lib/app-context'
import type { DaySummary } from '../../data/matters'

/**
 * The editorial three-row summary (serif register + mono metadata): what the
 * grievance is, the legal standing, and the last action vs. the next move.
 * Rendered by the Quick Summarise affordance atop a day thread.
 */
export function ThreadSummaryCard({ summary, lang }: { summary: DaySummary; lang?: string }) {
  const { tr } = useApp()
  const rows = [
    { label: tr('summaryGrievance'), value: summary.grievance },
    { label: tr('summaryStanding'), value: summary.standing },
    { label: tr('summaryNext'), value: summary.next },
  ]
  return (
    <div className="rounded-[22px] border border-line-subtle bg-sunken px-4 py-3.5">
      <dl className="flex flex-col gap-2.5">
        {rows.map((r, i) => (
          <div key={r.label} className="flex flex-col gap-0.5">
            <dt className="flex items-center gap-1.5 text-2xs text-fg-tertiary">
              <span className="tabular-nums" lang="en">
                {String(i + 1).padStart(2, '0')}
              </span>
              {r.label}
            </dt>
            <dd className="text-sm leading-relaxed text-fg-primary" lang={lang}>
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
