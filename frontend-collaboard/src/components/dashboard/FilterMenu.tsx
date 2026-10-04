import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { team } from '@/data/dashboard'

export default function FilterMenu({ who, onChange }: { who: string; onChange: (v: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary"><Filter strokeWidth={1.75} aria-hidden="true" />{who === 'semua' ? 'Filter' : who}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-image border-0 bg-popover p-2 shadow-lift">
        <DropdownMenuRadioGroup value={who} onValueChange={onChange}>
          <DropdownMenuRadioItem value="semua">Semua orang</DropdownMenuRadioItem>
          {team.map((m) => <DropdownMenuRadioItem key={m.name} value={m.name}>{m.name}</DropdownMenuRadioItem>)}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
