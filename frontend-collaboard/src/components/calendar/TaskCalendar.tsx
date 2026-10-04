import { id } from 'react-day-picker/locale'
import { Calendar } from '@/components/ui/calendar'

type Props = { selected: Date; onSelect: (d: Date) => void; taskDates: Date[] }

/** Kalender bulan (shadcn Calendar); titik biru menandai hari yang punya tenggat. */
export default function TaskCalendar({ selected, onSelect, taskDates }: Props) {
  return (
    <div className="rounded-card bg-card p-6">
      <Calendar
        mode="single" locale={id} weekStartsOn={1} required
        selected={selected} onSelect={(d) => d && onSelect(d)} defaultMonth={selected}
        modifiers={{ hasTask: taskDates }}
        className="bg-transparent"
      />
    </div>
  )
}
