import { useApp } from '../../lib/app-context'
import { navigate, useHashRoute } from '../../lib/router'
import { cn } from '../../lib/cn'
import { historyGroups, type HistoryBucket } from '../../data/matters'
import type { UiKey } from '../../data/i18n'

const BUCKET_LABEL: Record<HistoryBucket, UiKey> = {
  today: 'groupToday',
  yesterday: 'groupYesterday',
  week: 'groupWeek',
  earlier: 'groupEarlier',
}

/**
 * Date-grouped conversation history (ChatGPT/Gemini sidebar model): every
 * day chat across every case, newest first, under Today / Yesterday /
 * Previous 7 days / Earlier. Each row names its case on the second line —
 * time is how people find a chat, the case is what it belongs to.
 */
export function ChatHistoryList({
  onNavigate,
  dense = false,
}: {
  onNavigate?: () => void
  /** sidebar density: tighter rows, no case line wrap */
  dense?: boolean
}) {
  const { tr } = useApp()
  const { path } = useHashRoute()
  return (
    <div className="flex flex-col gap-4">
      {historyGroups().map((g) => (
        <section key={g.bucket} aria-label={tr(BUCKET_LABEL[g.bucket])}>
          <h3 className="px-3 pb-1 text-2xs font-medium text-fg-tertiary">{tr(BUCKET_LABEL[g.bucket])}</h3>
          <ul className="flex flex-col">
            {g.entries.map(({ matter, day, dayIndex }) => {
              const href = `/case/${matter.id}/d/${dayIndex}`
              const active = path === href
              return (
                <li key={`${matter.id}-${day.id}`}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(href)
                      onNavigate?.()
                    }}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex w-full flex-col rounded-xl px-3 text-start transition-colors',
                      dense ? 'min-h-11 justify-center py-1.5' : 'min-h-14 justify-center py-2.5',
                      active ? 'bg-component-active' : 'hover:bg-hover-veil',
                    )}
                  >
                    <span className="block truncate text-sm text-fg-primary" lang={matter.lang}>
                      {day.title}
                    </span>
                    <span className="block truncate text-2xs text-fg-tertiary" lang={matter.lang}>
                      {matter.titleNative}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
