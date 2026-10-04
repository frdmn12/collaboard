import { useState } from 'react'
import { initialMembers, tints, type Member } from '@/data/team'
import { useTasks } from '@/hooks/useTasks'

/** Anggota tim (di memori) lengkap dengan beban kerja dari tugas di papan. */
export function useTeam() {
  const { tasks } = useTasks()
  const [added, setAdded] = useState<Member[]>([])
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('semua')

  const members = [...initialMembers, ...added].map((m) => ({
    ...m,
    active: tasks.filter((t) => t.who === m.name && t.status !== 'done').length,
    done: tasks.filter((t) => t.who === m.name && t.status === 'done').length,
  }))
  const q = query.trim().toLowerCase()
  const visible = members.filter((m) => (role === 'semua' || m.role === role) && (!q || `${m.name} ${m.email} ${m.role}`.toLowerCase().includes(q)))

  const invite = (name: string, email: string, r: string) =>
    setAdded((a) => [...a, { name, email, role: r, tint: tints[(initialMembers.length + a.length) % tints.length] }])

  return { members, visible, invite, query, setQuery, role, setRole }
}
