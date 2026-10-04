import { useCallback, useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { errorMessage } from '@/lib/errors'
import type { NotificationPrefs } from '@/data/notifications'

export const notificationItems: { id: keyof NotificationPrefs; label: string; hint: string }[] = [
  { id: 'assigned', label: 'Tugas ditugaskan ke saya', hint: 'Notifikasi saat seseorang menugaskan tugas kepada Anda.' },
  { id: 'review', label: 'Permintaan review', hint: 'Notifikasi saat tugas dipindahkan ke Review.' },
  { id: 'comment', label: 'Komentar baru', hint: 'Notifikasi saat ada komentar di tugas Anda.' },
  { id: 'boardAdded', label: 'Ditambahkan ke proyek', hint: 'Notifikasi saat Anda ditambahkan ke sebuah proyek.' },
]

/** Preferensi notifikasi dari server; perubahan optimistis dengan rollback bila gagal. */
export function useNotificationPrefs() {
  const [prefs, setPrefs] = useState<NotificationPrefs | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  const load = useCallback(() => {
    setFailed(false)
    api<NotificationPrefs>('/notifications/preferences').then(setPrefs).catch(() => setFailed(true))
  }, [])
  useEffect(load, [load])

  const set = async (id: keyof NotificationPrefs, on: boolean) => {
    setError(null)
    setPrefs((p) => p && { ...p, [id]: on })
    try { setPrefs(await api<NotificationPrefs>('/notifications/preferences', 'PATCH', { [id]: on })) } catch (err) {
      setPrefs((p) => p && { ...p, [id]: !on })
      setError(errorMessage(err))
    }
  }
  return { prefs, error, failed, retry: load, set }
}
