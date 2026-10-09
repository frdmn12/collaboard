import { useSeo } from '@/hooks/useSeo'
import AuthLayout from '@/components/auth/AuthLayout'
import AuthForm, { type Mode } from '@/components/auth/AuthForm'

const seo = {
  login: { title: 'Masuk', path: '/masuk', description: 'Masuk ke Collaboard untuk membuka papan kerja timmu.' },
  register: { title: 'Daftar', path: '/daftar', description: 'Buat akun Collaboard dan mulai papan kerja pertama untuk timmu.' },
}

export default function Auth({ mode }: { mode: Mode }) {
  useSeo(seo[mode])
  return (
    <AuthLayout motionKey={mode}>
      <AuthForm mode={mode} />
    </AuthLayout>
  )
}
