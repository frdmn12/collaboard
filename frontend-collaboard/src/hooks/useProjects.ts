import { useState } from 'react'
import { initialProjects, type Project, type ProjectStatus } from '@/data/projects'
import { useTasks } from '@/hooks/useTasks'

/** Daftar proyek (di memori). Progres proyek "v2" dihitung dari tugas di papan. */
export function useProjects() {
  const { tasks, count } = useTasks()
  const [extra, setExtra] = useState<Project[]>([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<ProjectStatus | 'semua'>('semua')

  const all = [...initialProjects, ...extra].map((p) =>
    p.id === 'v2' ? { ...p, total: tasks.length, done: count('done'), progress: Math.round((count('done') / tasks.length) * 100) } : p)
  const q = query.trim().toLowerCase()
  const visible = all.filter((p) => (status === 'semua' || p.status === status) && (!q || `${p.name} ${p.desc}`.toLowerCase().includes(q)))

  const add = (name: string, desc: string) => setExtra((e) => [...e, {
    id: String(Date.now()), name, desc: desc || 'Belum ada deskripsi.', status: 'aktif', progress: 0, done: 0, total: 0, members: ['Dewi'], due: 'Belum ditentukan',
  }])

  return { all, visible, add, query, setQuery, status, setStatus }
}
