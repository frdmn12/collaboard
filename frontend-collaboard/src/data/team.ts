/** Anggota papan (dari API). `role` adalah peran di papan, bukan jabatan. */
export type Member = { userId: string; name: string; email: string; role: 'admin' | 'member'; isOwner: boolean }

export const boardRoleLabel: Record<Member['role'], string> = { admin: 'Admin', member: 'Anggota' }

/** Daftar jabatan untuk pengaturan profil (disimpan lokal; belum ada API). */
export const roles = ['Desainer', 'Manajer produk', 'Konten', 'Pengembang'] as const
