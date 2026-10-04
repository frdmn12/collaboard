import { Bell, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ThemeToggle from '@/components/common/ThemeToggle'

export default function Topbar({ onNew }: { onNew: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <label className="relative mr-auto flex max-w-[420px] flex-1 items-center">
        <Search size={20} strokeWidth={1.75} aria-hidden="true" className="pointer-events-none absolute left-4 text-muted-foreground" />
        <Input type="search" placeholder="Cari tugas, papan, atau orang" aria-label="Cari" className="h-10 rounded-full pl-11" />
      </label>
      <Button variant="secondary" size="icon" aria-label="Notifikasi"><Bell strokeWidth={1.75} aria-hidden="true" /></Button>
      <ThemeToggle />
      <Button onClick={onNew} className="ml-2"><Plus strokeWidth={1.75} aria-hidden="true" />Tugas baru</Button>
    </div>
  )
}
