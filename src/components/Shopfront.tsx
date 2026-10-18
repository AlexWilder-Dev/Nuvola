import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Wordmark from './Wordmark'
import { SiteSwitch } from './SiteSwitch'
import { Arrow, Pin } from './Icons'
import { useSite } from '../lib/site'
import { openStatus, type OpenStatus } from '../lib/hours'
import { photos } from '../data/photos'

function useOpenStatus(hours: Parameters<typeof openStatus>[0] | undefined) {
  const [status, setStatus] = useState<OpenStatus | null>(() => (hours ? openStatus(hours) : null))
  useEffect(() => {
    if (!hours) return setStatus(null)
    setStatus(openStatus(hours))
    const t = setInterval(() => setStatus(openStatus(hours)), 60_000)
    return () => clearInterval(t)
  }, [hours])
  return status
}

/** First screen: which Nuvola, open or not, book or order. Drawn as the chosen shopfront. */
export function Shopfront() {
  const { site, siteId } = useSite()
  const status = useOpenStatus(site.hours)

  return (
    <header className="shopfront" id="top">
      <div className="wrap">
        <SiteSwitch />
      </div>

      <div className="fascia">
        <div className="wrap fascia-inner">
          {siteId === 'croydon' && <span className="unit-no unit-no--l">{site.unitLeft}</span>}
          <h1 className="fascia-word">
            <Wordmark />
            <span className="sr-only">Nuvola Pizza, {site.name}</span>
          </h1>
          <p className="fascia-sub caps">{site.fasciaLine}</p>
          {siteId === 'croydon' && <span className="unit-no unit-no--r">{site.unitRight}</span>}
        </div>
      </div>

      <div className="wrap shop-body">
        <div className={`window window--${siteId}`}>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={site.heroPhoto}
              src={photos[site.heroPhoto]}
              alt={site.heroAlt}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ objectPosition: site.heroFocus }}
              fetchPriority="high"
            />
          </AnimatePresence>
          <span className="mullions" aria-hidden="true" />
        </div>

        <div className="shop-info">
          {status ? (
            <p className={`status ${status.open ? 'is-open' : 'is-closed'}`}>
              <span className="dot" aria-hidden="true" />
              {status.label}
            </p>
          ) : null}
          <a className="shop-address" href={site.mapsUrl} target="_blank" rel="noreferrer">
            <Pin />
            <span>
              {site.addressLine}
              <span className="shop-dir">{site.where}</span>
            </span>
          </a>
        </div>

        <div className="btn-row shop-actions">
          {site.actions.map((a, i) => (
            <a key={a.href} className={`btn ${i ? 'btn--line' : ''}`} href={a.href} target="_blank" rel="noreferrer">
              <span>
                {a.label}
                <small>{a.via}</small>
              </span>
              <Arrow />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
