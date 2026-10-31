import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* Self-hosted fonts (Fontsource) — no CDN, no network at runtime.
   Latin registers + per-script companions loaded as weights; only the
   active language renders with its companion stack (see tokens.css). */
/* Inter with the optical-size axis: text cut at body sizes, display cut
   (tighter, SF-like) at headline sizes — font-optical-sizing: auto */
import '@fontsource-variable/inter/opsz.css'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/source-serif-4'
import '@fontsource/noto-sans-devanagari/400.css'
import '@fontsource/noto-sans-devanagari/500.css'
import '@fontsource/noto-sans-devanagari/600.css'
import '@fontsource/noto-serif-devanagari/500.css'
import '@fontsource/noto-serif-devanagari/600.css'
import '@fontsource/noto-sans-tamil/400.css'
import '@fontsource/noto-sans-tamil/500.css'
import '@fontsource/noto-sans-tamil/600.css'
import '@fontsource/noto-serif-tamil/500.css'
import '@fontsource/noto-nastaliq-urdu/400.css'
import '@fontsource/noto-nastaliq-urdu/600.css'
import '@fontsource/noto-naskh-arabic/400.css'
import '@fontsource/noto-naskh-arabic/500.css'
import '@fontsource/noto-naskh-arabic/600.css'
import '@fontsource/noto-sans-bengali/400.css'
import '@fontsource/noto-sans-bengali/500.css'
import '@fontsource/noto-sans-bengali/600.css'
import '@fontsource/noto-sans-gujarati/400.css'
import '@fontsource/noto-sans-gujarati/500.css'
import '@fontsource/noto-sans-gujarati/600.css'
import '@fontsource/noto-sans-gurmukhi/400.css'
import '@fontsource/noto-sans-gurmukhi/500.css'
import '@fontsource/noto-sans-gurmukhi/600.css'
import '@fontsource/noto-sans-kannada/400.css'
import '@fontsource/noto-sans-kannada/500.css'
import '@fontsource/noto-sans-kannada/600.css'
import '@fontsource/noto-sans-malayalam/400.css'
import '@fontsource/noto-sans-malayalam/500.css'
import '@fontsource/noto-sans-malayalam/600.css'
import '@fontsource/noto-sans-oriya/400.css'
import '@fontsource/noto-sans-oriya/500.css'
import '@fontsource/noto-sans-oriya/600.css'
import '@fontsource/noto-sans-telugu/400.css'
import '@fontsource/noto-sans-telugu/500.css'
import '@fontsource/noto-sans-telugu/600.css'
import '@fontsource/noto-sans-meetei-mayek/400.css'
import '@fontsource/noto-sans-meetei-mayek/500.css'
import '@fontsource/noto-sans-ol-chiki/400.css'
import '@fontsource/noto-sans-ol-chiki/500.css'

import './styles/index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
