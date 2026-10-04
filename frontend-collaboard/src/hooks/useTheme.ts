import { useState } from 'react'

const KEY = 'collaboard-theme'
const stored = () => { try { return localStorage.getItem(KEY) } catch { return null } }

/** Terapkan tema awal (pilihan tersimpan, atau mengikuti sistem) sebelum render. */
export function initTheme() {
  const t = stored() ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  document.documentElement.dataset.theme = t
}

/** Tema light/dark; disimpan di <html data-theme> dan localStorage. */
export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')
  const toggle = () => {
    const next = dark ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem(KEY, next) } catch { /* abaikan */ }
    setDark(!dark)
  }
  return [dark, toggle] as const
}
