import { useRef, useState } from 'react'
import { useDashboardMotion } from '@/hooks/useDashboardMotion'
import { useTasks } from '@/hooks/useTasks'
import type { Status } from '@/data/dashboard'
import Topbar from '@/components/dashboard/Topbar'
import Greeting from '@/components/dashboard/Greeting'
import StatCards from '@/components/dashboard/StatCards'
import BoardToolbar from '@/components/dashboard/BoardToolbar'
import Board from '@/components/dashboard/Board'
import TeamLoad from '@/components/dashboard/TeamLoad'
import ActivityList from '@/components/dashboard/ActivityList'
import type { View } from '@/components/dashboard/ViewToggle'

export default function Dashboard() {
  const root = useRef<HTMLDivElement>(null)
  const [adding, setAdding] = useState<Status | null>(null)
  const [view, setView] = useState<View>('grid')
  const { tasks, visible, count, percent, load, advance, add, query, setQuery, who, setWho } = useTasks()
  useDashboardMotion(root)

  const stats = [
    { label: 'Progres', value: percent('done'), color: 'var(--recovery-green)', note: `${count('done')} dari ${tasks.length} tugas selesai` },
    { label: 'Sedang dikerjakan', value: percent('doing'), color: 'var(--metric-blue)', note: `${count('doing')} tugas aktif` },
    { label: 'Menunggu review', value: percent('review'), color: 'var(--sleep-lilac)', note: `${count('review')} perlu ditinjau` },
  ]

  return (
    <div ref={root} className="flex flex-col gap-8">
      <Topbar title="Dasbor" onNew={() => setAdding('todo')} />
      <Greeting active={count('doing') + count('review')} />
      <StatCards stats={stats} />
      <section aria-label="Papan tugas" className="flex flex-col gap-4">
        <BoardToolbar query={query} onQuery={setQuery} who={who} onWho={setWho} view={view} onView={setView} />
        <Board tasks={visible} view={view} adding={adding} onAdding={setAdding} onAdd={add} onAdvance={advance} />
      </section>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4"><TeamLoad load={load} /><ActivityList /></div>
    </div>
  )
}
