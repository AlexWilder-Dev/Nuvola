import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type FormEvent } from 'react'
import { useSite } from '../lib/site'
import { brand, sites, siteOrder } from '../data/nuvola'

/** Demo form: nothing is sent; it shows the confirmation the real one would. */
export function WriteToUs() {
  const { siteId } = useSite()
  const [sent, setSent] = useState<{ name: string; site: string } | null>(null)
  const [formSite, setFormSite] = useState(siteId)
  useEffect(() => setFormSite(siteId), [siteId])

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setSent({ name: String(data.get('name') || '').split(' ')[0], site: String(data.get('site')) })
  }

  return (
    <section className="section write" id="write" aria-labelledby="write-title">
      <div className="wrap write-grid">
        <div className="section-head">
          <p className="caps">Questions, groups, allergies</p>
          <h2 id="write-title" className="display">
            Write to us
          </h2>
          <p className="muted">
            Or email <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="sent"
              className="write-done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
            >
              <p className="display">Thank you{sent.name ? `, ${sent.name}` : ''}.</p>
              <p>Your message is on its way to the team at {sites[sent.site as keyof typeof sites]?.name ?? 'Nuvola'}.</p>
              <button type="button" className="btn btn--line btn--sm" onClick={() => setSent(null)}>
                Write another
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" className="write-form" onSubmit={submit} initial={false} exit={{ opacity: 0 }}>
              <fieldset className="write-sites">
                <legend className="caps">Which Nuvola?</legend>
                {siteOrder.map((id) => (
                  <label key={id} className="chip">
                    <input type="radio" name="site" value={id} checked={id === formSite} onChange={() => setFormSite(id)} />
                    <span>{sites[id].name}</span>
                  </label>
                ))}
              </fieldset>
              <label className="field">
                <span>Name</span>
                <input name="name" autoComplete="name" required />
              </label>
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea name="message" rows={4} required />
              </label>
              <button className="btn" type="submit">
                Send
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
