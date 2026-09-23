/* Turns a start date into a self-maintaining "how long I have been doing this"
   figure: months until the first year is up, then years.

   Dates are split by hand rather than passed to `new Date(string)`, because
   that parses "2026-08-23" as UTC midnight and then compares it against local
   time — which flips the answer by a day either side of a month boundary
   depending on the visitor's timezone. */
export function experienceStat(startISO: string, now = new Date()) {
  const [year, month, day] = startISO.split('-').map(Number)

  let months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month)
  // Not a full month until the day-of-month has come round again.
  if (now.getDate() < day) months -= 1
  months = Math.max(0, months)

  if (months < 12) {
    return { value: months, suffix: '', label: months === 1 ? 'month in' : 'months in' }
  }

  const years = Math.floor(months / 12)
  return { value: years, suffix: '', label: years === 1 ? 'year in' : 'years in' }
}
