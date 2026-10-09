import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/** Ganti nama tamu; tersimpan di browser untuk kunjungan berikutnya. Pasang `key={name}` agar isian ikut nama dari server. */
export default function GuestNameForm({ name, onRename }: { name: string; onRename: (n: string) => Promise<boolean> }) {
  const [value, setValue] = useState(name)
  const [error, setError] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return setError('Nama tidak boleh kosong.')
    setError((await onRename(value)) ? '' : 'Nama belum tersimpan. Coba lagi sebentar.')
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2" noValidate>
      <Label htmlFor="guest-name">Namamu di sini</Label>
      <div className="flex gap-2">
        <Input id="guest-name" value={value} maxLength={24} onChange={(e) => setValue(e.target.value)} aria-invalid={!!error || undefined} aria-describedby={error ? 'guest-name-error' : undefined} />
        <Button type="submit" variant="secondary" disabled={!name || value.trim() === name}>Simpan</Button>
      </div>
      {error && <p id="guest-name-error" role="alert" className="text-sm">{error}</p>}
    </form>
  )
}
