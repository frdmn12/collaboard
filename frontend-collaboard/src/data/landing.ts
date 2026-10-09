import { siFigma, siGithub, siGmail, siGooglecalendar, siGoogledrive, siNotion } from 'simple-icons'

// Foto dari Unsplash (lisensi Unsplash). Tanpa `photo`, tile tampil sebagai blok warna.
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=440&h=587&q=80`
export type Story = { name: string; note: string; tint: string; photo?: string; alt?: string }

export const stories: Story[] = [
  { name: 'Studio Nusa', note: 'Rilis 3 proyek per bulan', tint: 'var(--sky-top)', photo: u('1742440711413-da7afb0f4930'), alt: 'Dua desainer berdiskusi di ruang kerja kayu' },
  { name: 'Tim Kopi', note: 'Jadwal 6 cabang, satu papan', tint: '#ebf0f8', photo: u('1604881991405-b273c7a4386a'), alt: 'Dua orang berdiskusi di meja kafe' },
  { name: 'Ruang Kerja', note: 'Rapat mingguan jadi 15 menit', tint: 'var(--sky-bottom)', photo: u('1603195827187-459ab02554a0'), alt: 'Tiga orang bekerja di satu laptop' },
  { name: 'Lab Grafis', note: 'Revisi klien tak lagi hilang', tint: 'var(--sleep-lilac)', photo: u('1581090690925-3898802525e2'), alt: 'Tim meninjau dokumen dan sampel warna' },
  { name: 'Warung Data', note: 'Laporan tanpa lembur', tint: 'var(--coral-signal)', photo: u('1578450671530-5b6a7c9f32a8'), alt: 'Sticky notes warna-warni' },
  { name: 'Kebun Kota', note: 'Relawan terkoordinasi', tint: '#c8f0b8', photo: u('1702047094974-a3475a6e37f5'), alt: 'Rekan kerja tersenyum melihat laptop' },
]

export const features = [
  { title: 'Progres', text: 'Lihat sejauh mana setiap papan berjalan, dari tugas pertama sampai rilis.', c: 'var(--recovery-green)', p: 82 },
  { title: 'Beban kerja', text: 'Bagi tugas dengan adil sebelum seseorang kewalahan.', c: 'var(--metric-blue)', p: 56 },
  { title: 'Review', text: 'Setiap permintaan tinjauan punya pemilik dan batas waktu.', c: 'var(--sleep-lilac)', p: 34 },
]

export const integrations = [siGooglecalendar, siGoogledrive, siGmail, siGithub, siFigma, siNotion].map((i) => ({ name: i.title, path: i.path }))

export const previewColumns = [
  { name: 'Doing', dot: 'bg-status-doing', tasks: [
    { title: 'Redesain alur onboarding', meta: 'Dewi · tenggat Jumat', pct: 60, tone: 'doing' as const },
    { title: 'Catatan sprint planning', meta: 'Raka · tenggat Senin', pct: 25, tone: 'doing' as const }] },
  { name: 'Review', dot: 'bg-status-review', tasks: [
    { title: 'Salinan halaman harga', meta: 'Sari · menunggu 2 orang', pct: 90, tone: 'review' as const }] },
  { name: 'Done', dot: 'bg-status-done', tasks: [
    { title: 'Setup notifikasi email', meta: 'Bima · selesai kemarin', pct: 100, tone: 'done' as const },
    { title: 'Audit aksesibilitas', meta: 'Dewi · selesai Selasa', pct: 100, tone: 'done' as const }] },
]

export const cursors = [
  { name: 'Dewi', bg: 'bg-lilac', fill: 'var(--sleep-lilac)' },
  { name: 'Raka', bg: 'bg-coral', fill: 'var(--coral-signal)' },
  { name: 'Sari', bg: 'bg-sky-top', fill: 'var(--sky-top)' },
]
