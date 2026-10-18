import type { Hours } from '../data/nuvola'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

/** Current weekday and minutes since midnight in London, whatever the visitor's own clock says. */
function londonNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = DAYS.indexOf(get('weekday') as (typeof DAYS)[number])
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** 17:00 → 5pm, 11:30 → 11.30am (British style) */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return m ? `${h12}.${String(m).padStart(2, '0')}${suffix}` : `${h12}${suffix}`
}

export type OpenStatus = { open: boolean; label: string }

export function openStatus(hours: Hours, date = new Date()): OpenStatus {
  const { day, minutes } = londonNow(date)
  const today = hours[DAYS[day]]
  if (today && minutes >= toMinutes(today[0]) && minutes < toMinutes(today[1])) {
    return { open: true, label: `Open now · until ${formatTime(today[1])}` }
  }
  if (today && minutes < toMinutes(today[0])) {
    return { open: false, label: `Closed · opens ${formatTime(today[0])} today` }
  }
  for (let i = 1; i <= 7; i++) {
    const name = DAYS[(day + i) % 7]
    const next = hours[name]
    if (next) {
      const when = i === 1 ? 'tomorrow' : name
      return { open: false, label: `Closed · opens ${when} ${formatTime(next[0])}` }
    }
  }
  return { open: false, label: 'Closed' }
}

/** Rows for an hours table, Monday first, with consecutive identical days grouped. */
export function hoursRows(hours: Hours) {
  const order = [1, 2, 3, 4, 5, 6, 0].map((i) => DAYS[i])
  const rows: { days: string; time: string; isToday: boolean }[] = []
  const today = DAYS[londonNow().day]
  let start = 0
  for (let i = 1; i <= order.length; i++) {
    const a = hours[order[start]]
    const b = i < order.length ? hours[order[i]] : undefined
    const same = i < order.length && (a?.join() ?? 'closed') === (b?.join() ?? 'closed')
    if (!same) {
      const span = order.slice(start, i)
      const days = span.length > 1 ? `${span[0].slice(0, 3)} – ${span[span.length - 1].slice(0, 3)}` : span[0].slice(0, 3)
      rows.push({
        days: span.length === 7 ? 'Every day' : days,
        time: a ? `${formatTime(a[0])} – ${formatTime(a[1])}` : 'Closed',
        isToday: span.includes(today),
      })
      start = i
    }
  }
  return rows
}
