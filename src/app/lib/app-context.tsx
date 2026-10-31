import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ALL_LANGS, LANGUAGES, type LangCode } from '../data/languages'
import { UI, type UiKey } from '../data/i18n'
import { UI_DRAFTS } from '../data/i18n-drafts'

type Theme = 'light' | 'dark'

interface AppContextValue {
  theme: Theme
  toggleTheme: () => void
  lang: LangCode
  /** persist=false for transient changes (replay immersion) that must not
      outlive the session or survive a reload */
  setLang: (l: LangCode, persist?: boolean) => void
  /** localized UI chrome string */
  tr: (key: UiKey) => string
  direction: 'ltr' | 'rtl'
  /** the case folder a new day-chat will belong to (session-scope — a
      refresh is a fresh visit; the case lives in the sidebar, not storage) */
  activeCaseId: string | null
  setActiveCase: (id: string | null) => void
}

const AppContext = createContext<AppContextValue | null>(null)

function readStored<T extends string>(key: string, fallback: T, valid: readonly T[]): T {
  try {
    const v = window.localStorage.getItem(key)
    if (v && (valid as readonly string[]).includes(v)) return v as T
  } catch {
    /* private mode etc. */
  }
  return fallback
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => readStored('lokai.theme', 'light', ['light', 'dark'] as const))
  const [lang, setLangState] = useState<LangCode>(() => readStored('lokai.lang', 'en', ALL_LANGS))
  const [activeCaseId, setActiveCase] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const cfg = LANGUAGES[lang]
    document.documentElement.lang = lang
    document.documentElement.dataset.script = cfg.script
    document.documentElement.dir = cfg.direction
  }, [lang])

  const toggleTheme = useCallback(() => {
    // better-ui recipe: suppress every color transition during the swap, then
    // restore after the next painted frame — otherwise the ivory<->night
    // switch smears as all transitions fire at once
    const root = document.documentElement
    root.classList.add('theme-switching')
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      try {
        window.localStorage.setItem('lokai.theme', next)
      } catch {
        /* ignore */
      }
      return next
    })
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove('theme-switching'))
    })
  }, [])

  const setLang = useCallback((l: LangCode, persist = true) => {
    setLangState(l)
    if (!persist) return
    try {
      window.localStorage.setItem('lokai.lang', l)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      toggleTheme,
      lang,
      setLang,
      /** fallback law: full pack -> draft pack -> English, never a blank */
      tr: (key: UiKey) => UI[key]?.[lang] ?? UI_DRAFTS[key]?.[lang] ?? UI[key]?.en ?? '',
      direction: LANGUAGES[lang].direction,
      activeCaseId,
      setActiveCase,
    }),
    [theme, toggleTheme, lang, setLang, activeCaseId],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp outside AppProvider')
  return ctx
}
