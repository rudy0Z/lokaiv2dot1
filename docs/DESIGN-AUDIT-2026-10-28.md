# LokAI 2.0 — Full Design Audit vs. five external design authorities

**Date:** 2026-10-28 · **Build:** `main` @ `3212297` (post craft-polish) · **Method:** single-context synthesis (code audit + deterministic detector + live browser evidence), not a formal dual-agent `$impeccable critique` run.

**Sources applied:**

| # | Source | What it contributes |
|---|--------|---------------------|
| 1 | alpacassie *Grid systems for your AI agent* | Content-led layout, margins/fields, measure, rework discipline |
| 2 | alpacassie *Typography starts with a feeling* | Feeling → direction → reusable scale; multi-script readability |
| 3 | alpacassie *Design Fundamentals 01: Color* | Direction → audit → purpose-named tokens → documented reuse |
| 4 | Emil Kowalski `emilkowalski/skill` (15 skills, installed via `npx skills add`) | Animation decision framework, press physics, easing, perceived performance |
| 5 | Impeccable v4.8.0 (installed via `npx impeccable install`) | 5-dimension audit, detector, craft floor, critique heuristics |

**Evidence:** deterministic detector scan of `src/` → **0 findings**. Live captures in `qa/design-report/` (home light/dark, golden journey, protective stop, specimen, Urdu RTL).

---

## Executive scorecard

| Assessment | Score | Band |
|---|---|---|
| Impeccable audit (A11y / Perf / Theming / Responsive / Integrity) | **18/20** | Excellent |
| Nielsen 10 heuristics (critique guide) | **38/40** | Excellent |
| Emil motion checklist violations | **3 minor** (0 major) | Excellent |
| alpacassie grid / typography / color | compliant, typography exemplary | — |

**Verdict:** this is an unusually disciplined build — it already implements most of what all five sources prescribe, several points *beyond* their ask (gate-enforced WCAG AA in OKLCH, per-script root scales for 22 languages, foldable dual-pane). The findings below are real but shallow: **two P1s** (one cosmetic-but-everywhere, one multi-script typography bug), two P2s, and a short P3 tail.

---

## 1 · alpacassie Grid Systems vs. build

The guide's 8 principles (start from what must fit, coordinate type+measure+leading, margins as a system, purposeful fields, rhythm creates depth, plan caption+image pairs, type roles, rework relationships) are print-derived; the build is a 390px conversational spine, so most apply through their web adaptations (fluid tracks, content max-width, content-driven breakpoints, 320/390/desktop testing, 200% zoom, reduced motion).

| Principle | Build evidence | Verdict |
|---|---|---|
| Layout led by content, not decoration | Thread is the only first-class surface; cards, composer, chrome all serve it (`shell.tsx:115`, `ChatPage.tsx`) | ✅ |
| Margins as one system | `px-3.5` thread gutter, `ps-7` card indent, `px-4` shell — consistent across pages | ✅ |
| Measure control | Greeting sub capped `max-w-[320px]`; user bubbles `max-w-[85%]` (`MessageBubble.tsx:64`); line-height 1.6 body | ✅ (~65–70ch equivalent in-frame) |
| Fields don't fight | One input model per screen is an explicit invariant (`ChatPage.tsx:621-649` comment) — composer OR protective bar OR none | ✅ |
| Content-driven breakpoints | No decorative breakpoints: `sm:` switches to device frame, `[@media(horizontal-viewport-segments:2)]` adds a real dual-pane (`shell.tsx:126-127`, `useSpans`) | ✅ beyond guide |
| 320/390/desktop + zoom + reduced motion | 390 frame is the native design target; root font-size scaling = zoom-safe rems; global reduced-motion handled (see finding P2-1) | ✅ with one flag |
| Type roles fixed | serif = law/reading register only; sans = UI; mono = refs (`FindingCard.tsx:36-40`, `SectionRef`) | ✅ |
| Rhythm/depth | `gap-5` thread rhythm, scroll-fade masks, staggered evidence reveal (`base.css:197-215`) | ✅ |

**Gaps (minor):** a handful of off-scale values bypass the token scales — `rounded-[22px]` / `rounded-[26px]` (`ChatPage.tsx:588,723,738`, `Composer.tsx:96`) against a radius scale that tops out at 24px, and arbitrary text sizes `text-[0.95rem]` (`ChatPage.tsx:701`) / `text-[0.8125rem]` (`SectionRef.tsx:22`). P3 consistency nits, invisible individually, exactly the "unseen details" category Emil warns about.

## 2 · alpacassie AI Typography vs. build — the strongest dimension

The guide's chain is *feeling → direction → reusable scale → readability checks*. The build's declared direction ("quiet authority, serif law register over a warm ivory ground") is realized with a system that goes well past the guide's baseline:

- Reusable scale on rems with unitless leading (`base.css:19-20`), title register `2.1rem/1.12` ≈ the guide's title slot.
- **Per-script root scale** for 12 scripts + `:lang()` font stacks for all 22 Eighth-Schedule languages (`tokens.css:174-272`) — the guide's "check fallback fonts and 200% zoom" concern solved structurally.
- Per-language body leading (1.6 → 2.15 for Nastaliq, `languages.ts`, `base.css:223-227`), grapheme-safe truncation (`lib/format.ts`), `formatINR` numerals, tabular figures class.
- Latin-only niceties (tracking, uppercase) rigorously conditioned on `lang === 'en'` — grep found **zero** unconditioned uses on translatable text.
- Honest coverage tiers (full/core/fallback) instead of costume translations (`languages.ts:7-14`), and the specimen route (`#/specimen`) is precisely the guide's "tune against a specimen" loop.

**Findings:**

- **[P1] `FindingCard` body text mis-declares `lang="en"`** — `FindingCard.tsx:110` wraps the whole `<dl>` in `lang="en"`, but `buildFinding` localizes `whatHappened` / `lawSays` / `means` into hi/mr/ta/ur (`localized-content.ts:120-182`). The explicit `lang` creates an English scope, so `:lang(hi|ta|ur…)` font stacks and the Urdu 2.15 leading **do not apply to the card's main body** — Devanagari/Tamil falls back to system fonts exactly where reading comfort matters most. The `<dt>`s already carry the correct per-element `lang`; fix is to drop `lang="en"` from the `<dl>` (keep it on the evidence well, which is genuinely English, `FindingCard.tsx:139`).
- **[P3]** arbitrary sizes above (`text-[0.95rem]`, `text-[0.8125rem]`) — snap to the scale or promote to tokens.

## 3 · alpacassie AI Color vs. build

The guide's workflow: pick a direction with references → audit (contrast, inconsistent colors, interaction states) → fix verified findings → extract **purpose-named** tokens → document → reuse. The build's `tokens.css` reads like the guide's end-state:

- Direction documented in the file header ("ivory garden / night garden", owner-approved mockup, `tokens.css:1-10`).
- Tokens named by **role, not hue**: surfaces, fg tiers, and `brand/positive/warning/danger` each with `solid/subtle/fg/on-*` shapes (`tokens.css:39-73`) — the guide's exact target architecture.
- One accent law holds (brand deep botanical green; sage `--c-spark` confined to the logo mark; gradients confined to the VoiceOrb signature).
- Dark theme is a **pure re-pointing** of the same roles (`tokens.css:98-166`), with deliberate exceptions documented inline (`fg-on-inverted`).
- The guide's "audit contrast" step is **enforced, not remembered**: `scripts/verify.mjs:213-228` computes OKLCH contrast for 15 declared pairs at 4.5:1 in *both* themes and fails the build.

**Findings:**

- **[P3]** the pair list misses combinations actually shipped: `brand-fg` icons sit on `bg-card` in the empty state (`ChatPage.tsx:725,740`) but only `brand-fg/shell` is gated. Add `brand-fg/card` (and `fg-primary/card` already exists ✓).
- **[Observation]** semantic status colors are visually close to brand green by design (teal-leaning positive, ochre warning, terracotta danger) — hierarchy stays legible in both themes; no action.

## 4 · Emil Kowalski design-engineering vs. build

The build implements Emil's checklist almost verbatim — much of it explicitly cited in comments:

- Press physics: `scale(0.97)` on `:active`, **transform-only** transition so press timing never leaks into hover color, hover gated behind `@media (hover: hover) and (pointer: fine)` (`base.css:35-65`) — Emil's exact spec, plus a smart 0.985 variant for large cards.
- Custom curve: `--ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1)` (`tokens.css:373`) — no builtin easings.
- Nothing animates from `scale(0)`: attach tray enters at `scale 0.98 + opacity` over 160ms (`Composer.tsx:63-66` — inside his 125–200ms popover window); grep found zero `scale-0` entries.
- Stagger: 40ms steps, `translateY(10px)` + fade, reduced-motion off (`base.css:197-220`) — inside his 30–80ms window.
- Beat engine: 210–430ms consequence-scaled stages, skippable, reduced-motion collapses to 1ms (`engine.ts:11-17`) — an unusually honest application of his "perceived performance" section to a *fake* AI latency loop.
- Frequency discipline: nothing keyboard-initiated animates; streaming caret `steps(1)` blinks then leaves (`base.css:361-384`).

Violations found (his required Before/After format):

| Before | After | Why |
| --- | --- | --- |
| `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important } }` (`base.css:541-549`) | Delete the global kill; keep the seven targeted reduced-motion blocks already in the file (pressable, stagger, orb, caret, scan, waveform) | Reduced motion = fewer/gentler, not zero — a global 0.01ms kill destroys opacity/color feedback, and it makes every targeted block above it dead code |
| `transition-all duration-300` + animated `width` on the replay progress bar (`ReplayPage.tsx:358`) | `transition: transform 300ms` + `transform: scaleX(p)` with `origin-left` | Only animate transform/opacity; `width` triggers layout every frame and `all` invites accidental property animation |
| Attach tray scales from default `transform-origin: center` (`Composer.tsx:62-67`) | `style={{ transformOrigin: 'bottom center' }}` — it is anchored *above* its trigger | Popovers should scale from their trigger; imperceptible at 0.98 but free to fix |

## 5 · Impeccable v4.8 audit vs. build

Deterministic detector on `src/`: **0 findings** (exit clean). Implementation integrity verdict: **pass** — the codebase expresses a coherent, product-specific system (protective stop language, paper register, fact-gate ritual) that an unrelated product could not reuse unchanged.

| # | Dimension | Score | Key finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3 | Global reduced-motion kill destroys useful feedback (P2-1); otherwise AA contrast gate-enforced, `:focus-visible` ring, live regions on status/typing |
| 2 | Performance | 4 | transform/opacity discipline holds; one width-animated progress bar (P3) |
| 3 | Theming | 4 | Full role tokens, pure-re-pointing dark, zero raw hex in TSX, gate-enforced |
| 4 | Responsive | 4 | Device frame + foldable dual-pane + safe-area insets + 44px chrome targets; RTL over-mirror (P2-2) is chrome, not layout |
| 5 | Implementation integrity | 4 | Detector clean; craft patterns cited and applied (nested radii, optical alignment in `Button.tsx:33-41`) |
| **Total** | | **18/20** | Excellent |

Nielsen heuristics (critique guide, inline scoring): visibility 4 · real-world match 4 · user control 4 · consistency 4 · error prevention 4 · recognition 4 · flexibility 3 (no accelerators beyond Enter-to-send — partly n/a by mobile-frame design) · **aesthetic 3 (header collision, P1-1)** · error recovery 4 · help/docs 4 → **38/40, Excellent.**

---

## Findings register (priority order)

- **[P1] Header wordmark collides with "New conversation" on every desktop screen** — `shell.tsx:124-131` + `ChatPage.tsx:617`. The left header group has `min-w-0`, the right group is `shrink-0`; inside the fixed 390px frame the left group shrinks while its text overflows and paints over the button ("LokAIew conversation"). Visible in all five desktop captures, both themes; this is the first thing a portfolio reviewer sees. Fix: `shrink-0` the left group and shorten/truncate the topBarExtra label (or hide it below `sm:` inside the frame).
- **[P1] `FindingCard` `<dl lang="en">` breaks per-script font register for localized body text** — `FindingCard.tsx:110`. Detail in §2.
- **[P2] Global `0.01ms` reduced-motion kill** — `base.css:541-549`. Detail in §4 table.
- **[P2] RTL over-mirrors reviewer chrome** — with `dir="rtl"`, the English-only `ReviewerTour` outside the device frame mirrors too: 01–06 numbers flip to the right edge and "?Reviewing the prototype" displaces punctuation (`shell.tsx:79-98`, evidence `qa/design-report/06-home-urdu-rtl.png`). The in-frame Urdu rendering is correct and handsome. Fix: `dir="ltr"` on the aside.
- **[P2] VoiceOrb near-invisible in light idle** — outer sage layer at 0.34 alpha over 98%-L ivory reads as a faint smudge (`base.css:234-235`; `01-home-light.png`). Dark theme already got a lift (deep-audit P3-14); light needs the equivalent.
- **[P3]** `transition-all` + `width` progress bar — `ReplayPage.tsx:358`.
- **[P3]** Off-scale radii `rounded-[22px]`/`[26px]` — `ChatPage.tsx:588,723,738`, `Composer.tsx:96`; snap to the 2–24 scale or promote a token.
- **[P3]** Off-scale text `text-[0.95rem]` / `text-[0.8125rem]` — `ChatPage.tsx:701`, `SectionRef.tsx:22`.
- **[P3]** Add `brand-fg/card` (and `brand-fg/sunken`) to the verify-gate pair list — currently ungated combination in the empty state.
- **[P3]** "Jump to latest" pill occludes the focused card's headline when the card is taller than the viewport (`Thread.tsx:64-75`) — standard pattern, worth a bottom-offset tweak.

## What's working (keep and replicate)

1. **The verify gate as design enforcement** — contrast pairs, token-only colors, no-network, honesty markers all fail the build, not a code review.
2. **Honesty as aesthetics** — coverage tiers, `reviewedByNativeSpeaker: false`, "Simulated in prototype" tags, mock-only attachments: the trust system *is* the visual identity.
3. **Motion restraint with real physics** — press scale, one custom curve, consequence-scaled beats, everything skippable; nothing moves that the user didn't cause.
4. **Above-and-beyond adaptation** — foldable dual-pane via viewport segments, safe-area-aware chrome, 22-language typography as data.

## Recommended sequence

1. Fix the two P1s (one-line CSS fix + one attribute fix — cheap, highest visible payoff).
2. Delete the global reduced-motion kill; add `dir="ltr"` to the reviewer tour; lift the light-theme orb.
3. Sweep the P3 tail (radii, text scale, progress bar, pair list) in one craft pass.
4. Re-run `npm run gates`, recapture `qa/design-report/`, and update `AGENTS.md`'s stale "deep navy" accent line (tokens re-pointed to botanical green on 2026-10-26).

## Housekeeping

The two `npx` installs added untracked dirs: `.agents/`, `.claude/`, `.codex/`, `agent/`, `skills-lock.json`. Decide: commit them (team shares the skills) or gitignore them. Nothing in `src/` was touched; all gates unaffected.
