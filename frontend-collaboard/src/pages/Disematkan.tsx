import { useWorkspace } from '@/hooks/useWorkspace'
import Topbar from '@/components/dashboard/Topbar'
import PinnedList from '@/components/pinned/PinnedList'

export default function Disematkan() {
  const { pinned } = useWorkspace()
  return (
    <div className="flex flex-col gap-6">
      <Topbar title="Disematkan" />
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">{pinned.length} tugas</p>
        <h1 className="text-[clamp(32px,4.5vw,48px)] leading-none font-semibold tracking-[-0.03em]">Disematkan</h1>
        <p className="text-lg text-muted-foreground">Tugas penting yang Anda tandai, dari semua proyek, dalam satu tempat.</p>
      </div>
      <PinnedList tasks={pinned} />
    </div>
  )
}
