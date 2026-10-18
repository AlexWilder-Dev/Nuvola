import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSite } from '../lib/site'
import { photos } from '../data/photos'
import type { MenuSection } from '../data/nuvola'

// The looped rule under NUVOLA on the printed Brixton menus.
const Flourish = () => (
  <svg className="menu-flourish" viewBox="0 0 300 26" fill="none" aria-hidden="true">
    <path
      d="M2 15c28 0 40-9 64-6 14 2 18 9 12 11-7 2-9-9 0-11 14-3 36 9 58 8 22-1 34-11 50-9 9 1 11 9 5 11-6 2-9-8 0-11 18-6 36 9 62 8 18 0 28-6 45-6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
)

function Items({ section }: { section: MenuSection }) {
  return (
    <>
      {section.note && <p className="menu-note">{section.note}</p>}
      <ul className={`menu-list ${section.id === 'extras' ? 'menu-list--tight' : ''}`}>
        {section.items.map((item) => (
          <li key={item.name} className={`menu-item ${item.photo ? 'has-photo' : ''}`}>
            {item.photo && <img className="menu-photo" src={photos[item.photo]} alt="" loading="lazy" />}
            <div className="menu-text">
              <p className="menu-name">
                {item.name}
                {item.marks?.map((m) => (
                  <span key={m} className="menu-mark">
                    {m}
                  </span>
                ))}
              </p>
              {item.description && <p className="menu-desc">{item.description}</p>}
            </div>
            <p className="menu-price">{item.price}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export function Menu() {
  const { site, siteId } = useSite()
  const tabs = [...site.menu.sections, ...(site.menu.drinks ?? [])]
  const [tab, setTab] = useState(tabs[0].id)

  // Keep the same tab when both sites have it; otherwise back to pizza.
  useEffect(() => {
    setTab((t) => (tabs.some((s) => s.id === t) ? t : tabs[0].id))
  }, [siteId])

  const current = tabs.find((s) => s.id === tab) ?? tabs[0]

  return (
    <section className="section menu" id="menu" aria-labelledby="menu-title">
      <div className="wrap">
        <div className={`menu-card menu-card--${siteId}`}>
          {siteId === 'croydon' && (
            <span className="menu-block" aria-hidden="true">
              ME
              <br />
              NU
            </span>
          )}
          <header className="menu-head">
            <p className="menu-brand">NUVOLA</p>
            {siteId === 'brixton' ? <Flourish /> : <span className="menu-bar" aria-hidden="true" />}
            <h2 id="menu-title" className="menu-title">
              Menu · {site.name}
            </h2>
            <p className="menu-intro">{site.menuIntro}</p>
          </header>

          <div className="tabs" role="tablist" aria-label="Menu sections">
            {tabs.map((s) => (
              <button
                key={s.id}
                role="tab"
                type="button"
                aria-selected={s.id === current.id}
                aria-controls="menu-panel"
                className={`tab ${s.id === current.id ? 'is-on' : ''}`}
                onClick={() => setTab(s.id)}
              >
                {s.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${siteId}-${current.id}`}
              id="menu-panel"
              role="tabpanel"
              aria-label={current.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <h3 className="menu-section-title">{current.title}</h3>
              <Items section={current} />
            </motion.div>
          </AnimatePresence>

          <p className="menu-source">
            Prices in £, from our{' '}
            {site.menu.sources.map((src, i) => (
              <span key={src.url}>
                {i > 0 && (i === site.menu.sources.length - 1 ? ' and ' : ', ')}
                <a href={src.url} target="_blank" rel="noreferrer">
                  {src.label}
                </a>
              </span>
            ))}
            .{site.menu.note ? ` ${site.menu.note}` : ''}
          </p>
        </div>
      </div>
    </section>
  )
}
