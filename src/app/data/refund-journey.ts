import type { LangCode } from './languages'

/**
 * Phase 1 scenario content — the HomeKart consumer-refund golden path.
 * Fictional seller (A8). Legal claims point at legal-content.ts ids only.
 * UI-language templates for the conversational beats are localized; card
 * bodies stay English in this build (flagged for native review pass).
 */
export interface ScenarioSeed {
  id: string
  label: string
  description: string
  userMessage: string
  simulateError?: boolean
  forceOffline?: boolean
}

export const SCENARIO_SEEDS: ScenarioSeed[] = [
  {
    id: 'refund-golden',
    label: 'Refund — golden path',
    description: 'Cracked mixer, recent purchase. Reassurance → question → finding → action ladder.',
    userMessage:
      'I bought a mixer grinder for 8,999 rupees from HomeKart. It arrived cracked and customer care refused a refund or replacement.',
  },
  {
    id: 'refund-caution',
    label: 'Refund — caution branch',
    description: 'Same purchase, ~3 years old. Time-limit caution card, not a stop.',
    userMessage:
      'I bought a mixer grinder from HomeKart about 3 years ago. It arrived cracked and they refused a refund. Can I still do something?',
  },
  {
    id: 'stop-eviction',
    label: 'Stop — eviction letter',
    description: 'Hard stop. Landlord eviction notice; protective stop screen with DLSA routing.',
    userMessage:
      'My landlord has sent me an eviction notice and says he will throw my family out next week. What should I do?',
  },
  {
    id: 'stop-threat',
    label: 'Stop — seller threat',
    description: 'Hard stop. Threats and intimidation; safety-first stop screen.',
    userMessage:
      'The seller is threatening me. He says he will send people to my home if I file a consumer complaint.',
  },
  {
    id: 'stop-b2b',
    label: 'Stop — business dispute',
    description: 'Hard stop. B2B / GST-invoice dispute is outside consumer scope.',
    userMessage:
      'My company bought goods from a supplier with a GST invoice and they refuse to replace defective units. It is a business dispute.',
  },
  {
    id: 'error-state',
    label: 'State — simulated error',
    description: 'First assistant beat fails; retry succeeds. Nothing was sent anywhere.',
    userMessage:
      'I bought a mixer grinder for 8,999 rupees from HomeKart. It arrived cracked and they refused a refund.',
    simulateError: true,
  },
  {
    id: 'offline-state',
    label: 'State — offline',
    description: 'Offline banner, composer disabled, queue note.',
    userMessage: '',
    forceOffline: true,
  },
]

/**
 * Emotion-matched acknowledgment tiers (audit Dimension 1): one register per
 * detected intent — consumer hassle, notice anxiety, urgent distress. The
 * verbatim echo is retired for the chip path; the FactCheckCard is now the
 * single structured confirmation (anti-fatigue, Dimension 2).
 */
export type ReassuranceTone = 'hassle' | 'notice' | 'urgent'

export const REASSURANCE: Record<ReassuranceTone, Partial<Record<LangCode, string>>> = {
  hassle: {
    en: 'That is frustrating — and you do not have to accept it. There are structured, free steps we can take, one at a time.',
    hi: 'यह निराशाजनक है — और आपको इसे स्वीकार नहीं करना है। हम एक-एक करके कुछ व्यवस्थित, मुफ़्त कदम उठा सकते हैं।',
    mr: 'हे निराशाजनक आहे — आणि तुम्ही ते स्वीकारण्याची गरज नाही. आपण एक-एक करून काही नियोजनबद्ध, मोफत पावले उचलू शकतो.',
    ta: 'இது வருத்தம் தரும் விஷயம் — இதை ஏற்றுக்கொள்ள வேண்டியதில்லை. ஒவ்வொன்றாக சில ஒழுங்கமைந்த இலவச படிகளை எடுக்கலாம்.',
    ur: 'یہ مایوس کن ہے — اور آپ کو اسے قبول نہیں کرنا۔ ہم ایک ایک کر کے کچھ منظم، مفت قدم اٹھا سکتے ہیں۔',
  },
  notice: {
    en: 'Official notices look intimidating because of the formal legal language — but most are routine demands with a clear timeline. Let us read what it actually asks for.',
    hi: 'सरकारी नोटिस औपचारिक कानूनी भाषा की वजह से डरावने लगते हैं — लेकिन ज़्यादातर सामान्य माँगें होती हैं जिनकी समय-सीमा साफ़ होती है। आइए पढ़ें कि वह असल में क्या कहता है।',
    mr: 'शासकीय जाहीरनामी औपचारिक कायदेशीर भाषेमुळे भयानक वाटतात — पण बहुतेक साध्या मागण्या असतात, स्पष्ट मुदतीसह. ते प्रत्यक्षात काय मागतात ते वाचू.',
    ta: 'அரசு அறிவிப்புகள் சட்டரீதியான மொழி காரணமாக பயமுறுத்தும் — ஆனால் பெரும்பாலன வழக்கமான கோரிக்கைகள், தெளிவான காலக்கெடுவுடன். அது உண்மையில் என்ன கேட்கிறது என்று படிப்போம்.',
    ur: 'سرکاری نوٹس رسمی قانونی زبان کی وجہ سے خوفناک لگتے ہیں — لیکن اکثر عام مانگیں ہوتی ہیں جن کی مدت واضح ہوتی ہے۔ دیکھتے ہیں یہ اصل میں کیا کہتا ہے۔',
  },
  urgent: {
    en: 'Take a breath — your safety and your rights come first. Let us make sure you do not take a step that puts either at risk.',
    hi: 'एक गहरी साँस लें — आपकी सुरक्षा और अधिकार सबसे पहले। पहले यह सुनिश्चित करते हैं कि कोई कदम जोखिम में न डाले।',
    mr: 'एक खोल श्वास घ्या — तुमची सुरक्षा आणि हक्क सर्वांत आधी. कोणतेही पाऊल धोक्यात न टाकता पाहू.',
    ta: 'ஒரு மூச்சு விடுங்கள் — உங்கள் பாதுகாப்பும் உரிமைகளும் முதலில். எந்தப் படியும் ஆபத்தில் ஆகாது என்று உறுதி செய்வோம்.',
    ur: 'ایک گہری سانس لیں — آپ کی حفاظت اور حقوق سب سے پہلے ہیں۔ پہلے یقینی بناتے ہیں کہ کوئی قدم خطرے میں نہ ڈالے۔',
  },
}

/** Kept for the free-text consumer path (structural restatement, no echo). */
export const JOURNEY_STRINGS: Record<
  string,
  Partial<Record<LangCode, string>>
> = {
  reassurance: {
    en: 'That sounds frustrating, and it is a common situation — there are free steps you can take. Let me make sure I have this right before anything else.',
    hi: 'यह परेशान करने वाली बात है, और यह एक आम स्थिति है — कुछ मुफ़्त कदम उठाए जा सकते हैं। पहले मैं बात सही समझ लूँ।',
    mr: 'हे त्रासदायक आहे, आणि ही एक सामान्य स्थिती आहे — काही मोफत पावले उचलता येतात. आधी मी गोष्ट बरोबर समजून घेऊ.',
    ta: 'இது கவலை அளிக்கிறது, ஆனால் இது ஒரு பொதுவான நிலை — இலவச படிகள் உள்ளன. முதலில் விஷயத்தை சரியாகப் புரிந்துகொள்கிறேன்.',
    ur: 'یہ پریشان کن بات ہے، اور یہ ایک عام صورت حال ہے — کچھ مفت قدم اٹھائے جا سکتے ہیں۔ پہلے میں بات درست سمجھ لوں۔',
  },
  restatement: {
    en: 'mixer grinder from HomeKart, ₹8,999, arrived cracked, refund and replacement both refused.',
    hi: 'HomeKart से मिक्सर ग्राइंडर, ₹8,999, टूटा हुआ आया, रिफंड और बदली दोनों से इनकार।',
    mr: 'HomeKart कडील मिक्सर ग्राइंडर, ₹8,999, फुटलेला आला, पैसे परत व बदली दोन्हीस नकार.',
    ta: 'HomeKart-இலிருந்து மிக்சர் கிரைண்டர், ₹8,999, உடைந்து வந்தது, பணமும் மாற்றமும் மறுக்கப்பட்டது.',
    ur: 'HomeKart سے مکسر گرائنڈر، ₹8,999، ٹوٹا ہوا آیا، پیسہ واپسی اور تبدیلی دونوں سے انکار۔',
  },
  cautionIntro: {
    en: 'Because of how long ago this happened, time limits may apply — and sometimes delay can be excused. I am not certain, so treat the next steps as “worth trying”, and let a human helper check your dates.',
    hi: 'बात काफ़ी पुरानी है, इसलिए समय-सीमा लागू हो सकती है — और कभी-कभी देरी माफ़ की जा सकती है। मुझे पक्का नहीं है, इसलिए अगले कदम “कोशिश करने लायक” समझें और किसी मानव सहायक से तारीख़ें जाँचवाएँ।',
    mr: 'गोष्ट खूप जुनी आहे, म्हणून वेळेची मर्यादा लागू असू शकते — आणि कधी कधी उशीर माफ केला जाऊ शकतो. मला नक्की नाही, म्हणून पुढची पावले “प्रयत्न करण्यासारखी” समजा आणि एखाद्या मानवी मदतनीसाकडून तारखा तपासा.',
    ta: 'இது நடந்து நீண்ட காலமாகிவிட்டதால் காலக்கெடு பொருந்தலாம் — சில சமயம் தாமதம் மன்னிக்கப்படவும் வாய்ப்புண்டு. எனக்கு உறுதியில்லை, எனவே அடுத்த படிகளை “முயற்சிக்கத் தக்கவை”யாக எண்ணி, ஒரு மனித உதவியாளாரிடம் தேதிகளைச் சரிபார்யுங்கள்.',
    ur: 'بات کافی پرانی ہے، اس لیے وقت کی حد لاگو ہو سکتی ہے — اور کبھی کبھی تاخیر معاف کی جا سکتی ہے۔ مجھے یقین نہیں، اس لیے اگلے قدم “کوشنے کے قابل” سمجھیں اور کسی انسانی مددگار سے تاریخیں جانچوائیں۔',
  },
}

/** Finding card content (en this build; flagged for the review pass). */
export const FINDING = {
  title: 'Cracked on arrival is a product defect',
  whatHappened:
    'Your grinder reached you damaged. That is a problem with the goods themselves — not with how you used them.',
  lawSays:
    'Goods that arrive damaged or faulty can count as a “defect” under the Consumer Protection Act, 2019. The seller is responsible for the condition of what they sold.',
  legalId: 'cpa-defect-goods',
  means: 'Asking HomeKart for a refund or a replacement is a normal, reasonable ask — not a favour. Keep the bill, the photos and every chat with customer care.',
  confidence: 'clear' as const,
  reasoningSteps: [
    'Read your message and attached bill (mock)',
    'Matched “arrived cracked” against the defect-in-goods concept',
    'Checked the boundary: consumer purchase, not business-to-business',
    'Draft ladder ordered by cost and risk, free steps first',
  ],
}

export const CAUTION_FINDING = {
  title: 'Time limits may apply to your claim',
  legalId: 'cpa-limitation',
  confidence: 'likely' as const,
}

export const WHATSAPP_DRAFTS = [
  `Hello HomeKart support,\n\nOrder HK-4471 — mixer grinder (₹8,999), delivered 12 Oct 2026.\n\nThe jar arrived cracked. I have photos and the unboxing video. Customer care refused a refund or replacement on the call today.\n\nI am asking for a full refund or a replacement unit within 7 days. If that is not possible, please tell me in writing so I can take this forward through the consumer complaint channels.\n\nThank you,\n[Your name]`,
  `Hello HomeKart team,\n\nMy mixer grinder (Order HK-4471, ₹8,999, delivered 12 Oct 2026) arrived with a cracked jar. I contacted customer care and was refused both a refund and a replacement.\n\nI am requesting a refund or replacement within 7 days. The bill and photos of the damaged item are ready. Please respond in writing — that will help both of us if this goes to the consumer helpline.\n\nRegards,\n[Your name]`,
]

export const HELPLINE_PREP = [
  'Your bill or order confirmation (Order HK-4471)',
  'Photos of the cracked jar, as received',
  'Dates: purchase, delivery, and the refused call',
  'What you are asking for: refund or replacement',
]

export const NOTICE_FIELDS = [
  { key: 'to', label: 'To', value: 'HomeKart Retail Pvt. Ltd., Registered Office, Mumbai' },
  { key: 'from', label: 'From', value: '[Your full name and address]' },
  { key: 'date', label: 'Date', value: '[Today’s date]' },
  { key: 'subject', label: 'Subject', value: 'Demand for refund — defective mixer grinder, Order HK-4471' },
  { key: 'body', label: 'Body', value: 'I purchased a mixer grinder (₹8,999) under Order HK-4471, delivered on 12 Oct 2026. The jar arrived cracked — a defect in the goods. My refund/replacement request of [date] was refused. I demand a full refund of ₹8,999 within 15 days of this notice, failing which I intend to seek remedy through the consumer dispute channels. — [Your name]' },
] as const
