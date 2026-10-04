import { Navigate, useLocation } from 'react-router'
import AuthLayout from '@/components/auth/AuthLayout'
import CheckEmailNotice from '@/components/auth/CheckEmailNotice'

export default function CekEmail() {
  const email = (useLocation().state as { email?: string } | null)?.email
  if (!email) return <Navigate to="/daftar" replace />
  return <AuthLayout motionKey="cek-email"><CheckEmailNotice email={email} /></AuthLayout>
}
