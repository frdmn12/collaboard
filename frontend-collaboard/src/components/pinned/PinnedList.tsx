import { Star } from 'lucide-react'
import StatusChip from '@/components/common/StatusChip'
import TaskCard from '@/components/dashboard/TaskCard'
import { statuses, type Task } from '@/data/dashboard'
import { useTasks } from '@/hooks/useTasks'

export default function PinnedList({ tasks }: { tasks: Task[] }) {
  const { advance } = useTasks()
  if (!tasks.length) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card bg-card px-6 py-16 text-center">
        <Star size={24} strokeWidth={1.75} aria-hidden="true" className="text-muted-foreground" />
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">Belum ada tugas yang disematkan</h2>
        <p className="max-w-[28em] text-base text-muted-foreground">Tekan ikon bintang di pojok kartu tugas pada Dasbor atau Papan untuk menyematkannya di sini.</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {tasks.map((t) => {
        const s = statuses.find((x) => x.id === t.status)!
        return (
          <div key={t.id} className="flex flex-col gap-2 rounded-card bg-card p-3">
            <StatusChip label={s.name} dot={s.dot} />
            <TaskCard task={t} bar={s.bar} onAdvance={advance} />
          </div>
        )
      })}
    </div>
  )
}
