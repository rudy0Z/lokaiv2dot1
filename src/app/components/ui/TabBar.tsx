import { cn } from '../../lib/cn'
import { IconFolder, IconHome, IconSparkle } from './icons'

export type TabId = 'home' | 'cases' | 'sandbox'

interface TabBarProps {
  active: TabId
}

/**
 * MODERNIZED UI COMPONENT — DEPRECATED IN MAIN FLOW
 * 
 * Kept for reference. Modern conversational apps (ChatGPT, Claude, Gemini)
 * use a clean full-height canvas with hamburger menu rather than fixed bottom tabs.
 */
export function TabBar({ active }: TabBarProps) {
  const tabs = [
    { id: 'home', label: 'Chat', icon: IconHome },
    { id: 'cases', label: 'Cases', icon: IconFolder },
    { id: 'sandbox', label: 'Sandbox', icon: IconSparkle },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-line-default bg-shell/95 backdrop-blur-sm sm:hidden">
      <nav className="flex items-center justify-around" aria-label="Bottom navigation">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              className={cn(
                'flex flex-col items-center gap-1 py-2.5 px-4 transition-colors',
                active === tab.id ? 'text-brand-fg' : 'text-fg-secondary hover:text-fg-primary',
              )}
              aria-current={active === tab.id ? 'page' : undefined}
            >
              <Icon className="size-5" />
              <span className="text-2xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </nav>
      {/* iOS home indicator area */}
      <div className="h-[env(safe-area-inset-bottom)] bg-shell" />
    </div>
  )
}

// Note: This component is intentionally not used in AppShell
// See shell.tsx for modernized navigation pattern