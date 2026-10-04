import type { ReactNode } from 'react'
import { ArrowRight, CircleCheck, Clock, MessageSquare, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import UserAvatar from '@/components/common/UserAvatar'
import { cn } from '@/lib/utils'
import { formatDue } from '@/lib/date'
import { useTasks } from '@/hooks/useTasks'
import { nextStatus, statuses, tintOf, type Task } from '@/data/dashboard'

type Props = { task: Task; bar: string; onAdvance: (id: number) => void; handle?: ReactNode; className?: string }

export default function TaskCard({ task: t, bar, onAdvance, handle, className }: Props) {
  const { togglePin } = useTasks()
  const next = nextStatus(t.status)
  const nextName = statuses.find((s) => s.id === next)?.name
  return (
    <article className={cn('flex flex-col gap-3 rounded-card bg-background p-5', className)}>
      {t.tags.length > 0 && <div className="flex flex-wrap gap-1.5">{t.tags.map((g) => <Badge key={g} size="sm">{g}</Badge>)}</div>}
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-xl leading-tight font-semibold tracking-[-0.02em]">{t.title}</h4>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => togglePin(t.id)} aria-pressed={!!t.pinned} aria-label={t.pinned ? `Lepas sematan "${t.title}"` : `Sematkan "${t.title}"`}
            className="grid size-7 cursor-pointer place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Star size={16} strokeWidth={1.75} fill={t.pinned ? 'var(--pinned)' : 'none'} color={t.pinned ? 'var(--pinned)' : 'currentColor'} aria-hidden="true" />
          </button>
          {handle}
        </div>
      </div>
      <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">{t.desc}</p>
      <Progress value={t.pct} indicatorClassName={bar} />
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <UserAvatar name={t.who} tint={tintOf(t.who)} /><span>{t.who}</span>
        <span className="inline-flex items-center gap-1"><Clock size={14} strokeWidth={1.75} aria-hidden="true" />{formatDue(t.date)}</span>
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
