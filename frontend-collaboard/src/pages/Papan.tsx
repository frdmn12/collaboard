import { useState } from 'react'
import { useTasks } from '@/hooks/useTasks'
import type { Status } from '@/data/dashboard'
import Topbar from '@/components/dashboard/Topbar'
import BoardToolbar from '@/components/dashboard/BoardToolbar'
import BoardHeader from '@/components/board/BoardHeader'
import KanbanBoard from '@/components/board/KanbanBoard'

export default function Papan() {
  const [adding, setAdding] = useState<Status | null>(null)
  const { tasks, setTasks, visible, add, advance, reorder, query, setQuery, who, setWho } = useTasks()
  return (
    <div className="flex flex-col gap-6">
      <Topbar title="Papan" onNew={() => setAdding('todo')} />
      <BoardHeader total={tasks.length} />
      <BoardToolbar query={query} onQuery={setQuery} who={who} onWho={setWho} />
      <KanbanBoard tasks={visible} allTasks={tasks} adding={adding} onAdding={setAdding} onReorder={reorder} onRestore={setTasks} onAdd={add} onAdvance={advance} />
    </div>
  )
}
