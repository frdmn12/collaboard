import { CollisionPriority } from '@dnd-kit/abstract'
import { useDroppable } from '@dnd-kit/react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { statuses, type Task } from '@/data/dashboard'
import AddTaskForm from '@/components/dashboard/AddTaskForm'
import KanbanCard from './KanbanCard'

type Props = {
  status: (typeof statuses)[number]; tasks: Task[]; adding: boolean
  onAdvance: (id: string) => void; onOpenAdd: () => void; onAdd: (title: string) => void; onCloseAdd: () => void
}

/** Kolom = area lepas (useDroppable); kolom kosong tetap bisa menerima kartu. */
export default function KanbanColumn({ status: s, tasks, adding, onAdvance, onOpenAdd, onAdd, onCloseAdd }: Props) {
  const { ref, isDropTarget } = useDroppable({ id: s.id, type: 'column', accept: 'item', collisionPriority: CollisionPriority.Low })
  return (
    <section ref={ref} aria-label={s.name} className={cn('flex w-[300px] shrink-0 flex-col gap-3 rounded-card p-4 transition-shadow min-[1200px]:w-auto', s.wash, isDropTarget && 'ring-2 ring-ring')}>
      <h3 className="flex items-center gap-2 px-1 text-xl leading-9 font-semibold tracking-[-0.02em]">
        <span className={cn('size-2.5 rounded-full', s.dot)} aria-hidden="true" />{s.name}
        <span className="text-sm font-normal text-muted-foreground">{tasks.length}</span>
        <Button variant="ghost" size="icon-sm" className="ml-auto" onClick={onOpenAdd} aria-label={`Tambah tugas ke ${s.name}`}><Plus size={20} strokeWidth={1.75} aria-hidden="true" /></Button>
      </h3>
      {adding && <AddTaskForm onAdd={onAdd} onClose={onCloseAdd} />}
      {tasks.map((t, i) => <KanbanCard key={t.id} task={t} index={i} bar={s.bar} onAdvance={onAdvance} />)}
      {!tasks.length && <p className="rounded-image px-2 py-10 text-center text-sm text-muted-foreground">Lepas tugas di sini.</p>}
    </section>
  )
}
