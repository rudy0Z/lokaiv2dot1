/**
 * Deterministic staged-progress engine (design law ported from v1's
 * responseEngine): responses arrive as narrated beats, durations scale with
 * the consequence class, everything is skippable (cancel resolves straight
 * to the answer — v1's skip law), and prefers-reduced-motion collapses
 * delays. No model, no network — ever.
 */
export type BeatClass = 'stop' | 'caution' | 'explain' | 'disclose' | 'progress'

/** retuned 2026-10-26 + speed pass 2026-10-29 (visual report P2): the first
 *  sentence of substance must beat the choreography — turn-to-substance < 2.5s */
export const STAGE_MS_BY_CLASS: Record<BeatClass, number> = {
  stop: 180,
  caution: 260,
  explain: 320,
  disclose: 300,
  progress: 240,
}

export interface Beat {
  label: string
}

export const BEATS: Record<BeatClass, Beat[]> = {
  stop: [{ label: 'stageReading' }, { label: 'stageChecking' }],
  caution: [{ label: 'stageReading' }, { label: 'stageChecking' }, { label: 'stageWriting' }],
  explain: [{ label: 'stageReading' }, { label: 'stageChecking' }, { label: 'stageWriting' }],
  disclose: [{ label: 'stageReading' }, { label: 'stageChecking' }, { label: 'stageWriting' }],
  progress: [{ label: 'stageReading' }, { label: 'stageWriting' }],
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export interface RunOptions {
  /** jump straight to completion (skip affordance) */
  skip?: boolean
  /** polled between beats — when it flips true, resolve immediately */
  isCancelled?: () => boolean
  /** simulate a transport failure after the first beat (error-state demo) */
  failAfterFirstBeat?: boolean
}

export class SimulatedFailure extends Error {
  constructor() {
    super('simulated transport failure')
  }
}

/**
 * Walks the beat list for a class, invoking onStage with each beat label.
 * Resolves when done (or when cancelled — skipping straight to the answer),
 * rejects with SimulatedFailure when the failure injection is on.
 */
export function runBeats(
  beatClass: BeatClass,
  onStage: (label: string, index: number) => void,
  opts: RunOptions = {},
): Promise<void> {
  const beats = BEATS[beatClass]
  const base = STAGE_MS_BY_CLASS[beatClass]
  const ms = opts.skip || prefersReducedMotion() ? 1 : base

  return new Promise<void>((resolve, reject) => {
    let i = 0
    const step = () => {
      if (opts.isCancelled?.()) {
        resolve()
        return
      }
      if (i >= beats.length) {
        resolve()
        return
      }
      onStage(beats[i]!.label, i)
      if (opts.failAfterFirstBeat && i === 0) {
        window.setTimeout(() => reject(new SimulatedFailure()), ms * 2)
        return
      }
      i += 1
      window.setTimeout(step, ms)
    }
    step()
  })
}
