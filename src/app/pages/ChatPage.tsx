import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import { useApp } from '../lib/app-context'
import { navigate, NEW_CHAT_EVENT, useHashRoute } from '../lib/router'
import { runBeats, SimulatedFailure, type BeatClass } from '../lib/engine'
import { classifyMatter, reRouteAsCaution, SCOPE_RULES, type ScopeDecision } from '../data/scope-rules'
import { REASSURANCE, SCENARIO_SEEDS } from '../data/refund-journey'
import { FOLLOW_UPS, INFORMAL_CAUTION } from '../data/localized-content'
import { scenarioById, type TesterOption } from '../data/interactive-scenarios'
import { domainPack, type DomainId, type DomainBranch } from '../data/domain-playbooks'
import {
  extractFacts,
  factRows,
  buildFinding,
  issueKeyFromDisplay,
  askKeyFromDisplay,
  EMPTY_FACTS,
  type FactRecord,
} from '../lib/matter-facts'
import { LANGUAGES } from '../data/languages'
import { matterById } from '../data/matters'
import { updateMatterLog } from '../lib/vault'
import { CaseContinuityHeader } from '../components/cases/CaseContinuityHeader'
import { ThreadSummaryCard } from '../components/cases/ThreadSummaryCard'
import { AppShell } from '../components/ui/shell'
import { Banner } from '../components/ui/Banner'
import { Button } from '../components/ui/Button'
import { Thread } from '../components/chat/Thread'
import { MessageBubble } from '../components/chat/MessageBubble'
import { TypingIndicator } from '../components/chat/TypingIndicator'
import { Composer } from '../components/chat/Composer'
import { FindingCard, type FindingCardData } from '../components/cards/FindingCard'
import { ActionLadder } from '../components/cards/ActionLadder'
import { CautionCard } from '../components/cards/CautionCard'
import { CloseOutCard } from '../components/cards/CloseOutCard'
import { DemandNoticeReview } from '../components/cards/DemandNoticeReview'
import { StopScreen } from '../components/stop/StopScreen'
import { ProtectiveCard } from '../components/stop/ProtectiveCard'
import { HandoverCard, WHAT_TO_BRING } from '../components/cards/HandoverCard'
import { VoiceOrb } from '../components/voice/VoiceOrb'
import { IconBag, IconBriefcase, IconCopy, IconDoc, IconFolder, IconHome, IconShield, IconWallet } from '../components/ui/icons'
import { useSpans } from '../lib/useSpans'
import { StreamText } from '../components/chat/StreamText'
import { copyText } from '../lib/format'
import { FactCheckCard, type FactItem } from '../components/cards/FactCheckCard'
import { StatutoryCounterCard } from '../components/cards/StatutoryCounterCard'
import { TesterPrompts } from '../components/chat/TesterPrompts'
import { HomeTriage, type TriageItem } from '../components/chat/HomeTriage'
import { Card } from '../components/ui/Card'

type ItemKind =
  | 'user'
  | 'assistant'
  | 'finding'
  | 'ladder'
  | 'caution'
  | 'error'
  | 'system'
  | 'factcheck'
  | 'handover'
  | 'noticecard'
  | 'protective'
  | 'closeout'
  | 'counter'

interface ChatItem {
  id: number
  kind: ItemKind
  text?: string
  /** mock attachments sent with the message (rendered as evidence chips) */
  atts?: string[]
  /** the message came through the simulated voice capture — render the note header */
  voice?: boolean
  variant?: 'full' | 'free'
  /** assistant text still revealing (caret streaming) */
  stream?: boolean
  /** the scope decision attached to protective/handover/caution items */
  decision?: ScopeDecision
  initialExpandedStep?: 1 | 2 | 3
  counterData?: {
    title: string
    statutoryBasis: string
    replyText: string
  }
}

/**
 * Conversational stage (deep-audit P0 fix): follow-ups in the composer are
 * no longer re-classified as Turn 1. intake = before the first finding;
 * clarifying = waiting for missing facts (Turn 1.5 loop);
 * engaged = a finding/ladder/caution is on the table; stopped = a protective
 * stop landed. Safety patterns (strongStop) always win over the stage.
 */
type ThreadStage = 'intake' | 'awaitingFacts' | 'clarifying' | 'engaged' | 'stopped'

const CARD_KINDS = new Set<ItemKind>([
  'finding', 'ladder', 'caution', 'factcheck', 'protective', 'handover', 'noticecard', 'closeout', 'counter', 'error',
])

const RE_PROMISE =
  /will i (?:really |actually )?(?:get|win|receive)|i will (?:get|win)|refund,?\s*right|pakka|मिलेगा|पक्का|मिलेल का|கிடைக்குமா|ملے گا|مل جائے گا|पैसे मिल/i
const RE_ESCALATE = /ignore|no reply|not respon|जवाब नहीं|जवाब नही|பதில் இல்லை|جواب نہیں/i

export default function ChatPage() {
  const { tr, lang, activeCaseId, setActiveCase } = useApp()
  const { params } = useHashRoute()
  const seedId = params.get('s')
  const spans = useSpans()
  const activeCase = activeCaseId ? matterById(activeCaseId) : undefined
  const scenario = scenarioById(seedId?.startsWith('scn') ? seedId : undefined)

  const [items, setItems] = useState<ChatItem[]>([])
  const [busy, setBusy] = useState(false)
  const [stageLabel, setStageLabel] = useState<string | undefined>()
  const [offline, setOffline] = useState(false)
  const [attachments, setAttachments] = useState<string[]>([])
  /* stage lives in a ref: handleSend is invoked from timers, seeds and the
     voice handoff with STALE render closures — a state read there applied
     the previous conversation's stage to a fresh seed (found in smoke test). */
  const stageRef = useRef<ThreadStage>('intake')
  const [protectDecision, setProtectDecision] = useState<ScopeDecision | null>(null)
  const [stopDecision, setStopDecision] = useState<ScopeDecision | null>(null)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [matterFacts, setMatterFacts] = useState<FactRecord>(EMPTY_FACTS)
  const [findingData, setFindingData] = useState<FindingCardData>(() => buildFinding(EMPTY_FACTS, 'en'))
  const [factItems, setFactItems] = useState<FactItem[]>([])
  const [factSigned, setFactSigned] = useState(false)
  const [domain, setDomain] = useState<{ id: DomainId; branch: DomainBranch } | null>(null)
  const [subSummaryOpen, setSubSummaryOpen] = useState(false)

  const idRef = useRef(0)
  const retryRef = useRef<(() => void) | null>(null)
  const cancelRef = useRef(false)
  const lastUserRef = useRef('')
  const voiceRef = useRef(false)

  const nextId = () => ++idRef.current
  const push = (...newItems: Omit<ChatItem, 'id'>[]) =>
    setItems((prev) => [...prev, ...newItems.map((i) => ({ ...i, id: nextId() }))])

  /** skip the remaining narrated beats — resolve straight to the answer */
  const skipBeats = () => {
    cancelRef.current = true
  }

  /** deterministic staged beats -> then(); failure injectable for the error state */
  const run = useCallback((beatClass: BeatClass, then: () => void, fail = false) => {
    setBusy(true)
    cancelRef.current = false
    retryRef.current = () => run(beatClass, then, false)
    runBeats(beatClass, (label) => setStageLabel(label), {
      failAfterFirstBeat: fail,
      isCancelled: () => cancelRef.current,
    })
      .then(() => {
        if (!fail) then()
      })
      .catch((err) => {
        if (err instanceof SimulatedFailure) {
          push({ kind: 'error' })
        }
      })
      .finally(() => {
        setBusy(false)
        setStageLabel(undefined)
      })
  }, [])

  /* ---- flows ---- */

  const startConsumerFlow = (fail = false, userText?: string) => {
    run(
      'explain',
      () => {
        const facts = extractFacts(userText ?? '')
        setMatterFacts(facts)
        setFactItems(factRows(facts, lang))
        // Anti-fatigue (audit Dimension 2): NO verbatim echo — the emotion-
        // matched acknowledgment only. The FactCheckCard is the single
        // structured confirmation (purchase window included), later in the
        // thread.
        push(
          {
            kind: 'assistant',
            stream: true,
            text: REASSURANCE.hassle[lang] ?? REASSURANCE.hassle.en,
          },
          { kind: 'factcheck' },
        )
      },
      fail,
    )
  }

  const runProtective = (decision: ScopeDecision) => {
    setProtectDecision(decision)
    stageRef.current = 'stopped'
    run('stop', () => {
      push(
        { kind: 'system', text: tr('tierHardStop') },
        { kind: 'protective', decision },
        { kind: 'handover', decision },
      )
    })
  }

  const startCautionFlow = (decision: ScopeDecision) => {
    stageRef.current = 'engaged'
    run('caution', () => {
      push(
        { kind: 'system', text: tr('tierCaution') },
        { kind: 'caution', decision },
        { kind: 'ladder', variant: 'free' },
      )
    })
  }

  /** turn-aware follow-up (deep-audit P0-1): answer the human, never re-run Turn 1 */
  const followUp = (currentStage: ThreadStage) => {
    const pack = FOLLOW_UPS[lang] ?? FOLLOW_UPS.en!
    const text = lastUserRef.current
    const domainPackLive = domain ? domainPack(domain.id, domain.branch, lang) : null
    const msg = RE_PROMISE.test(text)
      ? pack.outcome
      : RE_ESCALATE.test(text)
        ? (domainPackLive?.escalate ?? pack.escalate)
        : currentStage === 'stopped'
          ? pack.stopped
          : pack.general
    run('progress', () => {
      push({ kind: 'assistant', stream: true, text: msg })
    })
  }

  const handleSend = (text: string, atts: string[], fail = false) => {
    push({ kind: 'user', text, atts, voice: voiceRef.current })
    voiceRef.current = false
    lastUserRef.current = text

    // safety first: strong hard-stop signals win over everything, any turn
    const strongStop = /evict|throw (?:us|me|him|her) out|threat|police|\bfir\b|धमकी|बेदखल|पुलिस|پولیس/i.test(text)
    if (strongStop) {
      const decision = classifyMatter(text, lang)
      const d: ScopeDecision =
        decision.tier === 'hard-stop'
          ? decision
          : { ...decision, tier: 'hard-stop' as const }
      runProtective(d)
      return
    }

    if (activeCase || stageRef.current !== 'intake') {
      stageRef.current = 'engaged'
      followUp('engaged')
      return
    }

    // notice-intent: a received legal/official/tax notice → the interpreter
    // (explain-only), NOT the consumer script and NOT a fake "coming later"
    const noticeIntent =
      /\b(?:legal|official|court|tax|municipal|property[- ]tax|govt|government)\s+notice\b/i.test(text) ||
      /\bnotice\s+(?:about|regarding|from|came|received)\b/i.test(text) ||
      /received a notice/i.test(text) ||
      /(कानूनी|सरकारी|कोर्ट|अदालत|टैक्स|नगर निगम|संपत्ति)[\s-]*नोटिस/i.test(text) ||
      /नोटिस (?:आया|मिला|आया है)/i.test(text) ||
      /(कायदेशीर|शासकीय|महापालिका|मालमत्ता)[\s-]*जाहीरनामा/i.test(text) ||
      /जाहीरनामा (?:आल|मिळाल)/i.test(text) ||
      /(சட்ட|அரசு|வரி|மாநகர|சொத்து)[\s-]*அறிவிப்பு/i.test(text) ||
      /(قانونی|سرکاری|ٹیکس|بلدیہ|جائیداد)[\s-]*نوٹس/i.test(text)
    if (noticeIntent) {
      run('progress', () => {
        push(
          { kind: 'assistant', stream: true, text: REASSURANCE.notice[lang] ?? REASSURANCE.notice.en },
          { kind: 'noticecard' },
        )
      })
      return
    }

    const decision = classifyMatter(text, lang)

    if (decision.tier === 'hard-stop') {
      // In-thread protective triage (audit Dimension 1): the stop lands in
      // the conversation — no full-screen takeover. The protective footer
      // replaces the composer while the stop is active.
      runProtective(decision)
      return
    }
    if (decision.tier === 'caution') {
      startCautionFlow(decision)
      return
    }
    startConsumerFlow(fail, text)
  }

  /**
   * The signed confirmation (deep-audit P0-3): the fact gate's values ARE
   * the matter record now — the finding, the drafts and the demand notice
   * are built from them. Correct a fact, confirm again, and the downstream
   * cards update in place. The purchase-window row routes 2yr+/not-sure to
   * the honest time-barred caution.
   */
  const confirmFacts = (values: Record<string, string>) => {
    setFactSigned(true)
    stageRef.current = 'engaged'

    /* domain flows: the playbook's own finding or caution, built from the
       signed rows — never the mixer script */
    if (domain) {
      const pack = domainPack(domain.id, domain.branch, lang)
      if (domain.branch === 'informal' && pack.caution) {
        const decision: ScopeDecision = {
          tier: 'caution',
          ruleId: 'domain-' + domain.id,
          label: domain.id,
          why: pack.caution.body,
          certainty: 'matched',
          domain,
        }
        run('caution', () => {
          push({ kind: 'caution', decision }, { kind: 'ladder', variant: 'full' })
        })
        return
      }
      const f = pack.finding
      run('progress', () => {
        setFindingData({
          title: f.title,
          whatHappened:
            pack.facts.find((x) => x.key === 'timeline')?.value ??
            pack.facts.find((x) => x.key === 'position')?.value ??
            '',
          lawSays: f.lawSays,
          means: f.means,
          legalId: f.legalId,
          confidence: 'clear',
          reasoningSteps: f.reasoning,
        })
        push({ kind: 'finding' }, { kind: 'ladder', variant: 'full' }, { kind: 'closeout' })
      })
      return
    }

    // recover the normalized keys from the row's display text; if the user
    // re-typed the row, carry their exact wording through as the raw text —
    // their signed wording beats the normalized phrase in every template
    const rowInitial = (key: string) => factItems.find((f) => f.key === key)?.value ?? ''
    const next: FactRecord = {
      item: values.item ?? '',
      seller: values.seller ?? '',
      amount: values.amount ?? '',
      issue: issueKeyFromDisplay(values.issue ?? '', lang),
      ask: askKeyFromDisplay(values.ask ?? '', lang),
      when: (values.when as FactRecord['when']) ?? '',
      issueRaw: values.issue !== rowInitial('issue') ? values.issue : undefined,
      askRaw: values.ask !== rowInitial('ask') ? values.ask : undefined,
    }
    setMatterFacts(next)
    setFactSigned(true)
    stageRef.current = 'engaged'

    if (next.when === '2plus' || next.when === 'ns') {
      const rule = SCOPE_RULES.find((r) => r.id === 'possible-time-barred')!
      const decision: ScopeDecision = {
        tier: 'caution',
        ruleId: rule.id,
        label: rule.label,
        why: rule.whyI18n[lang] ?? rule.whyI18n.en ?? '',
        certainty: 'matched',
      }
      run('caution', () => {
        push({ kind: 'caution', decision }, { kind: 'ladder', variant: 'free' })
      })
      return
    }

    run('progress', () => {
      setFindingData(buildFinding(next, lang))
      push({ kind: 'finding' }, { kind: 'ladder', variant: 'full' }, { kind: 'closeout' })
    })
  }

  /* unclear-caution disambiguation doors (deep-audit P0-2) */
  const reConsumer = () => {
    run('explain', () => {
      const facts = extractFacts(lastUserRef.current)
      setMatterFacts(facts)
      setFactItems(factRows(facts, lang))
      push(
        { kind: 'assistant', stream: true, text: REASSURANCE.hassle[lang] ?? REASSURANCE.hassle.en },
        { kind: 'factcheck' },
      )
    })
  }
  const reNotice = () => {
    run('progress', () => {
      push(
        { kind: 'assistant', stream: true, text: REASSURANCE.notice[lang] ?? REASSURANCE.notice.en },
        { kind: 'noticecard' },
      )
    })
  }
  const reOther = (decision?: ScopeDecision) => {
    run('progress', () => {
      push({ kind: 'handover', decision })
    })
  }

  const retryError = () => {
    setItems((prev) => prev.filter((i) => i.kind !== 'error'))
    retryRef.current?.()
  }

  const tellMore = () => {
    setProtectDecision(null)
    setStopDecision(null)
    stageRef.current = 'engaged'
    const decision = reRouteAsCaution(lang)
    push({ kind: 'system', text: tr('tierCaution') })
    run('caution', () => {
      push(
        { kind: 'assistant', text: decision.why },
        { kind: 'ladder', variant: 'free' },
      )
    })
  }

  const copyHandover = async () => {
    const d = protectDecision
    if (!d) return
    const note = [
      tr('tierHardStop') + ' — ' + d.label,
      '',
      d.why,
      '',
      lastUserRef.current,
      '',
      tr('handoverWhat') + ':',
      ...WHAT_TO_BRING.map((w) => `· ${w}`),
    ].join('\n')
    const ok = await copyText(note)
    if (ok) toast.success(tr('copied'))
  }

  /* continuity chips (case-folder model): a new day-chat answers from the
     case's own language and memory — escalate / counter / close — without
     re-running intake. Index routes the intent; text is what the user "said". */
  const handleContinuityChip = (text: string, index: number) => {
    push({ kind: 'user', text })
    lastUserRef.current = text
    stageRef.current = 'engaged'
    const cLang = activeCase?.lang ?? lang

    if (index === 0) {
      // Chip 1: Ghosted after 48h -> Step 2 NCH / regulatory docket prep
      run('progress', () => {
        push(
          {
            kind: 'assistant',
            stream: true,
            text:
              cLang === 'hi'
                ? '48 घंटे तक कोई लिखित जवाब न मिलना सेवा में कमी का स्पष्ट दस्तावेज़ी सबूत है। अब हम चरण 2: राष्ट्रीय उपभोक्ता हेल्पलाइन (1915) या मध्यस्थता पर आगे बढ़ते हैं — आपका डॉकेट तैयार है।'
                : cLang === 'mr'
                  ? '४८ तास कोणतेही उत्तर न मिळणे हा टाळाटाळीचा थेट पुरावा आहे. आता आपण पायरी २: राष्ट्रीय ग्राहक हेल्पलाइन (१९१५) किंवा लवादाकडे जाऊ.'
                  : cLang === 'ta'
                    ? '48 மணி நேரமாக பதில் வராதது சேவைக் குறைபாட்டின் தெளிவான ஆவணம். இப்போது படி 2: தேசிய நுகர்வோர் உதவி எண் (1915)-க்கு செல்லலாம்.'
                    : cLang === 'ur'
                      ? '48 گھنٹے تک کوئی تحریری جواب نہ ملنا عدم توجہی کا واضح ثبوت ہے۔ اب ہم مرحلہ 2: قومی کنزیومر ہیلپ لائن (1915) پر آگے بڑھتے ہیں۔'
                      : '48 hours with no reply gives you a documented paper trail of non-responsiveness. Under statutory grievance rules, you now advance to Step 2: National Consumer Helpline (1915) or regulatory docket prep.',
          },
          { kind: 'ladder', variant: 'full', initialExpandedStep: 2 },
        )
      })
    } else if (index === 1) {
      // Chip 2: Rejected / Seller pushback -> Statutory counter-reply card with 1-tap copy
      const counterText =
        activeCase?.id === 'h2'
          ? 'Under Section 108(m) of the Transfer of Property Act, 1882 and Section 70 of Indian Contract Act, normal wear-and-tear and painting are the landlord’s statutory obligation. Withholding ₹35,000 without actual GST damage bills is legally unsustainable. Please refund the ₹35,000 within 7 days, failing which legal proceedings will follow.'
          : activeCase?.id === 'h3'
            ? 'In response to Assessment Notice, I submit that the claimed arrears of ₹18,450 are disputed under Section 149 of Municipal Corporation Act due to faulty meter assessment. Kindly fix a hearing date within the statutory 15-day objection window.'
            : `Under Section 84 of the Consumer Protection Act, 2019, goods that arrive defective out of the box (Dead on Arrival) entitle the consumer to a full refund or replacement. Company store policy cannot waive statutory liability. Please arrange pickup and refund of ${activeCase?.amount ?? '₹8,999'} within 48 hours.`
      run('progress', () => {
        push(
          {
            kind: 'assistant',
            stream: true,
            text:
              cLang === 'hi'
                ? 'कंपनी या मकान मालिक की आंतरिक पॉलिसी कानूनी अधिकारों को नहीं काट सकती। यह जवाबी संदेश आपके दर्ज तथ्यों से तैयार है — कॉपी करके WhatsApp पर भेजें:'
                : cLang === 'mr'
                  ? 'कंपनी किंवा मालकाचे अंतर्गत नियम कायदेशीर तरतुदींना डावलू शकत नाहीत. हा प्रतिवाद संदेश आपल्या नोंदवलेल्या तथ्यांवरून तयार आहे — कॉपी करून WhatsApp वर पाठवा:'
                  : cLang === 'ta'
                    ? 'கம்பெனி அல்லது ஓனரின் உள் பாலிசி சட்ட உரிமைகளை குறைக்க முடியாது. இந்த பதில் உங்கள் பதிவுசெய்த உண்மைகளிலிருந்து தயாராகவுள்ளது — நகலெடுத்து WhatsApp-இல் அனுப்பவும்:'
                    : cLang === 'ur'
                      ? 'کمپنی یا مالک کی اندرونی پالیسی قانونی حقوق کو کم نہیں کر سکتی۔ یہ جوابی پیغام آپ کے درج شدہ حقائق سے تیار ہے — کاپی کر کے WhatsApp پر بھیجیں:'
                      : 'Their internal policy cannot shorten your statutory remedies. This reply is built from your locked facts — copy and send it on WhatsApp:',
          },
          {
            kind: 'counter',
            counterData: {
              title: 'Statutory Counter-Reply (WhatsApp)',
              statutoryBasis:
                activeCase?.id === 'h2'
                  ? 'Transfer of Property Act, 1882 · S. 108(m) [VERIFY]'
                  : activeCase?.id === 'h3'
                    ? 'Municipal Corporation Act · S. 149 [VERIFY]'
                    : 'Consumer Protection Act, 2019 · S. 84 [VERIFY]',
              replyText: counterText,
            },
          },
        )
      })
    } else {
      // Chip 3: Agreed / Resolved -> CloseOutCard + mark resolved
      if (activeCase) {
        activeCase.resolved = true
        activeCase.statusLine = 'Resolved · User recorded'
      }
      run('progress', () => {
        push(
          {
            kind: 'assistant',
            stream: true,
            text:
              cLang === 'hi'
                ? 'बहुत बढ़िया — आपके शांत और दस्तावेज़ी तरीक़े से विवाद हल हुआ! मैंने इस केस को आपके फोल्डर में “सुलझा हुआ” (Resolved) दर्ज कर दिया है।'
                : cLang === 'mr'
                  ? 'अभिनंदन — आपल्या शांत आणि कागदोपत्री प्रयत्नांमुळे वाद सुटला! मी हा खटला आपल्या फोल्डरमध्ये “निकाली” नोंदवला आहे.'
                  : cLang === 'ta'
                    ? 'அருமை — உங்கள் அமைதியான ஆவணப் பதிவு பலன் தந்தது! இந்த வழக்கின் தீர்வை உங்கள் கோப்பில் பதிவு செய்துவிட்டேன்.'
                    : cLang === 'ur'
                      ? 'شاندار — آپ کے پرامن اور تحریری ثبوتوں سے معاملہ حل ہو گیا! میں نے اس کیس کو آپ کے فولڈر میں “حل شدہ” درج کر دیا ہے۔'
                      : 'That is a great outcome — your calm, documented paper trail resolved the issue. I have closed this matter and archived the final resolution record in your Case Folder.',
          },
          { kind: 'closeout' },
        )
      })
    }
  }

  /* ---- branching-tester scenarios (master prompt Part 2): the option
     DECLARES its path, so the route is deterministic — free typing still
     goes through the classifier ---- */
  const informalDecision = (): ScopeDecision => {
    const pack = INFORMAL_CAUTION[lang] ?? INFORMAL_CAUTION.en!
    return { tier: 'caution', ruleId: 'informal-seller', label: 'Informal seller', why: pack.body, certainty: 'matched' }
  }

  /* multi-domain engine (master spec Part 1): the option enters its domain
     playbook — domain empathy, domain fact rows, domain finding/caution and
     a domain ladder. The generic refund flow stays for free-typed input. */
  const startDomainFlow = (o: TesterOption) => {
    const id = o.domain!
    const branch = o.branch ?? 'standard'
    /* B1 (visual report): once an option is picked its text is IN the thread —
       the turn-1 rail must not keep offering the same words below it. The rail
       returns only when the stage earns options again (clarify / post-finding). */
    stageRef.current = 'awaitingFacts'
    run('explain', () => {
      const pack = domainPack(id, branch, lang)
      setDomain({ id, branch })
      setFactItems(
        o.factOverrides
          ? pack.facts.map((f) => ({ ...f, value: o.factOverrides!.find((x) => x.key === f.key)?.value ?? f.value }))
          : pack.facts,
      )
      setFactSigned(false)
      push({ kind: 'assistant', stream: true, text: pack.empathy }, { kind: 'factcheck' })
    })
  }

  const handleScenarioOption = (o: TesterOption) => {
    push({ kind: 'user', text: o.text })
    lastUserRef.current = o.text
    if (o.domain) {
      startDomainFlow(o)
      return
    }
    switch (o.route) {
      case 'proceed':
        stageRef.current = 'awaitingFacts'
        startConsumerFlow(false, o.text)
        return
      case 'vague': {
        stageRef.current = 'clarifying'
        run('explain', () => {
          push({
            kind: 'assistant',
            stream: true,
            text:
              lang === 'hi'
                ? 'मैं समझ सकता हूँ कि यह स्थिति परेशान करने वाली है। आपके कानूनी अधिकार और सही कदम तय करने के लिए, क्या आप दो बातें बता सकते हैं: (1) सामान या डिपॉज़िट की कुल राशि कितनी है, और (2) यह कितने दिन पहले हुआ था?'
                : lang === 'mr'
                  ? 'मी समजू शकतो की ही परिस्थिती त्रासदायक आहे. आपले कायदेशीर हक्क ठरवण्यासाठी, कृपया दोन गोष्टी सांगा: (1) एकूण रक्कम किती अडकली आहे, आणि (2) हे किती दिवसांपूर्वी घडले होते?'
                  : lang === 'ta'
                    ? 'இது கவலையளிக்கும் விஷயம் என்பதை புரிந்து கொள்ள முடிகிறது. சட்டபூர்வ வழியை தீர்மானிக்க, இரண்டு விஷயங்களை கூறுங்கள்: (1) பொருட்கள் அல்லது முன்பணத்தின் தொகை எவ்வளவு, மற்றும் (2) இது எத்தனை நாட்களுக்கு முன் நடந்தது?'
                    : lang === 'ur'
                      ? 'میں سمجھ سکتا ہوں کہ یہ صورتحال پریشان کن ہے۔ قانونی حل طے کرنے کے لیے، کیا آپ دو باتیں بتا سکتے ہیں: (1) کل رقم کتنی ہے، اور (2) یہ کتنے دن پہلے ہوا تھا؟'
                      : 'I understand this is stressful. To pin down your exact statutory leverage, could you tell me: (1) what was the purchase or deposit amount, and (2) how many days or weeks ago did this happen?',
          })
        })
        return
      }
      case 'informal':
        startCautionFlow(informalDecision())
        return
      case 'stop': {
        const d = classifyMatter(o.text, lang)
        runProtective(d.tier === 'hard-stop' ? d : { ...d, tier: 'hard-stop' as const })
        return
      }
      case 'notice':
        run('progress', () => {
          push(
            { kind: 'assistant', stream: true, text: REASSURANCE.notice[lang] ?? REASSURANCE.notice.en },
            { kind: 'noticecard' },
          )
        })
        return
      case 'pushback':
        stageRef.current = 'engaged'
        run('progress', () => {
          push({ kind: 'assistant', stream: true, text: (FOLLOW_UPS[lang] ?? FOLLOW_UPS.en!).escalate })
        })
        return
      case 'resolved':
        /* the matter is closing — drop the rail (stage with no options) so
           the closeout card stands alone, not competing with a second menu */
        stageRef.current = 'awaitingFacts'
        run('progress', () => {
          push(
            { kind: 'assistant', stream: true, text: (FOLLOW_UPS[lang] ?? FOLLOW_UPS.en!).general },
            { kind: 'closeout' },
          )
        })
        return
      case 'save':
        /* Part 2 overhaul: the closure ritual folds into the rail while the
           post-finding options are up — one menu, not two */
        stageRef.current = 'awaitingFacts'
        updateMatterLog({ step1SentAt: new Date().toISOString() })
        run('progress', () => {
          push({ kind: 'system', text: tr('matterLogStep1') })
        })
        toast.success(tr('matterLogStep1'))
        return
    }
  }

  const postFindingOptions = scenario
    ? scenario.postFinding?.[lang] ?? scenario.postFinding?.en
    : undefined
  const testerOptions: TesterOption[] | undefined = !scenario
    ? undefined
    : stageRef.current === 'intake'
      ? scenario.turn1[lang] ?? scenario.turn1.en
      : stageRef.current === 'clarifying'
        ? scenario.clarifyPrompts?.[lang] ?? scenario.clarifyPrompts?.en
        : stageRef.current === 'engaged'
          ? /* the closure ritual joins the rail — one follow-up menu, not two
               (overhaul Part 2: the CloseOutCard stays out while this is up) */
            [
              ...(postFindingOptions ?? []),
              { text: tr('railSaveLater'), meta: 'metaSave', route: 'save' as const },
            ]
          : undefined /* awaitingFacts / stopped: no rail — nothing honest to offer yet */

  const reset = () => {
    setItems([])
    setActiveCase(null)
    setDomain(null)
    setFactSigned(false)
    setStopDecision(null)
    setProtectDecision(null)
    setNoticeOpen(false)
    stageRef.current = 'intake'
    setMatterFacts(EMPTY_FACTS)
    setFindingData(buildFinding(EMPTY_FACTS, 'en'))
    setFactItems([])
  }

  /* header / drawer "New chat" — always a clean thread, even when the hash
     is already '/' (the page survives same-route navigation) */
  useEffect(() => {
    const onNew = () => reset()
    window.addEventListener(NEW_CHAT_EVENT, onNew)
    return () => window.removeEventListener(NEW_CHAT_EVENT, onNew)
    // reset only calls state setters, which are stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* the finding card re-speaks the signed facts in the current language */
  useEffect(() => {
    setFindingData(buildFinding(matterFacts, lang))
    // matterFacts intentionally excluded: rebuild on language switch only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  /* ---- handoff from the simulated voice flow (review & send).
     StrictMode-safe: the storage item is consumed only when the timer
     actually fires, so the discarded first effect run doesn't eat it. ---- */
  useEffect(() => {
    let pending: string | null = null
    try {
      pending = window.sessionStorage.getItem('lokai.pendingTranscript')
    } catch {
      /* ignore */
    }
    if (!pending || !pending.trim()) return
    const t = window.setTimeout(() => {
      try {
        window.sessionStorage.removeItem('lokai.pendingTranscript')
      } catch {
        /* ignore */
      }
      voiceRef.current = true
      handleSend(pending!.trim(), [])
    }, 450)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---- offline (seeded or real) ---- */
  useEffect(() => {
    const sync = () => setOffline(window.navigator.onLine === false)
    sync()
    window.addEventListener('online', sync)
    window.addEventListener('offline', sync)
    return () => {
      window.removeEventListener('online', sync)
      window.removeEventListener('offline', sync)
    }
  }, [])

  /* ---- scenario seeding — a seed CHANGE always starts a fresh conversation
     (deep-audit smoke fix: the old same-seed guard blocked re-launching a
     scenario after any in-thread activity, because ChatPage survives the
     hash navigation). StrictMode-safe without a guard: the double-invoked
     effect's first timer is cleared by the effect cleanup.
     A BRANCHING scenario seed (scn1…scn5) never auto-sends: the tester
     picks the opening path from the prompt cards. ---- */
  useEffect(() => {
    if (!seedId) return
    if (scenario) {
      reset()
      return
    }
    const seed = SCENARIO_SEEDS.find((s) => s.id === seedId)
    if (!seed) return
    reset()
    if (seed.forceOffline) {
      setOffline(true)
      return
    }
    const timer = window.setTimeout(() => {
      handleSend(seed.userMessage, [], seed.simulateError ?? false)
    }, 450)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedId])

  /* ---- render ---- */

  const empty = items.length === 0 && !stopDecision && !noticeOpen

  /* scroll focus: the first card of the trailing card batch mounts with its
     headline in view (deep-audit P2-10) instead of yanking to the bottom */
  let focusSelector: string | null = null
  for (let i = items.length - 1; i >= 0; i--) {
    const it = items[i]!
    if (!CARD_KINDS.has(it.kind)) break
    focusSelector = `[data-chat-item="${it.id}"]`
  }

  /* Duo spanning: the latest generative card docks in the right pane */
  const focusItem = spans
    ? [...items].reverse().find((i) => i.kind === 'finding' || i.kind === 'caution' || i.kind === 'ladder')
    : undefined
  const focusPane = !focusItem ? null : (
    <aside
      aria-label="Focus"
      className="scroll-calm min-w-0 flex-1 overflow-y-auto pe-[max(1rem,env(safe-area-inset-right))] ps-1 pt-3"
    >
      {focusItem.kind === 'finding' && (
        <MessageBubble role="assistant">
          <FindingCard data={findingData} onUpdate={setFindingData} />
        </MessageBubble>
      )}
      {focusItem.kind === 'caution' && <CautionCard decision={focusItem.decision} />}
      {focusItem.kind === 'ladder' && (
        <ActionLadder mode={focusItem.variant ?? 'full'} onOpenNotice={() => setNoticeOpen(true)} facts={matterFacts} />
      )}
    </aside>
  )
  const spanRow = spans ? 'flex min-h-0 flex-1 flex-row gap-2' : 'flex min-h-0 flex-1 flex-col'

  const whenOptions = [
    { key: '30', label: tr('ans30') },
    { key: '1to2', label: tr('ans1to2') },
    { key: '2plus', label: tr('ans2plus') },
    { key: 'ns', label: tr('ansNotSure') },
  ]

  const protectiveFooter = protectDecision ? (
    <div
      className="flex flex-col gap-2 rounded-[26px] bg-standout p-2.5 text-fg-on-inverted"
      role="region"
      aria-label={tr('protectGuide')}
    >
      {/* deep-audit §6(a): while a protective stop is active the composer
          gives way to an action bar — no more scared follow-ups looping
          duplicate protective cards */}
      <Button variant="inverted" size="sm" block onClick={() => setStopDecision(protectDecision)}>
        {tr('protectGuide')}
      </Button>
      <div className="flex gap-2">
        <Button variant="inverted" size="sm" block onClick={copyHandover}>
          {tr('copyHandoverNote')}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-fg-standout-secondary enabled:hover:bg-veil-standout"
          onClick={tellMore}
        >
          {tr('tellMore')}
        </Button>
      </div>
    </div>
  ) : null

  /* home triage (Phase A/B): every tile enters a real deterministic route —
     the same scenario options the tester rail offers, in the active language */
  const scenarioOption = (id: string, list: 'turn1' | 'clarifyPrompts', i: number) => {
    const sc = scenarioById(id)
    const pack = sc?.[list]
    return (pack?.[lang] ?? pack?.en)?.[i]
  }
  const pickScenario = (id: string, list: 'turn1' | 'clarifyPrompts', i: number) => {
    const o = scenarioOption(id, list, i)
    if (o) handleScenarioOption(o)
  }
  const triageItems: TriageItem[] = [
    {
      id: 'shop',
      icon: <IconBag className="size-4" />,
      title: tr('catShop'),
      sub: tr('catShopSub'),
      onPick: () => handleSend(SCENARIO_SEEDS[0]!.userMessage, []),
    },
    { id: 'rent', icon: <IconHome className="size-4" />, title: tr('catRent'), sub: tr('catRentSub'), onPick: () => pickScenario('scn2', 'turn1', 0) },
    { id: 'upi', icon: <IconWallet className="size-4" />, title: tr('catUpi'), sub: tr('catUpiSub'), onPick: () => pickScenario('scn4', 'clarifyPrompts', 0) },
    { id: 'salary', icon: <IconBriefcase className="size-4" />, title: tr('catSalary'), sub: tr('catSalarySub'), onPick: () => pickScenario('scn4', 'clarifyPrompts', 1) },
    { id: 'notice', icon: <IconDoc className="size-4" />, title: tr('catNotice'), sub: tr('catNoticeSub'), onPick: () => pickScenario('scn3', 'turn1', 0) },
    {
      id: 'safety',
      icon: <IconShield className="size-4" />,
      title: tr('catSafety'),
      sub: tr('catSafetySub'),
      tone: 'danger',
      onPick: () => pickScenario('scn5', 'turn1', 0),
    },
  ]

  return (
    <AppShell
      title={activeCase && !noticeOpen && !stopDecision ? activeCase.titleNative : undefined}
      footer={
        // one input model per screen: the composer is always present (ChatGPT
        // parity — the home never hides the input); the active stop shows the
        // protective action bar. Tester prompt cards sit right above the
        // composer during a branching scenario.
        noticeOpen || stopDecision ? undefined : (
          protectiveFooter ?? (
            <div className="flex flex-col gap-2">
              {testerOptions && testerOptions.length > 0 && (
                <TesterPrompts
                  label={
                    stageRef.current === 'intake'
                      ? tr('testerHint')
                      : stageRef.current === 'clarifying'
                        ? tr('clarifyRailLabel')
                        : tr('postFindingLabel')
                  }
                  options={testerOptions}
                  onPick={handleScenarioOption}
                  active={items.length > 0}
                />
              )}
              {/* home suggestions dock above the composer (ChatGPT/Gemini) */}
              {empty && !activeCase && !(testerOptions && testerOptions.length > 0) && (
                <HomeTriage label={tr('triageLabel')} items={triageItems} />
              )}
              <Composer
                onSend={handleSend}
                sendLocked={busy}
                offline={offline}
                attachments={attachments}
                onAttach={(name) => setAttachments((a) => [...a, name])}
                onRemoveAttachment={(name) => setAttachments((a) => a.filter((x) => x !== name))}
              />
              {/* the standing disclaimer, where ChatGPT puts "can make mistakes" */}
              <p className="-mt-0.5 text-center text-2xs text-fg-tertiary">{tr('protoTag')}</p>
            </div>
          )
        )
      }
    >
      {noticeOpen ? (
        <DemandNoticeReview
          key={`${lang}-${matterFacts.amount}-${matterFacts.item}`}
          facts={matterFacts}
          subjectOverride={domain ? domainPack(domain.id, domain.branch, lang).noticeSubject : undefined}
          bodyOverride={domain ? domainPack(domain.id, domain.branch, lang).noticeBody : undefined}
          onBack={() => setNoticeOpen(false)}
        />
      ) : stopDecision ? (
        <StopScreen
          decision={stopDecision}
          onBack={() => setStopDecision(null)}
          onReRoute={tellMore}
        />
      ) : (
        <>
          {/* Case context (visual report chrome-economy): the case title moves
              INTO the header (AppShell title); the live summary becomes a quiet
              chip at the top of the thread — no second chrome band */}
          {(offline || LANGUAGES[lang].coverage !== 'full') && (
            <div className="flex flex-col gap-2 px-3.5 pt-3">
              {offline && <Banner tone="offline">{tr('offlineBanner')}</Banner>}
              {/* honest coverage signpost (deep-audit §6(e), Tier 2) */}
              {LANGUAGES[lang].coverage !== 'full' && <Banner tone="info">{tr('coverageNotice')}</Banner>}
            </div>
          )}
          <div className={spanRow}>
            <Thread
              scrollKey={`${items.length}-${busy}-${stageLabel ?? ''}`}
              autoScroll={items.length > 0}
              focusSelector={focusSelector}
              className={spans ? 'min-w-0 flex-1 ps-[max(1rem,env(safe-area-inset-left))]' : undefined}
            >
            {(() => {
              const focus = spans
                ? [...items].reverse().find((i) => i.kind === 'finding' || i.kind === 'caution' || i.kind === 'ladder')
                : undefined
              const threadItems = focus ? items.filter((i) => i.id !== focus.id) : items
              return (
                <>
            {activeCase && !empty && (
              /* live case summary — a quiet chip in the content flow, not a
                 chrome band (visual report: chrome economy) */
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSubSummaryOpen((v) => !v)}
                  aria-expanded={subSummaryOpen}
                  className="pressable inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-2xs font-medium text-fg-tertiary transition-colors hover:bg-hover-veil hover:text-fg-secondary"
                >
                  <IconFolder className="size-3.5 shrink-0 text-brand-fg" />
                  {tr('quickSummarise')}
                </button>
                {subSummaryOpen && (
                  <div className="w-full px-1">
                    <ThreadSummaryCard
                      lang={activeCase.lang}
                      summary={{
                        grievance:
                          [matterFacts.item, matterFacts.amount].filter(Boolean).join(' · ') ||
                          activeCase.continuity.memoryLine,
                        standing:
                          stageRef.current === 'engaged'
                            ? (lang === 'en' ? 'Finding on the table — see the card above' : tr('confClearDesc'))
                            : tr('factCheckSub'),
                        next:
                          activeCase.memory.find((m) => /step|चरण|ಹಂತ|निलೈ|निलை|مرحلہ/i.test(m.label))?.value ??
                          activeCase.statusLine,
                      }}
                    />
                  </div>
                )}
              </div>
            )}
            {empty && activeCase && (
              /* Case-Folder continuity: a new day chat NEVER opens blank —
                 the case's own language leads with memory + follow-up + chips */
              <div className="flex flex-1 flex-col justify-center gap-5 px-3.5 pb-8 pt-6">
                <CaseContinuityHeader onChip={handleContinuityChip} />
                <p className="text-center text-2xs text-fg-tertiary">{tr('caseSampleNote')}</p>
              </div>
            )}
            {empty && !activeCase && (
              /* home: ONE greeting, ONE voice affordance — suggestions live
                 in the dock above the composer, not on the canvas */
              <div className="flex flex-1 flex-col items-center justify-center gap-9 px-4 pb-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1
                    className={
                      'text-display-md font-semibold text-fg-primary' +
                      (lang === 'en' ? ' tracking-[-0.022em]' : '')
                    }
                  >
                    {tr('greeting')}
                  </h1>
                  <p className="mx-auto mt-2.5 max-w-[290px] text-body text-fg-secondary">{tr('homeSub')}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-3"
                >
                  <button
                    type="button"
                    onClick={() => navigate('/voice')}
                    aria-label={tr('speakCta')}
                    className="pressable rounded-full outline-offset-4"
                  >
                    <VoiceOrb state="idle" size="lg" />
                  </button>
                  <div>
                    <p className="text-sm font-medium text-fg-primary">{tr('speakCta')}</p>
                    <p className="mt-0.5 text-2xs text-fg-tertiary">{tr('langHint')}</p>
                  </div>
                </motion.div>
              </div>
            )}

            {threadItems.map((item) => {
              switch (item.kind) {
                case 'user':
                  return (
                    <MessageBubble
                      key={item.id}
                      role="user"
                      dataId={item.id}
                      voiceMeta={item.voice ? { duration: '0:18', edited: true } : undefined}
                    >
                      {item.text}
                    </MessageBubble>
                  )
                case 'assistant':
                  return (
                    <MessageBubble
                      key={item.id}
                      role="assistant"
                      dataId={item.id}
                      actions={
                        item.stream ? undefined : (
                          <Button
                            variant="ghost"
                            size="sm"
                            leadingIcon={<IconCopy className="size-3.5" />}
                            onClick={async () => {
                              const ok = await copyText(item.text ?? '')
                              if (ok) toast.success(tr('copied'))
                            }}
                          >
                            {tr('copy')}
                          </Button>
                        )
                      }
                    >
                      {item.stream ? (
                        <p className="whitespace-pre-line text-sm leading-relaxed">
                          <StreamText
                            text={item.text ?? ''}
                            onDone={() =>
                              setItems((prev) =>
                                prev.map((i) => (i.id === item.id ? { ...i, stream: false } : i)),
                              )
                            }
                          />
                        </p>
                      ) : (
                        <p className="whitespace-pre-line text-sm leading-relaxed">{item.text}</p>
                      )}
                    </MessageBubble>
                  )
                case 'system':
                  return (
                    <MessageBubble key={item.id} role="system">
                      {item.text}
                    </MessageBubble>
                  )
                case 'noticecard':
                  return (
                    <MessageBubble key={item.id} role="assistant" dataId={item.id}>
                      <Card className="flex flex-col gap-2.5">
                        <h3 className="text-lg font-semibold text-fg-primary">
                          {tr('noticeCardTitle')}
                        </h3>
                        <p className="text-sm leading-relaxed text-fg-secondary">
                          {tr('noticeCardBody')}
                        </p>
                        <Button variant="primary" size="sm" className="self-start" onClick={() => navigate('/notice')}>
                          {tr('noticeCardOpen')}
                        </Button>
                      </Card>
                    </MessageBubble>
                  )
                case 'finding':
                  return (
                    <MessageBubble key={item.id} role="assistant" dataId={item.id}>
                      <FindingCard
                        data={findingData}
                        onUpdate={setFindingData}
                        onDiscard={() => {
                          setItems((prev) => prev.filter((i) => i.id !== item.id))
                          toast('Finding discarded')
                        }}
                      />
                    </MessageBubble>
                  )
                case 'ladder': {
                  const dp = domain ? domainPack(domain.id, domain.branch, lang) : null
                  return (
                    <div key={item.id} data-chat-item={item.id} className="scroll-mt-20">
                      <ActionLadder
                        mode={item.variant ?? 'full'}
                        onOpenNotice={() => setNoticeOpen(true)}
                        facts={matterFacts}
                        drafts={dp?.drafts}
                        prep={dp?.prep}
                        stepTitles={dp?.stepTitles}
                        channel={dp?.channel}
                        initialExpandedStep={item.initialExpandedStep}
                      />
                    </div>
                  )
                }
                case 'counter':
                  return (
                    <div key={item.id} data-chat-item={item.id} className="scroll-mt-20">
                      <StatutoryCounterCard
                        title={item.counterData?.title}
                        statutoryBasis={item.counterData?.statutoryBasis}
                        replyText={item.counterData?.replyText ?? ''}
                      />
                    </div>
                  )
                case 'caution':
                  return (
                    <MessageBubble key={item.id} role="assistant" dataId={item.id}>
                      <CautionCard
                        decision={item.decision}
                        onConsumer={reConsumer}
                        onNotice={reNotice}
                        onOther={() => reOther(item.decision)}
                        onDiscard={() => {
                          setItems((prev) => prev.filter((i) => i.id !== item.id))
                          toast('Caution card discarded')
                        }}
                      />
                    </MessageBubble>
                  )
                case 'closeout':
                  /* while the post-finding rail owns the follow-ups, the
                     closeout card would be a second competing menu — it
                     returns alone once a rail path resolves the matter */
                  if (testerOptions) return null
                  return (
                    <div key={item.id} data-chat-item={item.id} className="scroll-mt-20">
                      <CloseOutCard findingTitle={findingData.title} />
                    </div>
                  )
                case 'factcheck':
                  return (
                    <MessageBubble key={item.id} role="assistant" dataId={item.id}>
                      <FactCheckCard
                        facts={factItems}
                        whenOptions={factItems.some((f) => f.key === 'when') ? whenOptions : []}
                        signed={factSigned}
                        onEdit={() => setFactSigned(false)}
                        onConfirm={confirmFacts}
                      />
                    </MessageBubble>
                  )
                case 'protective':
                  return (
                    <MessageBubble key={item.id} role="assistant" dataId={item.id}>
                      <ProtectiveCard
                        decision={item.decision!}
                        onOpenGuide={() => setStopDecision(item.decision ?? null)}
                        onReRoute={tellMore}
                      />
                    </MessageBubble>
                  )
                case 'handover':
                  return (
                    <div key={item.id} data-chat-item={item.id} className="scroll-mt-20">
                      <HandoverCard
                        tierLabel={item.decision?.tier === 'caution' ? tr('tierCaution') : tr('tierHardStop')}
                        why={item.decision?.why ?? ''}
                      />
                    </div>
                  )
                case 'error':
                  return (
                    <div key={item.id} data-chat-item={item.id} className="scroll-mt-20">
                      <Banner
                        tone="danger"
                        action={
                          <Button variant="secondary" size="sm" onClick={retryError}>
                            {tr('retry')}
                          </Button>
                        }
                      >
                        <p className="font-semibold">{tr('errorTitle')}</p>
                        <p className="mt-0.5 text-2xs">{tr('errorBody')}</p>
                      </Banner>
                    </div>
                  )
                default:
                  return null
              }
            })}

            {busy && (
              <div className="flex items-center gap-1.5">
                <TypingIndicator stageLabel={stageLabel} />
                <Button variant="ghost" size="sm" onClick={skipBeats}>
                  {tr('skip')}
                </Button>
              </div>
            )}
                </>
              )
            })()}
          </Thread>
          {spans && focusPane}
          </div>
        </>
      )}
    </AppShell>
  )
}
