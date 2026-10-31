import { useEffect, useRef, useState } from 'react'
import { useApp } from '../lib/app-context'
import { cn } from '../lib/cn'
import { legalById } from '../data/legal-content'
import {
  NOTICE_DOC,
  NOTICE_FIELDS,
  NOTICE_SUMMARY,
  type NoticeField,
} from '../data/notice-interpretation'
import { NOTICE_FIELD_LABELS, NOTICE_NEXT_STEPS_L } from '../data/localized-content'
import { AppShell } from '../components/ui/shell'
import { Badge } from '../components/ui/Badge'
import { Banner } from '../components/ui/Banner'
import { ConfidenceIndicator } from '../components/trust/ConfidenceIndicator'
import { VerificationBadge } from '../components/trust/VerificationBadge'
import { ReasoningPill } from '../components/trust/ReasoningPill'
import { SectionRef } from '../components/trust/SectionRef'
import { ScanDocument } from '../components/notice/ScanDocument'
import { SpeakPill } from '../components/trust/SpeakPill'
import { IconDoc, IconExternal } from '../components/ui/icons'
import { runBeats } from '../lib/engine'

type Phase = 'reading' | 'interpreting' | 'done'

/**
 * Phase 3 — notice interpreter. Explains ONLY what the notice says; every
 * extracted field is editable-in-place and taps through to the exact
 * original clause (tap-to-source). Disputes route to human help.
 */
export default function NoticePage() {
  const { tr, lang } = useApp()
  const [phase, setPhase] = useState<Phase>('reading')
  /* overhaul Part 6: Re-scan replays the optical pass — the effect re-runs
     per scanKey so the beats walk again from a clean phase */
  const [scanKey, setScanKey] = useState(0)
  const [openField, setOpenField] = useState<NoticeField | null>(null)
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(NOTICE_FIELDS.map((f) => [f.id, f.value])),
  )
  const [activeClause, setActiveClause] = useState<number | null>(null)
  const clauseRefs = useRef<(HTMLLIElement | null)[]>([])

  // deterministic reading beats, then the interpretation (StrictMode-safe:
  // re-running only re-walks the beats and re-sets phase)
  useEffect(() => {
    let cancelled = false
    setPhase('reading')
    runBeats('disclose', (label) => {
      if (label === 'stageWriting' && !cancelled) setPhase('interpreting')
    }).then(() => {
      if (!cancelled) setPhase('done')
    })
    return () => {
      cancelled = true
    }
  }, [scanKey])

  const tapField = (field: NoticeField) => {
    setOpenField(openField?.id === field.id ? null : field)
    setActiveClause(field.clauseIndex)
    clauseRefs.current[field.clauseIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const legal = legalById('mmc-property-tax')

  if (phase !== 'done') {
    return (
      <AppShell showTabs={false} onBack={() => history.back()}>
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          <ScanDocument fileName={NOTICE_DOC.fileName} />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell showTabs={false} onBack={() => history.back()}>
      <div className="scroll-calm flex-1 overflow-y-auto px-4 py-5">
        <div className="mx-auto flex max-w-[340px] flex-col gap-4">
          {/* scanned source banner (overhaul Part 6): the decode is anchored
              to its document — one tap replays the scan */}
          <div className="flex items-center justify-between gap-2 rounded-full bg-sunken px-3.5 py-2">
            <span className="flex min-w-0 items-center gap-1.5 text-2xs text-fg-secondary" lang="en">
              <IconDoc className="size-3.5 shrink-0 text-fg-tertiary" />
              <span className="truncate">{NOTICE_DOC.fileName}</span>
              <span className="shrink-0 text-fg-tertiary">· {NOTICE_FIELDS.length} clauses</span>
            </span>
            <button
              type="button"
              onClick={() => setScanKey((k) => k + 1)}
              className="pressable shrink-0 rounded-full px-2 py-1 text-2xs font-medium text-brand-fg"
            >
              ↻ {tr('retry')}
            </button>
          </div>

          {/* what this means */}
          <section className="bg-card rounded-2xl p-4">
            <div className="flex items-start justify-between gap-2">
              <h1 className="text-xl font-semibold leading-snug text-fg-primary">{tr('noticeMeaning')}</h1>
              <SpeakPill text={NOTICE_SUMMARY[lang] ?? NOTICE_SUMMARY.en!} className="shrink-0" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-fg-primary">{NOTICE_SUMMARY[lang] ?? NOTICE_SUMMARY.en!}</p>
            <p className="mt-2 text-2xs text-fg-tertiary" lang="en">
              {NOTICE_DOC.authority} · {NOTICE_DOC.sourceLangLabel}
            </p>
          </section>

          {/* key points — editable, tap-to-source */}
          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-fg-primary">{tr('keyPoints')}</h2>
            <ol className="flex flex-col gap-2">
              {NOTICE_FIELDS.map((field) => (
                <li key={field.id}>
                  <div className="bg-card rounded-2xl">
                    <button
                      type="button"
                      aria-expanded={openField?.id === field.id}
                      onClick={() => tapField(field)}
                      className="flex w-full items-center gap-3 p-3.5 text-start"
                    >
                      {/* bidirectional grounding badge: [n] maps 1-to-1 to the
                          original clause below (master prompt Part 5) */}
                      <span
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-2xs font-semibold tabular-nums text-on-brand-subtle"
                        aria-hidden="true"
                      >
                        {field.clauseIndex + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-2xs text-fg-tertiary">
                          {NOTICE_FIELD_LABELS[lang]?.[field.id as keyof (typeof NOTICE_FIELD_LABELS)['en']] ?? field.label}
                        </span>
                        <span className="block text-sm font-medium text-fg-primary">{values[field.id]}</span>
                      </span>
                      {field.confidence !== 'clear' && (
                        <Badge tone="warning" variant="subtle">{tr('confLikely')}</Badge>
                      )}
                    </button>
                    {openField?.id === field.id && (
                      <div className="border-t border-line-subtle p-3.5">
                        <input
                          value={values[field.id] ?? ''}
                          onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))}
                          aria-label={field.label}
                          className="min-h-11 w-full rounded-lg border border-line-default bg-card px-3 text-sm text-fg-primary focus-visible:border-brand-line focus-visible:outline-none"
                        />
                        <p className="mt-1.5 text-2xs text-fg-tertiary">{tr('confLikelyDesc')}</p>
                        <ConfidenceIndicator level={field.confidence} className="mt-2" />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* what you can do next */}
          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-fg-primary">{tr('whatNext')}</h2>
            <div className="grid grid-cols-1 gap-2">
              {(NOTICE_NEXT_STEPS_L[lang] ?? NOTICE_NEXT_STEPS_L.en!).map((label) => (
                <div
                  key={label}
                  className="rounded-xl border border-line-default bg-card px-3.5 py-3 text-sm text-fg-primary"
                >
                  {label}
                </div>
              ))}
            </div>
            <Banner tone="info">{tr('noticeExplainer')}</Banner>
          </section>

          {/* sources */}
          <section className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-semibold text-fg-primary">{tr('sourcesLabel')}</h2>
              <span className="text-2xs text-fg-tertiary">{tr('viewAll')}</span>
            </div>
            {legal && (
              <div className="flex items-center gap-2.5 rounded-xl border border-line-default bg-card px-3.5 py-3" lang="en">
                <IconDoc className="size-4 shrink-0 text-fg-tertiary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-fg-primary">{legal.source}</p>
                  <SectionRef sectionRef={legal.sectionRef} />
                </div>
                <IconExternal className="size-3.5 shrink-0 text-fg-tertiary" />
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <VerificationBadge verified={legal?.verified ?? false} />
              <ReasoningPill
                steps={[
                  'Read the notice image and split it into lines (mock OCR)',
                  'Detected language: Marathi — summarized in your language',
                  'Extracted five fields, each with its own confidence',
                  'Nothing was sent anywhere; everything stays on this device',
                ]}
              />
            </div>
          </section>

          {/* original document viewer */}
          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-fg-primary">{tr('readOriginal')}</h2>
            <ol className="flex flex-col gap-1.5" lang="mr">
              {NOTICE_DOC.clauses.map((clause) => (
                <li
                  key={clause.index}
                  ref={(el) => {
                    clauseRefs.current[clause.index] = el
                  }}
                  className={cn(
                    'rounded-xl border px-3.5 py-3 transition-colors',
                    activeClause === clause.index
                      ? 'border-brand-line bg-brand-subtle'
                      : 'border-line-default bg-card',
                  )}
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-2xs tabular-nums text-fg-tertiary" lang="en">
                      [{clause.index + 1}]
                    </span>
                    <p className="min-w-0 flex-1 text-base leading-relaxed text-fg-primary">{clause.text}</p>
                  </div>
                  <p className="mt-1 ps-6 text-2xs text-fg-tertiary" lang="en">
                    {clause.gloss}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </AppShell>
  )
}
