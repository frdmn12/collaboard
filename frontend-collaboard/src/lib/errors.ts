import { ApiError } from './api'

const messages: Record<string, string> = {
  EMAIL_ALREADY_REGISTERED: 'Email ini sudah terdaftar. Coba masuk, atau pakai email lain.',
  INVALID_CREDENTIALS: 'Email atau kata sandi salah.',
  EMAIL_NOT_VERIFIED: 'Email Anda belum diverifikasi. Cek kotak masuk Anda.',
  INVALID_OR_EXPIRED_TOKEN: 'Tautan verifikasi tidak valid atau sudah kedaluwarsa.',
  USER_NOT_FOUND: 'Belum ada akun dengan email itu. Minta mereka mendaftar dulu.',
  ALREADY_MEMBER: 'Orang ini sudah menjadi anggota papan.',
  INSUFFICIENT_BOARD_ROLE: 'Anda tidak punya izin untuk melakukan ini.',
  ASSIGNEE_NOT_MEMBER: 'Penanggung jawab harus anggota papan.',
  BOARD_NOT_FOUND: 'Proyek tidak ditemukan.',
  TASK_NOT_FOUND: 'Tugas tidak ditemukan.',
  NOT_COMMENT_AUTHOR: 'Hanya penulis yang bisa mengedit komentar.',
  COMMENT_NOT_FOUND: 'Komentar tidak ditemukan.',
  TOO_MANY_REQUESTS: 'Terlalu banyak percobaan. Tunggu semenit lalu coba lagi.',
  NETWORK_ERROR: 'Tidak dapat terhubung ke server. Pastikan backend berjalan.',
}

/** Pesan ramah dalam bahasa Indonesia untuk kesalahan API. */
export function errorMessage(err: unknown): string {
  if (err instanceof ApiError) return messages[err.code] ?? 'Terjadi kesalahan. Coba lagi sebentar lagi.'
  return 'Terjadi kesalahan. Coba lagi sebentar lagi.'
}

export const errorCode = (err: unknown) => (err instanceof ApiError ? err.code : null)
