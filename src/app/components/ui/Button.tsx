import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'inverted'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  block?: boolean
}

const variantClass: Record<Variant, string> = {
  primary:
    'bg-brand-solid text-on-brand-solid enabled:hover:bg-brand-solid-hover enabled:active:bg-brand-solid-active',
  secondary:
    'bg-component text-fg-primary enabled:hover:bg-component-hover enabled:active:bg-component-active',
  ghost: 'bg-transparent text-fg-secondary enabled:hover:bg-hover-veil',
  danger: 'bg-danger-solid text-on-danger-solid enabled:hover:bg-danger-solid-hover',
  inverted:
    'bg-fg-on-inverted text-standout',
}

const sizeClass: Record<Size, string> = {
  sm: 'h-11 px-4 text-2xs gap-1.5 rounded-full',
  md: 'h-12 px-6 text-sm gap-2 rounded-full',
  lg: 'h-14 px-8 text-base gap-2 rounded-full',
}

/** Optical alignment (craft.gustavofior.com/optical-alignment):
 *  An icon has internal whitespace. Shave 2px off the icon side so
 *  the button looks optically balanced rather than heavier on the icon side.
 */
const opticalPadding: Record<Size, { leading: string; trailing: string }> = {
  sm: { leading: 'ps-2.5 pe-3.5', trailing: 'ps-3.5 pe-2.5' },
  md: { leading: 'ps-4 pe-5', trailing: 'ps-5 pe-4' },
  lg: { leading: 'ps-5 pe-6', trailing: 'ps-6 pe-5' },
}

export function Button({
  variant = 'secondary',
  size = 'md',
  loading = false,
  leadingIcon,
  trailingIcon,
  block = false,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const hasLeading = Boolean(leadingIcon || loading)
  const hasTrailing = Boolean(trailingIcon && !loading)
  const opticalClass =
    hasLeading && !hasTrailing
      ? opticalPadding[size].leading
      : hasTrailing && !hasLeading
        ? opticalPadding[size].trailing
        : ''

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        'pressable inline-flex items-center justify-center font-medium transition-colors duration-100 select-none',
        variantClass[variant],
        sizeClass[size],
        opticalClass,
        block && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="inline-block size-4 rounded-full border-2 border-current border-t-transparent animate-spin"
        />
      ) : (
        leadingIcon
      )}
      {children}
      {trailingIcon}
    </button>
  )
}
