# Verification of the "Impeccable/Alpacassie/Kowalski" audit + six design skills applied to LokAI's mobile design

**Date:** 2026-10-27 · **Method:** every claim in the external report checked against the code and the live
DOM at 390×844 (measured with `getBoundingClientRect`, screenshots `qa/audit/40–41`), then the six requested
skills read in full and applied. **No fixes applied** — this is the assessment you asked for.

---

## Part 1 — Is the external report valid? Claim by claim

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 1 | Sandbox pill occludes **35%** of the greeting subtitle "Hindi, English or any Indian language" | **FALSE at phone size.** Measured at 390×844: pill occupies y 734–770; the subtitle sits at y 642–662 — **0px overlap** (screenshot 41). The pill sits in clear space between the bento tiles and the tab bar. | live DOM measurement + `qa/audit/41-phone-home.png` |
| 1b | — but two *real* overlap bugs exist nearby | **TRUE, lesser:** on desktop width the pill overlaps the voice orb's halo, and the desktop-frame header crowds "LokAI" into "New conversation" (visible in `qa/audit/40`, a real reviewer-facing bug). On phone the pill floats over scrollable tile content in its band. The claimed 35%-subtitle figure is not reproducible. | `qa/audit/40-home-occlusion-check.png` |
| 2 | ReviewerTour subtitle = 4.0:1 under blur (WCAG fail) | **Unverified and probably wrong.** The ReviewerTour is `hidden lg:block` — it never renders at phone width. Token pair `fg-tertiary/shell` = **4.72:1 light / 4.93:1 dark** per our verify gate — passes AA. Blur does not change a text pixel's paint color; the 4.0:1 figure is not reproducible from the tokens. The proposed `text-fg-secondary` fix is harmless if you want belt-and-braces. | `scripts/verify.mjs` output; `shell.tsx` (ReviewerTour class list) |
| 3 | tiny-text: 11px floor | **TRUE, but the token is mis-cited.** `--step--2` does not exist anywhere in this repo — the real token is `--text-2xs: 0.6875rem` (= 11px) in `tokens.css:370`. It is the meta/docket register (badges, mono stamps), not body copy (body is 14–16px). Bumping to `0.75rem` is a defensible WCAG-lean improvement but touches ~60 usages and deserves a specimen pass. | `tokens.css:370`; grep of all `text-2xs` usages |
| 4 | Thread `px-3.5` (14px) vs header `px-4` (16px) | **TRUE** — valid Müller-Brockmann alignment polish. One-line fix, low risk. | `Thread.tsx:60` vs `shell.tsx` header |
| 5 | Button hover `duration-100` → should be instant | **Partially valid.** Confirmed `duration-100` (`Button.tsx:69`). Note Tailwind v4's `hover:` already compiles under `@media (hover: hover)`, so touch is unaffected; and our hover is a 0.985 brightness filter, far subtler than a background sweep. The Kowalski point is right in spirit; the change is marginal. | `Button.tsx:69`, `base.css:38–43` |
| — | "38/38 contrast pairs pass" | Roughly right (the gate now runs 40+ pairs, all green). | verify output |

**Forensic caveats about the report itself:** (1) it cites `--step--2`, a token that does not exist — a sign the findings were not derived from this codebase with care; (2) its scan URL is `localhost:5173`, which on this machine serves a **stale build** (our sessions ran 5174–5177); the sandbox pill only exists in today's code, so the occlusion figure cannot have come from a correct scan of the current UI at phone size.

**Bottom line:** two real but minor polish items (16px gutter alignment; the 11px floor if you want it), one real-but-different overlap bug (desktop pill/orb + header crowding), and two claims that do not reproduce (phone occlusion, blur contrast). The Kowalski animation notes match what the code already does.

---

## Part 2 — What the six skills say about LokAI's current mobile design

### 1. mobile-native (Emil Kowalski platform layer) — **the strongest pass**

The skill's "Baseline" block is almost fully shipped already:

| Rule | Status | Evidence |
|---|---|---|
| `viewport-fit=cover` + `interactive-widget=resizes-content` | ✅ | `index.html:5` |
| Per-scheme `theme-color` matching the header | ✅ | `index.html:6–7` |
| `-webkit-tap-highlight-color: transparent` | ✅ | `base.css:10` |
| `overscroll-behavior: none` on html | ✅ | `base.css:11` |
| `touch-action: manipulation` on controls | ✅ | `base.css:29` |
| Hover gated behind `(hover: hover) and (pointer: fine)` | ✅ | `base.css:38` + Tailwind v4 variants |
| `100dvh` app shell (never `100vh`) | ✅ | `shell.tsx` (`h-dvh`) |
| Inputs ≥16px (no iOS zoom) | ✅ | composer textarea is `text-base` |
| `env(safe-area-inset-*)` on header/tabs/footers | ✅ | throughout `shell.tsx` |
| `user-select: none` on controls only | ✅ | `base.css:30` |

**Gaps the skill names:** (1) its Hard Rule 5 — *test on real hardware* — is honestly unmet; everything above is code-verified, and sticky hover / keyboard / overscroll feel still need a phone (the skill itself says emulation can't reproduce them). (2) `inputmode`/`enterkeyhint` are not set on the composer, fact-gate and notice inputs (minor: `inputmode="numeric"` on the amount fields would be the one-line win). (3) The two new overlay drawers (CaseSidebar, SandboxDrawer) scroll via `.scroll-calm`, which styles scrollbars but does not set `overscroll-behavior: contain` — Thread has it (`overscroll-contain`), the overlays should too.

### 2. better-ui — **passes with three small, real findings**

Press physics are textbook (`pressable`: transform-only 100ms ease-out, `scale(0.97)` with `:not(:disabled)` exclusion — above the skill's 0.96 floor), icons are bespoke `currentColor` SVGs, springs use `bounce: 0`, `transition-all` appears **nowhere**, reduced-motion guards exist on orb/waveform/stagger, borders-for-structure is the documented convention (which the skill itself says is a preference, not a finding). Findings:

| Sev | Location | Finding | Why |
|---|---|---|---|
| MEDIUM | `app-context.tsx` theme effect | Theme switch does not suppress transitions — every color transition fires at once and the switch smears | Skill: "Suppress transitions on theme switch" |
| MEDIUM | `CaseSidebar.tsx`, `SandboxDrawer.tsx` scroll containers | Overlay scroll lists lack `overscroll-behavior: contain` | Skill: "Contain scroll inside overlays" |
| LOW | `base.css` `.stagger-in` (40ms) | Vault stagger is 40ms grid steps; the skill's semantic-chunk stagger is 100ms — ours is a legitimate denser variant for grid items, worth one deliberate note | "Stagger infrequent entrances by 100ms" |

### 3. design-mobile-apps (Sleek) — **not applicable, by our own constitution**

This skill is a REST client for sleek.design: it requires `SLEEK_API_KEY`, network calls, and cloud renders. LokAI's verify gate **forbids `fetch()`** and the constitution mandates offline/deterministic. Running it would violate the repo's own law rather than review it. Skipping it is the correct behavior, not an omission.

### 4. high-end-visual-design — **its aesthetic mandates conflict with the product; its performance guardrails confirm our choices**

The skill *bans* Inter, 1px borders and subtle shadows, and demands mesh gradients, `py-24` macro-whitespace and OLED-glass vibes. LokAI's constitution deliberately chooses the opposite (Inter as the sanctioned UI face, border-first elevation, "a patient government-office that learned good manners"). Adopting this skill's look would break DESIGN.md — a style with no shadows is exactly the kind of "deliberate convention is a preference, not a finding" this family of skills honors. What **does** transfer, and where we stand:

- `backdrop-blur` only on fixed/sticky elements → we comply (tab bar, jump pill, ReviewerTour; never on scrolling content)
- GPU-safe motion (transform/opacity only) → we comply, except standard disclosure height animations (motion.dev territory, acceptable)
- Z-index discipline → we comply (z-30 chrome / z-40 overlays / z-50 dialogs, no arbitrary 9999)
- Mobile collapse rules (`w-full`, `px-4`, dvh, no rotations under 768px) → we comply by being mobile-first

### 5. design-system-patterns — **the strongest architectural pass of the six**

The repo implements the skill's full stack: raw oklch primitives → semantic role variables → Tailwind semantic utilities (`tokens.css`), a dark theme as a pure re-pointing, component-level variant maps, token-by-purpose naming, and — beyond the skill's bar — a CI gate (`verify.mjs`) that *enforces* token confinement and WCAG AA in both themes. Gaps it names: (1) no `prefers-color-scheme` detection on first visit (we default to light and persist thereafter); (2) token versioning/migration is documented informally in DESIGN.md/AGENTS.md rather than as semver'd token releases.

### 6. design-os-ux-laws — **adapter context absent; applied out-of-band to the mobile journey**

The skill's contract requires a `.design-os/run-state.json` conductor and upstream artifacts that don't exist in this repo — it instructs not to invent missing evidence, so I applied its 25 laws directly to the current flows instead:

- **Hick's Law** ✅ — one clarifying question, 3–4 tester cards per turn, a 3-step ladder
- **Jakob's Law** ✅ — the thread is deliberately ChatGPT-parity (docked composer, streaming caret)
- **Goal-Gradient** ✅ — stage spine on matters, numbered ladder, dated day-chats
- **Peak-End** ✅ — the emotional peaks (inline protective stop, finding card) and the end (CloseOutCard, matter log) are the most-crafted moments
- **Fitts's Law** ✅ after this week's fixes (44px tab/pill targets; delete-all lives alone in Profile, far from primaries)
- **Von Restorff** ✅ — the orb is the only gradient; the protective stop inverts the whole palette
- **Miller's Law** ✅ — the fact gate holds ≤6 rows, never more
- Gap: History rows carry no progress signal until opened (a one-line "step 2 of 3" mono suffix would serve Goal-Gradient)

---

## What is actually worth doing (recommendations, not applied)

1. **Sandbox pill:** raise it ~8px or dock it `end-3` / hide on `lg+` — kills the real desktop orb overlap and the phone-band grazing over scrollable tiles. (The report's own remedy is directionally right even though its 35% figure was wrong.)
2. **Desktop-frame header crowding** ("LokAI" ↔ "New conversation", `qa/audit/40`): hide `topBarExtra` inside the narrow frame the way the phone already does — real, reviewer-visible bug.
3. **Theme-switch transition suppression** (better-ui recipe) — one small effect, removes the smear.
4. **`overscroll-behavior: contain`** on the two drawer scroll containers.
5. **`px-4` thread gutter** — the one Grid-Systems fix with zero risk.
6. **12px `text-2xs`** — only if you accept the docket register growing; needs a `#/specimen` pass.
7. **Real-hardware pass** (mobile-native Hard Rule 5) — the only way to close the hover/keyboard/overscroll questions honestly.

Rejected: adopting high-end-visual-design's aesthetic (breaks DESIGN.md), invoking Sleek (network), and treating the external report's occlusion/contrast figures as evidence (they don't reproduce).
