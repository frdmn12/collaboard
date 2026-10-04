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

/** Waktu relatif singkat untuk komentar: "baru saja", "5 menit lalu", "kemarin", atau tanggal. */
export function formatRelative(iso: string) {
  const d = new Date(iso)
  const sec = Math.round((Date.now() - d.getTime()) / 1000)
  if (sec < 45) return 'baru saja'
  if (sec < 3600) return `${Math.round(sec / 60)} menit lalu`
  if (sec < 86_400) return `${Math.round(sec / 3600)} jam lalu`
  const days = Math.round((startOfDay(new Date()).getTime() - startOfDay(d).getTime()) / 86_400_000)
  if (days === 1) return 'kemarin'
  if (days < 7) return `${days} hari lalu`
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: d.getFullYear() === new Date().getFullYear() ? undefined : 'numeric' }).format(d)
}
