import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Task } from '@/data/dashboard'
import { statuses } from '@/data/dashboard'
import TaskCard from './TaskCard'
import AddTaskForm from './AddTaskForm'

type Props = {
  status: (typeof statuses)[number]; tasks: Task[]; onAdvance: (id: number) => void
  adding?: boolean; onOpenAdd?: () => void; onAdd?: (title: string) => void; onCloseAdd?: () => void
}

export default function BoardColumn({ status: s, tasks, onAdvance, adding, onOpenAdd, onAdd, onCloseAdd }: Props) {
  return (
    <div data-m="col" className="flex min-w-0 flex-col gap-2 rounded-card bg-card p-4">
      <h3 className="mb-1 flex items-center gap-2 text-base leading-7 font-medium">
        <span className={cn('size-2.5 rounded-full', s.dot)} aria-hidden="true" />{s.name}
        <span className="text-xs font-normal text-muted-foreground">{tasks.length}</span>
        {onOpenAdd && <Button variant="ghost" size="icon-sm" className="ml-auto" onClick={onOpenAdd} aria-label="Tambah tugas"><Plus size={16} strokeWidth={1.75} aria-hidden="true" /></Button>}
      </h3>
      {adding && onAdd && onCloseAdd && <AddTaskForm onAdd={onAdd} onClose={onCloseAdd} />}
      {tasks.map((t) => <TaskCard key={t.id} task={t} bar={s.bar} onAdvance={onAdvance} />)}
      {!tasks.length && <p className="px-2 py-4 text-center text-sm text-muted-foreground">Belum ada tugas. Geser satu ke sini.</p>}
    </div>
  )
}
