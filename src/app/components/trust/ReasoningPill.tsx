import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useApp } from '../../lib/app-context'
import { cn } from '../../lib/cn'
import { Badge } from '../ui/Badge'
import { IconChevronDown } from '../ui/icons'

export interface ReasoningPillProps {
  steps: string[]
  className?: string
}

/**
 * Collapsible "what I checked". HONESTY RULE (A7): in this prototype the AI
 * is simulated, so the expanded panel always carries the Simulated tag.
 */
export function ReasoningPill({ steps, className }: ReasoningPillProps) {
  const { tr } = useApp()
  const [open, setOpen] = useState(false)

  return (
    <div className={cn('inline-flex flex-col items-start gap-2', className)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line-default bg-component px-3 text-2xs font-medium text-fg-secondary transition-colors hover:bg-component-hover"
      >
        <span>{tr('reasoningTitle')}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }}>
          <IconChevronDown className="size-3.5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full overflow-hidden"
          >
            <div className="rounded-xl border border-line-subtle bg-sunken px-3.5 py-3">
              <ol className="ms-4 list-disc space-y-1 text-2xs text-fg-secondary">
                {steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
              <Badge tone="warning" variant="subtle" className="mt-2">
                {tr('simulatedTag')}
              </Badge>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
