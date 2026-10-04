import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormField from './FormField'
import PasswordInput from './PasswordInput'

export type Mode = 'login' | 'register'
type Errors = Partial<Record<'name' | 'email' | 'password', string>>

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
  const [errors, setErrors] = useState<Errors>({})
  const a11y = (k: keyof Errors) => ({ id: k, name: k, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined })

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const v = Object.fromEntries(new FormData(ev.currentTarget)) as Record<string, string>
    const found = validate(mode, v)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) return ev.currentTarget.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus()
    // ponytail: belum ada backend; langsung ke dashboard. Ganti dengan panggilan API autentikasi.
    navigate('/dashboard')
  }

  return (
    <form data-m="form" onSubmit={submit} noValidate className="m-auto flex w-full max-w-[420px] flex-col gap-4 py-12">
      <h1 className="text-[clamp(36px,5vw,48px)] leading-none font-semibold tracking-[-0.03em] text-balance">{c.title}</h1>
      <p className="mb-2 text-lg leading-snug text-muted-foreground">{c.sub}</p>
      {mode === 'register' && <FormField id="name" label="Nama lengkap" error={errors.name}><Input {...a11y('name')} type="text" autoComplete="name" /></FormField>}
      <FormField id="email" label="Email" error={errors.email}><Input {...a11y('email')} type="email" autoComplete="email" /></FormField>
      <FormField id="password" label="Kata sandi" error={errors.password}><PasswordInput {...a11y('password')} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></FormField>
      {mode === 'login' && <Button asChild variant="link" className="self-start p-0 text-sm"><a href="#lupa">Lupa kata sandi?</a></Button>}
      <Button type="submit" size="lg" className="mt-2 w-full">{c.cta}</Button>
      <p className="mt-2 text-center text-base text-muted-foreground">{c.alt[0]} <Link to={c.alt[2]} className="font-medium text-foreground underline underline-offset-4">{c.alt[1]}</Link></p>
    </form>
  )
}
