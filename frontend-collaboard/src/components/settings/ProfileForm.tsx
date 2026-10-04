import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormField from '@/components/common/FormField'
import UserAvatar from '@/components/common/UserAvatar'
import { roles } from '@/data/team'
import { useProfile } from '@/hooks/useProfile'

export default function ProfileForm() {
  const { profile, saveRole } = useProfile()
  const [saved, setSaved] = useState(false)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    saveRole(String(new FormData(e.currentTarget).get('role')))
    setSaved(true)
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="flex items-center gap-4"><UserAvatar name={profile.name || '?'} tint="var(--sleep-lilac)" size="default" className="size-14 text-lg" /><p className="text-sm text-muted-foreground">Inisial avatar mengikuti nama akun Anda.</p></div>
      <FormField id="name" label="Nama lengkap"><Input id="name" value={profile.name} readOnly className="bg-background" /></FormField>
      <FormField id="email" label="Email"><Input id="email" type="email" value={profile.email} readOnly className="bg-background" /></FormField>
      <p className="text-sm text-muted-foreground">Nama dan email berasal dari akun Anda. Mengubahnya belum tersedia.</p>
      <FormField id="role" label="Peran">
        <select id="role" name="role" defaultValue={profile.role} onChange={() => setSaved(false)} className="h-12 rounded-image border-2 border-transparent bg-background px-4 text-base outline-none focus-visible:border-ring">
          {roles.map((r) => <option key={r}>{r}</option>)}
        </select>
      </FormField>
      <div className="flex items-center gap-4"><Button type="submit">Simpan peran</Button>{saved && <p role="status" className="text-sm text-muted-foreground">Peran tersimpan.</p>}</div>
    </form>
  )
}
