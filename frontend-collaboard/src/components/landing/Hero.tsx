import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { GradientBackground } from '@/components/ui/oceanic-shimmer'
import Navbar from './Navbar'
import BoardPreview from './BoardPreview'

export default function Hero() {
  return (
    <header className="relative isolate mt-4 overflow-hidden rounded-nav px-4 pt-4">
      {/* Dibungkus div absolut: komponen memakai position:relative inline sehingga class absolute tidak akan menang. */}
      <div className="absolute inset-0 -z-10"><GradientBackground /></div>
      <Navbar />
      <div className="flex flex-col items-center gap-6 pt-24 text-center text-[#222326] max-[760px]:pt-14">
        <h1 data-m="title" className="text-hero">Semua kerja tim,<br />satu papan.</h1>
        <p data-m="hero-item" className="text-lead max-w-[30em] text-[#222326]/75!">Atur tugas, pantau progres, dan tahu siapa mengerjakan apa tanpa perlu bertanya di grup chat.</p>
        <div data-m="hero-item" className="flex flex-wrap justify-center gap-4">
          <Button asChild><Link to="/daftar">Buat papan pertama</Link></Button>
          <Button asChild variant="secondary"><a href="#fitur">Lihat cara kerjanya</a></Button>
        </div>
        <p data-m="hero-item" className="text-xs leading-none font-medium text-white"><span className="mr-1 text-sm tracking-[2px] text-pinned">★★★★★</span> 4,9 dari 12.000 tim</p>
        <BoardPreview />
      </div>
    </header>
  )
}
