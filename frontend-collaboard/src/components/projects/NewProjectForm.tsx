import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormField from '@/components/common/FormField'

type Props = { onAdd: (name: string, desc: string) => void; onClose: () => void }

export default function NewProjectForm({ onAdd, onClose }: Props) {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') ?? '').trim()
    if (!name) return
    onAdd(name, String(f.get('desc') ?? '').trim())
    onClose()
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-4 rounded-card bg-card p-6">
      <h2 className="text-2xl leading-none font-semibold tracking-[-0.02em]">Proyek baru</h2>
      <FormField id="name" label="Nama proyek"><Input id="name" name="name" autoFocus required onKeyDown={(e) => e.key === 'Escape' && onClose()} className="bg-background" /></FormField>
      <FormField id="desc" label="Deskripsi (opsional)"><Input id="desc" name="desc" className="bg-background" /></FormField>
      <div className="flex gap-2"><Button type="submit">Buat proyek</Button><Button type="button" variant="ghost" onClick={onClose}>Batal</Button></div>
    </form>
  )
}
