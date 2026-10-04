import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'

export default function ThemeToggle({ className }: { className?: string }) {
  const [dark, toggle] = useTheme()
  return (
    <Button variant="secondary" size="icon" className={className} onClick={toggle} aria-label="Ganti tema">
      {dark ? <Sun strokeWidth={1.75} aria-hidden="true" /> : <Moon strokeWidth={1.75} aria-hidden="true" />}
    </Button>
  )
}
