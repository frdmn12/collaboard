import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { MailWarning } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormField from '@/components/common/FormField'
import { useAuth } from '@/hooks/useAuth'
import { ApiError } from '@/lib/api'
import { errorCode, errorMessage } from '@/lib/errors'
import PasswordInput from './PasswordInput'

export type Mode = 'login' | 'register'
type Errors = Partial<Record<'name' | 'email' | 'password' | 'form', string>>

const copy = {
  login: { title: 'Selamat datang kembali.', sub: 'Masuk untuk melanjutkan ke papan tim Anda.', cta: 'Masuk', alt: ['Belum punya akun?', 'Daftar', '/daftar'] },
  register: { title: 'Mulai dalam semenit.', sub: 'Gratis untuk tim sampai 10 orang. Tanpa kartu kredit.', cta: 'Buat akun', alt: ['Sudah punya akun?', 'Masuk', '/masuk'] },
} as const

const validate = (mode: Mode, v: Record<string, string>): Errors => {
  const e: Errors = {}
  if (mode === 'register' && !v.name.trim()) e.name = 'Isi nama Anda.'
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Masukkan alamat email yang valid, mis. nama@tim.id.'
  if (v.password.length < 8) e.password = 'Kata sandi minimal 8 karakter.'
  return e
}

export default function AuthForm({ mode }: { mode: Mode }) {
  const c = copy[mode]
  const navigate = useNavigate()
  const location = useLocation()
  const { login, register, resendVerification } = useAuth()
  const [errors, setErrors] = useState<Errors>({})
  const [busy, setBusy] = useState(false)
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null)
  const [resent, setResent] = useState(false)
  const a11y = (k: 'name' | 'email' | 'password') => ({ id: k, name: k, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined })
  const state = location.state as { verified?: boolean; passwordReset?: boolean } | null

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const form = ev.currentTarget
    const v = Object.fromEntries(new FormData(form)) as Record<string, string>
    v.email = v.email.trim().toLowerCase()
    const found = validate(mode, v)
    setErrors(found); setUnverifiedEmail(null); setResent(false)
    const first = Object.keys(found)[0]
    if (first) return form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus()

    setBusy(true)
    try {
      if (mode === 'register') {
        await register(v.name.trim(), v.email, v.password)
        navigate('/cek-email', { state: { email: v.email } })
      } else {
        await login(v.email, v.password)
        navigate('/dashboard')
      }
    } catch (err) {
      const code = errorCode(err)
      if (code === 'EMAIL_NOT_VERIFIED') setUnverifiedEmail(v.email)
      else if (code === 'EMAIL_ALREADY_REGISTERED') setErrors({ email: errorMessage(err) })
      else if (err instanceof ApiError && err.status === 400 && Array.isArray(err.details)) setErrors({ form: 'Periksa kembali data Anda: ' + err.details.join(', ') })
      else setErrors({ form: errorMessage(err) })
    } finally {
      setBusy(false)
    }
  }

  const resend = async () => {
    if (!unverifiedEmail) return
    try { await resendVerification(unverifiedEmail); setResent(true) } catch (err) { setErrors({ form: errorMessage(err) }) }
  }

  return (
    <form data-m="form" onSubmit={submit} noValidate className="m-auto flex w-full max-w-[420px] flex-col gap-4 py-12">
      <h1 className="text-[clamp(36px,5vw,48px)] leading-none font-semibold tracking-[-0.03em] text-balance">{c.title}</h1>
      <p className="mb-2 text-lg leading-snug text-muted-foreground">{c.sub}</p>
      {state?.verified && <p role="status" className="rounded-image bg-card p-4 text-sm">Email Anda sudah diverifikasi. Silakan masuk.</p>}
      {state?.passwordReset && <p role="status" className="rounded-image bg-card p-4 text-sm">Kata sandi berhasil diubah. Silakan masuk dengan kata sandi baru.</p>}
      {mode === 'register' && <FormField id="name" label="Nama lengkap" error={errors.name}><Input {...a11y('name')} type="text" autoComplete="name" /></FormField>}
      <FormField id="email" label="Email" error={errors.email}><Input {...a11y('email')} type="email" autoComplete="email" /></FormField>
      <FormField id="password" label="Kata sandi" error={errors.password}><PasswordInput {...a11y('password')} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></FormField>
      {mode === 'login' && <Button asChild variant="link" className="self-start p-0 text-sm"><Link to="/lupa-kata-sandi">Lupa kata sandi?</Link></Button>}
      {errors.form && <p role="alert" className="text-sm leading-snug"><span className="mr-2 inline-block size-2 rounded-full bg-destructive" aria-hidden="true" />{errors.form}</p>}
      {unverifiedEmail && (
        <div role="alert" className="flex flex-col gap-3 rounded-image bg-card p-4 text-sm">
          <p className="flex items-start gap-2"><MailWarning size={18} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0" />Email Anda belum diverifikasi. Buka tautan di email yang kami kirim saat Anda mendaftar.</p>
          {resent ? <p role="status" className="text-muted-foreground">Email verifikasi baru sudah dikirim ke {unverifiedEmail}.</p>
            : <Button type="button" variant="secondary" className="self-start bg-background" onClick={resend}>Kirim ulang email verifikasi</Button>}
        </div>
      )}
      <Button type="submit" size="lg" className="mt-2 w-full" disabled={busy}>{busy ? 'Memproses…' : c.cta}</Button>
      <p className="mt-2 text-center text-base text-muted-foreground">{c.alt[0]} <Link to={c.alt[2]} className="font-medium text-foreground underline underline-offset-4">{c.alt[1]}</Link></p>
    </form>
  )
}
