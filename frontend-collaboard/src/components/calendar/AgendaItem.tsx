import StatusChip from '@/components/common/StatusChip'
import UserAvatar from '@/components/common/UserAvatar'
import { statuses, tintOf, type Task } from '@/data/dashboard'

export default function AgendaItem({ task: t }: { task: Task }) {
  const s = statuses.find((x) => x.id === t.status)!
  return (
    <li className="flex flex-col gap-2 rounded-image bg-background p-4">
      <div className="flex items-center justify-between gap-2"><StatusChip label={s.name} dot={s.dot} /></div>
      <b className="text-base leading-snug font-semibold">{t.title}</b>
      <div className="flex items-center gap-2 text-xs text-muted-foreground"><UserAvatar name={t.who} tint={tintOf(t.who)} />{t.who}</div>
    </li>
  )
}
