import { stories } from '@/data/landing'
import StoryTile from './StoryTile'

export default function StoriesStrip() {
  return (
    <section id="cerita" className="py-10">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 data-m="reveal" className="text-display">Tim kecil, kerja besar.</h2>
        <p data-m="reveal" className="text-lead max-w-[36em]">Studio, kedai, dan lab yang berpindah dari spreadsheet ke satu papan bersama.</p>
      </div>
      <div data-m="strip" tabIndex={0} aria-label="Cerita tim" className="-mx-4 flex gap-4 overflow-x-auto px-4 py-10 [scrollbar-width:none] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {stories.map((s) => <StoryTile key={s.name} story={s} />)}
      </div>
    </section>
  )
}
