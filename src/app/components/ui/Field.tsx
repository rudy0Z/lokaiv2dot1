import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface FieldProps {
  label: ReactNode
  hint?: ReactNode
  /** dark-ink label on inverted (standout) surfaces — Trap-3B fix */
  inverted?: boolean
  children: (id: string) => ReactNode
}

export function Field({ label, hint, inverted = false, children }: FieldProps) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cn('text-2xs font-medium', inverted ? 'text-fg-standout-secondary' : 'text-fg-secondary')}
      >
        {label}
      </label>
      {children(id)}
      {hint && <p className="text-2xs text-fg-tertiary">{hint}</p>}
    </div>
  )
}

const controlClass =
  'w-full rounded-lg border border-line-default bg-card px-3 py-2.5 text-sm text-fg-primary placeholder:text-fg-tertiary focus-visible:border-brand-line focus-visible:outline-none min-h-11'

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...rest} />
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClass, 'min-h-24 resize-y', className)} {...rest} />
}
