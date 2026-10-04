import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { api, EXPIRED_EVENT, refreshAccessToken, setAccessToken } from '@/lib/api'

export type AuthUser = { id: string; name: string; email: string; emailVerified: boolean; createdAt: string }
type Status = 'loading' | 'authenticated' | 'anonymous'
type Ctx = {
  status: Status
  user: AuthUser | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<{ verificationEmailSent: boolean }>
  logout: () => Promise<void>
  resendVerification: (email: string) => Promise<void>
}

// Petunjuk non-rahasia bahwa pernah ada sesi, agar pengunjung baru tidak memicu refresh yang pasti gagal.
const HINT = 'collaboard-session'
const hasHint = () => { try { return localStorage.getItem(HINT) === '1' } catch { return false } }
const setHint = (on: boolean) => { try { if (on) localStorage.setItem(HINT, '1'); else localStorage.removeItem(HINT) } catch { /* abaikan */ } }

const AuthContext = createContext<Ctx | null>(null)

/** Sesi pengguna: access token di memori, dipulihkan lewat cookie refresh saat halaman dibuka. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>('loading')
  const [user, setUser] = useState<AuthUser | null>(null)

  const clear = () => { setAccessToken(null); setHint(false); setUser(null); setStatus('anonymous') }

  useEffect(() => {
    let active = true
    if (!hasHint()) setStatus('anonymous')
    else refreshAccessToken()
      .then((token) => (token ? api<AuthUser>('/users/me') : null))
      .then((u) => { if (active) { setUser(u); setStatus(u ? 'authenticated' : 'anonymous'); if (!u) setHint(false) } })
      .catch(() => { if (active) clear() })
    const onExpired = () => clear()
    window.addEventListener(EXPIRED_EVENT, onExpired)
    return () => { active = false; window.removeEventListener(EXPIRED_EVENT, onExpired) }
  }, [])

  const value: Ctx = {
    status,
    user,
    login: async (email, password) => {
      const r = await api<{ accessToken: string; user: AuthUser }>('/auth/login', 'POST', { email, password })
      setAccessToken(r.accessToken)
      setHint(true)
      setUser(r.user)
      setStatus('authenticated')
    },
    register: (name, email, password) => api('/auth/register', 'POST', { name, email, password }),
    logout: async () => {
      try { await api('/auth/logout', 'POST') } finally { clear() }
    },
    resendVerification: async (email) => { await api('/auth/resend-verification', 'POST', { email }) },
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const v = useContext(AuthContext)
  if (!v) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return v
}
