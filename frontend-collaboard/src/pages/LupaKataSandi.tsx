import { useSeo } from '@/hooks/useSeo'
import AuthLayout from '@/components/auth/AuthLayout'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export default function LupaKataSandi() {
  useSeo({ title: 'Lupa kata sandi', noindex: true })
  return <AuthLayout motionKey="lupa"><ForgotPasswordForm /></AuthLayout>
}
