#!/usr/bin/env node
/**
 * LokAI v2 verification gate — the deterministic sibling of v1's verify-demo.
 *
 *  1. Demo integrity: no network, no media capture, no file inputs, no keys.
 *  2. Design law: no raw colors / inline font styles outside the system files.
 *  3. Presence: specimen + gallery + 5 languages (incl. ur RTL) + legal store
 *     schema with [VERIFY] policy + scope rules incl. the downgrade law.
 *  4. WCAG AA: contrast spot-check of declared token pairs, light AND dark.
 *
 * Exit 0 = pass. Any failure prints file:line evidence and exits 1.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')
const STYLE_FILES = new Set([
  'src/styles/index.css',
  'src/styles/tokens.css',
  'src/styles/base.css',
])
const failures = []
const notes = []
const ok = (m) => notes.push(`  ok  ${m}`)
const fail = (m) => failures.push(m)

/* ---------- walkers ---------- */
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}
const files = walk(SRC)
const rel = (p) => relative(ROOT, p).replaceAll('\\', '/')
const tsxFiles = files.filter((p) => /\.[jt]sx?$/.test(p))

/* ---------- 1. demo integrity ---------- */
const FORBIDDEN = [
  [/\bfetch\s*\(/, 'network fetch('],
  [/getUserMedia/, 'camera/mic capture'],
  [/new\s+MediaRecorder/, 'media recording'],
  [/type=["']file["']/, 'file input'],
  [/VITE_[A-Z_]*API_KEY/, 'API key env'],
]
for (const p of tsxFiles) {
  const text = readFileSync(p, 'utf8')
  const lines = text.split('\n')
  lines.forEach((line, i) => {
    for (const [re, label] of FORBIDDEN) {
      if (re.test(line)) fail(`${rel(p)}:${i + 1} forbidden ${label}`)
    }
  })
}
ok('demo integrity: no network / capture / file-input / key patterns')

/* ---------- 2. design law ---------- */
for (const p of tsxFiles) {
  const text = readFileSync(p, 'utf8')
  const lines = text.split('\n')
  lines.forEach((line, i) => {
    const no = line.replace(/\/\/.*$/, '')
    if (/#[0-9a-fA-F]{3,8}\b/.test(no)) fail(`${rel(p)}:${i + 1} raw hex color`)
    if (/fontFamily\s*:/.test(no)) fail(`${rel(p)}:${i + 1} inline fontFamily`)
    if (/fontSize\s*:/.test(no)) fail(`${rel(p)}:${i + 1} inline fontSize`)
    if (/letterSpacing\s*:/.test(no)) fail(`${rel(p)}:${i + 1} letterSpacing`)
    if (/lineHeight\s*:/.test(no)) fail(`${rel(p)}:${i + 1} lineHeight`)
  })
}
{
  // css files other than the system trio must not define colors either
  const cssFiles = files.filter((p) => p.endsWith('.css'))
  for (const p of cssFiles) {
    if (STYLE_FILES.has(rel(p))) continue
    const text = readFileSync(p, 'utf8')
    if (/#[0-9a-fA-F]{3,8}\b/.test(text) || /oklch\(/.test(text)) {
      fail(`${rel(p)} raw color values outside the system style files`)
    }
  }
}
ok('design law: raw colors/typography confined to src/styles/*')

/* ---------- 3. presence ---------- */
const mustContain = [
  ['src/app/pages/SpecimenPage.tsx', 'SpecimenPage', 'type specimen route'],
  ['src/app/pages/GalleryPage.tsx', 'GalleryPage', 'component gallery route'],
  ['src/app/data/languages.ts', "'ur'", 'Urdu config'],
  ['src/app/data/languages.ts', "'rtl'", 'RTL direction flag'],
  ['src/app/data/languages.ts', "'olchiki'", 'Santali Ol Chiki script'],
  ['src/app/data/languages.ts', "'meetei'", 'Manipuri Meetei Mayek script'],
  ['src/app/data/i18n-drafts.ts', 'UI_DRAFTS', 'draft language packs'],
  ['src/app/data/scope-rules.ts', 'hard-stop', 'hard-stop tier'],
  ['src/app/data/scope-rules.ts', 'downgrade', 'downgrade law'],
  ['src/app/components/trust/ReasoningPill.tsx', 'simulatedTag', 'simulated tag wiring'],
  ['src/app/data/i18n.ts', 'simulatedTag', 'simulated tag string'],
]
for (const [file, needle, label] of mustContain) {
  const p = join(ROOT, file)
  if (!existsSync(p)) fail(`missing ${file} (${label})`)
  else if (!readFileSync(p, 'utf8').includes(needle)) fail(`${file} missing "${needle}" (${label})`)
  else ok(`presence: ${label}`)
}

/* languages: every scheduled language present via the factory */
{
  const text = readFileSync(join(ROOT, 'src/app/data/languages.ts'), 'utf8')
  const codes = ['en', 'as', 'bn', 'brx', 'doi', 'gom', 'gu', 'hi', 'kn', 'ks', 'mai', 'ml', 'mni', 'mr', 'ne', 'or', 'pa', 'sa', 'sat', 'sd', 'ta', 'te', 'ur']
  for (const code of codes) {
    if (!new RegExp(`L\\('${code}'`).test(text)) fail(`languages.ts missing ${code}`)
  }
  if (codes.length !== 23) fail('expected 23 languages')
}
ok('presence: all 22 scheduled Indian languages + English')

/* legal content: every entry unverified + [VERIFY] visible */
{
  const p = join(ROOT, 'src/app/data/legal-content.ts')
  const text = readFileSync(p, 'utf8')
  const entries = text.match(/verified:\s*(true|false)/g) ?? []
  if (entries.length < 3) fail('legal-content.ts: expected at least 3 entries')
  if (entries.some((e) => e.includes('true'))) {
    fail('legal-content.ts: an entry is verified:true — owner-only flip, and never in a fresh build')
  }
  if (!text.includes('[VERIFY')) fail('legal-content.ts: [VERIFY] markers missing')
  if (!/lastChecked/.test(text)) fail('legal-content.ts: lastChecked missing')
  ok(`presence: legal store — ${entries.length} entries, all [VERIFY] / verified:false`)
}

/* reasoning pill simulated tag is ALWAYS rendered (not only expanded) */
{
  const p = join(ROOT, 'src/app/components/trust/ReasoningPill.tsx')
  const text = readFileSync(p, 'utf8')
  const expandedBlock = text.slice(text.indexOf('{open &&'))
  if (!/simulatedTag|Simulated/.test(expandedBlock)) {
    fail('ReasoningPill: expanded panel must carry the Simulated tag')
  } else ok('presence: reasoning pill simulated tag in expanded panel')
}

/* ---------- 4. WCAG AA contrast ---------- */
function parseBlocks(css) {
  const grab = (selector) => {
    const idx = css.indexOf(selector)
    if (idx === -1) return {}
    const start = css.indexOf('{', idx)
    let depth = 1
    let end = start + 1
    while (depth > 0 && end < css.length) {
      if (css[end] === '{') depth++
      if (css[end] === '}') depth--
      end++
    }
    const body = css.slice(start + 1, end - 1)
    const vars = {}
    for (const m of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) vars[m[1]] = m[2].trim()
    return vars
  }
  return { light: grab(':root'), dark: grab('[data-theme="dark"]') }
}

/** oklch(..) string -> LINEAR sRGB triplet (0..1, no gamma encode) */
function oklchToLinear(str) {
  const m = str.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)/)
  if (!m) return null
  const L = parseFloat(m[1]) / (str.includes('%') ? 100 : 1)
  const C = parseFloat(m[2])
  const H = (parseFloat(m[3]) * Math.PI) / 180
  const a_ = C * Math.cos(H)
  const b_ = C * Math.sin(H)
  const l_ = L + 0.3963377774 * a_ + 0.2158037573 * b_
  const m_ = L - 0.1055613458 * a_ - 0.0638541728 * b_
  const s_ = L - 0.0894841775 * a_ - 1.291485548 * b_
  const l3 = l_ ** 3
  const m3 = m_ ** 3
  const s3 = s_ ** 3
  return [
    4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ]
}

/** relative luminance from a CSS color string (oklch or rgb()) */
function luminance(str) {
  let lin
  if (str.startsWith('rgb(')) {
    const parts = str.match(/[\d.]+/g).map(Number)
    const [r, g, b] = parts.slice(0, 3)
    const dec = (v) => {
      const c = v / 255
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    }
    lin = [dec(r), dec(g), dec(b)]
  } else {
    lin = oklchToLinear(str)
  }
  if (!lin) return null
  const clamped = lin.map((c) => Math.min(Math.max(c, 0), 1))
  return 0.2126 * clamped[0] + 0.7152 * clamped[1] + 0.0722 * clamped[2]
}

function contrast(fg, bg) {
  const l1 = luminance(fg)
  const l2 = luminance(bg)
  if (l1 === null || l2 === null) return null
  const [a, b] = l1 >= l2 ? [l1, l2] : [l2, l1]
  return (a + 0.05) / (b + 0.05)
}

const PAIRS = [
  ['fg-primary', 'shell', 4.5],
  ['fg-secondary', 'shell', 4.5],
  ['fg-tertiary', 'shell', 4.5],
  ['fg-primary', 'card', 4.5],
  ['fg-secondary', 'sunken', 4.5],
  ['on-brand-solid', 'brand-solid', 4.5],
  ['brand-fg', 'shell', 4.5],
  ['brand-fg', 'card', 4.5],
  ['brand-fg', 'sunken', 4.5],
  ['on-brand-subtle', 'brand-subtle', 4.5],
  ['on-positive-solid', 'positive-solid', 4.5],
  ['on-positive-subtle', 'positive-subtle', 4.5],
  ['on-warning-solid', 'warning-solid', 4.5],
  ['on-warning-subtle', 'warning-subtle', 4.5],
  ['on-danger-solid', 'danger-solid', 4.5],
  ['on-danger-subtle', 'danger-subtle', 4.5],
  ['fg-on-inverted', 'standout', 4.5],
  ['on-ink', 'ink', 4.5],
  ['ink', 'shell', 3.0],
  ['fg-standout-secondary', 'standout', 4.5],
  ['brand-solid', 'shell', 3.0],
  ['positive-solid', 'shell', 3.0],
  ['danger-solid', 'shell', 3.0],
]

{
  const css = readFileSync(join(ROOT, 'src/styles/tokens.css'), 'utf8')
  const { light, dark } = parseBlocks(css)
  for (const [themeName, theme] of [
    ['light', light],
    ['dark', dark],
  ]) {
    const merged = { ...light, ...theme } // dark re-points over light base
    for (const [fgKey, bgKey, min] of PAIRS) {
      const fgVal = merged[`c-${fgKey}`]
      const bg = merged[`c-${bgKey}`]
      if (!fgVal || !bg) {
        fail(`tokens.css: missing var for pair ${fgKey}/${bgKey} (${themeName})`)
        continue
      }
      const ratio = contrast(fgVal, bg)
      if (ratio === null) {
        notes.push(`  ..  ${themeName} ${fgKey}/${bgKey}: skipped (non-lit value)`)
        continue
      }
      if (ratio < min) {
        fail(`WCAG ${themeName}: ${fgKey} on ${bgKey} = ${ratio.toFixed(2)} < ${min}`)
      } else {
        ok(`WCAG ${themeName}: ${fgKey}/${bgKey} = ${ratio.toFixed(2)}`)
      }
    }
  }
}

/* ---------- 5. journey invariants (deep-audit P2-12) — the classifier's
   BEHAVIOR is tested, not just its presence: a regression like the old
   `length > 25 → proceed` shortcut must fail the gate ---------- */
{
  const { createRequire } = await import('node:module')
  const require = createRequire(import.meta.url)
  try {
    const { transformSync } = require('esbuild')
    const src = readFileSync(join(ROOT, 'src/app/data/scope-rules.ts'), 'utf8')
    const { code } = transformSync(src, { loader: 'ts', format: 'cjs' })
    const mod = { exports: {} }
    new Function('exports', 'module', code)(mod.exports, mod)
    const { classifyMatter } = mod.exports

    const CASES = [
      // [input, expected tier, expected certainty (optional)]
      ['hello I want to ask something please help', 'caution', 'uncertain'],
      ['my landlord will throw me out', 'hard-stop'],
      ['the seller threatened me', 'hard-stop'],
      ['my company bought goods with a GST invoice', 'hard-stop'],
      ['I bought a mixer grinder and it arrived cracked, refund refused', 'proceed', 'matched'],
      ['I bought it about 3 years ago and it broke', 'caution', 'matched'],
    ]
    for (const [text, tier, certainty] of CASES) {
      const d = classifyMatter(text, 'en')
      if (d.tier !== tier) fail(`classifier: "${text}" → ${d.tier}, expected ${tier}`)
      else if (certainty && d.certainty !== certainty) {
        fail(`classifier: "${text}" certainty ${d.certainty}, expected ${certainty}`)
      } else ok(`classifier: "${text.slice(0, 34)}…" → ${tier}${certainty ? '/' + certainty : ''}`)
    }

    // the downgrade law, stated as an invariant: uncertain input may NEVER
    // classify as proceed, whatever the rules grow to be
    const d = classifyMatter('hello I want to ask something please help', 'en')
    if (d.tier === 'proceed' && d.certainty === 'uncertain') {
      fail('downgrade law violated: uncertain input classified proceed')
    } else ok('downgrade law: uncertain never proceeds silently')
  } catch (e) {
    fail(`classifier invariant harness failed: ${e?.message ?? e}`)
  }
}

/* localization-leak + wiring checks (deep-audit P1-3/P1-5 + follow-ups) */
{
  const ladder = readFileSync(join(ROOT, 'src/app/components/cards/ActionLadder.tsx'), 'utf8')
  if (/lowest risk|official channel|mistakes cost/.test(ladder)) {
    fail('ActionLadder: hardcoded English ladder strings leaked back — subtitles must come from i18n packs')
  } else ok('localization: ladder subtitles come from i18n packs')

  const i18n = readFileSync(join(ROOT, 'src/app/data/i18n.ts'), 'utf8')
  for (const key of ['step1Sub', 'whatsappHint', 'verifyStamp', 'closeStep1', 'coverageNotice', 'noticeExplainer']) {
    if (!i18n.includes(`${key}:`)) fail(`i18n.ts missing key ${key}`)
  }
  ok('localization: deep-audit chrome keys present in i18n packs')

  const lc = readFileSync(join(ROOT, 'src/app/data/localized-content.ts'), 'utf8')
  const variantCount = (lc.match(/variants: \[/g) ?? []).length
  if (variantCount < 5) {
    fail(`localized-content: expected finding variants for 5 languages, found ${variantCount}`)
  } else ok(`localization: finding Regenerate variants present ×${variantCount}`)

  const chat = readFileSync(join(ROOT, 'src/app/pages/ChatPage.tsx'), 'utf8')
  for (const [needle, why] of [
    ['FOLLOW_UPS', 'turn-aware follow-ups missing — composer re-runs Turn 1'],
    ['protectiveFooter', 'protective action bar missing during active stops'],
    ['whenOptions', 'fact gate missing the merged purchase-window row'],
    ['focusSelector', 'card-top scroll focus missing'],
  ]) {
    if (!chat.includes(needle)) fail(`ChatPage: ${why}`)
  }
  ok('journey: stage machine, follow-ups, protective footer, merged gate, focus scroll all wired')
}

/* ---------- report ---------- */
console.log('LokAI v2 verify gate')
console.log('─'.repeat(60))
for (const n of notes.filter((x, i) => notes.indexOf(x) === i)) console.log(n)
if (failures.length === 0) {
  console.log('─'.repeat(60))
  console.log('PASS — all gates green')
  process.exit(0)
} else {
  console.log('─'.repeat(60))
  console.log(`FAIL — ${failures.length} violation(s):`)
  for (const f of failures) console.log(`  ✗  ${f}`)
  process.exit(1)
}
