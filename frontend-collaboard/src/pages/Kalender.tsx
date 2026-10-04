import { useState } from 'react'
import { useTasks } from '@/hooks/useTasks'
import { sameDay, startOfDay } from '@/lib/date'
import Topbar from '@/components/dashboard/Topbar'
import TaskCalendar from '@/components/calendar/TaskCalendar'
import DayAgenda from '@/components/calendar/DayAgenda'

export default function Kalender() {
  const { tasks, add } = useTasks()
  const [selected, setSelected] = useState(() => startOfDay(new Date()))
  const dayTasks = tasks.filter((t) => sameDay(t.date, selected))
  return (
    <div className="flex flex-col gap-6">
      <Topbar title="Kalender" />
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">{tasks.length} tugas berjadwal</p>
        <h1 className="text-[clamp(32px,4.5vw,48px)] leading-none font-semibold tracking-[-0.03em]">Kalender</h1>
        <p className="text-lg text-muted-foreground">Tenggat semua tugas dalam satu bulan. Titik biru menandai hari yang punya tenggat.</p>
      </div>
      <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start gap-4 max-[1100px]:grid-cols-1">
        <TaskCalendar selected={selected} onSelect={setSelected} taskDates={tasks.map((t) => t.date)} />
        <DayAgenda date={selected} tasks={dayTasks} onAdd={(title) => add(title, 'todo', selected)} />
      </div>
    </div>
  )
}
