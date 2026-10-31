import { useApp } from '../../lib/app-context'
import { cn } from '../../lib/cn'

export type ConfidenceLevel = 'clear' | 'likely' | 'unsure'

export interface ConfidenceIndicatorProps {
  level: ConfidenceLevel
  className?: string
}

/**
 * Three plain-language levels (A5). NEVER a percentage, never a fabricated
 * score — the label itself says what the user should do next.
 */
export function ConfidenceIndicator({ level, className }: ConfidenceIndicatorProps) {
  const { tr } = useApp()
  const label = level === 'clear' ? tr('confClear') : level === 'likely' ? tr('confLikely') : tr('confUnsure')
  const desc = level === 'clear' ? tr('confClearDesc') : level === 'likely' ? tr('confLikelyDesc') : tr('confUnsureDesc')

  return (
    <div
      className={cn(
        'flex items-start gap-2.5 rounded-xl border px-3 py-2.5',
        level === 'clear' && 'border-positive-line bg-positive-subtle',
        level === 'likely' && 'border-warning-line bg-warning-subtle',
        level === 'unsure' && 'border-danger-line bg-danger-subtle',
        className,
      )}
      role="status"
    >
      <span
        aria-hidden="true"
        className={cn(
          'mt-1.5 size-2 shrink-0 rounded-full',
          level === 'clear' && 'bg-positive-solid',
          level === 'likely' && 'bg-warning-solid',
          level === 'unsure' && 'bg-danger-solid',
        )}
      />
      <div className="min-w-0">
        <p
          className={cn(
            'text-sm font-semibold',
            level === 'clear' && 'text-on-positive-subtle',
            level === 'likely' && 'text-on-warning-subtle',
            level === 'unsure' && 'text-on-danger-subtle',
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            'text-xs',
            level === 'clear' && 'text-on-positive-subtle/85',
            level === 'likely' && 'text-on-warning-subtle/85',
            level === 'unsure' && 'text-on-danger-subtle/85',
          )}
        >
          {desc}
        </p>
      </div>
    </div>
  )
}
