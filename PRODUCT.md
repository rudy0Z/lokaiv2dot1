# PRODUCT.md — LokAI

*Read by humans and agents before any design or build work. Stable product truth; design decisions live in
DESIGN.md.*

## What this is

LokAI is a mobile-first AI legal-**information** companion for Indian citizens facing consumer disputes and
confusing official notices. It is an evidence organizer and explainer, **not a lawyer**, and it never claims
to give legal advice. Portfolio prototype: deterministic, offline, mock data — no live AI, no network, no
microphone, no file uploads.

## The user

A stressed, non-expert citizen who has just received a legal notice or a consumer injustice. They do not know
their rights, what the proportionate next step is, or whether a step could hurt their position. Voice is their
most natural input; typed text is the universal fallback. They may be in any of five prototype languages:
English, Hindi, Marathi, Tamil, Urdu (RTL).

## The promise

Reduce fear without overpromising. Every answer is checkable, every action is user-approved, and the
assistant's limits are always visible.

## Experience laws (unchanged, from the LokAI 2.0 build prompt)

1. One conversational spine — intake, clarification, documents, next steps in one thread.
2. Ask at most ONE clarifying question before the first useful answer.
3. Reassure about the process, never the outcome.
4. Proportional action ladder — lowest-cost, lowest-risk step first.
5. Every claim is checkable — source links, verification badges, [VERIFY] markers.
6. Honest uncertainty — three plain-language confidence levels, never percentages.
7. User stays in control — nothing leaves the app without explicit review; everything is editable.
8. Scope guardrails — hard stops route to human help (DLSA); uncertain classification downgrades to caution,
   never silently proceeds.

## Boundaries

- Consumer-protection scope only. Eviction/tenancy, criminal/safety, B2B, threats → protective stop.
- No invented statutes, limitation periods, fees, or helpline numbers. All legal content ships
  `verified: false` with [VERIFY] until the owner verifies.
- The notice interpreter explains what a notice SAYS; it never recommends whether to dispute.
- Simulated capabilities (voice, scanning) are always tagged "Simulated in prototype".

## Surfaces

Home (voice-first) · Listening · Review & send · Chat thread · AI response cards · Demand notice (paper) ·
Stop screen · History · Saved · Profile/privacy. 390px framed prototype shell, graceful on desktop.
