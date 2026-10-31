import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../../lib/cn'
import { IconChevronDown } from './icons'

export interface DisclosureProps {
  title: ReactNode
  subtitle?: ReactNode
  leading?: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  className?: string
  /** no box of its own — a hairline row inside a parent list (ui-skills:
      group with spacing/dividers, not stacked bordered cards) */
  bare?: boolean
  /** 'start' pins leading/chevron to the first line (step rails need a
      predictable marker position when titles wrap) */
  align?: 'center' | 'start'
  /** replaces the default panel padding/divider when set */
  contentClassName?: string
}

/** Accessible expand/collapse (button + region), height-animated. */
export function Disclosure({
  title,
  subtitle,
  leading,
  defaultOpen = false,
  open: controlled,
  onOpenChange,
  children,
  className,
  bare = false,
  align = 'center',
  contentClassName,
}: DisclosureProps) {
  const id = useId()
  const [uncontrolled, setUncontrolled] = useState(defaultOpen)
  const open = controlled ?? uncontrolled
  const toggle = () => {
    const next = !open
    if (controlled === undefined) setUncontrolled(next)
    onOpenChange?.(next)
  }

  return (
    <div
      className={cn(
        'rounded-2xl border border-line-default bg-card',
        bare && 'rounded-none border-0 bg-transparent',
        className,
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        className={cn(
          'flex w-full gap-3 rounded-2xl p-4 text-start hover:bg-hover-veil transition-colors',
          align === 'start' ? 'items-start' : 'items-center',
        )}
      >
        {leading}
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-fg-primary">{title}</span>
          {subtitle && <span className="mt-0.5 block text-2xs text-fg-tertiary">{subtitle}</span>}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className={cn('shrink-0 text-fg-tertiary', align === 'start' && 'mt-1.5')}
        >
          <IconChevronDown className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={contentClassName ?? 'border-t border-line-subtle px-4 pb-4 pt-3'}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
