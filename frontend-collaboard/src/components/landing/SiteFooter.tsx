import Logo from '@/components/common/Logo'

const groups = [
  ['Produk', ['Papan', 'Linimasa', 'Integrasi'], '/#fitur'],
  ['Perusahaan', ['Tentang', 'Karier', 'Blog'], '/#cerita'],
  ['Bantuan', ['Panduan', 'Kontak', 'Privasi'], '/#mulai'],
] as const
// Href absolut (/#...) agar tetap mengarah ke bagian landing saat footer dipakai di laman lain.

export default function SiteFooter() {
  return (
    <footer className="mx-auto grid max-w-[1200px] grid-cols-[2fr_repeat(3,1fr)] gap-8 pt-20 pb-12 max-[760px]:grid-cols-2">
      <div><Logo /><p className="mt-2 text-base text-muted-foreground">Kerja tim dalam cahaya awan.</p></div>
      {groups.map(([title, items, href]) => (
        <div key={title}>
          <h4 className="mb-4 text-base font-semibold">{title}</h4>
          {items.map((i) => <a key={i} href={href} className="mb-4 block font-medium">{i}</a>)}
        </div>
      ))}
      <small className="col-span-full text-xs text-muted-foreground">© 2026 Collaboard</small>
    </footer>
  )
}
