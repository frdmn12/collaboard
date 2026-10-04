import AuthLayout from '@/components/auth/AuthLayout'
import AuthForm, { type Mode } from '@/components/auth/AuthForm'

export default function Auth({ mode }: { mode: Mode }) {
  return (
    <AuthLayout motionKey={mode}>
      <AuthForm mode={mode} />
    </AuthLayout>
  )
}
