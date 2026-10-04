import { ArrowRight, CircleCheck, Clock, MessageSquare, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import UserAvatar from '@/components/common/UserAvatar'
import { nextStatus, statuses, tintOf, type Task } from '@/data/dashboard'

type Props = { task: Task; bar: string; onAdvance: (id: number) => void }

export default function TaskCard({ task: t, bar, onAdvance }: Props) {
  const next = nextStatus(t.status)
  const nextName = statuses.find((s) => s.id === next)?.name
  return (
    <article className="flex flex-col gap-3 rounded-image bg-background p-4">
      <div className="flex justify-between gap-2">
        <b className="text-base leading-snug font-medium">{t.title}</b>
        {t.pinned && <Star size={16} strokeWidth={1.75} fill="var(--pinned)" color="var(--pinned)" aria-label="Disematkan" />}
      </div>
      <Progress value={t.pct} indicatorClassName={bar} />
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <UserAvatar name={t.who} tint={tintOf(t.who)} /><span>{t.who}</span>
        <span className="inline-flex items-center gap-1"><Clock size={14} strokeWidth={1.75} aria-hidden="true" />{t.due}</span>
        <span className="inline-flex items-center gap-1"><MessageSquare size={14} strokeWidth={1.75} aria-hidden="true" />{t.comments}</span>
        {next ? (
          <Button variant="secondary" size="icon-sm" className="ml-auto" onClick={() => onAdvance(t.id)} aria-label={`Pindahkan "${t.title}" ke ${nextName}`}>
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </Button>
        ) : <CircleCheck size={16} strokeWidth={1.75} color="var(--recovery-green)" className="ml-auto" aria-label="Selesai" />}
      </div>
    </article>
  )
}
