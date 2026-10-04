import { Route, Routes } from 'react-router'
import { TasksProvider } from './hooks/useTasks'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Papan from './pages/Papan'
import Disematkan from './pages/Disematkan'
import Proyek from './pages/Proyek'
import Tim from './pages/Tim'
import Kalender from './pages/Kalender'
import Pengaturan from './pages/Pengaturan'
import { ProfileProvider } from './hooks/useProfile'
import AppShell from './components/layout/AppShell'

export default function App() {
  return (
    <ProfileProvider>
    <TasksProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/masuk" element={<Auth mode="login" />} />
        <Route path="/daftar" element={<Auth mode="register" />} />
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/papan" element={<Papan />} />
          <Route path="/pengaturan" element={<Pengaturan />} />
          <Route path="/kalender" element={<Kalender />} />
          <Route path="/tim" element={<Tim />} />
          <Route path="/proyek" element={<Proyek />} />
          <Route path="/disematkan" element={<Disematkan />} />
        </Route>
        <Route path="*" element={<Landing />} />
      </Routes>
    </TasksProvider>
    </ProfileProvider>
  )
}
