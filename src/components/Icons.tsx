type P = { className?: string }

export const Arrow = ({ className = 'arrow' }: P) => (
  <svg className={className} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 9h11M9.5 4.5 14 9l-4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Pin = ({ className = 'icon' }: P) => (
  <svg className={className} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 16s5-4.6 5-8.6A5 5 0 0 0 4 7.4C4 11.4 9 16 9 16Z" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="9" cy="7.4" r="1.8" fill="currentColor" />
  </svg>
)

export const Star = ({ className = 'icon' }: P) => (
  <svg className={className} viewBox="0 0 18 18" aria-hidden="true">
    <path d="m9 1.8 2.2 4.6 5 .7-3.6 3.5.9 5L9 13.2l-4.5 2.4.9-5L1.8 7.1l5-.7L9 1.8Z" fill="currentColor" />
  </svg>
)

export const Clock = ({ className = 'icon' }: P) => (
  <svg className={className} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="6.6" stroke="currentColor" strokeWidth="1.7" />
    <path d="M9 5.4V9l2.4 1.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)
