import { addDays } from '@/lib/date'

export type Status = 'todo' | 'doing' | 'review' | 'done'
export type Task = { id: number; title: string; desc: string; tags: string[]; status: Status; pct: number; who: string; date: Date; pinned?: boolean; comments: number }

// Kelas Tailwind ditulis utuh agar terdeteksi; wash = warna status lembut di permukaan pucat.
export const statuses: { id: Status; name: string; dot: string; bar: string; wash: string; pct: number }[] = [
  { id: 'todo', name: 'Todo', dot: 'bg-status-todo', bar: 'bg-status-todo', wash: 'bg-status-todo/15', pct: 0 },
  { id: 'doing', name: 'Doing', dot: 'bg-status-doing', bar: 'bg-status-doing', wash: 'bg-status-doing/15', pct: 25 },
  { id: 'review', name: 'Review', dot: 'bg-status-review', bar: 'bg-status-review', wash: 'bg-status-review/25', pct: 90 },
  { id: 'done', name: 'Done', dot: 'bg-status-done', bar: 'bg-status-done', wash: 'bg-status-done/15', pct: 100 },
]

export const team = [
  { name: 'Dewi', tint: 'var(--sleep-lilac)' },
  { name: 'Raka', tint: 'var(--coral-signal)' },
  { name: 'Sari', tint: 'var(--sky-top)' },
  { name: 'Bima', tint: '#c8f0b8' },
]

// Contoh data; ganti dengan data dari API.
export const initialTasks: Task[] = [
  { id: 1, title: 'Susun brief kampanye peluncuran', desc: 'Target audiens, pesan utama, dan jadwal unggahan untuk dua minggu pertama.', tags: ['Konten', 'Kampanye'], status: 'todo', pct: 0, who: 'Sari', date: addDays(3), comments: 1 },
  { id: 2, title: 'Riset kompetitor fitur papan', desc: 'Bandingkan alur membuat papan dan undangan tim di lima produk sejenis.', tags: ['Riset'], status: 'todo', pct: 0, who: 'Bima', date: addDays(4), comments: 0 },
  { id: 3, title: 'Redesain alur onboarding', desc: 'Dari daftar sampai papan pertama dalam tiga langkah. Prototipe siap diuji Jumat.', tags: ['Desain', 'Produk'], status: 'doing', pct: 60, who: 'Dewi', date: addDays(5), pinned: true, comments: 4 },
  { id: 4, title: 'Catatan sprint planning', desc: 'Ringkasan keputusan, pemilik tugas, dan risiko untuk sprint berikutnya.', tags: ['Rapat'], status: 'doing', pct: 25, who: 'Raka', date: addDays(1), comments: 2 },
  { id: 5, title: 'Salinan halaman harga', desc: 'Tiga paket, satu kalimat per fitur. Menunggu tinjauan dari dua orang.', tags: ['Konten', 'Web'], status: 'review', pct: 90, who: 'Sari', date: addDays(0), comments: 6 },
  { id: 6, title: 'Setup notifikasi email', desc: 'Email undangan, tugas ditugaskan, dan ringkasan mingguan.', tags: ['Teknik'], status: 'done', pct: 100, who: 'Bima', date: addDays(-1), comments: 3 },
  { id: 7, title: 'Audit aksesibilitas', desc: 'Kontras, fokus keyboard, dan label formulir di semua laman utama.', tags: ['Kualitas', 'Web'], status: 'done', pct: 100, who: 'Dewi', date: addDays(-4), comments: 2 },
]

export const activity = [
  { who: 'Dewi', text: 'memindahkan "Setup notifikasi email" ke Done', when: '12 menit lalu' },
  { who: 'Sari', text: 'meminta review "Salinan halaman harga"', when: '1 jam lalu' },
  { who: 'Raka', text: 'berkomentar di "Redesain alur onboarding"', when: '3 jam lalu' },
  { who: 'Bima', text: 'menambahkan tugas "Riset kompetitor fitur papan"', when: 'Kemarin' },
]

export const tintOf = (name: string) => team.find((m) => m.name === name)?.tint ?? 'var(--cloud-card)'
export const nextStatus = (s: Status): Status | null => statuses[statuses.findIndex((x) => x.id === s) + 1]?.id ?? null
