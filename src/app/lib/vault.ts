/**
 * 'Delete everything' honesty (audit fix): once the profile's delete-all runs,
 * this flag makes History and Saved render their real empty states instead of
 * the seeded demo rows — the destructive action actually does what it says.
 *
 * matterLog (deep-audit closure, §6c): the user's own procedural log for the
 * live journey (step sent / matter closed / saved items). Device-local only,
 * plain dates and user actions — never an invented legal outcome.
 */
const KEY = 'lokai.vaultCleared'
const MATTER_KEY = 'lokai.matterLog'

export function isVaultCleared(): boolean {
  try {
    return window.localStorage.getItem(KEY) != null
  } catch {
    return false
  }
}

export function markVaultCleared(): void {
  try {
    window.localStorage.setItem(KEY, String(Date.now()))
  } catch {
    /* private mode etc. */
  }
}

/** reviewer tool: bring the seeded sample cases back after a delete-all */
export function restoreVault(): void {
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    /* private mode etc. */
  }
}

export interface MatterLog {
  step1SentAt?: string
  closedAt?: string
  saved?: { title: string; savedAt: string }[]
}

export function getMatterLog(): MatterLog {
  try {
    const raw = window.localStorage.getItem(MATTER_KEY)
    return raw ? (JSON.parse(raw) as MatterLog) : {}
  } catch {
    return {}
  }
}

export function updateMatterLog(patch: Partial<MatterLog>): MatterLog {
  const next = { ...getMatterLog(), ...patch }
  try {
    window.localStorage.setItem(MATTER_KEY, JSON.stringify(next))
  } catch {
    /* private mode etc. */
  }
  return next
}
