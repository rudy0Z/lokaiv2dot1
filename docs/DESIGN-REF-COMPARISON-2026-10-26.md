# Design-Reference Comparison & v1 Component Gap Inventory

**Date:** 2026-10-26 · Sources: Perplexity + ChatGPT style-reference specs (owner-provided), the Gemini
team's own visual-design write-up (design.google/library/gemini-ai-visual-design), and a full component
inventory of v1 (`Lokaifm-main`, 24 components, 16 pages, ~3,600 lines of data). Read together with
`docs/QUALITY-AUDIT-2026-10-26.md`.

---

## 1. What the reference systems do better (token-level)

Both reference systems are **flatter and quieter** than ours. Ours is directionally right (warm paper base,
one accent, serif register) but carries more visual weight than the market leaders.

| Axis | Perplexity | ChatGPT | LokAI v3 today | What to adopt |
|---|---|---|---|---|
| Shadows | ONE 1px shadow in the whole system (suggestion cards); otherwise flat | **Zero shadows** — elevation = 1px hairline border, "flat by conviction" | `shadow-default` on primary buttons AND cards; `shadow-large/xl` on frame, tray, dialogs | Restrict shadows to true floaters (attachment tray, dialogs, tab bar, frame). Buttons and cards get **none** — separation by tone step only (already our card model; buttons still carry a shadow) |
| Radii | One radius per control class: cards 16, inputs 12, buttons 6, chips pill | 10px for buttons/nav/cards; pill ONLY on the login CTA | Pill buttons everywhere, 22px cards, 26px composer, pill chips | Keep, but stop mixing: pill = pressables, 22px = surfaces, 26px = composer. Never shadow a pill |
| Type weights | 400–500 **only**; hierarchy by color + spacing, no bold display | 400 body, 600 in one place (24px welcome) | 400–600 sans + 600 serif display | Drop 600 from small UI labels (chips, tab labels → 500); reserve 600 for the serif display register |
| Display size | — (no display tier) | **24px cap** — "conversational, not promotional" | 33.6px greeting | Keep our larger display (mockup-pinned, Pi-like) but only on human moments — already true |
| Element gaps | 8px; compact density | 6px; 24px section gaps | mixed 8–12px | Standardize: 8px inside components, 24px between sections |
| Reading column | 900px max | 720–768px | 390px frame (mobile-first) | n/a — mobile frame is our container |
| Hover/press | color shifts | 5% black veil, never flash | press 0.96 + hover veil ✓ | parity |
| Color discipline | ONE teal for nav-active/NEW/glow only | achromatic entirely | one green + semantic statuses ✓ | our statuses are product-required (confidence/verification) — keep; never add a second accent |

**Where we already lead the references:** trust semantics (verification badges, confidence levels, [VERIFY]
stamps — none of these systems has any), 5-script/23-language typography with per-script scales, the serif
"human register", and the voice-first orb.

**Gemini-team lessons (design.google) — applicable to us:**

1. **Gradients as energy transfer with direction** — "sharp, near-opaque leading edges that diffuse into a
   tail, acting as visual pointers." Our orb is a beautiful vessel but a *static* one. Concretely: while
   thinking, the orb's gradient should show **inner activity** (a slow directional drift under the surface);
   when responding, energy **blossoms outward** (concentrated → diffused — exactly their voice-transcription
   pattern). This is the single biggest quality lever left in our signature element.
2. **Motion makes processing transparent** — animations have defined start/end, speed creates anticipation
   then release. Our thinking state (`scale 0.94, opacity 0.8`) is our weakest beat; Gemini would put the
   work *inside* the orb, not a label next to dots.
3. **Softness builds trust in an ever-changing system** — validates our rounded, borderless, tone-step
   surfaces; keep going flatter (see shadows row).

## 2. Is the chat interface properly ready? — honest audit

Against the seven-state anatomy (queued → thinking → streaming → complete → error → regenerating → stopped)
and the references:

| State | Status | Gap |
|---|---|---|
| Empty/input-first | ✅ input-first, chips, one-time disclaimer | — |
| Queued/thinking | 🟡 narrated beats + dots | **Acknowledgment latency ~4.75s** (audit P2-1, unfixed); no Stop control during beats (reference anti-pattern: "no stop button") |
| **Streaming** | 🔴 **none** | Messages arrive all-at-once after beats. **v1 already solved this** — `StreamText` (word-by-word reveal + solid caret that blinks once, rests 1400ms, leaves). Port it; this is the single biggest chat-quality gap |
| Complete | ✅ cards + actions | Plain assistant *text* messages lack copy/regenerate affordances (v1 `TurnActions` had them) |
| Error | ✅ distinct + retry + "nothing was sent" | — |
| Regenerating | ✅ on generative cards (variant swap) | — |
| Stopped/interrupted | 🔴 | Not modeled (partial output preservation) |
| Composer | ✅ grows to cap, Enter/Shift+Enter, mock tray | — |
| Scroll | ✅ near-bottom auto-scroll | Missing "jump to latest" pill when scrolled up (audit P2-5) |
| Haptics | 🔴 | v1's `useHaptic` not ported (mobile-native: feedback on commit moments) |

**Verdict: the chat chassis is solid; the *streaming feel* is not market-ready.** Port v1's StreamText +
fix beat latency + add message-level actions, and the thread matches the references.

## 3. v1 components we do NOT have — the serious gap list

v1 was far richer than "the demo journey." Inventory vs v2:

### 🔴 Missing entirely (high value)

| v1 component | What it did | Where it belongs in v2 |
|---|---|---|
| `ScanDocument.tsx` | **The scanner animation**: paper page + saffron scan bar sweep + page turn, `scanning → done`, honest-beat law | NoticePage reading phase — reskinned to the botanical green bar |
| `MatterFolder.tsx` + `ExhibitPaper.tsx` + `MobileFiles.tsx` | **Documents vault**: folder flap swings open (3D, tap-driven), three exhibit cards fan out; exhibits grouped by matter | Saved/Documents tab — the folder IS the documents experience |
| `LokAIWorkflow.tsx` + `MobileConsumerCase.tsx` | **The cases experience**: 11-stage workflow (intake → clarify → verify → assess → plan → packet → audit → escalation), live `GroundingMeter`, progress list, source-coverage pills, stage slide transitions | The History → matter-detail screen (currently a dead-end list) |
| `FactCheck.tsx` (`InlineFactCheck`) | Verification gate INSIDE the conversation: confirm/correct facts before drafting | Between our clarify chips and the finding card (A2.7 made tangible) |
| `HandoverPacket.tsx` + `DecisionReceiptView` + `GateTrail`/`DecisionSpine` | What the user receives when LokAI stops: fact summary + decision receipt + the visible trail of gates | StopScreen second pane + thread receipt after stops |
| `LegalTerms.tsx` | Inline legal-term links with glossary dialogs (plain-words definitions) | Finding card + notice summary text |
| `motion.tsx` (`StreamText`, `StageTransition`, `NumberTicker`, `ShimmerLine`, `useHaptic`) | The motion layer | v2 has only TypingIndicator + orb |
| `RouteErrorScreen.tsx` | Route-level error fallback | v2 crashes white on a route error |
| `CommandPalette.tsx` (cmdk) | Desktop command palette | Desktop frame navigation (optional, low priority) |

### 🟡 Deliberately different (document the decision, don't silently drop)

| v1 | v2 decision |
|---|---|
| `Sidebar.tsx` + `MatterDrawer.tsx` (drawer = whole nav: greeting, search, My documents, active matter, past matters, language, appearance) | Bottom tab bar per the owner mockup. The drawer's *content surfaces* (My documents, active matter status) are the real gaps — they map to Saved/Documents + History detail |
| `FlashcardDeck.tsx` (Quick Recap swipe/flip) | Not ported — candidate for the Saved tab ("recap a matter") |
| `VoiceFactChips.tsx` (tap-to-select transcript facts) | Review & send could adopt for detail extraction |
| `SettingsPanel`, `DeviceFrame`, `GuardrailGallery` | Covered by Profile / our frame / gallery stop-screen preview |

### ✅ Already at parity or better

Composer anatomy, stop screens (2 treatments + DLSA), notice interpreter (tap-to-source + editable fields),
finding card, action ladder, caution state, demand-notice paper + consent, voice-first flow, offline/error
states, 23-language system (v1 had 4), WCAG-gated tokens, scenario launcher.

## 4. Priority order (design-quality first)

1. **Port `StreamText`** (caret streaming) + cut first-beat latency → the thread feels like ChatGPT.
2. **Port `ScanDocument`** into the notice flow (green scan bar) — the most-remembered v1 moment.
3. **Shadow diet** (buttons/cards lose shadows; floaters keep) + weight diet (no 600 on small labels).
4. **Orb thinking-state**: inner gradient activity per Gemini's concentrated→diffused pattern.
5. **Port `MatterFolder` + exhibits** as the Documents/Saved experience; wire History rows to a matter view.
6. **Port `InlineFactCheck` + `HandoverPacket`/receipt** — they *are* the trust thesis, made tangible.
7. `LegalTerms` glossary, message-level actions, jump-to-latest, RouteErrorScreen, haptics.

Items 1–4 are pure quality; 5–7 are the v1 accountability layer that the case-study thesis ("building trust
in legal AI for Indians") needs to be complete. §3's 🔴 list is roughly a two-phase effort at v1's depth.
