import { useRef } from 'react'
import { useAuthMotion } from '@/hooks/useAuthMotion'
import Logo from '@/components/common/Logo'
import ThemeToggle from '@/components/common/ThemeToggle'
import AuthForm, { type Mode } from '@/components/auth/AuthForm'
import AuthPanel from '@/components/auth/AuthPanel'

export default function Auth({ mode }: { mode: Mode }) {
  const root = useRef<HTMLDivElement>(null)
  useAuthMotion(root, mode)
  return (
    <div ref={root} className="mx-auto grid min-h-dvh max-w-[1400px] grid-cols-2 gap-4 py-4 max-[900px]:grid-cols-1">
      <main className="flex min-w-0 flex-col px-2 pb-8">
        <header className="flex items-center justify-between"><Logo /><ThemeToggle /></header>
        <AuthForm mode={mode} />
      </main>
      <AuthPanel />
    </div>
  )
}
