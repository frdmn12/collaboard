import { statuses } from '@/data/dashboard'
import { Flame, Heart, PartyPopper, ThumbsUp, type LucideIcon } from 'lucide-react'

export type DemoStatus = 'doing' | 'review' | 'done'

/** Kartu papan demo (contoh). Id dan status awal harus sama dengan DEMO_TASKS di backend. */
export const demoTasks: { id: string; title: string; tag: string }[] = [
  { id: 't1', title: 'Rapikan halaman harga', tag: 'Desain' },
  { id: 't2', title: 'Tulis ulang email sambutan', tag: 'Konten' },
  { id: 't3', title: 'Uji alur daftar di HP', tag: 'QA' },
  { id: 't4', title: 'Ilustrasi kosong untuk papan', tag: 'Desain' },
  { id: 't5', title: 'Pasang analitik halaman', tag: 'Teknik' },
  { id: 't6', title: 'Kumpulkan masukan pengguna', tag: 'Riset' },
]

/** Kolom papan demo: status Collaboard tanpa Todo (warna dan nama dari data papan asli). */
export const demoColumns = statuses.filter((s): s is (typeof statuses)[number] & { id: DemoStatus } => s.id !== 'todo')

export type ReactionKind = 'like' | 'love' | 'fire' | 'party'
export const reactions: { kind: ReactionKind; label: string; Icon: LucideIcon }[] = [
  { kind: 'like', label: 'Jempol', Icon: ThumbsUp },
  { kind: 'love', label: 'Suka', Icon: Heart },
  { kind: 'fire', label: 'Keren', Icon: Flame },
  { kind: 'party', label: 'Rayakan', Icon: PartyPopper },
]

/** Nama ruang dari nomor dari server (1, 2, …). Lewat dari daftar, nama berulang dengan angka: "Bali 2". */
const roomNames = ['Bali', 'Lombok', 'Flores', 'Sumba', 'Komodo', 'Belitung', 'Bangka', 'Nias', 'Seram', 'Buton', 'Alor', 'Rote', 'Bintan', 'Banda', 'Ternate', 'Tidore']
export const roomName = (n: number) => {
  if (n < 1) return '…'
  const name = roomNames[(n - 1) % roomNames.length]
  const round = Math.floor((n - 1) / roomNames.length) + 1
  return round > 1 ? `${name} ${round}` : name
}

/** Zona waktu perangkat; tidak butuh izin, tapi hanya perkiraan kasar. */
export const deviceTz = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || null } catch { return null } }

const indonesia: Record<string, string> = { 'Asia/Jakarta': 'WIB', 'Asia/Pontianak': 'WIB', 'Asia/Makassar': 'WITA', 'Asia/Jayapura': 'WIT' }
/** Label lokasi dari zona waktu IANA: "Indonesia · WITA", atau nama kota zona ("Asia/Tokyo" = "Tokyo"). */
export const tzLabel = (tz: string) => indonesia[tz] ? `Indonesia · ${indonesia[tz]}` : tz.split('/').pop()!.replace(/_/g, ' ')
