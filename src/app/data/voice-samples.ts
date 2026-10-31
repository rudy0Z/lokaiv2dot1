import type { LangCode } from './languages'

/**
 * Simulated voice-capture samples (one per UI language). AI-drafted, never
 * reviewed — the whole voice surface carries the "Simulated in prototype"
 * tag. The mic is never accessed; these stand in for a transcript.
 */
/** Simulated voice-capture samples (prepared languages; others fall back to English). */
export const VOICE_SAMPLES: Partial<Record<LangCode, string>> = {
  en: 'Um, hello… actually four days ago, on 18th October, I ordered a Mixwell 750 watt mixer from HomeKart for eight thousand… sorry, ₹8,999. When I opened the box, the big jar was cracked at the base and the motor smelled like burnt wire. I called HomeKart support twice today and they just hung up saying the 48-hour return window is over.',
  hi: 'भैया मेरी बात सुनिए… मैंने चार दिन पहले होमकार्ट से मिक्सवेल का मिक्सी मंगाया था, आठ हज़ार नौ सौ निन्यानबे रुपये का। डब्बा खोला तो जार नीचे से टूटा निकला और मोटर से जलने की बदबू आ रही है। कस्टमर केयर को फोन किया तो बोल रहे हैं कि 48 घंटे हो गए अब कंपनी कुछ नहीं करेगी… मेरे पास पक्का बिल भी है।',
  mr: 'नमस्कार, मला काल महानगरपालिकेकडून ही मालमत्ता कराची नोटीस आली आहे… यात लाल अक्षरात ₹१८,४५० थकबाकी लिहिली आहे आणि १५ दिवसांत भरली नाही तर जप्तीची कारवाई करू असे काहीतरी लिहिले आहे. मला ही सरकारी भाषा नीट समजत नाहीये, कृपया सांगा मी काय करू?',
  ta: 'அய்யா, நான் நாலு நாளைக்கு முன்னாடி ஹோம்கார்ட்ல ₹8,999 கொடுத்து மிக்ஸி வாங்கினேன். பாக்ஸை பிரிச்சு பார்த்தா ஜார் உடைஞ்சு இருக்கு, மோட்டார்ல இருந்து புகை நாத்தம் வருது. கஸ்டமர் கேர்ல கேட்டா ரிட்டர்ன் விண்டோ முடிஞ்சு போச்சுன்னு சொல்றாங்க.',
  ur: 'السلام علیکم، میں نے چار دن پہلے ہوم کارٹ سے 8,999 روپے کا مکسر منگوایا تھا۔ ڈبہ کھولا تو جار ٹوٹا ہوا تھا اور موٹر سے جلنے کی بو آ رہی ہے۔ کسٹمر کیئر والے کہہ رہے ہیں کہ اب واپسی کا وقت ختم ہو گیا ہے۔',
}

/** mm:ss clock for the simulated listening timer. */
export function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
