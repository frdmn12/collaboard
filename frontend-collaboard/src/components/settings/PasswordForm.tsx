import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import FormField from '@/components/common/FormField'
import PasswordInput from '@/components/auth/PasswordInput'

type Errors = Partial<Record<'current' | 'next', string>>

export default function PasswordForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)
  const a11y = (k: keyof Errors) => ({ id: k, name: k, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined })

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const found: Errors = {}
    if (!String(f.get('current'))) found.current = 'Masukkan kata sandi saat ini.'
    if (String(f.get('next')).length < 8) found.next = 'Kata sandi baru minimal 8 karakter.'
    setErrors(found); setDone(false)
    if (Object.keys(found).length) return
    // ponytail: belum ada backend; ganti dengan panggilan API ubah kata sandi.
    e.currentTarget.reset(); setDone(true)
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <FormField id="current" label="Kata sandi saat ini" error={errors.current}><PasswordInput {...a11y('current')} autoComplete="current-password" className="bg-background" /></FormField>
      <FormField id="next" label="Kata sandi baru" error={errors.next}><PasswordInput {...a11y('next')} autoComplete="new-password" className="bg-background" /></FormField>
      <div className="flex items-center gap-4"><Button type="submit">Ubah kata sandi</Button>{done && <p role="status" className="text-sm text-muted-foreground">Formulir valid. Belum terhubung ke server, jadi kata sandi belum berubah.</p>}</div>
    </form>
  )
}
