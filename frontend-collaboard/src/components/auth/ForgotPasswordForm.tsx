import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormField from '@/components/common/FormField'
import { api } from '@/lib/api'
import { errorMessage } from '@/lib/errors'

export default function ForgotPasswordForm() {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email')).trim().toLowerCase()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Masukkan alamat email yang valid, mis. nama@tim.id.')
    setError(''); setBusy(true)
    try {
      await api('/auth/forgot-password', 'POST', { email })
      setSentTo(email)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  if (sentTo) {
    return (
      <div data-m="form" className="m-auto flex w-full max-w-[420px] flex-col gap-4 py-12" aria-live="polite">
        <MailCheck size={32} strokeWidth={1.75} aria-hidden="true" />
        <h1 className="text-[clamp(36px,5vw,48px)] leading-none font-semibold tracking-[-0.03em] text-balance">Cek email Anda.</h1>
        <p className="text-lg leading-snug text-muted-foreground">Jika <b className="font-medium text-foreground">{sentTo}</b> terdaftar, kami sudah mengirim tautan untuk mengatur ulang kata sandi. Tautan berlaku 60 menit.</p>
        <p className="text-sm text-muted-foreground">Tidak ada email? Periksa folder spam, atau coba lagi beberapa menit lagi.</p>
        <div className="flex flex-wrap gap-2">
          <Button asChild><Link to="/masuk">Kembali ke halaman masuk</Link></Button>
          <Button type="button" variant="secondary" onClick={() => setSentTo(null)}>Pakai email lain</Button>
        </div>
      </div>
    )
  }

  return (
    <form data-m="form" onSubmit={submit} noValidate className="m-auto flex w-full max-w-[420px] flex-col gap-4 py-12">
      <h1 className="text-[clamp(36px,5vw,48px)] leading-none font-semibold tracking-[-0.03em] text-balance">Lupa kata sandi?</h1>
      <p className="mb-2 text-lg leading-snug text-muted-foreground">Masukkan email akun Anda. Kami kirim tautan untuk membuat kata sandi baru.</p>
      <FormField id="email" label="Email" error={error}>
        <Input id="email" name="email" type="email" autoComplete="email" autoFocus aria-invalid={!!error} aria-describedby={error ? 'email-err' : undefined} />
      </FormField>
      <Button type="submit" size="lg" className="mt-2 w-full" disabled={busy}>{busy ? 'Mengirim…' : 'Kirim tautan'}</Button>
      <p className="mt-2 text-center text-base text-muted-foreground">Ingat kata sandi? <Link to="/masuk" className="font-medium text-foreground underline underline-offset-4">Masuk</Link></p>
    </form>
  )
}
