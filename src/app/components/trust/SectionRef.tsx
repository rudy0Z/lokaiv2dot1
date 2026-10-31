import { useApp } from '../../lib/app-context'
import { Badge } from '../ui/Badge'

/**
 * Renders a legal citation's section reference, converting the raw
 * `[VERIFY — …]` bracket syntax into a structured, localized chip so a lay
 * citizen never reads bare scaffolding as broken software. The bracket
 * detail survives as the chip's title/tooltip. Deep-audit fix (P3-15).
 */
export function SectionRef({ sectionRef, className }: { sectionRef: string; className?: string }) {
  const { tr } = useApp()
  const marker = /\[VERIFY[^\]]*\]/.exec(sectionRef)
  const clean = sectionRef.replace(/\s*\[VERIFY[^\]]*\]/g, '').trim()

  return (
    <span className={'inline-flex flex-wrap items-center gap-1.5 ' + (className ?? '')}>
      {clean && (
        /* optical scaling (master prompt Part 6): the mono citation sits 1px
           smaller than the Indic text around it, on a warm sunken chip, so
           Latin monospace never overpowers Devanagari/Tamil/Nastaliq heights */
        <span
          className="rounded-md bg-sunken px-1.5 py-0.5 font-mono text-docket tracking-[0.02em] text-fg-secondary"
          lang="en"
        >
          {clean}
        </span>
      )}
      {marker && (
        <Badge tone="warning" variant="outline" title={marker[0]}>
          {tr('verifyStamp')}
        </Badge>
      )}
    </span>
  )
}
