import { useState, type ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { Task } from '@/data/dashboard'
import { cn } from '@/lib/utils'
import CommentsPanel from './CommentsPanel'
import TaskEditForm from './TaskEditForm'

type Tab = 'detail' | 'komentar'

/** Dialog tugas dengan dua tab: Detail (edit) dan Komentar. Isi baru dipasang saat dibuka. */
export default function TaskEditDialog({ task, tab: initial = 'detail', children }: { task: Task; tab?: Tab; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>(initial)
  const tabs: [Tab, string][] = [['detail', 'Detail'], ['komentar', `Komentar${task.commentCount ? ` (${task.commentCount})` : ''}`]]

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (o) setTab(initial) }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="pr-10 text-2xl leading-tight font-semibold tracking-[-0.02em]">{task.title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">Perubahan disimpan ke proyek dan terlihat oleh semua anggota.</DialogDescription>
        </DialogHeader>
        <div role="tablist" aria-label="Bagian tugas" className="flex w-fit gap-1 rounded-full bg-secondary p-1">
          {tabs.map(([id, label]) => (
            <button key={id} id={`tab-${id}`} type="button" role="tab" aria-selected={tab === id} aria-controls={`panel-${id}`} onClick={() => setTab(id)}
              className={cn('cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground', tab === id && 'bg-background text-foreground')}>{label}</button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          {tab === 'detail' ? <TaskEditForm task={task} onDone={() => setOpen(false)} /> : <CommentsPanel task={task} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
