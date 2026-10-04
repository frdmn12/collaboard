import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useWorkspace } from '@/hooks/useWorkspace'
import { boardRoleLabel, type Member } from '@/data/team'
import Topbar from '@/components/dashboard/Topbar'
import SegmentedFilter from '@/components/common/SegmentedFilter'
import BoardSwitcher from '@/components/layout/BoardSwitcher'
import RequireBoard from '@/components/layout/RequireBoard'
import MemberCard from '@/components/team/MemberCard'
import InviteForm from '@/components/team/InviteForm'

type Filter = 'semua' | Member['role']
const options: [Filter, string][] = [['semua', 'Semua'], ['admin', boardRoleLabel.admin], ['member', boardRoleLabel.member]]

export default function Tim() {
  const [inviting, setInviting] = useState(false)
  const [query, setQuery] = useState('')
  const [role, setRole] = useState<Filter>('semua')
  const { board, members, tasks, addMember } = useWorkspace()

  const rows = members.map((m) => ({
    ...m,
    active: tasks.filter((t) => t.assigneeId === m.userId && t.status !== 'done').length,
    done: tasks.filter((t) => t.assigneeId === m.userId && t.status === 'done').length,
  }))
  const q = query.trim().toLowerCase()
  const visible = rows.filter((m) => (role === 'semua' || m.role === role) && (!q || `${m.name} ${m.email}`.toLowerCase().includes(q)))

  return (
    <div className="flex flex-col gap-6">
      <Topbar title="Tim" newLabel="Tambah anggota" onNew={board?.role === 'admin' ? () => setInviting(true) : undefined} />
      <RequireBoard>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground">{members.length} anggota</p>
          <h1 className="text-[clamp(32px,4.5vw,48px)] leading-none font-semibold tracking-[-0.03em]">Tim</h1>
          <div className="flex flex-wrap items-center gap-3 text-lg text-muted-foreground"><BoardSwitcher /><span>Siapa mengerjakan apa, dan seberapa penuh beban kerjanya.</span></div>
        </div>
        {inviting && <InviteForm onInvite={addMember} onClose={() => setInviting(false)} />}
        <div className="flex flex-wrap items-center gap-2">
          <label className="relative mr-auto flex max-w-[420px] min-w-[220px] flex-1 items-center">
            <Search size={20} strokeWidth={1.75} aria-hidden="true" className="pointer-events-none absolute left-4 text-muted-foreground" />
            <Input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari anggota" aria-label="Cari anggota" className="h-11 pl-11" />
          </label>
          <SegmentedFilter label="Filter peran" value={role} options={options} onChange={setRole} />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">{visible.map((m) => <MemberCard key={m.userId} member={m} />)}</div>
        {!visible.length && <p className="rounded-card bg-card px-6 py-12 text-center text-base text-muted-foreground">Tidak ada anggota yang cocok.</p>}
      </RequireBoard>
    </div>
  )
}
