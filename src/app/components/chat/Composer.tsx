import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { toast } from 'sonner'
import { useApp } from '../../lib/app-context'
import { cn } from '../../lib/cn'
import { navigate } from '../../lib/router'
import { IconDoc, IconMic, IconPaperclip, IconSend, IconX } from '../ui/icons'

export interface ComposerProps {
  onSend: (text: string, attachments: string[]) => void
  /** fully disabled (gallery/idle surfaces) */
  disabled?: boolean
  /**
   * Send locked while the engine is busy — typing stays live (audit fix:
   * the composer never locks the human out mid-turn).
   */
  sendLocked?: boolean
  offline?: boolean
  attachments: string[]
  onAttach: (name: string) => void
  onRemoveAttachment: (name: string) => void
}

const MOCK_DOCS = ['bill-homekart.pdf', 'photo-when-opened.jpg']

/**
 * Large rounded composer (ChatGPT/Gemini register) with a MOCK attachment
 * tray — real file inputs are forbidden by the verify gate.
 */
export function Composer({
  onSend,
  disabled,
  sendLocked,
  offline,
  attachments,
  onAttach,
  onRemoveAttachment,
}: ComposerProps) {
  const { tr } = useApp()
  const [text, setText] = useState('')
  const [trayOpen, setTrayOpen] = useState(false)
  const areaRef = useRef<HTMLTextAreaElement>(null)
  const sendDisabled = disabled || sendLocked

  useEffect(() => {
    const el = areaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`
  }, [text])

  const submit = () => {
    const value = text.trim()
    if (!value || sendDisabled || offline) return
    onSend(value, attachments)
    setText('')
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {trayOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ 
              type: "spring",
              stiffness: 450,
              damping: 30,
            }}
            style={{ transformOrigin: 'bottom center' }}
            className="absolute inset-x-0 bottom-full mb-2 rounded-xl border border-line-default bg-modal p-3 shadow-lg"
            role="dialog"
            aria-label={tr('attachTitle')}
          >
            <p className="text-xs font-semibold text-fg-primary">{tr('attachTitle')}</p>
            <p className="mt-0.5 text-xs text-fg-tertiary">{tr('attachHint')}</p>
            <div className="mt-2 flex flex-col gap-1">
              {MOCK_DOCS.map((doc) => (
                <button
                  key={doc}
                  type="button"
                  onClick={() => {
                    onAttach(doc)
                    setTrayOpen(false)
                  }}
                  className="flex min-h-11 items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-start hover:bg-hover-veil active:bg-hover-veil/70"
                >
                  <IconDoc className="size-4 shrink-0 text-fg-tertiary" />
                  <span className="text-sm text-fg-primary">{doc}</span>
                  <span className="text-xs text-fg-tertiary">(mock)</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* one calm surface: hairline + one soft shadow, no hover/tap theatre */}
      <div
        className={cn(
          'rounded-[26px] border border-line-default bg-card shadow-default transition-[border-color] duration-200',
          offline ? 'opacity-60' : 'focus-within:border-line-strong',
        )}
      >
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 px-3 py-2">
            {attachments.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-2 rounded-lg bg-sunken px-3 py-1.5 text-xs text-fg-secondary"
              >
                <IconDoc className="size-4" />
                <span className="max-w-[120px] truncate">{a}</span>
                <button
                  type="button"
                  aria-label={`${tr('discard')} ${a}`}
                  onClick={() => onRemoveAttachment(a)}
                  className="rounded-full p-0.5 text-fg-tertiary hover:text-fg-primary active:bg-hover-veil"
                >
                  <IconX className="size-4" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex items-end gap-1.5 px-2 py-1.5">
          <motion.button
            type="button"
            aria-label={tr('composerAttach')}
            disabled={disabled || offline}
            onClick={() => setTrayOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            className="pressable inline-flex size-10 shrink-0 items-center justify-center rounded-full text-fg-tertiary transition-colors hover:bg-hover-veil hover:text-fg-primary disabled:opacity-40"
          >
            <IconPaperclip className="size-5" />
          </motion.button>

          <textarea
            ref={areaRef}
            data-composer-input=""
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                submit()
              }
            }}
            rows={1}
            disabled={disabled || offline}
            placeholder={offline ? tr('offlineBanner') : tr('composerPlaceholder')}
            aria-label={tr('composerPlaceholder')}
            className="max-h-[140px] min-h-10 flex-1 resize-none bg-transparent py-2 text-base text-fg-primary placeholder:text-fg-tertiary focus:outline-none"
          />

          {/* ChatGPT grammar: empty → voice, typed → send (same slot) */}
          {text.trim() === '' ? (
            <motion.button
              type="button"
              aria-label={tr('composerVoice')}
              disabled={disabled || offline}
              onClick={() => navigate('/voice')}
              whileTap={{ scale: 0.92 }}
              className="pressable inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-on-ink transition-colors disabled:opacity-40"
            >
              <IconMic className="size-[18px]" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              aria-label={tr('composerSend')}
              disabled={sendDisabled || offline}
              onClick={submit}
              whileTap={{ scale: 0.92 }}
              className={cn(
                'pressable inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-colors',
                sendDisabled || offline ? 'bg-sunken text-fg-disabled' : 'bg-brand-solid text-on-brand-solid',
              )}
            >
              <IconSend className="size-[18px]" />
            </motion.button>
          )}
        </div>
      </div>
      {sendLocked && !disabled && (
        <p className="mt-1.5 px-2 text-2xs text-fg-tertiary" role="status">
          <TypingHint />
        </p>
      )}
    </div>
  )
}

function TypingHint() {
  const { tr } = useApp()
  return <>{tr('stageWriting')}…</>
}

/** tiny helper so gallery can trigger a copy toast without sonner imports */
export function copiedToast(label: string) {
  toast.success(label)
}
