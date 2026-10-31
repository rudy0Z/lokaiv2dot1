import { useEffect, useState } from 'react'
import { useApp } from '../../lib/app-context'
import type { TesterOption } from '../../data/interactive-scenarios'
import { IconChevronDown } from '../ui/icons'

/**
 * The branching-tester rail (master prompt Part 2, overhaul Part 2): during a
 * live conversation it collapses to a single quiet bar above the composer and
 * expands upward on tap; picking an option collapses it again. On an empty
 * thread (the scenario launcher state) it starts expanded.
 */
export function TesterPrompts({
  label,
  options,
  onPick,
  active = false,
}: {
  label: string
  options: TesterOption[]
  onPick: (o: TesterOption) => void
  /** true once the thread has messages — the rail then starts collapsed */
  active?: boolean
}) {
  const { tr, lang } = useApp()
  const [open, setOpen] = useState(!active)

  useEffect(() => {
    if (active) setOpen(false)
  }, [active])

  const pick = (o: TesterOption) => {
    setOpen(false)
    onPick(o)
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={false}
        className="pressable mx-auto flex min-h-9 w-full max-w-[380px] items-center justify-between rounded-full bg-sunken px-3.5 py-1.5 text-2xs font-medium text-fg-secondary transition-colors hover:bg-component-hover"
      >
        <span className="truncate">{label}</span>
        <span className="ms-2 flex shrink-0 items-center gap-1.5 text-fg-tertiary">
          {options.length}
          <IconChevronDown className="size-3.5 -rotate-90" />
        </span>
      </button>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-[380px] flex-col gap-1.5 px-0.5">
      <button
        type="button"
        onClick={() => active && setOpen(false)}
        aria-expanded={true}
        className="flex items-center justify-between px-1 text-start"
      >
        <p className="text-2xs font-semibold text-fg-secondary">{label}</p>
        {active && (
          <span className="flex items-center gap-1 text-2xs text-fg-tertiary">
            {options.length}
            <IconChevronDown className="size-3.5" />
          </span>
        )}
      </button>
      <div className="scroll-calm flex max-h-[210px] flex-col gap-1.5 overflow-y-auto overscroll-contain">
        {options.map((o, i) => (
          <button
            key={i}
            type="button"
            onClick={() => pick(o)}
            className="pressable flex flex-col gap-1 rounded-xl bg-sunken px-3 py-2 text-start transition-colors hover:bg-component-hover active:scale-[0.98]"
          >
            <span className="text-sm leading-snug text-fg-primary">{o.text}</span>
            <span className="text-2xs text-fg-tertiary">{tr(o.meta as never)}</span>
          </button>
        ))}
      </div>
      {/* lang used only to tag the option language context for the tester */}
      <span className="sr-only" lang={lang} />
    </div>
  )
}
