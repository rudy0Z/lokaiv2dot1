import { useApp } from '../../lib/app-context'
import { cn } from '../../lib/cn'
import { Badge } from '../ui/Badge'
import { IconCheck, IconInfo } from '../ui/icons'

export interface VerificationBadgeProps {
  verified: boolean
  /** dark-surface variant (stop screen / standout panels) — Trap-3B fix */
  inverted?: boolean
  className?: string
}

/** Two states (A5): verified against source / prototype content. */
export function VerificationBadge({ verified, inverted = false, className }: VerificationBadgeProps) {
  const { tr } = useApp()
  return (
    <Badge
      tone={inverted ? 'inverted' : verified ? 'positive' : 'neutral'}
      variant={verified && !inverted ? 'subtle' : 'outline'}
      leadingIcon={verified ? <IconCheck className="size-3" /> : <IconInfo className="size-3" />}
      className={cn(className)}
      title={verified ? tr('badgeVerified') : tr('badgePrototype')}
    >
      {verified ? tr('badgeVerified') : tr('badgePrototype')}
    </Badge>
  )
}
