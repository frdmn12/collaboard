import { useState } from 'react'

const KEY = 'collaboard-notifications'
export const notificationItems = [
  { id: 'assigned', label: 'Tugas ditugaskan ke saya', hint: 'Email saat seseorang menugaskan tugas kepada Anda.' },
  { id: 'review', label: 'Permintaan review', hint: 'Pemberitahuan saat ada yang meminta Anda meninjau.' },
  { id: 'comment', label: 'Komentar baru', hint: 'Komentar di tugas yang Anda buat atau ikuti.' },
  { id: 'digest', label: 'Ringkasan mingguan', hint: 'Rangkuman progres tim setiap Senin pagi.' },
] as const
type Prefs = Record<(typeof notificationItems)[number]['id'], boolean>
const defaults: Prefs = { assigned: true, review: true, comment: false, digest: true }

export function useNotificationPrefs() {
  const [prefs, setPrefs] = useState<Prefs>(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) return { ...defaults, ...JSON.parse(raw) } } catch { /* abaikan */ }
    return defaults
  })
  const set = (id: keyof Prefs, on: boolean) => setPrefs((p) => {
    const next = { ...p, [id]: on }
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* abaikan */ }
    return next
  })
  return [prefs, set] as const
}
