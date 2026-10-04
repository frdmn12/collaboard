export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
export const addDays = (n: number, from = new Date()) => { const d = startOfDay(from); d.setDate(d.getDate() + n); return d }
export const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

/** Tenggat dalam bahasa sehari-hari: Hari ini, Besok, Kemarin, atau nama hari/tanggal. */
export function formatDue(d: Date) {
  const diff = Math.round((startOfDay(d).getTime() - startOfDay(new Date()).getTime()) / 86_400_000)
  if (diff === 0) return 'Hari ini'
  if (diff === 1) return 'Besok'
  if (diff === -1) return 'Kemarin'
  const opts: Intl.DateTimeFormatOptions = Math.abs(diff) < 7 ? { weekday: 'long' } : { day: 'numeric', month: 'short' }
  return new Intl.DateTimeFormat('id-ID', opts).format(d)
}
