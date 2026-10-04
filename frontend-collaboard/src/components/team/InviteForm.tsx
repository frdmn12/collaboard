import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormField from '@/components/common/FormField'
import { roles } from '@/data/team'

type Props = { onInvite: (name: string, email: string, role: string) => void; onClose: () => void }

export default function InviteForm({ onInvite, onClose }: Props) {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') ?? '').trim()
    const email = String(f.get('email') ?? '').trim()
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) return
    onInvite(name, email, String(f.get('role')))
    onClose()
  }
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-card bg-card p-6 sm:grid-cols-3">
      <h2 className="text-2xl leading-none font-semibold tracking-[-0.02em] sm:col-span-3">Undang anggota</h2>
      <FormField id="name" label="Nama"><Input id="name" name="name" autoFocus required className="bg-background" onKeyDown={(e) => e.key === 'Escape' && onClose()} /></FormField>
      <FormField id="email" label="Email"><Input id="email" name="email" type="email" required className="bg-background" /></FormField>
      <FormField id="role" label="Peran">
        <select id="role" name="role" className="h-12 rounded-image border-2 border-transparent bg-background px-4 text-base outline-none focus-visible:border-ring">
          {roles.map((r) => <option key={r}>{r}</option>)}
        </select>
      </FormField>
      <div className="flex gap-2 sm:col-span-3"><Button type="submit">Kirim undangan</Button><Button type="button" variant="ghost" onClick={onClose}>Batal</Button></div>
    </form>
  )
}
