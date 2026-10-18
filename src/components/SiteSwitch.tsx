import { motion } from 'framer-motion'
import { useSite } from '../lib/site'
import { sites, siteOrder } from '../data/nuvola'

export function SiteSwitch({ compact = false }: { compact?: boolean }) {
  const { siteId, setSite } = useSite()
  return (
    <div className={`switch ${compact ? 'switch--compact' : ''}`} role="radiogroup" aria-label="Choose your Nuvola">
      {siteOrder.map((id) => {
        const s = sites[id]
        const on = id === siteId
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={on}
            className={`switch-opt ${on ? 'is-on' : ''}`}
            onClick={() => setSite(id)}
          >
            {on && <motion.span layoutId={compact ? 'switch-pill-compact' : 'switch-pill'} className="switch-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <span className="switch-name">{compact ? s.short : s.name}</span>
            {!compact && <span className="switch-hint">{s.switchHint}</span>}
          </button>
        )
      })}
    </div>
  )
}
