import type { SVGProps } from 'react'

/**
 * Bespoke stroke-icon set (24px grid, 1.75 stroke, round joins).
 * The project's ONLY icon tier — no icon libraries in v2.
 */
function makeIcon(paths: ReactNode_, name: string) {
  const C = (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-icon={name}
      {...props}
    >
      {paths}
    </svg>
  )
  C.displayName = name
  return C
}

// paths are static children; JSX typed loosely below via ReactNode alias
type ReactNode_ = SVGProps<SVGSVGElement>['children']

export const IconChevronDown = makeIcon(<path d="M6 9l6 6 6-6" />, 'chevron-down')
export const IconChevronRight = makeIcon(<path d="M9 6l6 6-6 6" />, 'chevron-right')
export const IconCheck = makeIcon(<path d="M5 13l4 4L19 7" />, 'check')
export const IconInfo = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8h.01M12 11v5" />
  </>,
  'info',
)
export const IconAlert = makeIcon(
  <>
    <path d="M12 3l9.5 17H2.5L12 3z" />
    <path d="M12 10v4M12 17h.01" />
  </>,
  'alert',
)
export const IconX = makeIcon(<path d="M6 6l12 12M18 6L6 18" />, 'x')
export const IconCopy = makeIcon(
  <>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </>,
  'copy',
)
export const IconPencil = makeIcon(<path d="M4 20l4-1L20 7l-3-3L5 16l-1 4z" />, 'pencil')
export const IconRefresh = makeIcon(
  <>
    <path d="M20 12a8 8 0 1 1-2.34-5.66" />
    <path d="M21 3v6h-6" />
  </>,
  'refresh',
)
export const IconTrash = makeIcon(
  <>
    <path d="M4 7h16M9 7V5h6v2" />
    <path d="M6 7l1 13h10l1-13" />
  </>,
  'trash',
)
export const IconPlus = makeIcon(<path d="M12 5v14M5 12h14" />, 'plus')
export const IconSend = makeIcon(<path d="M12 19V5M6 11l6-6 6 6" />, 'send')
export const IconPaperclip = makeIcon(
  <path d="M21 12.5l-8.5 8.5a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8" />,
  'paperclip',
)
export const IconPhone = makeIcon(
  <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  'phone',
)
export const IconShield = makeIcon(
  <>
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </>,
  'shield',
)
export const IconArrowLeft = makeIcon(<path d="M19 12H5M11 6l-6 6 6 6" />, 'arrow-left')
export const IconSun = makeIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </>,
  'sun',
)
export const IconMoon = makeIcon(<path d="M20 13A8 8 0 1 1 11 4a6.5 6.5 0 0 0 9 9z" />, 'moon')
export const IconGlobe = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
  </>,
  'globe',
)
export const IconDoc = makeIcon(
  <>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5" />
  </>,
  'doc',
)
export const IconWifiOff = makeIcon(
  <>
    <path d="M2 2l20 20" />
    <path d="M8.5 16.5a5 5 0 0 1 7 0" />
    <path d="M5 12.5a10 10 0 0 1 3-2M16.5 11a10 10 0 0 1 2.5 1.5" />
    <path d="M12 20h.01" />
  </>,
  'wifi-off',
)
export const IconHome = makeIcon(
  <path d="M4 11l8-7 8 7v8a2 2 0 0 1-2 2h-4v-6h-4v6H6a2 2 0 0 1-2-2v-8z" />,
  'home',
)
export const IconClock = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
  'clock',
)
export const IconBookmark = makeIcon(<path d="M7 4h10v17l-5-4-5 4V4z" />, 'bookmark')
export const IconUser = makeIcon(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M5 21a7 7 0 0 1 14 0" />
  </>,
  'user',
)
export const IconMic = makeIcon(
  <>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <path d="M12 18v3" />
  </>,
  'mic',
)
export const IconKeyboard = makeIcon(
  <>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10" />
  </>,
  'keyboard',
)
export const IconCamera = makeIcon(
  <>
    <path d="M4 8h3l2-3h6l2 3h3v11H4V8z" />
    <circle cx="12" cy="13" r="3.5" />
  </>,
  'camera',
)
export const IconStop = makeIcon(<rect x="7" y="7" width="10" height="10" rx="1.5" />, 'stop')
/* Optical alignment (craft.gustavofior.com/optical-alignment):
   Right-facing triangle has center-of-mass at 1/3 from base; nudged to optical center. */
export const IconPlay = makeIcon(<path d="M9 5.5v13l11-6.5z" />, 'play')
export const IconFolder = makeIcon(
  <path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-10.5z" />,
  'folder',
)
export const IconPanelLeft = makeIcon(
  <>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
    <path d="M9.5 4.5v15" />
  </>,
  'panel-left',
)
export const IconSparkle = makeIcon(
  <path d="M12 4l1.7 5.3L19 11l-5.3 1.7L12 18l-1.7-5.3L5 11l5.3-1.7L12 4z" />,
  'sparkle',
)
export const IconExternal = makeIcon(
  <>
    <path d="M14 4h6v6" />
    <path d="M20 4L11 13" />
    <path d="M19 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
  </>,
  'external',
)
export const IconScales = makeIcon(
  <>
    <path d="M12 4v15" />
    <path d="M8 19.5h8" />
    <path d="M4 7.5h16" />
    <path d="M4 7.5L1.7 12.7a2.4 2.4 0 0 0 4.6 0L4 7.5z" />
    <path d="M20 7.5l2.3 5.2a2.4 2.4 0 0 1-4.6 0L20 7.5z" />
  </>,
  'scales',
)
export const IconVolume = makeIcon(
  <>
    <path d="M4 9v6h4l5 4V5L8 9H4z" />
    <path d="M16.5 8.5a5 5 0 0 1 0 7" />
    <path d="M19 6a8.5 8.5 0 0 1 0 12" />
  </>,
  'volume',
)
export const IconBag = makeIcon(
  <>
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
  </>,
  'bag',
)
export const IconWallet = makeIcon(
  <>
    <path d="M4 7a2 2 0 0 1 2-2h11v4" />
    <path d="M4 7v10a2 2 0 0 0 2 2h13V9H6a2 2 0 0 1-2-2z" />
    <path d="M16 14h.01" />
  </>,
  'wallet',
)
export const IconBriefcase = makeIcon(
  <>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </>,
  'briefcase',
)
export const IconCompose = makeIcon(
  <>
    <path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    <path d="M17.5 3.5l3 3L12 15l-4 1 1-4 8.5-8.5z" />
  </>,
  'compose',
)
export const IconSettings = makeIcon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </>,
  'settings',
)
