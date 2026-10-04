import { previewColumns } from '@/data/landing'
import MiniTask from '@/components/common/MiniTask'
import UserAvatar from '@/components/common/UserAvatar'
import PresenceCursors from './PresenceCursors'

export default function BoardPreview() {
  return (
    <div data-m="board" role="img" aria-label="Contoh papan Collaboard dengan tiga kolom: Doing, Review, Done" className="force-light relative mt-12 w-full max-w-[960px] rounded-t-card bg-background px-6 pt-6 text-left text-foreground shadow-lift">
      <PresenceCursors />
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <h3 className="text-2xl font-semibold tracking-[-0.01em]">Peluncuran aplikasi v2</h3>
        <div className="flex -space-x-2">
          <UserAvatar name="Dewi" tint="var(--sleep-lilac)" className="ring-2 ring-background" />
          <UserAvatar name="Raka" tint="var(--coral-signal)" className="ring-2 ring-background" />
          <UserAvatar name="Bima" tint="#c8f0b8" className="ring-2 ring-background" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 max-[760px]:grid-cols-1">
        {previewColumns.map((col) => (
          <div key={col.name} className="flex min-h-[230px] min-w-0 flex-col gap-2 rounded-t-card bg-card p-4 max-[760px]:min-h-0">
            <h4 className="mb-1 flex items-center gap-2 text-base leading-snug font-medium">
              <span className={`size-2.5 rounded-full ${col.dot}`} aria-hidden="true" />{col.name}
            </h4>
            {col.tasks.map((t) => <MiniTask key={t.title} {...t} />)}
          </div>
        ))}
      </div>
    </div>
  )
}
