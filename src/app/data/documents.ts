import type { LangCode } from './languages'

/**
 * The document store for the replay conversations. Each entry models a real
 * Indian document format, researched from public sources:
 *  - the invoice follows the GST tax-invoice layout (HSN 8509 for mixer
 *    grinders, 18% GST split as CGST 9% + SGST 9% intra-state, GSTIN / order /
 *    UPI fields as a real marketplace invoice carries);
 *  - the support-chat transcript follows typical marketplace refusal threads
 *    (ticket id, policy phrasing, closure line);
 *  - the BMC property-tax demand is ported from the researched v1 notice
 *    (MMC Act 1888 S.149, Devanagari numerals, 30-day window).
 * Sellers, GSTINs and reference numbers are fictional. Every card rendered
 * from here carries the "Simulated" tag in the UI — no real document is shown.
 */
export interface PaperDocLine {
  text: string
  kind?: 'head' | 'row' | 'total' | 'note'
}

export interface PaperDoc {
  id: string
  fileName: string
  title: string
  org: string
  /** the document's own language (its content, not the reader's) */
  lang?: LangCode
  rows: { label: string; value: string }[]
  lines: PaperDocLine[]
}

export const PAPER_DOCS: Record<string, PaperDoc> = {
  'invoice-homekart': {
    id: 'invoice-homekart',
    fileName: 'invoice-HK-48291.pdf',
    title: 'Tax Invoice',
    org: 'HomeKart Retail Pvt. Ltd. (fictional)',
    rows: [
      { label: 'Invoice no.', value: 'HK/INV/2026/48291' },
      { label: 'Invoice date', value: '2 October 2026' },
      { label: 'Order ID', value: 'HK-48291' },
      { label: 'Payment', value: 'UPI · Prepaid' },
      { label: 'GSTIN (seller)', value: '27ABCHM1234K1Z6' },
      { label: 'Place of supply', value: 'Mumbai Suburban, MH' },
    ],
    lines: [
      { text: 'Mixwell 750W Mixer Grinder (3 jars) — Black', kind: 'head' },
      { text: 'HSN 8509 · Qty 1', kind: 'note' },
      { text: 'Taxable value …………………………… ₹7,626.27' },
      { text: 'CGST @ 9% …………………………………… ₹686.36' },
      { text: 'SGST @ 9% …………………………………… ₹686.37' },
      { text: 'TOTAL PAID ………………………………… ₹8,999.00', kind: 'total' },
      { text: 'Delivered 4 October 2026 · 14/B, Andheri East, Mumbai — 400069', kind: 'note' },
    ],
  },

  /** The caution-tier replay's evidence: same fictional seller, an old purchase. */
  'invoice-homekart-2024': {
    id: 'invoice-homekart-2024',
    fileName: 'invoice-HK-10977.pdf',
    title: 'Tax Invoice',
    org: 'HomeKart Retail Pvt. Ltd. (fictional)',
    rows: [
      { label: 'Invoice no.', value: 'HK/INV/2024/10977' },
      { label: 'Invoice date', value: '14 January 2024' },
      { label: 'Order ID', value: 'HK-10977' },
      { label: 'Payment', value: 'UPI · Prepaid' },
      { label: 'GSTIN (seller)', value: '27ABCHM1234K1Z6' },
      { label: 'Place of supply', value: 'Mumbai Suburban, MH' },
    ],
    lines: [
      { text: 'Mixwell 750W Mixer Grinder (3 jars) — Black', kind: 'head' },
      { text: 'HSN 8509 · Qty 1', kind: 'note' },
      { text: 'Taxable value …………………………… ₹7,626.27' },
      { text: 'CGST @ 9% …………………………………… ₹686.36' },
      { text: 'SGST @ 9% …………………………………… ₹686.37' },
      { text: 'TOTAL PAID ………………………………… ₹8,999.00', kind: 'total' },
      { text: 'Warranty: 1 year standard manufacturer warranty', kind: 'note' },
    ],
  },

  'whatsapp-refusal': {
    id: 'whatsapp-refusal',
    fileName: 'homekart-support-chat.pdf',
    title: 'Support chat transcript',
    org: 'HomeKart Customer Care (fictional)',
    rows: [
      { label: 'Ticket', value: '#HK-48291' },
      { label: 'Channel', value: 'WhatsApp support' },
      { label: 'Date', value: '5 October 2026, 11:12 am' },
    ],
    lines: [
      { text: 'You: The mixer jar arrived cracked. Sending photos. Please refund or replace.', kind: 'row' },
      { text: 'HomeKart: Thank you for reaching out. We are sorry for the inconvenience.', kind: 'row' },
      { text: 'HomeKart: We have checked with the warehouse team. As the outer box was accepted at delivery, this is not covered under replacement.', kind: 'row' },
      { text: 'You: The box was crushed. I have photos from when I opened it.', kind: 'row' },
      { text: 'HomeKart: We understand, however the request stands rejected as per our return policy.', kind: 'row' },
      { text: 'HomeKart: Your ticket #HK-48291 has been closed. You may write to the grievance officer.', kind: 'row' },
      { text: '— Chat saved as evidence · screenshots archived —', kind: 'note' },
    ],
  },

  /** Ported from the notice interpreter's own data (notice-interpretation.ts) —
   *  the replay shows the SAME paper the interpreter reads, so the story and
   *  the tool never disagree. */
  'bmc-notice': {
    id: 'bmc-notice',
    fileName: 'property-tax-demand-2026.pdf',
    title: 'मालमत्ता कर मागणी पत्रक २०२६–२७',
    org: 'बृहन्मुंबई महानगरपालिका (काल्पनिक)',
    lang: 'mr',
    rows: [
      { label: 'मालमत्ता', value: 'घर क्रमांक १४, मुंबई — ४००००१' },
      { label: 'दस्तऐवज', value: 'property-tax-demand-2026.pdf' },
    ],
    lines: [
      { text: 'बृहन्मुंबई महानगरपालिका — मालमत्ता कर मागणी पत्रक २०२६–२७', kind: 'head' },
      { text: 'मालमत्ता: घर क्रमांक १४, गली नमुना रोड, मुंबई — ४००००१', kind: 'row' },
      { text: 'एकूण देय रक्कम: १८,५४० रुपये (अनुभाग १४९ नुसार)' },
      { text: 'कर आकारणी कालावधी: १ एप्रिल २०२६ ते ३१ मार्च २०२७' },
      { text: 'अंतिम देय तारीख: ३१ डिसेंबर २०२६' },
      { text: 'तारीखेनंतर उशीरीची दंडात्मक व्याज लागू होईल' },
      { text: 'तक्रारीसाठी स्थानिक कर कार्यालयाशी संपर्क साधावा' },
      { text: 'कर निरीक्षक, H/West वॉर्ड', kind: 'note' },
    ],
  },
}

export function paperDocById(id: string): PaperDoc | undefined {
  return PAPER_DOCS[id]
}
