import { Link } from 'react-router'
import { CircleCheck, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import StatusChip from '@/components/common/StatusChip'
import { useWorkspace } from '@/hooks/useWorkspace'
import type { Board } from '@/data/workspace'

/** Proyek selesai bila ada tugas dan semuanya Done; selain itu aktif. */
export const projectStatus = (b: Board) => (b.taskCount > 0 && b.doneCount === b.taskCount ? 'selesai' : 'aktif')
const chip = { aktif: { label: 'Aktif', dot: 'bg-status-doing', bar: 'bg-status-doing' }, selesai: { label: 'Selesai', dot: 'bg-status-done', bar: 'bg-status-done' } }

export default function ProjectCard({ board: b }: { board: Board }) {
  const { selectBoard } = useWorkspace()
  const s = chip[projectStatus(b)]
  return (
    <Card className="gap-4 bg-card p-6">
      <StatusChip label={s.label} dot={s.dot} />
      <div className="flex flex-col gap-2">
        <CardTitle className="text-2xl leading-tight tracking-[-0.02em]">{b.name}</CardTitle>
        <CardDescription className="line-clamp-2 text-base leading-snug">{b.description || 'Belum ada deskripsi.'}</CardDescription>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm font-medium"><span>Progres</span><span>{b.progress}%</span></div>
        <Progress value={b.progress} className="h-2 bg-background" indicatorClassName={s.bar} />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><CircleCheck size={16} strokeWidth={1.75} aria-hidden="true" />{b.doneCount}/{b.taskCount} tugas</span>
        <span className="inline-flex items-center gap-1.5"><Users size={16} strokeWidth={1.75} aria-hidden="true" />{b.memberCount} anggota</span>
        <Button asChild variant="secondary" className="ml-auto bg-background"><Link to="/papan" onClick={() => selectBoard(b.id)} aria-label={`Buka papan ${b.name}`}>Buka papan</Link></Button>
      </div>
    </Card>
  )
}
