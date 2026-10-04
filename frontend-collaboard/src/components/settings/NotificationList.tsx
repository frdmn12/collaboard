import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { notificationItems, useNotificationPrefs } from '@/hooks/useNotificationPrefs'

export default function NotificationList() {
  const { prefs, error, failed, retry, set } = useNotificationPrefs()
  if (failed) return (
    <div role="alert" className="flex items-center gap-3 text-sm">
      <span>Pengaturan notifikasi gagal dimuat.</span><Button variant="secondary" onClick={retry}>Coba lagi</Button>
    </div>
  )
  if (!prefs) return <p role="status" className="text-sm">Memuat pengaturan…</p>
  return (
    <div className="flex flex-col gap-2">
      {error && <p role="alert" className="text-sm">{error}</p>}
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {notificationItems.map((n) => (
          <li key={n.id} className="flex items-center justify-between gap-4 rounded-image bg-background p-4">
            <label htmlFor={`n-${n.id}`} className="flex min-w-0 cursor-pointer flex-col gap-0.5">
              <span className="text-base font-medium">{n.label}</span><span className="text-sm text-muted-foreground">{n.hint}</span>
            </label>
            <Switch id={`n-${n.id}`} checked={prefs[n.id]} onCheckedChange={(on) => void set(n.id, on)} />
          </li>
        ))}
      </ul>
    </div>
  )
}
