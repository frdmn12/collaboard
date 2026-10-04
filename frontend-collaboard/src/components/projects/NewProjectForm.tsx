import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormField from '@/components/common/FormField'
import { errorMessage } from '@/lib/errors'

type Props = { onCreate: (name: string, desc: string) => Promise<unknown>; onClose: () => void }

export default function NewProjectForm({ onCreate, onClose }: Props) {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') ?? '').trim()
    if (!name) return setError('Isi nama proyek.')
    setError(''); setBusy(true)
    try { await onCreate(name, String(f.get('desc') ?? '').trim()); onClose() } catch (err) { setError(errorMessage(err)) } finally { setBusy(false) }
  }
  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4 rounded-card bg-card p-6">
      <h2 className="text-2xl leading-none font-semibold tracking-[-0.02em]">Proyek baru</h2>
      <FormField id="name" label="Nama proyek" error={error}><Input id="name" name="name" autoFocus aria-invalid={!!error} aria-describedby={error ? 'name-err' : undefined} onKeyDown={(e) => e.key === 'Escape' && onClose()} className="bg-background" /></FormField>
      <FormField id="desc" label="Deskripsi (opsional)"><Input id="desc" name="desc" className="bg-background" /></FormField>
      <div className="flex gap-2"><Button type="submit" disabled={busy}>{busy ? 'Membuat…' : 'Buat proyek'}</Button><Button type="button" variant="ghost" onClick={onClose}>Batal</Button></div>
    </form>
  )
}
