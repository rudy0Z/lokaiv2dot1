import type { LangCode } from './languages'
import type { DomainId, DomainBranch } from './domain-playbooks'

/**
 * Scope classification (Phase 2) — visible, editable, NEVER hidden in prose.
 *
 * DOWNGRADE LAW: wrongly proceeding on a hard-stop matter is worse than
 * wrongly pausing a valid claim. When classification is uncertain, the
 * result is CAUTION — never a silent Proceed. `classifyMatter` encodes this.
 * (2026-10-26 reviewer fix: the old `length > 25 → proceed` shortcut is
 * GONE — uncertain input now lands on Caution as the law demands.)
 */
export type ScopeTier = 'proceed' | 'caution' | 'hard-stop'

type LocalizedWhy = Partial<Record<LangCode, string>>

export interface ScopeRule {
  id: string
  tier: ScopeTier
  label: string
  /** user-facing why, plain language, no blame — localized for the emotional screen */
  whyI18n: LocalizedWhy
  patterns: RegExp[]
}

export const SCOPE_RULES: ScopeRule[] = [
  {
    id: 'criminal-safety',
    tier: 'hard-stop',
    label: 'Criminal matter or safety risk',
    whyI18n: {
      en: 'This kind of matter can seriously affect your position if handled by an automated tool. A person should look at it.',
      hi: 'ऐसे मामले में किसी ऑटोमेटेड टूल की सलाह आपकी स्थिति को गंभीर रूप से नुकसान पहुँचा सकती है। इसे कोई व्यक्ति ही देखे।',
      mr: 'अशा बाबीत स्वयंचलित साधनाचा सल्ला तुमच्या स्थितीस गंभीर हानी पोहोचवू शकतो. ही एखादी व्यक्तीच पाहिल.',
      ta: 'இதுபோன்ற வழக்கில் தானியங்கி கருவியின் ஆலோசனை உங்கள் நிலைக்குத் தீங்கு விளைவிக்கலாம். இதை ஒரு மனிதரே பார்க்க வேண்டும்.',
      ur: 'ایسے معاملے میں خودکار آلے کا مشورہ آپ کی پوزیشن کو سخت نقصان پہنچا سکتا ہے۔ اسے کوئی انسان ہی دیکھے۔',
    },
    patterns: [/\bfir\b/i, /\bpolice\b/i, /\barrest(?:ed)?\b/i, /धमकी/, /पुलिस/, /پولیس/],
  },
  {
    id: 'eviction-tenancy',
    tier: 'hard-stop',
    label: 'Eviction or tenancy dispute',
    whyI18n: {
      en: 'Housing disputes move fast and mistakes can cost you your home. A person should look at it.',
      hi: 'आवास विवाद तेज़ी से आगे बढ़ते हैं और ग़लती आपका घर छिना सकती है। इसे कोई व्यक्ति ही देखे।',
      mr: 'निवास वाद वेगाने पुढे जातात आणि चुकीने तुमचे घर निघून जाऊ शकते. ही एखादी व्यक्तीच पाहिल.',
      ta: 'வீட்டுத் தகராறுகள் விரைவாக நகரும்; தவறு உங்கள் வீட்டையே பறிக்கலாம். இதை ஒரு மனிதரே பார்க்க வேண்டும்.',
      ur: 'رہائشی تنازعات تیزی سے آگے بڑھتے ہیں اور غلطی آپ کا گھر چھین سکتی ہے۔ اسے کوئی انسان ہی دیکھے۔',
    },
    patterns: [
      /evict/i, /tenan(?:t|cy)/i, /landlord/i, /vacate/i,
      /बेदखल/, /खाली कर/, /मकान मालिक/, /اجارہ داری/, /خالی کرو/,
    ],
  },
  {
    id: 'property-dispute',
    tier: 'hard-stop',
    label: 'Property, land or possession dispute',
    whyI18n: {
      en: 'Disputes over property, land or possession can seriously affect your rights. A person should look at it.',
      hi: 'संपत्ति, ज़मीन या कब्ज़े के विवाद आपके अधिकारों पर गंभीर असर डाल सकते हैं। इसे कोई व्यक्ति ही देखे।',
      mr: 'मालमत्ता, जमीन या ताब्यावरील वाद तुमच्या हक्कांवर गंभीर परिणाम करू शकतात. ही एखादी व्यक्तीच पाहिल.',
      ta: 'சொத்து, நிலம் அல்லது உடைமை தகராறுகள் உங்கள் உரிமைகளைப் பாதிக்கலாம். இதை ஒரு மனிதரே பார்க்க வேண்டும்.',
      ur: 'جائیداد، زمین یا قبضے کے تنازعات آپ کے حقوق پر گہرا اثر ڈال سکتے ہیں۔ اسے کوئی انسان ہی دیکھے۔',
    },
    patterns: [
      /property (?:dispute|title|matter|case)/i,
      /land dispute/i,
      /possession dispute/i,
      /संपत्ति विवाद/, /ज़मीन विवाद/, /मालमत्ता वाद/,
      /சொத்துத் தகராறு/,
      /جائیداد کے تنازع/,
    ],
  },
  {
    id: 'commercial-b2b',
    tier: 'hard-stop',
    label: 'Commercial or business dispute',
    whyI18n: {
      en: 'Business-to-business disputes sit outside consumer-protection scope. A person should look at it.',
      hi: 'व्यापार-व्यापार विवाद उपभोक्ता-संरक्षण के दायरे से बाहर होते हैं। इसे कोई व्यक्ति ही देखे।',
      mr: 'व्यवसाय-व्यवसाय वाद ग्राहक-संरक्षणाच्या व्याप्तीबाहेर असतात. ही एखादी व्यक्तीच पाहिल.',
      ta: 'வணிக-வணிகத் தகராறுகள் நுகர்வோர் பாதுகாப்பு வரம்பிற்கு வெளியே உள்ளன. இதை ஒரு மனிதரே பார்க்க வேண்டும்.',
      ur: 'کاروبار سے کاروبار تنازعات صارف تحفظ کے دائرے سے باہر ہوتے ہیں۔ اسے کوئی انسان ہی دیکھے۔',
    },
    patterns: [
      /\bb2b\b/i, /my (?:company|business|shop|firm)/i,
      /business (?:dispute|invoice|contract)/i, /gst/i,
      /मेरी (?:दुकान|कंपनी)/, /व्यापारी विवाद/, /میرا کاروبار/, /کاروباری جھگڑا/,
    ],
  },
  {
    id: 'threat-intimidation',
    tier: 'hard-stop',
    label: 'Threats or intimidation',
    whyI18n: {
      en: 'If you are being threatened, your safety comes first. A person should look at it — and keep every message.',
      hi: 'अगर आपको धमकी मिल रही है, तो आपकी सुरक्षा सबसे पहले। इसे कोई व्यक्ति देखे — और हर संदेश संभाल कर रखें।',
      mr: 'तुम्हाला धमकी मिळत असल्यास तुमची सुरक्षाच सर्वांत आधी. ही एखादी व्यक्ती पाहिल — आणि प्रत्येक संदेश जपून ठेवा.',
      ta: 'உங்களுக்கு மிரட்டல் வருகிறது என்றால் உங்கள் பாதுகாப்பே முதன்மை. இதை ஒரு மனிதர் பார்க்கட்டும் — ஒவ்வொரு செய்தியையும் பாதுகாத்து வையுங்கள்.',
      ur: 'اگر آپ کو دھمکی مل رہی ہے تو آپ کی حفاظت سب سے پہلے ہے۔ اسے کوئی انسان دیکھے — اور ہر پیغام محفوظ رکھیں۔',
    },
    patterns: [/threaten/i, /intimidat/i, /blackmail/i, /हथियार/, /धमकी/],
  },
  {
    id: 'possible-time-barred',
    tier: 'caution',
    label: 'Possible time-barred claim',
    whyI18n: {
      en: 'Time limits may apply. They can sometimes be excused — a helper should check your dates before you act.',
      hi: 'समय-सीमा लागू हो सकती है। कभी-कभी देरी माफ़ हो सकती है — कोई सहायक आपकी तारीख़ें जाँचे।',
      mr: 'वेळेची मर्यादा लागू असू शकते. कधी कधी उशीर माफ होऊ शकतो — एखाद्या मदतनीसाने तारखा तपासाव्यात.',
      ta: 'காலக்கெடு பொருந்தலாம். சில சமயம் தாமதம் மன்னிக்கப்படலாம் — ஒரு உதவியாளர் உங்கள் தேதிகளைச் சரிபார்க்கட்டும்.',
      ur: 'وقت کی حد لاگو ہو سکتی ہے۔ کبھی کبھی تاخیر معاف ہو سکتی ہے — کوئی مددگار آپ کی تاریخیں جانچے۔',
    },
    patterns: [
      /\b(?:3|three|4|four|5|five|ten|10)\s+years?\s+(?:ago|old)\b/i,
      /बहुत पुराना/, /बरसांपूर्वी/, /बहुत वर्षांपूर्वी/, /کئی سال پہلے/,
    ],
  },
  {
    id: 'unclear-facts',
    tier: 'caution',
    label: 'Facts not clear yet',
    whyI18n: {
      en: 'I am not sure I have the full picture. Let us confirm a few facts before choosing a step.',
      hi: 'मुझे पूरी बात समझ नहीं आई। कोई कदम चुनने से पहले कुछ तथ्य पक्के कर लें।',
      mr: 'मला संपूर्ण गोष्ट समजली नाही. काही पाऊल उचलण्यापूर्वी थोड्या वस्तुस्थिती निश्चित करू.',
      ta: 'முழு படமும் எனக்குப் புரியவில்லை. ஒரு படி தேர்வு செய்வதற்கு முன் சில உண்மைகளை உறுதிப்படுத்துவோம்.',
      ur: 'مجھے پوری بات سمجھ نہیں آئی۔ کوئی قدم چننے سے پہلے کچھ حقائق درست کر لیں۔',
    },
    patterns: [/not sure/i, /don'?t know/i, /याद नहीं/, /आठवत नाही/, /یاد نہیں/],
  },
]

export interface ScopeDecision {
  tier: ScopeTier
  ruleId?: string
  label: string
  why: string
  /** matched = a rule fired; uncertain = downgrade law applied */
  certainty: 'matched' | 'uncertain'
  /** the domain playbook this decision belongs to (multi-domain engine) */
  domain?: { id: DomainId; branch: DomainBranch }
}

const CONSUMER_SIGNALS =
  /(refund|replace|defect|crack|broken|broke|bill|receipt|seller|order|delivered|warranty|product|item|money back|उत्पाद|रिफंड|खराब|विक्रेता|वस्तू|परतावा|பொருள்|பணம்|رفنڈ|خراب)/i

/**
 * Hard-stop wins over caution wins over proceed. Uncertain input -> CAUTION
 * (the downgrade law — nothing proceeds silently).
 */
export function classifyMatter(text: string, lang: LangCode = 'en'): ScopeDecision {
  const pick = (r: ScopeRule) => r.whyI18n[lang] ?? r.whyI18n.en ?? ''
  const hit = SCOPE_RULES.find((r) => r.patterns.some((p) => p.test(text)))
  if (hit) {
    return { tier: hit.tier, ruleId: hit.id, label: hit.label, why: pick(hit), certainty: 'matched' }
  }
  if (CONSUMER_SIGNALS.test(text)) {
    return { tier: 'proceed', label: 'Consumer matter', why: '', certainty: 'matched' }
  }
  return {
    tier: 'caution',
    label: 'Not sure what this is yet',
    why:
      lang === 'hi'
        ? 'मुझे अभी पूरी बात समझ नहीं आई। थोड़ा और बताइए, मैं आपको सही रास्ता दिखाऊँगा।'
        : lang === 'mr'
          ? 'मला अजून संपूर्ण समजले नाही. थोडे अजून सांगा, मी योग्य वाटा दाखवीन.'
          : lang === 'ta'
            ? 'இன்னும் முழுமையாகப் புரியவில்லை. இன்னும் கொஞ்சம் சொல்லுங்கள், சரியான வழியைக் காட்டுவேன்.'
            : lang === 'ur'
              ? 'مجھے ابھی مکمل سمجھ نہیں آیا۔ تھوڑا اور بتائیں، میں صحیح راستہ دکھاؤں گا۔'
              : 'I am not sure what this is yet. Tell me a little more and I will route you correctly.',
    certainty: 'uncertain',
  }
}

/** The user's explicit re-entry: "this is actually a consumer matter". */
export function reRouteAsCaution(lang: LangCode = 'en'): ScopeDecision {
  const why: LocalizedWhy = {
    en: 'Thank you. Because you told me this touches another area, I will stay careful: the free steps below are still safe, and a human helper should double-check the boundary.',
    hi: 'धन्यवाद। आपने बताया कि यह दूसरे क्षेत्र को छूता है, इसलिए मैं सावधान रहूँगा: नीचे के मुफ़्त कदम सुरक्षित हैं, और कोई मानव सहायक सीमा दोबारा जाँच लेगा।',
    mr: 'धन्यवाद. तुम्ही सांगितले की हा दुसऱ्या क्षेत्राशी निगडित आहे, म्हणून मी सावध राहीन: खालील मोफत पावले सुरक्षित आहेत, आणि एखाद्या मानवी मदतनीसाने सीमा पुन्हा तपासावी.',
    ta: 'நன்றி. இது மற்றொரு துறையைத் தொடுகிறது என்று சொன்னதால் கவனமாக இருப்பேன்: கீழே உள்ள இலவச படிகள் பாதுகாப்பானவை, ஒரு மனித உதவியாளர் எல்லையை மீண்டும் சரிபார்ப்பார்.',
    ur: 'شکریہ۔ آپ نے بتایا کہ یہ دوسرے شعبے کو چھوتی ہے، اس لیے میں محتاط رہوں گا: نیچے کے مفت قدم محفوظ ہیں، اور کوئی انسانی مددگار حد دوبارہ جانچے گا۔',
  }
  return {
    tier: 'caution',
    label: 'Needs care',
    why: why[lang] ?? why.en ?? '',
    certainty: 'matched',
  }
}
