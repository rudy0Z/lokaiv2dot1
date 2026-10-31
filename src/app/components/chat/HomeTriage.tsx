import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '../../lib/cn'

export interface TriageItem {
  id: string
  icon: ReactNode
  title: string
  /** kept for callers; the pill shows the title only */
  sub?: string
  /** safety reads as protective, not as one more option */
  tone?: 'default' | 'danger'
  onPick: () => void
}

/**
 * Home suggestions — the ChatGPT/Gemini pattern: ONE horizontally scrolling
 * row of quiet pills docked above the composer, instead of a tile grid that
 * competes with the greeting. Each pill enters an existing deterministic
 * route; nothing here states law.
 */
export function HomeTriage({ label, items }: { label: string; items: TriageItem[] }) {
  return (
    <nav aria-label={label} className="-mx-3.5">
      <ul className="scroll-fade-x flex gap-2 overflow-x-auto px-3.5 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it, i) => (
          <motion.li
            key={it.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.1 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0"
          >
            <button
              type="button"
              onClick={it.onPick}
              className="pressable inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border border-line-default bg-card px-3.5 text-sm text-fg-primary transition-colors hover:bg-component-hover"
            >
              <span
                className={cn('shrink-0', it.tone === 'danger' ? 'text-danger-fg' : 'text-fg-tertiary')}
                aria-hidden="true"
              >
                {it.icon}
              </span>
              {it.title}
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
  )
}
