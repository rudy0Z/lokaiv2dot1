import { useState } from 'react'
import { Dialog } from '@base-ui-components/react/dialog'
import { Badge } from '../ui/Badge'

export interface LegalTermDef {
  term: string
  plain: string
}

/**
 * Inline legal-term glossary (ported from v1's LegalTerms): known terms in
 * body text become tappable and open a plain-words dialog. Terms map to the
 * [VERIFY] policy — the dialog always says the plain meaning is prototype
 * content until verified.
 */
export const LEGAL_TERMS: LegalTermDef[] = [
  {
    term: 'defect',
    plain: 'Damaged or faulty goods — a problem with the product itself, not with how it was used.',
  },
  {
    term: 'deficiency',
    plain: 'A shortfall in the quality of a service — work that was incomplete, careless, or not as promised.',
  },
  {
    term: 'District Consumer Commission',
    plain: 'The government body in each district that hears consumer complaints and can order refunds or replacements.',
  },
  {
    term: 'limitation period',
    plain: 'The window of time after the problem during which a complaint can still be filed.',
  },
]

function termParts(text: string): { before: string; term: string; after: string } | null {
  for (const def of LEGAL_TERMS) {
    const idx = text.toLowerCase().indexOf(def.term.toLowerCase())
    if (idx !== -1) {
      return {
        before: text.slice(0, idx),
        term: text.slice(idx, idx + def.term.length),
        after: text.slice(idx + def.term.length),
      }
    }
  }
  return null
}

export function LegalText({ text }: { text: string }) {
  const [open, setOpen] = useState<LegalTermDef | null>(null)
  const hit = termParts(text)
  if (!hit) return <>{text}</>
  const def = LEGAL_TERMS.find((d) => d.term.toLowerCase() === hit.term.toLowerCase())!

  return (
    <>
      {hit.before}
      <button
        type="button"
        onClick={() => setOpen(def)}
        className="underline decoration-brand-line decoration-dotted underline-offset-4"
      >
        {hit.term}
      </button>
      {hit.after}

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-40 bg-scrim" />
          <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[390px] rounded-t-3xl bg-modal p-5 pb-8 shadow-xl outline-none sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-3xl">
            <Dialog.Title className="font-serif text-lg font-semibold text-fg-primary">
              {open?.term}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm leading-relaxed text-fg-secondary">
              {open?.plain}
            </Dialog.Description>
            <Badge tone="neutral" variant="outline" className="mt-3">
              Prototype content — plain-words meaning, not legal advice
            </Badge>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
