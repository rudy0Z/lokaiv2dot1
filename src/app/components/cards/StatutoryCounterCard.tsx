import { useState } from 'react'
import { toast } from 'sonner'
import { useApp } from '../../lib/app-context'
import { copyText } from '../../lib/format'
import { Button } from '../ui/Button'
import { IconCopy, IconCheck } from '../ui/icons'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'

export interface StatutoryCounterCardProps {
  title?: string
  statutoryBasis?: string
  replyText: string
  className?: string
}

export function StatutoryCounterCard({
  title = 'Statutory Counter-Reply',
  statutoryBasis = 'Consumer Protection Act, 2019 · S. 84 [VERIFY]',
  replyText,
  className,
}: StatutoryCounterCardProps) {
  const { tr } = useApp()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const ok = await copyText(replyText)
    if (ok) {
      setCopied(true)
      toast.success(tr('copied'))
      setTimeout(() => setCopied(false), 3000)
    }
  }

  return (
    <div className={cn('flex flex-col gap-3 rounded-2xl border border-line-default bg-card p-4', className)}>
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-fg-primary">{title}</h3>
          <p className="mt-0.5 text-2xs text-fg-tertiary">{statutoryBasis}</p>
        </div>
        <Badge tone="brand" variant="subtle">Targeted Counter</Badge>
      </div>

      <div className="rounded-xl bg-sunken p-3">
        <p className="whitespace-pre-line text-sm leading-relaxed text-fg-primary">
          {replyText}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 pt-1">
        <span className="text-2xs text-fg-tertiary">Copy for WhatsApp or email</span>
        <Button
          variant="primary"
          size="sm"
          leadingIcon={copied ? <IconCheck className="size-3.5 text-positive-fg" /> : <IconCopy className="size-3.5" />}
          onClick={handleCopy}
        >
          {copied ? tr('ladderCopied') : tr('copy')}
        </Button>
      </div>
    </div>
  )
}
