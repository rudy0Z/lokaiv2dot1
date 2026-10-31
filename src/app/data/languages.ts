/**
 * Language configuration (A4b). Every language in the Eighth Schedule of the
 * Indian Constitution is selectable — plus English as the working language.
 * Adding a language = ONE entry here + `:lang()` stack in tokens.css + its
 * pack in i18n.ts / i18n-drafts.ts.
 *
 * coverage:
 *  - 'full'    — complete UI string pack (still AI-drafted except en)
 *  - 'core'    — core UI chrome translated; everything else falls back to
 *                English (visible law, never a blank)
 *  - 'fallback'— script + fonts wired, English chrome (draft quality would
 *                mislead; honesty over costume)
 * Every non-English string is `reviewedByNativeSpeaker: false` until a human
 * signs off.
 */
export type LangCode =
  | 'en' | 'as' | 'bn' | 'brx' | 'doi' | 'gom' | 'gu' | 'hi' | 'kn' | 'ks'
  | 'mai' | 'ml' | 'mni' | 'mr' | 'ne' | 'or' | 'pa' | 'sa' | 'sat' | 'sd'
  | 'ta' | 'te' | 'ur'

export type ScriptId =
  | 'latin' | 'devanagari' | 'bengali' | 'gurmukhi' | 'gujarati' | 'kannada'
  | 'malayalam' | 'odia' | 'tamil' | 'telugu' | 'urdu' | 'meetei' | 'olchiki'

export type Direction = 'ltr' | 'rtl'
export type Coverage = 'full' | 'core' | 'fallback'

export interface LanguageConfig {
  code: LangCode
  english: string
  native: string
  /** compact selector label */
  short: string
  script: ScriptId
  direction: Direction
  rootScale: string
  bodyLineHeight: number
  numeralStyle: 'latn'
  reviewedByNativeSpeaker: boolean
  coverage: Coverage
}

const L = (
  code: LangCode, english: string, native: string, short: string, script: ScriptId,
  direction: Direction, rootScale: string, bodyLineHeight: number, coverage: Coverage,
): LanguageConfig => ({
  code, english, native, short, script, direction, rootScale, bodyLineHeight,
  numeralStyle: 'latn', reviewedByNativeSpeaker: code !== 'en', coverage,
})

export const LANGUAGES: Record<LangCode, LanguageConfig> = {
  en: L('en', 'English', 'English', 'EN', 'latin', 'ltr', '16px', 1.6, 'full'),
  as: L('as', 'Assamese', 'অসমীয়া', 'অস', 'bengali', 'ltr', '17.25px', 1.72, 'core'),
  bn: L('bn', 'Bengali', 'বাংলা', 'বাং', 'bengali', 'ltr', '17.25px', 1.72, 'core'),
  brx: L('brx', 'Bodo', 'बड़ो', 'बड़ो', 'devanagari', 'ltr', '17.5px', 1.7, 'fallback'),
  doi: L('doi', 'Dogri', 'डोगरी', 'डोग', 'devanagari', 'ltr', '17.5px', 1.7, 'fallback'),
  gom: L('gom', 'Konkani', 'कोंकणी', 'कों', 'devanagari', 'ltr', '17.5px', 1.7, 'core'),
  gu: L('gu', 'Gujarati', 'ગુજરાતી', 'ગુજ', 'gujarati', 'ltr', '17.25px', 1.7, 'core'),
  hi: L('hi', 'Hindi', 'हिन्दी', 'हिं', 'devanagari', 'ltr', '17.5px', 1.7, 'full'),
  kn: L('kn', 'Kannada', 'ಕನ್ನಡ', 'ಕನ್', 'kannada', 'ltr', '17.5px', 1.78, 'core'),
  ks: L('ks', 'Kashmiri', 'کٲشُر', 'کٲش', 'urdu', 'rtl', '17px', 2.15, 'fallback'),
  mai: L('mai', 'Maithili', 'मैथिली', 'मैथ', 'devanagari', 'ltr', '17.5px', 1.7, 'core'),
  ml: L('ml', 'Malayalam', 'മലയാളം', 'മല', 'malayalam', 'ltr', '17.25px', 1.8, 'core'),
  mni: L('mni', 'Manipuri', 'ꯃꯤꯇꯩꯂꯣꯟ', 'ꯃꯤ', 'meetei', 'ltr', '17.25px', 1.72, 'fallback'),
  mr: L('mr', 'Marathi', 'मराठी', 'मरा', 'devanagari', 'ltr', '17.5px', 1.7, 'full'),
  ne: L('ne', 'Nepali', 'नेपाली', 'नेप', 'devanagari', 'ltr', '17.5px', 1.7, 'core'),
  or: L('or', 'Odia', 'ଓଡ଼ିଆ', 'ଓଡ', 'odia', 'ltr', '17.25px', 1.74, 'core'),
  pa: L('pa', 'Punjabi', 'ਪੰਜਾਬੀ', 'ਪੰਜ', 'gurmukhi', 'ltr', '17.25px', 1.72, 'core'),
  sa: L('sa', 'Sanskrit', 'संस्कृतम्', 'संस्कृ', 'devanagari', 'ltr', '17.5px', 1.7, 'core'),
  sat: L('sat', 'Santali', 'ᱥᱟᱱᱛᱟᱲᱤ', 'ᱥᱟᱱ', 'olchiki', 'ltr', '17.25px', 1.72, 'fallback'),
  sd: L('sd', 'Sindhi', 'سنڌي', 'سنڌ', 'urdu', 'rtl', '17px', 2.15, 'fallback'),
  ta: L('ta', 'Tamil', 'தமிழ்', 'தமி', 'tamil', 'ltr', '17.25px', 1.75, 'full'),
  te: L('te', 'Telugu', 'తెలుగు', 'తెల', 'telugu', 'ltr', '17.25px', 1.76, 'core'),
  ur: L('ur', 'Urdu', 'اردو', 'اردو', 'urdu', 'rtl', '17px', 2.15, 'full'),
}

/** selector order: English, then Constitution order */
export const ALL_LANGS: LangCode[] = [
  'en', 'as', 'bn', 'brx', 'doi', 'gom', 'gu', 'hi', 'kn', 'ks', 'mai', 'ml',
  'mni', 'mr', 'ne', 'or', 'pa', 'sa', 'sat', 'sd', 'ta', 'te', 'ur',
]

/** fully prepared languages — specimen depth, complete packs */
export const LANG_ORDER: LangCode[] = ['en', 'hi', 'mr', 'ta', 'ur']

export const LANG_OPTIONS = Object.fromEntries(
  ALL_LANGS.map((c) => [c, { code: c, short: LANGUAGES[c].short }]),
) as Record<LangCode, { code: LangCode; short: string }>
