import MiniTask from '@/components/common/MiniTask'

export default function AuthPanel() {
  return (
    <aside data-m="panel" aria-hidden="true" className="flex min-h-[560px] flex-col justify-between gap-12 overflow-hidden rounded-nav bg-sky p-12 max-[900px]:hidden">
      <h2 className="max-w-[10em] text-[clamp(36px,4vw,56px)] leading-none font-semibold tracking-[-0.03em] text-balance">Semua kerja tim, satu papan.</h2>
      <div className="flex w-full max-w-[420px] flex-col gap-2 self-end rounded-card bg-card p-4 shadow-lift">
        <MiniTask title="Redesain alur onboarding" meta="Dewi · tenggat Jumat" pct={60} tone="doing" />
        <MiniTask title="Salinan halaman harga" meta="Sari · menunggu 2 orang" pct={90} tone="review" />
        <MiniTask title="Setup notifikasi email" meta="Bima · selesai kemarin" pct={100} tone="done" />
      </div>
    </aside>
  )
}
