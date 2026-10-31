import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
}

export function Checkbox({ label, className, id, ...rest }: CheckboxProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <label htmlFor={inputId} className={cn('flex min-h-11 cursor-pointer items-center gap-3 py-1', className)}>
      <input
        id={inputId}
        type="checkbox"
        className="size-5 shrink-0 accent-brand-solid"
        {...rest}
      />
      <span className="text-sm text-fg-primary select-none">{label}</span>
    </label>
  )
}
