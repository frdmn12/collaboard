import { Mail } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import UserAvatar from '@/components/common/UserAvatar'
import { tintOf } from '@/data/dashboard'
import { useRealtime } from '@/hooks/useRealtime'
import { boardRoleLabel, type Member } from '@/data/team'

type Props = { member: Member & { active: number; done: number } }

export default function MemberCard({ member: m }: Props) {
  const online = useRealtime().isOnline(m.userId)
  return (
    <Card className="gap-4 p-6">
      <div className="flex items-center gap-4">
        <UserAvatar name={m.name} tint={tintOf(m.name)} size="default" className="size-14 text-lg" />
        <div className="flex min-w-0 flex-col">
          <h3 className="text-2xl leading-tight font-semibold tracking-[-0.02em]">{m.name}</h3>
          <span className="flex items-center gap-2 text-base text-muted-foreground">{m.isOwner ? 'Pemilik' : boardRoleLabel[m.role]}
            {online && <span className="inline-flex items-center gap-1 text-xs"><span className="size-2 rounded-full bg-status-done" aria-hidden="true" />Online</span>}</span>
        </div>
      </div>
      <a href={`mailto:${m.email}`} className="inline-flex items-center gap-2 truncate text-sm text-muted-foreground hover:text-foreground">
        <Mail size={16} strokeWidth={1.75} aria-hidden="true" />{m.email}
      </a>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm font-medium"><span>Beban kerja</span><span>{m.active} aktif</span></div>
        <Progress value={Math.min(100, m.active * 34)} className="h-2 bg-background" indicatorClassName={m.active > 2 ? 'bg-coral' : 'bg-blue'} />
        <p className="text-xs text-muted-foreground">{m.done} tugas selesai</p>
      </div>
    </Card>
  )
}
