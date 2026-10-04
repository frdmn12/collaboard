import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useProjects } from '@/hooks/useProjects'
import Topbar from '@/components/dashboard/Topbar'
import ProjectCard from '@/components/projects/ProjectCard'
import SegmentedFilter from '@/components/common/SegmentedFilter'
import { projectStatus, type ProjectStatus } from '@/data/projects'
import NewProjectForm from '@/components/projects/NewProjectForm'

const statusOptions: [ProjectStatus | 'semua', string][] = [['semua', 'Semua'], ...Object.entries(projectStatus).map(([k, v]) => [k as ProjectStatus, v.label] as [ProjectStatus, string])]

export default function Proyek() {
  const [creating, setCreating] = useState(false)
  const { all, visible, add, query, setQuery, status, setStatus } = useProjects()
  return (
    <div className="flex flex-col gap-6">
      <Topbar title="Proyek" newLabel="Proyek baru" onNew={() => setCreating(true)} />
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">{all.length} proyek</p>
        <h1 className="text-[clamp(32px,4.5vw,48px)] leading-none font-semibold tracking-[-0.03em]">Proyek</h1>
        <p className="text-lg text-muted-foreground">Semua pekerjaan tim, dikelompokkan per proyek.</p>
      </div>
      {creating && <NewProjectForm onAdd={add} onClose={() => setCreating(false)} />}
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative mr-auto flex max-w-[420px] min-w-[220px] flex-1 items-center">
          <Search size={20} strokeWidth={1.75} aria-hidden="true" className="pointer-events-none absolute left-4 text-muted-foreground" />
          <Input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari proyek" aria-label="Cari proyek" className="h-11 pl-11" />
        </label>
        <SegmentedFilter label="Filter status proyek" value={status} options={statusOptions} onChange={setStatus} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
        {visible.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
      {!visible.length && <p className="rounded-card bg-card px-6 py-12 text-center text-base text-muted-foreground">Tidak ada proyek yang cocok.</p>}
    </div>
  )
}
