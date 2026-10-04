import { useState } from 'react'
import { Link } from 'react-router'
import { MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { errorMessage } from '@/lib/errors'

export default function CheckEmailNotice({ email }: { email: string }) {
  const { resendVerification } = useAuth()
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  const resend = async () => {
    setState('sending'); setError('')
    try { await resendVerification(email); setState('sent') } catch (err) { setError(errorMessage(err)); setState('idle') }
  }

  return (
    <div data-m="form" className="m-auto flex w-full max-w-[420px] flex-col gap-4 py-12">
      <MailCheck size={32} strokeWidth={1.75} aria-hidden="true" />
      <h1 className="text-[clamp(36px,5vw,48px)] leading-none font-semibold tracking-[-0.03em] text-balance">Cek email Anda.</h1>
      <p className="text-lg leading-snug text-muted-foreground">Akun Anda sudah dibuat. Kami mengirim tautan verifikasi ke <b className="font-medium text-foreground">{email}</b>. Buka tautan itu untuk mengaktifkan akun, lalu masuk.</p>
      {error && <p role="alert" className="text-sm">{error}</p>}
      {state === 'sent' && <p role="status" className="rounded-image bg-card p-4 text-sm">Email verifikasi baru sudah dikirim.</p>}
      <div className="flex flex-wrap gap-2">
        <Button asChild><Link to="/masuk">Ke halaman masuk</Link></Button>
        <Button type="button" variant="secondary" onClick={resend} disabled={state === 'sending'}>{state === 'sending' ? 'Mengirim…' : 'Kirim ulang email'}</Button>
      </div>
      <p className="text-sm text-muted-foreground">Tidak ada email? Periksa folder spam. Tautan berlaku 24 jam.</p>
    </div>
  )
}
