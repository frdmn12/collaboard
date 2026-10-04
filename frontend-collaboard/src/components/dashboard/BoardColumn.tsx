import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { statuses, type Task } from '@/data/dashboard'
import TaskCard from './TaskCard'
import AddTaskForm from './AddTaskForm'

type Props = {
  status: (typeof statuses)[number]; tasks: Task[]; adding: boolean
  onAdvance: (id: number) => void; onOpenAdd: () => void; onAdd: (title: string) => void; onCloseAdd: () => void
}

export default function BoardColumn({ status: s, tasks, adding, onAdvance, onOpenAdd, onAdd, onCloseAdd }: Props) {
  return (
    <section data-m="col" aria-label={s.name} className={cn('flex min-w-0 flex-col gap-3 rounded-card p-4', s.wash)}>
      <h3 className="flex items-center gap-2 px-1 text-xl leading-9 font-semibold tracking-[-0.02em]">
        <span className={cn('size-2.5 rounded-full', s.dot)} aria-hidden="true" />{s.name}
        <span className="text-sm font-normal text-muted-foreground">{tasks.length}</span>
        <Button variant="ghost" size="icon-sm" className="ml-auto" onClick={onOpenAdd} aria-label={`Tambah tugas ke ${s.name}`}><Plus size={20} strokeWidth={1.75} aria-hidden="true" /></Button>
      </h3>
      {adding && <AddTaskForm onAdd={onAdd} onClose={onCloseAdd} />}
      {tasks.map((t) => <TaskCard key={t.id} task={t} bar={s.bar} onAdvance={onAdvance} />)}
      {!tasks.length && <p className="px-2 py-6 text-center text-sm text-muted-foreground">Tidak ada tugas di sini.</p>}
    </section>
  )
}
