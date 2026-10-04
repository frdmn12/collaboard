export type Member = { name: string; role: string; email: string; tint: string }

export const roles = ['Desainer', 'Manajer produk', 'Konten', 'Pengembang'] as const
export const tints = ['var(--sleep-lilac)', 'var(--coral-signal)', 'var(--sky-top)', '#c8f0b8']

// Contoh data; ganti dengan data API.
export const initialMembers: Member[] = [
  { name: 'Dewi', role: 'Desainer', email: 'dewi@studionusa.id', tint: tints[0] },
  { name: 'Raka', role: 'Manajer produk', email: 'raka@studionusa.id', tint: tints[1] },
  { name: 'Sari', role: 'Konten', email: 'sari@studionusa.id', tint: tints[2] },
  { name: 'Bima', role: 'Pengembang', email: 'bima@studionusa.id', tint: tints[3] },
]
