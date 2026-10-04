import { createContext, useContext, useState, type ReactNode } from 'react'

export type Profile = { name: string; email: string; role: string }
const KEY = 'collaboard-profile'
const fallback: Profile = { name: 'Dewi Lestari', email: 'dewi@studionusa.id', role: 'Desainer' }

const load = (): Profile => {
  try { const raw = localStorage.getItem(KEY); if (raw) return { ...fallback, ...JSON.parse(raw) } } catch { /* abaikan */ }
  return fallback
}

const Ctx = createContext<{ profile: Profile; save: (p: Profile) => void } | null>(null)

/** Profil pengguna yang sedang masuk; disimpan di localStorage (ganti dengan API). */
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(load)
  const save = (p: Profile) => {
    setProfile(p)
    try { localStorage.setItem(KEY, JSON.stringify(p)) } catch { /* abaikan */ }
  }
  return <Ctx.Provider value={{ profile, save }}>{children}</Ctx.Provider>
}

export function useProfile() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useProfile harus dipakai di dalam ProfileProvider')
  return v
}
