import { Link } from 'react-router'
import { CalendarDays, LayoutDashboard, LogOut, Settings, SquareKanban, Users, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/common/Logo'
import UserAvatar from '@/components/common/UserAvatar'
import { cn } from '@/lib/utils'

const items: [string, LucideIcon][] = [['Dasbor', LayoutDashboard], ['Papan', SquareKanban], ['Tim', Users], ['Kalender', CalendarDays], ['Pengaturan', Settings]]

export default function Sidebar() {
  return (
    <aside className="sticky top-4 flex h-[calc(100dvh-2rem)] flex-col gap-8 self-start rounded-card bg-card px-4 py-6 max-[900px]:fixed max-[900px]:inset-x-2 max-[900px]:top-auto max-[900px]:bottom-2 max-[900px]:z-10 max-[900px]:h-auto max-[900px]:rounded-nav max-[900px]:p-2 max-[900px]:shadow-lift">
      <Logo className="px-3 max-[900px]:hidden" />
      <nav aria-label="Dasbor" className="flex flex-col gap-1 max-[900px]:w-full max-[900px]:flex-row max-[900px]:justify-around">
        {items.map(([label, Icon], i) => (
          <a key={label} href="/dashboard" aria-current={i === 0 ? 'page' : undefined} onClick={(e) => e.preventDefault()}
            className={cn('flex items-center gap-3 rounded-full px-3 py-2.5 text-base font-medium text-muted-foreground hover:text-foreground max-[900px]:flex-col max-[900px]:gap-0.5 max-[900px]:rounded-image max-[900px]:px-2.5 max-[900px]:py-2 max-[900px]:text-[11px] max-[900px]:leading-tight', i === 0 && 'bg-background text-foreground')}>
            <Icon size={20} strokeWidth={1.75} aria-hidden="true" />{label}
          </a>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-3 p-2 max-[900px]:hidden">
        <UserAvatar name="Dewi" tint="var(--sleep-lilac)" />
        <div className="mr-auto flex min-w-0 flex-col"><b className="text-sm leading-tight font-medium">Dewi Lestari</b><span className="text-xs text-muted-foreground">Studio Nusa</span></div>
        <Button asChild variant="secondary" size="icon" className="bg-background"><Link to="/masuk" aria-label="Keluar"><LogOut strokeWidth={1.75} aria-hidden="true" /></Link></Button>
      </div>
    </aside>
  )
}
