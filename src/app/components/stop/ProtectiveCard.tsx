import { toast } from 'sonner'
import { useApp } from '../../lib/app-context'
import { copyText } from '../../lib/format'
import { REASSURANCE } from '../../data/refund-journey'
import type { ScopeDecision } from '../../data/scope-rules'
import { Button } from '../ui/Button'
import { IconPhone, IconShield } from '../ui/icons'

/**
 * In-thread protective triage card: the hard stop meets the user INSIDE the
 * conversation — empathy in the register the situation calls for, immediate
 * human channels, and a door into the full guide — instead of replacing the
 * whole screen (the thread stays browsable, the composer stays live).
 */
export function ProtectiveCard({
  decision,
  onOpenGuide,
  onReRoute,
}: {
  decision: ScopeDecision
  onOpenGuide: () => void
  onReRoute: () => void
}) {
  const { tr, lang } = useApp()
  return (
    <div className="rounded-2xl bg-standout p-4 text-fg-on-inverted" role="status">
      <div className="flex items-center gap-2">
        <IconShield className="size-4 shrink-0 text-fg-on-inverted" />
        {/* A4b: tracking is a Latin-only nicety — condition it, never wrap localized text in lang="en" */}
        <span className={'text-2xs font-semibold' + (lang === 'en' ? ' tracking-wide' : '')}>
          {tr('tierHardStop')}
        </span>
      </div>

      <p className="mt-2.5 text-lg font-semibold leading-snug">
        {REASSURANCE.urgent[lang] ?? REASSURANCE.urgent.en}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-fg-standout-secondary">{decision.why}</p>

      <p className="mt-3.5 text-2xs font-semibold text-fg-standout-secondary">{tr('protectHelp')}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {/* deep-audit fix: the emergency affordance is honest — a copy action
            (the app cannot dial), not a decorative dead button */}
        <Button
          variant="inverted"
          size="sm"
          leadingIcon={<IconPhone className="size-3.5" />}
          title={tr('simulatedTag')}
          onClick={async () => {
            const ok = await copyText('112')
            if (ok) toast.success(`${tr('protectPolice')} — ${tr('copied')}`)
          }}
        >
          {tr('protectPolice')}
        </Button>
      </div>

      <div className="mt-3 flex flex-col items-start gap-1 border-t border-veil-standout pt-3">
        <Button variant="inverted" size="sm" block onClick={onOpenGuide}>
          {tr('protectGuide')}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-fg-standout-secondary enabled:hover:bg-veil-standout"
          onClick={onReRoute}
        >
          {tr('tellMore')}
        </Button>
      </div>
    </div>
  )
}
