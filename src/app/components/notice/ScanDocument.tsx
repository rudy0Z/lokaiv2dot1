import { useApp } from '../../lib/app-context'
import { Badge } from '../ui/Badge'
import { IconDoc } from '../ui/icons'

/**
 * The document scan beat, ported from v1's ScanDocument and reskinned to the
 * botanical language: paper page, a green energy bar with a soft trailing
 * tail sweeping down (Gemini's directional-gradient lesson), honest-beat law
 * — it runs only while the reading "work" runs.
 */
export function ScanDocument({ fileName }: { fileName: string }) {
  const { tr } = useApp()
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="scan-page w-full max-w-[280px] rounded-[14px] bg-card px-5 py-6 shadow-large">
        <div className="mb-4 flex items-center gap-2" lang="en">
          <IconDoc className="size-4 shrink-0 text-fg-tertiary" />
          <span className="truncate font-mono text-2xs text-fg-secondary">{fileName}</span>
        </div>
        <div className="flex flex-col gap-2.5" aria-hidden="true">
          {[92, 100, 78, 96, 60, 88, 40].map((w, i) => (
            <div key={i} className="h-2 rounded-full bg-sunken" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="scan-bar" aria-hidden="true" />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <p className="font-serif text-lg font-semibold text-fg-primary">{tr('stageReading')}…</p>
        <Badge tone="warning" variant="subtle">{tr('simulatedTag')}</Badge>
      </div>
    </div>
  )
}
