import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { api } from '@/lib/api'
import { errorMessage } from '@/lib/errors'
import { nextStatus, statuses, type Status, type Task } from '@/data/dashboard'
import type { Member } from '@/data/team'
import { toTask, type ApiTask, type Board } from '@/data/workspace'

const KEY = 'collaboard-board'
const stored = () => { try { return localStorage.getItem(KEY) } catch { return null } }
const progressFor = (s: Status) => statuses.find((x) => x.id === s)!.pct

type Load = 'loading' | 'ready' | 'error'

function useWorkspaceState() {
  const [boards, setBoards] = useState<Board[]>([])
  const [load, setLoad] = useState<Load>('loading')
  const [boardId, setBoardId] = useState<string | null>(stored)
  const [tasks, setTasksState] = useState<Task[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [pinned, setPinned] = useState<Task[]>([])
  const [notice, setNotice] = useState<string | null>(null)
  const tasksRef = useRef<Task[]>([])

  const setTasks = useCallback((next: Task[]) => { tasksRef.current = next; setTasksState(next) }, [])
  const fail = (err: unknown) => setNotice(errorMessage(err))

  const activeId = boards.find((b) => b.id === boardId)?.id ?? boards[0]?.id ?? null
  const board = boards.find((b) => b.id === activeId) ?? null

  const refreshBoards = useCallback(async () => {
    const list = await api<Board[]>('/boards')
    setBoards(list)
    return list
  }, [])

  const loadBoardData = useCallback(async (id: string) => {
    const [t, m] = await Promise.all([api<ApiTask[]>(`/boards/${id}/tasks`), api<Member[]>(`/boards/${id}/members`)])
    setTasks(t.map(toTask))
    setMembers(m)
  }, [setTasks])

  const refreshPinned = useCallback(async () => {
    setPinned((await api<ApiTask[]>('/tasks/pinned')).map(toTask))
  }, [])

  useEffect(() => {
    let active = true
    Promise.all([refreshBoards(), refreshPinned()])
      .then(() => active && setLoad('ready'))
      .catch((err) => { if (active) { setLoad('error'); fail(err) } })
    return () => { active = false }
  }, [refreshBoards, refreshPinned])

  useEffect(() => {
    if (!activeId) { setTasks([]); setMembers([]); return }
    let active = true
    loadBoardData(activeId).catch((err) => active && fail(err))
    return () => { active = false }
  }, [activeId, loadBoardData, setTasks])

  const reload = () => (activeId ? loadBoardData(activeId) : Promise.resolve())
  const replace = (t: Task) => {
    setTasks(tasksRef.current.map((x) => (x.id === t.id ? t : x)))
    setPinned((p) => (t.pinned ? (p.some((x) => x.id === t.id) ? p.map((x) => (x.id === t.id ? t : x)) : [t, ...p]) : p.filter((x) => x.id !== t.id)))
  }

  /** Kirim posisi akhir tugas ke server; pada gagal, tarik ulang data agar UI tidak berbohong. */
  const commitMove = async (id: string) => {
    const list = tasksRef.current
    const task = list.find((t) => t.id === id)
    if (!task || !activeId) return
    const position = list.filter((t) => t.status === task.status).findIndex((t) => t.id === id)
    try {
      replace(toTask(await api<ApiTask>(`/boards/${activeId}/tasks/${id}/move`, 'POST', { status: task.status, position })))
      void refreshBoards()
    } catch (err) {
      fail(err); await reload().catch(() => undefined)
    }
  }

  return {
    boards, board, boardId: activeId, load, tasks, members, pinned, notice, dismissNotice: () => setNotice(null),
    selectBoard: (id: string) => { setBoardId(id); try { localStorage.setItem(KEY, id) } catch { /* abaikan */ } },
    refreshBoards,

    createBoard: async (name: string, description: string) => {
      const created = await api<Board>('/boards', 'POST', { name, ...(description && { description }) })
      await refreshBoards()
      setBoardId(created.id)
      try { localStorage.setItem(KEY, created.id) } catch { /* abaikan */ }
      return created
    },

    addTask: async (title: string, status: Status, date?: Date | null) => {
      if (!activeId) return
      try {
        const t = toTask(await api<ApiTask>(`/boards/${activeId}/tasks`, 'POST', { title, status, ...(date && { dueDate: date.toISOString() }) }))
        setTasks([...tasksRef.current, t])
        void refreshBoards()
      } catch (err) { fail(err) }
    },

    /** Geser kolom saat drag: hanya lokal; server diberi tahu lewat commitMove saat dilepas. */
    reorder: (groups: Record<string, (string | number)[]>) => {
      const byId = new Map(tasksRef.current.map((t) => [t.id, t]))
      const shown = new Set(Object.values(groups).flat().map(String))
      setTasks(statuses.flatMap((s) => [
        ...(groups[s.id] ?? []).map((id) => ({ ...byId.get(String(id))!, status: s.id })),
        ...tasksRef.current.filter((t) => t.status === s.id && !shown.has(t.id)),
      ]))
    },
    commitMove,
    restore: (snapshot: Task[]) => setTasks(snapshot),

    /** Pindah ke status berikutnya (tombol panah), di akhir kolom tujuan. */
    advance: async (id: string) => {
      const task = tasksRef.current.find((t) => t.id === id)
      const next = task && nextStatus(task.status)
      if (!task || !next || !activeId) return
      const rest = tasksRef.current.filter((t) => t.id !== id)
      setTasks(statuses.flatMap((s) => [...rest.filter((t) => t.status === s.id), ...(s.id === next ? [{ ...task, status: next, pct: Math.max(task.pct, progressFor(next)) }] : [])]))
      await commitMove(id)
    },

    togglePin: async (task: Task) => {
      const on = !task.pinned
      replace({ ...task, pinned: on })
      try {
        await api(`/boards/${task.boardId}/tasks/${task.id}/pin`, on ? 'PUT' : 'DELETE')
      } catch (err) {
        fail(err); replace(task)
      }
    },

    assign: async (task: Task, assigneeId: string | null) => {
      try { replace(toTask(await api<ApiTask>(`/boards/${task.boardId}/tasks/${task.id}`, 'PATCH', { assigneeId }))) } catch (err) { fail(err) }
    },

    /** Sinkronkan jumlah komentar di kartu setelah komentar dibuat atau dihapus. */
    bumpCommentCount: (taskId: string, delta: number) => {
      const bump = (t: Task) => (t.id === taskId ? { ...t, commentCount: Math.max(0, t.commentCount + delta) } : t)
      setTasks(tasksRef.current.map(bump))
      setPinned((p) => p.map(bump))
    },

    /** Simpan perubahan tugas; melempar galat agar form bisa menampilkannya. */
    updateTask: async (task: Task, patch: { title: string; description: string; tags: string[]; dueDate: Date | null; assigneeId: string | null; progress: number }) => {
      const updated = toTask(await api<ApiTask>(`/boards/${task.boardId}/tasks/${task.id}`, 'PATCH', {
        title: patch.title,
        description: patch.description || null,
        tags: patch.tags,
        dueDate: patch.dueDate ? patch.dueDate.toISOString() : null,
        assigneeId: patch.assigneeId,
        progress: patch.progress,
      }))
      replace(updated)
      void refreshBoards()
    },

    removeTask: async (task: Task) => {
      await api(`/boards/${task.boardId}/tasks/${task.id}`, 'DELETE')
      setTasks(tasksRef.current.filter((t) => t.id !== task.id))
      setPinned((p) => p.filter((t) => t.id !== task.id))
      void refreshBoards()
    },

    addMember: async (email: string, role: Member['role']) => {
      if (!activeId) return
      await api(`/boards/${activeId}/members`, 'POST', { email, role })
      setMembers(await api<Member[]>(`/boards/${activeId}/members`))
      void refreshBoards()
    },
  }
}

const Ctx = createContext<ReturnType<typeof useWorkspaceState> | null>(null)

/** Data kerja milik pengguna yang masuk: papan, tugas papan aktif, anggota, dan tugas tersemat. */
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  return <Ctx.Provider value={useWorkspaceState()}>{children}</Ctx.Provider>
}

export function useWorkspace() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useWorkspace harus dipakai di dalam WorkspaceProvider')
  return v
}
