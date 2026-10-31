import { useApp } from '../lib/app-context'
import { navigate } from '../lib/router'
import { buildFinding, DEMO_FACTS } from '../lib/matter-facts'
import { AppShell } from '../components/ui/shell'
import { Badge } from '../components/ui/Badge'
import { Banner } from '../components/ui/Banner'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Checkbox } from '../components/ui/Checkbox'
import { Chip } from '../components/ui/Chip'
import { Disclosure } from '../components/ui/Disclosure'
import { Field, Input, Textarea } from '../components/ui/Field'
import { Skeleton } from '../components/ui/Skeleton'
import { MessageBubble } from '../components/chat/MessageBubble'
import { TypingIndicator } from '../components/chat/TypingIndicator'
import { QuickReplies } from '../components/chat/QuickReplies'
import { Composer } from '../components/chat/Composer'
import { ConfidenceIndicator } from '../components/trust/ConfidenceIndicator'
import { VerificationBadge } from '../components/trust/VerificationBadge'
import { ReasoningPill } from '../components/trust/ReasoningPill'
import { FindingCard } from '../components/cards/FindingCard'
import { ActionLadder } from '../components/cards/ActionLadder'
import { CautionCard } from '../components/cards/CautionCard'
import { StopScreen } from '../components/stop/StopScreen'

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-sm font-semibold text-fg-primary" lang="en">{title}</h2>
        {note && <p className="text-2xs text-fg-tertiary">{note}</p>}
      </div>
      {children}
    </section>
  )
}

export default function GalleryPage() {
  const { tr } = useApp()
  // demo card built from the demo fact record — same builder as the live
  // thread, so the gallery shows the real (variant-carrying) card
  const FINDING_DEMO = buildFinding(DEMO_FACTS, 'en')
  const demo = (
    <span className="text-sm">
      The grinder arrived cracked and the seller refused a refund. <span lang="hi">मिक्सर ग्राइंडर टूटा हुआ आया।</span>
    </span>
  )

  return (
    <AppShell showTabs={false} onBack={() => navigate('/dev')}>
      <div className="scroll-calm flex-1 overflow-y-auto px-4 py-5">
        <header className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-fg-primary" lang="en">Component gallery</h1>
          <p className="text-2xs text-fg-tertiary" lang="en">
            Every component × every state. Switch language and theme in the top bar; check 390px width, light and
            dark, and long Indic strings everywhere.
          </p>
        </header>

        <div className="mt-6 flex flex-col gap-8">
          <Section title="Message bubbles" note="user / assistant / system / streaming">
            <MessageBubble role="user">{demo}</MessageBubble>
            <MessageBubble role="assistant">
              <p className="text-sm leading-relaxed">{tr('greetingSub')}</p>
            </MessageBubble>
            <MessageBubble role="system">{tr('protoTag')}</MessageBubble>
            <TypingIndicator />
          </Section>

          <Section title="Quick replies" note="the ONE clarifying question pattern">
            <QuickReplies
              options={[
                { id: 'a', label: tr('ans30'), onSelect: () => undefined },
                { id: 'b', label: tr('ans1to2'), onSelect: () => undefined },
                { id: 'c', label: tr('ans2plus'), onSelect: () => undefined },
                { id: 'd', label: tr('ansNotSure'), onSelect: () => undefined },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <Chip selected>{tr('ans30')}</Chip>
              <Chip>{tr('ans1to2')}</Chip>
            </div>
          </Section>

          <Section title="Confidence indicator" note="three plain-language levels, never a percentage">
            <ConfidenceIndicator level="clear" />
            <ConfidenceIndicator level="likely" />
            <ConfidenceIndicator level="unsure" />
          </Section>

          <Section title="Verification badge" note="two states; prototype content until the owner verifies">
            <div className="flex flex-wrap gap-2">
              <VerificationBadge verified />
              <VerificationBadge verified={false} />
            </div>
          </Section>

          <Section title="Reasoning pill" note="collapsible; always tagged as simulated (A7)">
            <ReasoningPill steps={FINDING_DEMO.reasoningSteps} />
          </Section>

          <Section title="Finding card" note="generative card shell: serif heading, three zones, trust chrome, edit/regenerate/discard">
            <FindingCard data={FINDING_DEMO} />
            <FindingCard data={{ ...FINDING_DEMO, title: 'Stale variant — facts changed below' }} stale />
          </Section>

          <Section title="Action ladder" note="lowest risk first; free mode for the caution branch">
            <ActionLadder mode="full" onOpenNotice={() => undefined} />
            <ActionLadder mode="free" />
          </Section>

          <Section title="Caution card" note="not an automatic stop">
            <CautionCard />
          </Section>

          <Section title="Composer" note="normal / loading / offline / with mock attachments">
            <Composer onSend={() => undefined} attachments={[]} onAttach={() => undefined} onRemoveAttachment={() => undefined} />
            <Composer onSend={() => undefined} disabled attachments={[]} onAttach={() => undefined} onRemoveAttachment={() => undefined} />
            <Composer onSend={() => undefined} offline attachments={['bill-homekart.pdf']} onAttach={() => undefined} onRemoveAttachment={() => undefined} />
          </Section>

          <Section title="Banners" note="info / positive / warning / danger / offline">
            <Banner tone="info">{tr('dlsaPlaceholderNote')}</Banner>
            <Banner tone="positive">{tr('copied')}</Banner>
            <Banner tone="warning">{tr('cautionTitle')}</Banner>
            <Banner tone="danger">{tr('errorBody')}</Banner>
            <Banner tone="offline">{tr('offlineBanner')}</Banner>
          </Section>

          <Section title="Buttons & badges">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand" variant="subtle">brand</Badge>
              <Badge tone="positive" variant="subtle">positive</Badge>
              <Badge tone="warning" variant="subtle">warning</Badge>
              <Badge tone="danger" variant="subtle">danger</Badge>
              <Badge tone="inverted" variant="subtle">inverted</Badge>
              <Badge tone="neutral" variant="outline">outline</Badge>
            </div>
          </Section>

          <Section title="Inputs & disclosure">
            <Field label={tr('dlsaDistrict')} hint={tr('dlsaPlaceholderNote')}>
              {(id) => <Input id={id} placeholder="Pune" />}
            </Field>
            <Textarea placeholder={tr('composerPlaceholder')} />
            <Checkbox label={tr('noticeConsent')} />
            <Disclosure title={tr('step1Title')} subtitle="₹0 · 10 minutes">
              <p className="text-sm text-fg-secondary">{tr('greetingSub')}</p>
            </Disclosure>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-20 w-full" />
          </Section>

          <Section title="Stop screen preview" note="both treatments; the real one lives in the chat flow">
            <div className="max-h-[420px] overflow-hidden rounded-2xl border border-line-default">
              <StopScreen decision={null} pending={false} onBack={() => undefined} onReRoute={() => undefined} />
            </div>
          </Section>

          <Card paper className="mt-2" lang="en">
            <p className="text-sm">Paper register preview — generated documents and receipts only.</p>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
