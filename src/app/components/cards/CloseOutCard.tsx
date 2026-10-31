import { useState } from 'react'
import { toast } from 'sonner'
import { useApp } from '../../lib/app-context'
import { formatDate } from '../../lib/format'
import { getMatterLog, updateMatterLog } from '../../lib/vault'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { IconCheck } from '../ui/icons'

/**
 * Closure ritual (deep-audit §6c): procedural logging, never an invented
 * legal outcome. The user records where the matter stands — step sent,
 * saved for later, or resolved — and the log lives on this device only.
 * PRODUCT.md Law #3 holds: we acknowledge the PROCESS ("return for Step 2"),
 * never celebrate an outcome.
 */
export function CloseOutCard({ findingTitle }: { findingTitle?: string }) {
  const { tr } = useApp()
  const [log, setLog] = useState(() => getMatterLog())

  const done = Boolean(log.step1SentAt || log.closedAt || log.saved?.length)

  return (
    <Card className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-fg-primary">{tr('closeTitle')}</h3>

      {log.step1SentAt ? (
        <p className="rounded-xl bg-positive-subtle px-3.5 py-2.5 text-sm text-on-positive-subtle">
          {tr('closeStep1Done').replace('{date}', formatDate(log.step1SentAt))}
        </p>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          className="self-start"
          leadingIcon={<IconCheck className="size-3.5 text-positive-fg" />}
          onClick={() => {
            setLog(updateMatterLog({ step1SentAt: new Date().toISOString() }))
            toast.success(tr('matterLogStep1'))
          }}
        >
          {tr('closeStep1')}
        </Button>
      )}

      {!log.closedAt && (
        <Button
          variant="secondary"
          size="sm"
          className="self-start"
          onClick={() => {
            const title = findingTitle?.trim() || tr('savedTitle')
            const saved = [...(getMatterLog().saved ?? []), { title, savedAt: new Date().toISOString() }]
            setLog(updateMatterLog({ saved }))
            toast.success(tr('closeSaveDone'))
          }}
        >
          {tr('closeSave')}
        </Button>
      )}

      {log.closedAt ? (
        <p className="rounded-xl bg-sunken px-3.5 py-2.5 text-sm text-fg-secondary">
          {tr('closeResolvedDone').replace('{date}', formatDate(log.closedAt))}
        </p>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          className="self-start text-danger-fg hover:bg-danger-subtle"
          onClick={() => {
            setLog(updateMatterLog({ closedAt: new Date().toISOString() }))
            toast.success(tr('matterLogClosed'))
          }}
        >
          {tr('closeResolved')}
        </Button>
      )}

      {done && <p className="text-2xs text-fg-tertiary">{tr('matterLogTitle')}</p>}
    </Card>
  )
}
