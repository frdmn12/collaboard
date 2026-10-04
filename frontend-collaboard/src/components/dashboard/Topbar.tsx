import { Bell, ChevronLeft, Plus } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/common/ThemeToggle'

export default function Topbar({ title, onNew, newLabel = 'Tugas baru' }: { title: string; onNew?: () => void; newLabel?: string }) {
  return (
    <div className="flex items-center gap-2">
      <nav aria-label="Jejak" className="mr-auto flex items-center gap-2 text-lg">
        <Button asChild variant="ghost" size="icon-sm" aria-label="Kembali"><Link to="/"><ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" /></Link></Button>
        <span className="text-muted-foreground">Beranda</span><span className="text-muted-foreground">/</span><b className="font-medium">{title}</b>
      </nav>
      <Button variant="secondary" size="icon" aria-label="Notifikasi"><Bell strokeWidth={1.75} aria-hidden="true" /></Button>
      <ThemeToggle />
      {onNew && <Button onClick={onNew} className="ml-2"><Plus strokeWidth={1.75} aria-hidden="true" />{newLabel}</Button>}
    </div>
  )
}
