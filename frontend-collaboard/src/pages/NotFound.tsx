import { useSeo } from '@/hooks/useSeo'
import Landing from './Landing'

/** URL tak dikenal: tetap tampilkan beranda, tapi minta mesin pencari tidak mengindeksnya (hindari soft 404 duplikat). */
export default function NotFound() {
  useSeo({ title: 'Halaman tidak ditemukan', noindex: true })
  return <Landing />
}
