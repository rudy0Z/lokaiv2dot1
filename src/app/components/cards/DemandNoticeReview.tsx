import { useState } from 'react'
import { toast } from 'sonner'
import { useApp } from '../../lib/app-context'
import { copyText } from '../../lib/format'
import { buildNotice } from '../../lib/matter-facts'
import type { FactRecord } from '../../lib/matter-facts'
import { Banner } from '../ui/Banner'
import { Button } from '../ui/Button'
import { Checkbox } from '../ui/Checkbox'
import { Field, Textarea } from '../ui/Field'
import { IconArrowLeft, IconCopy } from '../ui/icons'

/**
 * Demand notice behind an explicit review + consent step (A2.7): paper
 * stationery register, every field editable, consent checkbox gates the
 * final render. Nothing is exported or sent by the app itself.
 * Fields are BUILT FROM THE SIGNED FACTS (deep-audit fix) — no hardcoded
 * order numbers, amounts or dates.
 */
export function DemandNoticeReview({
  facts,
  subjectOverride,
  bodyOverride,
  onBack,
}: {
  facts: FactRecord
  /** domain-playbook overrides (multi-domain engine) — the editable notice
      speaks the domain's own demand, not the mixer template */
  subjectOverride?: string
  bodyOverride?: string
  onBack: () => void
}) {
  const { tr, lang } = useApp()
  const notice = buildNotice(facts, lang)
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries([
      ...notice.fields.map((f) => [f.key, f.value]),
      ['subject', subjectOverride ?? notice.fields.find((f) => f.key === 'subject')?.value ?? ''],
      ['body', bodyOverride ?? notice.body],
    ]),
  )
  const [consented, setConsented] = useState(false)
  const [finalText, setFinalText] = useState<string | null>(null)

  const compose = () =>
    [
      ...notice.fields.map((f) =>
        f.key === 'subject' && subjectOverride
          ? `${f.label}: ${values.subject ?? ''}`
          : `${f.label}: ${values[f.key] ?? ''}`,
      ),
      values.body ?? '',
    ]
      .join('\n\n')
      .trim()

  if (finalText !== null) {
    return (
      <div className="scroll-calm flex-1 overflow-y-auto px-3.5 py-4">
        <div className="mx-auto flex max-w-[340px] flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-fg-primary">{tr('noticeFinalTitle')}</h2>
            <Button variant="ghost" size="sm" leadingIcon={<IconArrowLeft className="size-3.5" />} onClick={onBack}>
              {tr('back')}
            </Button>
          </div>
          <div className="paper rounded-2xl p-5 font-serif text-sm leading-[28px]" lang="en">
            <pre className="whitespace-pre-wrap font-serif">{finalText}</pre>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              size="sm"
              leadingIcon={<IconCopy className="size-3.5" />}
              onClick={async () => {
                const ok = await copyText(finalText)
                if (ok) toast.success(tr('copied'))
              }}
            >
              {tr('noticeCopyAll')}
            </Button>
            <Banner tone="info" className="flex-1">
              {tr('noticeSendHint')}
            </Banner>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="scroll-calm flex-1 overflow-y-auto px-3.5 py-4">
      <div className="mx-auto flex max-w-[340px] flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-fg-primary">{tr('noticeReviewTitle')}</h2>
          <Button variant="ghost" size="sm" leadingIcon={<IconArrowLeft className="size-3.5" />} onClick={onBack}>
            {tr('back')}
          </Button>
        </div>
        <Banner tone="warning">{tr('noticeReviewBanner')}</Banner>

        <div className="paper flex flex-col gap-4 rounded-[18px] p-5" lang="en">
          {notice.fields.map((f) => (
            <Field key={f.key} label={f.label}>
              {(id) => (
                <Textarea
                  id={id}
                  rows={2}
                  value={values[f.key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  className="resize-none rounded-none border-x-0 border-t-0 border-warning-line/40 bg-transparent px-0 font-serif"
                />
              )}
            </Field>
          ))}
          <Field label={notice.labels.body}>
            {(id) => (
              <Textarea
                id={id}
                value={values.body ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, body: e.target.value }))}
                className="bg-transparent border-warning-line/40 font-serif leading-[28px]"
                rows={10}
              />
            )}
          </Field>
        </div>

        <Checkbox checked={consented} onChange={(e) => setConsented(e.target.checked)} label={tr('noticeConsent')} />
        <Button
          variant="primary"
          block
          disabled={!consented}
          onClick={() => {
            setFinalText(compose())
            toast.success(tr('noticePrepare'))
          }}
        >
          {tr('noticePrepare')}
        </Button>
      </div>
    </div>
  )
}
