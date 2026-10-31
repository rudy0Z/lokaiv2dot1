import { useApp } from '../../lib/app-context'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { IconCheck, IconPencil, IconRefresh, IconTrash } from '../ui/icons'

export interface CardActionsProps {
  onEdit?: () => void
  onRegenerate?: () => void
  onDiscard?: () => void
  editing?: boolean
  className?: string
}

/** Edit / Regenerate / Discard — the user-control affordance on every
 *  generative card (A2 rule 7, law 4). Quiet ghost toolbar: each action keeps
 *  its visible label (never icon-only); the glyph only speeds recognition.
 *  Discard sits apart at the far edge so it is never hit by accident. */
export function CardActions({ onEdit, onRegenerate, onDiscard, editing, className }: CardActionsProps) {
  const { tr } = useApp()
  return (
    <div className={cn('flex flex-wrap items-center gap-0.5', className)}>
      {onEdit && (
        <Button
          variant={editing ? 'secondary' : 'ghost'}
          size="sm"
          onClick={onEdit}
          leadingIcon={editing ? <IconCheck className="size-3.5" /> : <IconPencil className="size-3.5" />}
          className={editing ? undefined : 'text-fg-secondary'}
        >
          {editing ? tr('saveChanges') : tr('edit')}
        </Button>
      )}
      {onRegenerate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          leadingIcon={<IconRefresh className="size-3.5" />}
          className="text-fg-secondary"
        >
          {tr('regenerate')}
        </Button>
      )}
      {onDiscard && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDiscard}
          leadingIcon={<IconTrash className="size-3.5" />}
          className="ms-auto text-danger-fg hover:bg-danger-subtle"
        >
          {tr('discard')}
        </Button>
      )}
    </div>
  )
}
