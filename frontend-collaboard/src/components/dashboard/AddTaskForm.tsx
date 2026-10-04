import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = { onAdd: (title: string) => void; onClose: () => void }

export default function AddTaskForm({ onAdd, onClose }: Props) {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = String(new FormData(e.currentTarget).get('title') ?? '').trim()
    if (title) { onAdd(title); onClose() }
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <Input name="title" autoFocus placeholder="Judul tugas" aria-label="Judul tugas" onKeyDown={(e) => e.key === 'Escape' && onClose()} className="h-10 bg-background" />
      <Button type="submit">Tambah</Button>
    </form>
  )
}
