import { useEffect, useState } from 'react'
import { useApp } from '../../lib/app-context'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Chip } from '../ui/Chip'
import { Input } from '../ui/Field'
import { IconCheck, IconDoc, IconPencil } from '../ui/icons'

export interface FactItem {
  key: string
  label: string
  value: string
}

export interface WhenOption {
  key: string
  label: string
}

/**
 * The verification gate inside the conversation (ported from v1's
 * InlineFactCheck): before any generative card, the user confirms or
 * corrects each fact. A2.7 made tangible — nothing is built on facts the
 * user hasn't signed.
 *
 * Deep-audit merge (PRODUCT.md Law #2): the purchase-window question is a
 * row INSIDE this gate — one consolidated confirmation, not two gates.
 * Empty slots render honestly as '—' and wait for the user to fill them;
 * the gate never asserts a fact the message did not supply.
 *
 * Craft law (master prompt Part 6): once signed, the gate collapses into a
 * one-line docket bar (`✓ n facts confirmed — item · seller · amount [Edit]`)
 * so the thread never becomes a wall of cards. [Edit] re-opens it inline.
 */
export function FactCheckCard({
  facts,
  onConfirm,
  whenOptions = [],
  signed = false,
  onEdit,
}: {
  facts: FactItem[]
  onConfirm: (values: Record<string, string>) => void
  whenOptions?: WhenOption[]
  signed?: boolean
  onEdit?: () => void
}) {
  const { tr } = useApp()
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(facts.map((f) => [f.key, f.value])),
  )
  const [editing, setEditing] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    if (signed) setExpanded(false)
  }, [signed])

  const whenChosen = whenOptions.find((o) => o.key === values.when)
  const needsWhen = whenOptions.length > 0 && !whenChosen
  const filled = facts.filter((f) =>
    f.key === 'when' && whenOptions.length > 0 ? Boolean(whenChosen) : Boolean(values[f.key]?.trim()),
  ).length
  const pct = facts.length ? Math.round((filled / facts.length) * 100) : 0

  if (signed && !expanded) {
    const glance = ['item', 'seller', 'amount']
      .map((k) => values[k])
      .filter(Boolean)
      .join(' · ')
    return (
      <div className="flex min-h-12 items-center gap-2.5 rounded-2xl border border-positive-line bg-positive-subtle py-2 pe-1.5 ps-3">
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-positive-solid text-on-positive-solid"
          aria-hidden="true"
        >
          <IconCheck className="size-3.5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-2xs font-semibold text-on-positive-subtle">
            {tr('factSigned').replace(/^✓\s*/, '').replace('{n}', String(facts.length))}
          </span>
          {glance && (
            <span className="block truncate text-2xs tabular-nums text-on-positive-subtle">{glance}</span>
          )}
        </span>
        <Button
          variant="ghost"
          size="sm"
          leadingIcon={<IconPencil className="size-3.5" />}
          className="shrink-0 text-on-positive-subtle"
          onClick={() => {
            setExpanded(true)
            onEdit?.()
          }}
        >
          {tr('edit')}
        </Button>
      </div>
    )
  }

  return (
    <Card className="overflow-hidden border border-line-default p-0">
      {/* docket header */}
      <div className="flex items-start gap-3 px-4 pb-3 pt-4">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-on-brand-subtle"
          aria-hidden="true"
        >
          <IconDoc className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold leading-snug text-fg-primary">{tr('factCheckTitle')}</h3>
          <p className="mt-0.5 text-2xs text-fg-tertiary">{tr('factCheckSub')}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 px-4 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-2xs">
          <span className="text-fg-tertiary">{tr('factTapHint')}</span>
          <span className="font-medium tabular-nums text-fg-secondary">
            {tr('factProgress').replace('{n}', String(filled)).replace('{total}', String(facts.length))}
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-sunken" aria-hidden="true">
          <div
            className="h-full rounded-full bg-brand-solid transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* full-width rows: the whole line is the edit target */}
      <ul className="divide-y divide-line-subtle border-y border-line-subtle">
        {facts.map((f) => {
          if (f.key === 'when' && whenOptions.length > 0) {
            return (
              <li key={f.key} className="flex flex-col gap-2 px-4 py-3">
                <span className="text-2xs text-fg-tertiary">{f.label}</span>
                {whenChosen ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-primary">
                      <IconCheck className="size-3.5 shrink-0 text-positive-fg" />
                      {whenChosen.label}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ms-auto text-brand-fg"
                      onClick={() => setValues((v) => ({ ...v, when: '' }))}
                    >
                      {tr('factCorrect')}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {whenOptions.map((o) => (
                      <Chip key={o.key} onClick={() => setValues((v) => ({ ...v, when: o.key }))}>
                        {o.label}
                      </Chip>
                    ))}
                  </div>
                )}
              </li>
            )
          }
          const value = values[f.key] ?? ''
          if (editing === f.key) {
            return (
              <li key={f.key} className="flex flex-col gap-1.5 bg-sunken px-4 py-2.5">
                <label htmlFor={`fact-${f.key}`} className="text-2xs font-medium text-fg-secondary">
                  {f.label}
                </label>
                <Input
                  id={`fact-${f.key}`}
                  autoFocus
                  value={value}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  onBlur={() => setEditing(null)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditing(null)}
                  className="min-h-10 py-1.5"
                />
              </li>
            )
          }
          return (
            <li key={f.key}>
              <button
                type="button"
                onClick={() => setEditing(f.key)}
                aria-label={`${tr('factCorrect')}: ${f.label}`}
                className="group flex min-h-12 w-full items-center gap-3 px-4 py-2.5 text-start transition-colors hover:bg-hover-veil"
              >
                <span className="w-24 shrink-0 text-2xs text-fg-tertiary">{f.label}</span>
                <span
                  className={cn(
                    'min-w-0 flex-1 text-sm font-medium tabular-nums',
                    value ? 'text-fg-primary' : 'text-fg-tertiary',
                  )}
                >
                  {value || '—'}
                </span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full text-fg-tertiary transition-colors group-hover:bg-component-hover group-hover:text-brand-fg">
                  <IconPencil className="size-3.5" />
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* the single confirmation gate */}
      <div className="flex flex-col gap-2 bg-sunken px-4 py-3">
        <Button
          variant="primary"
          size="md"
          block
          leadingIcon={<IconCheck className="size-4" />}
          disabled={needsWhen}
          onClick={() => onConfirm(values)}
        >
          {tr('factConfirm')}
        </Button>
        {needsWhen && <p className="text-center text-2xs text-fg-tertiary">{tr('factPickWhen')}</p>}
      </div>
    </Card>
  )
}
