import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export default function FinalCta() {
  return (
    <section id="mulai" className="pt-20">
      <div data-m="final" className="flex flex-col items-center gap-6 rounded-nav bg-sky px-6 py-20 text-center">
        <h2 className="text-display">Mulai dalam semenit.</h2>
        <p className="text-lead max-w-[36em]">Gratis untuk tim sampai 10 orang. Tanpa kartu kredit.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild><Link to="/daftar">Buat papan pertama</Link></Button>
          <Button asChild variant="secondary"><Link to="/masuk">Sudah punya akun? Masuk</Link></Button>
        </div>
      </div>
    </section>
  )
}
