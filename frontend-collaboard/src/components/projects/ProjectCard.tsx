import { Link } from 'react-router'
import { CalendarDays, CircleCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import StatusChip from '@/components/common/StatusChip'
import UserAvatar from '@/components/common/UserAvatar'
import { projectStatus, type Project } from '@/data/projects'
import { tintOf } from '@/data/dashboard'

export default function ProjectCard({ project: p }: { project: Project }) {
  const s = projectStatus[p.status]
  return (
    <Card className="gap-4 bg-card p-6">
      <div className="flex items-center justify-between gap-2">
        <StatusChip label={s.label} dot={s.dot} />
        <div className="flex -space-x-2">{p.members.map((m) => <UserAvatar key={m} name={m} tint={tintOf(m)} className="ring-2 ring-card" />)}</div>
      </div>
      <div className="flex flex-col gap-2">
        <CardTitle className="text-2xl leading-tight tracking-[-0.02em]">{p.name}</CardTitle>
        <CardDescription className="line-clamp-2 text-base leading-snug">{p.desc}</CardDescription>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm font-medium"><span>Progres</span><span>{p.progress}%</span></div>
        <Progress value={p.progress} className="h-2 bg-background" indicatorClassName={s.bar} />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><CircleCheck size={16} strokeWidth={1.75} aria-hidden="true" />{p.done}/{p.total} tugas</span>
        <span className="inline-flex items-center gap-1.5"><CalendarDays size={16} strokeWidth={1.75} aria-hidden="true" />{p.due}</span>
        <Button asChild variant="secondary" className="ml-auto bg-background"><Link to="/papan" aria-label={`Buka papan ${p.name}`}>Buka papan</Link></Button>
      </div>
    </Card>
  )
}
