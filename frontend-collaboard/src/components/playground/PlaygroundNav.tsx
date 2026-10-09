import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import Logo from '@/components/common/Logo'
import ThemeToggle from '@/components/common/ThemeToggle'

export default function PlaygroundNav() {
  return (
    <nav aria-label="Utama" className="mx-auto flex max-w-[1100px] items-center gap-4 rounded-nav bg-card py-3 pr-4 pl-6 max-[760px]:gap-2 max-[760px]:pl-4">
      <Logo className="mr-auto" />
      <ThemeToggle />
      <Button asChild><Link to="/daftar">Coba gratis</Link></Button>
    </nav>
  )
}
