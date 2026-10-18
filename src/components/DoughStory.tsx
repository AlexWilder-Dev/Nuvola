import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import cloudUrl from '../assets/cloud.svg'
import pizzaRound from '../assets/photos/pizza-round.jpg'
import { story } from '../data/nuvola'

// Scroll progress at which each step takes over.
const AT = [0, 0.24, 0.5, 0.74, 1]

type Circle = [cx: number, cy: number, r: number]

// Dough on the bench → proved → spread into the three lobes of the Nuvola cloud (as painted in Brixton).
const LOBES: { left: Circle[]; mid: Circle[]; right: Circle[] } = {
  left: [
    [249, 259, 43],
    [216, 238, 63],
    [216, 238, 63],
    [115, 205, 100],
  ],
  mid: [
    [300, 234, 67],
    [300, 194, 108],
    [300, 194, 108],
    [300, 150, 138],
  ],
  right: [
    [351, 259, 43],
    [384, 238, 63],
    [384, 238, 63],
    [495, 220, 85],
  ],
}
// Flat underside: [x, y, width, height]
const BASE = [
  [219, 248, 162, 54],
  [172, 218, 256, 84],
  [172, 218, 256, 84],
  [40, 200, 530, 105],
]
const KEYS = [0.02, 0.3, 0.5, 0.68]

const BUBBLES: Circle[] = [
  [262, 262, 7],
  [290, 238, 11],
  [322, 258, 6],
  [345, 236, 9],
  [300, 276, 5],
  [250, 240, 5],
  [276, 210, 6],
  [318, 206, 8],
  [356, 268, 5],
  [233, 274, 4],
  [300, 190, 5],
  [338, 284, 4],
]
const FLOUR: [number, number][] = [
  [180, 296],
  [205, 312],
  [400, 300],
  [420, 314],
  [150, 314],
  [452, 306],
  [228, 318],
  [372, 318],
  [330, 312],
  [264, 316],
]

function useCircle(p: MotionValue<number>, frames: Circle[]) {
  const cx = useTransform(
    p,
    KEYS,
    frames.map((f) => f[0]),
  )
  const cy = useTransform(
    p,
    KEYS,
    frames.map((f) => f[1]),
  )
  const r = useTransform(
    p,
    KEYS,
    frames.map((f) => f[2]),
  )
  return { cx, cy, r }
}

function Art({ p }: { p: MotionValue<number> }) {
  const left = useCircle(p, LOBES.left)
  const mid = useCircle(p, LOBES.mid)
  const right = useCircle(p, LOBES.right)
  const bx = useTransform(
    p,
    KEYS,
    BASE.map((b) => b[0]),
  )
  const by = useTransform(
    p,
    KEYS,
    BASE.map((b) => b[1]),
  )
  const bw = useTransform(
    p,
    KEYS,
    BASE.map((b) => b[2]),
  )
  const bh = useTransform(
    p,
    KEYS,
    BASE.map((b) => b[3]),
  )
  const fill = useTransform(p, [0, 0.45, 0.6, 0.7], ['#e6d3a8', '#efe1c0', '#e8e2d2', '#5b7fa3'])
  const gooOpacity = useTransform(p, [0.66, 0.72], [1, 0])
  const cloudOpacity = useTransform(p, [0.64, 0.72], [0, 1])
  const bubbles = useTransform(p, [0.24, 0.36, 0.5, 0.58], [0, 1, 1, 0])
  const flour = useTransform(p, [0, 0.16, 0.26], [1, 1, 0])
  const bench = useTransform(p, [0, 0.48, 0.58], [1, 1, 0])
  const lift = useTransform(p, [0.74, 0.86], ['62%', '0%'])
  const pizzaOpacity = useTransform(p, [0.76, 0.86], [0, 1])
  const pizzaY = useTransform(p, [0.76, 0.9], [60, 0])
  const pizzaScale = useTransform(p, [0.76, 0.92], [0.86, 1])
  const roughRef = useRef<SVGFEDisplacementMapElement>(null)
  // The biga starts shaggy and stiff; it smooths out as it proves.
  useMotionValueEvent(p, 'change', (v) => {
    roughRef.current?.setAttribute('scale', String(Math.max(0, 16 * (1 - v / 0.3))))
  })

  return (
    <div className="dough-art" aria-hidden="true">
      <motion.div className="dough-pizza" style={{ opacity: pizzaOpacity, y: pizzaY, scale: pizzaScale }}>
        <img src={pizzaRound} alt="" loading="lazy" />
      </motion.div>
      <motion.div className="dough-cloud" style={{ y: lift }}>
        <svg viewBox="0 0 600 330" width="100%">
          <defs>
            <filter id="goo" x="-20%" y="-30%" width="140%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
              <feDisplacementMap
                ref={roughRef}
                in="SourceGraphic"
                in2="noise"
                scale="16"
                xChannelSelector="R"
                yChannelSelector="G"
                result="rough"
              />
              <feGaussianBlur in="rough" stdDeviation="9" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
            </filter>
          </defs>
          <motion.line
            x1="110"
            x2="490"
            y1="304"
            y2="304"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ opacity: bench }}
            className="dough-bench"
          />
          <motion.g style={{ opacity: flour }} className="dough-flour">
            {FLOUR.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3 : 2} />
            ))}
          </motion.g>
          <motion.g filter="url(#goo)" style={{ opacity: gooOpacity }}>
            <motion.circle cx={left.cx} cy={left.cy} r={left.r} style={{ fill }} />
            <motion.circle cx={mid.cx} cy={mid.cy} r={mid.r} style={{ fill }} />
            <motion.circle cx={right.cx} cy={right.cy} r={right.r} style={{ fill }} />
            <motion.rect x={bx} y={by} width={bw} height={bh} rx="22" style={{ fill }} />
          </motion.g>
          <motion.g style={{ opacity: bubbles }} className="dough-bubbles" transform="translate(300 302) scale(1.35) translate(-300 -302)">
            {BUBBLES.map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} />
            ))}
          </motion.g>
          <motion.image href={cloudUrl} x="0" y="2" width="600" height="313" style={{ opacity: cloudOpacity }} />
        </svg>
      </motion.div>
    </div>
  )
}

function StaticStory() {
  return (
    <div className="dough-static">
      <div className="dough-art dough-art--static" aria-hidden="true">
        <div className="dough-pizza">
          <img src={pizzaRound} alt="" loading="lazy" />
        </div>
        <div className="dough-cloud">
          <img src={cloudUrl} alt="" />
        </div>
      </div>
      <ol className="dough-steps">
        {story.steps.map((s) => (
          <li key={s.label}>
            <p className="caps">{s.label}</p>
            <h3 className="display">{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function DoughStory() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [step, setStep] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = AT.findIndex((a, n) => v >= a && v < (AT[n + 1] ?? 2))
    if (i !== step) setStep(Math.min(i, story.steps.length - 1))
  })

  return (
    <section className="dough" id="dough" aria-labelledby="dough-title">
      <div className="wrap dough-intro">
        <p className="caps">{story.kicker}</p>
        <h2 id="dough-title" className="display">
          {story.title}
        </h2>
        <p className="lede">{story.intro}</p>
      </div>

      {reduce ? (
        <div className="wrap">
          <StaticStory />
        </div>
      ) : (
        <div ref={ref} className="dough-track">
          <div className="dough-stage">
            <div className="wrap dough-stage-inner">
              <ol className="dough-progress" aria-hidden="true">
                {story.steps.map((s, i) => (
                  <li key={s.label} className={i === step ? 'is-on' : i < step ? 'is-done' : ''}>
                    {s.short}
                  </li>
                ))}
              </ol>
              <div className="dough-copy" aria-hidden="true">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28 }}
                  >
                    <p className="caps">{story.steps[step].label}</p>
                    <h3 className="display">{story.steps[step].title}</h3>
                    <p>{story.steps[step].body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <Art p={scrollYProgress} />
            </div>
          </div>
          {/* Every step in the document for screen readers and search, whatever the scroll position. */}
          <ol className="sr-only">
            {story.steps.map((s) => (
              <li key={s.label}>
                {s.title}. {s.body}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}
