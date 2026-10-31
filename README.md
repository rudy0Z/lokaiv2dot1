# LokAI 2.0

An AI legal-information companion for Indian citizens — a **portfolio prototype**: fully visual,
deterministic, offline. No live AI, no network, no file uploads, no microphone. Not a lawyer, and it says so.

Built per the LokAI 2.0 phased build prompt (Phases 0–2 complete) on a visual foundation re-implemented from
the Interfere design system's token architecture (design.interfere.com — docs-only; all code here is ours).

## Commands

```bash
npm run dev       # local dev — ALWAYS this
npm run verify    # integrity + design-law + WCAG AA gate (light & dark)
npm run typecheck # tsc --noEmit (strict)
npm run build     # typecheck + vite build
npm run gates     # verify + typecheck + build, in one
```

`npm run preview` serves from `dist/` — build `base` is `./` with hash routing, so the app is embeddable
anywhere (portfolio iframe included).

## Routes (hash)

| Route | What |
|---|---|
| `#/` | The app — empty state → chat spine |
| `#/?s=<scenario>` | Seeded scenario (see below) |
| `#/specimen` | Type specimen — every script × every register; tune the per-script scales here |
| `#/gallery` | Component gallery — every component × every state |
| `#/dev` | Scenario launcher — all flows and states, one link each |

**Scenarios:** `refund-golden` · `refund-caution` · `stop-eviction` · `stop-threat` · `stop-b2b` ·
`error-state` · `offline-state`

## Non-negotiable rules

- **One legal store:** every legal claim lives in `src/app/data/legal-content.ts` with `verified: false` and
  visible `[VERIFY]` markers until the owner verifies. Never invent section numbers, limitation periods, fees
  or helpline numbers.
- **No fabricated confidence:** three plain-language levels only (Clear / Likely—please confirm / Not sure).
  Never a percentage.
- **Downgrade law** (`data/scope-rules.ts`): uncertain classification lands on Caution, never a silent
  Proceed. Hard stops route to the protective stop screen with DLSA help.
- **Typography (A4b):** per-script stacks via `:lang()`; no letter-spacing/uppercase/italic/faux-bold on
  non-Latin; truncation via `Intl.Segmenter`; logical CSS properties; Urdu is RTL.
- **Raw colors/fonts live only in `src/styles/`** — the verify gate enforces this plus WCAG AA on declared
  token pairs in both themes.
- **Fonts are self-hosted** (Fontsource, OFL): Inter Variable, JetBrains Mono, Source Serif 4 + Noto
  Devanagari/Tamil/Nastaliq-Urdu/Naskh-Arabic companions. (Berkeley Mono / Heldane Text from the reference
  system are commercial; these are the licensed stand-ins.)
- Non-English strings are AI-drafted placeholders (`reviewedByNativeSpeaker: false`) until human review.

## Docs

- `docs/COMPARISON-V1-V2.md` — what changed from the v1 prototype and why
- `docs/VISUAL-COMPARISON.md` — positioning against ChatGPT and Gemini, with screenshot evidence
- `docs/screenshots/` — captured during the Phase 0–2 runtime test
- `AGENTS.md` — the working rules for anyone (human or agent) editing this repo
