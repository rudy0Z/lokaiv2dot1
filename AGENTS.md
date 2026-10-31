# AGENTS.md — LokAI 2.0 prototype

Portfolio prototype of an Indian legal-AI companion. Deterministic, offline, mock data only — **no live AI,
no network, no OCR, no microphone, no file inputs** (the verify gate greps for all of these; do not defeat it).

## Commands

```bash
npm run dev          # local dev — ALWAYS this
npm run gates        # verify + typecheck + build — run before every commit
npm run verify       # the gate alone
```

No test suite or linter exists; `verify + typecheck + build` are the three gates.

## The four laws

1. **Legal content lives in ONE place.** `src/app/data/legal-content.ts`, schema
   `{ claim, source, sectionRef, verified, lastChecked }`. Everything ships `verified: false` with visible
   `[VERIFY]` markers. No statute numbers, limitation periods, fees or helpline numbers anywhere else — and
   none invented. `verified: true` is an owner-only flip.
2. **No fabricated confidence.** `ConfidenceIndicator` levels: clear / likely / unsure, plain words, never a
   percentage. The reasoning pill must always render the "Simulated in prototype" tag (the gate checks this).
3. **The downgrade law.** `data/scope-rules.ts` classifies input into `proceed | caution | hard-stop`.
   Uncertain → caution, never silent proceed. Hard-stop → the protective `StopScreen` with the DLSA panel
   (placeholder contacts `[VERIFY]`) and the "tell me more" re-entry. Both stop treatments (inverted/light)
   stay behind the toggle — do not delete one.
4. **User stays in control.** Every generative card carries edit / regenerate / discard. The demand notice
   renders on paper stationery behind an explicit consent checkbox; the app itself never sends or exports
   anything (copy-to-clipboard is the only output path).

## Design system — import downward only

```
src/styles/tokens.css   ← the ONLY place raw colors/radii/shadows/font stacks may exist
src/app/components/ui/  ← primitives (Button, Chip, Badge, Card, Banner, Disclosure, Field…)
src/app/components/{chat,trust,cards,stop}/  ← domain components
src/app/pages/          ← routes; never reach past primitives
```

- Use token utilities (`bg-shell`, `text-fg-secondary`, `border-line-default`, `rounded-2xl`…). Raw hex,
  inline `fontFamily`/`fontSize`/`lineHeight` in TSX fail the gate.
- **ONE accent** (deep botanical green `brand-*`). Saffron exists only inside the logo mark (`--c-spark`), never as UI
  accent. Status colors are semantic only.
- Elevation is border-first (`border-line-default`); shadows (`shadow-default/large/xl`) are rare and soft.
- Light and dark are equal citizens: dark theme = pure re-pointing in `[data-theme="dark"]`. New token pairs
  must be added to the WCAG list in `scripts/verify.mjs` and pass AA in both themes.
- Icons: the bespoke set in `components/ui/icons.tsx` only. No icon libraries.

## Typography (A4b) — the main design problem

- Languages are configured in `data/languages.ts` (en, hi, mr, ta, **ur — RTL**). Adding a language = one
  entry there + `:lang()` stack in tokens.css + strings in `data/i18n.ts`.
- Per-script scale via `[data-script]` root font-size; tune against `#/specimen`, not by eye in screens.
- NEVER letter-spacing, uppercase, italic, or faux bold on non-Latin text. Latin-only niceties must be
  conditioned on `lang === 'en'` (see FindingCard's `labelClass` for the pattern).
- Truncate with `truncateGraphemes` (`lib/format.ts`), never `slice`. Numbers via `formatINR` (en-IN).
- Every screen must hold with long Tamil/Urdu strings: chips wrap, no fixed heights on text.

## Interaction model

- One conversational spine (`pages/ChatPage.tsx`): reassurance + one-sentence restatement → ONE question
  with chips → branch (finding + ladder / caution). Beats are paced by `lib/engine.ts`
  (consequence-scaled, skippable, `prefers-reduced-motion` aware) — no real streaming, no model.
- Scenario seeding via `#/?s=<id>` always resets the conversation (launcher discipline; StrictMode-safe —
  the guard is set only when the timer fires).
- Editing an earlier answer marks downstream cards stale and re-opens the question; never silently rewrites.

## Data conventions

- Fictional sellers only (HomeKart). No real people, letterheads, or case numbers.
- Indian channel metaphors are product copy: **1915**, **e-Jagriti** (the consumer e-filing portal that
  absorbed e-Daakhil), **registered post with acknowledgement due**, DLSA — always `[VERIFY]`-badged here.
- Urdu/hi/mr/ta strings are AI-drafted (`reviewedByNativeSpeaker: false`) — never present unreviewed content
  as verified, and don't "fix" translations without flagging them.

## Repo neighbors

v1 lives at `D:\portfolio porjects\Lokaifm-main` — read-only reference for content depth (notice
interpreter, localized turn packs, matter intelligence). Port from it phase by phase; don't edit it.
The phased build prompt (`LokAI_2.0_phased_build_prompt.md`, owner's machine) is the product authority.
