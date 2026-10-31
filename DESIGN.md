# DESIGN.md — the LokAI design language

*The design system of record, extracted from the owner-approved mockup (2026-10-26) and the Interfere-derived
semantic architecture. Any agent or human designing a new surface MUST build from this file. Product truth
lives in PRODUCT.md.*

## Temperament

Calm, botanical, official. A patient government-office competence rendered with the softness of a consumer
app — ivory paper, deep botanical green ink, serif moments for the human register. It should feel like a
trusted public institution that finally learned good manners. NOT: techy dark-mode fintech, wellness-spa
pastels, or folkloric "Indian costume" decoration.

## The one signature

The **voice orb**: layered sage gradients that breathe when idle and morph to a faster pulse when listening.
Boldness is spent here and nowhere else. Every other surface is flat, bordered, and quiet. If a design needs
a second gradient anywhere, it is wrong.

## Tokens (implemented in `src/styles/tokens.css` — the ONLY home of raw values)

Semantic architecture (Interfere-derived): `page / shell / container / card / sunken / modal / standout` →
foreground tiers `primary / secondary / tertiary / disabled` → families `brand / positive / warning / danger`
each with `solid(+hover/active) · subtle · fg · on-*` → borders `default / subtle / strong / inverted` →
`focus`, veils, disabled.

- **Light ("ivory garden"):** warm ivory shell, cream cards, green-black ink, forest-green accent.
- **Dark ("night garden"):** deep green-black surfaces, sage text, mint-green accent. Equal citizen, not an
  afterthought; every token pair WCAG-AA checked by `scripts/verify.mjs` in BOTH themes.
- `--c-spark` exists for the logo mark only — never a UI accent.
- `--c-paper` + the `.paper` class are reserved for generated documents (demand notice, receipts).

## Type — three registers, one job each

| Register | Face | Use |
|---|---|---|
| Display / serif | Source Serif 4 | Human moments: greeting headline, listening/review titles, finding-card headings, document body. The "voice of the guide". |
| UI / sans | Inter Variable | Everything interactive and informational: body, labels, chips, tabs, composer. |
| Evidence / mono | JetBrains Mono | Citations, amounts, dates, order numbers, docket stamps. Only inside `lang="en"` content. |

Per-script companions (Noto Devanagari / Tamil / Nastaliq Urdu / Naskh) load via `:lang()`; sizes scale per
script via `[data-script]`. NEVER letter-spacing, uppercase, italic, or faux bold on non-Latin; Latin-only
niceties must be conditioned on `lang === 'en'`. Truncation via `Intl.Segmenter` only. Urdu is RTL; use
logical CSS properties everywhere.

## Layout

- 390px framed prototype shell (centered, hairline frame on desktop), full-bleed on small screens.
- Bottom tab bar: Home · History · Saved · Profile. Top bar: brand + language + theme. The tab bar is the
  only global navigation; in-thread flows use back buttons, never tabs.
- Tone steps separate surfaces; hairline borders articulate cards; shadows only on true floaters (menus,
  modals, the attachment tray).
- Cards: radius 16–20, padding 16, generous internal line-height. Key-point rows and action tiles follow the
  mockup patterns (numbered circles + chevron rows; 3-up icon tiles).

## Motion

Quiet and functional: 150–250ms ease-out for state changes, height-animated disclosures, one orchestrated
orb morph (idle ↔ listening ↔ thinking). Consequence-scaled beat pacing from `lib/engine.ts` (stops resolve
fastest). `prefers-reduced-motion` collapses all of it. No decoration motion anywhere else.

## Components of record

Primitives in `components/ui/` (Button, Chip, Badge, Card, Banner, Disclosure, Field, Checkbox, Skeleton,
icons); domain: chat (Composer, MessageBubble, Thread, QuickReplies, TypingIndicator), trust
(ConfidenceIndicator, VerificationBadge, ReasoningPill), cards (FindingCard, ActionLadder, CautionCard,
CardActions, DemandNoticeReview), stop (StopScreen), voice (VoiceOrb, ListeningScreen, ReviewAndSend).

## Bans

- No second accent, no gradient outside the orb, no glass/blur panels, no decorative blobs.
- No icon libraries — the bespoke set in `ui/icons.tsx` only.
- No status strings outside `data/` vocabularies; no legal text outside `legal-content.ts`.
- No uppercase/tracking on localized labels; no `slice()` truncation; no raw hex in TSX.
- No fabricated confidence (percentages, grounding scores).
- ChatGPT-parity where it helps (docked composer, calm defaults); divergence where the product demands
  (trust chrome, stop screen, paper documents, serif register).
