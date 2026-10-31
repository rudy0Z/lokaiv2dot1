import { cn } from '../../lib/cn'
import { IconMic } from '../ui/icons'

export type OrbState = 'idle' | 'listening' | 'thinking'

export interface VoiceOrbProps {
  state?: OrbState
  size?: 'md' | 'lg'
  className?: string
}

/**
 * THE signature element (DESIGN.md): a hairline guide ring, a raised disc
 * and a solid ink core. Idle breathes, listening ripples, thinking draws an
 * arc. Styles live in base.css (.voice-orb*) — reduced-motion stills them.
 */
export function VoiceOrb({ state = 'idle', size = 'lg', className }: VoiceOrbProps) {
  return (
    <div
      className={cn('voice-orb', `voice-orb--${size}`, `voice-orb--${state}`, className)}
      role="img"
      aria-label={state === 'listening' ? 'Listening' : state === 'thinking' ? 'Thinking' : 'LokAI'}
    >
      <span className="orb-guide" aria-hidden="true" />
      {state === 'listening' && (
        <>
          <span className="orb-ring orb-ring--a" aria-hidden="true" />
          <span className="orb-ring orb-ring--b" aria-hidden="true" />
          <span className="orb-ring orb-ring--c" aria-hidden="true" />
        </>
      )}
      <span className="orb-disc" aria-hidden="true" />
      {state === 'thinking' && <span className="orb-activity" aria-hidden="true" />}
      <span className="orb-core" aria-hidden="true">
        <IconMic className={size === 'lg' ? 'size-7' : 'size-6'} />
      </span>
    </div>
  )
}
