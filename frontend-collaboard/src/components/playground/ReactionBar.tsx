import { Button } from '@/components/ui/button'
import { reactions, type ReactionKind } from '@/data/playground'

export default function ReactionBar({ onReact, disabled }: { onReact: (k: ReactionKind) => void; disabled: boolean }) {
  return (
    <div role="group" aria-label="Kirim reaksi ke semua orang di ruang ini" className="flex flex-wrap items-center gap-2">
      <span className="mr-2 text-sm font-medium">Reaksi</span>
      {reactions.map(({ kind, label, Icon }) => (
        <Button key={kind} variant="secondary" size="icon" disabled={disabled} onClick={() => onReact(kind)} aria-label={label} title={label}>
          <Icon strokeWidth={1.75} aria-hidden="true" />
        </Button>
      ))}
    </div>
  )
}
