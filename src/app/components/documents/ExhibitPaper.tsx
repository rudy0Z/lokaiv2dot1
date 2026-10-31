import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useApp } from '../../lib/app-context'
import { cn } from '../../lib/cn'

/**
 * Small paper exhibit thumbnail (ported from v1's ExhibitPaper): accent edge
 * + a REAL two-line preview (visual report B7 — a skeleton in a finished
 * screen reads as a page that never loaded). The filename keeps the mono
 * docket register; the preview lines are the document's own mock content.
 * Tapping opens a bottom-sheet preview inside the device frame (overhaul
 * Part 5) — honest about being a mock, never a fake "Verified" badge.
 */
const PREVIEW: { test: RegExp; lines: [string, string] }[] = [
  { test: /gst-invoice|invoice|mobile-14500/i, lines: ['HomeKart Retail · Tax invoice', 'Mixer Grinder 750W · UPI paid'] },
  { test: /whatsapp|deposit-demand/i, lines: ['Sent on WhatsApp', 'Refund demand, bills asked'] },
  { test: /demand-notice|objection/i, lines: ['Registered post · A/D', 'Objection enclosed'] },
  { test: /upi-log|upi/i, lines: ['Bank statement extract', '₹50,000 deposit · UTR cited'] },
  { test: /property-tax|electricity-bill/i, lines: ['Municipal demand', 'Amount disputed — hearing asked'] },
  { test: /closure/i, lines: ['Resolution record', 'Matter closed · user copy'] },
]

function kindOf(name: string) {
  if (/\.pdf$/i.test(name)) return 'PDF'
  if (/\.txt$/i.test(name)) return 'Draft'
  return 'Document'
}

export function ExhibitPaper({ name, className }: { name: string; className?: string }) {
  const { tr } = useApp()
  const [open, setOpen] = useState(false)
  const lines = PREVIEW.find((p) => p.test.test(name))?.lines

  const sheet =
    open &&
    createPortal(
      <div
        className="absolute inset-0 z-[60] flex flex-col justify-end"
        role="dialog"
        aria-label={name}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-scrim" aria-hidden="true" />
        <div
          className="relative m-3 flex flex-col gap-2.5 rounded-[22px] border border-line-default bg-shell p-4 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-sunken px-2.5 py-1 text-2xs font-medium text-fg-secondary" lang="en">
              {kindOf(name)} · mock exhibit
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={tr('back')}
              className="pressable inline-flex size-9 items-center justify-center rounded-full text-fg-secondary hover:bg-hover-veil"
            >
              ✕
            </button>
          </div>
          <p className="truncate font-mono text-2xs text-fg-secondary" lang="en">
            {name}
          </p>
          <div className="paper rounded-[10px] px-3 py-3">
            {lines ? (
              <>
                <p className="text-xs font-medium text-fg-primary" lang="en">{lines[0]}</p>
                <p className="mt-0.5 text-2xs text-fg-tertiary" lang="en">{lines[1]}</p>
                <p className="mt-2 border-t border-dashed border-line-subtle pt-2 text-2xs leading-relaxed text-fg-tertiary">
                  {tr('protoTag')}
                </p>
              </>
            ) : (
              <p className="text-2xs text-fg-tertiary" lang="en">Mock exhibit · evidence preview</p>
            )}
          </div>
        </div>
      </div>,
      document.querySelector('[data-app-frame]') ?? document.body,
    )

  return (
    <>
      {/* role=button, not <button>: callers embed this inside interactive
          folders — a real button here would nest interactive elements */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen(true)}
        aria-label={`${name} — preview`}
        className={cn(
          'paper relative w-full cursor-pointer overflow-hidden rounded-[10px] px-3 pb-3 pt-2 transition-transform active:scale-[0.98]',
          className,
        )}
      >
        <span className="absolute inset-y-0 start-0 w-1 bg-brand-solid" aria-hidden="true" />
        <p className="truncate ps-1.5 font-mono text-2xs text-fg-secondary" lang="en">
          {name}
        </p>
        <div className="mt-1.5 flex flex-col gap-0.5 ps-1.5">
          {lines ? (
            <>
              <p className="truncate text-2xs font-medium text-fg-primary" lang="en">{lines[0]}</p>
              <p className="truncate text-2xs text-fg-tertiary" lang="en">{lines[1]}</p>
            </>
          ) : (
            <p className="truncate text-2xs text-fg-tertiary" lang="en">Mock exhibit · evidence preview</p>
          )}
        </div>
      </div>
      {sheet}
    </>
  )
}
