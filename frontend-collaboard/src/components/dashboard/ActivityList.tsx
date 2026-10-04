import UserAvatar from '@/components/common/UserAvatar'
import { activity, tintOf } from '@/data/dashboard'

export default function ActivityList() {
  return (
    <section data-m="panel" aria-label="Aktivitas terbaru" className="flex min-w-0 flex-col gap-4 rounded-card bg-card p-6">
      <h2 className="text-2xl leading-none font-semibold tracking-[-0.02em]">Aktivitas terbaru</h2>
      <ul className="m-0 flex list-none flex-col gap-4 p-0">
        {activity.map((a) => (
          <li key={a.text} className="flex items-start gap-3">
            <UserAvatar name={a.who} tint={tintOf(a.who)} />
            <p className="text-sm leading-snug"><b>{a.who}</b> {a.text}<span className="mt-0.5 block text-xs text-muted-foreground">{a.when}</span></p>
          </li>
        ))}
      </ul>
    </section>
  )
}
