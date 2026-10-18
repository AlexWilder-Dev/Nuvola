import { motion } from 'framer-motion'
import { story } from '../data/nuvola'
import { photos } from '../data/photos'

export function People() {
  return (
    <section className="section people" aria-labelledby="people-title">
      <div className="wrap">
        <div className="section-head">
          <p className="caps">Who makes it</p>
          <h2 id="people-title" className="display">
            {story.peopleTitle}
          </h2>
        </div>
        <div className="people-grid">
          {story.people.map((p, i) => (
            <motion.article
              key={p.name}
              className={`person ${p.photo ? 'has-photo' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {p.photo && (
                <figure className="person-photo">
                  <img src={photos[p.photo]} alt={p.photoAlt ?? ''} loading="lazy" />
                </figure>
              )}
              <div className="person-text">
                <p className="caps">{p.role}</p>
                <h3 className="display">{p.name}</h3>
                <p>{p.body}</p>
                {p.source && (
                  <p className="person-source muted">
                    <a href={p.source.url} target="_blank" rel="noreferrer">
                      {p.source.label}
                    </a>
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
