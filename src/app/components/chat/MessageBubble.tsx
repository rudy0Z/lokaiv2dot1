import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '../../lib/cn'
import { useApp } from '../../lib/app-context'
import { IconPlay } from '../ui/icons'

export type MessageRole = 'user' | 'assistant' | 'system'

export interface VoiceMeta {
  /** monospace duration pill, e.g. '0:18' */
  duration: string
  edited?: boolean
}

export interface MessageBubbleProps {
  role: MessageRole
  children: ReactNode
  /** user message being edited / changed downstream */
  stale?: boolean
  onStaleAction?: () => void
  staleActionLabel?: string
  /** this user bubble is a chosen answer (Update affordance lives here) */
  isAnswer?: boolean
  /** quiet action row under assistant text (copy etc.) */
  actions?: ReactNode
  /** thread item id — lets the thread scroll this block's top into view */
  dataId?: number
  /** renders the simulated voice-note header above the text */
  voiceMeta?: VoiceMeta
  className?: string
}

/**
 * ChatGPT/Gemini-style asymmetry: user turns get a soft bubble on the end
 * side; assistant turns read as full-width document text (cards live inside
 * them); system notes are quiet centered chrome.
 */
const BAR_HEIGHTS = [38, 62, 90, 55, 78, 40, 95, 60, 84, 45, 70, 100, 52, 88, 42, 74, 58, 92, 48, 80, 36, 66, 90, 56]

/** Simulated voice-note header: play, 24-bar waveform, duration — honest by
 *  law (no audio exists; the progress is a timed visual, tagged by caption). */
function VoiceNoteHeader({ meta }: { meta: VoiceMeta }) {
  const { tr } = useApp()
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!playing) return
    const total = 18 // the simulated clip length in seconds
    const t = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          setPlaying(false)
          return 0
        }
        return Math.min(1, p + 0.25 / total)
      })
    }, 250)
    return () => window.clearInterval(t)
  }, [playing])
  const filled = Math.round(progress * BAR_HEIGHTS.length)
  return (
    <div className="mb-2 flex flex-col gap-1.5 border-b border-dashed border-line-subtle pb-2">
      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          onClick={() => setPlaying((v) => !v)}
          aria-pressed={playing}
          aria-label={playing ? tr('replayPause') : tr('replayPlay')}
          whileTap={{ scale: 0.95 }}
          className="pressable flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-solid text-on-brand-solid shadow-sm"
          style={{ minWidth: 'var(--touch-target)' }}
        >
          {playing ? (
            <span className="flex gap-[3px]" aria-hidden="true">
              <span className="h-2.5 w-[3px] bg-current animate-pulse" />
              <span className="h-2.5 w-[3px] bg-current animate-pulse delay-75" />
            </span>
          ) : (
            <IconPlay className="size-4" />
          )}
        </motion.button>
        <motion.div 
          className="flex h-7 min-w-0 flex-1 items-end gap-[2px]" 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          {BAR_HEIGHTS.map((h, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: i < filled ? 1 : 0.3 }}
              transition={{ duration: 0.2, delay: i * 0.01 }}
              className={cn('w-full max-w-[6px] flex-1 rounded-full transition-colors', i < filled ? 'bg-brand-solid' : 'bg-fg-tertiary/30')}
              style={{ height: `${h}%` }}
            />
          ))}
        </motion.div>
        <span className="shrink-0 rounded-full bg-sunken px-2.5 py-1 font-mono text-xs text-fg-secondary">
          {meta.duration}
        </span>
      </div>
      <p className="text-xs text-fg-tertiary">{tr('voiceMetaCaption')}{meta.edited ? ' · ✓' : ''}</p>
    </div>
  )
}

export function MessageBubble({
  role,
  children,
  stale = false,
  onStaleAction,
  staleActionLabel,
  isAnswer = false,
  actions,
  dataId,
  className,
  voiceMeta,
}: MessageBubbleProps) {
  if (role === 'system') {
    return (
      <div className={cn('flex justify-center px-2 py-1', className)} data-chat-item={dataId}>
        <motion.p 
          className="rounded-full bg-sunken px-3.5 py-1 text-xs text-fg-tertiary"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >{children}</motion.p>
      </div>
    )
  }

  if (role === 'assistant') {
    return (
      /* ChatGPT parity: the assistant never signs its own turns — the voice
         IS the identity. Actions reveal on hover (desktop); on touch they
         stay visible (no hover to reveal them). */
      <motion.div 
        className={cn('group/turn flex flex-col gap-2 scroll-mt-20', className)}
        data-chat-item={dataId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="min-w-0 text-fg-primary">{children}</div>
        {actions && (
          <motion.div 
            className="-mt-0.5 flex items-center gap-2 transition-opacity [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within/turn:opacity-100 [@media(hover:hover)]:group-hover/turn:opacity-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ opacity: 1 }} // Always visible on mobile
          >
            {actions}
          </motion.div>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div 
      className={cn('flex flex-col items-end scroll-mt-20', className)}
      data-chat-item={dataId}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ChatGPT/iMessage grammar: one flat soft fill, no border, no
          shadow, no hover theatre — the user's words, quietly held */}
      <div
        className={cn(
          'max-w-[85%] rounded-[22px] px-4 py-2.5 text-sm',
          stale ? 'bg-warning-subtle text-on-warning-subtle' : 'bg-component-active text-fg-primary',
        )}
      >
        {voiceMeta && <VoiceNoteHeader meta={voiceMeta} />}
        {children}
      </div>
      {onStaleAction && (stale || isAnswer) && (
        <motion.button
          type="button"
          onClick={onStaleAction}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="pressable mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-brand-fg underline-offset-4 hover:underline"
          style={{ minWidth: 'var(--touch-target)' }}
        >
          {staleActionLabel}
        </motion.button>
      )}
    </motion.div>
  )
}
