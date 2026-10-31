import type { ReactNode } from 'react'
import { useState } from 'react'
import { useApp } from '../../lib/app-context'
import { cn } from '../../lib/cn'
import { ALL_LANGS, LANGUAGES } from '../../data/languages'
import { navigate, NEW_CHAT_EVENT } from '../../lib/router'
import { CaseSidebar } from './CaseSidebar'
import { SandboxDrawer } from '../sandbox/SandboxDrawer'
import { IconArrowLeft, IconCompose, IconMoon, IconPanelLeft, IconSun } from './icons'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, tr } = useApp()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`${tr('themeLabel')}: ${theme}`}
      className={cn(
        // 44px target (deep-audit P2-11) — the toggle is used by older users
        'pressable inline-flex size-11 items-center justify-center rounded-full text-fg-secondary',
        className,
      )}
    >
      {theme === 'light' ? <IconMoon className="size-[18px]" /> : <IconSun className="size-[18px]" />}
    </button>
  )
}

export function LanguageSelect({ className }: { className?: string }) {
  const { lang, setLang, tr } = useApp()
  // honest grouping (deep-audit §6(e)): full languages vs interface preview
  const full = ALL_LANGS.filter((c) => LANGUAGES[c].coverage === 'full')
  const preview = ALL_LANGS.filter((c) => LANGUAGES[c].coverage !== 'full')
  return (
    <label className={cn('inline-flex items-center', className)}>
      <span className="sr-only">{tr('langLabel')}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as typeof lang)}
        aria-label={tr('langLabel')}
        className="min-h-11 cursor-pointer rounded-full bg-transparent px-1.5 text-sm font-medium text-fg-secondary focus-visible:outline-none"
      >
        <optgroup label={tr('langGroupFull')}>
          {full.map((c) => (
            <option key={c} value={c}>
              {LANGUAGES[c].short}
            </option>
          ))}
        </optgroup>
        <optgroup label={tr('langGroupPreview')}>
          {preview.map((c) => (
            <option key={c} value={c}>
              {LANGUAGES[c].short}
            </option>
          ))}
        </optgroup>
      </select>
    </label>
  )
}

/**
 * Desktop reviewer tour — a quiet floating card in the margin OUTSIDE the
 * device frame (lg+): the six moments that matter, ~60 seconds.
 */
function ReviewerTour({ onUrdu }: { onUrdu: () => void }) {
  const stops: { n: string; label: string; go: () => void }[] = [
    { n: '01', label: 'Voice intake → review', go: () => navigate('/voice') },
    { n: '02', label: 'Golden refund journey', go: () => navigate('/?s=refund-golden') },
    { n: '03', label: 'Marathi notice reader', go: () => navigate('/notice') },
    { n: '04', label: 'Safety hard-stop', go: () => navigate('/?s=stop-eviction') },
    { n: '05', label: 'Urdu RTL', go: onUrdu },
    { n: '06', label: 'Type specimen', go: () => navigate('/specimen') },
  ]
  return (
    <aside
      dir="ltr"
      className="pointer-events-none fixed start-6 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <div className="pointer-events-auto flex w-64 flex-col gap-1.5 rounded-3xl border border-line-subtle bg-shell/85 p-4 shadow-xl backdrop-blur-xl">
        <p className="font-serif text-sm font-semibold text-fg-primary">Reviewing the prototype?</p>
        <p className="mb-1.5 text-2xs leading-relaxed text-fg-secondary">
          Six moments, about a minute. The phone is live — everything runs on mock data.
        </p>
        {stops.map((s) => (
          <button
            key={s.n}
            type="button"
            onClick={s.go}
            className="pressable flex min-h-11 items-center gap-2.5 rounded-xl px-2 text-start text-2xs font-medium text-fg-secondary transition-colors hover:bg-hover-veil"
          >
            <span className="text-2xs font-semibold tabular-nums text-brand-fg">{s.n}</span>
            {s.label}
          </button>
        ))}
      </div>
    </aside>
  )
}

export { NEW_CHAT_EVENT }

export interface AppShellProps {
  /** deprecated - bottom tab bar removed for modern AI app pattern */
  activeTab?: never
  showTabs?: false
  /** replaces the default New chat action at the header's end */
  topBarExtra?: ReactNode
  /** header title; defaults to the LokAI wordmark */
  title?: ReactNode
  /** when set, the leading control is Back (drill-down pages) instead of the menu */
  onBack?: () => void
  children: ReactNode
  footer?: ReactNode
}

/**
 * Mobile-prototype presentation: full-bleed on real phones, centered device
 * frame on desktop (this IS a mobile prototype — the frame stays).
 *
 * Header = the ChatGPT/Gemini mobile pattern (Jakob's law): menu (or Back on
 * drill-down pages) · centred title · New chat. Language and theme live in
 * Settings, not in the primary chrome.
 */
export function AppShell({ topBarExtra, title, onBack, children, footer }: AppShellProps) {
  const { tr, setLang, setActiveCase } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const newChat = () => {
    setActiveCase(null)
    window.dispatchEvent(new CustomEvent(NEW_CHAT_EVENT))
    navigate('/')
  }

  return (
    <div className="flex h-dvh items-center justify-center overflow-hidden bg-page p-2 sm:p-4">
      <ReviewerTour onUrdu={() => { setLang('ur'); navigate('/') }} />
      <div className="device-chassis flex h-[min(852px,calc(100dvh-1rem))] w-[min(410px,calc(100vw-1rem))] shrink-0 flex-col sm:h-[min(864px,calc(100dvh-2rem))] [@media(horizontal-viewport-segments:2)]:!h-dvh [@media(horizontal-viewport-segments:2)]:!w-full [@media(horizontal-viewport-segments:2)]:!rounded-none [@media(horizontal-viewport-segments:2)]:!p-0">
        {/* Hardware side buttons (decorative) */}
        <span aria-hidden="true" className="device-button-left top-28 h-7" />
        <span aria-hidden="true" className="device-button-left top-40 h-12" />
        <span aria-hidden="true" className="device-button-left top-56 h-12" />
        <span aria-hidden="true" className="device-button-right top-44 h-16" />

        <div
          data-app-frame
          className={
            'device-screen relative flex min-h-0 flex-1 flex-col overflow-hidden bg-shell ' +
            '[@media(horizontal-viewport-segments:2)]:!h-dvh [@media(horizontal-viewport-segments:2)]:!w-full ' +
            '[@media(horizontal-viewport-segments:2)]:!rounded-none'
          }
        >
          {/* iOS-grade Mobile Status Bar + Dynamic Island — sits ABOVE the
              drawer (z-[60]) so the sidebar never covers the system chrome */}
          <div
            dir="ltr"
            aria-hidden="true"
            className="relative z-[60] flex h-11 shrink-0 select-none items-center justify-between px-6 pt-1.5 text-xs font-semibold tabular-nums text-fg-primary"
          >
            <span className="w-14 text-start tracking-tight">9:41</span>
            <div className="device-island flex h-[26px] w-[104px] items-center justify-end rounded-full px-2.5">
              <span className="size-2.5 rounded-full bg-fg-tertiary/35" />
            </div>
            <div className="flex w-14 items-center justify-end gap-1.5">
              {/* Cellular signal bars */}
              <span className="inline-flex items-end gap-[1.5px]">
                <span className="h-1 w-[2.5px] rounded-xs bg-fg-primary" />
                <span className="h-1.5 w-[2.5px] rounded-xs bg-fg-primary" />
                <span className="h-2 w-[2.5px] rounded-xs bg-fg-primary" />
                <span className="h-2.5 w-[2.5px] rounded-xs bg-fg-primary" />
              </span>
              {/* Wi-Fi & Battery */}
              <span className="text-[10px] font-semibold leading-none text-fg-secondary">5G</span>
              <span className="inline-flex items-center">
                <span className="flex h-2.5 w-5 items-center rounded-[3px] border border-fg-primary/65 p-[1.5px]">
                  <span className="h-full w-3.5 rounded-[1px] bg-fg-primary" />
                </span>
              </span>
            </div>
          </div>

          {/* HEADER — one 48px row: leading control · centred title · New chat */}
          <header className="relative z-30 flex h-12 shrink-0 items-center gap-1 bg-shell px-2">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label={tr('back')}
                className="pressable inline-flex size-10 shrink-0 items-center justify-center rounded-full text-fg-secondary transition-colors hover:bg-hover-veil hover:text-fg-primary"
              >
                <IconArrowLeft className="size-[18px] rtl:-scale-x-100" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label={tr('openMenu')}
                aria-expanded={sidebarOpen}
                className="pressable inline-flex size-10 shrink-0 items-center justify-center rounded-full text-fg-secondary transition-colors hover:bg-hover-veil hover:text-fg-primary"
              >
                <IconPanelLeft className="size-[18px]" />
              </button>
            )}
            <div className="min-w-0 flex-1 px-1 text-center">
              {title ? (
                <span className="block truncate text-sm font-semibold text-fg-primary">{title}</span>
              ) : (
                <span className="font-serif text-base font-semibold text-fg-primary">LokAI</span>
              )}
            </div>
            <div className="flex min-w-10 shrink-0 items-center justify-end">
              {topBarExtra ?? (
                <button
                  type="button"
                  onClick={newChat}
                  aria-label={tr('newChatShort')}
                  className="pressable inline-flex size-10 items-center justify-center rounded-full text-fg-secondary transition-colors hover:bg-hover-veil hover:text-fg-primary"
                >
                  <IconCompose className="size-[18px]" />
                </button>
              )}
            </div>
          </header>

        <main className="flex min-h-0 flex-1 flex-col">{children}</main>

        {footer && (
          <div className="relative z-20 px-3.5 pb-1.5 pt-1">{footer}</div>
        )}
        
        {/* Home indicator bar inside the mobile frame */}
        <div aria-hidden="true" className="flex h-5 shrink-0 items-center justify-center pb-1">
          <span className="h-1 w-32 rounded-full bg-fg-primary/20" />
        </div>
        
        <SandboxDrawer />
        <CaseSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <p className="sr-only">{tr('roleLine')}</p>
        </div>
      </div>
    </div>
  )
}
