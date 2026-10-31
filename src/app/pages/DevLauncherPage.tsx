import { useApp } from '../lib/app-context'
import { navigate } from '../lib/router'
import { SCENARIO_SEEDS } from '../data/refund-journey'
import { AppShell } from '../components/ui/shell'
import { Button } from '../components/ui/Button'
import { Card, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

/** Deterministic scenario launcher — every flow and state, one link each. */
export default function DevLauncherPage() {
  const { tr } = useApp()
  return (
    <AppShell>
      <div className="scroll-calm flex-1 overflow-y-auto px-4 py-5">
        <header className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-fg-primary" lang="en">Scenario launcher</h1>
          <p className="text-2xs text-fg-tertiary" lang="en">
            Every flow runs from local mock data. Deterministic — no model, no network.
          </p>
        </header>

        <div className="mt-5 flex flex-col gap-2.5">
          {SCENARIO_SEEDS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => navigate(`/?s=${s.id}`)}
              className="bg-card rounded-[22px] p-4 text-start transition-colors hover:bg-component-hover"
            >
              <div className="flex items-center gap-2">
                <CardTitle>{s.label}</CardTitle>
                {s.simulateError && <Badge tone="danger" variant="outline">error</Badge>}
                {s.forceOffline && <Badge tone="neutral" variant="outline">offline</Badge>}
              </div>
              <p className="mt-1 text-2xs text-fg-tertiary" lang="en">{s.description}</p>
            </button>
          ))}

          <Card className="mt-3">
            <CardTitle>Flows</CardTitle>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => navigate('/voice')}>
                Simulated voice capture
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate('/notice')}>
                Notice interpreter
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate('/replay')}>
                Replay mode
              </Button>
            </div>
          </Card>

          <Card className="mt-3">
            <CardTitle>Foundations</CardTitle>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => navigate('/specimen')}>
                {tr('back')} · Type specimen
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate('/gallery')}>
                {tr('back')} · Component gallery
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/')}>
                {tr('newChat')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
