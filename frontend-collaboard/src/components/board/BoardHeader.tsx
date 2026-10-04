import { team } from '@/data/dashboard'
import UserAvatar from '@/components/common/UserAvatar'

export default function BoardHeader({ total }: { total: number }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Proyek · {total} tugas</p>
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-[clamp(32px,4.5vw,48px)] leading-none font-semibold tracking-[-0.03em]">Peluncuran aplikasi v2</h1>
        <div className="flex -space-x-2">
          {team.map((m) => <UserAvatar key={m.name} name={m.name} tint={m.tint} className="ring-2 ring-background" />)}
        </div>
      </div>
      <p className="text-lg text-muted-foreground">Seret kartu antar kolom untuk mengubah status, atau ke atas dan bawah untuk mengatur urutan.</p>
    </div>
  )
}
