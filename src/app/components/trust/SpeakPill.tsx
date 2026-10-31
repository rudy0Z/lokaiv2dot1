import { useEffect, useRef, useState } from 'react'
import { useApp } from '../../lib/app-context'
import { cn } from '../../lib/cn'
import { IconVolume } from '../ui/icons'

/**
 * Simulated read-aloud pill — completes the voice story (the reviewer's
 * trust note): voice-first entry deserves voice-out. Honest by law: no
 * audio exists; a waveform animates for the estimated read time, tagged
 * Simulated.
 */
export function SpeakPill({ text, className }: { text: string; className?: string }) {
  const { tr } = useApp()
  const [speaking, setSpeaking] = useState(false)
  const timer = useRef<number | null>(null)
  const words = text.trim().split(/\s+/).length
  const seconds = Math.min(6, Math.max(2.5, words / 2.7))

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current) }, [])

  const toggle = () => {
    if (speaking) {
      if (timer.current) window.clearTimeout(timer.current)
      setSpeaking(false)
      return
    }
    setSpeaking(true)
    timer.current = window.setTimeout(() => setSpeaking(false), seconds * 1000)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={speaking}
      title={tr('simulatedTag')}
      className={cn(
        'pressable inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-2xs font-medium transition-colors',
        speaking ? 'bg-brand-solid text-on-brand-solid' : 'bg-sunken text-fg-secondary',
        className,
      )}
    >
      <IconVolume className="size-3.5" />
      {tr('listen')}
      {speaking && (
        <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[2px] rounded-full bg-on-brand-solid"
              style={{
                height: `${[60, 100, 40][i]}%`,
                animation: `wave-dance 0.9s ease-in-out ${i * 0.12}s infinite`,
              }}
            />
          ))}
        </span>
      )}
    </button>
  )
}
