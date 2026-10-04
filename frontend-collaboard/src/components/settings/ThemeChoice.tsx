import SegmentedFilter from '@/components/common/SegmentedFilter'
import { useThemeMode, type ThemeMode } from '@/hooks/useTheme'

const options: [ThemeMode, string][] = [['light', 'Terang'], ['dark', 'Gelap'], ['system', 'Ikuti sistem']]

export default function ThemeChoice() {
  const [mode, setMode] = useThemeMode()
  return <SegmentedFilter label="Tema" value={mode} options={options} onChange={setMode} />
}
