import { Card } from '@/components/ui/card'
import ProgressRing from '@/components/common/ProgressRing'

export type Stat = { label: string; value: number; color: string; note: string }

export default function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <section aria-label="Ringkasan" className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
      {stats.map((s) => (
        <Card key={s.label} data-m="stat" className="flex-row items-center gap-4 p-6">
          <ProgressRing value={s.value} color={s.color} />
          <div><h2 className="mb-1 text-xl leading-tight font-semibold tracking-[-0.02em]">{s.label}</h2><p className="text-sm text-muted-foreground">{s.note}</p></div>
        </Card>
      ))}
    </section>
  )
}
