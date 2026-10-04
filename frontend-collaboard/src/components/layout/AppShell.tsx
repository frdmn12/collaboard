import { Outlet } from 'react-router'
import Sidebar from '@/components/dashboard/Sidebar'

/** Kerangka laman aplikasi: sidebar datar di kiri, konten di kanan. */
export default function AppShell() {
  return (
    <div className="-mx-4 grid min-h-dvh grid-cols-[272px_minmax(0,1fr)] max-[900px]:grid-cols-1 max-[900px]:pb-24">
      <Sidebar />
      <main className="mx-auto flex w-full min-w-0 max-w-[1300px] flex-col gap-8 px-6 py-4 pb-12 max-[900px]:px-4">
        <Outlet />
      </main>
    </div>
  )
}
