import { motion } from 'framer-motion'
import { useSite } from '../lib/site'
import { sites, siteOrder } from '../data/nuvola'
import { photos } from '../data/photos'
import { hoursRows } from '../lib/hours'
import { Arrow, Clock, Pin, Star } from './Icons'

/** Both places, side by side: they are different rooms that work differently. */
export function Rooms() {
  const { siteId, setSite } = useSite()
  return (
    <section className="section rooms" id="visit" aria-labelledby="rooms-title">
      <div className="wrap">
        <div className="section-head">
          <p className="caps">Two rooms</p>
          <h2 id="rooms-title" className="display">
            Come by
          </h2>
        </div>
        <div className="rooms-grid">
          {siteOrder.map((id) => {
            const s = sites[id]
            const rows = s.hours ? hoursRows(s.hours) : []
            return (
              <motion.article
                key={id}
                className={`room room--${id} ${id === siteId ? 'is-current' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
              >
                <figure className="room-photo">
                  <img src={photos[s.room.photo]} alt={s.room.photoAlt} loading="lazy" style={{ objectPosition: s.room.photoFocus }} />
                </figure>
                <div className="room-body">
                  <p className="caps">{s.room.kicker}</p>
                  <h3 className="display">{s.name}</h3>
                  <p>{s.room.body}</p>
                  {s.room.features.length > 0 && (
                    <ul className="room-features">
                      {s.room.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  )}

                  <a className="room-line" href={s.mapsUrl} target="_blank" rel="noreferrer">
                    <Pin />
                    <span>
                      {s.addressFull}
                      <span className="room-link">Open in Maps</span>
                    </span>
                  </a>
                  {s.room.directions.map((d) => (
                    <p key={d} className="room-dir muted">
                      {d}
                    </p>
                  ))}

                  {rows.length > 0 && (
                    <div className="room-hours">
                      <p className="room-hours-head">
                        <Clock /> Opening hours
                      </p>
                      <table>
                        <tbody>
                          {rows.map((r) => (
                            <tr key={r.days} className={r.isToday ? 'is-today' : ''}>
                              <th scope="row">{r.days}</th>
                              <td>{r.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {s.quotes && s.quotes.length > 0 && (
                    <div className="room-says">
                      {s.rating && (
                        <a className="room-rating" href={s.rating.url} target="_blank" rel="noreferrer">
                          <Star /> {s.rating.score} on Google from {s.rating.count} reviews
                        </a>
                      )}
                      {s.quotes.map((q) => (
                        <figure key={q.author}>
                          <blockquote>“{q.text}”</blockquote>
                          <figcaption>
                            {q.author}, {q.where}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}

                  <div className="room-actions">
                    {s.actions.map((a, i) => (
                      <a key={a.href} className={`btn btn--sm ${i ? 'btn--line' : ''}`} href={a.href} target="_blank" rel="noreferrer">
                        <span>{a.label}</span>
                        <Arrow />
                      </a>
                    ))}
                    {id !== siteId && (
                      <button type="button" className="room-switch" onClick={() => setSite(id)}>
                        Make {s.short} my Nuvola
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
