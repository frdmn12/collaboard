import { stories } from '@/data/landing'
import Logo from '@/components/common/Logo'

const groups = [
  ['Produk', ['Papan', 'Linimasa', 'Integrasi'], '#fitur'],
  ['Perusahaan', ['Tentang', 'Karier', 'Blog'], '#cerita'],
  ['Bantuan', ['Panduan', 'Kontak', 'Privasi'], '#mulai'],
] as const

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
      <p className="col-span-full text-xs leading-relaxed text-muted-foreground">
        Foto oleh {stories.filter((x) => x.photo).map((x, i) => (
          <span key={x.name}>{i > 0 && ', '}<a href={x.href} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-2">{x.credit}</a></span>
        ))} di Unsplash.
      </p>
      <small className="col-span-full text-xs text-muted-foreground">© 2026 Collaboard</small>
    </footer>
  )
}
