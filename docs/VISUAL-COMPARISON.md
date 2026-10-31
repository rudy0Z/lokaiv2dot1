# How LokAI v2 looks next to ChatGPT and Gemini

**Date:** 2026-10-26 · **v3 full-bleed edition** — after the owner's comparison against Pi / ChatGPT /
Gemini / Copilot (and the Dribbble-grade reference folder), the boxed prototype shell was demolished and
rebuilt to the 2026 register. See `DESIGN.md` for the language of record. Evidence:
`docs/screenshots/50–60`.

## 0. What the owner's comparison caught (and what changed)

| Owner's finding | Root cause | Fix shipped |
|---|---|---|
| "What is this box/container at the bottom?" | The composer and tab bar rendered as opaque bordered boxes | **Borderless composer** on a sunken tonal field; **floating glass tab bar** (backdrop-blur) — while the **desktop device frame stays** (this is a mobile prototype; it presents as a phone on desktop, full-bleed on real phones, full-width on a spanned Duo) |
| Composer looked boxed | Opaque bordered bar | Borderless composer, 26px radius, brand ring on focus only |
| Tab bar looked bolted on | Solid strip with border | Floating glass pill anchored inside the frame; content scrolls beneath |
| Small, cramped, 2020 | 15px body, small display, borders everywhere | 16px base (also the iOS zoom floor), 2.1rem serif display with tight tracking, borderless tonal cards/chips |
| Static, lifeless | No press feedback | **Press physics**: 0.96 scale on touch-down (150ms), hover gated behind `(hover:hover)`, springs elsewhere |
| Orb too dim | Faint halo, small | 244px, layered sage gradients, inner-light core; brightened in dark mode |

Pi remains the closest cousin (cream + green + serif conversation) — the difference now is intent, not
quality: our serif carries legal authority, our orb is the one signature, our trust chrome has no competitor.

## 1. Language readiness — all 22 scheduled Indian languages + English ("no excuses")

- Every Eighth-Schedule language is **selectable in the UI** (selector + profile + specimen):
  Assamese, Bengali, Bodo, Dogri, Konkani, Gujarati, Hindi, Kannada, Kashmiri, Maithili, Malayalam,
  Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu, Urdu.
- **Per-script Noto fonts ship for every script** (Bengali, Gujarati, Gurmukhi, Kannada, Malayalam, Odia,
  Telugu, Meetei Mayek, Ol Chiki, Devanagari, Tamil, Nastaliq/Naskh) — subsets, unicode-ranged.
- **Coverage law (honest):** `full` (en/hi/mr/ta/ur complete packs) · `core` (core chrome translated;
  13 languages) · `fallback` (brx/doi/ks/mni/sat/sd — script + fonts wired, English chrome rather than a
  wrong sentence). The fallback is visible and documented in-app on the Profile language sheet.
- **break-ui stress result (8 scripts, 420px, via the app's own persistence boundary):** Malayalam, Kannada,
  Telugu, Bengali, Gujarati, Punjabi, Odia, Sindhi — zero broken signatures: no clipped matras/descenders,
  no overflow, chips and tabs wrap, tab bar mirrors in RTL. Evidence `60-lang-*.png`.
- Devanagari + Tamil serif display faces now exist (`Noto Serif Devanagari/Tamil`) — the emotional register
  is no longer Latin-only (audit P1-3).

## 2. What we share with both (the native-app contract)

- The calm chat anatomy: **docked composer** (never floating), full-width assistant answers, soft user
  bubbles, suggestion chips on an input-first empty state, visible streaming states, error + retry, and a
  single-column mobile frame with pinned navigation.
- Recent UI: **bottom tab bar** (Home/History/Saved/Profile) — the same information architecture as Gemini's
  app, with our tabs in the botanical palette.
- Narrated beats while "thinking" — honest placeholders, never fake percentage progress (a trust anti-pattern
  in the reference teardowns).

## 3. The mockup skin — where we now visibly differ from every generic AI app

| Axis | ChatGPT / Gemini | LokAI v2 |
|---|---|---|
| **Ground** | White / light gray | Warm **ivory** with cream cards — paper, not plastic |
| **Accent** | Teal-ish (ChatGPT) / blue-gradient (Gemini) | One **deep botanical green**; the orb is the only gradient in the product |
| **Voice** | Full-screen voice mode; waveform | **Voice-first home**: the sage orb IS the empty state; simulated listening → editable "Here's what I heard" review before anything sends |
| **Type** | One sans | Sans for UI + **serif display for human moments** (greeting, listening, card headings) + mono for citations/amounts — three registers, three kinds of truth |
| **Trust chrome** | Unbadged prose | Verification badge on every legal reference, 3-level plain-language confidence, "What I checked" pill tagged *Simulated in prototype*, [VERIFY] docket stamps |
| **Structure** | Prose answers | **Finding cards** (three zones), risk-ordered **action ladder** with numbered rows, editable key-point rows in the notice reader, paper-stationery demand notice behind explicit consent |
| **Refusals** | Inline refusals | A designed **protective stop screen** (deep green-ink inverted / light treatments), DLSA routing, re-entry |
| **Scripts** | Latin-first | **23 languages incl. Urdu/Sindhi/Kashmiri RTL**; per-script scales and fonts; the whole shell mirrors |
| **Foldables** | Responsive only | **iPhone Duo spanning layout**: thread left, the active finding/ladder docks right of the hinge (`horizontal-viewport-segments`) |

## 4. Screenshot evidence (vision QA)

- **Home (50):** full-bleed ivory, serif greeting, breathing orb, borderless tiles, floating glass tab bar —
  the owner's complaint (the box) is gone.
- **Golden path (51):** citation stamp in mono, "Prototype content, not yet verified" badge, Clear confidence
  panel, numbered ladder — the mockup's response screen with real trust chrome.
- **Dark (52):** night garden, glass tab bar, orb brightened.
- **Stress languages (60-*):** Malayalam/Kannada/Telugu/Bengali/Gujarati/Punjabi/Odia fully localized;
  Sindhi full RTL mirror with honest English fallback.

## 5. Where ChatGPT/Gemini still beat us (honest)

- Long-tail polish at scale: hover/active microstates, thread virtualization, in-thread search.
- Real streaming vs our narrated beats; real speech vs the simulated orb (mic is never touched here — by law,
  tagged everywhere).
- **Duo layout is code-verified only** — `horizontal-viewport-segments` needs real foldable hardware to
  confirm; the default single-pane layout is unaffected.
- Years-tuned dark palettes; ours is one deliberate pass (AA-verified in both themes).

## 6. One-line positioning

ChatGPT and Gemini are general assistants on neutral plastic. LokAI v2 is a **legal instrument on paper** —
the same full-bleed app anatomy everyone knows, dressed in ivory and botanical green, speaking 23 Indian
languages, with every visual device pointed at checkability: serif findings, mono docket stamps, verification
badges, the protective stop, the paper notice.
