import { useApp } from '../lib/app-context'
import { isVaultCleared } from '../lib/vault'
import { AppShell } from '../components/ui/shell'
import { ChatHistoryList } from '../components/cases/ChatHistoryList'

/** All chats — the same date-grouped history the drawer shows, full screen. */
export default function HistoryPage() {
  const { tr } = useApp()
  return (
    <AppShell showTabs={false} title={tr('allChats')}>
      <div className="scroll-calm flex-1 overflow-y-auto px-2 pb-8 pt-2">
        {isVaultCleared() ? (
          <p className="px-4 py-8 text-center text-sm text-fg-tertiary">{tr('emptyHistory')}</p>
        ) : (
          <ChatHistoryList />
        )}
      </div>
    </AppShell>
  )
}
