import type { LangCode } from './languages'
import type { DomainId } from './domain-playbooks'

/**
 * Case-Folder architecture (ChatGPT-Projects / Gemini-Notebooks model):
 * each Case Folder holds a unified memory, chronological DAY chats, and a
 * day-synced evidence vault — documents ACCUMULATE as the days advance
 * (Day 1: the invoice → Day 2: + the WhatsApp draft → Day 3: + the formal
 * demand notice). Five pre-seeded cases carry the multilingual parity so a
 * recruiter can click between scripts without touching settings.
 * Fictional sellers, scripted histories, zero live AI.
 */
export type MatterTier = 'consumer' | 'notice' | 'stop'
export type StageStatus = 'done' | 'current' | 'todo'
export type CaseDocKind = 'invoice' | 'upi-log' | 'notice' | 'whatsapp-draft' | 'objection-draft' | 'closure'

export interface MatterStage {
  key: string
  label: string
  status: StageStatus
}

export interface CaseDoc {
  id: string
  kind: CaseDocKind
  /** mono filename shown on the exhibit chip */
  name: string
  /** the day this document entered the case */
  dayIndex: number
}

export interface DayTurn {
  role: 'user' | 'assistant'
  text: string
  /** the turn came through the simulated voice capture — render the note header */
  voice?: boolean
}

export interface DaySummary {
  grievance: string
  standing: string
  next: string
}

export type DayCardKind =
  | 'factcheck'
  | 'finding'
  | 'ladder'
  | 'caution'
  | 'notice'
  | 'closeout'
  | 'counter'

export interface CaseDay {
  id: string
  /** monospace date stamp, e.g. 'Oct 21' */
  dateLabel: string
  /** calendar date on the prototype clock — drives date-grouped history */
  iso: string
  title: string
  summary?: DaySummary
  turns: DayTurn[]
  cards?: DayCardKind[]
}

export interface CaseContinuity {
  /** one-line unified-memory glance */
  memoryLine: string
  /** the proactive follow-up that OPENS the new day chat */
  followUp: string
  chips: [string, string, string]
}

export interface MatterRecord {
  id: string
  title: string
  when: string
  tier: MatterTier
  stages: MatterStage[]
  finding?: { title: string; summary: string }
  /** citations resolve through legal-content.ts (law 1) — never inline statute text */
  sources: { legalId: string; coverage: 'direct' | 'related' | 'missing' }[]
  receipt?: { tierLabel: string; why: string }
  /* ---- case-folder fields ---- */
  lang: LangCode
  /** the case's own name in its own script (the sidebar shows this) */
  titleNative: string
  amount: string
  /** quiet status line — e.g. 'Tier 2 · 1915 docket filed' */
  statusLine: string
  resolved?: boolean
  /** the domain playbook this case runs on — its finding + drafts come from there */
  domain?: DomainId
  memory: { label: string; value: string }[]
  days: CaseDay[]
  docs: CaseDoc[]
  continuity: CaseContinuity
}

const S = (key: string, label: string, status: StageStatus): MatterStage => ({ key, label, status })
const DONE = (key: string, label: string) => S(key, label, 'done')
const NOW = (key: string, label: string) => S(key, label, 'current')
const TODO = (key: string, label: string) => S(key, label, 'todo')

export const MATTERS: MatterRecord[] = [
  /* ── Case 1 · English — the flagship 3-day mixer arc ── */
  {
    id: 'h1',
    domain: 'refund',
    title: 'Mixer refund — HomeKart (₹8,999)',
    when: 'Oct 21 → Today',
    tier: 'consumer',
    stages: [DONE('intake', 'Intake'), DONE('clarify', 'Clarify'), DONE('verify', 'Fact check'), NOW('assess', 'Assessment'), TODO('plan', 'Plan'), TODO('packet', 'Packet')],
    finding: {
      title: 'Cracked on arrival is a product defect',
      summary:
        'The seller is responsible for the condition of what they sold. Asking HomeKart for a refund or a replacement is a normal, reasonable ask — keep the bill, the photos and every chat with customer care.',
    },
    sources: [
      { legalId: 'cpa-defect-goods', coverage: 'direct' },
      { legalId: 'cpa-complaint-where', coverage: 'related' },
    ],
    lang: 'en',
    titleNative: 'Mixer refund — HomeKart',
    amount: '₹8,999',
    statusLine: 'Tier 2 · 1915 docket filed',
    memory: [
      { label: 'Matter', value: 'Mixwell 750W mixer grinder' },
      { label: 'Seller', value: 'HomeKart' },
      { label: 'Amount', value: '₹8,999' },
      { label: 'Issue', value: 'Jar cracked on arrival' },
      { label: 'Current step', value: '2 of 3 · 1915 docket filed' },
    ],
    days: [
      {
        id: 'd0',
        dateLabel: 'Oct 21',
        iso: '2026-10-21',
        title: 'Initial complaint & Step 1 draft',
        summary: {
          grievance: 'A ₹8,999 mixer grinder arrived with a cracked jar and customer care refused a refund.',
          standing: 'Defect-in-goods under the Consumer Protection Act, 2019 — leverage High [VERIFY].',
          next: 'Step 1 draft copied to WhatsApp; written reply requested within 7 days.',
        },
        cards: ['factcheck', 'finding', 'ladder'],
        turns: [
          { role: 'user', text: 'I bought a Mixwell 750W mixer grinder from HomeKart for ₹8,999. It arrived with a cracked jar and customer care refused a refund or replacement.', voice: true },
          { role: 'assistant', text: 'That is frustrating — and you do not have to accept it. Your facts are signed and the invoice is filed as Exhibit A. First step: one firm, polite message in writing.' },
          { role: 'assistant', text: 'Draft 1 is in your documents — it cites the defect in plain words and asks for a written reply within 7 days. Nothing sends itself; you paste it into WhatsApp.' },
        ],
      },
      {
        id: 'd1',
        dateLabel: 'Oct 24',
        iso: '2026-10-24',
        title: 'Support refused — Step 2 prep',
        summary: {
          grievance: 'Support replied with a policy line: electronics carry brand warranty only, no refund.',
          standing: 'A policy line is not the law — damage on arrival can still count as a defect [VERIFY].',
          next: 'Step 2 prep: the free 1915 helpline script and call checklist added to the case.',
        },
        cards: ['ladder'],
        turns: [
          { role: 'user', text: 'They replied: "as per company policy electronics only have brand warranty, no refund". What now??' },
          { role: 'assistant', text: 'A policy line is not the law — goods that arrive damaged can count as a defect under the Consumer Protection Act, 2019 [VERIFY]. Keep that reply; it is now evidence.' },
          { role: 'assistant', text: 'One rung up the ladder: the 1915 call script and the have-this-ready list are in your documents. Free, official, and they log a docket number.' },
        ],
      },
      {
        id: 'd2',
        dateLabel: 'Today',
        iso: '2026-10-28',
        title: 'Formal demand notice review',
        summary: {
          grievance: 'Seller stonewalled after the WhatsApp draft; the written refusal is on record.',
          standing: 'Unchanged defect claim, now with a documented refusal trail.',
          next: 'Draft 3 (formal demand notice) open for review behind its consent gate; registered post with acknowledgement due.',
        },
        cards: ['ladder'],
        turns: [
          { role: 'user', text: 'If they keep refusing I want the formal notice ready. Is it drafted?' },
          { role: 'assistant', text: 'It is — Draft 3 sits behind its review screen: every field editable, every mistake yours to catch, and an explicit consent before it exists.' },
          { role: 'assistant', text: 'Send by registered post with acknowledgement due and keep the receipt — the receipt becomes your proof of delivery.' },
        ],
      },
    ],
    docs: [
      { id: 'c1-inv', kind: 'invoice', name: 'GST-Invoice-HK-48291.pdf', dayIndex: 0 },
      { id: 'c1-wa', kind: 'whatsapp-draft', name: 'draft-1-whatsapp-refund.txt', dayIndex: 1 },
      { id: 'c1-notice', kind: 'objection-draft', name: 'draft-3-demand-notice.pdf', dayIndex: 2 },
    ],
    continuity: {
      memoryLine: 'Mixwell mixer · ₹8,999 · HomeKart · Step 2 of 3',
      followUp:
        'Welcome back. On Oct 24 the seller refused in writing and we prepared the free 1915 helpline call. Did the docket get registered — or should we ready the formal demand notice?',
      chips: [
        'They didn’t reply — move to Step 2 (1915 helpline)',
        'They replied with a rejection — help me counter it',
        'They agreed to refund! Close this case',
      ],
    },
  },

  /* ── Case 2 · Hindi — tenancy deposit ── */
  {
    id: 'h2',
    domain: 'deposit',
    title: 'Pune flat deposit (₹50,000)',
    when: 'Oct 20 → Today',
    tier: 'consumer',
    stages: [DONE('intake', 'Intake'), DONE('verify', 'Fact check'), NOW('plan', 'Plan'), TODO('packet', 'Packet')],
    sources: [
      { legalId: 'tpa-wear-tear', coverage: 'related' },
    ],
    lang: 'hi',
    titleNative: 'पुणे फ्लैट सिक्योरिटी डिपॉज़िट',
    amount: '₹50,000',
    statusLine: 'Tier 1 · WhatsApp भेजा',
    memory: [
      { label: 'बाब', value: '1 BHK फ्लैट, पुणे' },
      { label: 'पक्ष', value: 'मकान मालिक (निजी)' },
      { label: 'राशि', value: '₹50,000' },
      { label: 'विवाद', value: 'पेंटिंग-क्लीनिंग कटौती, बिल नहीं' },
      { label: 'वर्तमान चरण', value: '1 / 3 · WhatsApp भेजा' },
    ],
    days: [
      {
        id: 'd0',
        dateLabel: '20 अक्टूबर',
        iso: '2026-10-20',
        title: 'शिकायत और पहला मसौदा',
        summary: {
          grievance: '₹50,000 में से ₹35,000 “पेंटिंग-क्लीनिंग” कहकर रोके जाना — कोई बिल नहीं।',
          standing: 'उचित कटौती का बोझ मकान मालिक पर — लिखित बिल माँगा जा सकता है [VERIFY]।',
          next: 'मसौदा 1: आइटम-वार कटौती की लिखित माँग, 7 दिन की समय-सीमा।',
        },
        cards: ['factcheck', 'finding', 'ladder'],
        turns: [
          { role: 'user', text: 'पुणे में फ्लैट खाली किया, एक महीने का नोटिस दिया था। मकान मालिक ₹50,000 की डिपॉज़िट में से ₹35,000 पेंटिंग-क्लीनिंग कहकर रख रहा है, कोई बिल नहीं दिखाया।', voice: true },
          { role: 'assistant', text: 'आपने प्रक्रिया सही निभाई है — अब दस्तावेज़ बोलेंगे। किराया UPI रिकॉर्ड और हैंडओवर चैट पहले सबूत हैं; वे आपके दस्तावेज़ों में दर्ज हैं।' },
          { role: 'assistant', text: 'मसौदा 1 तैयार है — हर कटौती का बिल माँगता लेख, 7 दिन की लिखित समय-सीमा के साथ। कुछ भी स्वयं नहीं भेजा जाता; आप ही WhatsApp में पेस्ट करेंगे।' },
        ],
      },
      {
        id: 'd1',
        dateLabel: '24 अक्टूबर',
        iso: '2026-10-24',
        title: 'जवाब नहीं — अगला कदम',
        summary: {
          grievance: 'मसौदा पढ़ा तक नहीं गया।',
          standing: 'अपरिवर्तित; सबूत की सूची पूरी।',
          next: 'चरण 2 की तैयारी: किराया प्राधिकरण / कानूनी सहायता मध्यस्थता।',
        },
        cards: ['counter', 'ladder'],
        turns: [
          { role: 'user', text: 'मकान मालिक ने मसौदा पढ़ा ही नहीं, कोई जवाब नहीं।' },
          { role: 'assistant', text: 'कोई बात नहीं — लिखित रिकॉर्ड आपके पक्ष में है। एक रन्ग ऊपर: मध्यस्थता की तैयारी आपके दस्तावेज़ों में जोड़ दी है, तारीख़ें संभाल कर रखें।' },
        ],
      },
    ],
    docs: [
      { id: 'c2-upi', kind: 'upi-log', name: 'rent-upi-log.pdf', dayIndex: 0 },
      { id: 'c2-wa', kind: 'whatsapp-draft', name: 'deposit-demand-whatsapp.txt', dayIndex: 1 },
    ],
    continuity: {
      memoryLine: 'पुणे फ्लैट · ₹50,000 · डिपॉज़िट · चरण 1/3',
      followUp: 'फिर मिले। 24 अक्टूबर को हमने आइटम-वार कटौती की लिखित माँग भेजी थी — 7 दिन पूरे हुए, जवाब आया, या मध्यस्थता की तैयारी करें?',
      chips: [
        'जवाब नहीं आया — चरण 2 (मध्यस्थता) पर जाएँ',
        'जवाब में मनाही है — जवाबी तैयार करें',
        'डिपॉज़िट वापस मिल गया! केस बंद करें',
      ],
    },
  },

  /* ── Case 3 · Marathi — municipal notice ── */
  {
    id: 'h3',
    title: 'Property tax notice (₹18,450)',
    when: 'Oct 22 → Today',
    tier: 'notice',
    stages: [DONE('intake', 'Intake'), DONE('read', 'Document read'), DONE('fields', 'Field check'), NOW('explain', 'Explainer')],
    sources: [
      { legalId: 'mmc-property-tax', coverage: 'direct' },
    ],
    lang: 'mr',
    titleNative: 'महापालिका मालमत्ता कर नोटीस',
    amount: '₹18,450',
    statusLine: 'नोटीस डीकोड झाला',
    memory: [
      { label: 'बाब', value: 'मालमत्ता कर मागणी 2026–27' },
      { label: 'पक्ष', value: 'महानगरपालिका (काल्पनिक)' },
      { label: 'रक्कम', value: '₹18,450' },
      { label: 'स्थिती', value: 'दाद मुदत सुरू आहे' },
      { label: 'चरण', value: 'नोटीस डीकोड · आक्षेप मसुदा' },
    ],
    days: [
      {
        id: 'd0',
        dateLabel: '22 ऑक्टोबर',
        iso: '2026-10-22',
        title: 'नोटीस वाचून काढले',
        summary: {
          grievance: '₹18,450 ची मालमत्ता कर मागणी — “घर शिक्कामार्फत होतं का?” या भीतीसह.',
          standing: 'ही मागणी आहे, सीलिंग नाही — देय तारीख व दाद मुदत स्पष्ट [VERIFY].',
          next: 'पाच प्रमुख मुद्दे पडताळले; देय तारीख कालदर्शिकेत नोंदवली.',
        },
        cards: ['notice', 'ladder'],
        turns: [
          { role: 'user', text: 'महानगरपालिकेचा मालमत्ता कराचा जाहीरनामा आलाय — ₹18,450 लाल शेकड़ीत लिहिलाय. घर शिक्कामार्फत होतं का?' },
          { role: 'assistant', text: 'घाबरू नका — ही मागणी आहे, सीलिंग नाही. प्रत्येक ओळ तुमच्या भाषेत वाचून काढली आहे; रक्कम, मुदत आणि देय तारीख पडताळा.' },
          { role: 'assistant', text: 'वाचन स्पष्टीकरणापुरतेच असते — भरायचे की वाद करायचे हे निर्णय तुमचाच. देय तारीख कालदर्शिकेत नोंदवा.' },
        ],
      },
      {
        id: 'd1',
        dateLabel: '25 ऑक्टोबर',
        iso: '2026-10-25',
        title: 'आक्षेप लेख्याचा मसुदा',
        summary: {
          grievance: 'रक्कम जास्त वाटते; दाद कसा द्यावा असा प्रश्न.',
          standing: 'आक्षेपाची मुदत सुरू आहे; जुन्या पावत्या पुराव्यात जोडल्या.',
          next: 'आक्षेप लेख्याचा मसुदा दस्तऐवजांत जोडला — मानवी सल्ल्याने तपासा.',
        },
        cards: ['ladder'],
        turns: [
          { role: 'user', text: 'रक्कम जास्त वाटतेय. दाद कसा द्यावा?' },
          { role: 'assistant', text: 'आक्षेप लेख्याचा मसुदा तयार आहे — आकारणी कॉपी आणि जुन्या पावत्या जोडा. हे स्पष्टीकरण आहे; निर्णय तुमचा, पक्की तपासणी माणसाकडून.' },
        ],
      },
    ],
    docs: [
      { id: 'c3-notice', kind: 'notice', name: 'property-tax-demand-2026.pdf', dayIndex: 0 },
      { id: 'c3-obj', kind: 'objection-draft', name: 'objection-letter-draft.txt', dayIndex: 1 },
    ],
    continuity: {
      memoryLine: 'मालमत्ता कर · ₹18,450 · दाद मुदत सुरू',
      followUp: 'पुन्हा स्वागत. ₹18,450 च्या मागणीवर आक्षेप लेख्याचा मसुदा तयार केला होता — दाद मुदतीच्या आत पाठवली, की पावत्या जोडायच्या आहेत?',
      chips: [
        'उत्तर आले नाही — मानवी मदत बघा',
        'रक्कम पडताळायची आहे — मसुदा दाखवा',
        'बाब सुटली! बाब बंद करा',
      ],
    },
  },

  /* ── Case 4 · Tamil — resolved ── */
  {
    id: 'h4',
    domain: 'refund',
    title: 'Mobile refund (₹14,500)',
    when: 'Oct 23 → Today',
    tier: 'consumer',
    stages: [DONE('intake', 'Intake'), DONE('verify', 'Fact check'), DONE('plan', 'Plan'), DONE('close', 'Closed')],
    sources: [
      { legalId: 'cpa-defect-goods', coverage: 'direct' },
    ],
    lang: 'ta',
    titleNative: 'பழுதுபட்ட மொபைல் ரீஃபண்ட்',
    amount: '₹14,500',
    statusLine: 'தீர்வு · பயனர் பதிவு',
    resolved: true,
    memory: [
      { label: 'விஷயம்', value: 'ஸ்மார்ட்போன் (ஸ்கிரீன் பழுது)' },
      { label: 'விற்பவர்', value: 'HomeKart' },
      { label: 'தொகை', value: '₹14,500' },
      { label: 'முடிவு', value: 'பிக்கப் ஒப்புக்கொண்டார்கள்' },
      { label: 'நிலை', value: 'தீர்வு · பயனர் பதிவு' },
    ],
    days: [
      {
        id: 'd0',
        dateLabel: '23 அக்டோபர்',
        iso: '2026-10-23',
        title: 'புகார் பதிவு',
        summary: {
          grievance: '₹14,500 மொபைல் டெலிவரியிலேயே ஸ்கிரீன் பழுது; ரீஃபண்ட் மறுப்பு.',
          standing: 'வந்ததும் உடைந்த பொருள் — குறை ஆவணம் ஆதாரத்துடன் [VERIFY].',
          next: 'படி 1 வரைவு WhatsApp-இல் ஒட்டப்பட்டது; எழுத்துப்பூர்வ பதில் கோரப்பட்டது.',
        },
        cards: ['factcheck', 'finding', 'ladder'],
        turns: [
          { role: 'user', text: 'ஹோம்கார்ட்டில் ₹14,500 மொபைல் வாங்கினேன் — டெலிவரியிலேயே ஸ்கிரீன் பழுது. ரீஃபண்ட் மறுத்தார்கள்.' },
          { role: 'assistant', text: 'வருத்தம் தரும் விஷயம் — இதை ஏற்றுக்கொள்ள வேண்டியதில்லை. உண்மைகளை உறுதிசெய்து, முதல் படியை எழுத்துப்பூர்வமாக எடுப்போம்.' },
        ],
      },
      {
        id: 'd1',
        dateLabel: '26 அக்டோபர்',
        iso: '2026-10-26',
        title: 'தீர்வு பதிவு',
        summary: {
          grievance: 'வரைவு அனுப்பிய இரண்டு நாளில் பிக்கப் ஒப்புக்கொண்டார்கள்.',
          standing: 'தீர்வு — பயனரே பதிவு செய்தார்; செயலி எதுவும் அனுப்பவில்லை.',
          next: 'முடிவு பதிவு ஆவணத்தில்; ரசீதுகளை வைத்திருங்கள்.',
        },
        cards: ['closeout'],
        turns: [
          { role: 'user', text: 'வாட்ஸ்அப் மெசேஜ் அனுப்பிய இரண்டு நாளில் அவர்களே பிக்கப் ஒத்துக்கொண்டார்கள்!' },
          { role: 'assistant', text: 'அருமை — நடந்ததை இப்போதே பதிவு செய்யுங்கள். செயலி எதுவும் அனுப்பவில்லை; இந்தப் பதிவு உங்கள் சாதனத்திலேயே.' },
        ],
      },
    ],
    docs: [
      { id: 'c4-inv', kind: 'invoice', name: 'invoice-mobile-14500.pdf', dayIndex: 0 },
      { id: 'c4-close', kind: 'closure', name: 'closure-record.pdf', dayIndex: 1 },
    ],
    continuity: {
      memoryLine: 'மொபைல் · ₹14,500 · தீர்வு பதிவு',
      followUp: 'மீண்டும் வருகைக்கு நன்றி. இந்த வழக்கு நீங்களே முடித்து பதிவு செய்தீர்கள் — பதிவை புதுப்பிக்கவா, வேறு உதவி வேண்டுமா?',
      chips: [
        'பதிவை புதுப்பி',
        'ரசீது நகல் வேண்டும்',
        'புதிய வழக்கு தொடங்கு',
      ],
    },
  },

  /* ── Case 5 · Urdu RTL — electricity bill ── */
  {
    id: 'h5',
    title: 'Electricity bill dispute (₹6,200)',
    when: 'Oct 24 → Today',
    tier: 'notice',
    stages: [DONE('intake', 'Intake'), DONE('read', 'Bill read'), NOW('draft', 'Objection draft'), TODO('send', 'Send')],
    sources: [
    ],
    lang: 'ur',
    titleNative: 'بجلی کے بل کا تنازعہ',
    amount: '₹6,200',
    statusLine: 'مرحلہ 1 · اعتراض مسودہ',
    memory: [
      { label: 'معاملہ', value: 'بجلی کا بل تنازعہ' },
      { label: 'فریق', value: 'بجلی فراہمی کمپنی (فرضی)' },
      { label: 'رقم', value: '₹6,200' },
      { label: 'مسئلہ', value: 'خراب میٹر، درخواست زیرِ التوا' },
      { label: 'موجودہ مرحلہ', value: '1/2 · اعتراض مسودہ' },
    ],
    days: [
      {
        id: 'd0',
        dateLabel: '24 اکتوبر',
        iso: '2026-10-24',
        title: 'شکایت درج',
        summary: {
          grievance: '₹6,200 کا بل جبکہ میٹر پچھلے مہینے سے خراب تھا اور درخواست زیرِ التوا ہے۔',
          standing: 'درخواست کا نمبر اور تاریخیں ریکارڈ ہیں — بل کی ہر سطر سمجھائی گئی [VERIFY]۔',
          next: 'بل کے نمایاں نکات تسلیخی جانچ گئے؛ مدت نوٹ کی گئی۔',
        },
        cards: ['notice', 'ladder'],
        turns: [
          { role: 'user', text: 'بجلی کا بل ₹6,200 آیا ہے — پچھلے مہینے سے میٹر خراب تھا، درخواست دے چکا ہوں مگر ٹیم نہیں آئی۔' },
          { role: 'assistant', text: 'آپ نے صحیح قدم اٹھایا — درخواست کا نمبر اور تاریخیں آپ کا ثبوت ہیں۔ میں بل کی ہر سطر آپ کی زبان میں سمجھاتا ہوں۔' },
        ],
      },
      {
        id: 'd1',
        dateLabel: '27 اکتوبر',
        iso: '2026-10-27',
        title: 'اعتراض مسودہ',
        summary: {
          grievance: 'بل کی رقم غلط لگتی ہے؛ اعتراض درکار۔',
          standing: 'اعتراض کی مدت جاری؛ پرانا بل اور درخواست کی رسید ثبوت ہیں۔',
          next: 'اعتراض و درستگی کا مسودہ دستاویزات میں شامل — وضاحت صرف، فیصلہ صارف کا۔',
        },
        cards: ['ladder'],
        turns: [
          { role: 'user', text: 'اب کیا لکھوں؟' },
          { role: 'assistant', text: 'اعتراض اور درستگی کا مسودہ تیار ہے — پرانا بل اور درخواست کی رسید ساتھ رکھیں۔ یہ صرف وضاحت ہے، فیصلہ آپ کا۔' },
        ],
      },
    ],
    docs: [
      { id: 'c5-bill', kind: 'notice', name: 'electricity-bill-6200.pdf', dayIndex: 0 },
      { id: 'c5-obj', kind: 'objection-draft', name: 'bill-objection-ur.txt', dayIndex: 1 },
    ],
    continuity: {
      memoryLine: 'بجلی کا بل · ₹6,200 · اعتراض مسودہ',
      followUp: 'خوش آمدید۔ کل ہم نے اعتراض و درستگی کا مسودہ تیار کیا تھا — بجلی کی ٹیم آئی، یا رسیدیں جوڑ کے جمع کرانا ہے؟',
      chips: [
        'جواب نہیں ملا — اگلا مرحلہ دیکھیں',
        'رقم غلط ہے — مسودہ دکھائیں',
        'معاملہ حل ہو گیا! کیس بند کریں',
      ],
    },
  },
]

export function matterById(id: string): MatterRecord | undefined {
  return MATTERS.find((m) => m.id === id)
}

/** evidence-sync law: a day's documents tab shows every exhibit generated
 *  up to and including that day — Day 1 the invoice, Day 2 + the draft,
 *  Day 3 + the formal notice */
export function docsUpTo(matter: MatterRecord, dayIndex: number): CaseDoc[] {
  return matter.docs.filter((d) => d.dayIndex <= dayIndex)
}

/** short exhibit noun for the vault chips */
export const DOC_KIND_LABEL: Record<CaseDocKind, string> = {
  invoice: 'Exhibit A',
  'upi-log': 'Exhibit A',
  notice: 'Exhibit A',
  'whatsapp-draft': 'Draft 1',
  'objection-draft': 'Draft',
  closure: 'Record',
}

/* ---- date-grouped history (ChatGPT/Gemini sidebar model): every day chat
   across every case, newest first, bucketed against a FIXED prototype clock
   (the status bar says 9:41; "today" never drifts) ---- */
export const PROTOTYPE_TODAY = '2026-10-28'

export type HistoryBucket = 'today' | 'yesterday' | 'week' | 'earlier'

export interface HistoryEntry {
  matter: MatterRecord
  day: CaseDay
  dayIndex: number
}

function daysBefore(iso: string): number {
  return Math.round((Date.parse(PROTOTYPE_TODAY) - Date.parse(iso)) / 86_400_000)
}

export function historyGroups(): { bucket: HistoryBucket; entries: HistoryEntry[] }[] {
  const all: HistoryEntry[] = MATTERS.flatMap((matter) =>
    matter.days.map((day, dayIndex) => ({ matter, day, dayIndex })),
  ).sort((a, b) => b.day.iso.localeCompare(a.day.iso))
  const bucketOf = (iso: string): HistoryBucket => {
    const d = daysBefore(iso)
    return d <= 0 ? 'today' : d === 1 ? 'yesterday' : d <= 7 ? 'week' : 'earlier'
  }
  const order: HistoryBucket[] = ['today', 'yesterday', 'week', 'earlier']
  return order
    .map((bucket) => ({ bucket, entries: all.filter((e) => bucketOf(e.day.iso) === bucket) }))
    .filter((g) => g.entries.length > 0)
}
