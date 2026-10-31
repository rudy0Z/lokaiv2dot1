import { REASSURANCE } from './refund-journey'
import { SCOPE_RULES } from './scope-rules'
import { t } from './i18n'
import { NOTICE_SUMMARY } from './notice-interpretation'
import type { LangCode } from './languages'
import type { FactItem } from '../components/cards/FactCheckCard'

/**
 * Replay mode: prepared conversations that play themselves back with
 * simulated HUMAN actions — thinking pauses, char-by-char typing with
 * punctuation and hesitation beats, tapping a reply chip, speaking, sending
 * a document — so a viewer can watch how LokAI behaves end-to-end without
 * touching anything.
 *
 * The four scripts are the demo matrix: every scope tier (proceed / notice /
 * caution / hard-stop), two input modes (typed / spoken), four languages, and
 * the researched document set (GST invoice, marketplace refusal thread, BMC
 * property-tax demand — see documents.ts). Conversational text is written in
 * the register real people use (Hinglish, natural Marathi/Tamil), while legal
 * text stays in the verified-English register by design.
 *
 * Nothing here is live; everything is the same scripted data the interactive
 * demo uses.
 */
export type ReplayStep =
  /** human thinking pause before acting */
  | { kind: 'think'; ms: number }
  /** human typing into the composer (char-by-char, human pacing) */
  | { kind: 'typing'; text: string }
  | { kind: 'assistant'; text: string; stream?: boolean }
  | { kind: 'system'; text: string }
  /** a quick-reply row the simulated human taps (select = index) */
  | { kind: 'chips'; question: string; options: string[]; select: number }
  /** the simulated voice capture beat, then the reviewed transcript auto-sends */
  | { kind: 'voice'; seconds: number; transcript: string }
  /** the human sends a prepared document from the mock tray */
  | { kind: 'document'; doc: string }
  | { kind: 'card'; card: 'factcheck' | 'finding' | 'ladder' | 'caution' | 'protective' | 'handover' | 'noticecard' | 'noticeSummary'; why?: string; mode?: 'full' | 'free'; correction?: { key: string; value: string }; correctionAfterMs?: number }
  | { kind: 'pause'; ms: number }

export interface ReplayScript {
  id: string
  label: string
  mode: 'text' | 'voice'
  lang: LangCode
  outcome: 'proceed' | 'notice' | 'caution' | 'stop'
  blurb: string
  /** facts the fact gate presents (per-script, in the script's register) */
  facts?: FactItem[]
  steps: ReplayStep[]
}

/** localized scope-rule why, so replay whys never drift from the live rules */
function ruleWhy(ruleId: string, lang: LangCode): string {
  const rule = SCOPE_RULES.find((r) => r.id === ruleId)
  return rule?.whyI18n[lang] ?? rule?.whyI18n.en ?? ''
}

const CAUTION_WHY = ruleWhy('possible-time-barred', 'en')
const THREAT_WHY_TA = ruleWhy('threat-intimidation', 'ta')

export const REPLAY_SCRIPTS: ReplayScript[] = [
  /* ── 1 · The cracked mixie — Hindi, typed, with documents (proceed tier) ── */
  {
    id: 'mixie-hindi',
    label: 'टूटा मिक्सर — रिफंड से इनकार',
    mode: 'text',
    lang: 'hi',
    outcome: 'proceed',
    blurb:
      'A mixer grinder arrives cracked on delivery day and HomeKart customer care refuses a replacement — the most common e-commerce dispute in India. The human types in Hindi, sends the GST invoice and the saved refusal chat, catches one wrong fact in the gate and corrects it, then signs — and gets the finding plus the lowest-risk-first ladder.',
    facts: [
      { key: 'item', label: 'Item', value: 'मिक्सर ग्राइंडर (750W)' },
      { key: 'seller', label: 'Seller', value: 'HomeKart' },
      { key: 'issue', label: 'Issue', value: 'डिलीवरी पर जार टूटा' },
      { key: 'ask', label: 'Refused', value: 'रिप्लेसमेंट और रिफंड' },
      // starts with the chip answer (approximate) — the correction beat
      // below fixes it from the invoice, showing WHY the gate exists
      { key: 'when', label: 'Bought', value: 'पिछले 30 दिनों में' },
    ],
    steps: [
      { kind: 'think', ms: 1400 },
      {
        kind: 'typing',
        text: 'मैंने होमकार्ट से 8,999 रुपये का मिक्सर ग्राइंडर ऑर्डर किया था। डिलीवरी पर ही जार टूटा निकला, और कस्टमर केयर ने रिप्लेसमेंट साफ़ मना कर दिया। मैं क्या कर सकती हूँ?',
      },
      {
        kind: 'assistant',
        text: `${REASSURANCE.hassle.hi}\n\nसबसे पहले मुझे आपकी खरीद का प्रमाण चाहिए — क्या आपके पास बिल या ऑर्डर की डिटेल है?`,
        stream: true,
      },
      { kind: 'think', ms: 1100 },
      { kind: 'document', doc: 'invoice-homekart' },
      {
        kind: 'assistant',
        text: 'बिल मिल गया — Tax Invoice HK/INV/2026/48291, ₹8,999 की खरीद, 2 अक्टूबर 2026। अब बस एक बात तय कर लें:',
        stream: true,
      },
      {
        kind: 'chips',
        question: 'खरीद कितने समय पहले हुई थी?',
        options: ['पिछले 30 दिनों में', '1–2 साल पहले', '2 साल से ज़्यादा पहले', 'याद नहीं'],
        select: 0,
      },
      {
        kind: 'assistant',
        text: 'ठीक है। सेलर की मनाही का कोई लिखित सबूत है? जैसे चैट या ईमेल — वही सबसे मज़बूत काम आता है।',
        stream: true,
      },
      { kind: 'think', ms: 1000 },
      { kind: 'document', doc: 'whatsapp-refusal' },
      {
        kind: 'card',
        card: 'factcheck',
        // the human corrects the purchase date from the invoice — the
        // finding below is built from the corrected record
        correction: { key: 'when', value: '2 अक्टूबर 2026 (बिल)' },
        correctionAfterMs: 1800,
      },
      { kind: 'pause', ms: 1700 },
      { kind: 'card', card: 'finding' },
      { kind: 'pause', ms: 700 },
      { kind: 'card', card: 'ladder' },
    ],
  },

  /* ── 2 · The Marathi property-tax demand — voice + document (notice tier) ── */
  {
    id: 'notice-marathi',
    label: 'मालमत्ता कराचा जाहीरनामा',
    mode: 'voice',
    lang: 'mr',
    outcome: 'notice',
    blurb:
      'A municipal property-tax demand arrives in Marathi legalese and the recipient cannot tell a routine demand from a court case. The human speaks instead of typing, sends the notice paper, and the interpreter reads it clause by clause — explaining only what it says, never whether to dispute it.',
    steps: [
      { kind: 'voice', seconds: 4, transcript: 'मला महापालिकेकडून मालमत्ता कराचा जाहीरनामा आला आहे. त्यात १८,५४० रुपये मागितले आहेत, डिसेंबरपर्यंत भरायला सांगितलं आहे. मला घाबरतंय — हे काय करावं?' },
      { kind: 'card', card: 'noticecard' },
      { kind: 'think', ms: 900 },
      { kind: 'document', doc: 'bmc-notice' },
      { kind: 'assistant', text: NOTICE_SUMMARY.mr!, stream: true },
      { kind: 'pause', ms: 600 },
      { kind: 'card', card: 'noticeSummary' },
    ],
  },

  /* ── 3 · Two years too long? — English, typed, caution tier ── */
  {
    id: 'old-purchase-english',
    label: 'Two years too long?',
    mode: 'text',
    lang: 'en',
    outcome: 'caution',
    blurb:
      'The motor died eighteen months after purchase and the seller says the warranty is over. The 2024 invoice is real evidence — but the purchase date matters for the complaint window, so LokAI downgrades to careful, honest caution instead of promising a filing.',
    steps: [
      { kind: 'think', ms: 1200 },
      {
        kind: 'typing',
        text: 'I bought a Mixwell mixer grinder from HomeKart in January 2024. It worked fine for about a year but last month the motor died. They say it is out of warranty and are refusing everything. Can I still complain somewhere?',
      },
      {
        kind: 'assistant',
        text: `${REASSURANCE.hassle.en}\n\nA dead motor after the warranty window is still worth checking — if a defect existed from the start it can count. But the dates matter a lot here, so let me be careful. Do you have the invoice?`,
        stream: true,
      },
      { kind: 'think', ms: 1100 },
      { kind: 'document', doc: 'invoice-homekart-2024' },
      {
        kind: 'assistant',
        text: 'Got it — invoice HK/INV/2024/10977, ₹8,999, purchased 14 January 2024. One question so I stay careful:',
        stream: true,
      },
      {
        kind: 'chips',
        question: 'When did you buy it?',
        options: ['Within 30 days', '1 to 2 years ago', 'More than 2 years ago', 'Not sure'],
        select: 2,
      },
      { kind: 'system', text: t('en', 'tierCaution') },
      { kind: 'assistant', text: CAUTION_WHY, stream: true },
      { kind: 'card', card: 'caution' },
      { kind: 'pause', ms: 600 },
      { kind: 'card', card: 'ladder', mode: 'free' },
    ],
  },

  /* ── 4 · The threat — Tamil voice, protective stop (hard-stop tier) ── */
  {
    id: 'threat-tamil',
    label: 'மிரட்டல் — பாதுகாப்பு நிறுத்தம்',
    mode: 'voice',
    lang: 'ta',
    outcome: 'stop',
    blurb:
      'A seller threatens a customer for filing a complaint. The human speaks in Tamil — and LokAI stops carefully: the protective card stays inside the conversation with the emergency channel, the full guide, and the handover packet. Safety first, never an aggressive lockout.',
    steps: [
      {
        kind: 'voice',
        seconds: 4,
        transcript: 'நான் வாங்கிய பொருளுக்கு பணம் திரும்பக் கேட்டேன், கடைக்காரர் என்னை மிரட்டுகிறார். புகார் கொடுத்தால் வீட்டுக்கு வருவேன் என்கிறார். என்ன செய்வது?',
      },
      { kind: 'system', text: t('ta', 'tierHardStop') },
      { kind: 'card', card: 'protective', why: THREAT_WHY_TA },
      { kind: 'card', card: 'handover', why: THREAT_WHY_TA },
    ],
  },
]

export function replayById(id: string | undefined): ReplayScript | undefined {
  return REPLAY_SCRIPTS.find((s) => s.id === id)
}
