import { useState } from 'react'
import { useApp } from '../../lib/app-context'
import { cn } from '../../lib/cn'
import { legalById } from '../../data/legal-content'
import type { ScopeDecision } from '../../data/scope-rules'
import { Badge } from '../ui/Badge'
import { Banner } from '../ui/Banner'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Field, Input } from '../ui/Field'
import { Skeleton } from '../ui/Skeleton'
import { IconArrowLeft, IconShield } from '../ui/icons'
import { VerificationBadge } from '../trust/VerificationBadge'

export type StopTreatment = 'inverted' | 'light'

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi (NCT)', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

/** DLSA is district-specific: ask, then show a clearly-marked [VERIFY] placeholder. */
function DlsaPanel({ inverted }: { inverted: boolean }) {
  const { tr } = useApp()
  const legal = legalById('dlsa-routing')
  const [stateName, setStateName] = useState('')
  const [district, setDistrict] = useState('')
  const [result, setResult] = useState<'none' | 'unavailable' | 'found'>('none')

  return (
    <div className="flex flex-col gap-3">
      <Card
        className={cn(
          inverted ? 'border-line-inverted bg-transparent text-fg-on-inverted' : 'border-warning-line',
        )}
      >
        <p className="text-sm font-semibold">{tr('dlsaTitle')}</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <label className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="text-2xs font-medium opacity-80">{tr('dlsaState')}</span>
            <select
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              className={cn(
                'min-h-11 rounded-lg border px-2.5 text-sm',
                inverted
                  ? 'border-line-inverted bg-transparent text-fg-on-inverted'
                  : 'border-line-default bg-container text-fg-primary',
              )}
            >
              <option value="">—</option>
              {STATES.map((s) => (
                <option key={s} value={s} lang="en">
                  {s}
                </option>
              ))}
            </select>
          </label>
          <div className="min-w-0 flex-1">
            <Field label={tr('dlsaDistrict')} inverted>
              {(id) => (
                <Input
                  id={id}
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className={
                    inverted
                      ? 'border-line-inverted bg-transparent text-fg-on-inverted placeholder:text-fg-standout-secondary/60'
                      : ''
                  }
                />
              )}
            </Field>
          </div>
        </div>
        <Button
          variant={inverted ? 'inverted' : 'primary'}
          size="sm"
          className="mt-3 self-start"
          onClick={() => setResult(district.trim() === '' || stateName === '' ? 'unavailable' : 'found')}
        >
          {tr('dlsaFind')}
        </Button>
      </Card>

      {result === 'unavailable' && (
        <Banner tone={inverted ? 'info' : 'warning'}>
          {tr('dlsaUnavailable')} — {tr('dlsaPlaceholderNote')}
        </Banner>
      )}

      {result === 'found' && (
        <Card className={inverted ? 'border-line-inverted bg-transparent text-fg-on-inverted' : ''}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold" lang="en">
              District Legal Services Authority, {district}
            </span>
            <Badge tone={inverted ? 'inverted' : 'warning'} variant="outline" className="ms-auto" lang="en">
              {stateName}
            </Badge>
          </div>
          <dl className="mt-2.5 flex flex-col gap-1 font-mono text-2xs" lang="en">
            <div className="flex gap-2">
              <dt className="opacity-70">phone:</dt>
              <dd>[VERIFY — to be added]</dd>
            </div>
            <div className="flex gap-2">
              <dt className="opacity-70">address:</dt>
              <dd>[VERIFY — to be added]</dd>
            </div>
            <div className="flex gap-2">
              <dt className="opacity-70">hours:</dt>
              <dd>[VERIFY — to be added]</dd>
            </div>
          </dl>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <VerificationBadge inverted verified={legal?.verified ?? false} />
            <span className="text-2xs opacity-80">{tr('dlsaPlaceholderNote')}</span>
          </div>
        </Card>
      )}
    </div>
  )
}

export interface StopScreenProps {
  decision: ScopeDecision | null
  pending?: boolean
  onBack: () => void
  onReRoute: () => void
}

/**
 * Phase 2 protective stop. Calm, not punitive. TWO treatments kept side by
 * side behind a toggle — we do NOT assume the inverted screen feels safer
 * (spec requirement); the toggle persists so you can compare honestly.
 */
export function StopScreen({ decision, pending = false, onBack, onReRoute }: StopScreenProps) {
  const { tr } = useApp()
  const [treatment, setTreatment] = useState<StopTreatment>(
    () => (window.localStorage.getItem('lokai.stopTreatment') as StopTreatment) || 'inverted',
  )
  const inverted = treatment === 'inverted'

  const setAndStore = (t: StopTreatment) => {
    setTreatment(t)
    try {
      window.localStorage.setItem('lokai.stopTreatment', t)
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={cn(
        'scroll-calm flex-1 overflow-y-auto px-4 py-5',
        inverted && 'bg-standout text-fg-on-inverted',
      )}
      role="alert"
    >
      <div className="mx-auto flex max-w-[340px] flex-col gap-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className={cn(
              'inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-2xs font-medium',
              inverted ? 'text-fg-on-inverted hover:bg-veil-standout' : 'text-fg-secondary hover:bg-hover-veil',
            )}
          >
            <IconArrowLeft className="size-4" />
            {tr('back')}
          </button>
          <div
            className="flex items-center gap-1 rounded-full border p-0.5"
            role="group"
            aria-label={tr('treatmentLabel')}
          >
            {(['inverted', 'light'] as const).map((tName) => (
              <button
                key={tName}
                type="button"
                aria-pressed={treatment === tName}
                onClick={() => setAndStore(tName)}
                className={cn(
                  'min-h-9 rounded-full px-3 text-2xs font-medium transition-colors',
                  treatment === tName
                    ? inverted
                      ? tName === 'inverted'
                        ? 'bg-fg-on-inverted text-standout'
                        : 'text-fg-on-inverted'
                      : tName === 'light'
                        ? 'bg-fg-primary text-shell'
                        : 'text-fg-secondary'
                    : inverted
                      ? 'text-fg-standout-secondary'
                      : 'text-fg-tertiary',
                )}
              >
                {tName === 'inverted' ? tr('treatmentInverted') : tr('treatmentLight')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IconShield className={cn('size-5', inverted ? 'text-fg-on-inverted' : 'text-warning-fg')} />
          {pending ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <Badge tone={inverted ? 'inverted' : 'warning'} variant={inverted ? 'subtle' : 'subtle'}>
              {decision?.tier === 'hard-stop' ? tr('tierHardStop') : tr('tierCaution')}
              {decision?.certainty === 'uncertain' ? ' · ?' : ''}
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold leading-tight">
            {pending ? tr('classifyPending') + '…' : tr('stopHeadline')}
          </h1>
          <p className={cn('text-sm leading-relaxed', inverted ? 'text-fg-standout-secondary' : 'text-fg-secondary')}>
            {pending ? tr('stageChecking') + '…' : (decision?.why ?? '')}
          </p>
        </div>

        {pending ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        ) : (
          <>
            <DlsaPanel inverted={inverted} />
            <div className={cn('flex flex-col gap-2 border-t pt-4', inverted ? 'border-line-inverted' : 'border-line-subtle')}>
              <Button
                variant={inverted ? 'inverted' : 'secondary'}
                size="sm"
                className="self-start"
                onClick={onReRoute}
              >
                {tr('tellMore')}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
