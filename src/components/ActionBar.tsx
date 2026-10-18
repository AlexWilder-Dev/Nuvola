import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSite } from '../lib/site'
import { SiteSwitch } from './SiteSwitch'

/** Phone: once the shopfront has scrolled away, the two actions for the chosen site stay one tap away. */
export function ActionBar() {
  const { site } = useSite()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const top = document.getElementById('top')
    if (!top) return
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0 })
    io.observe(top)
    return () => io.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          className="actionbar"
          aria-label={`Book or order at ${site.name}`}
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        >
          <SiteSwitch compact />
          <div className="actionbar-btns">
            {site.actions.map((a, i) => (
              <a key={a.href} href={a.href} target="_blank" rel="noreferrer" className={`btn btn--sm ${i ? 'btn--line' : ''}`}>
                {a.short}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
