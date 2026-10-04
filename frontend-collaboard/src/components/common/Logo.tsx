import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import LogoMark from './LogoMark'

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5 text-lg font-medium tracking-[0.009em]', className)}>
      <LogoMark className="size-7" aria-hidden="true" />Collaboard
    </Link>
  )
}
