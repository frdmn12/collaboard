import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import Logo from '@/components/common/Logo'
import ThemeToggle from '@/components/common/ThemeToggle'

const links = [['Fitur', '#fitur'], ['Cerita tim', '#cerita'], ['Harga', '#mulai']]


export default function Navbar() {
  return (
    <nav data-m="nav" aria-label="Utama" className="mx-auto flex max-w-[1100px] items-center gap-6 rounded-nav bg-background py-3 pr-4 pl-6 backdrop-blur-lg max-[760px]:gap-2 max-[760px]:pl-4">
      <Logo className="mr-auto" />
      {links.map(([label, href]) => (
        <a key={href} href={href} className="text-base font-medium text-muted-foreground hover:text-foreground max-[760px]:hidden">{label}</a>
      ))}
      <Link to="/playground" className="text-base font-medium text-muted-foreground hover:text-foreground max-[760px]:hidden">Playground</Link>
      <Link to="/masuk" className="text-base font-medium text-muted-foreground hover:text-foreground max-[520px]:hidden">Masuk</Link>
      <ThemeToggle />
      <Button asChild><Link to="/daftar">Coba gratis</Link></Button>
    </nav>
  )
}
