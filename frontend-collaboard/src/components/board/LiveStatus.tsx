import { cn } from '@/lib/utils'
import { useRealtime } from '@/hooks/useRealtime'

/** Status koneksi realtime; teks selalu tertulis (warna hanya pendukung). */
export default function LiveStatus() {
  const { connected, presence } = useRealtime()
  return (
    <span role="status" className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
      <span className={cn('size-2 rounded-full', connected ? 'bg-status-done' : 'bg-status-blocked')} aria-hidden="true" />
      {connected ? `Langsung · ${presence.length} online` : 'Menyambung ulang…'}
    </span>
  )
}
