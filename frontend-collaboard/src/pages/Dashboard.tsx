import { useRef, useState } from 'react'
import { useDashboardMotion } from '@/hooks/useDashboardMotion'
import { useTasks } from '@/hooks/useTasks'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'
import Greeting from '@/components/dashboard/Greeting'
import StatCards from '@/components/dashboard/StatCards'
import Board from '@/components/dashboard/Board'
import TeamLoad from '@/components/dashboard/TeamLoad'
import ActivityList from '@/components/dashboard/ActivityList'

export default function Dashboard() {
  const root = useRef<HTMLDivElement>(null)
  const [adding, setAdding] = useState(false)
  const { tasks, count, percent, load, advance, add } = useTasks()
  useDashboardMotion(root)

  const stats = [
    { label: 'Progres', value: percent('done'), color: 'var(--recovery-green)', note: `${count('done')} dari ${tasks.length} tugas selesai` },
    { label: 'Sedang dikerjakan', value: percent('doing'), color: 'var(--metric-blue)', note: `${count('doing')} tugas aktif` },
    { label: 'Menunggu review', value: percent('review'), color: 'var(--sleep-lilac)', note: `${count('review')} perlu ditinjau` },
  ]

  return (
    <div ref={root} className="mx-auto grid min-h-dvh max-w-[1500px] grid-cols-[248px_minmax(0,1fr)] gap-4 py-4 max-[900px]:grid-cols-1 max-[900px]:pb-24">
      <Sidebar />
      <main className="flex min-w-0 flex-col gap-8 px-2 pb-12">
        <Topbar onNew={() => setAdding(true)} />
        <Greeting active={count('doing') + count('review')} />
        <StatCards stats={stats} />
        <Board tasks={tasks} adding={adding} onOpenAdd={() => setAdding(true)} onCloseAdd={() => setAdding(false)} onAdd={add} onAdvance={advance} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4"><TeamLoad load={load} /><ActivityList /></div>
      </main>
    </div>
  )
}
