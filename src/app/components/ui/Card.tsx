import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** border-first elevation by default; soft shadow opt-in */
  raised?: boolean
  /** paper stationery register — generated documents ONLY */
  paper?: boolean
}

export function Card({ raised = false, paper = false, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        /* Concentric nested radius (craft.gustavofior.com/nested-border-radius):
           outer 24px - padding 16px = inner 8px (rounded-lg) for concentric wells */
        'rounded-2xl p-4',
        paper ? 'paper rounded-[18px] border border-warning-line/50' : 'bg-card',
        raised && !paper && 'shadow-large',
        className,
      )}
      {...rest}
    />
  )
}

export function CardTitle({ className, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-sm font-semibold text-fg-primary', className)} {...rest} />
}
