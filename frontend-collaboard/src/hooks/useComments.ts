import { useCallback, useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { Task } from '@/data/dashboard'
import type { CommentPage, TaskComment } from '@/data/workspace'
import { useWorkspace } from '@/hooks/useWorkspace'

const PAGE = 20

/** Komentar satu tugas: muat terbaru, muat yang lebih lama, kirim, edit, hapus. Galat dilempar ke pemanggil. */
export function useComments(task: Pick<Task, 'id' | 'boardId'>) {
  const { bumpCommentCount } = useWorkspace()
  const base = `/boards/${task.boardId}/tasks/${task.id}/comments`
  const [items, setItems] = useState<TaskComment[]>([])
  const [nextBefore, setNextBefore] = useState<string | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')

  const load = useCallback(async () => {
    setState('loading')
    try {
      const page = await api<CommentPage>(`${base}?limit=${PAGE}`)
      setItems(page.items); setNextBefore(page.nextBefore); setState('ready')
    } catch {
      setState('error')
    }
  }, [base])

  useEffect(() => { void load() }, [load])

  return {
    items, state, hasMore: nextBefore !== null, reload: load,

    loadOlder: async () => {
      if (!nextBefore) return
      const page = await api<CommentPage>(`${base}?limit=${PAGE}&before=${encodeURIComponent(nextBefore)}`)
      setItems((cur) => [...page.items, ...cur]); setNextBefore(page.nextBefore)
    },

    add: async (body: string) => {
      const c = await api<TaskComment>(base, 'POST', { body })
      setItems((cur) => [...cur, c]); bumpCommentCount(task.id, 1)
    },

    edit: async (id: string, body: string) => {
      const c = await api<TaskComment>(`${base}/${id}`, 'PATCH', { body })
      setItems((cur) => cur.map((x) => (x.id === id ? c : x)))
    },

    remove: async (id: string) => {
      await api(`${base}/${id}`, 'DELETE')
      setItems((cur) => cur.filter((x) => x.id !== id)); bumpCommentCount(task.id, -1)
    },
  }
}
