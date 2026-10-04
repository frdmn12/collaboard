import { useEffect, useRef, useState } from 'react'
import { LoaderCircle, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Task } from '@/data/dashboard'
import { useComments } from '@/hooks/useComments'
import { errorMessage } from '@/lib/errors'
import CommentComposer from './CommentComposer'
import CommentItem from './CommentItem'

/** Diskusi satu tugas: daftar (lama ke baru), muat lebih lama, dan kotak kirim. */
export default function CommentsPanel({ task }: { task: Task }) {
  const c = useComments(task)
  const [olderError, setOlderError] = useState('')
  const [loadingOlder, setLoadingOlder] = useState(false)
  const listEnd = useRef<HTMLDivElement>(null)
  const justLoaded = useRef(false)

  // Gulir ke komentar terbaru saat pertama dimuat atau setelah kirim; bukan saat memuat yang lama.
  useEffect(() => {
    if (c.state === 'ready' && !justLoaded.current) { justLoaded.current = true; listEnd.current?.scrollIntoView({ block: 'end' }) }
  }, [c.state])
  const send = async (body: string) => { await c.add(body); requestAnimationFrame(() => listEnd.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })) }
  const older = async () => {
    setLoadingOlder(true); setOlderError('')
    try { await c.loadOlder() } catch (err) { setOlderError(errorMessage(err)) } finally { setLoadingOlder(false) }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex max-h-[320px] min-h-24 flex-col gap-4 overflow-y-auto pr-1" aria-live="polite">
        {c.state === 'loading' && <div className="grid place-items-center py-8" role="status" aria-label="Memuat komentar"><LoaderCircle size={24} strokeWidth={1.75} className="animate-spin text-muted-foreground" aria-hidden="true" /></div>}
        {c.state === 'error' && <div role="alert" className="flex flex-col items-start gap-2 text-sm">Komentar tidak dapat dimuat.<Button type="button" variant="secondary" onClick={c.reload}>Coba lagi</Button></div>}
        {c.state === 'ready' && (<>
          {c.hasMore && <Button type="button" variant="ghost" className="self-center" onClick={older} disabled={loadingOlder}>{loadingOlder ? 'Memuat…' : 'Muat komentar lebih lama'}</Button>}
          {olderError && <p role="alert" className="text-center text-sm">{olderError}</p>}
          {c.items.length === 0
            ? <div className="flex flex-col items-center gap-2 py-6 text-center text-sm text-muted-foreground"><MessageSquare size={20} strokeWidth={1.75} aria-hidden="true" />Belum ada komentar. Mulai diskusi di bawah.</div>
            : <ul className="m-0 flex list-none flex-col gap-4 p-0">{c.items.map((x) => <CommentItem key={x.id} comment={x} onEdit={c.edit} onRemove={c.remove} />)}</ul>}
          <div ref={listEnd} />
        </>)}
      </div>
      <CommentComposer onSend={send} />
    </div>
  )
}
