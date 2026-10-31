import { AppProvider } from './app/lib/app-context'
import { useHashRoute } from './app/lib/router'
import { Toaster } from 'sonner'
import { ErrorBoundary } from './app/components/ui/ErrorBoundary'
import ChatPage from './app/pages/ChatPage'
import SpecimenPage from './app/pages/SpecimenPage'
import GalleryPage from './app/pages/GalleryPage'
import DevLauncherPage from './app/pages/DevLauncherPage'
import VoiceCapturePage from './app/pages/VoiceCapturePage'
import NoticePage from './app/pages/NoticePage'
import HistoryPage from './app/pages/HistoryPage'
import SettingsPage from './app/pages/SettingsPage'
import CaseWorkspacePage from './app/pages/CaseWorkspacePage'
import ReplayPage from './app/pages/ReplayPage'

function Routes() {
  const { path } = useHashRoute()
  /* /matter/:id was a second, diverging view of the same case — it now IS the case */
  if (path.startsWith('/matter/')) {
    return <CaseWorkspacePage id={path.split('/')[2] ?? ''} />
  }
  if (path.startsWith('/case/')) {
    const segs = path.split('/')
    return <CaseWorkspacePage id={segs[2] ?? ''} dayParam={segs[3] === 'd' ? segs[4] : undefined} />
  }
  if (path.startsWith('/replay')) {
    return <ReplayPage id={path.split('/')[2]} />
  }
  switch (path) {
    case '/specimen':
      return <SpecimenPage />
    case '/gallery':
      return <GalleryPage />
    case '/dev':
      return <DevLauncherPage />
    case '/voice':
      return <VoiceCapturePage />
    case '/notice':
      return <NoticePage />
    case '/history':
      return <HistoryPage />
    /* Saved merged into each case (documents + items saved from chat) */
    case '/saved':
      return <HistoryPage />
    case '/settings':
    case '/profile':
      return <SettingsPage />
    default:
      return <ChatPage />
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Routes />
        <Toaster position="top-center" duration={2600} />
      </AppProvider>
    </ErrorBoundary>
  )
}
