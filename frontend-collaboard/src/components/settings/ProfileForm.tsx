import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormField from '@/components/common/FormField'
import UserAvatar from '@/components/common/UserAvatar'
import { roles } from '@/data/team'
import { useProfile } from '@/hooks/useProfile'

export default function ProfileForm() {
  const { profile, save } = useProfile()
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [saved, setSaved] = useState(false)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name')).trim(), email = String(f.get('email')).trim()
    const found = { name: name ? undefined : 'Isi nama Anda.', email: /^\S+@\S+\.\S+$/.test(email) ? undefined : 'Masukkan alamat email yang valid.' }
    setErrors(found); setSaved(false)
    if (found.name || found.email) return
    save({ name, email, role: String(f.get('role')) }); setSaved(true)
  }
  const a11y = (k: 'name' | 'email') => ({ id: k, name: k, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined })

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <div className="flex items-center gap-4"><UserAvatar name={profile.name} tint="var(--sleep-lilac)" size="default" className="size-14 text-lg" /><p className="text-sm text-muted-foreground">Inisial avatar mengikuti nama Anda.</p></div>
      <FormField id="name" label="Nama lengkap" error={errors.name}><Input {...a11y('name')} defaultValue={profile.name} className="bg-background" autoComplete="name" /></FormField>
      <FormField id="email" label="Email" error={errors.email}><Input {...a11y('email')} type="email" defaultValue={profile.email} className="bg-background" autoComplete="email" /></FormField>
      <FormField id="role" label="Peran">
        <select id="role" name="role" defaultValue={profile.role} className="h-12 rounded-image border-2 border-transparent bg-background px-4 text-base outline-none focus-visible:border-ring">
          {roles.map((r) => <option key={r}>{r}</option>)}
        </select>
      </FormField>
      <div className="flex items-center gap-4"><Button type="submit">Simpan profil</Button>{saved && <p role="status" className="text-sm text-muted-foreground">Profil tersimpan.</p>}</div>
    </form>
  )
}
