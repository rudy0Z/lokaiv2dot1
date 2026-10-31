import type { LangCode } from './languages'
import type { ConfidenceLevel } from '../components/trust/ConfidenceIndicator'

/**
 * Phase 3 — the notice interpreter's founding scenario: a fictional Marathi
 * municipal property-tax demand (concept ported from v1's BMC document).
 * The interpreter explains ONLY what the notice says — never whether to
 * dispute it. All interpretations are AI-drafted, unreviewed.
 */

export interface NoticeClause {
  index: number
  /** original-script line */
  text: string
  /** plain transliteration-free English gloss for the viewer footer */
  gloss: string
  highlight?: 'amount' | 'section' | 'deadline'
}

export interface NoticeField {
  id: string
  label: string
  value: string
  confidence: ConfidenceLevel
  /** clause this was extracted from (tap-to-source) */
  clauseIndex: number
}

export const NOTICE_DOC = {
  id: 'bmc-property-tax-2026',
  fileName: 'property-tax-demand-2026.pdf',
  sourceLangLabel: 'Marathi (Devanagari)',
  authority: 'Brihanmumbai Municipal Corporation (fictional)',
  clauses: [
    {
      index: 0,
      text: 'बृहन्मुंबई महानगरपालिका — मालमत्ता कर मागणी पत्रक २०२६–२७',
      gloss: 'Municipal Corporation — property-tax demand statement 2026–27',
    },
    {
      index: 1,
      text: 'मालमत्ता: घर क्रमांक १४, गली नमुना रोड, मुंबई — ४०००१',
      gloss: 'Property: House no. 14, Sample Road, Mumbai — 400001',
    },
    {
      index: 2,
      text: 'एकूण देय रक्कम: १८,५४० रुपये (अनुभाग १४९ नुसार)',
      gloss: 'Total amount due: ₹18,540 (per section 149)',
      highlight: 'amount' as const,
    },
    {
      index: 3,
      text: 'कर आकारणी कालावधी: १ एप्रिल २०२६ ते ३१ मार्च २०२७',
      gloss: 'Assessment period: 1 April 2026 to 31 March 2027',
    },
    {
      index: 4,
      text: 'अंतिम देय तारीख: ३१ डिसेंबर २०२६',
      gloss: 'Payment deadline: 31 December 2026',
      highlight: 'deadline' as const,
    },
    {
      index: 5,
      text: 'तारीखेनंतर उशीरीची दंडात्मक व्याज लागू होईल',
      gloss: 'Late-payment interest applies after the deadline',
      highlight: 'section' as const,
    },
    {
      index: 6,
      text: 'तक्रारीसाठी स्थानिक कर कार्यालयाशी संपर्क साधावा',
      gloss: 'For objections, contact the local assessment office',
    },
  ],
} as const

export const NOTICE_FIELDS: NoticeField[] = [
  {
    id: 'amount',
    label: 'Amount demanded',
    value: '₹18,540',
    confidence: 'clear',
    clauseIndex: 2,
  },
  {
    id: 'period',
    label: 'Assessment period',
    value: '1 Apr 2026 – 31 Mar 2027',
    confidence: 'clear',
    clauseIndex: 3,
  },
  {
    id: 'deadline',
    label: 'Payment deadline',
    value: '31 December 2026',
    confidence: 'clear',
    clauseIndex: 4,
  },
  {
    id: 'penalty',
    label: 'Penalty mentioned',
    value: 'Late-payment interest after the deadline',
    confidence: 'likely',
    clauseIndex: 5,
  },
  {
    id: 'objections',
    label: 'Objection channel',
    value: 'Local assessment office',
    confidence: 'likely',
    clauseIndex: 6,
  },
]

/** What the notice means — per UI language (AI-drafted, unreviewed). Prepared languages only; others fall back to English. */
export const NOTICE_SUMMARY: Partial<Record<LangCode, string>> = {
  en: 'This is a property-tax demand from your municipal corporation. It asks for ₹18,540 for the year April 2026 to March 2027, to be paid by 31 December 2026. After that date, late-payment interest applies. It also names a local office for objections.',
  hi: 'यह आपके नगर निगम की ओर से मालमत्ता कर की माँग है। यह 1 अप्रैल 2026 से 31 मार्च 2027 के लिए ₹18,540 माँगती है, जो 31 दिसंबर 2026 तक जमा करना है। उसके बाद विलंब ब्याज लगेगा। आपत्ति के लिए स्थानीय कार्यालय भी लिखा है।',
  mr: 'ही तुमच्या महानगरपालिकेकडून मालमत्ता कराची मागणी आहे. १ एप्रिल २०२६ ते ३१ मार्च २०२७ या कालावधीसाठी ₹१८,५४० मागितले आहे; ३१ डिसेंबर २०२६ पर्यंत भरावे. नंतर उशीरीचे व्याज लागेल. तक्रारीसाठी स्थानिक कार्यालय दिले आहे.',
  ta: 'இது உங்கள் மாநகராட்சியின் சொத்து வரி கோரிக்கை. ஏப்ரல் 2026 – மார்ச் 2027-க்கு ₹18,540 கேட்கப்பட்டுள்ளது; 31 டிசம்பர் 2026-க்குள் செலுத்த வேண்டும். அதன்பிறகு தாமத வட்டி பொருந்தும். ஆட்சேபனைக்கு உள்ளூர் அலுவலகம் குறிப்பிடப்பட்டுள்ளது.',
  ur: 'یہ آپ کی میونسپل کارپوریشن کی طرف سے پراپرٹی ٹیکس کا مطالبہ ہے۔ اپریل 2026 تا مارچ 2027 کے لیے ₹18,540 مانگا گیا ہے، جو 31 دسمبر 2026 تک ادا کرنا ہے۔ اس کے بعد تاخیری سود لاگو ہوگا۔ اعتراض کے لیے مقامی دفتر بھی لکھا گیا ہے۔',
}

/** What you can do next — explain-only, human help for disputes. */
export const NOTICE_NEXT_STEPS = [
  { id: 'verify-copy', label: 'Check this against your paper notice, line by line' },
  { id: 'pay-or-object', label: 'If the amounts match, note the deadline in your calendar' },
  { id: 'human', label: 'If you want to dispute it, a human helper should guide you' },
] as const
