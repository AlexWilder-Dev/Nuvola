import { motion } from 'framer-motion'
import { useSite } from '../lib/site'
import { sites } from '../data/nuvola'
import { photos } from '../data/photos'
import { Arrow } from './Icons'

const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

/** Brixton's weekly special and the Unlimited night; at Croydon, how the stall works. */
export function ThisWeek() {
  const { siteId, site, setSite } = useSite()
  const brixton = sites.brixton
  const special = brixton.special
  const unlimited = brixton.unlimited

  return (
    <section className="section week" aria-labelledby="week-title">
      <div className="wrap">
        <div className="section-head">
          <p className="caps">{siteId === 'brixton' ? 'Brixton Village' : 'Boxpark Croydon'}</p>
          <h2 id="week-title" className="display">
            {siteId === 'brixton' ? 'This week' : site.howItWorks?.title}
          </h2>
        </div>

        <div className="week-grid">
          {siteId === 'croydon' && site.howItWorks && (
            <motion.article className="panel panel--special" {...rise}>
              <p className="caps">{site.howItWorks.kicker}</p>
              <ol className="steps">
                {site.howItWorks.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <a className="btn" href={site.actions[0].href} target="_blank" rel="noreferrer">
                <span>
                  {site.actions[0].label}
                  <small>{site.actions[0].via}</small>
                </span>
                <Arrow />
              </a>
            </motion.article>
          )}

          {siteId === 'brixton' && special && (
            <motion.article className="panel panel--special" {...rise}>
              {special.photo && (
                <figure className="panel-photo">
                  <img src={photos[special.photo]} alt={special.photoAlt ?? ''} loading="lazy" />
                </figure>
              )}
              <span className="tag">This week’s special</span>
              <h3 className="display">{special.name}</h3>
              {special.description && <p>{special.description}</p>}
              {special.price && <p className="special-price">£{special.price}</p>}
              <p className="panel-note">{special.note}</p>
              {special.link && (
                <a className="btn" href={special.link.href} target="_blank" rel="noreferrer">
                  <span>{special.link.label}</span>
                  <Arrow />
                </a>
              )}
            </motion.article>
          )}

          {unlimited && (
            <motion.article className="panel panel--unlimited" {...rise} transition={{ duration: 0.5, delay: 0.08 }}>
              <p className="caps">{siteId === 'brixton' ? unlimited.kicker : 'At Brixton Village'}</p>
              <p className="unlimited-word" aria-hidden="true">
                Unlimited
              </p>
              <h3 className="sr-only">{unlimited.title}</h3>
              <p>{unlimited.description}</p>
              <ul className="includes" aria-label="Included">
                {unlimited.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              {unlimited.details.map((d) => (
                <p key={d} className="panel-note">
                  {d}
                </p>
              ))}
              <a className="btn" href={unlimited.href} target="_blank" rel="noreferrer">
                <span>
                  {unlimited.cta}
                  <small>OpenTable</small>
                </span>
                <Arrow />
              </a>
              {siteId !== 'brixton' && (
                <button type="button" className="room-switch" onClick={() => setSite('brixton')}>
                  Switch to Brixton
                </button>
              )}
            </motion.article>
          )}
        </div>
      </div>
    </section>
  )
}
