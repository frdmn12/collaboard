import UserAvatar from '@/components/common/UserAvatar'
import BoardSwitcher from '@/components/layout/BoardSwitcher'
import { tintOf } from '@/data/dashboard'
import { useWorkspace } from '@/hooks/useWorkspace'

export default function BoardHeader() {
  const { board, members, tasks } = useWorkspace()
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Proyek · {tasks.length} tugas</p>
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-[clamp(32px,4.5vw,48px)] leading-none font-semibold tracking-[-0.03em]">{board?.name}</h1>
        <div className="flex -space-x-2">{members.map((m) => <UserAvatar key={m.userId} name={m.name} tint={tintOf(m.name)} className="ring-2 ring-background" />)}</div>
        <BoardSwitcher />
      </div>
      {board?.description && <p className="text-lg text-muted-foreground">{board.description}</p>}
      <p className="text-sm text-muted-foreground">Seret kartu antar kolom untuk mengubah status, atau ke atas dan bawah untuk mengatur urutan.</p>
    </div>
  )
}
