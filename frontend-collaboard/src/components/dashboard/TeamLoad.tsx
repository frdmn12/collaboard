import { Progress } from '@/components/ui/progress'
import UserAvatar from '@/components/common/UserAvatar'

type Props = { load: { id: string; name: string; tint: string; n: number }[] }

export default function TeamLoad({ load }: Props) {
  return (
    <section data-m="panel" aria-label="Beban kerja tim" className="flex min-w-0 flex-col gap-4 rounded-card bg-card p-6">
      <h2 className="text-2xl leading-none font-semibold tracking-[-0.02em]">Beban kerja tim</h2>
      {!load.length && <p className="text-sm text-muted-foreground">Belum ada anggota.</p>}
      {load.map((m) => (
        <div key={m.id} className="grid grid-cols-[28px_56px_1fr_auto] items-center gap-3 text-sm font-medium">
          <UserAvatar name={m.name} tint={m.tint} /><span>{m.name}</span>
          <Progress value={Math.min(100, m.n * 34)} className="h-2 bg-background" indicatorClassName={m.n > 2 ? 'bg-coral' : 'bg-blue'} />
          <span className="text-xs font-normal text-muted-foreground">{m.n} aktif</span>
        </div>
      ))}
    </section>
  )
}
