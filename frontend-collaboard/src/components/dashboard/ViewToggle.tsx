import { Columns3, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'

export type View = 'grid' | 'columns'
const opts: [View, string, typeof LayoutGrid][] = [['columns', 'Tampilan kolom', Columns3], ['grid', 'Tampilan kisi', LayoutGrid]]

export default function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  return (
    <div role="group" aria-label="Tampilan papan" className="flex rounded-full bg-secondary p-1">
      {opts.map(([id, label, Icon]) => (
        <button key={id} type="button" aria-label={label} aria-pressed={view === id} onClick={() => onChange(id)}
          className={cn('grid size-8 cursor-pointer place-items-center rounded-full text-muted-foreground', view === id && 'bg-background text-foreground')}>
          <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}
