import { UserPlus } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import UserAvatar from '@/components/common/UserAvatar'
import { tintOf, type Task } from '@/data/dashboard'
import { useWorkspace } from '@/hooks/useWorkspace'

/** Penanggung jawab tugas: klik untuk memilih anggota papan. */
export default function AssigneeMenu({ task }: { task: Task }) {
  const { members, assign } = useWorkspace()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex cursor-pointer items-center gap-2 rounded-full pr-2 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Penanggung jawab: ${task.who || 'belum ada'}. Ubah`}>
        {task.who ? <><UserAvatar name={task.who} tint={tintOf(task.who)} />{task.who}</> : <><span className="grid size-7 place-items-center rounded-full bg-secondary"><UserPlus size={14} strokeWidth={1.75} aria-hidden="true" /></span>Tugaskan</>}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="rounded-image border-0 bg-popover p-2 shadow-lift">
        <DropdownMenuRadioGroup value={task.assigneeId ?? 'none'} onValueChange={(v) => assign(task, v === 'none' ? null : v)}>
          <DropdownMenuRadioItem value="none">Belum ditugaskan</DropdownMenuRadioItem>
          {members.map((m) => <DropdownMenuRadioItem key={m.userId} value={m.userId}>{m.name}</DropdownMenuRadioItem>)}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
