import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { useApp } from '../../lib/app-context'
import { IconArrowLeft } from '../ui/icons'

export interface ThreadProps {
  children: ReactNode
  /** value that changes whenever content grows — drives auto-scroll */
  scrollKey: string | number
  /** when false (empty state), no auto-scroll happens */
  autoScroll?: boolean
  /**
   * CSS selector for the card block that just mounted (finding, fact gate,
   * protective card…). When present the thread scrolls its TOP into view —
   * the reader starts at the headline instead of being yanked past it.
   */
  focusSelector?: string | null
  className?: string
}

export function Thread({ children, scrollKey, autoScroll = true, focusSelector, className }: ThreadProps) {
  const { tr } = useApp()
  const ref = useRef<HTMLDivElement>(null)
  const firstRef = useRef(true)
  const [away, setAway] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!autoScroll) {
      // empty state (e.g. after New chat): start at the greeting, and let the
      // next conversation's first message re-arm the follow-to-bottom rule
      el.scrollTo({ top: 0 })
      firstRef.current = true
      return
    }
    if (focusSelector) {
      const target = el.querySelector(focusSelector)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setAway(false)
        return
      }
    }
    // only follow when the user is already near the bottom (their content)
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 160
    if (firstRef.current || nearBottom) {
      firstRef.current = false
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
      setAway(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollKey, autoScroll, focusSelector])

  const onScroll = () => {
    const el = ref.current
    if (!el) return
    setAway(el.scrollHeight - el.scrollTop - el.clientHeight > 260)
  }

  return (
    <div className={cn('relative flex min-h-0 flex-1 flex-col', className)}>
      <div
        ref={ref}
        onScroll={onScroll}
        className="scroll-calm scroll-fade-y flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-3"
      >
        <div className="flex flex-col gap-4">{children}</div>
      </div>
      {away && (
        <button
          type="button"
          onClick={() =>
            ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' })
          }
          className="pressable absolute bottom-4 left-1/2 z-30 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/20 bg-standout/95 px-3.5 py-1.5 text-2xs font-medium text-fg-on-inverted shadow-large backdrop-blur-md transition-transform active:scale-95"
        >
          <IconArrowLeft className="size-3.5 -rotate-90" />
          {tr('jumpToLatest')}
        </button>
      )}
    </div>
  )
}
