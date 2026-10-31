import { useEffect, useState } from 'react'

/**
 * iPhone Duo / foldable spanning detection (design-os: device honesty).
 * True when the browser reports two horizontal viewport segments — the
 * hinge-aware CSS env() values then shape the gutter.
 */
export function useSpans(): boolean {
  const [spans, setSpans] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(horizontal-viewport-segments: 2)')
    const sync = () => setSpans(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return spans
}
