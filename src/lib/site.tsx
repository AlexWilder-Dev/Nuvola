import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { sites, type SiteId } from '../data/nuvola'

const KEY = 'nuvola-site'

const isSite = (v: unknown): v is SiteId => v === 'brixton' || v === 'croydon'

function remembered(): SiteId | null {
  try {
    const v = localStorage.getItem(KEY)
    return isSite(v) ? v : null
  } catch {
    return null
  }
}

function remember(id: SiteId) {
  try {
    localStorage.setItem(KEY, id)
  } catch {
    /* private mode: the switch still works for this visit */
  }
}

type Ctx = { siteId: SiteId; site: (typeof sites)[SiteId]; setSite: (id: SiteId) => void }
const SiteContext = createContext<Ctx | null>(null)

/**
 * Brixton or Croydon. A link to /#/brixton or /#/croydon (an ad, a shared link) decides first,
 * then the visitor's last choice, then Brixton.
 */
export function SiteProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const segment = pathname.replace(/^\//, '').split('/')[0]
  const [fallback, setFallback] = useState<SiteId>(() => remembered() ?? 'brixton')
  const siteId: SiteId = isSite(segment) ? segment : fallback

  useEffect(() => {
    if (segment && !isSite(segment)) navigate('/', { replace: true })
    else if (isSite(segment)) remember(segment)
  }, [segment, navigate])

  useEffect(() => {
    document.documentElement.dataset.site = siteId
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', siteId === 'croydon' ? '#000000' : '#f3f0e8')
  }, [siteId])

  const setSite = useCallback(
    (id: SiteId) => {
      setFallback(id)
      remember(id)
      navigate(`/${id}`, { replace: true })
    },
    [navigate],
  )

  return <SiteContext.Provider value={{ siteId, site: sites[siteId], setSite }}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite outside SiteProvider')
  return ctx
}
