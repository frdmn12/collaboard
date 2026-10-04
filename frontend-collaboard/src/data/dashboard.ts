export type Status = 'todo' | 'doing' | 'review' | 'done'
export type Task = { id: number; title: string; status: Status; pct: number; who: string; due: string; pinned?: boolean; comments: number }

export const statuses: { id: Status; name: string; dot: string; bar: string; pct: number }[] = [
  { id: 'todo', bar: 'bg-status-todo', name: 'Todo', dot: 'bg-status-todo', pct: 0 },
  { id: 'doing', bar: 'bg-status-doing', name: 'Doing', dot: 'bg-status-doing', pct: 25 },
  { id: 'review', bar: 'bg-status-review', name: 'Review', dot: 'bg-status-review', pct: 90 },
  { id: 'done', bar: 'bg-status-done', name: 'Done', dot: 'bg-status-done', pct: 100 },
]

export const team = [
  { name: 'Dewi', tint: 'var(--sleep-lilac)' },
  { name: 'Raka', tint: 'var(--coral-signal)' },
  { name: 'Sari', tint: 'var(--sky-top)' },
  { name: 'Bima', tint: '#c8f0b8' },
]

// Contoh data; ganti dengan data dari API.
export const initialTasks: Task[] = [
  { id: 1, title: 'Susun brief kampanye peluncuran', status: 'todo', pct: 0, who: 'Sari', due: 'Rabu', comments: 1 },
  { id: 2, title: 'Riset kompetitor fitur papan', status: 'todo', pct: 0, who: 'Bima', due: 'Kamis', comments: 0 },
  { id: 3, title: 'Redesain alur onboarding', status: 'doing', pct: 60, who: 'Dewi', due: 'Jumat', pinned: true, comments: 4 },
  { id: 4, title: 'Catatan sprint planning', status: 'doing', pct: 25, who: 'Raka', due: 'Senin', comments: 2 },
  { id: 5, title: 'Salinan halaman harga', status: 'review', pct: 90, who: 'Sari', due: 'Hari ini', comments: 6 },
  { id: 6, title: 'Setup notifikasi email', status: 'done', pct: 100, who: 'Bima', due: 'Kemarin', comments: 3 },
  { id: 7, title: 'Audit aksesibilitas', status: 'done', pct: 100, who: 'Dewi', due: 'Selasa', comments: 2 },
]

export const activity = [
  { who: 'Dewi', text: 'memindahkan "Setup notifikasi email" ke Done', when: '12 menit lalu' },
  { who: 'Sari', text: 'meminta review "Salinan halaman harga"', when: '1 jam lalu' },
  { who: 'Raka', text: 'berkomentar di "Redesain alur onboarding"', when: '3 jam lalu' },
  { who: 'Bima', text: 'menambahkan tugas "Riset kompetitor fitur papan"', when: 'Kemarin' },
]

export const tintOf = (name: string) => team.find((m) => m.name === name)?.tint ?? 'var(--cloud-card)'
export const nextStatus = (s: Status): Status | null => statuses[statuses.findIndex((x) => x.id === s) + 1]?.id ?? null

export const navItems = ['Dasbor', 'Papan', 'Tim', 'Kalender', 'Pengaturan'] as const
