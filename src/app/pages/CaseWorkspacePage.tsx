import { useState } from 'react'
import { useApp } from '../lib/app-context'
import { navigate } from '../lib/router'
import { cn } from '../lib/cn'
import { matterById, docsUpTo, DOC_KIND_LABEL, type CaseDay, type MatterRecord } from '../data/matters'
import { legalById } from '../data/legal-content'
import { domainPack } from '../data/domain-playbooks'
import { getMatterLog } from '../lib/vault'
import { formatDate } from '../lib/format'
import { AppShell } from '../components/ui/shell'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { ListGroup } from '../components/ui/ListGroup'
import { MessageBubble } from '../components/chat/MessageBubble'
import { ExhibitPaper } from '../components/documents/ExhibitPaper'
import { ThreadSummaryCard } from '../components/cases/ThreadSummaryCard'
import { FactCheckCard } from '../components/cards/FactCheckCard'
import { FindingCard } from '../components/cards/FindingCard'
import { ActionLadder } from '../components/cards/ActionLadder'
import { CloseOutCard } from '../components/cards/CloseOutCard'
import { HandoverCard } from '../components/cards/HandoverCard'
import { StatutoryCounterCard } from '../components/cards/StatutoryCounterCard'
import { SectionRef } from '../components/trust/SectionRef'
import { VerificationBadge } from '../components/trust/VerificationBadge'
import { IconCheck, IconChevronRight, IconCompose, IconFolder } from '../components/ui/icons'

const COVERAGE = {
  direct: { tone: 'positive', key: 'coverageDirect' },
  related: { tone: 'warning', key: 'coverageRelated' },
  missing: { tone: 'danger', key: 'coverageMissing' },
} as const

const isRtl = (m: MatterRecord) => m.lang === 'ur' || m.lang === 'ks' || m.lang === 'sd'

/**
 * A Case — this product's "Project" (ChatGPT Projects / Gemini Gems model):
 * one dispute that spans many dated conversations. The overview is the one
 * place for everything the case holds — progress, conversations, what we
 * know, documents, sources and the user's own log. (It absorbs the old
 * Matter-detail and Saved screens, which showed the same records three ways.)
 * A dated conversation opens read-only; "Continue this case" is the single
 * way forward, pinned where the composer lives.
 */
export default function CaseWorkspacePage({ id, dayParam }: { id: string; dayParam?: string }) {
  const { tr, setActiveCase } = useApp()
  const matter = matterById(id)

  if (!matter) {
    return (
      <AppShell showTabs={false}>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
          <p className="text-sm text-fg-secondary">This case could not be found.</p>
          <Button variant="secondary" size="sm" onClick={() => navigate('/history')}>
            {tr('allChats')}
          </Button>
        </div>
      </AppShell>
    )
  }

  const dayIndex =
    dayParam !== undefined ? Math.max(0, Math.min(matter.days.length - 1, Number(dayParam) || 0)) : null
  const day = dayIndex !== null ? matter.days[dayIndex] : undefined

  const continueCase = () => {
    setActiveCase(matter.id)
    navigate('/')
  }

  return (
    <AppShell
      showTabs={false}
      title={day ? <span lang={matter.lang}>{day.title}</span> : undefined}
      onBack={day ? () => navigate(`/case/${matter.id}`) : undefined}
      footer={
        <Button variant="primary" size="lg" block leadingIcon={<IconCompose className="size-4" />} onClick={continueCase}>
          {tr('continueCase')}
        </Button>
      }
    >
      {day && dayIndex !== null ? (
        <DayView matter={matter} day={day} dayIndex={dayIndex} />
      ) : (
        <Overview matter={matter} />
      )}
    </AppShell>
  )
}

/* ─────────────────────────── case overview ─────────────────────────── */

function Overview({ matter }: { matter: MatterRecord }) {
  const { tr } = useApp()
  const log = matter.id === 'h1' ? getMatterLog() : {}
  const conversations = matter.days.map((d, i) => ({ d, i })).reverse()

  return (
    <div className="scroll-calm flex-1 overflow-y-auto px-4 pb-6 pt-2" dir={isRtl(matter) ? 'rtl' : undefined}>
      <div className="mx-auto flex max-w-[360px] flex-col gap-6">
        {/* identity */}
        <header className="flex items-start gap-3 px-1">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-subtle text-on-brand-subtle">
            <IconFolder className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold leading-snug text-fg-primary" lang={matter.lang}>
              {matter.titleNative}
            </h1>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-2xs tabular-nums text-fg-tertiary" lang={matter.lang}>
              <span>{matter.amount}</span>
              <span aria-hidden="true">·</span>
              <span>{matter.statusLine}</span>
            </p>
            {matter.resolved && (
              <Badge tone="positive" variant="subtle" className="mt-2">
                {tr('caseResolved')}
              </Badge>
            )}
          </div>
        </header>

        <Progress matter={matter} />

        {/* conversations — date-wise, newest first */}
        <ListGroup label={tr('caseConversations')}>
          <ul className="divide-y divide-line-subtle">
            {conversations.map(({ d, i }) => (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => navigate(`/case/${matter.id}/d/${i}`)}
                  className="flex min-h-14 w-full items-center gap-3 px-4 py-2.5 text-start transition-colors hover:bg-hover-veil"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-fg-primary" lang={matter.lang}>
                      {d.title}
                    </span>
                    <span className="block text-2xs tabular-nums text-fg-tertiary" lang={matter.lang}>
                      {d.dateLabel}
                    </span>
                  </span>
                  <IconChevronRight className="size-4 shrink-0 text-fg-tertiary rtl:-scale-x-100" />
                </button>
              </li>
            ))}
          </ul>
        </ListGroup>

        {/* what we know — the case's shared memory */}
        <ListGroup label={tr('caseFacts')}>
          <dl className="divide-y divide-line-subtle">
            {matter.memory.map((row) => (
              <div key={row.label} className="flex items-baseline gap-3 px-4 py-2.5">
                <dt className="w-24 shrink-0 text-2xs text-fg-tertiary" lang={matter.lang}>
                  {row.label}
                </dt>
                <dd className="min-w-0 flex-1 text-sm text-fg-primary" lang={matter.lang}>
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </ListGroup>

        {/* documents — everything the case holds, day-stamped */}
        {matter.docs.length > 0 && (
          <ListGroup label={tr('caseDocuments')} bodyClassName="border-0 bg-transparent">
            <div className="stagger-in grid grid-cols-2 gap-2.5">
              {matter.docs.map((d) => (
                <div key={d.id} className="flex flex-col gap-1">
                  <ExhibitPaper name={d.name} />
                  <span className="truncate text-2xs tabular-nums text-fg-tertiary" lang={matter.lang}>
                    {matter.days[d.dayIndex]?.dateLabel} · {DOC_KIND_LABEL[d.kind]}
                  </span>
                </div>
              ))}
            </div>
          </ListGroup>
        )}

        {/* sources — resolved through legal-content.ts, never inline (law 1) */}
        {matter.sources.length > 0 && (
          <ListGroup label={tr('sourcesLabel')}>
            <ul className="divide-y divide-line-subtle">
              {matter.sources.map((s) => {
                const legal = legalById(s.legalId)
                if (!legal) return null
                const cov = COVERAGE[s.coverage]
                return (
                  <li key={s.legalId} className="flex flex-col gap-2 px-4 py-3">
                    <p className="text-sm font-medium text-fg-primary" lang="en">
                      {legal.source}
                    </p>
                    <SectionRef sectionRef={legal.sectionRef} />
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge tone={cov.tone} variant="subtle">
                        {tr(cov.key)}
                      </Badge>
                      <VerificationBadge verified={legal.verified} />
                    </div>
                  </li>
                )
              })}
            </ul>
          </ListGroup>
        )}

        {/* the user's own device-local log + items saved from chat (was "Saved") */}
        {(log.step1SentAt || log.closedAt || (log.saved?.length ?? 0) > 0) && (
          <ListGroup label={tr('matterLogTitle')}>
            <ul className="divide-y divide-line-subtle">
              {log.step1SentAt && (
                <LogRow text={`${tr('matterLogStep1')} · ${formatDate(log.step1SentAt)}`} />
              )}
              {log.closedAt && <LogRow text={`${tr('matterLogClosed')} · ${formatDate(log.closedAt)}`} />}
              {log.saved?.map((s, i) => (
                <LogRow key={`${s.savedAt}-${i}`} text={`${tr('savedFromChat')}: ${s.title} · ${formatDate(s.savedAt)}`} />
              ))}
            </ul>
          </ListGroup>
        )}

        {matter.receipt && <HandoverCard tierLabel={matter.receipt.tierLabel} why={matter.receipt.why} />}

        <p className="px-4 text-center text-2xs text-fg-tertiary">{tr('caseSampleNote')}</p>
      </div>
    </div>
  )
}

function LogRow({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5 px-4 py-2.5 text-sm text-fg-primary">
      <IconCheck className="mt-1 size-3.5 shrink-0 text-positive-fg" />
      <span className="min-w-0 flex-1 tabular-nums">{text}</span>
    </li>
  )
}

/** Progress as one segmented bar + the stage names on a wrapping line —
    the whole arc at a glance, current stage emphasised. */
function Progress({ matter }: { matter: MatterRecord }) {
  const { tr } = useApp()
  return (
    <ListGroup label={tr('stagesLabel')}>
      <div className="flex flex-col gap-2.5 p-4">
        <div className="flex gap-1" aria-hidden="true">
          {matter.stages.map((s) => (
            <span
              key={s.key}
              className={cn(
                'h-1.5 flex-1 rounded-full',
                s.status === 'done' && 'bg-positive-solid',
                s.status === 'current' && 'bg-brand-solid',
                s.status === 'todo' && 'bg-sunken',
              )}
            />
          ))}
        </div>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-2xs" lang="en">
          {matter.stages.map((s) => (
            <li
              key={s.key}
              aria-current={s.status === 'current' ? 'step' : undefined}
              className={cn(
                'inline-flex items-center gap-1',
                s.status === 'done' && 'text-fg-secondary',
                s.status === 'current' && 'font-semibold text-fg-primary',
                s.status === 'todo' && 'text-fg-tertiary',
              )}
            >
              {s.status === 'done' && <IconCheck className="size-3 text-positive-fg" />}
              {s.label}
            </li>
          ))}
        </ol>
      </div>
    </ListGroup>
  )
}

/* ─────────────────────── one dated conversation ─────────────────────── */

function DayView({ matter, day, dayIndex }: { matter: MatterRecord; day: CaseDay; dayIndex: number }) {
  const { tr } = useApp()
  const [summaryOpen, setSummaryOpen] = useState(false)
  const pack = matter.domain ? domainPack(matter.domain, 'standard', matter.lang) : undefined
  const docs = docsUpTo(matter, dayIndex)
  const counterLegal = legalById('tpa-wear-tear')

  return (
    <div className="scroll-calm flex-1 overflow-y-auto px-4 pb-6 pt-2" dir={isRtl(matter) ? 'rtl' : undefined}>
      <div className="mx-auto flex max-w-[360px] flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => navigate(`/case/${matter.id}`)}
            className="inline-flex min-h-9 min-w-0 items-center gap-1.5 rounded-full bg-sunken px-3 text-2xs font-medium text-fg-secondary transition-colors hover:bg-component-hover"
          >
            <IconFolder className="size-3.5 shrink-0 text-brand-fg" />
            <span className="truncate" lang={matter.lang}>
              {matter.titleNative}
            </span>
          </button>
          <span className="text-2xs tabular-nums text-fg-tertiary" lang={matter.lang}>
            {day.dateLabel}
          </span>
        </div>

        {day.turns.length >= 3 && day.summary && (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setSummaryOpen((v) => !v)}
              aria-expanded={summaryOpen}
              className="pressable self-start rounded-full border border-line-default bg-card px-3 py-1.5 text-2xs font-medium text-fg-secondary transition-colors hover:bg-component-hover"
            >
              {tr('quickSummarise')}
            </button>
            {summaryOpen && <ThreadSummaryCard summary={day.summary} lang={matter.lang} />}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {day.turns.map((t, i) => (
            <MessageBubble key={i} role={t.role} voiceMeta={t.voice ? { duration: '0:14', edited: true } : undefined}>
              <p className="whitespace-pre-line text-sm leading-relaxed" lang={matter.lang}>
                {t.text}
              </p>
            </MessageBubble>
          ))}
        </div>

        {/* structural cards from this historical session, read-only */}
        {day.cards?.includes('factcheck') && (
          <FactCheckCard
            signed
            facts={matter.memory.map((m) => ({ key: m.label, label: m.label, value: m.value }))}
            onConfirm={() => {}}
          />
        )}

        {day.cards?.includes('finding') && pack && (
          <FindingCard
            data={{
              title: pack.finding.title,
              whatHappened: day.summary?.grievance ?? '',
              lawSays: pack.finding.lawSays,
              means: pack.finding.means,
              legalId: pack.finding.legalId,
              confidence: 'clear',
              reasoningSteps: pack.finding.reasoning,
            }}
          />
        )}

        {day.cards?.includes('counter') && counterLegal && (
          <StatutoryCounterCard
            title="Counter-reply"
            statutoryBasis={`${counterLegal.source} · ${counterLegal.sectionRef}`}
            replyText={`${counterLegal.claim}\n\nThe deduction from my deposit came with no itemised bills. Please share the bills, or return the balance.`}
          />
        )}

        {/* the ladder only where the case runs on a domain playbook — no
            generic refund drafts on a tax or electricity matter */}
        {day.cards?.includes('ladder') && pack && (
          <ActionLadder
            mode="full"
            drafts={pack.drafts}
            prep={pack.prep}
            stepTitles={pack.stepTitles}
            channel={pack.channel}
            initialExpandedStep={dayIndex === 0 ? 1 : 2}
          />
        )}

        {day.cards?.includes('closeout') && <CloseOutCard findingTitle={matter.finding?.title} />}

        {docs.length > 0 && (
          <ListGroup label={tr('caseDocuments')} bodyClassName="border-0 bg-transparent">
            <div className="stagger-in grid grid-cols-2 gap-2.5">
              {docs.map((d) => (
                <div key={d.id} className="flex flex-col gap-1">
                  <ExhibitPaper name={d.name} />
                  <span className="truncate text-2xs text-fg-tertiary" lang="en">
                    {DOC_KIND_LABEL[d.kind]}
                  </span>
                </div>
              ))}
            </div>
          </ListGroup>
        )}

        <p className="px-4 text-center text-2xs text-fg-tertiary">{tr('caseSampleNote')}</p>
      </div>
    </div>
  )
}
