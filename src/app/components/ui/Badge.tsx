import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type BadgeTone = 'neutral' | 'brand' | 'positive' | 'warning' | 'danger' | 'inverted'
export type BadgeVariant = 'subtle' | 'solid' | 'outline'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  variant?: BadgeVariant
  leadingIcon?: ReactNode
}

const toneVariant: Record<BadgeTone, Record<BadgeVariant, string>> = {
  neutral: {
    subtle: 'bg-sunken text-fg-secondary',
    solid: 'border border-line-default bg-card text-fg-primary',
    outline: 'border border-line-default text-fg-secondary',
  },
  brand: {
    subtle: 'bg-brand-subtle text-on-brand-subtle',
    solid: 'bg-brand-solid text-on-brand-solid',
    outline: 'border border-brand-line text-brand-fg',
  },
  positive: {
    subtle: 'bg-positive-subtle text-on-positive-subtle',
    solid: 'bg-positive-solid text-on-positive-solid',
    outline: 'border border-positive-line text-positive-fg',
  },
  warning: {
    subtle: 'bg-warning-subtle text-on-warning-subtle',
    solid: 'bg-warning-solid text-on-warning-solid',
    outline: 'border border-warning-line text-warning-fg',
  },
  danger: {
    subtle: 'bg-danger-subtle text-on-danger-subtle',
    solid: 'bg-danger-solid text-on-danger-solid',
    outline: 'border border-danger-line text-danger-fg',
  },
  inverted: {
    subtle: 'bg-standout text-fg-standout-secondary',
    solid: 'bg-fg-on-inverted text-standout',
    outline: 'border border-line-inverted text-fg-on-inverted',
  },
}

export function Badge({ tone = 'neutral', variant = 'subtle', leadingIcon, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        /* shrink-0: a pill squeezed by a flex sibling wraps into a lumpy blob —
           keep its natural width, capped at the container */
        'inline-flex max-w-full shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-2xs font-medium',
        toneVariant[tone][variant],
        className,
      )}
      {...rest}
    >
      {leadingIcon}
      {children}
    </span>
  )
}
