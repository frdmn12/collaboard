import { cn } from '@/lib/utils'
import { roomName } from '@/data/playground'

type Props = { status: 'connecting' | 'online' | 'offline' | 'full'; total: number; room: number }

const label = (p: Props) => ({
  connecting: 'Menyambung…',
  offline: 'Menyambung ulang…',
  full: 'Terlalu banyak tab dari jaringanmu. Tutup salah satu.',
  online: `Langsung · ${p.total.toLocaleString('id-ID')} online · Ruang ${roomName(p.room)}`,
})[p.status]

export default function PlaygroundIntro(props: Props) {
  return (
    <header className="flex flex-col items-start gap-4">
      <span role="status" className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-foreground">
        <span className={cn('size-2.5 rounded-full', props.status === 'online' ? 'bg-status-done' : 'bg-status-blocked')} aria-hidden="true" />
        {label(props)}
      </span>
      <h1 className="text-display">Playground</h1>
      <p className="text-lead max-w-[34em]">Coba Collaboard bersama pengunjung lain, tanpa akun. Geser kartu, kirim reaksi, dan lihat siapa saja yang sedang di sini.</p>
    </header>
  )
}
