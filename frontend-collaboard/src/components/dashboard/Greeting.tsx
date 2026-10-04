export default function Greeting({ active }: { active: number }) {
  const hour = new Date().getHours()
  const part = hour < 11 ? 'pagi' : hour < 15 ? 'siang' : hour < 18 ? 'sore' : 'malam'
  const today = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
  return (
    <div data-m="head" className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground capitalize">{today}</p>
      <h1 className="text-[clamp(36px,5vw,56px)] leading-none font-semibold tracking-[-0.03em]">Selamat {part}, Dewi.</h1>
      <p className="text-lg text-muted-foreground">Peluncuran aplikasi v2 · {active} tugas sedang berjalan.</p>
    </div>
  )
}
