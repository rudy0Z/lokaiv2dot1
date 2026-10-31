# LokAI 2.0 — Change Audit (commit `f28c000`) + ChatGPT/Gemini Parity Diagnosis

**Date:** 2026-10-28 · **Audited:** `f28c000` ("master continuity engine, multi-domain playbooks, visual collision fixes & aesthetic overhaul") — +2,014/−317 across 37 files · **Method:** full diff read + gates run (PASS, exit 0) + live browser verification at 390×844 (`qa/parity/01–08`, zero console errors).

The commit bundles two layers of work: (a) the previously reviewed design-audit fixes + multi-domain playbooks + voice notes (all previously verified), and (b) a **new execution of the Master Content Script / Edge-Case Matrix / Continuity Engine spec** (`D:\Downloads\lokai_2_0_master_content_script_edge_case_matrix_continuity_spec.md`) plus small design improvements. This audit rates both, then answers the second question: **why the app still doesn't read at ChatGPT/Gemini quality, and how to get there.**

---

## Part A · Ratings for the spec execution

| Spec part | What landed (verified live) | Score |
|---|---|---|
| **Part 1 · Continuity traps** | Trap 1 ✅ continuity chips never re-mount the fact gate; chip 1 opens the ladder pre-expanded on Step 2; chip 2 mounts the new `StatutoryCounterCard`; chip 3 closes the case. Trap 3 ✅ Tier 1/Tier 2 language grouping in the sandbox drawer. | **5.5/10** |
| **Part 2 · Archetype matrix** | ✅ Verbatim messy Hinglish/hi/mr/ta/ur prompts ×3 paths per scenario; threats route to the protective stop; the vague path enters a real Turn-1.5 clarification loop. ⚠️ scn3 (notice) has no post-finding pushback/resolve set. | **7.5/10** |
| **Part 3 · Case archive** | ✅ Historical days now render their mounted cards (`cards: ['factcheck','finding','ladder'…]`) + voice flags. ❌ The spec's verbatim scripts were **not** adopted (no NCH docket numbers, no Day-4 proactive greeting content, no exhibit appended by chips). | **6/10** |
| **Part 4 · Sandbox clarification** | ✅ `clarifyPrompts` ×5 languages, wired through a new `clarifying` thread stage; tester rail switches correctly (verified live, `qa/parity/02`). | **9/10** |
| **Part 5 · Mobile checklist** | ✅ Concentric radii (18px bubbles / 16px cards / 10px wells), context sub-bar, voice-note waveform bubble, restyled jump pill. ⚠️ Voice progress ignores `meta.duration` (hardcoded 18 s). | **8/10** |
| **Constitution compliance** | ❌ **Fail in the newest layer** — see below. | — |
| **Overall** | Feature-breadth complete, data work strong, but the newest layer (continuity engine + counter card) is the least disciplined code in the repo. | **6.5/10** |

### Constitution violations introduced by the new layer (P0 — fix before any recruiter sees it)

1. **Statute numbers hardcoded outside `legal-content.ts`** (Law 1: *no statute numbers anywhere else, and none invented*):
   - `ChatPage.tsx:479-508` — "Section 108(m)… Section 70 of Indian Contract Act… Section 84… Section 149", plus `S. 108(m) [VERIFY]`-style basis strings.
   - `StatutoryCounterCard.tsx:19` — default prop carries `S. 84 [VERIFY]`.
   - `CaseWorkspacePage.tsx:150-151` — hardcoded TPA reply text.
   - `SandboxDrawer.tsx:28` — `'15-Day Objection Window · S. 149'` and `'181 / 112 / DLSA'` — **an invented citation** (there is no central "Municipal Corporation Act § 149"; Pune is under the *Maharashtra* Municipal Corporations Act) **and helpline numbers in a component**.
   - `ChatPage.tsx:463-470` — "1915" inline in four assistant translations (helpline tokens must flow from legal-content-backed data, as the ladder's `ChannelStep` correctly does).
2. **Invented deadlines**: "within 7 days, failing which legal proceedings will follow", "within 48 hours" (`ChatPage.tsx:479,482`) — limitation-period-flavoured claims outside legal-content, in a tone ("legal proceedings will follow") the product's honest register never uses.
3. **Inline AI-drafted translations bypass the honesty system** — the chip responses hardcode hi/mr/ta/ur strings as ternary chains inside ChatPage instead of `localized-content.ts`/`i18n.ts`, so `reviewedByNativeSpeaker: false` bookkeeping and the coverage law no longer apply to them.
4. **Live data mutation**: chip 3 does `activeCase.resolved = true; activeCase.statusLine = 'Resolved · User recorded'` directly on the module-level `MATTERS` singleton — no state, no reset(), survives navigation; the sidebar only updates if something else re-renders.

### Correctness bugs in the new layer

- **Wrong law on the Hindi deposit case** — `CaseWorkspacePage.tsx` hardcodes `legalId: 'cpa-defect-goods'` for every mounted FindingCard, so h2's tenancy finding renders a *Consumer Protection defect* citation chip; `means` is filled with `titleNative + ' — ' + statusLine` (a title/status concatenation, not a meaning).
- **"Continue in this day chat" and "+ New day chat" do the identical thing** (`setActiveCase(id); navigate('/')`) — the spec's distinction (resume that day vs new day) is fake.
- **Dead data**: `DayCardKind 'notice'` is declared and used by h3/h5 but CaseWorkspacePage never renders it — the notice exhibit those days promise silently doesn't exist.
- **Lost stop-stage nuance**: `handleSend` now forces `followUp('engaged')` for every non-intake send, discarding the `pack.stopped` variant that used to answer follow-ups after a protective stop.
- **Localization regressions**: sandbox scenario cards show English-only meta names (`meta?.domain ?? title`), tier labels and "1-tap test" are hardcoded English, the h2 counter card renders English text under a Hindi thread.
- **Sandbox pill occludes a button**: on CaseWorkspacePage the floating "✦ Test sandbox" pill sits over the "+ New day chat" button (`qa/parity/05`).

### What's genuinely good (keep)

- The Turn-1.5 clarification loop is the best-built piece: a real `clarifying` stage, per-language clarify prompts, honest '—' slots via `factOverrides`.
- Verbatim messy prompts ×5 languages are exactly the spec's voice — authentic, emotionally real, and they stress-test the classifier honestly.
- Day cards + voice flags in `matters.ts`, the tier grouping, the `StatutoryCounterCard` interaction pattern (1-tap copy, honest strip) are the right *shapes* — they need content discipline, not redesign.
- The other layer of the commit (my previous session: header collision fix, FindingCard `lang` fix, reduced-motion kill removal, orb lift, theme-switch suppression, radius/text-token sweep, verify pairs) all verified intact — **9/10**.

---

## Part B · Why it still doesn't feel like ChatGPT / Gemini — and how to get there

Run the app next to ChatGPT mobile for one minute and the difference is not any single screen — it is **rhythm**. Five structural gaps explain almost all of it:

### 1 · The answer is a form, not a sentence *(the biggest gap)*
ChatGPT/Gemini answers are **plain flowing text**; anything structured (sources, code, images) is inset *into* the text flow. LokAI's thread is a vertical stack of boxed cards — empathy bubble → fact-gate card → finding card → ladder card → closeout card — each with its own border, tint, and radius. Five boxes where ChatGPT has one voice. The screen reads as a wizard; theirs reads as a conversation.
**Fix:** assistant turns become full-width plain text (ChatGPT's asymmetric model: user = soft bubble, assistant = document text). The finding + ladder collapse into **one inline "assessment" block** — a left-hairline inset (not a full border box) with the one-line verdict, expandable to the full card. Cards become exceptions, not the default.

### 2 · Too much chrome per idea
Count what shares the 844px frame: header + context sub-bar + tab bar + tester-prompt rail + sandbox pill + per-card action rows + composer. Home alone has 3 primary entry buttons, 3 scenario chips and 2 dev buttons. ChatGPT's home is a greeting, 4 suggestions, one composer.
**Fix (–40% chrome):** move message actions (copy/edit/regenerate/discard) into a **long-press action sheet** (visible on hover for desktop reviewers); merge attach/voice/type into a single composer pill with a mic↔send morph; demote the tab bar to Home/History only (Saved+Profile into the sidebar). Home keeps the voice orb as the signature, suggestions move *below* the composer like ChatGPT's.

### 3 · Surface zoo
One product should need ~2 surfaces and 1 border. LokAI currently mixes `bg-card`, `bg-component`, `bg-sunken`, `bg-container`, `bg-modal`, `brand-subtle` banners inside cards, `warning-line` borders — the stack of differently-tinted boxes is the #1 visual tell of "prototype".
**Fix:** one card surface (`bg-card` + `border-line-default`), one well surface (`bg-sunken`), one banner surface. Nothing else boxed.

### 4 · Latency is spent on choreography, not on appearing fast
ChatGPT shows activity within ~100 ms and streams the answer as it forms. LokAI's beat engine runs explain → progress → typing as sequential staged delays (2–4 s of choreography before substance). It's honest — but honesty about *waiting* is not perceived speed.
**Fix:** user bubble paints instantly; a thinking indicator appears ≤120 ms; the **first sentence of the answer arrives before the remaining beats run** (render empathy immediately, stream the rest into it). Total turn-to-substance < 2.5 s; skip collapses everything at once. Keep "Simulated in prototype" — attach it to the indicator, not to the delay.

### 5 · The assistant narrates the UI instead of answering
"I've extracted your 4 core case facts below:", "Here is a targeted statutory counter-reply with your locked facts ready for WhatsApp:" — the product describes itself in third person. ChatGPT/Gemini never say "here is a card". Copy parity rule: **answer first, at most one question, no UI narration.**
**Fix:** rewrite thread copy: "Their silence is useful — it's evidence. The helpline can file your docket for you." — then the card, silently.

### Smaller parity gaps
- **Type density**: 14px/1.6 + 20px gaps reads airier than ChatGPT's 15–16px/1.5 + 12–16px rhythm. Adopt `--text-sm-plus` as thread body, tighten thread gap to 16px.
- **No native gestures**: no long-press, no swipe-back, no haptics — the three "this is a real app" signals. Long-press sheets (§2) + `navigator.vibrate` on copy/confirm are cheap wins inside the frame.
- **Cards inset inconsistently**: the counter card renders narrower than full-width assistant text (`qa/parity/06`); pick one inset rule for all cards.
- **Serif everywhere in titles** is a distinctive identity — keep it, but shrink; assistant body is always sans.

### What NOT to copy
Do not chase ChatGPT by deleting the trust layer. The fact gate, the ladder, `[VERIFY]` chips and the downgrade law *are* the product thesis — ChatGPT would never build them, which is the portfolio point. Parity means **their rhythm with our structure**: one voice, fewer boxes, faster perceived response, actions on demand — never fewer confirmations.

### Recommended order (one focused pass)
1. **P0 constitution pass** — move all counter/statute/helpline content into `legal-content.ts` + playbook entries; add a verify-gate rule (`/\bSection\s+\d|\bS\.\s*\d|1915|1930|181|112\b/` outside the allowlist fails the build); localize the chip copy through `localized-content.ts`; un-mutate `MATTERS`.
2. **Correctness pass** — per-matter `legalId`/`means`, render or drop `'notice'`, differentiate Continue vs New-day, restore `pack.stopped`, sandbox i18n, pill z-order, voice duration.
3. **De-chrome pass (the parity leap)** — plain-text assistant turns + single inline assessment block, long-press action sheet, composer morph, surface zoo collapse, density pass.
4. **Speed pass** — instant user bubble, ≤120 ms indicator, first-sentence-first streaming.

---

## Evidence index (`qa/parity/`)

01 home (header fixed, pill docked end) · 02 Turn-1.5 clarify rail · 03 informal→fact-gate · 04 h1 Day-1 rich thread (voice bubble + date stamp) · 05 Day-1 ladder + exhibits + continue bar (pill occlusion visible) · 06/07 counter card (live text incl. violations) · 08 sandbox tiers (English-only scenario meta). Gates: `npm run gates` PASS (exit 0), zero console errors.
