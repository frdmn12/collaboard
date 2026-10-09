import { Card } from '@/components/ui/card'
import type { Activity } from '@/hooks/usePlayground'

export default function ActivityFeed({ items }: { items: Activity[] }) {
  return (
    <Card className="p-6">
      <h2 className="text-xl leading-tight font-semibold tracking-[-0.02em]">Baru saja</h2>
      <ul aria-live="polite" className="flex flex-col gap-2 text-sm">
        {items.map((a) => <li key={a.key}>{a.text}</li>)}
        {!items.length && <li>Belum ada aktivitas. Coba geser satu kartu.</li>}
      </ul>
    </Card>
  )
}
