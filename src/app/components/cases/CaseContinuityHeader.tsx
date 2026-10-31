import { useApp } from '../../lib/app-context'
import { matterById } from '../../data/matters'
import { Chip } from '../ui/Chip'

/**
 * "Resume quick glance": a new day-chat inside an existing case NEVER opens
 * blank. The warm-ivory strip shows the inherited case memory, LokAI's
 * proactive follow-up referencing the previous session, and three one-tap
 * continuity chips. The case language leads; the continuity line is data,
 * not a template — nothing here invents an outcome.
 */
export function CaseContinuityHeader({ onChip }: { onChip: (text: string, index: number) => void }) {
  const { tr, activeCaseId } = useApp()
  const matter = activeCaseId ? matterById(activeCaseId) : undefined
  if (!matter) return null

  return (
    <div className="mx-auto flex w-full max-w-[380px] flex-col gap-3">
      <section className="rounded-2xl bg-sunken p-4" lang={matter.lang}>
        <p className="text-2xs font-semibold text-fg-secondary">{tr('continuityTitle')}</p>
        <p className="mt-1.5 text-2xs tabular-nums text-fg-tertiary">{matter.continuity.memoryLine}</p>
        <p className="mt-2 text-base font-medium leading-relaxed text-fg-primary">
          {matter.continuity.followUp}
        </p>
      </section>
      <div className="flex flex-wrap justify-center gap-2">
        {matter.continuity.chips.map((c, i) => (
          <Chip key={c} onClick={() => onChip(c, i)}>
            {c}
          </Chip>
        ))}
      </div>
    </div>
  )
}
