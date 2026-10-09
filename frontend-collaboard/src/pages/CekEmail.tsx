import { useSeo } from '@/hooks/useSeo'
import { Navigate, useLocation } from 'react-router'
import AuthLayout from '@/components/auth/AuthLayout'
import CheckEmailNotice from '@/components/auth/CheckEmailNotice'

export default function CekEmail() {
  useSeo({ title: 'Cek email', noindex: true })
  const email = (useLocation().state as { email?: string } | null)?.email
  if (!email) return <Navigate to="/daftar" replace />
  return <AuthLayout motionKey="cek-email"><CheckEmailNotice email={email} /></AuthLayout>
}
