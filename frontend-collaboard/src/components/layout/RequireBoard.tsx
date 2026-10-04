import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { FolderKanban, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWorkspace } from '@/hooks/useWorkspace'

/** Menampilkan konten hanya bila ada proyek aktif; selain itu keadaan memuat atau ajakan membuat proyek. */
export default function RequireBoard({ children }: { children: ReactNode }) {
  const { load, board } = useWorkspace()
  if (load === 'loading') {
    return <div className="grid place-items-center py-24" role="status" aria-label="Memuat"><LoaderCircle size={28} strokeWidth={1.75} className="animate-spin text-muted-foreground" aria-hidden="true" /></div>
  }
  if (!board) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card bg-card px-6 py-16 text-center">
        <FolderKanban size={24} strokeWidth={1.75} aria-hidden="true" className="text-muted-foreground" />
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">Belum ada proyek</h2>
        <p className="max-w-[28em] text-base text-muted-foreground">Buat proyek pertama Anda untuk mulai mencatat tugas dan mengundang tim.</p>
        <Button asChild className="mt-2"><Link to="/proyek">Buat proyek</Link></Button>
      </div>
    )
  }
  return <>{children}</>
}
