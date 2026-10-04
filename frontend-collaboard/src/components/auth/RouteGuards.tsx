import { Navigate, Outlet } from 'react-router'
import { LoaderCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const Loading = () => (
  <div className="grid min-h-dvh place-items-center" role="status" aria-label="Memuat">
    <LoaderCircle size={28} strokeWidth={1.75} className="animate-spin text-muted-foreground" aria-hidden="true" />
  </div>
)

/** Hanya untuk pengguna yang sudah masuk; selain itu diarahkan ke /masuk. */
export function ProtectedRoute() {
  const { status } = useAuth()
  if (status === 'loading') return <Loading />
  return status === 'authenticated' ? <Outlet /> : <Navigate to="/masuk" replace />
}

/** Laman tamu (masuk/daftar); pengguna yang sudah masuk diarahkan ke dasbor. */
export function GuestRoute() {
  const { status } = useAuth()
  if (status === 'loading') return <Loading />
  return status === 'authenticated' ? <Navigate to="/dashboard" replace /> : <Outlet />
}
