import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '../../lib/cn'

/** Quick-reply / suggestion chip. Wraps gracefully for long Indic strings. */
export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  leadingIcon?: ReactNode
}

export function Chip({ selected = false, leadingIcon, className, children, ...rest }: ChipProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      aria-pressed={selected}
      className={cn(
        'pressable inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-150',
        selected
          ? 'bg-brand-solid text-on-brand-solid shadow-sm'
          : 'border border-line-default bg-card text-fg-primary hover:bg-hover-veil',
        className,
      )}
      style={{ minWidth: 'var(--touch-target)' }}
      {...rest as any}
    >
      {leadingIcon}
      <span className="text-start whitespace-normal">{children}</span>
    </motion.button>
  )
}
