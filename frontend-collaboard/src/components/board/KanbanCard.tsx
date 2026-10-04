import { useSortable } from '@dnd-kit/react/sortable'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Task } from '@/data/dashboard'
import TaskCard from '@/components/dashboard/TaskCard'

type Props = { task: Task; index: number; bar: string; onAdvance: (id: number) => void }

/** Kartu yang bisa diseret (useSortable); gagang di pojok kanan atas, juga bisa lewat keyboard. */
export default function KanbanCard({ task, index, bar, onAdvance }: Props) {
  const { ref, handleRef, isDragging } = useSortable({ id: task.id, index, type: 'item', accept: 'item', group: task.status })
  return (
    <div ref={ref} data-dragging={isDragging || undefined}>
      <TaskCard
        task={task} bar={bar} onAdvance={onAdvance}
        className={cn('transition-shadow', isDragging && 'shadow-lift ring-2 ring-ring')}
        handle={
          <button ref={handleRef} type="button" aria-label={`Seret "${task.title}"`} className="grid size-7 cursor-grab touch-none place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground active:cursor-grabbing">
            <GripVertical size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        }
      />
    </div>
  )
}
