import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { deviceTz, tzLabel } from '@/data/playground'

type Props = { sharing: boolean; disabled: boolean; onChange: (on: boolean) => Promise<boolean> }

/** Opt-in: perkiraan lokasi dari zona waktu perangkat, tampil di daftar online ruang ini. */
export default function LocationToggle({ sharing, disabled, onChange }: Props) {
  const [error, setError] = useState('')
  const tz = deviceTz()
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="share-location">Tampilkan lokasiku</Label>
        <Switch id="share-location" checked={sharing} disabled={disabled || !tz} aria-describedby="share-location-hint"
          onCheckedChange={async (on) => setError((await onChange(on)) ? '' : 'Belum tersimpan. Coba lagi sebentar.')} />
      </div>
      <p id="share-location-hint" className="text-sm">
        {tz ? <>Perkiraan dari zona waktu perangkatmu ({tzLabel(tz)}), bukan GPS. Tidak disimpan di server.</> : 'Zona waktu perangkatmu tidak terbaca.'}
      </p>
      {error && <p role="alert" className="text-sm">{error}</p>}
    </div>
  )
}
