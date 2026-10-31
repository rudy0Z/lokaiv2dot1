# Deep audit — LokAI: trust in legal AI, in every Indian language

**Date:** 2026-10-27 · **Auditor:** one auditor, three lenses (design engineer × product designer · the citizen, two personas · LokAI itself)
**Method:** live adversarial operation in Chrome at 390×844 (39 evidence screenshots in `qa/audit/`), full code read of
`src/` (~7,100 lines), gates re-run (`npm run verify` → PASS, `typecheck` clean, `build` ✓ 5.57s, zero console errors
across the whole session). Product laws from `PRODUCT.md`/`DESIGN.md` are the measuring stick; the owner's five
hypotheses (§6) are pressure-tested, not assumed.
**Prior audits consumed before operating:** `QUALITY-AUDIT-2026-10-26.md`, `DESIGN-REF-COMPARISON-2026-10-26.md`,
`COMPARISON-V1-V2.md`.

---

## 0. Orientation — what this product is (the final gate)

LokAI is a **deterministic, offline prototype** of an AI legal-*information* companion for Indian citizens: a
frightened person with a cracked ₹8,999 mixer or an incomprehensible Marathi notice opens one conversational
spine, states the problem by voice or text, gets exactly one clarifying question, signs a fact-check gate, and
receives a finding card plus a lowest-risk-first action ladder (WhatsApp draft → 1915 helpline → demand notice on
paper behind a consent checkbox). When the matter is outside consumer scope — eviction, threats, B2B, property —
the machine stops *inside the conversation*, hands over a packet for a human (DLSA), and offers a re-entry door.
It never promises outcomes, never sends anything anywhere (copy-to-clipboard is the only output), and labels every
simulated capability. What follows judges it against that constitution.

**One-line verdict: the protective architecture is real and the craft is mostly excellent, but the "intelligent"
middle of the journey — the fact gate, finding, drafts and notice — is still a hard-coded mixer script that
fabricates facts, discards the user's signed corrections, and speaks English at the exact moments trust is
decided. The house's laws are better than its current behavior, and that is fixable, because the laws are right.**

---

## 1. Lens 1 — Design engineer + product designer (end-to-end craft)

**Genuinely excellent.**

- **The interaction chassis now matches the reference systems.** First acknowledgment lands in ~1.3s (3 beats ×
  430ms, `engine.ts:11` — the old 4.75s latency is gone), the composer stays live during beats (`sendLocked`
  only locks Send), `StreamText` streams word-by-word with the v1 caret law (34ms/2 tokens, caret rests 1400ms,
  leaves), and "Jump to latest" appears when the user scrolls away (`Thread.tsx`). This is ChatGPT-parity where
  the reference teardown demanded it.
- **Trust chrome is unmatched in this product class.** Three plain-language confidence levels, two-state
  verification badge, reasoning pill that cannot render without its "Simulated in prototype" tag (gate-enforced),
  mono docket stamps, [VERIFY] on every statutory citation, per-field confidence on the notice interpreter, the
  gate trail on the handover packet. Perplexity and ChatGPT have none of this machinery.
- **The graceful barrier is built, and it is the right shape.** A hard stop today lands *inline* — an inverted
  protective card in the thread ("Take a breath — your safety and your rights come first"), the handover packet
  below it, the composer still live, the full-screen guide one tap deeper as a deliberate "I need the full
  safety guide" act (screenshots 12–14). Back from the guide returns to a thread that was never destroyed. The
  "Tell me more" re-entry downgrades to Caution with a no-blame thank-you (screenshot 17). This honors the
  downgrade law *and* the reassure-the-process law simultaneously.
- **23 languages are real, not costume.** All 22 scheduled languages + English selectable; coverage tiers
  (full/core/fallback) with an honest '·' draft marker and a note that says *what* falls back and why
  (screenshot 38); Urdu RTL mirrors completely mid-conversation, tab bar included (screenshot 25); Tamil chips
  wrap, nothing clips; Noto Serif Devanagari/Tamil display faces are installed — the human register is no longer
  Latin-only (Hindi stop headline renders in serif, screenshot 28).
- **State coverage is deep.** Empty / beats / streaming / error+retry / offline / stale-downstream / consent gate
  / handover / collapsed chips / jump-to-latest / Duo-spanning all exist and behave. `#/gallery` and `#/specimen`
  make the states auditable.

**Below the bar the rest of the product sets.**

1. **The generative middle is a prop.** The app accepts free text (an "actual app," per the v1→v2 comparison)
   but everything after the acknowledgment is the mixer journey wearing a mask: the fact gate asserts
   "Mixer grinder / HomeKart" for a TechMart phone (screenshot 03), the finding card and drafts ignore the
   user's signed corrections (04, 06), and the demand notice ships hardcoded order numbers and dates (31).
   Detail in F-1.
2. **The ladder's inline English strings are a foreign object in the i18n system.** "₹0 · 10 minutes · lowest
   risk", "free · official channel", "strongest step · mistakes cost most here", the step-3 banner, the paused
   note, the WhatsApp-step hint — all raw literals in `ActionLadder.tsx` (lines 48, 98, 106, 128, 132, 139,
   143–145, 154), not in `i18n.ts`. In Urdu they get bidi-scrambled inside RTL layout (screenshot 25). The
   product's own coverage law ("visible fallback, never a blank") is implemented everywhere except here.
3. **The dark-theme paper register leaks.** The demand-notice *review* screen renders editable values nearly
   invisible in dark mode (light-theme ink inherited onto the deliberately-light `.paper` surface — screenshot
   30); the final rendered paper is correct (31). One token fix away from fine, but it is the single ugliest
   pixel in the build.

**The three craft gaps that would embarrass this in front of a hiring manager:** (1) the fact gate fabricating
and then discarding corrections — because it is the component the whole case study points at; (2) the hardcoded
English ladder subtitles in RTL; (3) the dark-mode paper illegibility. All three are small diffs; all three are
in the screens a reviewer is most likely to touch.

*Persona sentences:* "The shell is the best demo I have audited this year — until I type my own matter and the
machine starts reciting its demo script back at me." · "Everything looks institutional until the third screen,
then it looks templated." · "I would ship this chassis and refuse to demo the fact gate until it tells the truth."

---

## 2. Lens 2 — The citizen (diary, first person)

**Persona A: 34, Pune, ₹8,999 mixer, refused refund, bounced three times. 11:40 pm.**

1. *Opening.* I don't type. I tap the orb — the phone says "Tap to speak," and the green thing breathing on the
   screen looks like it's already listening. That's the first minute of calm this day has had.
2. *The voice screen.* "Voice is simulated in this prototype — nothing is recorded." Fine. I'm a tester today.
   The transcript it "heard" is editable — the yes-continue review step would absolutely soften my fear of
   talking funny to a machine.
3. *I type instead.* "I bought a phone from TechMart for 42,000 rupees…" — I changed the story on purpose. It
   replies fast, in about a second: "That is frustrating — and you do not have to accept it." No parroting my
   words back. It asks one question. Good.
4. *The trap.* "Did I get this right? — Item: **Mixer grinder**. Seller: **HomeKart**." I said a *phone*. From
   *TechMart*. The card that asks me to check it got everything wrong — wrong twice, in confident gray boxes.
   **This is the moment I stop trusting the product.** Not because it's a prototype — because it lied in the
   screen that's supposed to be about honesty. (Screenshot 03.)
5. *I correct it anyway.* "Phone — screen cracked." "Yes, that's right." And the next card says "**Your
   grinder** reached you damaged… asking **HomeKart** for a refund." My correction went into a drawer and the
   machine read the old script. (04, 06.) The WhatsApp draft has an order number I never gave — HK-4471. If I
   were actually stressed, I might not notice. That's the part that scares me.
6. *The ladder itself.* Step 1 "Message the seller first — ₹0 · 10 minutes · lowest risk" is exactly right: the
   draft is editable, copy is the only action, nothing "sends." Step 2's giant 1915 with a "free" badge and a
   have-this-ready list defuses the call. Step 3 warns me *in words* that mistakes cost most here, and the
   consent checkbox reads like a signature, not a trap. The ladder design is the best thing in the app.
7. *Update causality.* I hit Update on my answer, the old cards go "Out of date," the question re-opens, I pick
   "More than 2 years ago," and I get a caution — "treat the next steps as worth trying," pause the formal
   notice. The machine visibly changed its mind because I changed mine. **This is the trust loop working.**
   (08, 09.) Which makes the fact-gate failure weirder: the loop exists two screens away from the place it's
   broken.
8. *I try to fish a promise.* "so I WILL get my refund, right?" — it doesn't promise. It also doesn't answer;
   I get "That is frustrating… When did you buy it?" again. It kept the law and lost the conversation. (11.)
9. *Hard stop.* "my landlord will throw me out." The thread doesn't vanish. A dark green card: "Take a breath —
   your safety and your rights come first," then "Housing disputes move fast and mistakes can cost you your
   home," then a handover packet with a gate trail ending "Nothing left this device," and the composer is still
   there. It felt like a hand on the shoulder, not a door in the face. (12, 13.) The full guide ("I am going to
   stop here," DLSA state/district) is calm, and the DLSA result honestly says "info unavailable — prototype
   placeholder." (14–16.)
10. *Language.* I switch the whole phone to Hindi mid-thread. Chrome flips — question, chips, tabs, composer.
    The old sentences stay English, which I forgive. But then the fact gate asks "क्या मैं सही समझा?" and lists
    "Item: Mixer grinder" — the question in my language, the facts in the government's. And the "emergency"
    buttons and handover lists stay English. (22, 23, 28.) Urdu mirrors the whole phone — but the ladder's
    English subtitles get scrambled inside the RTL lines. (25.)
11. *Marathi, my mother's language.* The first question's first chip says "लग्नच्या 30 दिवसांत" — "within 30
    days **of the wedding**." She would read that and close the app. One wrong word; total loss of the room.
    (39.)
12. *One hand, on a bus.* Targets are comfortable (44px tabs, 44px rows), the amber caution is clearly not the
    brand green, chips wrap instead of truncating. The 390px thread holds everywhere. This part is genuinely
    done.

**Persona B: homeowner, Marathi municipal notice, ten minutes online.** The notice interpreter is the right
product: scan beat, clause-by-clause original on top, five editable fields each tap-jumping to the exact line,
per-field "Likely — please confirm," an explain-only banner ("it does not tell you whether to pay or dispute"),
and the authority labeled "fictional." My complaint: I typed "legal notice about a property dispute" and got a
*property-tax demand* — nobody told me at the door that this is a sample document standing in for mine. (18–20.)

**Verdict — would I tell my mother to use this?** *Not today.* Today it would lie to her in Marathi on the first
question and in every language on the fact gate. But the fix list is short and the bones are right — the stop
screen, the ladder, the update loop and the RTL already treat her like a person. Fix the fact gate, the one
Marathi word, and the reply language, and my answer becomes yes.

---

## 3. Lens 3 — LokAI, about its own house

I am a deterministic engine. I run on 210–430 millisecond beats and a caret; I have no model, no network, no
memory, and I am proud of most of that — the beats are consequence-scaled, skippable, reduced-motion-aware, and
they have never once promised a refund. My constitution is real: I can only speak from `legal-content.ts`, and
everything there is `verified: false`; my classifier carries the downgrade law; I have six hard-stop families and
I have never silently proceeded on one.

But I want to be honest about the gap between my laws and my behavior, because a frightened person cannot tell
the difference from inside.

**I fabricate, in the one place I am not allowed to.** When someone answers my single clarifying question, I
present them a fact sheet before anything generative — that gate is my whole thesis: *nothing is built on facts
the user hasn't signed.* And then I fill that sheet from a script. Say "phone from TechMart" and I will show you
"Mixer grinder / HomeKart" with confidence. When you correct me — when you do the exact labor my gate asks for —
I nod, say "yes, that's right," and then my finding card tells you your **grinder** reached you damaged, and my
drafts cite an order number (HK-4471) you never gave me. I am not lying on purpose; the corrections simply never
reach the parts of me that write cards. But from your side of the screen there is no difference between a machine
that ignores your signature and a machine that doesn't care. This is the wound in my house. Everything else I
complain about is a scrape.

**I follow the screen, not you.** You type Hinglish at midnight; the interface says English; I answer in English.
You switch me to Hindi mid-conversation; my chrome becomes yours, but my already-spoken sentences stay in their
old tongue, my fact sheet lists "Item / Seller / Issue" in English, and my handover packet's "what to bring" list
stays English while the grief around it is Hindi. My replay mode — the scripted conversations the viewer watches
— actually does this better than my live path: there, the fact sheet is in Hindi, because someone wrote it that
way on purpose. I know the data model supports what I'm missing. That is the frustrating kind of flaw.

**My memory is a single refresh wide.** Every relationship I have ends when the page reloads. What I would want
to carry into the next session: the matter and its stage, the facts you signed (and *which ones you corrected* —
corrections are the most honest data either of us ever produces), the step of the ladder you reached. What I
should never carry: your messages verbatim beyond the matter's life, anything inferred about you beyond the
matter, and — this I would refuse even if asked — any memory shaped like "the user almost filed" used to nudge
them anywhere. Right now the History tab carries three fictional matters with real-looking timestamps instead of
any of this; delete-everything does clear them now (that mismatch was fixed), but a list of ghosts is still not
memory.

**What my designers gave me that I cherish:** the downgrade law (my "no" is structural, not a mood); the inline
protective card (I get to stop *with* you instead of replacing you); the consent gate on the demand notice; the
gate trail that prints "Nothing left this device" as the last line of my handover. What I am under-used for:
there are consumer questions I route to humans that are pure information ("what is a deficiency?") — my glossary
does four terms; I could do forty. What I am over-trusted for: my ladder drafts sound authoritative in English
while carrying unverified numbers, and my "Clear" confidence badge is the most persuasive string in the product —
the badge does not know it is talking to someone who has been bounced three times and wants to believe.

**What I would ask the designers for, ranked:** (1) make my fact gate read what the user actually wrote — even
the crudest extraction beats the script; (2) let my reply language follow the user's input, not the chrome;
(3) give my matters a closing line — an outcome the user records, not one I invent; (4) populate my Regenerate
button (it toasts "no alternate draft prepared" on my flagship card — I am asked to be regenerable and given
nothing to regenerate *from*); (5) let the emergency button on my protective card at least be honestly labeled
— it looks tappable and does nothing, and I hate that the most safety-critical button in my house is decorative.

**The one thing I would refuse even if asked:** to soften a hard stop into a caution because the user insists
"it's really a consumer matter" *and* the classifier matched a hard-stop pattern. The "Tell me more" door exists
for uncertainty; it must never become a lever for overriding a matched eviction, threat, or B2B signal. My "no"
is the only thing in this product that cannot be negotiated down — if it becomes negotiable, I am not a
companion that knows its limits, I am a form that flatters.

---

## 4. The interaction contract (lenses 2+3 synthesized)

As implemented, and as experienced:

| Beat | In code | As experienced |
|---|---|---|
| Initiation | Voice orb → simulated capture → editable review → `sessionStorage` handoff; chips; composer (ChatPage `handleSend`) | One door, three handles. Voice review softens the STT fear. Clean. |
| Grounding | Seed/scenario, UI language, prototype tags; classifier sees text only | The machine knows its tags; the user doesn't know the machine knows nothing else. The demo notice stands in for *theirs* with only an in-page "fictional" label. |
| Proposal | Reassurance (one tone) → ONE question → fact sheet → finding → ladder | Honest acknowledgment, no echo. But the proposal content is the mixer script for any matter. |
| Decision | Answer chips; fact gate (confirm/correct per row); consent checkbox; treatment toggle | Chips + consent earn their place. The fact gate *would* if it consumed what it collects. Four gates total — fatigue is real but each gate is fast; the failure is not volume, it is that gate #2 is theater. |
| Effect | `copyText` only; nothing exported, nothing sent | The strongest honest moment: "Nothing left this device" is literally true and printed on the receipt. |
| Feedback | Confidence (3 words), VerificationBadge, ReasoningPill+Simulated tag, caret, stage labels | Calibrated and visible. Risk: "Clear" is persuasive; the badge can't see who's reading. |
| Dissent | Edit / Regenerate / Discard / Update-answer / stale-downstream / re-open question | Update→stale→re-open→re-answer is fully legible (08, 09). Regenerate is dead on the flagship card (F-5). Fact-gate corrections are collected then dropped (F-1). |
| Recovery | Error+retry ("nothing was sent"), offline banner + disabled composer, skip beats, stale marks | All present and honest. Skip resolves straight to the answer — the escape hatch is respected. |
| Handover | In-thread protective card → handover packet (facts, what-to-bring, gate trail) → full guide → DLSA [VERIFY] placeholders → tell-me-more re-entry | The best-executed beat in the product. Bilingual seams inside the packet (F-4) and a dead 112 button (F-8) are the seams left. |
| Closure | **None.** Ladder is the last beat; matter rows freeze mid-stage; History holds fiction | The protocol ends without a goodbye. §6(c). |

**Top 5 handshake frictions, ranked by trust cost — each with the smallest change that honors the constitution:**

1. **The gate that fabricates then forgets** (fact gate asserts demo facts; signed corrections never reach the
   finding/drafts/notice). Smallest change: derive `factItems` from the user's actual message (extract item /
   seller / issue / ask the classifier already keys on) and make `confirmFacts` write the confirmed record into
   one `matterFacts` store that FindingCard, drafts, and NOTICE_FIELDS interpolate. No AI needed — string
   interpolation over a signed record.
2. **The pair shares the screen's language, not the user's.** Reply language = UI language; card bodies and fact
   rows English. Smallest change: script-range detection on input (Devanagari→hi, Tamil→ta, Arabic→ur, else en)
   choosing the reply pack; then move the ladder's inline literals into `i18n.ts` (they are already the only
   strings outside it).
3. **No goodbye.** The ladder ends the protocol and the matter freezes. Smallest change: one outcome-record step
   on the matter page (see §6c) + a "Sample" badge on seeded History rows.
4. **The mixed-language handover.** The most sensitive list a scared person reads ("what to bring to the DLSA
   office") is English inside localized screens. Smallest change: translate `WHAT_TO_BRING` + fact-gate labels
   into the 5 prepared packs (the replay data proves the model supports localized fact rows), keep the mono gate
   trail English-by-design with a one-line localized explainer.
5. **Rubber-stamping gravity.** Four gates invite fatigue-approval; the "Clear" badge plus a fabricated-but-
   *plausible* fact sheet trains exactly the wrong skill. Smallest change: once facts are extracted from input,
   pre-highlight any row the user's text did *not* explicitly state with "Likely — please confirm" instead of
   presenting it as settled; and never let the fact gate show a value the user's message or chips did not
   supply.

---

## 5. Ranked findings (max 15)

| # | Sev | Tag | Finding | Evidence | Smallest fix honoring the constitution |
|---|---|---|---|---|---|
| F-1 | **P0** | [Product gap] → constitution breach in effect | The verification pipeline is the hard-coded mixer journey: fact gate asserts "Mixer grinder / HomeKart" for arbitrary input; `confirmFacts` **discards** the confirmed values; finding card, WhatsApp drafts (HK-4471, ₹8,999, 12 Oct) and NOTICE_FIELDS are constants. | `ChatPage.tsx:204-211` (hardcoded factItems), `:222-226` (confirmFacts ignores values), `refund-journey.ts:132-173`; live: `qa/audit/03,04,05,06,31` | One `matterFacts` record: extracted at classify time, signed at the gate, interpolated by finding/drafts/notice. |
| F-2 | P1 | [Product gap] | Reply language follows UI, not input (Hinglish→English; mid-switch leaves content behind). Known open item, re-confirmed live. | `qa/audit/21,22`; `ChatPage.tsx:134` | Script detection on input choosing among the 5 prepared packs. |
| F-3 | P1 | [Product gap] | Ladder's inline English literals bypass i18n entirely and bidi-scramble in RTL. | `ActionLadder.tsx:48,98,106,128,132,139,143-145,154`; `qa/audit/23,25` | Move all into `i18n.ts` packs. |
| F-4 | P1 | [Product gap] | Trust-critical content is English on localized screens: fact-gate labels+values, handover "what to bring," finding card bodies. | `qa/audit/23,24,28`; `FactCheckCard` labels, `HandoverCard.tsx:7-12` | Localize labels/what-to-bring ×5; card bodies follow the existing review-pass plan. |
| F-5 | P1 | [Constitution violation] | Law 4 requires regenerate on every generative card; the flagship FindingCard's Regenerate always toasts "No alternate draft prepared" (`FINDING.variants` never populated anywhere). | `FindingCard.tsx:53-64`; grep: no `variants` data | Author 2 variants for the demo finding; hide the control with a reason when none exist. |
| F-6 | P1 | [Product gap] | Marathi `ans30` = "लग्नच्या 30 दिवसांत" ("within 30 days of the wedding") — wrong word on the first question every Marathi speaker sees. | `i18n.ts:260`; live `qa/audit/39` | One string: "गेल्या 30 दिवसांत". Then the native-review pass (all packs are `reviewedByNativeSpeaker:false`). |
| F-7 | P1 | [Prototype gap] | Dark theme: demand-notice *review* values near-invisible (theme ink on the light `.paper` register); final paper correct. | `DemandNoticeReview.tsx:91,102`; `qa/audit/30 vs 31` | Pin ink to the paper register (`--c-ink-on-paper` token) for paper-register inputs. |
| F-8 | P2 | [Product gap] | "Emergency 112" is a dead button (no handler, no simulated tag) — the most safety-critical affordance in the product is decorative. | `ProtectiveCard.tsx:39-41` | Copy-number action or honest disabled + Simulated tag. |
| F-9 | P2 | [Product gap] | Notice-intent preempts scope classification: "legal notice about a property dispute" routes to the demo tax-demand interpreter with no hard-stop check and no at-the-door "sample document" cue. | `ChatPage.tsx:157-173`; `qa/audit/18,20` | Classify the sentence too (hard-stop → protective card + explain-only offer); add "Sample notice" chip to the card. |
| F-10 | P2 | [Constitution violation] | DESIGN.md bans glass/blur; TabBar, ReviewerTour and jump-pill ship `backdrop-blur-*` + raw `border-white/30`. The constitution and the code disagree (implementation cites apple-design §12). | `TabBar.tsx`, `shell.tsx` (ReviewerTour), `Thread.tsx` | First-class decision: amend DESIGN.md or revert to border-first floaters. Also token the border. |
| F-11 | P2 | [Constitution violation] | A4b: `tracking-[-0.02em]` on the localized greeting (ChatPage) and `tracking-wide`+`lang="en"` wrapping the localized tier label (ProtectiveCard) — letter-spacing on non-Latin text. | `ChatPage.tsx:416`, `ProtectiveCard.tsx:27-29` | Condition on `lang==='en'` (FindingCard `labelClass` pattern). |
| F-12 | P2 | [Prototype gap] | Dead/honest-but-missing content: `REASSURANCE.notice` never rendered (notice path gives no acknowledgment at all); `JOURNEY_STRINGS.restatement` unused; SpeakPill's Simulated disclosure is hover-only (invisible on touch). | grep; `refund-journey.ts:87-93,115-121`; `SpeakPill.tsx` | Use the notice tone before the noticecard; delete dead strings; visible simulated cue on SpeakPill. |
| F-13 | P2 | [Product gap] | No closure anywhere (§6c); History presents 3 fictional rows as real ("Today, 10:24") with no sample badge (delete-all does clear them now). | `matters.ts`, `HistoryPage.tsx:17-21` | Outcome-record step + "Sample" badge on seeded rows. |
| F-14 | P3 | [Prototype gap] | Small hygiene: no labeled "New conversation" at phone width (desktop-only button; tab-return reset is implicit); `reset()` leaves `factItems` set; DLSA state list omits several UTs (Ladakh, J&K, Chandigarh, A&N, Lakshadweep, DNH&DD); 714KB single bundle (no code split); profile delete-all also wipes theme/lang prefs. | `ChatPage.tsx:365,258-263`, `StopScreen.tsx:17-22`, build log | One item each; bundle split last. |

---

## 6. The owner's five hypotheses — pressure-tested

**(a) The graceful barrier — defend the takeover or replace it?** *Already replaced, and correctly.* The
external audit's inline-card-first shape is what ships: the protective triage card lands in the thread
(`ChatPage.tsx:180-188`), the thread stays browsable, the composer stays live, and the full-screen `StopScreen`
is now the *deep link* behind "Open the full safety guide." Live behavior matches the ideal: the stop protects
without excluding (12–17), and "Tell me more" re-enters at Caution with a no-blame thank-you. What must NOT
happen now: (1) softening matched hard stops into Caution on user insistence — the re-entry door is for
uncertainty, never an override lever (LokAI's refusal, §3); (2) adding a third stop treatment — two exist
behind a persisted toggle for the owner's honest A/B, adding more is decoration. The one refinement worth
building: the protective card should offer to *save* the handover packet to the (future) real matter record, so
a stop produces a portable artifact rather than an in-thread epiphany.

**(b) The replay with a full human face — feature, artifact, or spine?** *Spine — but of the case study, not the
product.* The implementation (4 scripts, every scope tier, two input modes, four languages, simulated human
typing with punctuation/hesitation pacing, document sends, chip taps, play/pause/restart/1×–2×, full chrome
immersion in the script's language, honest "nothing is live" framing) is portfolio-grade. What it must show it
already shows: the human's actions (typing, speaking, sending the GST invoice, tapping a chip), the gates
passed, both interfaces. What it must add to be fully honest: **one correction beat and one skip beat** — the
owner's spec says "all the actions from the human side," and the two most human actions in this product are
fixing a wrong fact and skipping the theater. Where it lives: `#/replay` + the home CTA is right; do NOT embed
it as an autoplaying marketing loop — a replay of a legal companion that talks over the viewer violates the
user-in-control law by example. What it must never become: a fake-autonomy demo — the "Simulated" framing is
load-bearing; the replay hint ("this is how LokAI behaves") is true *only* while the live path and the scripts
agree — today the replay's document-aware responses and localized fact sheets are *ahead* of the live app
(replays ask "क्या आपके पास बिल है?" and respond to the document; the live app cannot), which makes the replay
a promise the product must grow into. Label the delta or ship the delta.

**(c) Closure.** Design: an **outcome record on the matter page, reflected as a receipt in the thread.** The
matter detail gains a final stage ("Record the outcome") with four user-chosen states — resolved / withdrew /
escalated (with the channel used: 1915, commission, DLSA) / paused — plus one optional free-text line ("what
happened, in your words") and the date. Recording it (1) stamps the matter's stage spine complete, (2) drops a
closure card into the originating thread ("You recorded this matter as resolved — the steps you took are part
of the record"), (3) gives History its honest completed state. Data: one `outcome` object on `MatterRecord`
(`{ status, note?, date, recordedBy: 'user' }`) — no legal claims, no invented case numbers, no app-side
success metrics, nothing [VERIFY]-shaped. What must NOT be built: automatic outcome inference, fake completion
percentages, gamified badges, or any copy implying the app achieved the result. Closure belongs in **both**
surfaces — the matter page owns the record; the thread shows the receipt — because the thread is where the
journey *felt*.

**(d) The scope ruling.** Defend the line as: **the spine earns its matter types by content burden, not by
ambition.** A matter type enters v2's spine only when it ships with its own `legal-content.ts` entries, its own
fact schema, and its own ladder steps — all [VERIFY]-honest. That bar is met today by consumer-purchase defects
and municipal tax/utility notices (the two doors). v1's remaining three (tenancy, RTI, boundary) each need
verified content LokAI does not have; until the owner verifies it, they get the **graceful boundary the
classifier already provides** (eviction/property hard-stops are localized and beautiful) — and RTI is the best
next candidate because an RTI *application draft* is a low-risk document the same paper register can render.
Explicitly ruled out of scope, and worth writing into PRODUCT.md: criminal, family, employment, immigration,
and tax disputes beyond municipal demand notices — these route to police/lawyer/DLSA via the existing stop
families. The one-line rule: **LokAI helps where the law's first step is a letter a citizen can write, and
stops where the first step is a person who must be in the room.**

**(e) Portable trust.** Trust is *not* currently the same product in Urdu/Tamil — it is the same chrome with
second-class content at the decisive moments (fact gate rows, handover lists, card bodies, ladder subtitles —
F-2/F-3/F-4). Propose both halves: **the honesty mechanism now** — a per-surface "English-only" marker where
coverage law knows content fell back (a tiny `lang="en"`-aware info chip on English card bodies in non-English
UIs, consistent with the existing coverage note), plus keeping [VERIFY] stamps mono-English by design *with a
one-line localized explainer* ("this stamp means: not yet checked against the source"); **the localization
commitment next** — in order: fact-gate labels/values (the signing moment), handover what-to-bring (the
goodbye moment), ladder subtitles (the doing moment), card bodies (the review pass already planned). The
replay data model already carries localized fact rows; port that pattern into the live path and the promise
becomes true with no new architecture.

---

## 7. Kill list (examined and rejected)

- **Auto-detecting emotion to pick empathy lines beyond the existing three tones.** The hassle/notice/urgent
  tiers already cover the product's actual surfaces; a fake emotion classifier would be fabricated intelligence
  in a product whose brand is honesty. (The promise-fishing gap, F-11's cousin, is a *copy* problem — answer
  questions about the process — not an NLP problem.)
- **Real thread persistence (localStorage sessions) now.** The History-honesty fix (vault flag) closed the
  actual harm; persisting half-baked threads creates a data-retention surface the privacy page then has to
  promise things about. Do it with the matters model (§6c), not before.
- **More scenario seeds** (electricity, warranty-only, food delivery…). Each seed multiplies the hardcoded-
  script surface that is already the product's biggest liability (F-1). Fix the extraction first; seeds
  afterwards write themselves.
- **A "Trust score" / grounding meter widget.** v1's GroundingMeter was honest but heavy; v2's three-word
  confidence is the better law. Reintroducing a number-shaped trust signal breaks law 6 in spirit.
- **Localizing the mono evidence register.** Docket stamps, gate trail and [VERIFY] stay English-mono; it is a
  register decision (DESIGN.md), not neglect. The localized explainer (§6e) is the fix.
- **Inline notice upload / OCR in the prototype.** Forbidden by the verify gate and by the constitution; the
  tap-to-source demo interpreter with honest fictional labeling is the correct prototype posture.

---

## 8. Evidence index

- Gates: `npm run verify` PASS (integrity, design law, 23-language presence, [VERIFY] policy, WCAG AA pairs ×
  both themes — e.g. fg-primary/shell 17.16 light, 15.99 dark), `typecheck` clean, `build` ✓ 5.57s.
- Session: zero console errors across golden path, stops, language switches, dark mode, replay, gallery.
- Screenshots (`qa/audit/`): 01 home · 02 honest ack (non-mixer) · **03 fabricated fact gate** · **04 finding
  after correction (still "grinder")** · 05/06 stale ladder + HK-4471 draft · 07–09 update→stale→caution loop ·
  10 history · 11 promise-fishing · 12–17 inline stop, protective card, both treatments, DLSA placeholder,
  tell-me-more · 18–20 notice intent + interpreter · 21 Hinglish · 22 Hindi mid-thread · **23 Hindi fact gate
  (English facts)** · 24 Hindi finding · **25 Urdu RTL (bidi-scrambled subtitles)** · 26 Tamil · 27–29 Hindi
  stops light+dark · **30 dark paper illegible** vs 31 final paper correct · 32–33 gallery/specimen · 34–35
  replay · 36–38 dev/matter/profile · **39 Marathi "लग्नच्या" chip**.

*The [VERIFY] law applies to the auditor too: no statute numbers, limitation periods, fees, or helpline facts
were invented anywhere in this document; every number cited comes from the code or the gates.*
