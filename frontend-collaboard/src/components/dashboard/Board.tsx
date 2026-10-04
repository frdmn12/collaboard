import { statuses, type Task } from '@/data/dashboard'
import BoardColumn from './BoardColumn'

type Props = { tasks: Task[]; adding: boolean; onOpenAdd: () => void; onCloseAdd: () => void; onAdd: (title: string) => void; onAdvance: (id: number) => void }

export default function Board({ tasks, adding, onOpenAdd, onCloseAdd, onAdd, onAdvance }: Props) {
  return (
    <section aria-label="Papan tugas" className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] items-start gap-4">
      {statuses.map((s) => (
        <BoardColumn key={s.id} status={s} tasks={tasks.filter((t) => t.status === s.id)} onAdvance={onAdvance}
          {...(s.id === 'todo' ? { adding, onOpenAdd, onAdd, onCloseAdd } : {})} />
      ))}
    </section>
  )
}
