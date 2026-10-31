import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * iOS / ChatGPT settings grammar: a quiet label above ONE rounded group of
 * hairline-divided rows, with an optional footnote — instead of a stack of
 * loose, equally-weighted cards.
 */
export function ListGroup({
  label,
  note,
  action,
  children,
  className,
  bodyClassName,
}: {
  label?: ReactNode
  note?: ReactNode
  /** small trailing control on the label row */
  action?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <section className={cn('flex flex-col gap-1.5', className)}>
      {(label || action) && (
        <div className="flex items-baseline justify-between gap-2 px-4">
          {label && <h2 className="text-2xs font-medium text-fg-tertiary">{label}</h2>}
          {action}
        </div>
      )}
      <div className={cn('overflow-hidden rounded-2xl border border-line-subtle bg-card', bodyClassName)}>
        {children}
      </div>
      {note && <p className="px-4 text-2xs text-fg-tertiary">{note}</p>}
    </section>
  )
}
