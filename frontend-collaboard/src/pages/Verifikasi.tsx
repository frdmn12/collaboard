import { useSearchParams } from 'react-router'
import AuthLayout from '@/components/auth/AuthLayout'
import VerifyEmailStatus from '@/components/auth/VerifyEmailStatus'

export default function Verifikasi() {
  const [params] = useSearchParams()
  return <AuthLayout motionKey="verifikasi"><VerifyEmailStatus token={params.get('token')} /></AuthLayout>
}
