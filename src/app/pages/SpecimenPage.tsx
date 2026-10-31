import { useApp } from '../lib/app-context'
import { formatINR, formatDate } from '../lib/format'
import { LANG_ORDER, LANGUAGES } from '../data/languages'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Chip } from '../components/ui/Chip'
import { AppShell } from '../components/ui/shell'
import { navigate } from '../lib/router'

/**
 * Type specimen (A4b) — built BEFORE any other screen, kept forever.
 * Renders every register per script: headings, body, controls, currency,
 * date, mixed-script line, longest realistic string, conjunct stress word.
 */

const SAMPLE: Record<string, { body: string; mixed: string; longest: string; conjunct: string; cta: string }> = {
  en: {
    body: 'You bought a mixer grinder for ₹8,999. It arrived cracked. The seller has refused a refund or a replacement. This is a common situation, and there are free steps you can take.',
    mixed: 'Your order HK-4471 from HomeKart arrived on 12 Oct 2026.',
    longest: 'The District Consumer Disputes Redressal Commission has the power to order replacement or refund',
    conjunct: 'strength',
    cta: 'Message the seller first',
  },
  hi: {
    body: 'आपने 8,999 रुपये में मिक्सर ग्राइंडर खरीदा। वह टूटा हुआ आया। विक्रेता ने रिफंड या बदली से मना कर दिया। यह एक आम स्थिति है, और आप कुछ मुफ़्त कदम उठा सकते हैं।',
    mixed: 'आपका ऑर्डर HK-4471, HomeKart से, 12 Oct 2026 को आया।',
    longest: 'ज़िला उपभोक्ता विवाद निवारण आयोग सामान बदलने या पैसा लौटाने का आदेश दे सकता है',
    conjunct: 'ज्ञानवर्धनकार्यक्रम',
    cta: 'पहले विक्रेता को संदेश भेजें',
  },
  mr: {
    body: 'तुम्ही 8,999 रुपयांत मिक्सर ग्राइंडर विकत घेतला. तो फुटलेला आला. विक्रेत्याने पैसे परत देण्यास किंवा बदलण्यास नकार दिला. ही एक सामान्य स्थिती आहे, आणि काही मोफत पावले तुम्ही उचलू शकता.',
    mixed: 'तुमची ऑर्डर HK-4471, HomeKart कडून, 12 Oct 2026 रोजी आली.',
    longest: 'जिल्हा ग्राहक वाद निवारण आयोग वस्तू बदलण्याचे किंवा पैसे परत देण्याचे आदेश देऊ शकतो',
    conjunct: 'सत्यव्रतनिष्ठा',
    cta: 'आधी विक्रेत्याला संदेश पाठवा',
  },
  ta: {
    body: 'நீங்கள் ₹8,999-க்கு மிக்சர் கிரைண்டர் வாங்கினீர்கள். அது உடைந்த நிலையில் வந்தது. விற்பவர் பணத்தைத் திருப்பித் தரவோ மாற்றித் தரவோ மறுத்துவிட்டார். இது ஒரு பொதுவான நிலை, இலவச படிகள் உள்ளன.',
    mixed: 'உங்கள் ஆர்டர் HK-4471, HomeKart-இலிருந்து, 12 Oct 2026 அன்று வந்தது.',
    longest: 'மாவட்ட நுகர்வோர் தகராறு தீர்வு ஆணையம் பொருளை மாற்றவோ பணத்தைத் திருப்பித் தரவோ உத்தரவிடலாம்',
    conjunct: 'புதுச்சேரி வானவில்',
    cta: 'முதலில் விற்பவருக்கு செய்தி அனுப்புங்கள்',
  },
  ur: {
    body: 'آپ نے 8,999 روپے میں مکسر گرائنڈر خریدا۔ وہ ٹوٹا ہوا آیا۔ دکاندار نے پیسہ واپس کرنے یا تبدیل کرنے سے انکار کر دیا۔ یہ ایک عام صورت حال ہے، اور آپ کچھ مفت قدم اٹھا سکتے ہیں۔',
    mixed: 'آپ کا آرڈر HK-4471، HomeKart سے، 12 Oct 2026 کو آیا۔',
    longest: 'ضلع کنزیومر تنازعہ حل کمیشن چیز بدلنے یا پیسہ واپس کرنے کا حکم دے سکتا ہے',
    conjunct: 'دستاویزات',
    cta: 'پہلے دکاندار کو پیغام بھیجیں',
  },
}

function ScriptBlock({ code }: { code: (typeof LANG_ORDER)[number] }) {
  const cfg = LANGUAGES[code]
  const s = SAMPLE[code]!
  return (
    <section lang={code} dir={cfg.direction} className="flex flex-col gap-4" data-script-block={code}>
      <div className="flex items-center gap-2">
        <h2 className="font-serif text-xl font-semibold text-fg-primary">
          {cfg.native} <span className="font-sans text-2xs font-medium text-fg-tertiary">({cfg.english})</span>
        </h2>
        <Badge tone={cfg.reviewedByNativeSpeaker ? 'positive' : 'warning'} variant="subtle">
          {cfg.reviewedByNativeSpeaker ? 'reviewed' : 'unreviewed draft'}
        </Badge>
        {cfg.direction === 'rtl' && <Badge tone="brand" variant="outline">RTL</Badge>}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-lg font-semibold text-fg-primary">{s.cta}</h3>
        <h4 className="text-base font-semibold text-fg-primary">{s.cta}</h4>
        <h5 className="text-sm font-semibold text-fg-primary">{s.cta}</h5>
        <p className="text-sm text-fg-primary">{s.body}</p>
        <p className="text-2xs text-fg-secondary">{s.longest}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary" size="sm">{s.cta}</Button>
        <Button variant="secondary" size="sm">{s.cta}</Button>
        <Chip>{s.cta}</Chip>
        <span className="font-mono text-sm text-fg-primary">{formatINR(8999)}</span>
        <span className="font-mono text-2xs text-fg-secondary">{formatDate('2026-10-12')}</span>
      </div>

      <p className="text-sm text-fg-primary">{s.mixed}</p>
      <p className="text-sm text-fg-secondary">
        conjunct stress: <span className="font-semibold">{s.conjunct}</span>
      </p>
    </section>
  )
}

export default function SpecimenPage() {
  const { lang } = useApp()
  return (
    <AppShell
      showTabs={false}
      onBack={() => navigate('/dev')}
    >
      <div className="scroll-calm flex-1 overflow-y-auto px-4 py-5">
        <header className="flex flex-col gap-1.5">
          <h1 className="text-lg font-semibold text-fg-primary">Type specimen</h1>
          <p className="text-2xs text-fg-tertiary">
            Every script, every register. Check: no clipped matras or descenders, no faux bold, one baseline in
            mixed-script lines, RTL mirrored. Also test at 200% browser zoom.
          </p>
          <div className="mt-1 flex flex-wrap gap-2">
            {LANG_ORDER.map((c) => (
              <Badge key={c} tone={c === lang ? 'brand' : 'neutral'} variant={c === lang ? 'subtle' : 'outline'}>
                {LANGUAGES[c].native}
              </Badge>
            ))}
          </div>
        </header>

        <div className="mt-6 flex flex-col gap-8">
          {LANG_ORDER.map((c) => (
            <Card key={c} className="py-5">
              <ScriptBlock code={c} />
            </Card>
          ))}
        </div>

        <section className="mt-8 flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-fg-primary">Registers</h2>
          <p className="font-sans text-sm text-fg-primary">Sans (UI): {SAMPLE.en!.body.slice(0, 60)}…</p>
          <p className="font-serif text-sm text-fg-primary">Serif (findings & documents): {SAMPLE.en!.body.slice(0, 60)}…</p>
          <p className="font-mono text-sm text-fg-primary">Mono (citations & amounts): HK-4471 · {formatINR(8999)} · S.35</p>
        </section>
      </div>
    </AppShell>
  )
}
