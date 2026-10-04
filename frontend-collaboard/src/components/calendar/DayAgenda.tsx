import type { FormEvent } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Task } from '@/data/dashboard'
import AgendaItem from './AgendaItem'

type Props = { date: Date; tasks: Task[]; onAdd: (title: string) => void }

export default function DayAgenda({ date, tasks, onAdd }: Props) {
  const label = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).format(date)
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem('title') as HTMLInputElement
    const title = input.value.trim()
    if (title) { onAdd(title); input.value = '' }
  }
  return (
    <section aria-label="Agenda hari ini" className="flex flex-col gap-4 rounded-card bg-card p-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{tasks.length} tenggat</p>
        <h2 className="text-2xl leading-tight font-semibold tracking-[-0.02em] capitalize">{label}</h2>
      </div>
      {tasks.length ? <ul className="m-0 flex list-none flex-col gap-2 p-0">{tasks.map((t) => <AgendaItem key={t.id} task={t} />)}</ul>
        : <p className="rounded-image bg-background px-4 py-8 text-center text-sm text-muted-foreground">Tidak ada tenggat di hari ini.</p>}
      <form onSubmit={submit} className="flex gap-2">
        <Input name="title" placeholder="Tambah tugas di tanggal ini" aria-label="Judul tugas baru" className="h-10 bg-background" />
        <Button type="submit" size="icon" aria-label="Tambah tugas"><Plus strokeWidth={1.75} aria-hidden="true" /></Button>
      </form>
    </section>
  )
}
