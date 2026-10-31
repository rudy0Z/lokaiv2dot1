import { useEffect, useRef, useState } from 'react'

/**
 * Word-by-word streaming reveal with the v1 caret law: solid caret blinks
 * while streaming, rests 1400ms after the last word, then leaves.
 * prefers-reduced-motion renders the full text immediately.
 */
export function StreamText({
  text,
  onDone,
  className,
}: {
  text: string
  onDone?: () => void
  className?: string
}) {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const tokens = useRef(text.split(/(\s+)/)).current
  const [shown, setShown] = useState(reduced ? tokens.length : 0)
  const [resting, setResting] = useState(false)
  const [left, setLeft] = useState(reduced)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (shown >= tokens.length) {
      if (!resting && !left) {
        const t = window.setTimeout(() => {
          setResting(false)
          setLeft(true)
          doneRef.current?.()
        }, 900)
        return () => window.clearTimeout(t)
      }
      return
    }
    // speed pass (visual report P2): ~90 wpm effective — substance arrives
    // well inside the 2.5s turn budget even with the beat engine ahead of it
    const t = window.setTimeout(() => setShown((n) => Math.min(n + 3, tokens.length)), 22)
    return () => window.clearTimeout(t)
  }, [shown, tokens.length, resting, left])

  if (left) return <span className={className}>{text}</span>

  return (
    <span className={className}>
      {tokens.slice(0, shown).join('')}
      <span className="stream-caret" aria-hidden="true" />
    </span>
  )
}
