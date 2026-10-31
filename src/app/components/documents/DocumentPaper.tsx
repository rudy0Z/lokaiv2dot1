import { useApp } from '../../lib/app-context'
import type { PaperDoc } from '../../data/documents'
import { Badge } from '../ui/Badge'
import { IconDoc } from '../ui/icons'

/**
 * A paper-styled document card (the `.paper` stationery treatment) rendering
 * a prepared document from data/documents.ts. Always tagged "Simulated" —
 * the viewer must never mistake a researched mock for a real record.
 */
export function DocumentPaper({ doc }: { doc: PaperDoc }) {
  const { tr } = useApp()
  return (
    <div className="overflow-hidden rounded-[18px] border border-line-default shadow-default">
      <div className="flex items-center gap-2 border-b border-line-default bg-card px-3.5 py-2.5">
        <IconDoc className="size-4 shrink-0 text-fg-tertiary" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-2xs font-semibold text-fg-primary" lang="en">
            {doc.fileName}
          </p>
          <p className="truncate text-2xs text-fg-tertiary" lang="en">
            {doc.title} · {doc.org}
          </p>
        </div>
        <Badge tone="warning" variant="subtle">{tr('simulatedTag')}</Badge>
      </div>

      <div className="paper px-4 py-4" lang={doc.lang ?? 'en'}>
        <p className="text-center font-serif text-sm font-semibold">{doc.title}</p>
        <p className="mt-0.5 text-center text-2xs opacity-80">{doc.org}</p>

        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
          {doc.rows.map((r) => (
            <div key={r.label} className="min-w-0">
              <dt className="text-2xs opacity-70">{r.label}</dt>
              <dd className="truncate font-mono text-2xs" lang="en">
                {r.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-3 flex flex-col gap-1.5">
          {doc.lines.map((line, i) => (
            <p
              key={i}
              className={
                line.kind === 'head'
                  ? 'font-serif text-sm font-semibold leading-snug'
                  : line.kind === 'total'
                    ? 'font-mono text-xs font-semibold'
                    : line.kind === 'note'
                      ? 'text-2xs opacity-70'
                      : 'text-xs leading-[1.85]'
              }
            >
              {line.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
