import { motion } from 'motion/react'
import { useApp } from '../../lib/app-context'

/** Narrated in-flight beat: dots + the current stage label. */
export function TypingIndicator({ stageLabel }: { stageLabel?: string }) {
  const { tr } = useApp()
  const label = stageLabel === 'stageReading' ? tr('stageReading') : stageLabel === 'stageChecking' ? tr('stageChecking') : tr('stageWriting')
  return (
    <div className="flex items-center gap-2.5 py-1" role="status" aria-live="polite">
      <span className="flex gap-1" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-fg-tertiary"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </span>
      <span className="text-2xs text-fg-tertiary">{label}…</span>
    </div>
  )
}
