import type { LangCode } from './languages'
import type { FactItem } from '../components/cards/FactCheckCard'

/**
 * Multi-domain legal engine (master spec Part 1): each domain carries its
 * own empathy register, fact-gate rows, statutory finding, caution face,
 * ladder drafts and channel prep — so the deposit/UPI/salary journeys never
 * fall back to the mixer script.
 *
 * Constitution rules, deliberately kept while adapting the spec:
 *  - Section numbers live ONLY in legal-content.ts; drafts and card copy name
 *    the ACT, and the citation renders via SectionRef from the legalId with
 *    its [VERIFY] chip. No new helpline numbers outside legal-content either.
 *  - Fictional sellers only (HomeKart / Mixwell / role-based parties).
 *  - Packs are provided for en + hi (the spec's own examples); mr/ta/ur fall
 *    back to en under the visible coverage law until the native-review pass.
 *  - All statutory entries ship verified:false with [VERIFY] — owner flip only.
 */

export type DomainId = 'refund' | 'deposit' | 'upi' | 'salary'
export type DomainBranch = 'standard' | 'informal'

export interface DomainChannel {
  /** the big mono token in the channel step: '1915' | '1930' | 'DLSA' | 'SAMADHAN' */
  token: string
  legalId: string
}

export interface DomainFinding {
  title: string
  lawSays: string
  means: string
  legalId: string
  reasoning: string[]
}

export interface DomainCaution {
  title: string
  body: string
  steps: string[]
}

export interface DomainPack {
  empathy: string
  facts: FactItem[]
  finding: DomainFinding
  caution?: DomainCaution
  drafts: [string, string]
  prep: string[]
  stepTitles: [string, string, string]
  channel: DomainChannel
  escalate: string
  noticeSubject: string
  noticeBody: string
}

type BranchPacks = Partial<Record<LangCode, DomainPack>> & { en: DomainPack }

export interface DomainPlaybook {
  id: DomainId
  standard: BranchPacks
  informal?: BranchPacks
}

export function domainPack(
  domain: DomainId,
  branch: DomainBranch,
  lang: LangCode,
): DomainPack {
  const book = DOMAIN_PLAYBOOKS[domain]
  const set = branch === 'informal' && book.informal ? book.informal : book.standard
  return set[lang] ?? set.en!
}

/* ────────────────────────── Domain 1 · refund ────────────────────────── */

const refundStandard: BranchPacks = {
  en: {
    empathy:
      'A "return window is closed" answer when the product itself arrived broken is where many people get stuck — a store policy cannot take away what the law gives you. Let us lock the basic facts first, so your next message is the exact right one.',
    facts: [
      { key: 'item', label: 'Item', value: 'Mixwell 750W mixer grinder' },
      { key: 'amount', label: 'Amount paid', value: '₹8,999 (UPI · GST invoice)' },
      { key: 'timeline', label: 'Timeline', value: 'Delivered 4 days ago · failed on first use' },
      { key: 'position', label: 'Their position', value: 'Refused refund; blames brand service centre' },
    ],
    finding: {
      title: 'A "closed return window" cannot override what the law gives you',
      lawSays:
        'Goods that arrive damaged can count as a defect under the Consumer Protection Act, 2019, and under the E-Commerce Rules, 2020 an online marketplace must run a grievance process — store policy cannot shorten statutory remedies [VERIFY].',
      means:
        'Asking HomeKart for a pickup and a full refund is the normal, lawful ask — not a favour. The invoice, the photos and this chat are your whole record; keep them together.',
      legalId: 'cpa-ecommerce-grievance',
      reasoning: [
        'Product arrived damaged and failed on first use (dead on arrival).',
        'GST invoice + UPI trail establishes the consumer transaction.',
        'Store policy cannot waive statutory remedies under the 2019 Act [VERIFY].',
      ],
    },
    drafts: [
      'Hello HomeKart Grievance Team,\n\nOrder [order ID] — Mixwell 750W mixer grinder (₹8,999) was delivered defective: the jar arrived cracked and the motor failed on first use.\n\nA "return window closed" refusal does not hold — goods that arrive damaged count as a defect under the Consumer Protection Act, 2019, and the E-Commerce Rules, 2020 require your grievance officer to address this.\n\nPlease process a pickup and a full refund of ₹8,999 within 48 hours of this message, failing which I will register a docket on the National Consumer Helpline (1915) and the consumer portal.\n\nThank you,\n[Your name]',
      'Hello HomeKart team,\n\nMy Mixwell mixer grinder (₹8,999) arrived damaged — photos and the GST invoice are ready.\n\nUnder the Consumer Protection Act, 2019 a defective-on-arrival product is a defect; store policy cannot override that.\n\nI ask for a pickup and a full refund within 48 hours, in writing.\n\nRegards,\n[Your name]',
    ],
    prep: [
      'Order ID and the GST invoice PDF',
      'Photos of the damage, as unboxed',
      'The UPI UTR / payment reference',
      'What you are asking for: pickup + full refund',
    ],
    stepTitles: ['Send the grievance message first', 'Escalate to the national consumer helpline', 'Send a formal demand notice'],
    channel: { token: '1915', legalId: 'national-consumer-helpline' },
    escalate:
      'A "company policy" reply is not the end of the road — put their refusal in writing and climb one rung: register the docket on the free 1915 helpline with the prep list below, and keep every screenshot. Your drafts above stay ready.',
    noticeSubject: 'Demand for refund — defective mixer grinder, order [order ID]',
    noticeBody:
      'I purchased a Mixwell 750W mixer grinder (₹8,999) from HomeKart, delivered on [delivery date]. The product arrived defective — a defect in the goods. My refund/replacement request was refused on the grounds of a "return window". I demand a full refund of ₹8,999 within 15 days of this notice, failing which I intend to seek remedy through the consumer dispute channels. — [Your name]',
  },
  hi: {
    empathy:
      'जब सामान खुद टूटा हुआ आया हो, तब "रिटर्न विंडो बंद है" कहकर मना करना वहीं अटकने की जगह है — दुकान की पॉलिसी कानून द्वारा दिए अधिकारों को नहीं काट सकती। आइए पहले बुनियादी तथ्य पक्के करें, ताकि आपका अगला संदेश बिल्कुल सही हो।',
    facts: [
      { key: 'item', label: 'वस्तु', value: 'मिक्सवेल 750W मिक्सर ग्राइंडर' },
      { key: 'amount', label: 'राशि', value: '₹8,999 (UPI · GST बिल)' },
      { key: 'timeline', label: 'समय', value: '4 दिन पहले डिलीवर · पहली बार चलाने पर खराब' },
      { key: 'position', label: 'उनका रुख', value: 'रिफंड से मना; ब्रांड सर्विस सेंटर की ओर भेजा' },
    ],
    finding: {
      title: '"रिटर्न विंडो बंद" कानून द्वारा दिए अधिकारों को नहीं रोक सकता',
      lawSays:
        'जो सामान टूटा हुआ आता है वह उपभोक्ता संरक्षण कानून, 2019 के तहत खराबी माना जा सकता है, और ई-कॉमर्स नियम, 2020 के अंतर्गत ऑनलाइन मार्केटप्लेस को शिकायत-प्रक्रिया चलानी ही होती है — दुकान की पॉलिसी सांविधिक उपायों को नहीं काट सकती [VERIFY]।',
      means:
        'HomeKart से पिकअप और पूरा रिफंड माँगना सामान्य, वाजिब अनुरोध है — कोई एहसान नहीं। बिल, फ़ोटो और यह चैट ही आपका पूरा रिकॉर्ड है; इन्हें साथ रखें।',
      legalId: 'cpa-ecommerce-grievance',
      reasoning: [
        'सामान डिलीवरी पर ही खराब था, पहली बार चलाने पर बंद।',
        'GST बिल + UPI स्टेटमेंट उपभोक्ता-लेनदेन सिद्ध करते हैं।',
        '2019 के कानून के तहत दुकान की पॉलिसी सांविधिक उपाय नहीं काट सकती [VERIFY]।',
      ],
    },
    drafts: [
      'नमस्ते HomeKart ग्रीवांस टीम,\n\nऑर्डर [ऑर्डर नं.] — मिक्सवेल 750W मिक्सर ग्राइंडर (₹8,999) खराब हालत में डिलीवर हुआ: जार टूटा आया और मोटर पहली बार चलाने पर ही बंद।\n\n"रिटर्न विंडो बंद" का इनकार टिकता नहीं — उपभोक्ता संरक्षण कानून, 2019 के तहत खराब-हालत में आया सामान खराबी है, और ई-कॉमर्स नियम, 2020 अपने ग्रीवांस ऑफ़िसर से इसे निपटाने की माँग करते हैं।\n\nकृपया इस संदेश के 48 घंटों में पिकअप और ₹8,999 का पूरा रिफंड करें, वरना मैं राष्ट्रीय उपभोक्ता हेल्पलाइन (1915) और उपभोक्ता पोर्टल पर डॉकेट दर्ज करूँगी।\n\nधन्यवाद,\n[आपका नाम]',
      'नमस्ते HomeKart टीम,\n\nमेरा मिक्सवेल मिक्सर ग्राइंडर (₹8,999) खराब हालत में आया — फ़ोटो और GST बिल तैयार हैं।\n\nउपभोक्ता संरक्षण कानून, 2019 के तहत डिलीवरी पर खराब उत्पाद खराबी है; दुकान की पॉलिसी इसे नहीं मिटा सकती।\n\nमैं 48 घंटों में पिकअप और पूरे रिफंद की लिखित माँग करती हूँ।\n\nसादर,\n[आपका नाम]',
    ],
    prep: [
      'ऑर्डर ID और GST बिल PDF',
      'खुलते समय की फ़ोटो',
      'UPI UTR / भुगतान संदर्भ',
      'आप क्या माँग रहे हैं: पिकअप + पूरा रिफंड',
    ],
    stepTitles: ['पहले ग्रीवांस संदेश भेजें', 'राष्ट्रीय उपभोक्ता हेल्पलाइन पर बढ़ें', 'औपचारिक माँग-पत्र भेजें'],
    channel: { token: '1915', legalId: 'national-consumer-helpline' },
    escalate:
      '"कंपनी पॉलिसी" जवाब रास्ते का अंत नहीं है — उनके इनकार को लिखित में लें और एक रन्ग ऊपर चढ़ें: तैयार सूची के साथ मुफ़्त 1915 हेल्पलाइन पर डॉकेट दर्ज करें और हर स्क्रीनशॉट संभालें। आपके मसौदे ऊपर तैयार हैं।',
    noticeSubject: 'रिफंड की माँग — खराब मिक्सर ग्राइंडर, ऑर्डर [ऑर्डर नं.]',
    noticeBody:
      'मैंने HomeKart से मिक्सवेल 750W मिक्सर ग्राइंडर (₹8,999) खरीदा था, डिलीवरी [डिलीवरी तारीख़] को हुई। उत्पाद खराब हालत में आया — सामान की खराबी। मेरी रिफंड/बदली की माँग "रिटर्न विंडो" कहकर मना कर दी गई। मैं इस पत्र के 15 दिनों के भीतर ₹8,999 के पूरे रिफंड की माँग करती हूँ, वरना मैं उपभोक्ता विवाद मार्गों से उपाय चाहूँगी। — [आपका नाम]',
  },
}

const refundInformal: BranchPacks = {
  en: {
    empathy:
      'A seller who takes a personal UPI payment and then blocks you has moved this out of "store return" territory entirely — the payment trail becomes your leverage, and speed matters. Let us lock the transaction details first.',
    facts: [
      { key: 'item', label: 'Item', value: 'Sneakers (Instagram deals page)' },
      { key: 'amount', label: 'Amount paid', value: '₹4,500 (GPay to a personal number)' },
      { key: 'timeline', label: 'Timeline', value: 'Paid 6 days ago · blocked on WhatsApp' },
      { key: 'position', label: 'Their position', value: 'Unverified seller · no invoice, no tracking' },
    ],
    finding: {
      title: 'Placeholder — informal branch renders the caution face',
      lawSays: '',
      means: '',
      legalId: 'cyber-fraud-report',
      reasoning: [],
    },
    caution: {
      title: 'Payment proof — but a different rail',
      body: 'Because this was a personal UPI payment to an unverified seller with no invoice, no store-return process exists here. Your strongest lever is the payment trail: flag the transaction inside your UPI app and file a cyber-financial report quickly — the receiving account can be flagged [VERIFY]. Save the payment screenshot and the UTR; a human helper should check this boundary with you first.',
      steps: [
        'Read your message and the payment trail',
        'Checked the purchase: personal transfer, no invoice, no platform',
        'Routed to the payment-reversal and cyber-report rails [VERIFY]',
        'Evidence steps kept; a human checks the boundary first',
      ],
    },
    drafts: [
      'Hello,\n\nOn [date] you received ₹4,500 by UPI (UTR [UTR]) for an order you never shipped and have now blocked all contact.\n\nI have flagged this transaction as a fraudulent payment in my UPI app and filed a cyber-financial report. If the full amount is returned within 48 hours, I will withdraw the complaint.\n\n[Your name]',
      'This is regarding the ₹4,500 UPI payment (UTR [UTR]) of [date] for the order you did not fulfil. The transaction has been reported through the UPI app and the cybercrime channel. Refund in full to reverse the report.\n\n[Your name]',
    ],
    prep: [
      'The UPI UTR / transaction ID',
      'Payment screenshot with the amount and number',
      'The WhatsApp chat export, before the block',
      'The seller profile link / handle',
    ],
    stepTitles: ['Report the payment in your UPI app first', 'File the cyber-financial report', 'Send a formal demand (with a human helper)'],
    channel: { token: '1930', legalId: 'cyber-fraud-report' },
    escalate:
      'Do not argue with a blocked number — climb the rails: the UPI in-app dispute and the cyber-financial report work on the payment trail, not on the seller\u2019s cooperation. Keep the UTR everywhere; a human helper should review the boundary with you.',
    noticeSubject: 'Demand for refund — fraudulent payment, UTR [UTR]',
    noticeBody:
      'On [date] ₹4,500 was transferred by UPI (UTR [UTR]) to the recipient named above for goods that were never delivered, after which all contact was blocked. Payment was made under a mistake and the goods were never supplied. I demand a full refund of ₹4,500 within 15 days of this notice, failing which the cyber-financial complaint and recovery proceedings will continue. — [Your name]',
  },
  hi: {
    empathy:
      'जिस विक्रेता ने पर्सनल UPI पर पैसे लेकर आपको ब्लॉक कर दिया, वह यह मामला "स्टोर रिटर्न" से पूरी तरह बाहर ले गया है — अब आपकी ताक़त भुगतान का निशान है, और रफ़्तार मायने रखती है। पहले लेनदेन की जानकारी पक्के करें।',
    facts: [
      { key: 'item', label: 'वस्तु', value: 'जूते (इंस्टाग्राम डील्स पेज)' },
      { key: 'amount', label: 'राशि', value: '₹4,500 (GPay, पर्सनल नंबर पर)' },
      { key: 'timeline', label: 'समय', value: '6 दिन पहले भुगतान · WhatsApp पर ब्लॉक' },
      { key: 'position', label: 'उनका रुख', value: 'अनवेरिफ़ाइड विक्रेता · न बिल, न ट्रैकिंग' },
    ],
    finding: {
      title: 'प्लेसहोल्डर — अनौपचारिक शाखा सावधानी-चेहरा दिखाती है',
      lawSays: '',
      means: '',
      legalId: 'cyber-fraud-report',
      reasoning: [],
    },
    caution: {
      title: 'भुगतान का प्रमाण है — पर रास्ता अलग है',
      body: 'यह पर्सनल UPI भुगतान था, बिना बिल के अनवेरिफ़ाइड विक्रेता को — यहाँ कोई स्टोर-रिटर्न प्रक्रिया है ही नहीं। आपकी सबसे मज़बूत दाल भुगतान का निशान है: अपनी UPI ऐप में लेनदेन फ़्लैग करें और जल्दी साइबर-वित्तीय रिपोर्ट दर्ज करें — पाने वाले खाते को फ़्लैग किया जा सकता है [VERIFY]। पेमेंट स्क्रीनशॉट और UTR संभाल कर रखें; पहले कोई मानव सहायक यह सीमा आपके साथ जाँचे।',
      steps: [
        'आपका संदेश और भुगतान-पहल पढ़ी',
        'खरीद जाँची: पर्सनल ट्रांसफ़र, बिल नहीं, प्लेटफ़ॉर्म नहीं',
        'पेमेंट-रिवर्सल और साइबर-रिपोर्ट रेल पर भेजा [VERIFY]',
        'सबूत के कदम रखे; सीमा पहले मानव जाँचे',
      ],
    },
    drafts: [
      'नमस्ते,\n\nतारीख़ [तारीख़] को आपको UPI से ₹4,500 (UTR [UTR]) मिले थे, जिसका ऑर्डर कभी भेजा नहीं गया और अब आपने संपर्क बंद कर दिया।\n\nमैंने यह लेनदेन अपनी UPI ऐप में धोखाधड़ी के रूप में फ़्लैग किया है और साइबर-वित्तीय रिपोर्ट दर्ज की है। 48 घंटों में पूरा भुगतान लौटा देंगे तो शिकायत वापस ले लूँगी।\n\n[आपका नाम]',
      'यह [तारीख़] के ₹4,500 के UPI भुगतान (UTR [UTR]) के संबंध में है, जिसका सामान नहीं भेजा गया। लेनदेन UPI ऐप और साइबर क्राइम चैनल से रिपोर्ट किया जा चुका है। रिपोर्ट वापस लेने के लिए पूरा भुगतान करें।\n\n[आपका नाम]',
    ],
    prep: [
      'UPI UTR / लेनदेन ID',
      'राशि और नंबर दिखाता पेमेंट स्क्रीनशॉट',
      'ब्लॉक से पहले की WhatsApp चैट',
      'विक्रेता का प्रोफ़ाइल लिंक / हैंडल',
    ],
    stepTitles: ['पहले अपनी UPI ऐप में भुगतान रिपोर्ट करें', 'साइबर-वित्तीय रिपोर्ट दर्ज करें', 'औपचारिक माँग भेजें (मानव सहायक के साथ)'],
    channel: { token: '1930', legalId: 'cyber-fraud-report' },
    escalate:
      'ब्लॉक किए नंबर से बहस न करें — रेल पर चढ़ें: UPI ऐप का विवाद और साइबर-वित्तीय रिपोर्ट भुगतान के निशान पर चलती है, विक्रेता के सहयोग पर नहीं। UTR हर जगह रखें; सीमा कोई मानव सहायक जाँचे।',
    noticeSubject: 'रिफंड की माँग — धोखाधड़ी वाला भुगतान, UTR [UTR]',
    noticeBody:
      'तारीख़ [तारीख़] को ऊपर नामित प्राप्तकर्ता को ₹4,500 UPI से (UTR [UTR]) भेजे गए थे, जिसका सामान कभी नहीं दिया गया और फिर संपर्क बंद कर दिया गया। भुगतान भूल से हुआ और सामान कभी आपूर्ति नहीं हुआ। मैं इस नोटिस के 15 दिनों में ₹4,500 के पूरे रिफंड की माँग करती हूँ, वरना साइबर-वित्तीय शिकायत और वसूली की कार्रवाई जारी रहेगी। — [आपका नाम]',
  },
}

/* ────────────────────────── Domain 2 · deposit ────────────────────────── */

const depositStandard: BranchPacks = {
  en: {
    empathy:
      'Holding back deposit money for "deep cleaning and repainting" after a properly served notice is one of the most common pressures tenants face — normal wear and tear is the owner\u2019s cost, not yours. Let us verify the tenancy details first.',
    facts: [
      { key: 'item', label: 'Tenancy', value: '2BHK flat deposit (Pune)' },
      { key: 'amount', label: 'Amount', value: '₹50,000 paid · ₹35,000 held back' },
      { key: 'timeline', label: 'Timeline', value: 'Vacated on notice · keys handed over peacefully' },
      { key: 'position', label: 'Their position', value: 'Landlord cites painting/cleaning, shows no bills' },
    ],
    finding: {
      title: 'Arbitrary deductions from a deposit are recoverable — wear and tear is the owner\u2019s cost',
      lawSays:
        'A tenant must return premises as received, allowing for reasonable wear and tear under the Transfer of Property Act, 1888 [VERIFY — state rent acts may override]. Withholding a deposit without itemised third-party bills after a peaceful handover can amount to wrongful retention of money.',
      means:
        'An itemised-bill demand on WhatsApp is the normal first step: every deduction needs a real invoice, else the balance is refundable. Move-out photos and rent-transfer statements are your evidence file.',
      legalId: 'tpa-wear-tear',
      reasoning: [
        'Keys were handed over peacefully after the notice period.',
        'Repainting and cleaning after a long stay fall under reasonable wear and tear [VERIFY].',
        'No itemised invoices or joint-inspection sign-off were produced.',
      ],
    },
    drafts: [
      'Namaste,\n\nI handed over the flat keys on [date], in clean condition, after serving the full notice period. Deducting ₹35,000 from my ₹50,000 deposit for routine painting and cleaning is not permitted — normal wear and tear is the owner\u2019s responsibility under the Transfer of Property Act, 1888.\n\nEvery deduction needs an itemised third-party bill. Kindly transfer the remaining ₹35,000 by [date], so we can close this amicably without a formal demand notice.\n\n[Your name]',
      'Namaste,\n\nThe flat was vacated on [date] after full notice; keys were handed over peacefully. The ₹35,000 deduction from the ₹50,000 deposit has no itemised bills — routine painting after a long stay is wear and tear, which the law places on the owner.\n\nPlease transfer the balance of ₹35,000 by [date].\n\n[Your name]',
    ],
    prep: [
      'Move-out photos, dated',
      'Rent payment bank / UPI statements',
      'The notice and key-handover record',
      'Itemised deduction bills, if any were ever given',
    ],
    stepTitles: ['Send the itemised-deduction demand first', 'Escalate to the society secretary / rent authority', 'Send a formal recovery notice'],
    channel: { token: 'DLSA', legalId: 'dlsa-routing' },
    escalate:
      'A "next week" that never comes is still silence — climb one rung: the written intimation to the housing-society secretary and the rent authority is drafted in your documents, with your payment proofs attached. The free legal-aid lookup can find your district\u2019s DLSA.',
    noticeSubject: 'Demand for recovery of security deposit — ₹35,000 withheld',
    noticeBody:
      'I vacated the premises at [address] on [date] after serving the full notice period and handing over the keys peacefully. From my security deposit of ₹50,000, ₹35,000 has been withheld citing painting and cleaning, without any itemised bills. Routine repainting after a long tenancy is reasonable wear and tear, which the law places on the owner. I demand payment of ₹35,000 within 15 days of this notice, failing which recovery proceedings will follow. — [Your name]',
  },
  hi: {
    empathy:
      'ठीक से नोटिस देने के बाद भी "डीप क्लीनिंग और पेंटिंग" कहकर डिपॉज़िट रोकना किराएदारों पर होने वाला सबसे आम दबाव है — सामान्य रख-रखाव (wear and tear) मालिक का खर्च है, आपका नहीं। आइए पहले किराए की जानकारी जाँचें।',
    facts: [
      { key: 'item', label: 'किराया', value: '2BHK फ्लैट डिपॉज़िट (पुणे)' },
      { key: 'amount', label: 'राशि', value: '₹50,000 जमा · ₹35,000 रोके' },
      { key: 'timeline', label: 'समय', value: 'नोटिस पर खाली किया · चाबी शांतिपूर्वक सौंपीं' },
      { key: 'position', label: 'उनका रुख', value: 'मकान मालिक पेंटिंग/क्लीनिंग कहे, बिल नहीं दिखाए' },
    ],
    finding: {
      title: 'डिपॉज़िट से मनमानी कटौती वसूली जा सकती है — रख-रखाव मालिक का खर्च है',
      lawSays:
        'किराएदार को प्रॉपर्टी वैसी ही लौटानी होती है जैसी मिली थी — सामान्य रख-रखाव की छूट के साथ (ट्रांसफ़र ऑफ़ प्रॉपर्टी ऐक्ट, 1888) [VERIFY — राज्य के किराया कानून अलग हो सकते हैं]। शांतिपूर्व हैंडओवर के बाद बिना बिलों के डिपॉज़िट रोकना धन का अनुचित प्रतिधारण हो सकता है।',
      means:
        'पहला सामान्य कदम: WhatsApp पर आइटम-वार बिल की माँग — हर कटौती का असली बिल चाहिए, वरना पूरा बैलेंस लौटाना होगा। मूव-आउट फ़ोटो और किराया-स्टेटमेंट आपके सबूत हैं।',
      legalId: 'tpa-wear-tear',
      reasoning: [
        'नोटिस पूरा कर चाबियाँ शांतिपूर्वक सौंपी गईं।',
        'लंबे ठहराव के बाद पेंटिंग-क्लीनिंग सामान्य रख-रखाव है [VERIFY]।',
        'कोई बिल या संयुक्त निरीक्षण की रिपोर्ट नहीं दी गई।',
      ],
    },
    drafts: [
      'नमस्ते,\n\nमैंने [तारीख़] को पूरा नोटिस निभाकर फ्लैट की चाबियाँ साफ़ हालत में लौटा दीं। मेरी ₹50,000 की डिपॉज़िट में से ₹35,000 सामान्य पेंटिंग-क्लीनिंग कहकर रोखना उचित नहीं — सामान्य रख-रखाव मालिक की ज़िम्मेदारी है (ट्रांसफ़र ऑफ़ प्रॉपर्टी ऐक्ट, 1888)।\n\nहर कटौती का बिल चाहिए। कृपया शेष ₹35,000 [तारीख़] तक भेज दें, ताकि बिना कानूनी नोटिस के मामला अमनचैन से सुलझे।\n\n[आपका नाम]',
      'नमस्ते,\n\nफ्लैट [तारीख़] को पूरे नोटिस के बाद खाली किया; चाबियाँ शांतिपूर्वक सौंपीं। ₹50,000 में से ₹35,000 की कटौती के कोई बिल नहीं — लंबे ठहराव के बाद पेंटिंग सामान्य रख-रखाव है, जो कानूनन मालिक पर है।\n\nकृपया शेष ₹35,000 [तारीख़] तक भेजें।\n\n[आपका नाम]',
    ],
    prep: [
      'मूव-आउट की तारीख़ वाली फ़ोटो',
      'किराये के बैंक/UPI स्टेटमेंट',
      'नोटिस और चाबी-हैंडओवर का रिकॉर्ड',
      'कटौती के बिल, अगर कभी दिए हों',
    ],
    stepTitles: ['पहले आइटम-वार कटौती की माँग भेजें', 'सोसाइटी सचिव / किराया प्राधिकरण से बढ़ें', 'औपचारिक वसूली नोटिस भेजें'],
    channel: { token: 'DLSA', legalId: 'dlsa-routing' },
    escalate:
      '"अगले हफ़्ते" जो कभी नहीं आता, वह भी चुप्पी है — एक रन्ग ऊपर: हाउसिंग-सोसाइटी सचिव और किराया प्राधिकरण को लिखित सूचना आपके दस्तावेज़ों में तैयार है, भुगतान-सबूत सहित। मुफ़्त कानूनी सहायता लुकअप से आपके ज़िले की DLSA मिल जाएगी।',
    noticeSubject: 'सिक्योरिटी डिपॉज़िट की वसूली — ₹35,000 रोके गए',
    noticeBody:
      'मैंने [पते] का किरायेदार पूरा नोटिस निभाकर [तारीख़] को चाबियाँ शांतिपूर्वक लौटा दीं। मेरी ₹50,000 डिपॉज़िट में से ₹35,000 पेंटिंग-क्लीनिंग कहकर, बिना किसी बिल के रोख लिया गया। लंबे किराये के बाद सामान्य पेंटिंग उचित रख-रखाव है, जो कानूनन मालिक पर है। मैं इस नोटिस के 15 दिनों में ₹35,000 की माँग करती हूँ, वरना वसूली की कार्यवाही होगी। — [आपका नाम]',
  },
}

const depositInformal: BranchPacks = {
  en: {
    empathy:
      '"No agreement, so nothing can be done" is the oldest line in this book — your rent transfers tell a different story. Let us lock what proof you have before deciding the step.',
    facts: [
      { key: 'item', label: 'Tenancy', value: 'PG room deposit (cash)' },
      { key: 'amount', label: 'Amount', value: '₹15,000 paid in cash' },
      { key: 'timeline', label: 'Timeline', value: '6 months stay · no written agreement' },
      { key: 'position', label: 'Their position', value: 'Owner refuses: "no agreement, no refund"' },
    ],
    finding: {
      title: 'Placeholder — informal branch renders the caution face',
      lawSays: '',
      means: '',
      legalId: 'tpa-implied-tenancy',
      reasoning: [],
    },
    caution: {
      title: 'No written agreement does not mean no tenancy',
      body: 'Monthly rent transfers and the deposit receipt can establish a month-to-month tenancy under the Transfer of Property Act, 1888 even without a signed agreement [VERIFY]. Two cautions: do not hand over keys until the refund is transferred or a written handover receipt is signed — and have a human helper check your dates and state-specific rules first.',
      steps: [
        'Read your message and the proof you do have',
        'Checked the trail: repeated transfers, no signed agreement',
        'Implied-tenancy route flagged as needs-verification [VERIFY]',
        'Keys stay with you until the refund or a signed receipt',
      ],
    },
    drafts: [
      'Namaste,\n\nThere is no signed agreement, but the rent transfers of the last 6 months and the ₹15,000 deposit transfer establish the tenancy itself. I am handing back the room only against a full refund of ₹15,000 or a signed handover receipt promising the refund by [date].\n\n[Your name]',
      'Namaste,\n\nRegarding the ₹15,000 deposit: our rent-transfer record establishes the stay. Keys will be returned the same day the full deposit is transferred, against a written receipt.\n\n[Your name]',
    ],
    prep: [
      'Bank / UPI statements showing the rent transfers',
      'The deposit payment proof',
      'The chat history with the owner',
      'A written handover receipt draft, ready to sign',
    ],
    stepTitles: ['Send the refund-against-receipt message first', 'Escalate to a human helper / local mediation', 'Send a formal demand notice'],
    channel: { token: 'DLSA', legalId: 'dlsa-routing' },
    escalate:
      'If the owner stays at "no agreement", the written trail is your answer — climb one rung: a human helper or the district legal-aid office should check your dates and state rules before anything stronger. Keep every transfer record safe.',
    noticeSubject: 'Demand for refund of deposit — implied tenancy, ₹15,000',
    noticeBody:
      'I occupied the room at [address] for 6 months. Though no written agreement was executed, monthly rent transfers and the ₹15,000 deposit transfer establish the tenancy. The room was offered back; the deposit has been withheld. I demand refund of ₹15,000 within 15 days of this notice, failing which recovery proceedings will follow. — [Your name]',
  },
  hi: {
    empathy:
      '"एग्रीमेंट नहीं है, तो कुछ नहीं हो सकता" — इस किताब की सबसे पुरानी लाइन यही है। आपके किराया ट्रांसफ़र दूसरी कहानी बयान करते हैं। कदम चुनने से पहले देखें आपके पास क्या सबूत है।',
    facts: [
      { key: 'item', label: 'किराया', value: 'पीजी रूम डिपॉज़िट (कैश)' },
      { key: 'amount', label: 'राशि', value: '₹15,000 नकद दिए' },
      { key: 'timeline', label: 'समय', value: '6 महीने ठहरे · कोई लिखित एग्रीमेंट नहीं' },
      { key: 'position', label: 'उनका रुख', value: 'मालिक कहे: "एग्रीमेंट नहीं, तो रिफंड नहीं"' },
    ],
    finding: {
      title: 'प्लेसहोल्डर — अनौपचारिक शाखा सावधानी-चेहरा दिखाती है',
      lawSays: '',
      means: '',
      legalId: 'tpa-implied-tenancy',
      reasoning: [],
    },
    caution: {
      title: 'लिखित एग्रीमेंट न होना = किरायेदारी नहीं, ऐसा नहीं है',
      body: 'हर महीने के किराया ट्रांसफ़र और डिपॉज़िट की रसीद बिना साइन एग्रीमेंट के भी महीने-दर-महीने किरायेदारी सिद्ध कर सकते हैं (ट्रांसफ़र ऑफ़ प्रॉपर्टी ऐक्ट, 1888) [VERIFY]। दो सावधानियाँ: रिफंड आने तक या लिखित हैंडओवर रसीद पर साइन होने तक चाबियाँ मत दें — और आपकी तारीख़ें व राज्य के नियम पहले कोई मानव सहायक जाँचे।',
      steps: [
        'आपका संदेश और उपलब्ध सबूत पढ़े',
        'पहल जाँची: बार-बार ट्रांसफ़र, साइन एग्रीमेंट नहीं',
        'अप्रत्यक्ष किरायेदारी रास्ता जाँच-बाक़ी चिह्नित [VERIFY]',
        'रिफंड या रसीद तक चाबियाँ आपके पास',
      ],
    },
    drafts: [
      'नमस्ते,\n\nसाइन एग्रीमेंट नहीं है, पर पिछले 6 महीनों के किराया ट्रांसफ़र और ₹15,000 की डिपॉज़िट रसीद किरायेदारी सिद्ध करते हैं। मैं कमरा तभी लौटाऊँगी जब ₹15,000 पूरे लौटेंगे या [तारीख़] तक रिफंड की लिखित रसीद पर साइन होगा।\n\n[आपका नाम]',
      'नमस्ते,\n\n₹15,000 डिपॉज़िट के संबंध में: हमारे किराया-ट्रांसफ़र का रिकॉर्ड ठहराव सिद्ध करता है। पूरी डिपॉज़िट आने के दिन ही, लिखित रसीद के बदले चाबियाँ लौटाई जाएँगी।\n\n[आपका नाम]',
    ],
    prep: [
      'किराया ट्रांसफ़र दिखाते बैंक/UPI स्टेटमेंट',
      'डिपॉज़िट भुगतान का प्रमाण',
      'मालिक से की चैट हिस्ट्री',
      'साइन के लिए तैयार हैंडओवर रसीद का मसौदा',
    ],
    stepTitles: ['पहले रसीद-बदले-रिफंड का संदेश भेजें', 'मानव सहायक / स्थानीय मध्यस्थता से बढ़ें', 'औपचारिक माँग-पत्र भेजें'],
    channel: { token: 'DLSA', legalId: 'dlsa-routing' },
    escalate:
      'मालिक "एग्रीमेंट नहीं" पर अड़ा रहे तो लिखित पहल ही आपका जवाब है — एक रन्ग ऊपर: कोई मानव सहायक या ज़िला विधिक सेवा कार्यालय आपकी तारीख़ें और राज्य नियम पहले जाँचे। हर ट्रांसफ़र रिकॉर्ड सुरक्षित रखें।',
    noticeSubject: 'डिपॉज़िट वापसी की माँग — अप्रत्यक्ष किरायेदारी, ₹15,000',
    noticeBody:
      'मैं [पते] पर 6 महीने रही। लिखित एग्रीमेंट न होते हुए भी हर माह के किराया ट्रांसफ़र और ₹15,000 डिपॉज़िट किरायेदारी सिद्ध करते हैं। कमरा लौटाने का प्रस्ताव दिया गया; डिपॉज़िट रोखा गया। मैं इस नोटिस के 15 दिनों में ₹15,000 की माँग करती हूँ, वरना वसूली की कार्यवाही होगी। — [आपका नाम]',
  },
}

/* ────────────────────────── Domain 3 · upi ────────────────────────── */

const upiStandard: BranchPacks = {
  en: {
    empathy:
      'A wrong-digit UPI transfer is terrifying, especially when the receiver goes quiet. Take a breath — banks and the payment network run a dispute rail for exactly this, and the first hours matter. Let us confirm the transaction details now.',
    facts: [
      { key: 'item', label: 'Transaction', value: 'Mistaken P2P UPI transfer (PhonePe)' },
      { key: 'amount', label: 'Amount', value: '₹12,000 (UTR [add UTR])' },
      { key: 'timeline', label: 'Timeline', value: 'Sent 2 hours ago · receiver unreachable' },
      { key: 'position', label: 'Their position', value: 'One wrong digit · credited to an unknown account' },
    ],
    finding: {
      title: 'Money sent by mistake is recoverable — the rail exists',
      lawSays:
        'Money paid to another person by mistake can be recovered under the Indian Contract Act, 1872 [VERIFY], and the payment network\u2019s dispute mechanism lets banks place a hold on a wrongly credited account [VERIFY]. Speed matters: the request goes through YOUR bank first.',
      means:
        'Raise the wrong-credit dispute with your bank today and note the UTR everywhere — the recipient has no right to keep money sent by mistake, and the receiving bank can be asked to hold it.',
      legalId: 'contract-mistake-72',
      reasoning: [
        'Transfer went to a wrong number and was reported within hours.',
        'The recipient has no lawful basis to retain money paid by mistake [VERIFY].',
        'The bank/NPCI dispute rail can place a lien on the credited account [VERIFY].',
      ],
    },
    drafts: [
      'Subject: Urgent request — reversal of mistaken UPI credit of ₹12,000 (UTR [UTR])\n\nDear Nodal Officer,\n\nAt [time] on [date], ₹12,000 was sent by UPI to a wrong number due to one mistyped digit (UTR [UTR]). The recipient is unreachable.\n\nMoney paid by mistake is recoverable under the Indian Contract Act, 1872, and the NPCI wrong-credit guidelines cover this situation. Kindly raise the wrong-credit dispute with the beneficiary bank and place a hold on the amount.\n\nDetails attached: UTR, timestamp, screenshot.\n\n[Your name] · [Account/PhonePe number]',
      'Dear Sir/Madam,\n\n₹12,000 was transferred by mistake on [date] at [time] (UTR [UTR]). The beneficiary was informed but is now unreachable.\n\nI request an immediate wrong-credit recall request to the beneficiary bank under the NPCI dispute mechanism and the Indian Contract Act, 1872.\n\n[Your name]',
    ],
    prep: [
      'The 12-digit UTR number',
      'The exact timestamp of the transfer',
      'Screenshot of the payment',
      'Your bank\u2019s dispute / nodal officer contact',
    ],
    stepTitles: ['Raise the wrong-credit dispute first', 'Escalate to the bank\u2019s fraud desk', 'Send a formal recovery notice'],
    channel: { token: '1930', legalId: 'cyber-fraud-report' },
    escalate:
      'If the bank deflects with "you entered the PIN yourself", put the dates in writing and climb: the network\u2019s dispute path and the bank\u2019s nodal officer are the next rung — the draft in your documents carries the recoverable-by-law principle. Keep the UTR everywhere.',
    noticeSubject: 'Demand for return of ₹12,000 — money paid by mistake (UTR [UTR])',
    noticeBody:
      'On [date] at [time], ₹12,000 was transferred by UPI (UTR [UTR]) to the account operated by the recipient named above, owing to a typographical error in the beneficiary number. The amount was paid under a mistake of fact, and the recipient has no lawful right to retain it. I demand the full return of ₹12,000 within 15 days of this notice, failing which recovery proceedings under the applicable law will follow. — [Your name]',
  },
  hi: {
    empathy:
      'ग़लत अंक की UPI ट्रांसफ़र डरावनी होती है, ख़ासकर जब सामने वाला चुप हो जाए। एक गहरी साँस लें — बैंक और पेमेंट नेटवर्क की इसी स्थिति के लिए एक विवाद-रेल है, और शुरुआती घंटे मायने रखते हैं। पहले लेनदेन की जानकारी पक्के करें।',
    facts: [
      { key: 'item', label: 'लेनदेन', value: 'ग़लती से P2P UPI ट्रांसफ़र (PhonePe)' },
      { key: 'amount', label: 'राशि', value: '₹12,000 (UTR [UTR भरें])' },
      { key: 'timeline', label: 'समय', value: '2 घंटे पहले भेजे · प्राप्तकर्ता अनुपलब्ध' },
      { key: 'position', label: 'उनका रुख', value: 'एक अंक ग़लत · अनजान खाते में क्रेडिट' },
    ],
    finding: {
      title: 'भूल से भेजे पैसे वसूले जा सकते हैं — रेल मौजूद है',
      lawSays:
        'भूल से किसी और को दिए गए पैसे भारतीय ठेका अधिनियम, 1872 के तहत वसूले जा सकते हैं [VERIFY], और पेमेंट नेटवर्क की विवाद-प्रक्रिया से बैंक ग़लत खाते में क्रेडिट रक़म पर रोक लगा सकते हैं [VERIFY]। रफ़्तार मायने रखती है: अनुरोध पहले आपके अपने बैंक से जाता है।',
      means:
        'आज ही अपने बैंक से wrong-credit विवाद उठाएँ और UTR हर जगह लिखें — भूल से दिए पैसे रखने का कोई कानूनी अधिकार नहीं, और पाने वाले बैंक से रक़म रोकने को कहा जा सकता है।',
      legalId: 'contract-mistake-72',
      reasoning: [
        'रक़म ग़लत नंबर पर गई और कुछ ही घंटों में रिपोर्ट हुई।',
        'भूल से मिले पैसे रखने का कोई वैध आधार नहीं [VERIFY]।',
        'बैंक/NPCI विवाद-रेल क्रेडिटेड खाते पर लीन लगा सकती है [VERIFY]।',
      ],
    },
    drafts: [
      'विषय: तत्काल अनुरोध — भूल से गए ₹12,000 के UPI क्रेडिट का प्रत्यावर्तन (UTR [UTR])\n\nमहोदय नोडल ऑफ़िसर,\n\n[तारीख़] को [समय] पर ₹12,000 UPI से एक ग़लत अंक के कारण ग़लत नंबर पर चले गए (UTR [UTR])। प्राप्तकर्ता संपर्क से बाहर है।\n\nभूल से दिए गए धन की वापसी भारतीय ठेका अधिनियम, 1872 के तहत संभव है, और NPCI के wrong-credit दिशानिर्देश यही स्थिति कवर करते हैं। कृपया प्राप्तकर्ता बैंक से विवाद उठाएँ और रक़म पर रोक लगवाएँ।\n\nविवरण संलग्न: UTR, समय, स्क्रीनशॉट।\n\n[आपका नाम] · [खाता/PhonePe नंबर]',
      'महोदय/महोदया,\n\n[तारीख़] को [समय] पर ₹12,000 ग़लती से ट्रांसफ़र हुए (UTR [UTR])। प्राप्तकर्ता को सूचित किया गया पर अब अनुपलब्ध है।\n\nNPCI विवाद-प्रक्रिया और भारतीय ठेका अधिनियम, 1872 के तहत तत्काल wrong-credit रिकॉल अनुरोध भेजने की प्रार्थना है।\n\n[आपका नाम]',
    ],
    prep: [
      '12 अंकों का UTR नंबर',
      'ट्रांसफ़र का सटीक समय',
      'भुगतान का स्क्रीनशॉट',
      'बैंक का विवाद / नोडल ऑफ़िसर संपर्क',
    ],
    stepTitles: ['पहले wrong-credit विवाद उठाएँ', 'बैंक के फ़्रॉड डेस्क से बढ़ें', 'औपचारिक वसूली नोटिस भेजें'],
    channel: { token: '1930', legalId: 'cyber-fraud-report' },
    escalate:
      'बैंक "आपने खुद PIN डाला" कहे तो तारीख़ें लिखित में दें और चढ़ें: नेटवर्क की विवाद-प्रक्रिया और बैंक का नोडल ऑफ़िसर अगला रन्ग है — आपके मसूदे में कानूनी सिद्धांत दर्ज है। UTR हर जगह रखें।',
    noticeSubject: '₹12,000 की वापसी की माँग — भूल से भुगतान (UTR [UTR])',
    noticeBody:
      '[तारीख़] को [समय] पर ₹12,000 UPI से (UTR [UTR]) ऊपर नामित प्राप्तकर्ता के खाते में चले गए — प्राप्तकर्ता नंबर में एक अंक की चूक से। रक़म भूल की स्थिति में भुगतान हुई और उसे रखने का कोई वैध अधिकार नहीं। मैं इस नोटिस के 15 दिनों में ₹12,000 की पूरी वापसी की माँग करता/करती हूँ, वरना लागू कानून के तहत वसूली होगी। — [आपका नाम]',
  },
}

/* ────────────────────────── Domain 4 · salary ────────────────────────── */

const salaryStandard: BranchPacks = {
  en: {
    empathy:
      'You served your notice, handed everything back — and now the settlement and the relieving letter are being held. Earned wages and the relieving certificate are not a favour from HR. Let us confirm the employment details first.',
    facts: [
      { key: 'item', label: 'Dues', value: 'Unpaid F&F salary + relieving letter' },
      { key: 'amount', label: 'Amount', value: '₹68,000 (final settlement)' },
      { key: 'timeline', label: 'Timeline', value: '45 days since last working day · notice fully served' },
      { key: 'position', label: 'Their position', value: 'HR defers to an unsigned manager sign-off' },
    ],
    finding: {
      title: 'Withheld settlement after a served notice is recoverable',
      lawSays:
        'Once the notice period is served and assets are cleared, earned wages cannot be arbitrarily withheld — the Payment of Wages Act, 1936 and state shop-and-establishment laws govern this [VERIFY], and a free labour-portal claim can bring the employer to conciliation.',
      means:
        'A dated escalation email first, then the free online labour claim — starting the recovery does not need a court case or a lawyer.',
      legalId: 'payment-wages-ff',
      reasoning: [
        'Notice period fully served; assets and ID handed over.',
        'Earned wages are not contingent on a manager\u2019s sign-off [VERIFY].',
        'The labour-portal route is free and needs no lawyer [VERIFY].',
      ],
    },
    drafts: [
      'Subject: Final request — release of ₹68,000 F&F settlement and relieving letter (Emp ID [ID])\n\nDear HR Team & Management,\n\nI completed my 60-day notice period on [date] and received IT/asset clearance. It has now been 45 days; my earned dues of ₹68,000 and the relieving letter remain unreleased.\n\nWithholding earned wages after a completed notice violates the Payment of Wages Act and the state Shops & Establishments law. Kindly release the F&F credit and the relieving letter within 5 working days, failing which I will file an online claim on the Ministry of Labour\u2019s grievance portal.\n\n[Your name] · [Employee ID]',
      'Dear HR,\n\nMy notice ended on [date]; assets were cleared the same week. 45 days later the ₹68,000 settlement and relieving letter are still held.\n\nEarned wages are not contingent on an internal sign-off. Please release both within 5 working days, in writing.\n\n[Your name]',
    ],
    prep: [
      'Offer letter and the resignation-acceptance email',
      'Asset no-dues / handover screenshots',
      'Bank statement showing the missing credit',
      'Employee ID and reporting dates',
    ],
    stepTitles: ['Send the final escalation email first', 'File the free labour-portal claim', 'Send a formal demand notice'],
    channel: { token: 'SAMADHAN', legalId: 'payment-wages-ff' },
    escalate:
      'If HR keeps deferring to an internal sign-off, put the dates in writing and climb: the free labour-portal claim does not wait for a manager\u2019s signature — the escalation email in your documents already carries the dates and the demand.',
    noticeSubject: 'Demand for release of ₹68,000 F&F dues and relieving letter',
    noticeBody:
      'I served as [designation] (Emp ID [ID]) and completed my notice period on [date]; all company assets were returned and clearance was issued. My final settlement of ₹68,000 and the relieving letter have been withheld for 45 days. Earned wages cannot be withheld after a completed notice. I demand release of the full settlement and the relieving letter within 15 days of this notice, failing which proceedings under the applicable labour law will follow. — [Your name]',
  },
  hi: {
    empathy:
      'आपने अपना नोटिस पूरा किया, सब लौटा दिया — और अब सेटलमेंट और रिलीविंग लैटर रोके हैं। कमाई हुआ वेतन और रिलीविंग सर्टिफ़िकेट HR का एहसान नहीं है। पहले रोज़गार की जानकारी पक्के करें।',
    facts: [
      { key: 'item', label: 'बकाया', value: 'बकाया F&F वेतन + रिलीविंग लैटर' },
      { key: 'amount', label: 'राशि', value: '₹68,000 (फ़ाइनल सेटलमेंट)' },
      { key: 'timeline', label: 'समय', value: 'आख़िरी कार्यदिवस से 45 दिन · नोटिस पूरा निभाया' },
      { key: 'position', label: 'उनका रुख', value: 'HR मैनेजर के साइन के पीछे टालती है' },
    ],
    finding: {
      title: 'नोटिस पूरा होने के बाद रोका गया सेटलमेंट वसूला जा सकता है',
      lawSays:
        'नोटिस अवधि पूरी और एसेट क्लियर होने के बाद कमाया हुआ वेतन मनमाने ढंग से नहीं रोका जा सकता — वेतन भुगतान अधिनियम, 1936 और राज्य के दुकान-प्रतिष्ठान कानून यही कहते हैं [VERIFY], और निःशुल्क लेबर-पोर्टल शिकायत से नियोक्ता सुलह तक पहुँचाया जा सकता है।',
      means:
        'पहले तारीख़ वाला एस्केलेशन ईमेल, फिर मुफ़्त ऑनलाइन लेबर क्लेम — वसूली शुरू करने के लिए न कोर्ट चाहिए न वकील।',
      legalId: 'payment-wages-ff',
      reasoning: [
        'नोटिस पूरा निभाया; लैपटॉप-आईडी जमा की।',
        'कमाया वेतन मैनेजर के साइन पर निर्भर नहीं [VERIFY]।',
        'लेबर-पोर्टल रास्ता मुफ़्त है, वकील ज़रूरी नहीं [VERIFY]।',
      ],
    },
    drafts: [
      'विषय: अंतिम अनुरोध — ₹68,000 का F&F सेटलमेंट और रिलीविंग लैटर जारी करें (Emp ID [ID])\n\nमाननीय HR टीम एवं प्रबंधन,\n\nमैंने [तारीख़] को 60-दिन का नोटिस पूरा किया और IT/एसेट क्लियरेंस मिल चुका था। अब 45 दिन हो गए; मेरा ₹68,000 का कमाया हुआ बकाया और रिलीविंग लैटर जारी नहीं हुए।\n\nनोटिस पूरा होने के बाद कमाया वेतन रोकना वेतन भुगतान अधिनियम और राज्य के दुकान-प्रतिष्ठान कानून का उल्लंघन है। कृपया 5 कार्य-दिवसों में F&F क्रेडिट और रिलीविंग लैटर जारी करें, वरना मैं श्रम मंत्रालय के शिकायत पोर्टल पर ऑनलाइन क्लेम दर्ज करूँगी।\n\n[आपका नाम] · [कर्मचारी ID]',
      'माननीय HR,\n\nमेरा नोटिस [तारीख़] को समाप्त हुआ; एसेट उसी सप्ताह जमा हुए। 45 दिन बाद भी ₹68,000 का सेटलमेंट और रिलीविंग लैटर रोके हैं।\n\nकमाया वेतन किसी आंतरिक साइन पर निर्भर नहीं। कृपया दोनों 5 कार्य-दिवसों में, लिखित में जारी करें।\n\n[आपका नाम]',
    ],
    prep: [
      'ऑफ़र लैटर और इस्तीफ़ा-स्वीकृति ईमेल',
      'एसेट नो-ड्यूज़ / हैंडओवर स्क्रीनशॉट',
      'ग़ायब क्रेडिट दिखाता बैंक स्टेटमेंट',
      'कर्मचारी ID और कार्यकाल की तारीख़ें',
    ],
    stepTitles: ['पहले अंतिम एस्केलेशन ईमेल भेजें', 'मुफ़्त लेबर-पोर्टल क्लेम दर्ज करें', 'औपचारिक माँग-पत्र भेजें'],
    channel: { token: 'SAMADHAN', legalId: 'payment-wages-ff' },
    escalate:
      'HR आंतरिक साइन के पीछे टाले तो तारीख़ें लिखित में दें और चढ़ें: मुफ़्त लेबर-पोर्टल क्लेम किसी मैनेजर के साइन का इंतज़ार नहीं करता — आपके दस्तावेज़ों में एस्केलेशन ईमेल तारीख़ों और माँग सहित तैयार है।',
    noticeSubject: '₹68,000 F&F बकाया और रिलीविंग लैटर जारी करने की माँग',
    noticeBody:
      'मैं [पद] (कर्मचारी ID [ID]) के रूप में कार्यरत थी और [तारीख़] को मेरा नोटिस पूरा हुआ; सभी कंपनी एसेट लौटाए और क्लियरेंस मिला। मेरा ₹68,000 का फ़ाइनल सेटलमेंट और रिलीविंग लैटर 45 दिन से रोके हैं। नोटिस पूरा होने के बाद कमाया वेतन नहीं रोका जा सकता। मैं इस नोटिस के 15 दिनों में पूरा सेटलमेंट और रिलीविंग लैटर जारी करने की माँग करती हूँ, वरना लागू श्रम कानून के तहत कार्यवाही होगी। — [आपका नाम]',
  },
}

/* ────────────────────────── the registry ────────────────────────── */

export const DOMAIN_PLAYBOOKS: Record<DomainId, DomainPlaybook> = {
  refund: { id: 'refund', standard: refundStandard, informal: refundInformal },
  deposit: { id: 'deposit', standard: depositStandard, informal: depositInformal },
  upi: { id: 'upi', standard: upiStandard },
  salary: { id: 'salary', standard: salaryStandard },
}
