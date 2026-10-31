import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { IconAlert, IconInfo, IconWifiOff, IconCheck } from './icons'

export type BannerTone = 'info' | 'positive' | 'warning' | 'danger' | 'offline'

export interface BannerProps {
  tone: BannerTone
  children: ReactNode
  action?: ReactNode
  className?: string
}

const toneClass: Record<BannerTone, string> = {
  info: 'bg-brand-subtle text-on-brand-subtle border-brand-line-subtle',
  positive: 'bg-positive-subtle text-on-positive-subtle border-positive-line',
  warning: 'bg-warning-subtle text-on-warning-subtle border-warning-line',
  danger: 'bg-danger-subtle text-on-danger-subtle border-danger-line',
  offline: 'bg-sunken text-fg-secondary border-line-default',
}

const iconFor: Record<BannerTone, ReactNode> = {
  info: <IconInfo className="size-4 shrink-0" />,
  positive: <IconCheck className="size-4 shrink-0" />,
  warning: <IconAlert className="size-4 shrink-0" />,
  danger: <IconAlert className="size-4 shrink-0" />,
  offline: <IconWifiOff className="size-4 shrink-0" />,
}

export function Banner({ tone, children, action, className }: BannerProps) {
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn('flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm', toneClass[tone], className)}
    >
      <span className="mt-0.5">{iconFor[tone]}</span>
      <div className="min-w-0 flex-1">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
