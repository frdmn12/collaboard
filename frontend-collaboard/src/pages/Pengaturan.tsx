import { Link } from 'react-router'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Topbar from '@/components/dashboard/Topbar'
import SettingsSection from '@/components/settings/SettingsSection'
import ProfileForm from '@/components/settings/ProfileForm'
import ThemeChoice from '@/components/settings/ThemeChoice'
import NotificationList from '@/components/settings/NotificationList'
import PasswordForm from '@/components/settings/PasswordForm'

export default function Pengaturan() {
  return (
    <div className="flex flex-col gap-6">
      <Topbar title="Pengaturan" />
      <div className="flex flex-col gap-2">
        <h1 className="text-[clamp(32px,4.5vw,48px)] leading-none font-semibold tracking-[-0.03em]">Pengaturan</h1>
        <p className="text-lg text-muted-foreground">Atur profil, tampilan, dan pemberitahuan Anda.</p>
      </div>
      <SettingsSection title="Profil" desc="Nama dan email yang dilihat anggota tim lain."><ProfileForm /></SettingsSection>
      <SettingsSection title="Tampilan" desc="Pilih tema terang, gelap, atau ikuti pengaturan perangkat."><ThemeChoice /></SettingsSection>
      <SettingsSection title="Notifikasi" desc="Pilih kabar apa saja yang dikirim lewat email."><NotificationList /></SettingsSection>
      <SettingsSection title="Keamanan" desc="Gunakan kata sandi yang kuat dan unik."><PasswordForm /></SettingsSection>
      <SettingsSection title="Akun" desc="Keluar dari Collaboard di perangkat ini.">
        <Button asChild variant="secondary" className="self-start bg-background"><Link to="/masuk"><LogOut strokeWidth={1.75} aria-hidden="true" />Keluar</Link></Button>
      </SettingsSection>
    </div>
  )
}
