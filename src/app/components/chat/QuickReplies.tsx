import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Chip } from '../ui/Chip'

export interface QuickReplyOption {
  id: string
  label: string
  onSelect: () => void
  leadingIcon?: ReactNode
}

/** Wrapping chip row — never truncates (long Tamil/Urdu labels reflow). */
export function QuickReplies({ options, className }: { options: QuickReplyOption[]; className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((o) => (
        <Chip key={o.id} onClick={o.onSelect} leadingIcon={o.leadingIcon}>
          {o.label}
        </Chip>
      ))}
    </div>
  )
}
