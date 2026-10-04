export type ProjectStatus = 'aktif' | 'ditunda' | 'selesai'
export type Project = { id: string; name: string; desc: string; status: ProjectStatus; progress: number; done: number; total: number; members: string[]; due: string }

export const projectStatus: Record<ProjectStatus, { label: string; dot: string; bar: string }> = {
  aktif: { label: 'Aktif', dot: 'bg-status-doing', bar: 'bg-status-doing' },
  ditunda: { label: 'Ditunda', dot: 'bg-status-blocked', bar: 'bg-status-blocked' },
  selesai: { label: 'Selesai', dot: 'bg-status-done', bar: 'bg-status-done' },
}

// Contoh data; "v2" dihitung dari tugas di papan, sisanya statis. Ganti dengan data API.
export const initialProjects: Project[] = [
  { id: 'v2', name: 'Peluncuran aplikasi v2', desc: 'Onboarding baru, halaman harga, dan notifikasi email untuk rilis publik.', status: 'aktif', progress: 0, done: 0, total: 0, members: ['Dewi', 'Raka', 'Sari', 'Bima'], due: '30 Okt' },
  { id: 'brand', name: 'Penyegaran identitas merek', desc: 'Logo, palet warna, dan panduan tipografi untuk semua materi tim.', status: 'aktif', progress: 45, done: 9, total: 20, members: ['Dewi', 'Sari'], due: '15 Nov' },
  { id: 'docs', name: 'Pusat bantuan', desc: 'Panduan memulai, tanya jawab, dan artikel integrasi.', status: 'ditunda', progress: 20, done: 3, total: 15, members: ['Bima'], due: 'Belum ditentukan' },
  { id: 'q3', name: 'Laporan kuartal ketiga', desc: 'Ringkasan metrik tim dan retrospektif untuk manajemen.', status: 'selesai', progress: 100, done: 12, total: 12, members: ['Raka', 'Bima'], due: '30 Sep' },
]
