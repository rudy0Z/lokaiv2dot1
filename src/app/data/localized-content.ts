import type { LangCode } from './languages'
import type { FactRecord } from '../lib/matter-facts'

/**
 * Localized CONTENT (card bodies, drafts, notice templates, follow-ups) for
 * the five prepared languages. AI-drafted — `reviewedByNativeSpeaker: false`
 * (see languages.ts); the coverage banner in ChatPage says so honestly.
 *
 * Constitution rules respected here:
 *  - NO statute numbers, limitation periods, fees or helpline facts are
 *    invented or translated. `lawSays` stays plain words mirroring the
 *    (still `verified:false`) English claims in legal-content.ts; the
 *    citation line itself always renders from legal-content via SectionRef.
 *  - Nothing here asserts a fact the user did not supply: empty fact slots
 *    render as [bracketed placeholders] the user must fill or correct.
 */

type Pack<T> = Partial<Record<LangCode, T>> & { en: T }

/* ---------- fact-gate row labels + normalized value words ---------- */

export const ROW_LABELS: Pack<{ item: string; seller: string; amount: string; issue: string; ask: string; when: string }> = {
  en: { item: 'Item', seller: 'Seller', amount: 'Amount paid', issue: 'Issue', ask: 'What was refused', when: 'Bought' },
  hi: { item: 'वस्तु', seller: 'विक्रेता', amount: 'राशि', issue: 'समस्या', ask: 'जो मना किया', when: 'खरीद' },
  mr: { item: 'वस्तू', seller: 'विक्रेता', amount: 'रक्कम', issue: 'समस्या', ask: 'नकारले', when: 'खरेदी' },
  ta: { item: 'பொருள்', seller: 'விற்பவர்', amount: 'தொகை', issue: 'பிரச்சனை', ask: 'மறுத்தது', when: 'வாங்கியது' },
  ur: { item: 'چیز', seller: 'فروشنر', amount: 'رقم', issue: 'مسئلہ', ask: 'جس سے انکار ہوا', when: 'خریداری' },
}

export const ISSUE_LABELS: Pack<Record<Exclude<FactRecord['issue'], ''> | 'damaged', string>> = {
  en: { cracked: 'Arrived cracked', broken: 'Arrived broken', faulty: 'Faulty on arrival', notworking: 'Not working', damaged: 'Damaged' },
  hi: { cracked: 'डिलीवरी पर टूटा', broken: 'डिलीवरी पर टूटा हुआ', faulty: 'आने पर खराब', notworking: 'काम नहीं कर रहा', damaged: 'क्षतिग्रस्त' },
  mr: { cracked: 'डिलीवरीवर फुटलेले', broken: 'डिलीवरीवर तुटलेले', faulty: 'आल्यावर खराब', notworking: 'चालत नाही', damaged: 'खराझालेले' },
  ta: { cracked: 'வந்தபோது உடைந்தது', broken: 'வந்தபோது முறிந்தது', faulty: 'வந்ததும் குறை', notworking: 'வேலை செய்யவில்லை', damaged: 'சேதமடைந்தது' },
  ur: { cracked: 'ڈیلیوری پر ٹوٹا', broken: 'ڈیلیوری پر ٹوٹا ہوا', faulty: 'آنے پر خراب', notworking: 'کام نہیں کر رہا', damaged: 'خراب' },
}

export const ASK_LABELS: Pack<Record<Exclude<FactRecord['ask'], ''> | 'help', string>> = {
  en: { refund: 'Refund', replacement: 'Replacement', both: 'Refund and replacement', help: 'A remedy' },
  hi: { refund: 'रिफंड', replacement: 'रिप्लेसमेंट', both: 'रिफंड और रिप्लेसमेंट', help: 'उपाय' },
  mr: { refund: 'पैसे परत', replacement: 'बदली', both: 'पैसे परत किंवा बदली', help: 'उपाय' },
  ta: { refund: 'பணம் திரும்ப', replacement: 'மாற்று', both: 'பணம் திரும்ப அல்லது மாற்று', help: 'தீர்வு' },
  ur: { refund: 'رقم واپسی', replacement: 'تبدیلی', both: 'رقم واپسی یا تبدیلی', help: 'حل' },
}

/** sentence-ready forms used inside templates */
const ISSUE_PHRASE: Pack<Record<string, string>> = {
  en: { cracked: 'arrived cracked', broken: 'arrived broken', faulty: 'was faulty on arrival', notworking: 'does not work', damaged: 'was damaged' },
  hi: { cracked: 'डिलीवरी पर ही टूटा था', broken: 'डिलीवरी पर ही टूटा था', faulty: 'आते ही खराब था', notworking: 'काम नहीं करता', damaged: 'क्षतिग्रस्त था' },
  mr: { cracked: 'डिलीवरीवरच फुटले होते', broken: 'डिलीवरीवरच तुटले होते', faulty: 'आल्यावर खराब होते', notworking: 'चालत नाही', damaged: 'खराझाले होते' },
  ta: { cracked: 'வந்தபோதே உடைந்திருந்தது', broken: 'வந்தபோதே முறிந்திருந்தது', faulty: 'வந்ததும் குறையாக இருந்தது', notworking: 'வேலை செய்யாது', damaged: 'சேதமடைந்திருந்தது' },
  ur: { cracked: 'ڈیلیوری پر ہی ٹوٹا تھا', broken: 'ڈیلیوری پر ہی ٹوٹا تھا', faulty: 'آنے پر خراب تھا', notworking: 'کام نہیں کرتا', damaged: 'خراب تھا' },
}

const ASK_PHRASE: Pack<Record<string, string>> = {
  en: { refund: 'a refund', replacement: 'a replacement', both: 'a refund or a replacement', help: 'a remedy' },
  hi: { refund: 'रिफंड', replacement: 'रिप्लेसमेंट', both: 'रिफंड या रिप्लेसमेंट', help: 'उपाय' },
  mr: { refund: 'पैसे परत', replacement: 'बदली', both: 'पैसे परत किंवा बदली', help: 'उपाय' },
  ta: { refund: 'பணம் திரும்ப', replacement: 'மாற்று', both: 'பணம் திரும்ப அல்லது மாற்று', help: 'தீர்வு' },
  ur: { refund: 'رقم واپسی', replacement: 'تبدیلی', both: 'رقم واپسی یا تبدیلی', help: 'حل' },
}

const PRODUCT_WORD: Pack<string> = { en: 'product', hi: 'उत्पाद', mr: 'उत्पादन', ta: 'பொருள்', ur: 'پروڈکٹ' }
const SELLER_WORD: Pack<string> = { en: 'the seller', hi: 'विक्रेता', mr: 'विक्रेता', ta: 'விற்பவர்', ur: 'فروشنر' }

function fill(template: string, facts: FactRecord, lang: LangCode): string {
  const item = facts.item || PRODUCT_WORD[lang]!
  const seller = facts.seller || SELLER_WORD[lang]!
  const amount = facts.amount || '[amount]'
  // the user's SIGNED wording wins over the normalized phrase: when they
  // corrected the issue/ask row in the fact gate, that exact text flows
  // verifiably into the finding and every draft
  const issue = facts.issueRaw?.trim() || ISSUE_PHRASE[lang]?.[facts.issue || 'damaged'] || ISSUE_PHRASE.en.damaged!
  const ask = facts.askRaw?.trim() || ASK_PHRASE[lang]?.[facts.ask || 'refund'] || ASK_PHRASE.en.refund!
  return template
    .replaceAll('{item}', item)
    .replaceAll('{seller}', seller)
    .replaceAll('{amount}', amount)
    .replaceAll('{issue}', issue)
    .replaceAll('{ask}', ask)
}

/* ---------- the finding card (with live Regenerate variants) ---------- */

export interface FindingTemplate {
  title: string
  whatHappened: string
  lawSays: string
  means: string
  reasoning: string[]
  variants: { whatHappened: string; means: string }[]
}

const FINDING_TEMPLATES: Pack<FindingTemplate> = {
  en: {
    title: 'Cracked on arrival is a product defect',
    whatHappened: 'Your {item} {issue}. That is a problem with the goods themselves — not with how you used them.',
    lawSays:
      'Goods that arrive damaged or faulty can count as a “defect” under the Consumer Protection Act, 2019. The seller is responsible for the condition of what they sold.',
    means: 'Asking {seller} for {ask} is a normal, reasonable ask — not a favour. Keep the bill, the photos and every chat with customer care.',
    reasoning: [
      'Read your message and attached bill (mock)',
      'Matched the damage you described against the defect-in-goods concept',
      'Checked the boundary: consumer purchase, not business-to-business',
      'Draft ladder ordered by cost and risk, free steps first',
    ],
    variants: [
      {
        whatHappened: 'The {item} {issue} — the damage existed before you used it.',
        means: 'State {ask} plainly and set a written deadline; a short, dated message is easier for {seller} to act on.',
      },
      {
        whatHappened: 'You described a delivery-day problem with the {item} itself.',
        means: 'Your {amount} bill and photos are the whole evidence file — attach both to whatever you send next.',
      },
    ],
  },
  hi: {
    title: 'डिलीवरी पर टूटा उत्पाद = उत्पाद की खराबी',
    whatHappened: 'आपका {item} {issue}. यह सामान की अपनी समस्या है — आपके इस्तेमाल की नहीं।',
    lawSays:
      'जो सामान टूटा-फूटा या खराब आता है, वह उपभोक्ता संरक्षण कानून, 2019 के तहत “खराबी” माना जा सकता है। बेचे गए सामान की हालत की ज़िम्मेदारी विक्रेता की होती है।',
    means: '{seller} से {ask} माँगना सामान्य और उचित अनुरोध है — कोई एहसान नहीं। बिल, फ़ोटो और कस्टमर केयर की हर चैट संभाल कर रखें।',
    reasoning: [
      'आपका संदेश और बिल पढ़ा (नमूना)',
      'आपकी बताई क्षति को “सामान में खराबी” अवधारणा से मिलाया',
      'सीमा जाँची: उपभोक्ता खरीद, व्यापार-व्यापार नहीं',
      'कदम लागत और जोखिम के क्रम में, मुफ़्त पहले',
    ],
    variants: [
      {
        whatHappened: '{item} {issue} — नुक़सान आपके इस्तेमाल से पहले मौजूद था।',
        means: '{ask} साफ़ शब्दों में कहें और लिखित समय-सीमा दें; छोटा, तारीख़ वाला संदेश {seller} के लिए अमल में आसान है।',
      },
      {
        whatHappened: 'आपने डिलीवरी के दिन {item} की समस्या बताई।',
        means: 'आपका {amount} का बिल और फ़ोटो ही पूरा सबूत हैं — आगे जो भी भेजें, दोनों साथ रखें।',
      },
    ],
  },
  mr: {
    title: 'डिलीवरीवर फुटलेली वस्तू = उत्पादनातील दोष',
    whatHappened: 'तुमचे {item} {issue}. ही स्वतः मालाची समस्या आहे — तुमच्या वापराची नाही.',
    lawSays:
      'फुटलेला किंवा खराब आलेला माल “उत्पादनातील दोष” मानता येतो — ग्राहक संरक्षण कायदा, २०१९ अंतर्गत. विकलेल्या मालाच्या स्थितीची जबाबदारी विक्रेत्याची असते.',
    means: '{seller} कडून {ask} मागणे ही सामान्य, वाजवी मागणी आहे — उपकार नाही. बिल, छायाचित्रे आणि ग्राहक सेवेतील प्रत्येक संभाषण जपून ठेवा.',
    reasoning: [
      'तुमचा संदेश व बिल वाचले (नमुना)',
      'तुम्ही सांगितलेले नुकसान “मालातील दोष” संकल्पनेशी जुळवले',
      'व्याप्ती तपासली: ग्राहक खरेदी, व्यवसाय-व्यवसाय नाही',
      'पावले खर्च व धोक्याच्या क्रमाने, मोफत आधी',
    ],
    variants: [
      {
        whatHappened: '{item} {issue} — नुकसान वापराआधीच होते.',
        means: '{ask} स्पष्ट सांगा व लेखी मुदत द्या; छोटा, दिनांकित संदेश {seller} साठी अंमलात आणण्यास सोपा असतो.',
      },
      {
        whatHappened: 'तुम्ही डिलीवरीच्या दिवशी {item} ची समस्या सांगितली.',
        means: 'तुमचे {amount} चे बिल व छायाचित्रेच पूर्ण पुरावे आहेत — पुढे काहीही पाठवताना दोन्ही जोडा.',
      },
    ],
  },
  ta: {
    title: 'வந்ததும் உடைந்த பொருள் = பொருளில் குறை',
    whatHappened: 'உங்கள் {item} {issue}. இது பொருளின் சொந்தப் பிரச்சனை — நீங்கள் பயன்படுத்தியதால் அல்ல.',
    lawSays:
      'சேதமாகவோ குறையாகவோ வரும் பொருட்கள் நுகர்வோர் பாதுகாப்புச் சட்டம், 2019-இன் கீழ் “குறை” ஆகக் கருதப்படலாம். விற்ற பொருளின் நிலைக்கு விற்பவரே பொறுப்பு.',
    means: '{seller}-ிடம் {ask} கேட்பது இயல்பான, நியாயமான கோரிக்கை — தயவு அல்ல. பில், புகைப்படங்கள், கஸ்டமர் கேர் உரையாடல்கள் அனைத்தையும் பாதுகாத்து வையுங்கள்.',
    reasoning: [
      'உங்கள் செய்தியையும் பில்லையும் படித்தேன் (மாதிரி)',
      'நீங்கள் சொன்ன சேதத்தை “பொருளில் குறை” கருத்தோடு ஒப்பிட்டேன்',
      'எல்லை சரிபார்த்தேன்: நுகர்வோர் வாங்கல், வணிக-வணிகம் அல்ல',
      'படிகள் செலவு-ஆபத்து வரிசையில், இலவசம் முதலில்',
    ],
    variants: [
      {
        whatHappened: '{item} {issue} — நீங்கள் பயன்படுத்துவதற்கு முன்பே சேதம் இருந்தது.',
        means: '{ask} தெளிவாகக் கேளுங்கள், எழுத்துப்பூர்வ காலக்கெடு கொடுங்கள்; சிறிய, தேதியிட்ட செய்தி {seller} செயல்பட எளிது.',
      },
      {
        whatHappened: 'டெலிவரி நாளில் {item}-இல் பிரச்சனை இருந்ததாகச் சொன்னீர்கள்.',
        means: 'உங்கள் {amount} பில்லும் புகைப்படங்களுமே முழு ஆதாரம் — அடுத்து எதை அனுப்பினாலும் இரண்டையும் இணையுங்கள்.',
      },
    ],
  },
  ur: {
    title: 'ڈیلیوری پر ٹوٹی چیز = مصنوعات کا نقص',
    whatHappened: 'آپ کی {item} {issue}. یہ خود چیز کا مسئلہ ہے — آپ کے استعمال کا نہیں۔',
    lawSays:
      'ٹوٹی پھوٹی یا خراب حالت میں آنے والی چیزیں صارف تحفظ قانون، 2019 کے تحت “نقص” شمار ہو سکتی ہیں۔ بکی ہوئی چیز کی حالت کا ذمہ دار فروشنر ہوتا ہے۔',
    means: '{seller} سے {ask} مانگنا ایک عام اور معقول مطالبہ ہے — کوئی احسان نہیں۔ بل، تصویریں اور کسٹمر کیئر کی ہر گفتگو محفوظ رکھیں۔',
    reasoning: [
      'آپ کا پیغام اور بل پڑھا (نمونہ)',
      'آپ کی بتائی خرابی کو “چیز میں نقص” تصور سے ملایا',
      'حد چیک کی: صارف خریداری، کاروبار سے کاروبار نہیں',
      'قدم لاگت اور خطرے کی ترتیب میں، مفت پہلے',
    ],
    variants: [
      {
        whatHappened: '{item} {issue} — نقص استعمال سے پہلے موجود تھا۔',
        means: '{ask} صاف الفاظ میں کہیں اور تحریری مدت دیں؛ مختصر، تاریخ والا پیغام {seller} کے لیے عمل میں آسان ہے۔',
      },
      {
        whatHappened: 'آپ نے ڈیلیوری کے دن {item} کا مسئلہ بتایا۔',
        means: 'آپ کا {amount} کا بل اور تصویریں ہی پورا ثبوت ہیں — آگے جو بھیجیں، دونوں ساتھ رکھیں۔',
      },
    ],
  },
}

export interface FindingBundle {
  title: string
  whatHappened: string
  lawSays: string
  means: string
  reasoningSteps: string[]
  variants: { whatHappened: string; means: string }[]
}

export function buildFindingFor(facts: FactRecord, lang: LangCode): FindingBundle {
  const t = FINDING_TEMPLATES[lang] ?? FINDING_TEMPLATES.en!
  return {
    title: fill(t.title, facts, lang),
    whatHappened: fill(t.whatHappened, facts, lang),
    lawSays: t.lawSays,
    means: fill(t.means, facts, lang),
    reasoningSteps: t.reasoning,
    variants: t.variants.map((v) => ({ whatHappened: fill(v.whatHappened, facts, lang), means: fill(v.means, facts, lang) })),
  }
}

/* ---------- WhatsApp drafts (2 variants, localized) ---------- */

export interface DraftBundle {
  drafts: string[]
}

const DRAFT_TEMPLATES: Pack<{ formal: string; short: string }> = {
  en: {
    formal: `Hello {seller} support,\n\nOrder [order ID] — {item} ({amount}).\n\nThe item {issue}. I have photos and the bill. Customer care refused {ask}.\n\nI am asking for {ask} within 7 days. If that is not possible, please tell me in writing so I can take this forward through the consumer complaint channels.\n\nThank you,\n[Your name]`,
    short: `Hello {seller} team,\n\nMy {item} (order [order ID], {amount}) {issue}. Customer care refused {ask}.\n\nI am requesting {ask} within 7 days. Bill and photos are ready. Please respond in writing — that will help both of us if this goes to the consumer helpline.\n\nRegards,\n[Your name]`,
  },
  hi: {
    formal: `नमस्ते {seller} सपोर्ट,\n\nऑर्डर [ऑर्डर नं.] — {item} ({amount}).\n\nसामान {issue}। मेरे पास फ़ोटो और बिल हैं। कस्टमर केयर ने {ask} से मना कर दिया।\n\nमैं 7 दिनों के भीतर {ask} माँग रहा/रही हूँ। अगर यह संभव नहीं है, तो कृपया लिखित में बताएँ ताकि मैं उपभोक्ता शिकायत मार्गों से आगे बढ़ सकूँ।\n\nधन्यवाद,\n[आपका नाम]`,
    short: `नमस्ते {seller} टीम,\n\nमेरा {item} (ऑर्डर [ऑर्डर नं.], {amount}) {issue}। कस्टमर केयर ने {ask} से मना किया।\n\nमैं 7 दिनों में {ask} का अनुरोध करता/करती हूँ। बिल और फ़ोटो तैयार हैं। कृपया लिखित जवाब दें — इससे उपभोक्ता हेल्पलाइन जाने पर दोनों को मदद मिलेगी।\n\nसादर,\n[आपका नाम]`,
  },
  mr: {
    formal: `नमस्कार {seller} सपोर्ट,\n\nऑर्डर [ऑर्डर क्र.] — {item} ({amount}).\n\nमाल {issue}. माझ्याकडे छायाचित्रे व बिल आहे. ग्राहक सेवेने {ask} नाकारले.\n\nमी 7 दिवसांत {ask} मागत आहे. शक्य नसल्यास कृपया लेखी कळवा, म्हणजे मी ग्राहक तक्रार मार्गानी पुढे जाऊ शकेन.\n\nधन्यवाद,\n[तुमचे नाव]`,
    short: `नमस्कार {seller} टीम,\n\nमाझे {item} (ऑर्डर [ऑर्डर क्र.], {amount}) {issue}. ग्राहक सेवेने {ask} नाकारले.\n\nमी 7 दिवसांत {ask} विचारत आहे. बिल व छायाचित्रे तयार आहेत. कृपया लेखी उत्तर द्या — ग्राहक हेल्पलाइनवर जावे लागल्यास दोघांनाही उपयोगी पडेल.\n\nआदी,\n[तुमचे नाव]`,
  },
  ta: {
    formal: `வணக்கம் {seller} ஆதரவு,\n\nஆர்டர் [ஆர்டர் எண்] — {item} ({amount}).\n\nபொருள் {issue}. என்னிடம் புகைப்படங்களும் பில்லும் உள்ளன. கஸ்டமர் கேர் {ask} மறுத்தது.\n\n7 நாட்களுக்குள் {ask} கேட்கிறேன். சாத்தியமில்லை என்றால் எழுத்துப்பூர்வமாகத் தெரிவிக்கவும் — நுகர்வோர் புகார் வழிகளில் முன்னெடுக்க முடியும்.\n\nநன்றி,\n[உங்கள் பெயர்]`,
    short: `வணக்கம் {seller} குழு,\n\nஎன் {item} (ஆர்டர் [ஆர்டர் எண்], {amount}) {issue}. கஸ்டமர் கேர் {ask} மறுத்தது.\n\n7 நாட்களுக்குள் {ask} கோருகிறேன். பில், புகைப்படங்கள் தயார். எழுத்துப்பூர்வமாகப் பதிலளிக்கவும் — நுகர்வோர் உதவி எண்ணுக்குச் சென்றால் இருதரப்புக்கும் பயன்.\n\nவணக்கம்,\n[உங்கள் பெயர்]`,
  },
  ur: {
    formal: `ہیلو {seller} سپورٹ،\n\nآرڈر [آرڈر نمبر] — {item} ({amount}).\n\nچیز {issue}۔ میرے پاس تصویریں اور بل موجود ہیں۔ کسٹمر کیئر نے {ask} سے انکار کر دیا۔\n\nمیں 7 دنوں کے اندر {ask} مانگ رہا/رہی ہوں۔ اگر ممکن نہیں تو براہِ کرم تحریر میں بتائیں تاکہ میں صارف شکایت کے راستوں سے آگے بڑھ سکوں۔\n\nشکریہ،\n[آپ کا نام]`,
    short: `ہیلو {seller} ٹیم،\n\nمیری {item} (آرڈر [آرڈر نمبر]، {amount}) {issue}۔ کسٹمر کیئر نے {ask} سے انکار کیا۔\n\nمیں 7 دنوں میں {ask} کی درخواست کرتا/کرتی ہوں۔ بل اور تصویریں تیار ہیں۔ براہِ کرم تحریری جواب دیں — صارف ہیلپ لائن جانے پر دونوں کے کام آئے گا۔\n\nمحبت،\n[آپ کا نام]`,
  },
}

export function buildDraftsFor(facts: FactRecord, lang: LangCode): DraftBundle {
  const t = DRAFT_TEMPLATES[lang] ?? DRAFT_TEMPLATES.en!
  return { drafts: [fill(t.formal, facts, lang), fill(t.short, facts, lang)] }
}

/* ---------- the demand notice (paper register, localized fields) ---------- */

export interface NoticeBundle {
  fields: { key: string; label: string; value: string }[]
  body: string
  labels: { to: string; from: string; date: string; subject: string; body: string }
}

const NOTICE_PACKS: Pack<{
  labels: { to: string; from: string; date: string; subject: string; body: string }
  subject: string
  body: string
}> = {
  en: {
    labels: { to: 'To', from: 'From', date: 'Date', subject: 'Subject', body: 'Body' },
    subject: 'Demand for {ask-lower} — defective {item}, order [order ID]',
    body: `I purchased a {item} ({amount}) from {seller}, delivered on [delivery date]. The item {issue}. My request for {ask} was refused. I demand {ask} within 15 days of this notice, failing which I intend to seek remedy through the consumer dispute channels. — [Your name]`,
  },
  hi: {
    labels: { to: 'सेवा में', from: 'प्रेषक', date: 'दिनांक', subject: 'विषय', body: 'मुख्य अंश' },
    subject: '{ask-lower} की माँग — खराब {item}, ऑर्डर [ऑर्डर नं.]',
    body: `मैंने {seller} से {item} ({amount}) खरीदा था, डिलीवरी [डिलीवरी तारीख़] को हुई। सामान {issue}। मेरी {ask} की माँग मना कर दी गई। मैं इस पत्र के 15 दिनों के भीतर {ask} की माँग करता/करती हूँ, वरना मैं उपभोक्ता विवाद मार्गों से उपाय चाहूँगा/चाहूँगी। — [आपका नाम]`,
  },
  mr: {
    labels: { to: 'प्रति', from: 'पाठवणार', date: 'दिनांक', subject: 'विषय', body: 'मुख्य भाग' },
    subject: '{ask-lower} याची मागणी — खराब {item}, ऑर्डर [ऑर्डर क्र.]',
    body: `मी {seller} कडून {item} ({amount}) खरेदी केले, डिलिव्हरी [डिलिव्हरी दिनांक] रोजी झाली. माल {issue}. माझी {ask} याची मागणी नाकारली गई. मी या नोटीसच्या 15 दिवसांत {ask} मागितो, अन्यथा ग्राहक वाद मार्गांनी उपाय शोधेन. — [तुमचे नाव]`,
  },
  ta: {
    labels: { to: 'பிரதி:', from: 'அனுப்புபவர்', date: 'தேதி', subject: 'பொருள்', body: 'உடல் உரை' },
    subject: '{ask-lower} கோரிக்கை — குறையுள்ள {item}, ஆர்டர் [ஆர்டர் எண்]',
    body: `நான் {seller}-ிடம் {item} ({amount}) வாங்கினேன், [டெலிவரி தேதி] அன்று வந்தது. பொருள் {issue}. என் {ask} கோரிக்கை மறுக்கப்பட்டது. இந்த அறிவிப்பின் 15 நாட்களுக்குள் {ask} கோருகிறேன், இல்லையெனில் நுகர்வோர் தகராறு வழிகளில் தீர்வு தேடுவேன். — [உங்கள் பெயர்]`,
  },
  ur: {
    labels: { to: 'بعہد', from: 'بھیجنے والا', date: 'تاریخ', subject: 'موضوع', body: 'متن' },
    subject: '{ask-lower} کا مطالبہ — خراب {item}، آرڈر [آرڈر نمبر]',
    body: `میں نے {seller} سے {item} ({amount}) خریدا تھا، ڈیلیوری [ڈیلیوری تاریخ] کو ہوئی۔ چیز {issue}۔ میری {ask} کی درخواست مسترد کر دی گئی۔ میں اس نوٹس کے 15 دنوں کے اندر {ask} کا مطالبہ کرتا/کرتی ہوں، ورنہ میں صارف تنازع کے راستوں سے حل تلاش کروں گا/گی۔ — [آپ کا نام]`,
  },
}

export function buildNoticeFor(facts: FactRecord, lang: LangCode): NoticeBundle {
  const p = NOTICE_PACKS[lang] ?? NOTICE_PACKS.en!
  const askPhrase = (ASK_PHRASE[lang] ?? ASK_PHRASE.en!)[facts.ask || 'refund']!
  const withLower = (s: string) => fill(s, facts, lang).replaceAll('{ask-lower}', askPhrase)
  return {
    labels: p.labels,
    fields: [
      { key: 'to', label: p.labels.to, value: `${facts.seller || SELLER_WORD[lang]!}, Registered Office` },
      { key: 'from', label: p.labels.from, value: '[…]' },
      { key: 'date', label: p.labels.date, value: '[…]' },
      { key: 'subject', label: p.labels.subject, value: withLower(p.subject) },
    ],
    body: withLower(p.body),
  }
}

/* ---------- notice next steps (explain-only, localized) ---------- */

export const NOTICE_NEXT_STEPS_L: Pack<string[]> = {
  en: [
    'Check this against your paper notice, line by line',
    'If the amounts match, note the deadline in your calendar',
    'If you want to dispute it, a human helper should guide you',
  ],
  hi: [
    'इसे अपने काग़ज़ी नोटिस से पंक्ति-दर-पंक्ति मिलाएँ',
    'अगर रकमें मिलती हैं, तो समय-सीमा अपने कैलेंडर में लिख लें',
    'अगर आप विवाद करना चाहें, तो कोई मानव सहायक मार्ग दिखाए',
  ],
  mr: [
    'हे तुमच्या कागदी जाहीरनाम्याशी ओळीनुसार तपासा',
    'रक्कम जुळल्यास मुदत तुमच्या कॅलेंडरवर नोंदवा',
    'वाद करायचा असल्यास मानवी मदतनीसने मार्ग दाखवावा',
  ],
  ta: [
    'இதை உங்கள் காகித அறிவிப்புடன் வரிவாரியாக ஒப்பிடுங்கள்',
    'தொகைகள் பொருந்தினால் காலக்கெடுவை நாட்காட்டியில் எழுதிக்கொள்ளுங்கள்',
    'தகராறு செய்ய விரும்பினால் ஒரு மனித உதவியாளர் வழிகாட்டட்டும்',
  ],
  ur: [
    'اسے اپنے کاغذی نوٹس سے سطر بہ سطر ملاکریں',
    'اگر رقوم مطابق ہیں تو مدت اپنے کیلنڈر پر لکھ لیں',
    'اگر تنازع چاہتے ہیں تو کوئی انسانی مددگار رہنمائی کرے',
  ],
}

/* ---------- post-ladder follow-up answers (turn-aware, Law #3 safe) ---------- */

export const FOLLOW_UPS: Pack<{ outcome: string; escalate: string; general: string; stopped: string }> = {
  en: {
    outcome:
      'I cannot promise an outcome — no one honestly can. What I can stand behind is the process: the steps above are ordered so the cheapest, safest one comes first. If the seller does not reply in writing by the deadline in your draft, Step 2 (the free 1915 helpline) is the next move. You can also correct any fact above at any time.',
    escalate:
      'If they ignore your message, do not start over — move up the ladder: call the free 1915 helpline with the prep list, and keep every screenshot. Your facts and drafts above stay ready.',
    general:
      'We are still on the same matter — the ladder above is the current plan. To change a fact, edit it in the fact card above and confirm again; for a different matter, start a new conversation.',
    stopped:
      'I have paused this matter for a human helper — your handover packet is above, and the full safety guide has the free legal-aid lookup. If this is actually a consumer purchase, tap “Tell me more” and I will continue carefully.',
  },
  hi: {
    outcome:
      'मैं नतीजे का वादा नहीं कर सकता — कोई ईमानदारी से नहीं कर सकता। जिस पर मैं खरा उतरता हूँ वह प्रक्रिया है: ऊपर के कदम इस तरह क्रम में हैं कि सबसे सस्ता, सबसे सुरक्षित पहले आता है। अगर विक्रेता आपके ड्राफ़्ट की समय-सीमा में लिखित जवाब नहीं देता, तो अगला कदम चरण 2 (मुफ़्त 1915 हेल्पलाइन) है। आप ऊपर कोई भी तथ्य कभी भी सुधार सकते हैं।',
    escalate:
      'अगर वे आपके संदेश को नज़रअंदाज़ करें, तो फिर से शुरू न करें — सीढ़ी ऊपर चढ़ें: तैयार सूची के साथ मुफ़्त 1915 हेल्पलाइन पर कॉल करें और हर स्क्रीनशॉट संभाल कर रखें। आपके तथ्य और ड्राफ़्ट ऊपर तैयार हैं।',
    general:
      'हम उसी मामले पर हैं — ऊपर की सीढ़ी ही मौजूदा योजना है। कोई तथ्य बदलना हो तो ऊपर तथ्य-कार्ड में सुधारें और दोबारा पक्का करें; दूसरे मामले के लिए नई बातचीत शुरू करें।',
    stopped:
      'मैंने यह मामला किसी मानव सहायक के लिए रोक दिया है — आपका हैंडओवर पैकेट ऊपर है और पूरी सुरक्षा गाइड में मुफ़्त कानूनी सहायता की खोज है। अगर यह वास्तव में उपभोक्ता खरीद है, तो “और बताइए” दबाएँ — मैं सावधानी से आगे बढ़ूँगा।',
  },
  mr: {
    outcome:
      'मी निकालाचे वचन देऊ शकत नाही — कोणीही प्रामाणिकपणे देऊ शकत नाही. मी ज्यावर ठाम आहे ती प्रक्रिया: वरील पावले अशा क्रमाने आहेत की सर्वात स्वस्त, सर्वात सुरक्षित आधी येते. विक्रेता तुमच्या मसुद्याच्या मुदतीत लेखी उत्तर न देता आल्यास पुढचे पाऊल पायरी 2 (मोफत 1915 हेल्पलाइन) आहे. वरील एखादी वस्तुस्थिती तुम्ही कधीही दुरुस्त करू शकता.',
    escalate:
      'त्यांनी तुमचा संदेश दुर्लक्षित केल्यास पुन्हा सुरुवात करू नका — जणू वर चढा: तयार यादीसह मोफत 1915 हेल्पलाइनवर कॉल करा आणि प्रत्येक स्क्रीनशॉट जपून ठेवा. तुमच्या वस्तुस्थिती व मसुदे वर तयार आहेत.',
    general:
      'आपण त्याच बाबीवर आहोत — वरची जणूच मोठी योजना आहे. वस्तुस्थिती बदलायची असल्यास वरील तथ्य-कार्डात दुरुस्त करा व पुन्हा निश्चित करा; दुसऱ्या बाबीसाठी नवी संभाषण सुरू करा.',
    stopped:
      'मी ही बाब मानवी मदतनीसासाठी थांबवली आहे — तुमचे हँडओव्हर पॅकेट वर आहे आणि संपूर्ण सुरक्षा मार्गदर्शकात मोफत कायदेशीर मदतीचा शोध आहे. ही खरी ग्राहक खरेदी असल्यास “आणखी सांगा” दाबा — मी काळजी घेऊन पुढे जाईन.',
  },
  ta: {
    outcome:
      'விளைவை உறுதி சொல்ல முடியாது — நேர்மையாக யாராலும் முடியாது. நான் உறுதி சொல்லக்கூடியது செயல்முறை: மேலே உள்ள படிகள் மலிவான, பாதுகாப்பானது முதலில் வரும்படி வரிசையில் உள்ளன. உங்கள் வரைவின் காலக்கெடுவுக்குள் எழுத்துப்பூர்வ பதில் வரவில்லையென்றால் அடுத்த படி படி 2 (இலவச 1915 உதவி எண்). மேலே உள்ள எந்த உண்மையையும் எப்போது வேண்டுமானாலும் திருத்தலாம்.',
    escalate:
      'உங்கள் செய்தியை புறக்கணித்தால் திரும்பத் தொடங்காதீர்கள் — படிக்கட்டில் மேலே ஏருங்கள்: தயார் பட்டியலுடன் இலவச 1915 உதவி எண்ணை அழையுங்கள், ஒவ்வொரு ஸ்கிரீன்ஷாட்டையும் பாதுகாத்து வையுங்கள். உங்கள் உண்மைகளும் வரைவுகளும் மேலே தயாராக உள்ளன.',
    general:
      'நாம் இன்னும் அதே வழக்கில் தான் இருக்கிறோம் — மேலே உள்ள படிக்கட்டே தற்போதைய திட்டம். ஒரு உண்மையை மாற்ற வேண்டுமானால் மேலே உண்மை அட்டையில் திருத்தி மீண்டும் உறுதிப்படுத்துங்கள்; வேறு வழக்குக்கு புதிய உரையாடலைத் தொடங்குங்கள்.',
    stopped:
      'இந்த வழக்கை ஒரு மனித உதவியாளருக்காக நிறுத்திவிட்டேன் — உங்கள் கையளிப்புத் தொகுப்பு மேலே உள்ளது, முழு பாதுகாப்பு வழிகாட்டியில் இலவச சட்ட உதவி தேடல் உள்ளது. இது உண்மையில் நுகர்வோர் வாங்கல் என்றால் “இன்னும் சொல்லுங்கள்” அழுத்துங்கள் — கவனமாகத் தொடர்வேன்.',
  },
  ur: {
    outcome:
      'میں نتیجے کا وعدہ نہیں کر سکتا — کوئی ایمانداری سے نہیں کر سکتا۔ جس پر میں کھرا اترتا ہوں وہ عمل ہے: اوپر کے قدم اس ترتیب میں ہیں کہ سب سے سستا، سب سے محفوظ پہلے آتا ہے۔ اگر فروشنر آپ کے مسودے کی مدت میں تحریری جواب نہ دے تو اگلا قدم مرحلہ 2 (مفت 1915 ہیلپ لائن) ہے۔ آپ اوپر کوئی بھی حقیقت کبھی بھی درست کر سکتے ہیں۔',
    escalate:
      'اگر وہ آپ کا پیغام نظرانداز کریں تو دوبارہ شروع نہ کریں — سیڑھی اوپر چڑھیں: تیار فہرست کے ساتھ مفت 1915 ہیلپ لائن پر کال کریں اور ہر اسکرین شاٹ محفوظ رکھیں۔ آپ کے حقائق اور مسودے اوپر موجود ہیں۔',
    general:
      'ہم اسی معاملے پر ہیں — اوپر کی سیڑھی ہی موجودہ منصوبہ ہے۔ کوئی حقیقت بدلنی ہو تو اوپر حقیقت کارڈ میں درست کریں اور دوبارہ تصدیق کریں؛ دوسرے معاملے کے لیے نئی گفتگو شروع کریں۔',
    stopped:
      'میں نے یہ معاملہ کسی انسانی مددگار کے لیے روک دیا ہے — آپ کا ہینڈ اوور پیکٹ اوپر ہے اور مکمل حفاظتی گائیڈ میں مفت قانونی امداد کی تلاش ہے۔ اگر یہ واقعی صارف خریداری ہے تو “اور بتائیں” دبائیں — میں احتیاط سے آگے بڑھوں گا۔',
  },
}

/* ---------- the two caution faces (downgrade law) ---------- */

export const CAUTION_UNCLEAR: Pack<{ title: string; body: string }> = {
  en: {
    title: 'One more detail will make this safe',
    body: 'I am not sure I understood the matter fully — and guessing would be worse than asking. Choose what this is closest to; I will stay careful either way.',
  },
  hi: {
    title: 'एक और जानकारी सब स्पष्ट कर देगी',
    body: 'मुझे पूरी बात समझ नहीं आई — और अंदाज़ा लगाना पूछने से बदतर है। चुनें कि यह किससे सबसे मिलता है; दोनों हालत में मैं सावधान रहूँगा।',
  },
  mr: {
    title: 'एक अजूनी माहिती सर्व स्पष्ट करेल',
    body: 'मला संपूर्ण गोष्ट समजली नाही — आणि अंदाज घेणे हे विचारण्यापेक्षा वाईट. याशी सर्वात जुळणारे निवडा; दोन्ही परिस्थितीत मी सावध राहीन.',
  },
  ta: {
    title: 'ஒரு விவரம் கூடுதலாக இருந்தால் பாதுகாப்பு',
    body: 'முழு விஷயமும் எனக்குப் புரியவில்லை — ஊகிப்பது கேட்பதைவிட மோசம். இதனுடன் அதிகம் ஒத்ததைத் தேர்ந்தெடுங்கள்; இரு நிலையிலும் கவனமாக இருப்பேன்.',
  },
  ur: {
    title: 'ایک اور تفصیل سب واضح کر دے گی',
    body: 'مجھے پوری بات سمجھ نہیں آئی — اور اندازہ لگانا پوچھنے سے بدتر ہے۔ چنیں کہ یہ کس سے سب سے ملتا ہے؛ دونوں صورتوں میں میں محتاط رہوں گا۔',
  },
}

export const CAUTION_REASONING: Pack<{ timeBarred: string[]; unclear: string[] }> = {
  en: {
    timeBarred: [
      'Read your message and the dates you gave',
      'Checked the boundary: still a consumer matter',
      'Time-limit rule flagged as needs-verification [VERIFY]',
      'Kept the free steps; paused the formal notice',
    ],
    unclear: [
      'Read your message more than once',
      'Could not match it to a matter type I know',
      'Chose the careful route instead of guessing',
      'Kept the free steps available either way',
    ],
  },
  hi: {
    timeBarred: [
      'आपका संदेश और दी गई तारीख़ें पढ़ीं',
      'सीमा जाँची: अभी भी उपभोक्ता मामला',
      'समय-सीमा नियम को जाँच-बाक़ी चिह्नित किया [VERIFY]',
      'मुफ़्त कदम रखे; औपचारिक पत्र रोका',
    ],
    unclear: [
      'आपका संदेश एक से अधिक बार पढ़ा',
      'इसे किसी जाने-पहचाने मामले से नहीं मिला पाया',
      'अंदाज़े की जगह सावधान रास्ता चुना',
      'दोनों हालत में मुफ़्त कदम उपलब्ध रखे',
    ],
  },
  mr: {
    timeBarred: [
      'तुमचा संदेश व दिलेल्या तारखा वाचल्या',
      'व्याप्ती तपासली: अजून ग्राहक बाब',
      'वेळेच्या मर्यादेचा नियम तपासणी-बाकी खूणला [VERIFY]',
      'मोफत पावले ठेवली; औपचारिक पत्र थांबवले',
    ],
    unclear: [
      'तुमचा संदेश अनेकदा वाचला',
      'ओळखत्या बाबीशी जुळवू शकलो नाही',
      'अंदाजाऐवजी सावध मार्ग निवडला',
      'दोन्ही परिस्थितीत मोफत पावले उपलब्ध ठेवली',
    ],
  },
  ta: {
    timeBarred: [
      'உங்கள் செய்தியையும் தேதிகளையும் படித்தேன்',
      'எல்லை சரிபார்த்தேன்: இன்னும் நுகர்வோர் வழக்கு',
      'காலக்கெடு விதியை சரிபார்க்க-படாததாகக் குறித்தேன் [VERIFY]',
      'இலவச படிகளை வைத்தேன்; முறையான அறிவிப்பை நிறுத்தினேன்',
    ],
    unclear: [
      'உங்கள் செய்தியை பலமுறை படித்தேன்',
      'எனக்குத் தெரிந்த வழக்கு வகையுடன் பொருத்த முடியவில்லை',
      'ஊகிப்பதற்கு பதிலாக கவனமான வழியைத் தேர்ந்தேன்',
      'இரு நிலையிலும் இலவச படிகளை கிடைக்க வைத்தேன்',
    ],
  },
  ur: {
    timeBarred: [
      'آپ کا پیغام اور دی گئی تاریخیں پڑھیں',
      'حد چیک کی: اب بھی صارف معاملہ',
      'وقت کی حد کے قانون کو جانچ-باقی نشان زد کیا [VERIFY]',
      'مفت قدم رکھے؛ رسمی نوٹس روک دیا',
    ],
    unclear: [
      'آپ کا پیغام ایک سے زیادہ بار پڑھا',
      'کسی معلوم معاملے سے نہیں ملایا جا سکا',
      'اندازے کے بجائے محتاط راستہ چنا',
      'دونوں صورتوں میں مفت قدم دستیاب رکھے',
    ],
  },
}

/* ---------- notice interpreter field labels (deep-audit Lens 2B) ---------- */

export const NOTICE_FIELD_LABELS: Pack<Record<'amount' | 'period' | 'deadline' | 'penalty' | 'objections', string>> = {
  en: { amount: 'Amount demanded', period: 'Assessment period', deadline: 'Payment deadline', penalty: 'Penalty mentioned', objections: 'Objection channel' },
  hi: { amount: 'माँगी गई राशि', period: 'मूल्यांकन अवधि', deadline: 'भुगतान की अंतिम तारीख़', penalty: 'उल्लिखित जुर्माना', objections: 'आपत्ति का मार्ग' },
  mr: { amount: 'मागणी केलेली रक्कम', period: 'मूल्यांकन कालावधी', deadline: 'पेमेंट अंतिम दिवस', penalty: 'नमूद दंड', objections: 'दाद मागण्याचा मार्ग' },
  ta: { amount: 'கோரப்பட்ட தொகை', period: 'மதிப்பீட்டு காலம்', deadline: 'கட்டண காலக்கெடு', penalty: 'குறிப்பிட்ட அபராதம்', objections: 'ஆட்சேபனை வழி' },
  ur: { amount: 'مانگی گئی رقم', period: 'تقین کی مدت', deadline: 'ادائیگی کی آخری تاریخ', penalty: 'ذکر شدہ جرمانہ', objections: 'اعتراض کا راستہ' },
}

/* ---------- the informal-seller caution face (downgrade law, third face) ---------- */

export const INFORMAL_CAUTION: Pack<{ title: string; body: string; steps: string[] }> = {
  en: {
    title: 'This one needs a different rail',
    body: 'No invoice and no platform order — a personal UPI transfer to a seller who has now gone quiet is a different dispute path than a marketplace refund. The payment-reversal request and the cyber complaint process handle this, not the standard consumer ladder. Keep the payment screenshot and the whole chat; a human helper should check this boundary with you first.',
    steps: [
      'Read your message and the payment trail',
      'Checked the purchase: personal transfer, no invoice, no platform',
      'Routed away from the standard consumer ladder [VERIFY]',
      'Kept the evidence steps; a human checks the boundary first',
    ],
  },
  hi: {
    title: 'इसके लिए एक अलग रास्ता चाहिए',
    body: 'कोई बिल नहीं, कोई प्लेटफ़ॉर्म ऑर्डर नहीं — जो विक्रेता अब ग़ायब है, उसे किया गया पर्सनल UPI भुगतान मार्केटप्लेस रिफंड से अलग विवाद-मार्ग है। यह पेमेंट-रिवर्सल अनुरोध और साइबर शिकायत प्रक्रिया संभालती है, मानक उपभोक्ता सीढ़ी नहीं। पेमेंट स्क्रीनशॉट और पूरी चैट संभाल कर रखें; पहले कोई मानव सहायक यह सीमा आपके साथ जाँचे।',
    steps: [
      'आपका संदेश और भुगतान-पहल पढ़ी',
      'खरीद जाँची: पर्सनल ट्रांसफ़र, बिल नहीं, प्लेटफ़ॉर्म नहीं',
      'मानक उपभोक्ता सीढ़ी से हटाया [VERIFY]',
      'सबूत के कदम रखे; सीमा पहले मानव जाँचे',
    ],
  },
  mr: {
    title: 'यासाठी वेगळाच मार्ग लागतो',
    body: 'बिल नाही, प्लॅटफॉर्म ऑर्डर नाही — आता गायब झालेल्या विक्रेत्याला केलेले खाजगी UPI हस्तांतरण हा मार्केटप्लेस परताव्यापेक्षा वेगळा वाद-मार्ग आहे. हा पेमेंट-रिव्हर्सल विनंती आणि सायबर तक्रार प्रक्रिया सांभाळते, प्रमाणित ग्राहक जणू नाही. पेमेंट स्क्रीनशॉट व संपूर्ण चॅट जपून ठेवा; आधी मानवी मदतनीस ही व्याप्ती तुमच्यासोबत तपासो.',
    steps: [
      'तुमचा संदेश व पेमेंट पाऊलखुणा वाचले',
      'खरेदी तपासली: खाजगी हस्तांतरण, बिल नाही, प्लॅटफॉर्म नाही',
      'प्रमाणित ग्राहक जणूतून वेगळे काढले [VERIFY]',
      'पुराव्याची पावले ठेवली; व्याप्ती आधी माणसाकडून',
    ],
  },
  ta: {
    title: 'இதற்கு வேறு ஒரு பாதை தேவை',
    body: 'பில் இல்லை, தள ஆர்டர் இல்லை — இப்போது மறைந்த விற்பவருக்கு செய்த தனிப்பட்ட UPI பணப்பரிமாற்றம் மார்க்கெட்பிளேஸ் ரீஃபண்டிலிருந்து வேறு சச்சரவு பாதை. இதை பணம்-திரும்ப கோரிக்கையும் சைபர் புகார் செயல்முறையும் கையாளும், வழக்கமான நுகர்வோர் படிகள் அல்ல. பணம் செலுத்திய ஸ்கிரீன்ஷாட், முழு உரையாடலையும் பாதுகாத்து வையுங்கள்; முதலில் ஒரு மனித உதவியாளர் இந்த எல்லையை உங்களுடன் சரிபார்க்கட்டும்.',
    steps: [
      'உங்கள் செய்தியையும் பணப் பாதையையும் படித்தேன்',
      'வாங்கலை சரிபார்த்தேன்: தனிப்பட்ட பரிமாற்றம், பில் இல்லை, தளம் இல்லை',
      'வழக்கமான நுகர்வோர் படிகளிலிருந்து விலக்கினேன் [VERIFY]',
      'ஆதாரப் படிகள் வைத்தேன்; எல்லையை முதலில் மனிதர் பார்ப்பார்',
    ],
  },
  ur: {
    title: 'اس کے لیے ایک مختلف راستہ چاہیے',
    body: 'نہ بل، نہ پلیٹ فارم آرڈر — اب غائب ہو چکے فروشنر کو کیا گیا ذاتی UPI ادائیگی مارکیٹ پلیس ریفنڈ سے الگ تنازع راستہ ہے۔ یہ ادائیگی-واپسی درخواست اور سائبر شکایت کا عمل سنبھالتا ہے، معیاری صارف سیڑھی نہیں۔ ادائیگی کا اسکرین شاٹ اور پوری گفتگو محفوظ رکھیں؛ پہلے کوئی انسانی مددگار یہ حد آپ کے ساتھ جانچے۔',
    steps: [
      'آپ کا پیغام اور ادائیگی کا راستہ پڑھا',
      'خریداری جانچی: ذاتی منتقلی، بل نہیں، پلیٹ فارم نہیں',
      'معیاری صارف سیڑھی سے الگ کیا [VERIFY]',
      'ثبوت کے قدم رکھے؛ حد پہلے انسان جانچے',
    ],
  },
}
