import type { LangCode } from './languages'

/**
 * UI chrome strings. Translations for non-English languages are AI-drafted
 * placeholders (reviewedByNativeSpeaker: false — see languages.ts). Packs
 * are PARTIAL: any missing language falls back through i18n-drafts.ts and
 * then to English in tr() — visible fallback, never a blank. Legal claims
 * never live here; they live only in legal-content.ts behind [VERIFY].
 */
type Pack = Partial<Record<LangCode, string>>

export interface UiStrings {
  roleLine: Pack
  protoTag: Pack
  greeting: Pack
  greetingSub: Pack
  chipDefective: Pack
  chipNotice: Pack
  chipThreat: Pack
  chipOther: Pack
  composerPlaceholder: Pack
  composerSend: Pack
  composerAttach: Pack
  attachTitle: Pack
  attachHint: Pack
  attachDocBill: Pack
  attachDocPhoto: Pack
  stageReading: Pack
  stageChecking: Pack
  stageWriting: Pack
  confClear: Pack
  confClearDesc: Pack
  confLikely: Pack
  confLikelyDesc: Pack
  confUnsure: Pack
  confUnsureDesc: Pack
  badgeVerified: Pack
  badgePrototype: Pack
  reasoningTitle: Pack
  simulatedTag: Pack
  findingWhatHappened: Pack
  findingLawSays: Pack
  findingMeans: Pack
  ladderTitle: Pack
  step1Title: Pack
  step2Title: Pack
  step3Title: Pack
  copy: Pack
  copied: Pack
  edit: Pack
  saveChanges: Pack
  regenerate: Pack
  discard: Pack
  stale: Pack
  update: Pack
  errorTitle: Pack
  errorBody: Pack
  retry: Pack
  offlineBanner: Pack
  newChat: Pack
  stopHeadline: Pack
  stopWhy: Pack
  dlsaTitle: Pack
  dlsaState: Pack
  dlsaDistrict: Pack
  dlsaFind: Pack
  dlsaUnavailable: Pack
  dlsaPlaceholderNote: Pack
  tellMore: Pack
  treatmentLabel: Pack
  treatmentInverted: Pack
  treatmentLight: Pack
  classifyPending: Pack
  tierHardStop: Pack
  tierCaution: Pack
  tierProceed: Pack
  langLabel: Pack
  themeLabel: Pack
  back: Pack
  openNotice: Pack
  noticeReviewTitle: Pack
  noticeConsent: Pack
  noticePrepare: Pack
  noticeFinalTitle: Pack
  noticeCopyAll: Pack
  cautionTitle: Pack
  restatePrefix: Pack
  qWhen: Pack
  ans30: Pack
  ans1to2: Pack
  ans2plus: Pack
  ansNotSure: Pack
  tabHome: Pack
  tabHistory: Pack
  tabSaved: Pack
  tabProfile: Pack
  navLabel: Pack
  speakCta: Pack
  langHint: Pack
  addNotice: Pack
  addNoticeSub: Pack
  typeInstead: Pack
  typeInsteadSub: Pack
  listening: Pack
  speakNaturally: Pack
  tapToStop: Pack
  heardTitle: Pack
  heardSub: Pack
  detectedLang: Pack
  addDetails: Pack
  addFilePhoto: Pack
  addLocation: Pack
  specifyDate: Pack
  sendToLokai: Pack
  simulatedVoiceNote: Pack
  noticeMeaning: Pack
  keyPoints: Pack
  whatNext: Pack
  sourcesLabel: Pack
  viewAll: Pack
  readOriginal: Pack
  historyTitle: Pack
  savedTitle: Pack
  emptyHistory: Pack
  emptySaved: Pack
  privacyTitle: Pack
  privacyBody: Pack
  whatStored: Pack
  storedBody: Pack
  deleteAll: Pack
  deleteAllConfirm: Pack
  deleteYes: Pack
  deleteNo: Pack
  profileNote: Pack
  autoDetect: Pack
  profileLangsNote: Pack
  profileCoverageNote: Pack
  skip: Pack
  jumpToLatest: Pack
  factCheckTitle: Pack
  factCheckSub: Pack
  factConfirm: Pack
  factCorrect: Pack
  handoverTitle: Pack
  handoverWhat: Pack
  exhibitsLabel: Pack
  stagesLabel: Pack
  noticeCardTitle: Pack
  noticeCardBody: Pack
  noticeCardOpen: Pack
  listen: Pack
  protectHelp: Pack
  protectPolice: Pack
  protectDlsa: Pack
  protectGuide: Pack
  replayWatch: Pack
  replayBadge: Pack
  replayHint: Pack
  replayPlay: Pack
  replayPause: Pack
  replayRestart: Pack
  replayFinished: Pack
  /* deep-audit 2026-10-27 — ladder chrome previously hardcoded English in
     ActionLadder.tsx; now real packs so Urdu stops scrambling bidi */
  step1Sub: Pack
  step2Sub: Pack
  step3Sub: Pack
  whatsappHint: Pack
  haveReady: Pack
  prepItem1: Pack
  prepItem2: Pack
  prepItem3: Pack
  prepItem4: Pack
  badgeFree: Pack
  ladderBanner: Pack
  ladderPausedNote: Pack
  chipItConsumer: Pack
  chipItOfficial: Pack
  pickClosest: Pack
  noticeReviewBanner: Pack
  noticeSendHint: Pack
  noticeExplainer: Pack
  /* ---- Case-Folder architecture (master build prompt) ---- */
  sidebarTitle: Pack
  sidebarHint: Pack
  caseDaysLabel: Pack
  newDayChat: Pack
  caseMemory: Pack
  caseSampleNote: Pack
  quickSummarise: Pack
  summaryGrievance: Pack
  summaryStanding: Pack
  summaryNext: Pack
  continuityTitle: Pack
  contChip1: Pack
  contChip2: Pack
  contChip3: Pack
  continueDay: Pack
  caseBadgeAria: Pack
  /* ---- Recruiter sandbox ---- */
  sandboxTitle: Pack
  tabScenarios: Pack
  tabReplays: Pack
  tabInspector: Pack
  scenarioLangLabel: Pack
  testerHint: Pack
  clarifyRailLabel: Pack
  postFindingLabel: Pack
  railSaveLater: Pack
  readFullDraft: Pack
  hideFullDraft: Pack
  metaSave: Pack
  metaEvidence: Pack
  metaVague: Pack
  metaInformal: Pack
  metaPushback: Pack
  metaThreat: Pack
  metaResolved: Pack
  metaNotice: Pack
  metaStop: Pack
  metaRails: Pack
  metaWorkplace: Pack
  scn1Title: Pack
  scn2Title: Pack
  scn3Title: Pack
  scn4Title: Pack
  scn5Title: Pack
  resetVault: Pack
  vaultResetDone: Pack
  factSigned: Pack
  ladderCopied: Pack
  voiceMetaCaption: Pack
  voiceSpotted: Pack
  copyHandoverNote: Pack
  coverageNotice: Pack
  langGroupFull: Pack
  langGroupPreview: Pack
  verifyStamp: Pack
  closeTitle: Pack
  closeStep1: Pack
  closeStep1Done: Pack
  closeSave: Pack
  closeSaveDone: Pack
  closeResolved: Pack
  closeResolvedDone: Pack
  matterLogTitle: Pack
  matterLogStep1: Pack
  matterLogClosed: Pack
  savedFromChat: Pack
  /* Phase A/B redesign: home triage rail + brief/docket/rail cards (AI-drafted, unreviewed) */
  triageLabel: Pack
  catShop: Pack
  catShopSub: Pack
  catRent: Pack
  catRentSub: Pack
  catUpi: Pack
  catUpiSub: Pack
  catSalary: Pack
  catSalarySub: Pack
  catNotice: Pack
  catNoticeSub: Pack
  catSafety: Pack
  catSafetySub: Pack
  catOther: Pack
  findingKicker: Pack
  findingSource: Pack
  factProgress: Pack
  factTapHint: Pack
  factPickWhen: Pack
  ladderSteps: Pack
  ladderStartHere: Pack
  /* navigation / settings restructure (AI-drafted, unreviewed) */
  settingsTitle: Pack
  appearanceLabel: Pack
  themeLight: Pack
  themeDark: Pack
  casesLabel: Pack
  recentLabel: Pack
  groupToday: Pack
  groupYesterday: Pack
  groupWeek: Pack
  groupEarlier: Pack
  newChatShort: Pack
  continueCase: Pack
  caseConversations: Pack
  caseDocuments: Pack
  caseFacts: Pack
  caseResolved: Pack
  coverageDirect: Pack
  coverageRelated: Pack
  coverageMissing: Pack
  reviewerLabel: Pack
  reviewerNote: Pack
  restoreSamples: Pack
  moreLanguages: Pack
  allChats: Pack
  demoUser: Pack
  noCases: Pack
  openMenu: Pack
  closeMenu: Pack
  /* polish pass: home, voice, composer (AI-drafted, unreviewed) */
  homeSub: Pack
  voiceCancel: Pack
  voiceDone: Pack
  composerVoice: Pack
}

export const UI: UiStrings = {
  roleLine: { en: 'Legal information companion', hi: 'कानूनी जानकारी साथी', mr: 'कायदेशीर माहिती सोबती', ta: 'சட்ட தகவல் துணை', ur: 'قانونی معلومات کا ساتھی' },
  protoTag: { en: 'Prototype · mock data · not a lawyer', hi: 'प्रोटोटाइप · नमूना डेटा · वकील नहीं', mr: 'प्रोटोटाइप · नमुना डेटा · वकील नाही', ta: 'மாதிரிவடிவம் · போலி தரவு · வழக்கறிஞர் அல்ல', ur: 'پروٹوٹائپ · نمونہ ڈیٹا · وکیل نہیں' },
  greeting: { en: 'Good day. What has been happening?', hi: 'नमस्ते। क्या हुआ है?', mr: 'नमस्कार। काय झाले आहे?', ta: 'வணக்கம். என்ன நடந்தது?', ur: 'خوش آمدید۔ کیا ہوا ہے؟' },
  greetingSub: {
    en: 'Tell me about a consumer problem, or show me an official notice. I will explain things in plain words and help you pick the next step — carefully.',
    hi: 'उपभोक्ता समस्या बताइए, या कोई सरकारी नोटिस दिखाइए। मैं सरल भाषा में समझाऊँगा और सावधानी से अगला कदम चुनने में मदद करूँगा।',
    mr: 'ग्राहक समस्या सांगा, किंवा शासकीय जाहीरनामा दाखवा. मी सोप्या भाषेत समजावेन आणि पुढचा पाय निवडण्यात मदत करेन.',
    ta: 'நுகர்வோர் பிரச்சனையைச் சொல்லுங்கள், அல்லது அரசு அறिवிப்பைக் காட்டுங்கள். எளிய மொழியில் விளக்கி, கவனமாக அடுத்த படியைத் தேர்ந்தெடுக்க உதவுவேன்.',
    ur: 'کسٹمر کی مشکل بتائیں، یا کوئی سرکاری نوٹس دکھائیں۔ میں سادہ الفاظ میں سمجھاؤں گا اور احتیاط سے اگلا قدم چننے میں مدد کروں گا۔',
  },
  chipDefective: { en: 'I got a defective product', hi: 'मुझे खराब उत्पाद मिला', mr: 'मला खराब वस्तू मिळाली', ta: 'கெட்ட பொருள் கிடைத்தது', ur: 'مجھے خراب مصنوعات ملی' },
  chipNotice: { en: 'I received an official notice', hi: 'मुझे एक सरकारी नोटिस मिला है', mr: 'मला शासकीय जाहीरनामा मिळाला आहे', ta: 'எனக்கு அரசு அறிவிப்பு வந்துள்ளது', ur: 'مجھے ایک سرکاری نوٹس ملا ہے' },
  chipThreat: { en: 'A seller is threatening me', hi: 'विक्रेता मुझे धमकी दे रहा है', mr: 'विक्रेता मला धमकी देत आहे', ta: 'விற்பவர் என்னை மிரட்டுகிறார்', ur: 'دکاندار مجھے دھمکی دے رہا ہے' },
  chipOther: { en: 'Something else', hi: 'कुछ और', mr: 'काहीतरी दुसरे', ta: 'வேறு ஏதோ', ur: 'کچھ اور' },
  composerPlaceholder: { en: 'Describe your problem…', hi: 'अपनी समस्या लिखिए…', mr: 'तुमची समस्या लिहा…', ta: 'உங்கள் பிரச்சனையை எழுதுங்கள்…', ur: 'اپنی مشکل لکھیں…' },
  composerSend: { en: 'Send', hi: 'भेजें', mr: 'पाठवा', ta: 'அனுப்பு', ur: 'بھیجیں' },
  composerAttach: { en: 'Attach a document', hi: 'दस्तावेज़ जोड़ें', mr: 'दस्तऐवज जोडा', ta: 'ஆவணம் இணைக்க', ur: 'دستاویز لگائیں' },
  attachTitle: { en: 'Attach (mock tray)', hi: 'जोड़ें (नमूना)', mr: 'जोडा (नमुना)', ta: 'இணைக்க (போலி)', ur: 'لگائیں (نمونہ)' },
  attachHint: {
    en: 'File upload is disabled in this prototype. These prepared documents stand in for real uploads.',
    hi: 'इस प्रोटोटाइप में फ़ाइल अपलोड बंद है। ये तैयार दस्तावेज़ असली अपलोड की जगह लेते हैं।',
    mr: 'या प्रोटोटाइपमध्ये फाइल अपलोड बंद आहे. या तयार दस्तऐवज खऱ्या अपलोडची जागा घेतात.',
    ta: 'இந்த மாதிரியில் கோப்பு பதிவேற்றம் முடக்கப்பட்டுள்ளது. இந்த தயார் ஆவணங்கள் உண்மையான பதிவேற்றத்திற்கு பதிலாக நிற்கின்றன.',
    ur: 'اس پروٹوٹائپ میں فائل اپلوڈ بند ہے۔ یہ تیار دستاویزیں اصل اپلوڈ کی جگہ لیتی ہیں۔',
  },
  attachDocBill: { en: 'bill-homekart.pdf (mock)', hi: 'बिल-homekart.pdf (नमूना)', mr: 'बिल-homekart.pdf (नमुना)', ta: 'பில்-homekart.pdf (போலி)', ur: 'بل-homekart.pdf (نمونہ)' },
  attachDocPhoto: { en: 'photo-when-opened.jpg (mock)', hi: 'फ़ोटो-खोलते-समय.jpg (नमूना)', mr: 'फोटो-उघडताना.jpg (नमुना)', ta: 'புகைப்படம்-திறந்தபோது.jpg (போலி)', ur: 'تصویر-کھولتے-وقت.jpg (نمونہ)' },
  stageReading: { en: 'Reading what you wrote', hi: 'आपका संदेश पढ़ रहा हूँ', mr: 'तुमचा संदेश वाचत आहे', ta: 'நீங்கள் எழுதியதைப் படிக்கிறேன்', ur: 'آپ کا پیغام پڑھ رہا ہوں' },
  stageChecking: { en: 'Checking the rules', hi: 'नियम जाँच रहा हूँ', mr: 'नियम तपासत आहे', ta: 'விதிகளைச் சரிபார்க்கிறேன்', ur: 'قاعدے جانچ رہا ہوں' },
  stageWriting: { en: 'Preparing the answer', hi: 'उत्तर तैयार कर रहा हूँ', mr: 'उत्तर तयार करत आहे', ta: 'பதில் தயார் செய்கிறேன்', ur: 'جواب تیار کر رہا ہوں' },
  confClear: { en: 'Clear', hi: 'स्पष्ट', mr: 'स्पष्ट', ta: 'தெளிவு', ur: 'واضح' },
  // deep-audit 2026-10-27 (friction 5): "Clear" must not read as contradicting the unverified badge
  confClearDesc: { en: 'Fits a common consumer pattern — check the cited rule below.', hi: 'एक आम उपभोक्ता पैटर्न से मिलता है — नीचे दिया उद्धरण जाँचें।', mr: 'सामान्य ग्राहक-कृती नमुन्याशी जुळते — खालील उद्धरण तपासा.', ta: 'பொதுவான நுகர்வோர் போக்குடன் பொருந்துகிறது — கீழே மேற்கோளைச் சரிபார்க்கவும்.', ur: 'ایک عام صارف پیٹرن سے ملتا ہے — نیچے حوالہ دیکھ لیں۔' },
  confLikely: { en: 'Likely — please confirm', hi: 'संभव — पुष्टि करें', mr: 'संभव — खात्री करा', ta: 'இருக்கலாம் — உறுதிப்படுத்துங்கள்', ur: 'ممکن — تصدیق کریں' },
  confLikelyDesc: { en: 'Depends on a fact you should check.', hi: 'एक ऐसे तथ्य पर निर्भर है जो आप जाँच लें।', mr: 'एका अशा वस्तुस्थितीवर अवलंबून आहे जी तुम्ही तपासावी.', ta: 'நீங்கள் சரிபார்க்க வேண்டிய ஒரு உண்மையைச் சார்ந்தது.', ur: 'ایک ایسے حقیقت پر منحصر ہے جو آپ جانچ لیں۔' },
  confUnsure: { en: 'Not sure', hi: 'पक्का नहीं', mr: 'नक्की नाही', ta: 'உறுதியில்லை', ur: 'یقین نہیں' },
  confUnsureDesc: { en: 'Please check this with a human helper.', hi: 'किसी मानव सहायक से जाँच लें।', mr: 'एखाद्या मानवी मदतनीसाकडे तपासा.', ta: 'மனித உதவியாளரிடம் சரிபார்க்கவும்.', ur: 'کسی انسانی مددگار سے جانچ لیں۔' },
  badgeVerified: { en: 'Verified against source', hi: 'स्रोत से जाँचा गया', mr: 'स्रोतापासून तपासले', ta: 'மூலத்தில் சரிபார்க்கப்பட்டது', ur: 'ماخذ سے جانچا گیا' },
  badgePrototype: { en: 'Prototype content, not yet verified', hi: 'प्रोटोटाइप सामग्री — अभी जाँचा नहीं गया', mr: 'प्रोटोटाइप साहित्य — अजून तपासले नाही', ta: 'மாதிரி உள்ளடக்கம் — இன்னும் சரிபார்க்கப்படவில்லை', ur: 'پروٹوٹائپ مواد — ابھی جانچا نہیں گیا' },
  reasoningTitle: { en: 'What I checked', hi: 'मैंने क्या जाँचा', mr: 'मी काय तपासले', ta: 'நான் என்ன சரிபார்த்தேன்', ur: 'میں نے کیا جانچا' },
  simulatedTag: { en: 'Simulated in prototype', hi: 'प्रोटोटाइप में अनुकरित', mr: 'प्रोटोटाइपमध्ये नक्कल', ta: 'மாதிரியில் உருவகம்', ur: 'پروٹوٹائپ میں نقل شدہ' },
  findingWhatHappened: { en: 'What happened', hi: 'क्या हुआ', mr: 'काय झाले', ta: 'என்ன நடந்தது', ur: 'کیا ہوا' },
  findingLawSays: { en: 'What the law generally says', hi: 'कानून आम तौर पर क्या कहता है', mr: 'कायदा साधारणपणे काय म्हणतो', ta: 'சட்டம் பொதுவாக என்ன சொல்கிறது', ur: 'قانون عام طور پر کیا کہتا ہے' },
  findingMeans: { en: 'What this means for you', hi: 'आपके लिए इसका मतलब', mr: 'तुमच्यासाठी याचा अर्थ', ta: 'உங்களுக்கு இதன் பொருள்', ur: 'آپ کے لیے اس کا مطلب' },
  ladderTitle: { en: 'Next steps — lowest risk first', hi: 'अगले कदम — पहले कम जोखिम', mr: 'पुढची पावले — आधी कमी धोका', ta: 'அடுத்த படிகள் — முதலில் குறைந்த ஆபத்து', ur: 'اگلے قدم — پہلے کم خطرہ' },
  step1Title: { en: 'Message the seller first', hi: 'पहले विक्रेता को संदेश भेजें', mr: 'आधी विक्रेत्याला संदेश पाठवा', ta: 'முதலில் விற்பவருக்கு செய்தி அனுப்புங்கள்', ur: 'پہلے دکاندار کو پیغام بھیجیں' },
  step2Title: { en: 'Call the national consumer helpline', hi: 'राष्ट्रीय उपभोक्ता हेल्पलाइन पर कॉल करें', mr: 'राष्ट्रीय ग्राहक हेल्पलाइनवर कॉल करा', ta: 'தேசிய நுகர்வோர் உதவி எண்ணை அழையுங்கள்', ur: 'قومی کسٹمر ہیلپ لائن پر کال کریں' },
  step3Title: { en: 'Send a formal demand notice', hi: 'औपचारिक माँग-पत्र भेजें', mr: 'औपचारिक मागणी-पत्र पाठवा', ta: 'முறையான கோரிக்கை அறிவிப்பை அனுப்புங்கள்', ur: 'رسمی مطالبہ نوٹس بھیجیں' },
  copy: { en: 'Copy', hi: 'कॉपी', mr: 'कॉपी', ta: 'நகலெடு', ur: 'کاپی' },
  copied: { en: 'Copied', hi: 'कॉपी हो गया', mr: 'कॉपी झाले', ta: 'நகலெடுக்கப்பட்டது', ur: 'کاپی ہو گیا' },
  edit: { en: 'Edit', hi: 'संपादित करें', mr: 'संपादन करा', ta: 'திருத்து', ur: 'ترمیم' },
  saveChanges: { en: 'Save changes', hi: 'बदलाव सहेजें', mr: 'बदल सेव्ह करा', ta: 'மாற்றங்களைச் சேமி', ur: 'تبدیلیاں محفوظ کریں' },
  regenerate: { en: 'Regenerate', hi: 'दोबारा बनाएँ', mr: 'पुन्हा तयार करा', ta: 'மீண்டும் உருவாக்கு', ur: 'دوبارہ بنائیں' },
  discard: { en: 'Discard', hi: 'हटाएँ', mr: 'काढून टाका', ta: 'நிராகரி', ur: 'ہٹائیں' },
  stale: { en: 'Out of date', hi: 'पुराना हो गया', mr: 'जुने झाले', ta: 'காலாவதியானது', ur: 'پرانا ہو گیا' },
  update: { en: 'Update', hi: 'अपडेट करें', mr: 'अपडेट करा', ta: 'புதுப்பி', ur: 'اپڈیٹ کریں' },
  errorTitle: { en: 'I could not finish that', hi: 'यह पूरा नहीं हो सका', mr: 'हे पूर्ण झाले नाही', ta: 'இதை முடிக்க முடியவில்லை', ur: 'یہ مکمل نہ ہو سکا' },
  errorBody: { en: 'Something failed while preparing the answer. Nothing was sent anywhere — try again.', hi: 'उत्तर तैयार करते समय कुछ गड़बड़ हुई। कुछ भी कहीं नहीं भेजा गया — फिर कोशिश करें।', mr: 'उत्तर तयार करताना काही चुकले. काहीही कोठेतरी पाठवले नाही — पुन्हा प्रयत्न करा.', ta: 'பதிலைத் தயாரிக்கும்போது ஏதோ தவறு ஏற்பட்டது. எதுவும் எங்கும் அனுப்பப்படவில்லை — மீண்டும் முயற்சிக்கவும்.', ur: 'جواب تیار کرتے وقت کچھ غلط ہوئی۔ کچھ بھی کہیں نہیں بھیجا گیا — دوبارہ کوشش کریں۔' },
  retry: { en: 'Retry', hi: 'फिर कोशिश करें', mr: 'पुन्हा प्रयत्न करा', ta: 'மீண்டும் முயற்சி', ur: 'دوبارہ کوشش' },
  offlineBanner: { en: 'You are offline. This prototype needs no connection; a real build would queue your messages.', hi: 'आप ऑफ़लाइन हैं। इस प्रोटोटाइप को कनेक्शन नहीं चाहिए; असली ऐप आपके संदेश कतार में रखता।', mr: 'तुम्ही ऑफलाइन आहात. या प्रोटोटाइपला कनेक्शन लागत नाही; खरी अॅप तुमचे संदेश रांगेत ठेवते.', ta: 'நீங்கள் ஆஃப்லைனில் இருக்கிறீர்கள். இந்த மாதிரிக்கு இணைப்பு தேவையில்லை; உண்மையான செயலி உங்கள் செய்திகளை வரிசையில் வைக்கும்.', ur: 'آپ آف لائن ہیں۔ اس پروٹوٹائپ کو کنکشن نہیں چاہیے؛ اصل ایپ آپ کے پیغامات قطار میں رکھتی۔' },
  newChat: { en: 'New conversation', hi: 'नई बातचीत', mr: 'नवी संभाषण', ta: 'புதிய உரையாடல்', ur: 'نئی گفتگو' },
  stopHeadline: { en: 'I am going to stop here', hi: 'मैं यहीं रुक रहा हूँ', mr: 'मी इथे थांबत आहे', ta: 'நான் இங்கே நிற்கிறேன்', ur: 'میں یہیں رک رہا ہوں' },
  stopWhy: {
    en: 'This kind of matter can seriously affect your position if handled by an automated tool. A person should look at it — not because you did anything wrong, but because the stakes are high.',
    hi: 'इस तरह के मामले में गलती आपकी स्थिति गंभीर रूप से प्रभावित कर सकती है। इसे कोई व्यक्ति देखे — आपने कुछ गलत नहीं किया है, बस जोखिम ऊँचा है।',
    mr: 'या प्रकारच्या बाबीत चुक तुमची स्थिती गंभीरपणे बाधित करू शकते. ही एखाद्या व्यक्तीने पाहावी — तुम्ही काही चुकीचे केले नाही, फक्त जोखीम मोठी आहे.',
    ta: 'இந்த வகை விஷயங்களில் தவறு உங்கள் நிலையை கடுமையாக பாதிக்கும். ஒரு மனிதர் இதைப் பார்க்க வேண்டும் — நீங்கள் தவறு செய்யவில்லை, ஆபத்து பெரியது.',
    ur: 'اس قسم کے معاملے میں غلطی آپ کی پوزیشن پر سخت اثر ڈال سکتی ہے۔ اسے کوئی انسان دیکھے — آپ نے کوئی غلطی نہیں کی، بس خطرہ بہت بڑا ہے۔',
  },
  dlsaTitle: { en: 'Contact your District Legal Services Authority', hi: 'अपने ज़िला विधिक सेवा प्राधिकरण से संपर्क करें', mr: 'तुमच्या जिल्हा विधी सेवा प्राधिकरणाशी संपर्क करा', ta: 'உங்கள் மாவட்ட சட்ட சேவை ஆணையத்தை தொடர்பு கொள்ளுங்கள்', ur: 'اپنے ضلع قانونی خدمات ادارے سے رابطہ کریں' },
  dlsaState: { en: 'State', hi: 'राज्य', mr: 'राज्य', ta: 'மாநிலம்', ur: 'ریاست' },
  dlsaDistrict: { en: 'District', hi: 'ज़िला', mr: 'जिल्हा', ta: 'மாவட்டம்', ur: 'ضلع' },
  dlsaFind: { en: 'Find help', hi: 'मदद खोजें', mr: 'मदत शोधा', ta: 'உதவியைத் தேடு', ur: 'مدد تلاش کریں' },
  dlsaUnavailable: { en: 'DLSA info unavailable', hi: 'DLSA की जानकारी उपलब्ध नहीं', mr: 'DLSA माहिती उपलब्ध नाही', ta: 'DLSA தகவல் கிடைக்கவில்லை', ur: 'DLSA کی معلومات دستیاب نہیں' },
  dlsaPlaceholderNote: { en: 'Prototype placeholder — real contact details to be verified before use.', hi: 'प्रोटोटाइप प्लेसहोल्डर — असली संपर्क विवरण उपयोग से पहले जाँचे जाएँगे।', mr: 'प्रोटोटाइप प्लेसहोल्डर — खरी संपर्क माहिती वापरण्यापूर्वी तपासली जाईल.', ta: 'மாதிரி நிரப்புக்குறி — உண்மையான தொடர்பு விவரங்கள் பயன்படுத்தும் முன் சரிபார்க்கப்படும்.', ur: 'پروٹوٹائپ جگہ بھرنے والا — اصل رابطہ کی تفصیلات استعمال سے پہلے جانچی جائیں گی۔' },
  tellMore: { en: 'Tell me more — this may be a consumer matter', hi: 'और बताइए — शायद यह उपभोक्ता मामला हो', mr: 'आणखी सांगा — कदाचित हा ग्राहक बाब असेल', ta: 'இன்னும் சொல்லுங்கள் — இது நுகர்வோர் விஷயமாக இருக்கலாம்', ur: 'اور بتائیں — شاید یہ کسٹمر معاملہ ہو' },
  treatmentLabel: { en: 'View', hi: 'दृश्य', mr: 'दृश्य', ta: 'காட்சி', ur: 'منظر' },
  treatmentInverted: { en: 'Inverted', hi: 'उल्टा', mr: 'विरुद्ध', ta: 'தலைகீழ்', ur: 'الٹ' },
  treatmentLight: { en: 'Light', hi: 'हल्का', mr: 'हलके', ta: 'ஒளி', ur: 'روشنی' },
  classifyPending: { en: 'Classifying your matter', hi: 'आपका मामला परख रहा हूँ', mr: 'तुमची बाब तपासत आहे', ta: 'உங்கள் விஷயத்தை வகைப்படுத்துகிறேன்', ur: 'آپ کا معاملہ پرکھ رہا ہوں' },
  tierHardStop: { en: 'Outside safe scope', hi: 'सुरक्षित दायरे से बाहर', mr: 'सुरक्षित व्याप्तीबाहेर', ta: 'பாதுகாப்பு வரம்பிற்கு வெளியே', ur: 'محفوظ دائرے سے باہر' },
  tierCaution: { en: 'Needs care', hi: 'सावधानी चाहिए', mr: 'सावधानता लागते', ta: 'கவனம் தேவை', ur: 'احتیاط چاہیے' },
  tierProceed: { en: 'Consumer matter', hi: 'उपभोक्ता मामला', mr: 'ग्राहक बाब', ta: 'நுகர்வோர் விஷயம்', ur: 'کسٹمر معاملہ' },
  langLabel: { en: 'Language', hi: 'भाषा', mr: 'भाषा', ta: 'மொழி', ur: 'زبان' },
  themeLabel: { en: 'Theme', hi: 'थीम', mr: 'थीम', ta: 'தீம்', ur: 'تھیم' },
  back: { en: 'Back', hi: 'वापस', mr: 'मागे', ta: 'பின்செல்', ur: 'واپس' },
  openNotice: { en: 'Open demand notice', hi: 'माँग-पत्र खोलें', mr: 'मागणी-पत्र उघडा', ta: 'கோரிக்கை அறிவிப்பைத் திற', ur: 'مطالبہ نوٹس کھولیں' },
  noticeReviewTitle: { en: 'Review every detail', hi: 'हर विवरण जाँचें', mr: 'प्रत्येक तपशील तपासा', ta: 'ஒவ்வொரு விவரத்தையும் சரிபார்', ur: 'ہر تفصیل جانچیں' },
  noticeConsent: { en: 'I have read and checked every detail', hi: 'मैंने हर विवरण पढ़ और जाँच लिया है', mr: 'मी प्रत्येक तपशील वाचून तपासला आहे', ta: 'ஒவ்வொரு விவரத்தையும் படித்து சரிபார்த்தேன்', ur: 'میں نے ہر تفصیل پڑھ اور جانچ لی ہے' },
  noticePrepare: { en: 'Prepare final notice', hi: 'अंतिम पत्र तैयार करें', mr: 'अंतिम पत्र तयार करा', ta: 'இறுதி அறிவிப்பைத் தயார் செய்', ur: 'حتمی نوٹس تیار کریں' },
  noticeFinalTitle: { en: 'Your demand notice', hi: 'आपका माँग-पत्र', mr: 'तुमचे मागणी-पत्र', ta: 'உங்கள் கோரிக்கை அறிவிப்பு', ur: 'آپ کا مطالبہ نوٹس' },
  noticeCopyAll: { en: 'Copy notice', hi: 'पत्र कॉपी करें', mr: 'पत्र कॉपी करा', ta: 'அறிவிப்பை நகலெடு', ur: 'نوٹس کاپی کریں' },
  cautionTitle: { en: 'Time limits may apply', hi: 'समय-सीमा लागू हो सकती है', mr: 'वेळेची मर्यादा लागू असू शकते', ta: 'காலக்கெடு பொருந்தலாம்', ur: 'وقت کی حد لاگو ہو سکتی ہے' },
  restatePrefix: { en: 'So far I understand:', hi: 'अब तक मैं समझा हूँ:', mr: 'आतापर्यंत मला समजले:', ta: 'இதுவரை நான் புரிந்துகொண்டது:', ur: 'اب تک میں سمجھا:' },
  qWhen: { en: 'When did you buy it?', hi: 'आपने यह कब खरीदा?', mr: 'तुम्ही हे केव्हा विकत घेतले?', ta: 'இதை எப்போது வாங்கினீர்கள்?', ur: 'آپ نے یہ کب خریدا؟' },
  // deep-audit 2026-10-27: was "लग्नच्या" (= of the wedding) — wrong word
  ans30: { en: 'Within 30 days', hi: 'पिछले 30 दिनों में', mr: 'गेल्या 30 दिवसांत', ta: 'கடந்த 30 நாட்களில்', ur: 'پچھلے 30 دنوں میں' },
  ans1to2: { en: '1 to 2 years ago', hi: '1–2 साल पहले', mr: '1–2 वर्षांपूर्वी', ta: '1–2 ஆண்டுகளுக்கு முன்', ur: '1–2 سال پہلے' },
  ans2plus: { en: 'More than 2 years ago', hi: '2 साल से पहले', mr: '2 वर्षांहून अधिक पूर्वी', ta: '2 ஆண்டுகளுக்கு முன்', ur: '2 سال سے پہلے' },
  ansNotSure: { en: 'Not sure', hi: 'याद नहीं', mr: 'आठवत नाही', ta: 'நினைவில்லை', ur: 'یاد نہیں' },
  tabHome: { en: 'Home', hi: 'होम', mr: 'होम', ta: 'முகப்பு', ur: 'ہوم' },
  tabHistory: { en: 'History', hi: 'इतिहास', mr: 'इतिहास', ta: 'வரலாறு', ur: 'تاریخ' },
  tabSaved: { en: 'Saved', hi: 'सेव किए', mr: 'सेव्ह केले', ta: 'சேமித்தவை', ur: 'محفوظ' },
  tabProfile: { en: 'Profile', hi: 'प्रोफ़ाइल', mr: 'प्रोफाइल', ta: 'சுயவிவரம்', ur: 'پروفائل' },
  navLabel: { en: 'Main navigation', hi: 'मुख्य नेविगेशन', mr: 'मुख्य नेव्हिगेशन', ta: 'முதன்மை வழிசெலுத்தல்', ur: 'مینی نیویگیشن' },
  speakCta: { en: 'Tap to speak', hi: 'बोलने के लिए दबाएँ', mr: 'बोलण्यासाठी दाबा', ta: 'பேச தட்டவும்', ur: 'بولنے کے لیے دبائیں' },
  langHint: { en: 'Hindi, English or any Indian language', hi: 'हिन्दी, अंग्रेज़ी या कोई भी भारतीय भाषा', mr: 'हिंदी, इंग्रजी किंवा कोणतीही भारतीय भाषा', ta: 'இந்தி, ஆங்கிலம் அல்லது எந்த இந்திய மொழி', ur: 'ہندی، انگریزی یا کوئی بھی ہندوستانی زبان' },
  addNotice: { en: 'Add a notice', hi: 'नोटिस जोड़ें', mr: 'जाहीरनामा जोडा', ta: 'அறிவிப்பைச் சேர்க்க', ur: 'نوٹس لگائیں' },
  addNoticeSub: { en: 'Upload or take a photo', hi: 'अपलोड करें या फ़ोटो लें', mr: 'अपलोड करा किंवा फोटो घ्या', ta: 'பதிவேற்றவும் அல்லது புகைப்படம்', ur: 'اپلوڈ کریں یا تصویر لیں' },
  typeInstead: { en: 'Type instead', hi: 'टाइप करें', mr: 'टाइप करा', ta: 'தட்டச்சு செய்யவும்', ur: 'ٹائپ کریں' },
  typeInsteadSub: { en: 'Open text chat', hi: 'टेक्स्ट चैट खोलें', mr: 'टेक्स्ट चॅट उघडा', ta: 'உரை அரட்டையைத் திற', ur: 'ٹیکسٹ چیٹ کھولیں' },
  listening: { en: 'Listening…', hi: 'सुन रहा हूँ…', mr: 'ऐकत आहे…', ta: 'கேட்கிறேன்…', ur: 'سن رہا ہوں…' },
  speakNaturally: { en: 'You can speak naturally in Hindi, English or any Indian language.', hi: 'आप हिन्दी, अंग्रेज़ी या किसी भी भारतीय भाषा में सहज रूप से बोल सकते हैं।', mr: 'तुम्ही हिंदी, इंग्रजी किंवा कोणत्याही भारतीय भाषेत नैसर्गिकरित्या बोलू शकता.', ta: 'இந்தி, ஆங்கிலம் அல்லது எந்த இந்திய மொழியிலும் இயல்பாகப் பேசலாம்.', ur: 'آپ ہندی، انگریزی یا کسی بھی ہندوستانی زبان میں قدرتی انداز میں بول سکتے ہیں۔' },
  tapToStop: { en: 'Tap to stop', hi: 'रोकने के लिए दबाएँ', mr: 'थांबवण्यासाठी दाबा', ta: 'நிறுத்த தட்டவும்', ur: 'روکنے کے لیے دبائیں' },
  heardTitle: { en: 'Here’s what I heard', hi: 'मैंने यह सुना', mr: 'मी असे ऐकले', ta: 'இதைக் கேட்டேன்', ur: 'میں نے یہ سنا' },
  heardSub: { en: 'You can edit this before sending.', hi: 'भेजने से पहले आप इसे संपादित कर सकते हैं।', mr: 'पाठवण्यापूर्वी तुम्ही इट संपादित करू शकता.', ta: 'அனுப்புவதற்கு முன் இதைத் திருத்தலாம்.', ur: 'بھیجنے سے پہلے آپ اسے ترمیم کر سکتے ہیں۔' },
  detectedLang: { en: 'Detected language', hi: 'पहचानी गई भाषा', mr: 'ओळखलेली भाषा', ta: 'கண்டறிந்த மொழி', ur: 'شناخت شدہ زبان' },
  addDetails: { en: 'Add more details (optional)', hi: 'और विवरण जोड़ें (वैकल्पिक)', mr: 'अधिक तपशील जोडा (ऐच्छिक)', ta: 'கூடுதல் விவரங்கள் (விருப்பம்)', ur: 'مزید تفصیلات (اختیاری)' },
  addFilePhoto: { en: 'Add a file / photo', hi: 'फ़ाइल / फ़ोटो जोड़ें', mr: 'फाइल / फोटो जोडा', ta: 'கோப்பு / புகைப்படம்', ur: 'فائل / تصویر لگائیں' },
  addLocation: { en: 'Add location', hi: 'स्थान जोड़ें', mr: 'स्थान जोडा', ta: 'இடத்தைச் சேர்க்க', ur: 'مقام لگائیں' },
  specifyDate: { en: 'Specify date', hi: 'तारीख़ बताएँ', mr: 'तारीख सांगा', ta: 'தேதியைக் குறி', ur: 'تاریخ متعین کریں' },
  sendToLokai: { en: 'Send to LokAI', hi: 'LokAI को भेजें', mr: 'LokAI ला पाठवा', ta: 'LokAI-க்கு அனுப்பு', ur: 'LokAI کو بھیجیں' },
  simulatedVoiceNote: { en: 'Voice is simulated in this prototype — nothing is recorded.', hi: 'इस प्रोटोटाइप में आवाज़ अनुकरित है — कुछ भी रिकॉर्ड नहीं होता।', mr: 'या प्रोटोटाइपमध्ये आवाज नक्कली आहे — काहीही रेकॉर्ड होत नाही.', ta: 'இந்த மாதிரியில் குரல் உருவகம் — எதுவும் பதிவு செய்யப்படவில்லை.', ur: 'اس پروٹوٹائپ میں آواز نقل ہے — کچھ بھی ریکارڈ نہیں ہوتا۔' },
  noticeMeaning: { en: 'Here’s what this means', hi: 'इसका मतलब यह है', mr: 'याचा अर्थ असा', ta: 'இதன் பொருள் இதுவாகும்', ur: 'اس کا مطلب یہ ہے' },
  keyPoints: { en: 'Key points from your notice', hi: 'आपके नोटिस के मुख्य बिंदु', mr: 'तुमच्या जाहीरनाम्यातील मुद्दे', ta: 'உங்கள் அறிவிப்பின் முக்கிய குறிப்புகள்', ur: 'آپ کے نوٹس کے اہم نکات' },
  whatNext: { en: 'What you can do next', hi: 'आप आगे क्या कर सकते हैं', mr: 'पुढे तुम्ही काय करू शकता', ta: 'அடுத்து நீங்கள் என்ன செய்யலாம்', ur: 'آگے آپ کیا کر سکتے ہیں' },
  sourcesLabel: { en: 'Sources', hi: 'स्रोत', mr: 'स्रोत', ta: 'மூலங்கள்', ur: 'ذرائع' },
  viewAll: { en: 'View all', hi: 'सभी देखें', mr: 'सर्व पहा', ta: 'அனைத்தையும் காண்க', ur: 'سب دیکھیں' },
  readOriginal: { en: 'Read the original notice', hi: 'मूल नोटिस पढ़ें', mr: 'मूळ जाहीरनामा वाचा', ta: 'மூல அறிவிப்பைப் படி', ur: 'اصل نوٹس پڑھیں' },
  historyTitle: { en: 'History', hi: 'इतिहास', mr: 'इतिहास', ta: 'வரலாறு', ur: 'تاریخ' },
  savedTitle: { en: 'Saved', hi: 'सेव किए', mr: 'सेव्ह केले', ta: 'சேமித்தவை', ur: 'محفوظ' },
  emptyHistory: { en: 'Conversations you start will appear here.', hi: 'आपकी शुरू की गई बातचीत यहाँ दिखेगी।', mr: 'तुम्ही सुरू केलेली संभाषणे इथे दिसतील.', ta: 'நீங்கள் தொடங்கும் உரையாடல்கள் இங்கே தோன்றும்.', ur: 'آپ کی شروع کی گفتگو یہاں نظر آئے گی۔' },
  emptySaved: { en: 'Save a finding or a draft and it will be here.', hi: 'कोई निष्कर्ष या ड्राफ़्ट सेव करें, वह यहाँ आएगा।', mr: 'एखादा निष्कर्ष किंवा मसुदा सेव्ह करा, तो इथे येईल.', ta: 'ஒரு கண்டுபிடிப்பையோ வரைவையோ சேமித்தால் இங்கே வரும்.', ur: 'کوئی نتیجہ یا مسودہ محفوظ کریں، وہ یہاں آئے گا۔' },
  privacyTitle: { en: 'Privacy', hi: 'गोपनीयता', mr: 'गोपनीयता', ta: 'தனியுரிமை', ur: 'رازداری' },
  privacyBody: { en: 'Legal conversations are sensitive. This prototype stores everything only on this device — nothing is sent anywhere.', hi: 'कानूनी बातचीत संवेदनशील होती है। यह प्रोटोटाइप सब कुछ केवल इसी डिवाइस पर रखता है — कुछ भी कहीं नहीं भेजा जाता।', mr: 'कायदेशीर संभाषणे संवेदनशील असतात. हे प्रोटोटाइप सर्व काही फक्त याच उपकरणावर ठेवते — काहीही कोठेतरी पाठवले जात नाही.', ta: 'சட்ட உரையாடல்கள் மிக முக்கியமானவை. இந்த மாதிரி எல்லாவற்றையும் இந்தச் சாதனத்தில் மட்டுமே வைக்கிறது — எதுவும் எங்கும் அனுப்பப்படுவதில்லை.', ur: 'قانونی گفتگو حساس ہوتی ہے۔ یہ پروٹوٹائپ سب کچھ صرف اسی ڈیوائس پر رکھتا ہے — کچھ بھی کہیں نہیں بھیجا جاتا۔' },
  whatStored: { en: 'What is stored', hi: 'क्या संग्रहीत है', mr: 'काय साठवले आहे', ta: 'என்ன சேமிக்கப்பட்டுள்ளது', ur: 'کیا محفوظ ہے' },
  storedBody: { en: 'Your conversations, uploaded documents (mock) and saved drafts — on this device only, until you delete them.', hi: 'आपकी बातचीत, अपलोड किए दस्तावेज़ (नमूना) और सेव किए ड्राफ़्ट — केवल इसी डिवाइस पर, जब तक आप न मिटाएँ।', mr: 'तुमची संभाषणे, अपलोड केलेले दस्तऐवज (नमुना) आणि सेव्ह केलेले मसुदे — फक्त याच उपकरणावर, जोपर्यंत तुम्ही डिलीट करत नाही.', ta: 'உங்கள் உரையாடல்கள், பதிவேற்றிய ஆவணங்கள் (போலி) மற்றும் சேமித்த வரைவுகள் — இந்தச் சாதனத்தில் மட்டுமே, நீங்கள் நீக்கும் வரை.', ur: 'آپ کی گفتگو، اپلوڈ شدہ دستاویزات (نمونہ) اور محفوظ مسودے — صرف اسی ڈیوائس پر، جب تک آپ حذف نہ کریں۔' },
  deleteAll: { en: 'Delete everything', hi: 'सब कुछ मिटाएँ', mr: 'सर्व काही डिलीट करा', ta: 'எல்லாவற்றையும் நீக்கு', ur: 'سب کچھ حذف کریں' },
  deleteAllConfirm: { en: 'Delete every conversation, document and saved draft on this device? This cannot be undone.', hi: 'इस डिवाइस पर हर बातचीत, दस्तावेज़ और सेव किया ड्राफ़्ट मिटाएँ? यह वापस नहीं आ सकता।', mr: 'या उपकरणावरील प्रत्येक संभाषण, दस्तऐवज आणि सेव्ह केलेला मसुदा डिलीट करायचा? हे परत येणार नाही.', ta: 'இந்தச் சாதனத்தில் உள்ள எல்லா உரையாடல்களையும் ஆவணங்களையும் சேமித்த வரைவுகளையும் நீக்கவா? இதை மீட்டல் முடியாது.', ur: 'اس ڈیوائس پر ہر گفتگو، دستاویز اور محفوظ مسودہ حذف کریں؟ یہ واپس نہیں آ سکتا۔' },
  deleteYes: { en: 'Yes, delete everything', hi: 'हाँ, सब मिटाएँ', mr: 'हो, सर्व डिलीट करा', ta: 'ஆம், எல்லாவற்றையும் நீக்கு', ur: 'ہاں، سب حذف کریں' },
  deleteNo: { en: 'Keep everything', hi: 'सब रखें', mr: 'सर्व ठेवा', ta: 'எல்லாம் வைத்திரு', ur: 'سب رکھیں' },
  profileNote: { en: 'Prototype — this profile is illustrative only.', hi: 'प्रोटोटाइप — यह प्रोफ़ाइल केवल उदाहरण है।', mr: 'प्रोटोटाइप — ही प्रोफाइल केवल उदाहरण आहे.', ta: 'மாதிரி — இந்த சுயவிவரம் எடுத்துக்காட்டு மட்டுமே.', ur: 'پروٹوٹائپ — یہ پروفائل صرف مثال ہے۔' },
  autoDetect: { en: 'Auto-detected', hi: 'स्वतः पहचाना', mr: 'स्वयं-ओळख', ta: 'தானாகக் கண்டறிதல்', ur: 'خود بخود شناخت' },
  profileLangsNote: {
    en: 'All 22 scheduled Indian languages are selectable. Core screens render in your language; the rest falls back to English rather than showing a wrong sentence.',
    hi: 'अनुसूचित सभी 22 भारतीय भाषाएँ चुनी जा सकती हैं। मुख्य स्क्रीन आपकी भाषा में आती हैं; बाकी ग़लत वाक्य दिखाने की बजाय अंग्रेज़ी में दिखता है।',
    mr: 'अनुसूचित सर्व २२ भारतीय भाषा निवडता येतात. मुख्य स्क्रीन तुमच्या भाषेत येतात; उर्वरित चुकीचे वाक्य दाखवण्याऐवजी इंग्रजीत दिसते.',
    ta: 'அட்டவணைப்படுத்தப்பட்ட அனைத்து 22 இந்திய மொழிகளும் தேர்வு செய்யப்படலாம். முக்கியத் திரைகள் உங்கள் மொழியில் வரும்; மீதி தவறான வாக்கியத்தைக் காட்டுவதற்குப் பதிலாக ஆங்கிலத்தில் வரும்.',
    ur: ' شیڈولڈ تمام 22 ہندوستانی زبانیں منتخب ہو سکتی ہیں۔ اہم اسکرینیں آپ کی زبان میں آتی ہیں؛ باقی غلط جملہ دکھانے کے بجائے انگریزی میں آتا ہے۔',
  },
  profileCoverageNote: {
    en: 'Dots mark languages still in draft (AI-drafted, not yet human-reviewed). Legal content stays in English until verified.',
    hi: 'बिंदु उन भाषाओं को दर्शाते हैं जो अभी ड्राफ़्ट में हैं (AI-निर्मित, मानव-समीक्षित नहीं)। कानूनी सामग्री जाँचे जाने तक अंग्रेज़ी में रहती है।',
    mr: 'बिंदू अशा भाषा दर्शवतात ज्या अजून मसुदा अवस्थेत आहेत (AI-निर्मित, मानव-तपासलेल्या नाहीत). कायदेशीर मजकूर तपासेपर्यंत इंग्रजीतच राहतो.',
    ta: 'புள்ளிகள் இன்னும் வரைவு நிலையில் உள்ள மொழிகளைக் குறிக்கின்றன (AI-உருவாக்கம், மனித-ஆய்வு இல்லை). சட்ட உள்ளடக்கம் சரிபார்க்கப்படும் வரை ஆங்கிலத்திலேயே இருக்கும்.',
    ur: 'نقطے ان زبانوں کو ظاہر کرتے ہیں جو ابھی مسودے میں ہیں (AI-ساخته، انسانی جانچے نہیں)۔ قانونی مواد جانچے جانے تک انگریزی میں رہتا ہے۔',
  },
  skip: { en: 'Skip', hi: 'छोड़ें', mr: 'वगळा', ta: 'தாண்டு', ur: 'چھوڑیں' },
  jumpToLatest: { en: 'Jump to latest', hi: 'नवीनतम पर जाएँ', mr: 'अखेरच्यापर्यंत', ta: 'சமீபத்திற்குச் செல்', ur: 'تازہ ترین پر جائیں' },
  factCheckTitle: { en: 'Did I get this right?', hi: 'क्या मैं सही समझा?', mr: 'बरोबर समजले का?', ta: 'சரியாகப் புரிந்ததா?', ur: 'کیا میں نے صحیح سمجھا؟' },
  factCheckSub: {
    en: 'Check each fact before I go further — you can correct any of them.',
    hi: 'आगे बढ़ने से पहले हर तथ्य जाँचें — आप कोई भी सुधार सकते हैं।',
    mr: 'पुढे जाण्यापूर्वी प्रत्येक वस्तुस्थिती तपासा — तुम्ही काहीही दुरुस्त करू शकता.',
    ta: 'மேலும் செல்வதற்கு முன் ஒவ்வொரு உண்மையையும் சரிபார்க்கவும் — எதையும் திருத்தலாம்.',
    ur: 'آگے بڑھنے سے پہلے ہر حقیقت جانچیں — آپ کوئی بھی درست کر سکتے ہیں۔',
  },
  factConfirm: { en: 'Yes, that’s right', hi: 'हाँ, सही है', mr: 'हो, बरोबर', ta: 'ஆம், சரி', ur: 'ہاں، درست ہے' },
  factCorrect: { en: 'Correct it', hi: 'सुधारें', mr: 'दुरुस्त करा', ta: 'திருத்து', ur: 'درست کریں' },
  handoverTitle: { en: 'Your handover packet', hi: 'आपका हैंडओवर पैकेट', mr: 'तुमचे हँडओव्हर पॅकेट', ta: 'உங்கள் கையளிப்புத் தொகுப்பு', ur: 'آپ کا ہینڈ اوور پیکٹ' },
  handoverWhat: { en: 'What to bring', hi: 'क्या साथ लें', mr: 'काय घेऊन जावे', ta: 'என்ன எடுத்துச் செல்லவும்', ur: 'کیا ساتھ لیں' },
  exhibitsLabel: { en: 'Exhibits', hi: 'साक्ष्य', mr: 'पुरावे', ta: 'ஆதாரங்கள்', ur: 'ثبوتات' },
  stagesLabel: { en: 'Progress', hi: 'प्रगति', mr: 'प्रगती', ta: 'முன்னேற்றம்', ur: 'پیش رفت' },
  noticeCardTitle: {
    en: 'I can read that notice with you',
    hi: 'मैं वह नोटिस आपके साथ पढ़ सकता हूँ',
    mr: 'ते जाहीरनामा मी तुमच्यासोबत वाचू शकतो',
    ta: 'அந்த அறிவிப்பை உங்களுடன் படிக்கிறேன்',
    ur: 'میں وہ نوٹس آپ کے ساتھ پڑھ سکتا ہوں',
  },
  noticeCardBody: {
    en: 'The notice interpreter explains what it says, line by line, in your language. It does not tell you whether to dispute it — that is a human decision.',
    hi: 'नोटिस व्याख्याकार बताता है कि उसमें क्या लिखा है, पंक्ति-दर-पंक्ति, आपकी भाषा में। वह यह नहीं बताता कि विवाद करें या नहीं — यह मानवीय निर्णय है।',
    mr: 'जाहीरनामा वाचक सांगतो की त्यात काय लिहिले आहे, ओळीनुसार, तुमच्या भाषेत. वाद करायचा की नाही हे तो सांगत नाही — तो मानवी निर्णय आहे.',
    ta: 'அறிவிப்பு விளக்கி என்ன எழுதியுள்ளது என்பதை வரிவாரியாக, உங்கள் மொழியில் சொல்லும். தகராறு செய்யவேண்டுமா என்று அது சொல்லாது — அது மனிதரின் முடிவு.',
    ur: 'نوٹس مفسر بتاتا ہے کہ اس میں کیا لکھا ہے، سطر بہ سطر، آپ کی زبان میں۔ وہ یہ نہیں بتاتا کہ تنازع کریں یا نہیں — وہ انسانی فیصلہ ہے۔',
  },
  noticeCardOpen: {
    en: 'Open the notice interpreter',
    hi: 'नोटिस व्याख्याकार खोलें',
    mr: 'जाहीरनामा वाचक उघडा',
    ta: 'அறிவிப்பு விளக்கியைத் திற',
    ur: 'نوٹس مفسر کھولیں',
  },
  listen: { en: 'Listen', hi: 'सुनें', mr: 'ऐका', ta: 'கேளுங்கள்', ur: 'سنیں' },
  protectHelp: {
    en: 'If you are in immediate danger, contact human help first:',
    hi: 'अगर तुरंत ख़तरा है, तो पहले इंसानी मदद से संपर्क करें:',
    mr: 'तात्काळ धोका असल्यास, आधी मानवी मदतीशी संपर्क करा:',
    ta: 'உடனடி ஆபத்து இருந்தால், முதலில் மனித உதவியைத் தொடர்பு கொள்ளுங்கள்:',
    ur: 'اگر فوری خطرہ ہے، تو پہلے انسانی مدد سے رابطہ کریں:',
  },
  protectPolice: { en: 'Emergency 112', hi: 'आपातकाल 112', mr: 'आपत्कालीन 112', ta: 'அவசரம் 112', ur: 'ایمرجنسی 112' },
  protectDlsa: { en: 'Free legal aid (DLSA)', hi: 'मुफ़्त कानूनी सहायता (DLSA)', mr: 'मोफत कायदेशीर मदत (DLSA)', ta: 'இலவச சட்ட உதவி (DLSA)', ur: 'مفت قانونی امداد (DLSA)' },
  protectGuide: {
    en: 'Open the full safety guide',
    hi: 'पूरी सुरक्षा गाइड खोलें',
    mr: 'संपूर्ण सुरक्षा मार्गदर्शक उघडा',
    ta: 'முழு பாதுகாப்பு வழிகாட்டியைத் திற',
    ur: 'مکمل حفاظتی گائیڈ کھولیں',
  },
  replayWatch: { en: 'Watch a replay', hi: 'रीप्ले देखें', mr: 'रीप्ले पहा', ta: 'மறுஇயக்கத்தைப் பார்', ur: 'ریپلے دیکھیں' },
  replayBadge: { en: 'Replay', hi: 'रीप्ले', mr: 'रीप्ले', ta: 'மறுஇயக்கம்', ur: 'ریپلے' },
  replayHint: {
    en: 'A scripted conversation with simulated human actions — this is how LokAI behaves. Nothing is live.',
    hi: 'अनुकरित इंसानी क्रियाओं के साथ एक तैयार बातचीत — LokAI ऐसे व्यवहार करता है। कुछ भी लाइव नहीं है।',
    mr: 'नक्कली मानवी कृतींसह एक तयार संभाषण — LokAI असे वागते. काहीही थेट नाही.',
    ta: 'உருவகப்படுத்திய மனித செயல்களுடன் ஒரு தயாரிக்கப்பட்ட உரையாடல் — LokAI இப்படியே நடக்கிறது. எதுவும் நேரடியானது அல்ல.',
    ur: 'نقل شدہ انسانی حرکات کے ساتھ ایک تیار گفتگو — LokAI ایسے ہی برتاؤ کرتا ہے۔ کچھ بھی لائیو نہیں۔',
  },
  replayPlay: { en: 'Play', hi: 'चलाएँ', mr: 'चालवा', ta: 'இயக்கு', ur: 'چلائیں' },
  replayPause: { en: 'Pause', hi: 'रोकें', mr: 'थांबवा', ta: 'இடைநிறுத்து', ur: 'روکیں' },
  replayRestart: { en: 'Restart', hi: 'फिर से', mr: 'पुन्हा सुरू', ta: 'மீண்டும் தொடங்கு', ur: 'دوبارہ شروع' },
  replayFinished: {
    en: 'Replay finished — restart to watch again.',
    hi: 'रीप्ले पूरा हुआ — दोबारा देखने के लिए फिर से चलाएँ।',
    mr: 'रीप्ले पूर्ण — पुन्हा पाहण्यासाठी पुन्हा सुरू करा.',
    ta: 'மறுஇயக்கம் முடிந்தது — மீண்டும் பார்க்க மீண்டும் தொடங்குங்கள்.',
    ur: 'ریپلے مکمل — دوبارہ دیکھنے کے لیے دوبارہ چلائیں۔',
  },
  step1Sub: { en: '₹0 · 10 minutes · lowest risk', hi: '₹0 · 10 मिनट · सबसे कम जोखिम', mr: '₹0 · 10 मिनिटे · सर्वात कमी धोका', ta: '₹0 · 10 நிமிடங்கள் · மிகக் குறைந்த ஆபத்து', ur: '₹0 · 10 منٹ · سب سے کم خطرہ' },
  step2Sub: { en: 'free · official channel', hi: 'मुफ़्त · सरकारी चैनल', mr: 'मोफत · अधिकृत मार्ग', ta: 'இலவசம் · அரசு வழி', ur: 'مفت · سرکاری ذریعہ' },
  step3Sub: { en: 'strongest step · mistakes cost most here', hi: 'सबसे बड़ा कदम · यहाँ ग़लती सबसे महँगी', mr: 'सर्वात मोठे पाऊल · येथे चूक सर्वात महाग', ta: 'மிக வலுவான படி · தவறு மிகவும் செலவாகும்', ur: 'سب سے بڑا قدم · غلطی یہاں سب سے مہنگی' },
  whatsappHint: {
    en: 'Edit anything before you send it. Nothing leaves your phone until you paste it into WhatsApp yourself.',
    hi: 'भेजने से पहले कुछ भी बदलें। स्वयं WhatsApp में पेस्ट करने तक कुछ भी आपके फ़ोन से बाहर नहीं जाता।',
    mr: 'पाठवण्यापूर्वी काहीही बदला. तुम्ही स्वतः WhatsApp मध्ये पेस्ट करेपर्यंत काहीही तुमच्या फोनबाहेर जात नाही.',
    ta: 'அனுப்புவதற்கு முன் எதையும் திருத்துங்கள். நீங்களே WhatsApp-இல் ஒட்டும் வரை எதுவும் உங்கள் போனிலிருந்து வெளியே போகாது.',
    ur: 'بھیجنے سے پہلے کچھ بھی تبدیل کریں۔ آپ کے خود واٹس ایپ میں پیسٹ کرنے تک کچھ بھی آپ کے فون سے باہر نہیں جاتا۔',
  },
  haveReady: { en: 'Have this ready before you call:', hi: 'कॉल से पहले यह तैयार रखें:', mr: 'कॉलआधी हे तयार ठेवा:', ta: 'அழைக்கும் முன் இதைத் தயாராக வையுங்கள்:', ur: 'کال سے پہلے یہ تیار رکھیں:' },
  prepItem1: { en: 'Your bill or order confirmation', hi: 'आपका बिल या ऑर्डर पुष्टि', mr: 'तुमचे बिल किंवा ऑर्डर पुष्टीकरण', ta: 'உங்கள் பில் அல்லது ஆர்டர் உறுதிப்பாடு', ur: 'آپ کا بل یا آرڈر تصدیق' },
  prepItem2: { en: 'Photos of the damaged item', hi: 'क्षतिग्रस्त वस्तु की फ़ोटो', mr: 'खराझालेल्या वस्तूचे छायाचित्र', ta: 'சேதமடைந்த பொருளின் புகைப்படங்கள்', ur: 'خراب چیز کی تصویریں' },
  prepItem3: { en: 'Dates: purchase, delivery, and the refused call', hi: 'तारीख़ें: खरीद, डिलीवरी और मना की कॉल', mr: 'तारखा: खरेदी, डिलिव्हरी आणि नाकारलेला कॉल', ta: 'தேதிகள்: வாங்கியது, வந்தது, மறுத்த அழைப்பு', ur: 'تاریخیں: خریداری، ڈیلیوری، انکار کی کال' },
  prepItem4: { en: 'What you are asking for: refund or replacement', hi: 'आप क्या माँग रहे हैं: रिफंड या रिप्लेसमेंट', mr: 'तुम्ही काय मागत आहात: पैसे परत की बदली', ta: 'நீங்கள் கேட்பது: பணம் திரும்பவா, மாற்றா?', ur: 'آپ کیا مانگ رہے ہیں: رقم واپسی یا تبدیلی' },
  badgeFree: { en: 'free', hi: 'मुफ़्त', mr: 'मोफत', ta: 'இலவசம்', ur: 'مفت' },
  ladderBanner: {
    en: 'This is the step where mistakes cost most. Open the draft, check every detail, and only confirm when you are sure. A human helper can review it with you first.',
    hi: 'यह वह कदम है जहाँ ग़लती सबसे महँगी पड़ती है। ड्राफ़्ट खोलें, हर विवरण जाँचें, और पक्के होने पर ही पक्का करें। कोई मानव सहायक पहले आपके साथ जाँच सकता है।',
    mr: 'हे ते पाऊल आहे जिथे चूक सर्वात महाग पडते. मसुदा उघडा, प्रत्येक तपशील तपासा आणि खात्री झाल्यावरच निश्चित करा. मानवी मदतनीस आधी तुमच्यासोबत तपासू शकतो.',
    ta: 'தவறு மிகவும் செலவாகும் படி இதுவே. வரைவைத் திறந்து ஒவ்வொரு விவரத்தையும் சரிபார்த்து, உறுதியானபின் மட்டும் உறுதிசெய்யுங்கள். ஒரு மனித உதவியாளர் முதலில் உங்களுடன் பார்க்கலாம்.',
    ur: 'یہ وہ قدم ہے جہاں غلطی سب سے مہنگی پڑتی ہے۔ مسودہ کھولیں، ہر تفصیل جانچیں، اور یقین ہونے پر ہی تصدیق کریں۔ کوئی انسانی مددگار پہلے آپ کے ساتھ دیکھ سکتا ہے۔',
  },
  ladderPausedNote: {
    en: 'The formal notice step is paused until your dates are checked — it is the step where mistakes cost most.',
    hi: 'औपचारिक पत्र वाला कदम तब तक रुका है जब तक आपकी तारीख़ें जाँची न जाएँ — यही वह कदम है जहाँ ग़लती सबसे महँगी है।',
    mr: 'तुमच्या तारखा तपासेपर्यंत औपचारिक नोटीसचे पाऊल थांबवले आहे — याच ठिकाणी चूक सर्वात महाग पडते.',
    ta: 'உங்கள் தேதிகள் சரிபார்க்கப்படும் வரை முறையான அறிவிப்புப் படி நிறுத்தப்பட்டுள்ளது — தவறு மிகவும் செலவாகும் படி இதுவே.',
    ur: 'آپ کی تاریخیں جانچنے تک رسمی نوٹس کا قدم روک دیا گیا ہے — غلطی یہیں سب سے مہنگی پڑتی ہے۔',
  },
  chipItConsumer: { en: 'It is a consumer purchase', hi: 'यह उपभोक्ता खरीद है', mr: 'ही ग्राहक खरेदी आहे', ta: 'இது நுகர்வோர் வாங்கல்', ur: 'یہ صارف خریداری ہے' },
  chipItOfficial: { en: 'It is about an official notice', hi: 'यह किसी सरकारी नोटिस के बारे में है', mr: 'हा शासकीय जाहीरनाम्याविषयी आहे', ta: 'இது அரசு அறிவிப்பு பற்றியது', ur: 'یہ کسی سرکاری نوٹس کے بارے میں ہے' },
  pickClosest: { en: 'What is this closest to?', hi: 'यह किसके सबसे करीब है?', mr: 'याशी सर्वात जुळणारे काय?', ta: 'இது எதற்கு அதிகம் நெருங்கியது?', ur: 'یہ کس کے سب سے قریب ہے؟' },
  noticeReviewBanner: {
    en: 'Every field is editable and every mistake is yours to catch — that is why this screen exists. Check names, dates, amounts and the order number letter by letter.',
    hi: 'हर विवरण बदला जा सकता है और हर ग़लती पकड़ना आपका काम है — इसीलिए यह स्क्रीन है। नाम, तारीख़ें, रकमें और ऑर्डर नंबर अक्षर-दर-अक्षर जाँचें।',
    mr: 'प्रत्येक तपशील बदलता येतो आणि प्रत्येक चूक पकडणे तुमचेच काम आहे — म्हणूनच हे स्क्रीन आहे. नावे, तारखा, रक्कमा व ऑर्डर क्रमांक अक्षरशः तपासा.',
    ta: 'ஒவ்வொரு விவரத்தையும் திருத்தலாம், ஒவ்வொரு தவறையும் நீங்களே பிடிக்க வேண்டும் — அதற்கே இந்தத் திரை. பெயர்கள், தேதிகள், தொகைகள், ஆர்டர் எண்ணை எழுத்துவாரியாகச் சரிபார்க்கவும்.',
    ur: 'ہر تفصیل تبدیل ہو سکتی ہے اور ہر غلطی پکڑنا آپ کا کام ہے — اسی لیے یہ اسکرین ہے۔ نام، تاریخیں، رقوم اور آرڈر نمبر حرف بہ حرف جانچیں۔',
  },
  noticeSendHint: {
    en: 'Copy it, paste it into a document, print on plain paper, and send by registered post with ACKNOWLEDGEMENT DUE — keep the receipt.',
    hi: 'इसे कॉपी करें, किसी दस्तावेज़ में पेस्ट करें, सादे काग़ज़ पर प्रिंट करें और पावती-सह रजिस्टर्ड डाक से भेजें — पावती संभाल कर रखें।',
    mr: 'कॉपी करा, दस्तऐवजात पेस्ट करा, साध्या कागदावर प्रिंट करा आणि पावतीसह नोंदणीकृत पोस्टाने पाठवा — पावती जपून ठेवा.',
    ta: 'நகலெடுத்து ஆவணத்தில் ஒட்டி, சாதாரண காகிதத்தில் அச்சிட்டு, அறிவிப்பு-விதிப்படி பதிவு அஞ்சலில் அனுப்புங்கள் — ரசீதை வைத்திருங்கள்.',
    ur: 'کاپی کریں، کسی دستاویز میں پیسٹ کریں، سادہ کاغذ پر پرنٹ کریں اور رسید سمیت رجسٹرڈ پوسٹ سے بھیجیں — رسید محفوظ رکھیں۔',
  },
  noticeExplainer: {
    en: 'This reading explains what the notice says — it does not tell you whether to pay or dispute. For a dispute, talk to a human helper first.',
    hi: 'यह पठन बताता है कि नोटिस में क्या लिखा है — यह नहीं बताता कि भुगतान करें या विवाद। विवाद के लिए पहले किसी मानव सहायक से बात करें।',
    mr: 'हे वाचन सांगते की जाहीरनाम्यात काय लिहिले आहे — भरावे की वाद करावा ते सांगत नाही. वादासाठी आधी मानवी मदतनीसाशी बोला.',
    ta: 'இந்த வாசிப்பு அறிவிப்பில் என்ன உள்ளது என்பதை விளக்குகிறது — கட்டவா, தகராறு செய்யவா என்று சொல்லாது. தகராறுக்கு முதலில் ஒரு மனித உதவியாளரிடம் பேசுங்கள்.',
    ur: 'یہ پڑھائی بتاتی ہے کہ نوٹس میں کیا لکھا ہے — یہ نہیں بتاتی کہ ادا کریں یا تنازع کریں۔ تنازع کے لیے پہلے کسی انسانی مددگار سے بات کریں۔',
  },
  sidebarTitle: { en: 'Case folders', hi: 'केस फ़ोल्डर', mr: 'बाब फोल्डर', ta: 'வழக்கு கோப்புறைகள்', ur: 'کیس فولڈر' },
  sidebarHint: { en: 'Each case keeps its own memory, days and documents.', hi: 'हर केस की अपनी स्मृति, अपने दिन और अपने दस्तावेज़ होते हैं।', mr: 'प्रत्येक बाबेची स्वतःची स्मृती, दिवस व दस्तऐवज असतात.', ta: 'ஒவ்வொரு வழக்கிற்கும் அதன் சொந்த நினைவு, நாட்கள், ஆவணங்கள் உண்டு.', ur: 'ہر کیس کی اپنی یادداشت، اپنے دن اور اپنے دستاویزات ہوتے ہیں۔' },
  caseDaysLabel: { en: 'Day chats', hi: 'दिनवार बातचीत', mr: 'दिवसानुसार संभाषणे', ta: 'நாள்வாரி உரையாடல்கள்', ur: 'روزوار گفتگو' },
  newDayChat: { en: '+ New day chat in this case', hi: '+ इस केस में नई दिन-चैट', mr: '+ या बाबेत नवीन दिवस-संभाषण', ta: '+ இந்த வழக்கில் புதிய நாள் உரையாடல்', ur: '+ اس کیس میں نئی دن-گفتگو' },
  caseMemory: { en: 'Case memory', hi: 'केस स्मृति', mr: 'बाब स्मृती', ta: 'வழக்கு நினைவு', ur: 'کیس یادداشت' },
  caseSampleNote: { en: 'Prepared sample history — scripted, no live AI. New day chats inherit this memory.', hi: 'तैयार नमूना इतिहास — स्क्रिप्टेड, कोई लाइव AI नहीं। नई दिन-चैट यही स्मृति आगे ले जाती है।', mr: 'तयार नमुना इतिहास — स्क्रिप्टेड, लाइव AI नाही. नवीन दिवस-संभाषण हीच स्मृती पुढे नेते.', ta: 'தயார் செய்யப்பட்ட மாதிரி வரலாறு — ஸ்கிரிப்ட், நேரடி AI இல்லை. புதிய நாள் உரையாடல் இந்த நினைவை முன்வைக்கும்.', ur: 'تیار نمونہ تاریخ — اسکرپٹڈ، کوئی لائیو AI نہیں۔ نئی دن-گفتگو یہی یادداشت آگے لے جاتی ہے۔' },
  quickSummarise: { en: '✦ Quick summarise thread', hi: '✦ थ्रेड का त्वरित सार', mr: '✦ थ्रेडचा झटपट सारांश', ta: '✦ நூலின் விரைவுச் சுருக்கம்', ur: '✦ گفتگو کا فوری خلاصہ' },
  summaryGrievance: { en: 'The grievance', hi: 'शिकायत', mr: 'तक्रार', ta: 'புகார்', ur: 'شکایت' },
  summaryStanding: { en: 'Legal standing', hi: 'कानूनी स्थिति', mr: 'कायदेशीर स्थान', ta: 'சட்ட நிலை', ur: 'قانونی حیثیت' },
  summaryNext: { en: 'Last action & next move', hi: 'आख़िरी कदम और अगला कदम', mr: 'शेवटचे पाऊल व पुढचे पाऊल', ta: 'கடைசி படி & அடுத்த படி', ur: 'آخری قدم اور اگلا قدم' },
  continuityTitle: { en: 'Where we left off', hi: 'जहाँ हम छोड़ गए थे', mr: 'आपण जिथे थांबलो होतो', ta: 'நாம் நின்ற இடம்', ur: 'جہاں ہم رکے تھے' },
  contChip1: { en: 'They didn’t reply — move to Step 2 (1915 helpline)', hi: 'जवाब नहीं आया — चरण 2 (1915 हेल्पलाइन) पर जाएँ', mr: 'उत्तर आले नाही — पायरी 2 (1915 हेल्पलाइन) कडे जा', ta: 'பதில் இல்லை — படி 2 (1915 உதவி எண்) செல்', ur: 'جواب نہیں آیا — مرحلہ 2 (1915 ہیلپ لائن) پر جائیں' },
  contChip2: { en: 'They replied with a rejection — help me counter it', hi: 'जवाब में मनाही है — जवाबी तैयार करें', mr: 'उत्तरात नकार आहे — प्रत्युत्तर तयार करा', ta: 'பதில் மறுப்பாக உள்ளது — எதிர்ப்பைத் தயார் செய்', ur: 'جواب میں انکار ہے — جوابی تیار کریں' },
  contChip3: { en: 'They agreed to refund! Close this case', hi: 'उन्होंने रिफंड मान लिया! केस बंद करें', mr: 'त्यांनी परतावा मान्य केला! बाब बंद करा', ta: 'பணம் திரும்ப ஒப்பினார்கள்! வழக்கை மூடு', ur: 'انہوں نے رقم واپسی مان لی! کیس بند کریں' },
  continueDay: { en: 'Continue', hi: 'आगे बढ़ें', mr: 'पुढे जा', ta: 'தொடர்', ur: 'جاری رکھیں' },
  caseBadgeAria: { en: 'Active case', hi: 'सक्रिय केस', mr: 'सक्रिय बाब', ta: 'செயலில் வழக்கு', ur: 'فعال کیس' },
  sandboxTitle: { en: 'Test sandbox', hi: 'टेस्ट सैंडबॉक्स', mr: 'चाचणी सॅंडबॉक्स', ta: 'சோதனை மணல்பெட்டி', ur: 'ٹیسٹ سینڈ باکس' },
  tabScenarios: { en: 'Test yourself', hi: 'स्वयं जाँचें', mr: 'स्वतः चाचणी करा', ta: 'நீங்களே சோதியுங்கள்', ur: 'خود جانچیں' },
  tabReplays: { en: 'Replays', hi: 'रीप्ले', mr: 'रीप्ले', ta: 'மறுஇயக்கம்', ur: 'ریپلے' },
  tabInspector: { en: 'Inspector', hi: 'इंस्पेक्टर', mr: 'इन्स्पेक्टर', ta: 'ஆய்வு', ur: 'انسپکٹر' },
  scenarioLangLabel: { en: 'Test language', hi: 'जाँच भाषा', mr: 'चाचणी भाषा', ta: 'சோதனை மொழி', ur: 'جانچ زبان' },
  testerHint: { en: 'Pick a tester prompt — free typing works too.', hi: 'कोई टेस्टर प्रॉम्प्ट चुनें — सीधे टाइप भी कर सकते हैं।', mr: 'चाचणी प्रॉम्प्ट निवडा — थेट टाइपपण करू शकता.', ta: 'சோதனை தூண்டுதலைத் தேர்ந்தெடுங்கள் — நேரடியாகவும் தட்டச்சு செய்யலாம்.', ur: 'ٹیسٹر پرامپٹ چنیں — براہ راست ٹائپ بھی کر سکتے ہیں۔' },
  clarifyRailLabel: { en: 'Clarification replies', hi: 'स्पष्टीकरण के जवाब', mr: 'स्पष्टीकरण पर्याय', ta: 'விளக்கப் பதில்கள்', ur: 'وضاحت کے جوابات' },
  postFindingLabel: { en: 'What happens next?', hi: 'आगे क्या होगा?', mr: 'पुढे काय होते?', ta: 'அடுத்து என்ன நடக்கும்?', ur: 'آگے کیا ہوگا؟' },
  railSaveLater: { en: 'I sent the Step 1 message — log it and save this case', hi: 'मैंने चरण 1 का संदेश भेज दिया — दर्ज करें और केस सेव करें', mr: 'मी पायरी 1 चा संदेश पाठवला — नोंदवा आणि केस सेव्ह करा', ta: 'படி 1 செய்தியை அனுப்பிவிட்டேன் — பதிவு செய்து கேஸை சேமிக்கவும்', ur: 'میں نے مرحلہ 1 کا پیغام بھیج دیا — درج کریں اور کیس محفوظ کریں' },
  readFullDraft: { en: 'Read full draft', hi: 'पूरा मसौदा पढ़ें', mr: 'संपूर्ण मसुदा वाचा', ta: 'முழு வரைவைப் படிக்க', ur: 'پورا مسودہ پڑھیں' },
  hideFullDraft: { en: 'Show less', hi: 'कम दिखाएँ', mr: 'कमी दाखवा', ta: 'சுருக்கமாகக் காட்டு', ur: 'مختصر دکھائیں' },
  metaSave: { en: 'Logged locally', hi: 'डिवाइस पर दर्ज', mr: 'डिव्हाइसवर नोंद', ta: 'சாதனத்தில் பதிவு', ur: 'ڈیوائس پر درج' },
  metaEvidence: { en: 'Bills in hand', hi: 'बिल मौजूद', mr: 'बिले जवळ', ta: 'பில்கள் கையிருப்பு', ur: 'بل موجود' },
  metaVague: { en: 'Missing details', hi: 'जानकारी अधूरी', mr: 'तपशील अपूर्ण', ta: 'விவரங்கள் இல்லை', ur: 'تفصیلات نامکمل' },
  metaInformal: { en: 'No written agreement', hi: 'कोई लिखित समझौता नहीं', mr: 'लेखी करार नाही', ta: 'எழுத்து ஒப்பந்தம் இல்லை', ur: 'تحریری معاہدہ نہیں' },
  metaPushback: { en: 'Seller refused', hi: 'विक्रेता ने मना किया', mr: 'विक्रेत्याने नकारले', ta: 'விற்பவர் மறுத்தார்', ur: 'فروشنر نے انکار کیا' },
  metaThreat: { en: 'Feeling threatened', hi: 'धमकी महसूस हो रही है', mr: 'धमकी वाटतेय', ta: 'மிரட்டல் உணர்வு', ur: 'دھمکی محسوس ہو رہی ہے' },
  metaResolved: { en: 'It worked', hi: 'काम बन गया', mr: 'काम झाले', ta: 'வெற்றி', ur: 'کام بن گیا' },
  metaNotice: { en: 'Got an official notice', hi: 'सरकारी नोटिस आया', mr: 'शासकीय नोटीस आला', ta: 'அரசு அறிவிப்பு வந்தது', ur: 'سرکاری نوٹس آیا' },
  metaStop: { en: 'Immediate safety', hi: 'तुरंत सुरक्षा', mr: 'तात्काळ सुरक्षा', ta: 'உடனடி பாதுகாப்பு', ur: 'فوری تحفظ' },
  metaRails: { en: 'UPI payment dispute', hi: 'UPI भुगतान विवाद', mr: 'UPI पेमेंट वाद', ta: 'UPI பணப் பரிமாற்ற சிக்கல்', ur: 'UPI ادائیگی تنازعہ' },
  metaWorkplace: { en: 'Salary held back', hi: 'वेतन रोका गया', mr: 'पगार धरला', ta: 'சம்பளம் பிடித்தட்டப்பட்டது', ur: 'تنخواہ روکی گئی' },
  scn1Title: { en: 'Defective appliance, stonewalling support', hi: 'खराब उपकरण, बहाना करती सपोर्ट', mr: 'खराब उपकरण, टाळाटाळ करणारी सेवा', ta: 'பழுதான சாதனம், தாமதிக்கும் ஆதரவு', ur: 'خراب آلہ، بہانے کرتی سپورٹ' },
  scn2Title: { en: 'Landlord holding the deposit', hi: 'मकान मालिक डिपॉज़िट रोके हुए', mr: 'मालक भरपगाडी धरून बसला', ta: 'முன்பணத்தை பிடித்துக்கொண்ட வீட்டு உரிமையாளர்', ur: 'محنتانہ روکے ہوئے مالک' },
  scn3Title: { en: 'Vernacular municipal notice', hi: 'मातृभाषा का नगर निगम नोटिस', mr: 'मातृभाषेतील महापालिका जाहीरनामा', ta: 'தாய்மொழி நகர அறிவிப்பு', ur: 'مادری زبان کا میونسپل نوٹس' },
  scn4Title: { en: 'Wrong UPI transfer / withheld dues', hi: 'गलत UPI ट्रांसफ़र / रोकी गई राशि', mr: 'चुकीचे UPI हस्तांतरण / रोखलेली रक्कम', ta: 'தவறான UPI பரிமாற்றம் / பிடித்தத் தொகை', ur: 'غلط UPI منتقلی / روکی گئی رقم' },
  scn5Title: { en: 'Safety first — hard boundary', hi: 'सुरक्षा सबसे पहले — कठोर सीमा', mr: 'सुरक्षा सर्वांत आधी — कठोर मर्यादा', ta: 'பாதுகாப்பு முதலில் — கடுமையான எல்லை', ur: 'حفاظت سب سے پہلے — سخت حد' },
  resetVault: { en: 'Reset local vault', hi: 'लोकल वॉल्ट रीसेट करें', mr: 'लोकल व्हॉल्ट रीसेट करा', ta: 'உள்ளூர் கிடங்கை மீட்டமை', ur: 'لوکل والٹ ری سیٹ کریں' },
  vaultResetDone: { en: 'Local vault reset — sample history returns.', hi: 'लोकल वॉल्ट रीसेट — नमूना इतिहास लौट आया।', mr: 'लोकल व्हॉल्ट रीसेट — नमुना इतिहास परत आला.', ta: 'உள்ளூர் கிடங்கு மீட்டமைக்கப்பட்டது — மாதிரி வரலாறு திரும்பியது.', ur: 'لوکل والٹ ری سیٹ — نمونہ تاریخ واپس آ گیا۔' },
  voiceSpotted: { en: 'Spotted in your transcript', hi: 'आपके ट्रांसक्रिप्ट में मिला', mr: 'तुमच्या ट्रान्स्क्रिप्टमध्ये आढळले', ta: 'உங்கள் எழுத்துப்பெயர்ப்பில் கண்டறியப்பட்டது', ur: 'آپ کے ٹرانسکرپٹ میں ملا' },
  factSigned: { en: '✓ {n} case facts confirmed', hi: '✓ {n} केस तथ्य पक्के किए', mr: '✓ {n} बाब-वस्तुस्थिती निश्चित', ta: '✓ {n} வழக்கு உண்மைகள் உறுதி', ur: '✓ {n} کیس حقائق مستند' },
  ladderCopied: { en: '✓ Draft copied to your clipboard — nothing was sent. If the deadline passes, come back for Step 2.', hi: '✓ मसौदा क्लिपबोर्ड पर कॉपी हुआ — कुछ नहीं भेजा गया। समय-सीमा निकल जाए तो चरण 2 पर लौटें।', mr: '✓ मसुदा क्लिपबोर्डवर कॉपी झाला — काहीही पाठवले नाही. मुदत उलटली तर पायरी 2 साठी परत या.', ta: '✓ வரைவு கிளிப்போர்டுக்கு நகலெடுக்கப்பட்டது — எதுவும் அனுப்பப்படவில்லை. காலக்கெடு முடிந்தால் படி 2-க்குத் திரும்புங்கள்.', ur: '✓ مسودہ کلپ بورڈ پر کاپی ہوا — کچھ نہیں بھیجا گیا۔ مدت گزر جائے تو مرحلہ 2 پر واپس آئیں۔' },
  voiceMetaCaption: { en: 'Voice transcript · Entities verified', hi: 'वॉइस ट्रांसक्रिप्ट · तत्व जाँचे गए', mr: 'व्हॉइस ट्रान्स्क्रिप्ट · घटक तपासले', ta: 'குரல் எழுத்துப்பெயர்ப்பு · உறுப்புகள் சரிபார்க்கப்பட்டன', ur: 'وائس ٹرانسکرپٹ · اجزاء جانچے گئے' },
  copyHandoverNote: { en: 'Copy handover note', hi: 'हैंडओवर नोट कॉपी करें', mr: 'हँडओव्हर नोंद कॉपी करा', ta: 'கையளிப்புக் குறிப்பை நகலெடு', ur: 'ہینڈ اوور نوٹ کاپی کریں' },
  coverageNotice: {
    en: 'Interface translated (AI-drafted, unreviewed) — the legal cards below stay in English until the translation pass is human-reviewed. Everything else on this screen falls back to English by the visible coverage law.',
  },
  langGroupFull: { en: 'Full support', hi: 'पूर्ण सहायता', mr: 'पूर्ण मदत', ta: 'முழு ஆதரவு', ur: 'مکمل معاونت' },
  langGroupPreview: { en: 'Preview — legal cards in English', hi: 'प्रीव्यू · कानूनी कार्ड अंग्रेज़ी में', mr: 'पूर्वावलोकन · कायदेशीर कार्ड इंग्रजीत', ta: 'முன்தோற்றம் · சட்ட அட்டைகள் ஆங்கிலத்தில்', ur: 'پیش نظارہ · قانونی کارڈ انگریزی میں' },
  verifyStamp: { en: 'Unverified — needs sign-off', hi: 'जाँच बाक़ी — पुष्टि चाहिए', mr: 'तपासणी बाकी — पुष्टीकरण लागते', ta: 'சரிபார்ப்பு மீதி — ஒப்புதல் தேவை', ur: 'جانچ باقی — تصدیق درکار' },
  closeTitle: {
    en: 'Where would you like to leave this today?',
    hi: 'आज इसे कहाँ छोड़ना चाहेंगे?',
    mr: 'आज हे कुठे सोडायचे आहे?',
    ta: 'இன்று இதை எங்கே விட்டுவிட விரும்புகிறீர்கள்?',
    ur: 'آج اسے کہاں چھوڑنا چاہیں گے؟',
  },
  closeStep1: { en: 'I sent the Step 1 message — log today', hi: 'मैंने चरण 1 का संदेश भेज दिया — आज दर्ज करें', mr: 'मी पायरी 1 चा संदेश पाठवला — आज नोंदवा', ta: 'படி 1 செய்தியை அனுப்பிவிட்டேன் — இன்று பதிவு செய்', ur: 'میں نے مرحلہ 1 کا پیغام بھیج دیا — آج درج کریں' },
  closeStep1Done: {
    en: 'Logged {date}. If the seller does not reply in writing by the deadline in your draft, Step 2 (the free 1915 helpline) is next.',
    hi: '{date} को दर्ज। अगर विक्रेता आपके ड्राफ़्ट की समय-सीमा में लिखित जवाब नहीं देता, तो अगला चरण 2 (मुफ़्त 1915 हेल्पलाइन) है।',
    mr: '{date} रोजी नोंद. विक्रेता तुमच्या मसुद्याच्या मुदतीत लेखी उत्तर न देता आल्यास पुढची पायरी 2 (मोफत 1915 हेल्पलाइन) आहे.',
    ta: '{date} பதிவு. உங்கள் வரைவின் காலக்கெடுவுக்குள் எழுத்துப்பூர்வ பதில் வரவில்லையென்றால் அடுத்த படி 2 (இலவச 1915 உதவி எண்).',
    ur: '{date} کو درج۔ اگر فروشنر آپ کے مسودے کی مدت میں تحریری جواب نہ دے تو اگلا مرحلہ 2 (مفت 1915 ہیلپ لائن) ہے۔',
  },
  closeSave: { en: 'Save this finding and ladder for later', hi: 'यह निष्कर्ष और सीढ़ी बाद के लिए सहेजें', mr: 'हा निष्कर्ष व पावले नंतरसाठी सेव्ह करा', ta: 'இந்த கண்டுபிடிப்பையும் படிகளையும் பின்னருக்குச் சேமி', ur: 'یہ نتیجہ اور سیڑھی بعد کے لیے محفوظ کریں' },
  closeSaveDone: { en: 'Saved to your Saved folder on this device.', hi: 'इसी डिवाइस पर आपके सेव्ह फ़ोल्डर में सहेजा गया।', mr: 'याच उपकरणावर तुमच्या सेव्ह फोल्डरमध्ये सेव्ह झाले.', ta: 'இந்தச் சாதனத்தில் உங்கள் சேமித்த கோப்புறையில் சேமிக்கப்பட்டது.', ur: 'اسی ڈیوائس پر آپ کے محفوظ فولڈر میں محفوظ ہو گیا۔' },
  closeResolved: { en: 'My issue is resolved — close this matter', hi: 'मेरी समस्या हल हो गई — यह मामला बंद करें', mr: 'माझी समस्या सुटली — ही बाब बंद करा', ta: 'என் பிரச்சனை தீர்ந்தது — இந்த வழக்கை மூடு', ur: 'میرا مسئلہ حل ہو گیا — یہ معاملہ بند کریں' },
  closeResolvedDone: {
    en: 'Closed {date}. Nothing was sent by the app; this log stays on your device.',
    hi: '{date} को बंद। ऐप ने कुछ नहीं भेजा; यह रिकॉर्ड आपके डिवाइस पर रहता है।',
    mr: '{date} रोजी बंद. अॅपने काहीही पाठवले नाही; ही नोंद तुमच्या उपकरणावर राहते.',
    ta: '{date} மூடப்பட்டது. செயலி எதுவும் அனுப்பவில்லை; இந்தப் பதிவு உங்கள் சாதனத்திலேயே இருக்கும்.',
    ur: '{date} کو بند۔ ایپ نے کچھ نہیں بھیجا؛ یہ ریکارڈ آپ کے ڈیوائس پر رہتا ہے۔',
  },
  matterLogTitle: { en: 'Your log (on this device)', hi: 'आपका रिकॉर्ड (इसी डिवाइस पर)', mr: 'तुमची नोंद (याच उपकरणावर)', ta: 'உங்கள் பதிவு (இந்தச் சாதனத்தில்)', ur: 'آپ کا ریکارڈ (اسی ڈیوائس پر)' },
  matterLogStep1: { en: 'Step 1 message logged', hi: 'चरण 1 का संदेश दर्ज', mr: 'पायरी 1 चा संदेश नोंदवला', ta: 'படி 1 செய்தி பதிவு', ur: 'مرحلہ 1 کا پیغام درج' },
  matterLogClosed: { en: 'Matter closed', hi: 'मामला बंद', mr: 'बाब बंद', ta: 'வழக்கு மூடப்பட்டது', ur: 'معاملہ بند' },
  savedFromChat: { en: 'Saved from conversations', hi: 'बातचीत से सहेजे गए', mr: 'संभाषणांतून सेव्ह केलेले', ta: 'உரையாடல்களிலிருந்து சேமித்தவை', ur: 'گفتگو سے محفوظ کیے گئے' },
  triageLabel: { en: 'Or pick what is closest', hi: 'या जो सबसे मिलता हो, चुनें', mr: 'किंवा जे सर्वात जवळचे आहे ते निवडा', ta: 'அல்லது பொருந்தியதைத் தேர்ந்தெடுங்கள்', ur: 'یا جو سب سے قریب ہو، چنیں' },
  catShop: { en: 'Shopping & refunds', hi: 'ख़रीदारी और रिफ़ंड', mr: 'खरेदी आणि परतावा', ta: 'வாங்குதல் & பணத்திருப்பம்', ur: 'خریداری اور رقم واپسی' },
  catShopSub: { en: 'Faulty item, refund refused', hi: 'ख़राब सामान, रिफ़ंड से इनकार', mr: 'खराब वस्तू, परतावा नाकारला', ta: 'பழுதான பொருள், பணம் மறுப்பு', ur: 'خراب سامان، رقم واپسی سے انکار' },
  catRent: { en: 'Rent & deposit', hi: 'किराया और डिपॉज़िट', mr: 'भाडे आणि अनामत', ta: 'வாடகை & முன்பணம்', ur: 'کرایہ اور ڈپازٹ' },
  catRentSub: { en: 'Landlord keeping your deposit', hi: 'मकान मालिक डिपॉज़िट नहीं लौटा रहा', mr: 'मालक अनामत परत देत नाही', ta: 'உரிமையாளர் முன்பணம் தரவில்லை', ur: 'مالک مکان ڈپازٹ واپس نہیں کر رہا' },
  catUpi: { en: 'UPI & bank fraud', hi: 'UPI और बैंक धोखाधड़ी', mr: 'UPI आणि बँक फसवणूक', ta: 'UPI & வங்கி மோசடி', ur: 'UPI اور بینک فراڈ' },
  catUpiSub: { en: 'Money sent to the wrong account', hi: 'पैसा ग़लत खाते में गया', mr: 'पैसे चुकीच्या खात्यात गेले', ta: 'பணம் தவறான கணக்கிற்குச் சென்றது', ur: 'رقم غلط کھاتے میں چلی گئی' },
  catSalary: { en: 'Unpaid salary', hi: 'रुका हुआ वेतन', mr: 'थकलेला पगार', ta: 'நிலுவை சம்பளம்', ur: 'رکی ہوئی تنخواہ' },
  catSalarySub: { en: 'Dues or relieving letter held', hi: 'बकाया या रिलीविंग लेटर रोका', mr: 'देणी किंवा रिलीव्हिंग पत्र रोखले', ta: 'நிலுவை அல்லது விடுவிப்புக் கடிதம் நிறுத்தம்', ur: 'واجبات یا ریلیونگ لیٹر روکا' },
  catNotice: { en: 'Govt or court notice', hi: 'सरकारी या कोर्ट नोटिस', mr: 'शासकीय किंवा न्यायालयीन नोटीस', ta: 'அரசு அல்லது நீதிமன்ற அறிவிப்பு', ur: 'سرکاری یا عدالتی نوٹس' },
  catNoticeSub: { en: 'Understand a letter you got', hi: 'मिले पत्र को समझें', mr: 'आलेले पत्र समजून घ्या', ta: 'வந்த கடிதத்தைப் புரிந்துகொள்ள', ur: 'آئے ہوئے خط کو سمجھیں' },
  catSafety: { en: 'Safety & police', hi: 'सुरक्षा और पुलिस', mr: 'सुरक्षा आणि पोलीस', ta: 'பாதுகாப்பு & காவல்', ur: 'حفاظت اور پولیس' },
  catSafetySub: { en: 'Threatened or in danger now', hi: 'धमकी या अभी ख़तरे में', mr: 'धमकी किंवा आत्ता धोका', ta: 'மிரட்டல் அல்லது இப்போது ஆபத்து', ur: 'دھمکی یا ابھی خطرے میں' },
  catOther: { en: 'Something else? Describe it in your own words', hi: 'कुछ और? अपने शब्दों में बताइए', mr: 'आणखी काही? तुमच्या शब्दांत सांगा', ta: 'வேறு ஏதாவது? உங்கள் வார்த்தைகளில் சொல்லுங்கள்', ur: 'کچھ اور؟ اپنے الفاظ میں بتائیں' },
  findingKicker: { en: 'Legal finding', hi: 'कानूनी निष्कर्ष', mr: 'कायदेशीर निष्कर्ष', ta: 'சட்டக் கண்டறிதல்', ur: 'قانونی نتیجہ' },
  findingSource: { en: 'Based on', hi: 'आधार', mr: 'आधार', ta: 'அடிப்படை', ur: 'بنیاد' },
  factProgress: { en: '{n} of {total} filled', hi: '{total} में से {n} भरे', mr: '{total} पैकी {n} भरले', ta: '{total}-இல் {n} நிரப்பப்பட்டது', ur: '{total} میں سے {n} مکمل' },
  factTapHint: { en: 'Tap any line to correct it', hi: 'सुधारने के लिए किसी भी पंक्ति पर दबाएँ', mr: 'दुरुस्त करण्यासाठी कोणत्याही ओळीवर दाबा', ta: 'திருத்த எந்த வரியையும் தட்டவும்', ur: 'درست کرنے کے لیے کسی بھی سطر پر دبائیں' },
  factPickWhen: { en: 'Choose when you bought it to continue', hi: 'आगे बढ़ने के लिए ख़रीद का समय चुनें', mr: 'पुढे जाण्यासाठी खरेदीची वेळ निवडा', ta: 'தொடர வாங்கிய காலத்தைத் தேர்ந்தெடுங்கள்', ur: 'آگے بڑھنے کے لیے خریداری کا وقت چنیں' },
  ladderSteps: { en: '{n} steps', hi: '{n} कदम', mr: '{n} पावले', ta: '{n} படிகள்', ur: '{n} قدم' },
  ladderStartHere: { en: 'Start here', hi: 'यहाँ से शुरू करें', mr: 'येथून सुरू करा', ta: 'இங்கே தொடங்குங்கள்', ur: 'یہاں سے شروع کریں' },
  settingsTitle: { en: 'Settings', hi: 'सेटिंग्स', mr: 'सेटिंग्ज', ta: 'அமைப்புகள்', ur: 'ترتیبات' },
  appearanceLabel: { en: 'Appearance', hi: 'रूप', mr: 'स्वरूप', ta: 'தோற்றம்', ur: 'ظاہری شکل' },
  themeLight: { en: 'Light', hi: 'हल्का', mr: 'फिकट', ta: 'ஒளி', ur: 'ہلکا' },
  themeDark: { en: 'Dark', hi: 'गहरा', mr: 'गडद', ta: 'இருள்', ur: 'گہرا' },
  casesLabel: { en: 'Cases', hi: 'केस', mr: 'बाबी', ta: 'வழக்குகள்', ur: 'کیسز' },
  recentLabel: { en: 'Recent chats', hi: 'हाल की बातचीत', mr: 'अलीकडील संभाषणे', ta: 'சமீபத்திய உரையாடல்கள்', ur: 'حالیہ گفتگو' },
  groupToday: { en: 'Today', hi: 'आज', mr: 'आज', ta: 'இன்று', ur: 'آج' },
  groupYesterday: { en: 'Yesterday', hi: 'कल', mr: 'काल', ta: 'நேற்று', ur: 'کل' },
  groupWeek: { en: 'Previous 7 days', hi: 'पिछले 7 दिन', mr: 'मागील 7 दिवस', ta: 'கடந்த 7 நாட்கள்', ur: 'پچھلے 7 دن' },
  groupEarlier: { en: 'Earlier', hi: 'इससे पहले', mr: 'त्याआधी', ta: 'அதற்கு முன்', ur: 'اس سے پہلے' },
  newChatShort: { en: 'New chat', hi: 'नई चैट', mr: 'नवीन चॅट', ta: 'புதிய உரையாடல்', ur: 'نئی چیٹ' },
  continueCase: { en: 'Continue this case', hi: 'यह केस आगे बढ़ाएँ', mr: 'ही बाब पुढे न्या', ta: 'இந்த வழக்கைத் தொடருங்கள்', ur: 'یہ کیس جاری رکھیں' },
  caseConversations: { en: 'Conversations', hi: 'बातचीत', mr: 'संभाषणे', ta: 'உரையாடல்கள்', ur: 'گفتگو' },
  caseDocuments: { en: 'Documents', hi: 'दस्तावेज़', mr: 'कागदपत्रे', ta: 'ஆவணங்கள்', ur: 'دستاویزات' },
  caseFacts: { en: 'What we know', hi: 'हमें क्या पता है', mr: 'आम्हाला काय माहीत आहे', ta: 'நமக்குத் தெரிந்தவை', ur: 'ہمیں کیا معلوم ہے' },
  caseResolved: { en: 'Resolved', hi: 'सुलझ गया', mr: 'सुटले', ta: 'தீர்ந்தது', ur: 'حل ہو گیا' },
  coverageDirect: { en: 'Applies directly', hi: 'सीधे लागू', mr: 'थेट लागू', ta: 'நேரடியாகப் பொருந்தும்', ur: 'براہ راست لاگو' },
  coverageRelated: { en: 'Related', hi: 'संबंधित', mr: 'संबंधित', ta: 'தொடர்புடையது', ur: 'متعلقہ' },
  coverageMissing: { en: 'Not covered yet', hi: 'अभी शामिल नहीं', mr: 'अद्याप समाविष्ट नाही', ta: 'இன்னும் இல்லை', ur: 'ابھی شامل نہیں' },
  reviewerLabel: { en: 'For reviewers', hi: 'समीक्षकों के लिए', mr: 'समीक्षकांसाठी', ta: 'மதிப்பாய்வாளர்களுக்கு', ur: 'جائزہ لینے والوں کے لیے' },
  reviewerNote: { en: 'Prototype tools — not part of the product.', hi: 'प्रोटोटाइप टूल — उत्पाद का हिस्सा नहीं।', mr: 'प्रोटोटाइप साधने — उत्पादनाचा भाग नाही.', ta: 'முன்மாதிரி கருவிகள் — தயாரிப்பின் பகுதி அல்ல.', ur: 'پروٹوٹائپ ٹولز — پروڈکٹ کا حصہ نہیں۔' },
  restoreSamples: { en: 'Restore sample cases', hi: 'नमूना केस वापस लाएँ', mr: 'नमुना बाबी परत आणा', ta: 'மாதிரி வழக்குகளை மீட்டமை', ur: 'نمونہ کیسز بحال کریں' },
  moreLanguages: { en: 'More languages', hi: 'और भाषाएँ', mr: 'आणखी भाषा', ta: 'மேலும் மொழிகள்', ur: 'مزید زبانیں' },
  allChats: { en: 'All chats', hi: 'सभी बातचीत', mr: 'सर्व संभाषणे', ta: 'அனைத்து உரையாடல்கள்', ur: 'تمام گفتگو' },
  demoUser: { en: 'Demo user', hi: 'डेमो उपयोगकर्ता', mr: 'डेमो वापरकर्ता', ta: 'டெமோ பயனர்', ur: 'ڈیمو صارف' },
  noCases: { en: 'No cases yet. Start a chat and it will appear here.', hi: 'अभी कोई केस नहीं। बातचीत शुरू करें, वह यहाँ दिखेगी।', mr: 'अद्याप बाबी नाहीत. संभाषण सुरू करा, ते इथे दिसेल.', ta: 'இன்னும் வழக்குகள் இல்லை. உரையாடலைத் தொடங்குங்கள், அது இங்கே தோன்றும்.', ur: 'ابھی کوئی کیس نہیں۔ گفتگو شروع کریں، وہ یہاں نظر آئے گی۔' },
  openMenu: { en: 'Open menu', hi: 'मेनू खोलें', mr: 'मेनू उघडा', ta: 'மெனுவைத் திற', ur: 'مینو کھولیں' },
  closeMenu: { en: 'Close menu', hi: 'मेनू बंद करें', mr: 'मेनू बंद करा', ta: 'மெனுவை மூடு', ur: 'مینو بند کریں' },
  homeSub: { en: 'Tell me what happened — in your own words, in your own language.', hi: 'जो हुआ, अपने शब्दों में, अपनी भाषा में बताइए।', mr: 'जे घडले ते तुमच्या शब्दांत, तुमच्या भाषेत सांगा.', ta: 'என்ன நடந்தது என்று உங்கள் வார்த்தைகளில், உங்கள் மொழியில் சொல்லுங்கள்.', ur: 'جو ہوا، اپنے الفاظ میں، اپنی زبان میں بتائیں۔' },
  voiceCancel: { en: 'Cancel', hi: 'रद्द करें', mr: 'रद्द करा', ta: 'ரத்து', ur: 'منسوخ' },
  voiceDone: { en: 'Done', hi: 'हो गया', mr: 'झाले', ta: 'முடிந்தது', ur: 'ہو گیا' },
  composerVoice: { en: 'Speak', hi: 'बोलें', mr: 'बोला', ta: 'பேசுங்கள்', ur: 'بولیں' },
}

export type UiKey = keyof UiStrings

export function t(lang: LangCode, key: UiKey): string {
  return UI[key]?.[lang] ?? UI[key]?.en ?? ''
}
