# LokAI 2.0 — Visual Report: why it doesn't look like ChatGPT, and what "good" is

**Date:** 2026-10-29 · **Evidence:** 11 QA screenshots re-examined (`qa/gemini/`, `qa/parity/`, `qa/case/`, `qa/impl/`, `qa/design-report/`) · **Lens:** Apple HIG (via `.agents/skills/apple-design`), [ui-skills.com/playbook](https://www.ui-skills.com/playbook), [beautifului.dev](https://www.beautifului.dev), [aisdkagents.com/ai-components](https://www.aisdkagents.com/ai-components), and the ChatGPT "priorities list" screenshot supplied by the owner.

**Verdict: 6/10 against the ChatGPT/Claude/Gemini bar — and the gap is not components, it is restraint.**

The uncomfortable answer to "we had all these AI component libraries and still couldn't design one?": **LokAI already contains every component those libraries sell.** FactCheckCard is an approval card. ActionLadder is task rows. ChannelStep is tool chips. TypingIndicator is a thinking state. StreamText is streaming text. The libraries were never the missing part. What every reference you cited shares is a *dress code* — fewer elements per screen, hierarchy from weight and spacing instead of borders and tints, actions hidden until asked for, one accent, one surface. We violated all five, and then three "master" commits in a row each *added* chrome (tester rails, sub-bars, sandbox pills, dev buttons), pricing every new feature in boxes. Beautiful is a subtraction pass, and nobody has run one yet.

---

## Part 0 — Shipped visual bugs (worse than any styling decision)

These are in the flagship evidence a recruiter sees first. Apple's craft principle: *"Jittery scroll, misaligned icons, and layouts that break read as carelessness."* Each of these reads as "broken" before anyone reads a word.

| # | Bug | Evidence | Root cause |
|---|-----|----------|-----------|
| B1 | **The user's message appears twice** — a crisp bubble, then the same words again in ghost gray colliding with "What happens next?" and the Jump-to-latest pill | `qa/gemini/06`, `07`, `09` | The seed-scenario assistant turn opens by quoting the user's message **verbatim** (the restatement beat), which violates the app's own anti-fatigue rule (`ChatPage.tsx:178` — "NO verbatim echo"). The quote sits at the bottom edge of the scroll viewport where `scroll-fade-y` (`Thread.tsx:60`) fades it to ~40% opacity, and the floating jump pill (`Thread.tsx:70`) overlays it. Composition defect, reads as a rendering bug. |
| B2 | **Sandbox pill occludes product buttons** — covers "+ New day chat in th…" text and clips the composer's left edge | `qa/parity/05`, `qa/case/13` | Floating `✦ Test sandbox` pill z-order vs footer content (known from parity audit, still live). |
| B3 | **Counter card amputated** — "Targeted…" badge sliced mid-glyph under the composer; card content unreachable below fold | `qa/parity/06` | Card inset rule vs floating footer reserve; no bottom safe-padding on the last card. |
| B4 | **Devanagari set in a mono stack** — "रास्ता · डिक्लेयर की जिद → जवाबी मसौदा" renders in fallback glyphs | `qa/case/13` | `TesterPrompts.tsx:34` puts scenario meta in `font-mono`; mono stacks carry no Devanagari. This is A4b's "never faux styling on non-Latin" violated by a token class. |
| B5 | **Thread opens mid-sentence** — clipped Devanagari heading at top of frame ("गा है इसी बॉक्स दोबारा…") | `qa/case/13` | Scroll focus lands inside a block instead of at its top. |
| B6 | **Emoji amputated by a scrim strip** — top row of the day-thread shows a half-emoji above "strongest step · mistakes cost most here" | `qa/parity/05` | Truncation applied without `truncateGraphemes`, or overflow clip on the scrim row. |
| B7 | **Fake skeleton exhibit** — "GST-Invoice-HK-482…" chip with decorative gray bars in a *finished* screen | `qa/parity/05` | Skeleton used as decoration. A skeleton in a done state reads as a page perpetually loading — the exact "nothing is random" craft failure. |

**P0: fix all seven before touching a single token.** De-chroming on top of broken pixels just makes cleaner-looking broken pixels.

---

## Part 1 — The ChatGPT screenshot, read as a spec

The owner's attached screenshot (a four-priority career plan) is worth reverse-engineering, because every choice in it is the *opposite* of ours:

| Choice | ChatGPT | LokAI (same content type — a plan/finding) |
|---|---|---|
| Containers | **One** surface; rows separated by hairline dividers | 4–5 separately bordered, differently tinted boxes |
| Icon treatment | One small rounded chip per row, same quiet gray | Per-card headers, badges, labels, avatars |
| Badges | Tiny, low-chroma pills; one green ("Primary"), rest neutral | Colored `Targeted`/status pills + `[VERIFY]` chips + path pills |
| Hierarchy | Weight + size + leading only | Borders + tints + register changes (serif/sans/mono) |
| Actions | Zero visible — live behind hover/long-press | A visible Copy row under every assistant turn |
| Labels | Sentence case, sans | Mono captions with arrows: `Path · seller pushback → counter-draft` |
| Body type | ~16–17px/1.5, generous but even | 14px/1.6 with uneven gaps (prior audit's density finding) |
| Chrome bands in one 844px frame | **1** | **6–7**: header, context sub-bar, banner, tester rail, sandbox pill, floating composer, tab bar |

ui-skills' rule — *"Group with spacing, not dividers"* — inverted: we group with boxes and divider nothing. Apple's simplicity rule — *"use hierarchy — order, spacing, contrast — so the most important thing is the most obvious"* — inverted again: the boxes shout, the content doesn't.

---

## Part 2 — Apple HIG diagnosis, principle by principle

Using the eight foundations from *Principles of Great Design* as the audit frame:

1. **Purpose** — *"decide what not to build."* The empty home carries 8 interactive elements (greeting, voice orb + CTA + lang hint, two big tile buttons, three chips, two dev buttons) inside six chrome bands. ChatGPT's home: greeting, composer, four suggestions. The dev machinery (Scenario launcher, replay, tester rail, sandbox pill) lives in the product surface. **Fail.**
2. **Agency** — edit/regenerate/discard, stale-marking, stop re-entry. This is the one axis we *exceed* ChatGPT on. **Keep — but move the affordances off the canvas (see Part 4).**
3. **Responsibility** — fact gate, `[VERIFY]`, downgrade law. The thesis. **Keep.** Parity means their rhythm with our structure — never fewer confirmations.
4. **Familiarity** — *"things that look the same must behave the same."* We run **three type registers** (serif display, sans body, mono meta) with no stable mapping: mono appears for voice durations (defensible — it's a timer), path captions (not defensible — it's prose with arrows), docket counters, the sandbox pill, and Devanagari fallback roulette (B4). Two visually different "continue" affordances do the same thing. A red text-only danger link floats inside a white card (`qa/case/13`). **Fail.**
5. **Flexibility** — five scripts, RTL, tiered language coverage, 44px targets, reduced-motion handling, honest grouping in the language select. **Genuinely excellent. This is the part of the app that already meets the bar.**
6. **Simplicity ≠ minimalism** — *"burying everything in one place looks minimal but isn't simple."* Our failure is the mirror image: **boxing everything looks structured but isn't.** The fact gate renders as a form table (label column, value column, "Correct it" link column — `qa/impl/02`) instead of a confirmation moment. ChatGPT's equivalent (the fact recap before an action) is a sentence plus a list.
7. **Craft** — violated by the entire Part 0 table, plus the skeleton exhibit (B7), plus the muddy dark-mode orb glow (`qa/design-report/02`) where translucency is decoration instead of hierarchy (HIG §12: material weight must encode hierarchy).
8. **Delight** — *"the result of getting the other seven right."* The voice orb is the one signature moment, and on the dark home it's a dim blob floating in dead space between a serif greeting and a tab bar.

**Motion/latency (carried from the 10-28 audit, still true):** the beat engine spends 2–4s on choreography before substance. HIG §1: *"the moment lag appears, the feeling of directness falls off a cliff."* Honesty about waiting is not perceived speed.

---

## Part 3 — What the reference libraries actually say (read honestly)

**aisdkagents.com/ai-components** lists 21 primitives: Loading State, Thinking, Streaming Text, Approval Card, Tool Chips, Task Rows, Chat, Prompt Bar, Context Cards, Insight Cards, Selection Actions, Agent Screen… LokAI owns equivalents of nearly all of them. What we don't own is their shared dressing: flat content-first surfaces, actions on hover/overflow, compact chips instead of verbose logs, one accent per view.

**beautifului.dev** — same vocabulary ("extremely crafted primitives for agents talking to humans"). "Extremely crafted" there means: obsessive states (hover/active/loading/filled), restraint, and nothing decorative.

**ui-skills.com/playbook** — the six rules we most violate, verbatim:
1. *"Group with spacing, not dividers"* — we box.
2. *"Use shadows to show depth. Use borders to show structure."* — we border for decoration.
3. *"Sentence case labels, not all caps"* — our mono meta is the visual equivalent.
4. *"Limit accent colors — one accent per view"* — our frames stack brand + warning + danger tints inside one screen.
5. *"Peek the next scroll item"* — our scroll edge instead fades the last message into a ghost (B1).
6. *"Fade scroll edges"* — we do, and it backfires exactly where the tester rail sits under the thread.

Rules we already meet (credit where due): concentric radii, 44px targets, press feedback (`pressable`, `active:scale`), visible focus rings, fade masks existing at all, structural skeletons elsewhere.

---

## Part 4 — The re-spec: "their rhythm, our structure"

Do this as **one subtraction sweep**, not card-by-card restyling (a half-swept app is Frankenstein).

### 4.1 Thread (the big one)
- Assistant turn = **plain full-width text on the canvas** (already the `MessageBubble` assistant shape — good). Kill the per-turn `LokAI` avatar+name row (`MessageBubble.tsx:121-124`): ChatGPT doesn't sign its own messages every time.
- The whole assessment (verdict + facts + ladder) becomes **one inline block**: left 2px hairline, no border, no tint. Boxes only for genuine artifacts — the demand notice keeps paper.
- Spacing rhythm: 16px between turns; body 15–16px.

### 4.2 Fact gate → confirmation, not a form
One container, hairline dividers between fact rows (the attached ChatGPT screenshot *is* the layout), icon chips, "Correct it" revealed on hover / long-press row menu. One primary confirm button, inset, not full-bleed.

### 4.3 Ladder → the ChatGPT priority-list pattern
Numbered rows, small icon chips, tiny neutral badges, hairline dividers, **no boxes**. `ActionLadder` already has the steps and the consequence scaling — strip its chrome, keep its logic.

### 4.4 Actions off the canvas
Copy/edit/regenerate/discard → hover row (desktop) + long-press action sheet (touch). HIG §16 Familiarity: the platform already taught everyone long-press = actions.

### 4.5 Mono diet (27 files → ~3)
Keep mono only where the content *is* data: voice-note duration, docket/exhibit IDs. Everything else — path captions, sub-bar status, sandbox pill, tester meta, "1-tap test" — becomes sans, sentence case, `text-fg-tertiary`. Remove the `→` arrows from captions; they're engineer poetry.

### 4.6 Surface collapse
From ~10 surface tokens to **three + paper**: `bg-card` (one surface), `bg-sunken` (wells), `bg-standout` (protective stop), `paper` (notice). `container`/`component`/`modal`-as-surface fold into card. Banners live *inside* the assessment block as tint-on-hairline, not as extra boxes.

### 4.7 Chrome economy
Home = greeting + composer + 3 suggestions **below the composer** (ChatGPT's order). Dev/qa machinery (`Scenario launcher`, replay entry, tester rail, sandbox pill, `protoTag`) moves behind `#/dev` and inside branching scenarios only — never on the product home. Context sub-bar merges into the header as one line. Composer docks to the tab bar zone; two floating bands, not three.

### 4.8 Perceived speed (from Part B of the 10-28 audit, unchanged)
User bubble paints instantly → indicator ≤120ms → first sentence of substance before the remaining beats. Keep "Simulated in prototype" on the indicator, not on the delay.

### 4.9 Delight budget
Dark home: raise the orb's luminance/saturation, put the suggestions under the composer, remove the dead band. One moment, done well, beats three half-moments.

---

## Part 5 — Scorecard

| Axis | Grade | Note |
|---|---|---|
| Multi-script typography engine (A4b) | **9** | World-class for this problem; protect it |
| Accessibility & motion hygiene | **8** | 44px, reduced-motion, focus, honest coverage |
| Trust/verification UX (the thesis) | **8** | Shapes are right; the fact gate's *form* is wrong |
| Component vocabulary | **7** | Complete; the aisdkagents list, already built |
| Restraint / chrome economy | **3** | 6–7 chrome bands, boxed everything |
| Craft (shipped-pixel correctness) | **2** | Part 0's seven bugs |
| Register discipline (serif/sans/mono) | **3** | Three registers, no mapping, mono on Devanagari |
| Perceived speed | **4** | Choreography before substance |
| **Overall vs ChatGPT bar** | **6/10** | Ceiling after P0 + de-chrome: **~8.5** — the trust layer is the differentiator no reference library has |

## Order of operations

1. **P0 — bug pass** (B1–B7, one day). B1 = give the seed turn a non-verbatim restatement (the anti-fatigue rule already written at `ChatPage.tsx:178` must apply to seeds too) + add bottom padding before the fade mask + raise the jump-pill trigger threshold.
2. **P1 — de-chrome sweep** (Part 4.1–4.7 in one pass).
3. **P2 — speed pass** (4.8).
4. **P3 — delight** (4.9), then re-shoot `qa/` against the ChatGPT screenshot side-by-side as the acceptance gate.

---

## Execution record — 2026-10-29 (same day, all four passes shipped)

All gates PASS (`verify + typecheck + build`, exit 0). Fresh evidence in `qa/visual/01–08`.

**P0 bugs — fixed:**
- **B1 root-caused live, and it was not a rendering bug.** The "double message" is the branching-scenario turn-1 tester rail *still showing the picked option's text* while the fact gate is up — the option card below duplicated the user bubble above, and the scroll fade made it read as a ghost. Fix: new `awaitingFacts` thread stage (`ChatPage.tsx`) — after an option is picked the rail disappears until the stage earns options again (clarify / post-finding). Verified live: pick → gate → confirm → post-finding rail, zero duplication.
- **B2** the floating sandbox pill is gone from product chrome; the sandbox opens from a quiet row in the Case Folder sidebar (`SandboxTrigger` + `SANDBOX_OPEN_EVENT`).
- **B3** thread gets real bottom padding + the composer docked closer to the tab bar (`shell.tsx` 6.25rem → 4.9rem) — the counter card now rests fully above the composer.
- **B4** mono removed from every string that can carry Devanagari/Nastaliq (tester meta, sub-bar status, docket lines, date stamps). `font-mono` went **27 files → 10**, all genuine data registers (filenames, the 1915 number, statute citation chips, DLSA contact data, voice duration, timer, type specimen).
- **B5/B6** scroll-fade masks widened to 24px (softer edge cuts); exhibit/emoji amputation resolved by the same clip changes.
- **B7** the skeleton exhibit now shows the document's real mock content (two preview lines per doc kind).

**P1 de-chrome (the parity leap):**
- Assistant turns lost the per-turn `LokAI` avatar+name row — the voice is the identity.
- Finding + Caution are now **inline left-hairline assessment blocks**, not boxed cards. Fact gate = one container with hairline-divided rows (the ChatGPT priorities-list pattern). Ladder = one card with hairline-divided `Disclosure` rows (new `bare` variant).
- Copy action reveals on hover (desktop), stays visible on touch; CardActions are text-only quiet buttons (edit/regenerate/discard stay labelled — law 4 deliberately kept visible rather than buried in a long-press sheet).
- Copy rewrite: counter-reply intro and tester copy no longer narrate the UI; `→` arrows removed from all path captions; "1-tap test" dev label removed; `testerHint` shortened in 5 languages.
- Surfaces collapsed: `bg-container`/`bg-component` uses migrated to `bg-card`/`bg-sunken` (inputs, chips, badges, wells). 
- Chrome economy: home lost the tile grid, the dev row, and the type-instead button (composer is always present; notice entry is a chip; dev/replay live in `#/dev` + sidebar). The context sub-bar is gone — the case title replaces the `LokAI` wordmark in the header (`AppShell title` prop), and Quick summarise became a quiet chip at the top of the thread.

**P2 speed:** beat classes retuned (explain 430→320ms, progress 310→240ms, caution 330→260ms, disclose 390→300ms, stop 210→180ms); StreamText at 3 tokens/22ms with the caret resting 900ms — substance arrives well inside the 2.5s turn budget.

**P3 delight:** dark-theme orb halo lifted to luminous sage (`--orb-outer 74% / 0.6`, `--orb-mid 60% / 0.78`) — the signature now glows instead of muddying; dead space on home filled by the always-on composer and suggestion chips.

**Deliberate deviations from the report:** no long-press action sheet (law-4 actions stay labelled and visible — safer for the trust story); the context sub-bar was merged rather than deleted (title into header, summarise into the thread flow).

**Evidence (`qa/visual/`):** 01 deposit fact gate (hairline rows, no rail duplication) · 02 finding as inline hairline block · 03 ladder + closeout (single divided container) · 04 pushback escalate as plain text with hover-revealed Copy · 05 h2 counter card fully above the composer, case title in header, Devanagari sans · 06 light home · 07 dark home with glowing orb · 08 Urdu RTL home (mirrored, Nastaliq, zero mono).

---

## Appendix — Overhaul directive execution (2026-10-29, later same day)

Response to the 7-part "Principal AI Product Designer Overhaul" directive (audited against commit `b4266de`, which contains this session's visual pass merged with a parallel session's navigation/orb/token work).

### Refused (would violate the repo constitution — AGENTS.md)

| Directive item | Why refused |
|---|---|
| Purge Urdu (`ur`) from `languages.ts`, `matters.ts`, scenarios, playbooks, i18n; replace Case 5 with a Bengali case | AGENTS.md names `ur — RTL` as a configured language and the phased build is the product authority. Urdu is Tier-1 full coverage with a dedicated Nastaliq stack — it is the portfolio's multi-script thesis, not a defect. `scripts/verify.mjs` *enforces* the Urdu config (presence check "Urdu config") — rewriting the gate to pass without it is gate-defeating, which AGENTS.md forbids outright. |
| Replace `matters.ts` standing line with "Section 2(10) of the Consumer Protection Act, 2019 — High Statutory Leverage" and delete the `[VERIFY]` marker | Law 1: legal content lives only in `legal-content.ts` with `verified:false` + visible `[VERIFY]`; "no statute numbers anywhere else — and none invented". The directive asks me to *inject* an invented citation *and* strip the honesty marker — the exact violation class the 10-28 parity audit graded P0. The `[VERIFY]` at `matters.ts:134` (not :50) is the system working. |
| "Update `scripts/verify.mjs` so the suite passes 100% without Urdu" | Same gate-defeating refusal as above. |
| FactCheckCard 2×2 bento grid | A4b: every screen must hold with long Tamil/Urdu strings. Half-width cells force 3–4-line wraps for values like "₹50,000 paid · ₹35,000 held back" and break row rhythm; the owner's own ChatGPT reference layout is single-column rows, which is what shipped. |

### Accepted and shipped (gates PASS, smoke-tested live)

1. **Part 2 — single follow-up menu.** While the post-finding rail is up, the CloseOutCard no longer renders (it returned as a second competing menu). The closure ritual folds into the rail as a 4th option ("I sent the Step 1 message — log it and save this case" → vault log + toast); picking "resolved" drops the rail (`awaitingFacts`) so the closeout card stands alone. The rail itself now **collapses to a single quiet bar** once the thread is live (`max-h-[210px]` expandable list, collapses on pick). Verified live: `closeoutWhileRailUp:false, collapsedBar:true`, 4 options on expand (`qa/visual/09`).
2. **Part 2 — user-facing badges.** All `Path · …` meta captions replaced with plain badges in 5 languages ("Bills in hand", "Missing details", "Seller refused", "Feeling threatened", "It worked"…). AI-drafted, `reviewedByNativeSpeaker:false` regime as always.
3. **Part 3 — unified navigation** (mostly landed by the parallel session in `b4266de`: TabBar removed from AppShell; sidebar footer has History/Saved/Profile + sandbox). This session verified the end state matches the directive.
4. **Part 4a — draft preview.** Ladder Step 1 clamps to 3 lines with a fade + "Read full draft / Show less" toggle; Copy/Regenerate stay visible. The full editable textarea opens on demand.
5. **Part 5 — exhibit previews + preview sheet.** Micro-previews already shipped this morning (the directive audited the stale skeleton state); this pass adds tap-to-preview: a bottom sheet inside the device frame with file-type badge ("PDF · mock exhibit" — never a fake "Verified"), the two-line preview, and the honesty tag.
6. **Part 6 — reviewer tooling.** Sandbox gets "Quick jump to a UI state" pills (Intake gate · Finding+ladder · Demand notice · Safety stop) and full native language names; NoticePage gets a scanned-source banner (`PMC…jpg · N clauses`) with a working ↻ re-scan that replays the reading beats.

### Corrections to the directive's forensic claims

- `matters.ts:50` → the string is at **line 134**; and it is not a bug (see refusal table).
- "Grey skeleton bars" in ExhibitPaper → already replaced with real micro-content earlier today (`qa/visual/05` shows it); the directive audited the pre-noon tree.
- Bottom TabBar removal → already shipped by the parallel session in `b4266de`; this session verified and completed the sidebar hub.
- Part 7's "confirm zero `[VERIFY]` / zero `ur`" → intentionally **not** achieved: both remain by constitution. The gates pass WITH them, which is the correct end state.
