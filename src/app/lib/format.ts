/**
 * Intl formatting (A4b rules 6-9). Single source for numbers, dates and
 * grapheme-safe truncation. Latin digits everywhere (languages.ts decision).
 */
const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const dateFmt = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function formatINR(amount: number): string {
  return inr.format(amount)
}

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso))
}

const segmenter =
  typeof Intl !== 'undefined' && 'Segmenter' in Intl
    ? new Intl.Segmenter('en', { granularity: 'grapheme' })
    : null

/** Truncation that respects grapheme clusters (conjuncts, matras). */
export function truncateGraphemes(text: string, max: number): string {
  if (!segmenter) return text.length <= max ? text : text.slice(0, max - 1) + '…'
  const segments = Array.from(segmenter.segment(text), (s) => s.segment)
  if (segments.length <= max) return text
  return segments.slice(0, max - 1).join('') + '…'
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
