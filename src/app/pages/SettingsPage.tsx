import { useState } from 'react'
import { toast } from 'sonner'
import { useApp } from '../lib/app-context'
import { cn } from '../lib/cn'
import { AppShell } from '../components/ui/shell'
import { Button } from '../components/ui/Button'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { Disclosure } from '../components/ui/Disclosure'
import { ListGroup } from '../components/ui/ListGroup'
import { SandboxTrigger } from '../components/sandbox/SandboxDrawer'
import { IconCheck, IconMoon, IconRefresh, IconSun, IconUser } from '../components/ui/icons'
import { ALL_LANGS, LANGUAGES, type LangCode } from '../data/languages'
import { isVaultCleared, markVaultCleared, restoreVault } from '../lib/vault'

function LanguageRow({ code }: { code: LangCode }) {
  const { lang, setLang } = useApp()
  const cfg = LANGUAGES[code]
  const active = lang === code
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={() => setLang(code)}
      className="flex min-h-12 w-full items-center gap-3 px-4 py-2 text-start transition-colors hover:bg-hover-veil"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-fg-primary" lang={code}>
          {cfg.native}
        </span>
        {code !== 'en' && (
          <span className="block text-2xs text-fg-tertiary" lang="en">
            {cfg.english}
          </span>
        )}
      </span>
      {active && <IconCheck className="size-4 shrink-0 text-brand-fg" />}
    </button>
  )
}

/**
 * Settings (replaces the old "Profile"): everything that is a preference,
 * not a conversation — language, appearance, privacy — plus the prototype's
 * reviewer tools, fenced off at the bottom so they never read as product UI.
 */
export default function SettingsPage() {
  const { tr, theme, toggleTheme } = useApp()
  const [cleared, setCleared] = useState(isVaultCleared)
  const full = ALL_LANGS.filter((c) => LANGUAGES[c].coverage === 'full')
  const preview = ALL_LANGS.filter((c) => LANGUAGES[c].coverage !== 'full')

  return (
    <AppShell showTabs={false} title={tr('settingsTitle')}>
      <div className="scroll-calm flex-1 overflow-y-auto px-4 pb-8 pt-2">
        <div className="mx-auto flex max-w-[360px] flex-col gap-6">
          {/* account */}
          <div className="flex items-center gap-3 rounded-2xl border border-line-subtle bg-card p-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-on-brand-subtle">
              <IconUser className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-fg-primary">{tr('demoUser')}</p>
              <p className="text-2xs text-fg-tertiary">{tr('profileNote')}</p>
            </div>
          </div>

          <ListGroup label={tr('appearanceLabel')}>
            <div role="radiogroup" aria-label={tr('themeLabel')} className="grid grid-cols-2 gap-1 p-1.5">
              {(['light', 'dark'] as const).map((t) => {
                const active = theme === t
                return (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => !active && toggleTheme()}
                    className={cn(
                      'pressable flex min-h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors',
                      active ? 'bg-sunken text-fg-primary' : 'text-fg-secondary hover:bg-hover-veil',
                    )}
                  >
                    {t === 'light' ? <IconSun className="size-4" /> : <IconMoon className="size-4" />}
                    {t === 'light' ? tr('themeLight') : tr('themeDark')}
                  </button>
                )
              })}
            </div>
          </ListGroup>

          <ListGroup label={tr('langLabel')} note={tr('profileLangsNote')}>
            <div role="radiogroup" aria-label={tr('langGroupFull')} className="divide-y divide-line-subtle">
              {full.map((c) => (
                <LanguageRow key={c} code={c} />
              ))}
            </div>
            <div className="border-t border-line-subtle">
              <Disclosure
                bare
                title={tr('moreLanguages')}
                subtitle={tr('langGroupPreview')}
                contentClassName="border-t border-line-subtle"
              >
                <div role="radiogroup" aria-label={tr('langGroupPreview')} className="divide-y divide-line-subtle">
                  {preview.map((c) => (
                    <LanguageRow key={c} code={c} />
                  ))}
                </div>
              </Disclosure>
            </div>
          </ListGroup>

          <ListGroup label={tr('privacyTitle')}>
            <div className="flex flex-col gap-3 p-4">
              <p className="text-sm text-fg-secondary">{tr('privacyBody')}</p>
              <div className="rounded-xl bg-sunken px-3.5 py-3">
                <p className="text-2xs font-semibold text-fg-secondary">{tr('whatStored')}</p>
                <p className="mt-1 text-2xs text-fg-secondary">{tr('storedBody')}</p>
              </div>
              <ConfirmDialog
                danger
                trigger={
                  <Button variant="secondary" size="sm" className="self-start text-danger-fg hover:bg-danger-subtle">
                    {tr('deleteAll')}
                  </Button>
                }
                title={tr('deleteAll')}
                body={tr('deleteAllConfirm')}
                confirmLabel={tr('deleteYes')}
                cancelLabel={tr('deleteNo')}
                onConfirm={() => {
                  try {
                    window.localStorage.clear()
                    window.sessionStorage.clear()
                  } catch {
                    /* ignore */
                  }
                  markVaultCleared()
                  setCleared(true)
                  toast.success(tr('deleteYes'))
                }}
              />
            </div>
          </ListGroup>

          <ListGroup label={tr('reviewerLabel')} note={tr('reviewerNote')}>
            <div className="divide-y divide-line-subtle p-1.5">
              <SandboxTrigger />
              {cleared && (
                <button
                  type="button"
                  onClick={() => {
                    restoreVault()
                    setCleared(false)
                    toast.success(tr('restoreSamples'))
                  }}
                  className="pressable flex min-h-11 w-full items-center gap-2 rounded-xl px-2 text-start text-2xs font-medium text-fg-secondary transition-colors hover:bg-hover-veil"
                >
                  <IconRefresh className="size-4 shrink-0 text-fg-tertiary" />
                  {tr('restoreSamples')}
                </button>
              )}
            </div>
          </ListGroup>
        </div>
      </div>
    </AppShell>
  )
}
