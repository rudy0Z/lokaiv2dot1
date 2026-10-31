import { AnimatePresence, motion } from 'motion/react'
import { useApp } from '../../lib/app-context'
import { navigate, NEW_CHAT_EVENT, useHashRoute } from '../../lib/router'
import { MATTERS } from '../../data/matters'
import { isVaultCleared } from '../../lib/vault'
import { cn } from '../../lib/cn'
import { ChatHistoryList } from '../cases/ChatHistoryList'
import { LogoMark } from './LogoMark'
import { IconCheck, IconChevronRight, IconCompose, IconFolder, IconPanelLeft, IconUser } from './icons'

/**
 * The navigation drawer, ChatGPT/Gemini model (Jakob's law): New chat on
 * top, the user's Cases (the "Projects" of this product — one dispute, many
 * conversations), then Recent chats grouped by date, and the account row at
 * the bottom which opens Settings. Rendered INSIDE the device frame; the
 * status bar stays on top of it, and its first row lines up with the app
 * header so the open/close control never jumps.
 */
export function CaseSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { tr, direction, setActiveCase } = useApp()
  const { path } = useHashRoute()
  const cleared = isVaultCleared()

  const go = (to: string) => {
    navigate(to)
    onClose()
  }

  const newChat = () => {
    setActiveCase(null)
    window.dispatchEvent(new CustomEvent(NEW_CHAT_EVENT))
    go('/')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 z-40 bg-scrim"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: direction === 'rtl' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: direction === 'rtl' ? '100%' : '-100%' }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 start-0 z-50 flex w-[86%] max-w-[320px] flex-col border-e border-line-default bg-shell pt-11 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label={tr('openMenu')}
          >
            {/* row 1 — same 48px band and 8px inset as the app header */}
            <div className="flex h-12 shrink-0 items-center gap-2 px-2">
              <button
                type="button"
                onClick={onClose}
                aria-label={tr('closeMenu')}
                className="pressable inline-flex size-10 shrink-0 items-center justify-center rounded-full text-fg-secondary transition-colors hover:bg-hover-veil hover:text-fg-primary"
              >
                <IconPanelLeft className="size-[18px]" />
              </button>
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <LogoMark />
                <span className="font-serif text-base font-semibold text-fg-primary">LokAI</span>
              </span>
            </div>

            <div className="px-2 pb-2 pt-1">
              <button
                type="button"
                onClick={newChat}
                className="pressable flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-start text-sm font-medium text-fg-primary transition-colors hover:bg-hover-veil"
              >
                <IconCompose className="size-[18px] shrink-0 text-fg-secondary" />
                {tr('newChatShort')}
              </button>
            </div>

            <div className="scroll-calm flex-1 overflow-y-auto overscroll-contain px-2 pb-4">
              {cleared ? (
                <p className="px-3 py-6 text-sm text-fg-tertiary">{tr('noCases')}</p>
              ) : (
                <div className="flex flex-col gap-5">
                  <section aria-label={tr('casesLabel')}>
                    <h3 className="px-3 pb-1 text-2xs font-medium text-fg-tertiary">{tr('casesLabel')}</h3>
                    <ul className="flex flex-col">
                      {MATTERS.map((m) => {
                        const active = path === `/case/${m.id}` || path.startsWith(`/case/${m.id}/`)
                        return (
                          <li key={m.id}>
                            <button
                              type="button"
                              onClick={() => go(`/case/${m.id}`)}
                              aria-current={active ? 'page' : undefined}
                              className={cn(
                                'flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-start transition-colors',
                                active ? 'bg-component-active' : 'hover:bg-hover-veil',
                              )}
                            >
                              <IconFolder
                                className={cn('size-4 shrink-0', m.resolved ? 'text-fg-tertiary' : 'text-brand-fg')}
                              />
                              <span
                                className={cn(
                                  'min-w-0 flex-1 truncate text-sm',
                                  m.resolved ? 'text-fg-secondary' : 'text-fg-primary',
                                )}
                                lang={m.lang}
                              >
                                {m.titleNative}
                              </span>
                              {m.resolved && (
                                <>
                                  <IconCheck className="size-3.5 shrink-0 text-positive-fg" />
                                  <span className="sr-only">{tr('caseResolved')}</span>
                                </>
                              )}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </section>

                  <section aria-label={tr('recentLabel')}>
                    <h2 className="sr-only">{tr('recentLabel')}</h2>
                    <ChatHistoryList dense onNavigate={onClose} />
                  </section>
                </div>
              )}
            </div>

            {/* account row → Settings (language, theme, privacy, reviewer tools) */}
            <div className="border-t border-line-subtle p-2">
              <button
                type="button"
                onClick={() => go('/settings')}
                aria-current={path === '/settings' ? 'page' : undefined}
                className="pressable flex min-h-12 w-full items-center gap-3 rounded-xl px-2 text-start transition-colors hover:bg-hover-veil"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-on-brand-subtle">
                  <IconUser className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-fg-primary">{tr('demoUser')}</span>
                  <span className="block truncate text-2xs text-fg-tertiary">{tr('settingsTitle')}</span>
                </span>
                <IconChevronRight className="size-4 shrink-0 text-fg-tertiary rtl:-scale-x-100" />
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
