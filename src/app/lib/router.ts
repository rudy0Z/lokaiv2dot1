import { useEffect, useState } from 'react'

export interface HashRoute {
  path: string
  params: URLSearchParams
}

function parse(): HashRoute {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [path, query = ''] = raw.split('?')
  return { path: path === '' ? '/' : path, params: new URLSearchParams(query) }
}

export function navigate(to: string) {
  // keep the leading '/': '#/matter/h1' must parse back as '/matter/h1'
  window.location.hash = to.startsWith('/') ? to : `/${to}`
}

export function useHashRoute(): HashRoute {
  const [route, setRoute] = useState<HashRoute>(parse)
  useEffect(() => {
    const onHash = () => setRoute(parse())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

/** fired by every New chat action — ChatPage resets its thread on it */
export const NEW_CHAT_EVENT = 'lokai:new-chat'
