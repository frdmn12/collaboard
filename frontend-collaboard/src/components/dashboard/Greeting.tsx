import { useProfile } from '@/hooks/useProfile'
import BoardSwitcher from '@/components/layout/BoardSwitcher'

export default function Greeting({ active }: { active: number }) {
  const first = useProfile().profile.name.split(' ')[0] || 'Anda'
  const hour = new Date().getHours()
  const part = hour < 11 ? 'pagi' : hour < 15 ? 'siang' : hour < 18 ? 'sore' : 'malam'
  const today = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
  return (
    <div data-m="head" className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground capitalize">{today}</p>
      <h1 className="text-[clamp(36px,5vw,56px)] leading-none font-semibold tracking-[-0.03em]">Selamat {part}, {first}.</h1>
      <div className="flex flex-wrap items-center gap-3 text-lg text-muted-foreground"><BoardSwitcher /><span>{active} tugas sedang berjalan.</span></div>
    </div>
  )
}
