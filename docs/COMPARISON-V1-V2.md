# LokAI v1 → v2 — Comparison Report

**Date:** 2026-10-25 · **v2 repo:** `D:\portfolio porjects\lokai new` (fresh build, Phases 0–2 complete) · **v1 repo:** `D:\portfolio porjects\Lokaifm-main` (untouched)

Both are deterministic, offline, mock-data prototypes of the same product idea: an AI legal-information
companion for Indian consumers. v2 is not a reskin of v1 — it is a from-scratch rebuild on a new foundation
(the Interfere-derived token architecture + the LokAI 2.0 phased build prompt), carrying over v1's hardest-won
content and design laws rather than its code.

---

## 1. Positioning

| | v1 ("Lokaifm") | v2 ("lokai new") |
|---|---|---|
| **Product shape** | Guided demo journey with a scripted response engine; "portfolio exhibit" first | An actual app in the ChatGPT/Gemini register — one conversational spine, free-typed input, chips, streaming beats |
| **Design foundation** | Bespoke "Vellum" material system (mesh+grain, Instrument Serif law register, warm paper) | Interfere-style semantic token architecture: neutral surfaces, hairline borders, border-first elevation, ONE navy accent |
| **Languages** | en, hi, mr, ta (all LTR) | en, hi, mr, ta **+ Urdu (RTL stress test)**, direction-aware from day one |
| **Routing** | Hash router, desktop/mobile shells, specimen gallery, embed mode | Hash router (embed-safe), 390px framed prototype shell, `#/specimen`, `#/gallery`, `#/dev` launcher |
| **Stack** | React 18, Tailwind 4, motion, sonner, cmdk, icon libraries (2 tiers) | React 19, Tailwind 4, motion, sonner, **zero icon libraries** (one bespoke SVG set), no router dep |

## 2. What v2 does better

**Typography is now a system, not a per-screen effort.** v1 handled Devanagari/Tamil with per-language font
custom properties (`--font-deva`, `--font-tamil`) and hand-checked screens. v2 drives everything from
`:lang()` selectors plus a `[data-script]` root scale (16px Latin, 17.5px Devanagari, 17.25px Tamil, 17px
Urdu) — components pick up script-appropriate stacks and sizes automatically, and the type specimen route
(`#/specimen`) exists precisely to tune those hypotheses. The hard rules (no letter-spacing/uppercase/italic
on non-Latin, `Intl.Segmenter` truncation, logical CSS properties everywhere) are enforced in code review and
partially by the verify gate, not just documented.

**The token architecture is industrial.** v1 had ~25 semantic role variables over a bespoke palette — good,
but single-theme naming (dark mode was a mobile-only re-pointing added late). v2 ships the full Interfere-style
matrix from day one: 7 surfaces, 4 foreground tiers, brand/positive/warning/danger families each with
solid/subtle/foreground/on-* shapes, a complete border set, disabled/inverted/veil tokens — with light AND dark
themes as equal citizens, all WCAG-AA-verified by the gate (34 declared pairs, both themes).

**Trust chrome is calmer and stricter.** v1's groundedClaims/totalClaims counters and 10 gate labels (G0–G9)
were honest but visually heavy. v2 keeps the honesty with less machinery: three-level plain-language confidence
(Clear / Likely—please confirm / Not sure), two-state verification badge, and a reasoning pill that is always
tagged "Simulated in prototype." The [VERIFY] policy is now absolute: every legal entry is `verified:false`
with visible `[VERIFY]` markers, and the gate fails the build if any entry ships verified.

**Interaction model matches user expectations now.** v1's demo engine narrated staged progress through fixed
turn objects; input matching was regex-on-triggers (acknowledged as brittle in v1's own comments). v2 keeps the
good part (consequence-scaled, skippable, reduced-motion-aware beats — stops animate fastest, explains slowest)
but drives it from a real classifier (`scope-rules.ts`) with the **downgrade law** encoded: uncertain input can
never silently proceed; it lands on Caution. Hard-stop classification routes to a protective screen whose TWO
treatments (inverted navy vs light protective card) both exist behind a persisted toggle — v1 never tested the
assumption that the inverted screen feels safer.

**The action ladder is a first-class object.** v1 had next-steps as prepared turn content. v2 ships it as three
expandable disclosures ordered by risk (editable+copyable WhatsApp draft with regenerate → 1915 helpline card
with prep list → demand notice on paper stationery behind an explicit consent checkbox). Nothing is exported or
sent by the app itself; copy-to-clipboard is the only "output."

**States exist as scenarios, not hopes.** `#/dev` launches: golden path, caution branch, three hard stops,
simulated error with retry, offline with disabled composer. All were exercised in a real browser during this
build (see §4).

## 3. What v1 still has that v2 defers (honest regressions)

- **The Marathi BMC notice interpreter** — v1's founding feature: segmented original clauses, per-language
  interpretations, field-level mono citation stamps, tap-to-source correspondence. This is Phase 3 of the v2
  plan; the data (v1 `noticeInterpretation.ts`) ports cleanly when that phase starts.
- **Depth of localized content.** v1 localized ~500 strings across turn chrome, stop families, glossary and
  flashcards in 4 languages. v2 localizes the UI chrome + conversational beats in 5 languages, but card bodies
  (finding/law/means) are English this build, flagged for the native-review pass. Urdu strings are AI-drafted
  and marked `reviewedByNativeSpeaker: false`.
- **Evidence locker / matter model.** v1's DemoContext matter store, 8 failure scenarios, caseWorkflow's
  filing packet — v2's single-thread journey doesn't yet model matters or evidence (Phase 4).
- **Verify gate breadth.** v1's gate checked scripted invariants (scenarios, turn ids, language packs, channel
  metaphors). v2's gate checks integrity + design law + WCAG but has fewer scripted fixtures to assert on — it
  will grow with each phase.

## 4. Test evidence (this build, 2026-10-25)

- Gates: `verify` **PASS** (integrity, design law, presence, 34 WCAG AA pairs × light+dark), `typecheck`
  clean, `build` ✓ (2.95–3.09 s).
- Browser runtime (agent-browser + Chrome 156, 420×900): empty state, golden path end-to-end, demand-notice
  consent gating, all three hard stops, DLSA form with [VERIFY] placeholders, treatment toggle, tell-me-more
  re-route, caution branch, error+retry, offline banner, Urdu RTL (`dir="rtl"` verified at runtime), dark
  mode — **zero console errors across the session**.
- Vision QA on key screens: home ("professional, ChatGPT-like calm, no flaws found"), finding card ("strong
  hierarchy, trust chrome visible"), stop screen ("calm and protective, not punitive").
- Bugs found and fixed during testing: StrictMode double-invoke swallowing scenario seeds; stale conversation
  state when re-seeding from the launcher; duplicated "So far I understand" prefix; duplicated caution intro.

## 5. Verdict

v2 is the right foundation to continue on: it keeps v1's legal-channel spine (1915, e-Daakhil, registered post
AD, DLSA), its anti-fabrication laws, and its consequence-scaled motion philosophy — while replacing the
exhibit-style shell with an app people already know how to use, and the bespoke visual system with a token
architecture that can scale to more scripts, themes and surfaces without re-deriving them per screen. v1
remains the reference for content depth; port from it phase by phase.
