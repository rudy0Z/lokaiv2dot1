import { cn } from '../../lib/cn'
import { IconScales } from './icons'

export interface LogoMarkProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/** Deep green-ink disc + scales glyph — the mockup's mark, adopted. */
export function LogoMark({ size = 'sm', className }: LogoMarkProps) {
  const box = size === 'lg' ? 'size-12 rounded-2xl' : size === 'md' ? 'size-9 rounded-xl' : 'size-7 rounded-lg'
  const glyph = size === 'lg' ? 'size-6' : size === 'md' ? 'size-5' : 'size-4'
  return (
    <span
      aria-hidden="true"
      className={cn('inline-flex shrink-0 items-center justify-center bg-standout', box, className)}
    >
      <IconScales className={cn(glyph, 'text-fg-on-inverted')} />
    </span>
  )
}

/** Serif wordmark lockup for the top bar. */
export function BrandLockup({ tagline }: { tagline?: string }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <LogoMark />
      <span className="min-w-0">
        <span className="block font-serif text-base font-semibold leading-tight text-fg-primary">LokAI</span>
        {tagline && <span className="block truncate text-2xs leading-tight text-fg-tertiary">{tagline}</span>}
      </span>
    </span>
  )
}
