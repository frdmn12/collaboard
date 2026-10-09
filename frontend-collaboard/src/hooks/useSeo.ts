import { useEffect } from 'react'

export const SITE_URL = 'https://collaboard.timulabs.dev'
/** Sama dengan nilai statis di index.html (dibaca crawler yang tidak menjalankan JS). */
const DEFAULT_TITLE = 'Collaboard: papan kerja tim real-time'
const DEFAULT_DESCRIPTION = 'Atur tugas, pantau progres, dan lihat siapa mengerjakan apa dalam satu papan bersama. Perubahan tampil langsung untuk seluruh tim.'

type Seo = {
  /** Judul laman tanpa nama merek; kosong = judul bawaan beranda. */
  title?: string
  description?: string
  /** Path kanonis (mis. "/playground"). Kosong = tanpa canonical (laman privat/noindex). */
  path?: string
  /** Laman yang tidak perlu muncul di hasil pencarian (alur akun, aplikasi, 404). */
  noindex?: boolean
}

/** Ubah atau buat tag di <head>; value null = hapus tag. */
function setTag(tag: 'meta' | 'link', key: string, name: string, attr: string, value: string | null) {
  let el = document.head.querySelector(`${tag}[${key}="${name}"]`)
  if (value === null) return el?.remove()
  if (!el) { el = document.createElement(tag); el.setAttribute(key, name); document.head.append(el) }
  el.setAttribute(attr, value)
}

/**
 * Judul, deskripsi, canonical, dan robots per laman (SPA: index.html hanya punya nilai beranda).
 * Google menjalankan JS sehingga membaca nilai ini; pratinjau tautan media sosial tetap memakai nilai statis.
 */
export function useSeo({ title, description = DEFAULT_DESCRIPTION, path, noindex = false }: Seo = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} · Collaboard` : DEFAULT_TITLE
    const url = path === undefined ? null : SITE_URL + path
    document.title = fullTitle
    setTag('meta', 'name', 'description', 'content', description)
    setTag('meta', 'name', 'robots', 'content', noindex ? 'noindex' : null)
    setTag('meta', 'property', 'og:title', 'content', fullTitle)
    setTag('meta', 'property', 'og:description', 'content', description)
    setTag('meta', 'property', 'og:url', 'content', url)
    setTag('link', 'rel', 'canonical', 'href', url)
  }, [title, description, path, noindex])
}
