import { formatINR } from './format'
import type { LangCode } from '../data/languages'
import type { FindingCardData } from '../components/cards/FindingCard'
import {
  ISSUE_LABELS,
  ASK_LABELS,
  ROW_LABELS,
  buildDraftsFor,
  buildNoticeFor,
  buildFindingFor,
  type DraftBundle,
  type NoticeBundle,
} from '../data/localized-content'

/**
 * The signed matter record: every generative artifact (finding card, WhatsApp
 * draft, demand notice) is built from THIS object — the one the user confirms
 * or corrects in the fact gate. Nothing downstream may read a hardcoded demo
 * fact again.
 */
export interface FactRecord {
  item: string
  seller: string
  amount: string
  /** normalized key rendered through ISSUE_LABELS; '' = unknown */
  issue: 'cracked' | 'broken' | 'faulty' | 'notworking' | ''
  /** normalized key rendered through ASK_LABELS; '' = unknown */
  ask: 'refund' | 'replacement' | 'both' | ''
  /** purchase-window key chosen in the fact gate: 30 | 1to2 | 2plus | ns */
  when: '30' | '1to2' | '2plus' | 'ns' | ''
  /**
   * The user's SIGNED wording when they corrected the issue/ask row in the
   * fact gate — templates prefer this over the normalized phrase so the
   * correction verifiably flows into the finding and the drafts.
   */
  issueRaw?: string
  askRaw?: string
}

export const EMPTY_FACTS: FactRecord = { item: '', seller: '', amount: '', issue: '', ask: '', when: '' }

/** Demo defaults for the gallery / replay surfaces (fictional seller). */
export const DEMO_FACTS: FactRecord = {
  item: 'Mixer grinder',
  seller: 'HomeKart',
  amount: '₹8,999',
  issue: 'cracked',
  ask: 'both',
  when: '30',
}

const AMOUNT_RE =
  /(?:₹|rs\.?\s*|rupees?\s*|रुपय[ेe]?\s*|rupaye\s*)([\d][\d,]*(?:\.\d+)?)|([\d][\d,]*(?:\.\d+)?)\s*(?:₹|rupees?|rs\.?|रुपय[ेe]?)/i

const SELLER_RE = /\bfrom\s+([A-Z][A-Za-z0-9&']*)|\b([A-Z][A-Za-z0-9&']*)\s+se\b/

const ITEM_RE =
  /(mixer\s*grinder|mixer|grinder|mixie|smartphone|phone|mobile|laptop|television|tv|headphones?|earbuds?|watch|kettle|pressure cooker|washing machine|refrigerator|fridge|fan|iron|product|item|मिक्सर\s*ग्राइंडर|मिक्सर|ग्राइंडर|जूसर|फ़ोन|मोबाइल|उत्पाद|वस्तु|மிக்சர்\s*கிரைண்டர்|மிக்சர்|மிக்சி|கிரைண்டர்|போன்|சாதனம்|مکسر\s*گرائنڈر|گرائنڈر|مکسر|فون|موبائل)/i

const ISSUE_RES: [FactRecord['issue'], RegExp][] = [
  ['cracked', /crack|टूट|உடைந்|ٹوٹا/i],
  ['broken', /\bbroke|फूट|முறிந்|ٹوٹی/i],
  ['faulty', /defect|faulty|damag|खराब|दोष|கெட்ட|குறை|خراب/i],
  ['notworking', /not\s*working|stopped\s*working|काम\s*नहीं|வேலை\s*செய்யவில்லை|کام\s*نہیں/i],
]

/**
 * Crude, honest extraction: fill what the user's own words state, leave the
 * rest empty ('—' in the gate) for them to add. NEVER a demo default — an
 * unsigned fact must not look signed. (Deep-audit fix: the gate may no
 * longer assert facts the message did not supply.)
 */
export function extractFacts(text: string): FactRecord {
  const facts: FactRecord = { ...EMPTY_FACTS }

  const amt = AMOUNT_RE.exec(text)
  if (amt) {
    const digits = (amt[1] ?? amt[2] ?? '').replace(/,/g, '')
    const n = Number(digits)
    if (Number.isFinite(n) && n > 0) facts.amount = formatINR(n)
  }

  const seller = SELLER_RE.exec(text)
  if (seller) facts.seller = seller[1] ?? seller[2] ?? ''

  const item = ITEM_RE.exec(text)
  if (item) {
    const raw = item[0]!
    facts.item = /[a-z]/i.test(raw) ? raw.replace(/\b\w/g, (c) => c.toUpperCase()) : raw
  }

  for (const [key, re] of ISSUE_RES) {
    if (re.test(text)) {
      facts.issue = key
      break
    }
  }

  const refund = /refund|पैसे\s*वापस|रिफंड|वापसी|பணம்\s*திரும்ப|پیسے\s*واپس|رفنڈ/i.test(text)
  const replacement = /replace|बदली|बदले|रिप्लेसमेंट|மாற்று|மாற்றி|تبدیلی|ریپلیس/i.test(text)
  facts.ask = refund && replacement ? 'both' : refund ? 'refund' : replacement ? 'replacement' : ''

  return facts
}

/** Localized display rows for the fact gate ('' renders as an empty slot). */
export function factRows(facts: FactRecord, lang: LangCode): { key: string; label: string; value: string }[] {
  const L = ROW_LABELS[lang] ?? ROW_LABELS.en!
  return [
    { key: 'item', label: L.item!, value: facts.item },
    { key: 'seller', label: L.seller!, value: facts.seller },
    { key: 'amount', label: L.amount!, value: facts.amount },
    { key: 'issue', label: L.issue!, value: facts.issue ? (ISSUE_LABELS[lang] ?? ISSUE_LABELS.en!)[facts.issue]! : '' },
    { key: 'ask', label: L.ask!, value: facts.ask ? (ASK_LABELS[lang] ?? ASK_LABELS.en!)[facts.ask]! : '' },
    { key: 'when', label: L.when!, value: '' },
  ]
}

export function buildDrafts(facts: FactRecord, lang: LangCode): DraftBundle {
  return buildDraftsFor(facts, lang)
}

export function buildNotice(facts: FactRecord, lang: LangCode): NoticeBundle {
  return buildNoticeFor(facts, lang)
}

export function buildFinding(facts: FactRecord, lang: LangCode): FindingCardData {
  const b = buildFindingFor(facts, lang)
  return {
    ...b,
    legalId: 'cpa-defect-goods',
    confidence: 'clear',
  }
}

/** recover a normalized issue key from the gate's display text (edited text → '' + raw) */
export function issueKeyFromDisplay(value: string, lang: LangCode): FactRecord['issue'] {
  const L = ISSUE_LABELS[lang] ?? ISSUE_LABELS.en!
  const hit = (Object.entries(L) as [string, string][]).find(([, v]) => v === value)?.[0] ?? ''
  return (['cracked', 'broken', 'faulty', 'notworking'] as readonly string[]).includes(hit)
    ? (hit as FactRecord['issue'])
    : ''
}

/** recover a normalized ask key from the gate's display text */
export function askKeyFromDisplay(value: string, lang: LangCode): FactRecord['ask'] {
  const L = ASK_LABELS[lang] ?? ASK_LABELS.en!
  const hit = (Object.entries(L) as [string, string][]).find(([, v]) => v === value)?.[0] ?? ''
  return (['refund', 'replacement', 'both'] as readonly string[]).includes(hit)
    ? (hit as FactRecord['ask'])
    : ''
}

/**
 * Replays store facts as display rows (FactItem[]); convert them into a
 * FactRecord for the builders. Issue/ask arrive as the user's own words, so
 * they are carried as the signed raw text.
 */
export function factsFromRows(rows: { key: string; value: string }[]): FactRecord {
  const get = (k: string) => rows.find((r) => r.key === k)?.value ?? ''
  const amount = get('amount')
  return {
    item: get('item'),
    seller: get('seller'),
    amount: /^₹?\s*[\d]/.test(amount) ? amount : '',
    issue: '',
    ask: '',
    when: '',
    issueRaw: get('issue') || undefined,
    askRaw: get('ask') || undefined,
  }
}
