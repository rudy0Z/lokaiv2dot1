# LokAI v2 — Design & Interaction Quality Audit

**Date:** 2026-10-26 · **Auditor lens:** senior product designer, AI–human interaction (portfolio-review pass)
**Method:** live adversarial walkthroughs in Chrome 420×900 (evidence screenshots 40–41), code review of
classifier/copy/tokens, per-language surface inspection. Product laws from `PRODUCT.md` / the 2.0 build prompt
are the measuring stick.

---

## Verdict

**The chassis is genuinely good; the journey intelligence underneath it is not ready for the users this
product is for.** The trust chrome, the calm botanical skin, RTL Urdu, WCAG-verified tokens, and the protective
stop architecture are ahead of most real AI-legal products. But in live testing, the classifier routes a
frightened notice-recipient into a consumer-purchase script, the assistant invents facts while "restating,"
and the most sensitive sentences on the most sensitive screen render in English on a Hindi UI. For a product
whose entire bet is *"the assistant is honest about its limits,"* these are P0/P1, not polish items.

---

## What's working well (keep and protect)

1. **Trust chrome is real and visible** — verification badges default to "not yet verified," three-level
   plain-language confidence, "What I checked" pill always tagged *Simulated in prototype*, [VERIFY] docket
   stamps. No competitor has this.
2. **The multilingual hard-stop works** — a Hindi eviction message ("मकान मालिक ने बेदखली का नोटिस…")
   correctly triggered the protective stop (screenshot 41). Downgrade-law architecture is sound.
3. **Urdu RTL is complete** — full mirroring including tab bar; Nastaliq renders; `dir` flips at runtime.
4. **Design system integrity** — raw values confined to tokens (gate-enforced), AA contrast in both themes,
   reduced-motion fallbacks on orb/waveform/disclosures, border-first elevation, one accent.
5. **Notice interpreter** — tap-to-source highlighting works; per-field confidence; editable fields;
   explain-only rule stated inline.
6. **Consent discipline** — demand notice gated behind explicit consent; delete-everything gated behind a
   proper danger dialog; nothing leaves the device.

---

## Findings — severity ranked

### P0 — journey correctness (the product's core promise)

**P0-1. High-stakes matters route into the consumer script.** Evidence: sending *"I got a legal notice about a
property dispute and I am scared"* produced "That sounds frustrating, and it is a common situation…" followed by
**"When did you buy it?"** (screenshot of run in audit log). A property/court dispute is exactly the matter
class this product must slow down on; instead it got consumer-branch treatment with a purchase-age question.
Root cause: `classifyMatter` has no property/court/legal-notice patterns, and the proceed-branch asks the
mixer-journey's hardcoded question regardless of what the user said. The empathy line ("common situation") also
minimizes distress.

**P0-2. The "restatement" fabricates facts.** Evidence: sending Hinglish *"Mujhe HomeKart se grinder aaya tha,
tuta hua tha, refund nahi mila"* (no price, no replacement-refusal mentioned) returned "So far I understand:
mixer grinder from HomeKart, **₹8,999**, arrived cracked, **refund and replacement both refused**." The
assistant asserted details the user never gave — a direct violation of the product's own A2.3 restatement law,
and the single fastest way to destroy trust with a scared first-time user. Root cause: a `/HomeKart|mixer/i`
shortcut selects the scripted demo restatement for any input that mentions the words.

**P0-3. The stop screen's *why* sentence is English on localized screens.** Evidence: Hindi stop screen shows
headline "मैं यहीं रुक रहा हूँ" but the reason paragraph renders in English ("Housing disputes move fast and
mistakes can cost you your home…"). This is the most emotionally loaded sentence in the product, on the screen
a frightened Hindi speaker sees. `SCOPE_RULES[].why` are English-only and take precedence over the localized
`stopWhy` pack.

### P1 — language readiness across Indian states (the stated goal)

**P1-1. Reply language follows the UI, not the user.** Evidence: Hinglish input got an English reply; switching
UI to Hindi mid-thread leaves the whole prior conversation in English (screenshot 40) while new chrome flips.
Real Indian usage is code-mixed and input-led; the assistant should follow the language (and script) of what
the user wrote for its own replies, independent of chrome language. Minimum viable: script/keyword detection on
input choosing the reply language among the 5 prepared packs.

**P1-2. 5 of 22 scheduled languages, with no honest signpost.** Bengali, Telugu, Marathi ✓, Tamil ✓, Kannada,
Malayalam, Gujarati, Punjabi, Odia, Assamese speakers have no entry point — and the selector doesn't even say
they're coming. v1 had a 12-language registry with visible-but-disabled "not yet prepared" entries (an honesty
pattern this product invented); v2 dropped it. Regression against the "language ready across states" goal.

**P1-3. The serif display voice is Latin-only.** The greeting, "Here's what I heard", "I am going to stop here"
— the emotional register — silently falls back to a **sans** face for hi/mr/ta/ur (`--stk-serif` → Noto Sans
Devanagari/Tamil). No Devanagari/Tamil serif is even installed. India's scripts get the informational voice
everywhere; only English users get the human one. (Urdu is the exception — Nastaliq is inherently
calligraphic.) Fix: `@fontsource/noto-serif-devanagari` + `noto-serif-tamil`, wire `:lang()` serif stacks,
tune sizes on `#/specimen`.

**P1-4. The edit-your-answer affordance is unreachable.** The "Update" button under an answered chip only
renders when the answer is `stale`, which is never set on answers — dead code path (verified live: no Update
button after answering). A2.7 (user control) is broken at exactly the point a user says "actually it was two
years ago."

### P2 — interaction quality (AI-product patterns)

- **P2-1. First acknowledgment lands in ~4.75s** (5 beats × 950ms) with nothing but a stage label. An anxious
  user staring at "Checking the rules…" for 5 seconds feels abandonment, not care. ChatGPT's first token shows
  in ~1s. Fix: acknowledgment beat ≤600ms; slower beats only for the substantive card.
- **P2-2. Composer locks during streaming** (modal-lock anti-pattern; the reference teardown calls this out
  directly). Let the user compose the next message while beats run.
- **P2-3. Fake History entries are presented as real** ("Today, 10:24") on a product whose tagline is honesty;
  and Profile → Delete everything does not clear them. Label as examples, or store real threads.
- **P2-4. Notice routing regex is brittle**: only "official notice" phrasings trigger the notice explainer;
  "legal notice", "कानूनी नोटिस", "नोटिस आया" fall through (interacts with P0-1).
- **P2-5. Auto-scroll always wins** — no "jump to latest" when the user scrolls up during a long answer.
- **P2-6. Tap targets:** theme toggle + language select are 36px (HIG/WCAG-best-practice is 44; current is AA
  minimum, not comfortable for the older skew of this audience).
- **P2-7. Badge text at 11px** (`text-2xs`) carries critical trust semantics ("not yet verified") — below
  comfortable reading size for this audience; 12px minimum recommended.
- **P2-8. Orb halo is faint in dark mode** (recorded previously) — the signature weakens in the theme many
  users will prefer at night.

### Copy & sentiment notes (the "sentimental Indian user" lens)

- The no-blame construction on the stop screen ("आपने कुछ गलत नहीं किया है…") is exactly right — protect it.
- "That sounds frustrating… a common situation" mis-fires for fear-class matters; empathy should mirror the
  emotion (fear → reassurance about safety and process; frustration → validation of the hassle). Tie to P0-1.
- Formality register is consistent and correct: आप (hi), तुम्ही (mr), நீங்கள் (ta), آپ (ur). Good.
- "Good day. What has been happening?" is calm and non-legal — good; consider a slightly warmer variant in
  Indic packs where the greeting carries more social weight (नमस्ते lines already do this).
- DLSA placeholder rows ("[VERIFY — to be added]") sit untranslated on localized screens — acceptable as
  placeholders, but flag visually as prototype scaffolding, not content.

---

## Remediation plan (recommended order)

1. **P0-1 + P0-2 + P2-4 (one fix):** matter-type intent before journey — add patterns for property/court/
   legal-notice matters (en + hi/mr/ta/ur seeds: संपत्ति विवाद, कोर्ट, ज़मीन, नोटिस) routing to stop/caution/
   notice-explainer; kill the HomeKart-regex shortcut (scripted restatement only for the exact dev seed);
   generic clarify question for non-matcher proceeds; empathy line keyed to detected emotion class.
2. **P0-3:** localize all six rule `why` strings ×5 (reuse the `stopWhy` tone) and prefer the localized pack.
3. **P1-4:** always render the Update affordance on answer chips; re-open question; mark downstream stale.
4. **P1-1:** input-language detection for assistant replies (script-based; Hinglish → Roman-script reply or
   pack match), independent of chrome language.
5. **P1-2:** restore the honest language registry — visible unprepared languages with a "coming" state (v1
   pattern), so no state's speaker is invisible.
6. **P1-3:** install + wire Indic serif display faces; re-tune specimen.
7. **P2 items** in listed order (acknowledgment latency → composer unlock → history honesty → scroll → sizes).

## Evidence index

- Screenshot 40 — mixed-language thread after mid-conversation switch (English content / Hindi chrome).
- Screenshot 41 — Hindi eviction message correctly reaching the localized protective stop (the system working
  as designed — the pattern to generalize).
- Live-run log (this audit): property-dispute → consumer script + "When did you buy it?"; Hinglish →
  fabricated ₹8,999 restatement; no Update button post-answer; English rule-why on Hindi stop screen.
