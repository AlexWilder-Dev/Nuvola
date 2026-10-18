import { motion } from 'framer-motion'
import { useSite } from '../lib/site'
import { Arrow } from './Icons'

/** Delivery and collection for the chosen site: bundles and the vegan pizzas, as listed on the delivery app. */
export function Delivery() {
  const { site } = useSite()
  const d = site.delivery
  if (!d) return null

  return (
    <section className="section delivery" id="delivery" aria-labelledby="delivery-title">
      <div className="wrap">
        <div className="section-head">
          <p className="caps">{d.kicker}</p>
          <h2 id="delivery-title" className="display">
            {d.title}
          </h2>
          <p className="muted">{d.intro}</p>
        </div>

        {d.bundles.length > 0 && (
          <ul className="bundles">
            {d.bundles.map((b, i) => (
              <motion.li
                key={b.name}
                className="bundle"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <h3>{b.name}</h3>
                <p className="bundle-price">£{b.price}</p>
                {b.contents && <p>{b.contents}</p>}
              </motion.li>
            ))}
          </ul>
        )}

        {d.vegan && d.vegan.items.length > 0 && (
          <div className="vegan">
            <h3 className="display">{d.vegan.title}</h3>
            {d.vegan.note && <p className="muted">{d.vegan.note}</p>}
            <ul className="menu-list">
              {d.vegan.items.map((item) => (
                <li key={item.name} className="menu-item">
                  <div className="menu-text">
                    <p className="menu-name">{item.name}</p>
                    {item.description && <p className="menu-desc">{item.description}</p>}
                  </div>
                  <p className="menu-price">{item.price}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="btn-row delivery-actions">
          {d.links.map((l, i) => (
            <a key={l.href} className={`btn ${i ? 'btn--line' : ''}`} href={l.href} target="_blank" rel="noreferrer">
              <span>
                {l.label}
                <small>{l.via}</small>
              </span>
              <Arrow />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
