import { useSeo } from '@/hooks/useSeo'
import { useSearchParams } from 'react-router'
import AuthLayout from '@/components/auth/AuthLayout'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export default function AturUlangKataSandi() {
  useSeo({ title: 'Atur ulang kata sandi', noindex: true })
  const [params] = useSearchParams()
  return <AuthLayout motionKey="atur-ulang"><ResetPasswordForm token={params.get('token')} /></AuthLayout>
}
