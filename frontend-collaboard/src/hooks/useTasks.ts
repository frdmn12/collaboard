import { useState } from 'react'
import { initialTasks, nextStatus, statuses, team, type Status, type Task } from '@/data/dashboard'

/** State tugas dashboard (di memori; ganti dengan data API). */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const count = (s: Status) => tasks.filter((t) => t.status === s).length
  const percent = (s: Status) => Math.round((count(s) / tasks.length) * 100)
  const load = team.map((m) => ({ ...m, n: tasks.filter((t) => t.who === m.name && t.status !== 'done').length }))

  const advance = (id: number) => setTasks((ts) => ts.map((t) => {
    const n = t.id === id ? nextStatus(t.status) : null
    return n ? { ...t, status: n, pct: Math.max(t.pct, statuses.find((s) => s.id === n)!.pct) } : t
  }))
  const add = (title: string) => setTasks((ts) => [...ts, { id: Date.now(), title, status: 'todo', pct: 0, who: 'Dewi', due: 'Minggu ini', comments: 0 }])

  return { tasks, count, percent, load, advance, add }
}
