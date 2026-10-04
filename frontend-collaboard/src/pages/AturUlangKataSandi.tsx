import { useSearchParams } from 'react-router'
import AuthLayout from '@/components/auth/AuthLayout'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export default function AturUlangKataSandi() {
  const [params] = useSearchParams()
  return <AuthLayout motionKey="atur-ulang"><ResetPasswordForm token={params.get('token')} /></AuthLayout>
}
