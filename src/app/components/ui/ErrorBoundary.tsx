import { Component, type ReactNode } from 'react'
import { Button } from './Button'
import { LogoMark } from './LogoMark'

interface State {
  error: Error | null
}

/** Route-level error fallback (ported from v1's RouteErrorScreen) — a calm,
 *  branded screen instead of a white crash. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-shell px-8 text-center">
          <LogoMark size="md" />
          <h1 className="text-xl font-semibold text-fg-primary">
            Something went wrong on this screen
          </h1>
          <p className="max-w-[300px] text-sm leading-relaxed text-fg-secondary">
            Nothing was lost and nothing left your device. Reload to continue.
          </p>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
