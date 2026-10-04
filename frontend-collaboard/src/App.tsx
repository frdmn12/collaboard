import { Route, Routes } from 'react-router'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/masuk" element={<Auth mode="login" />} />
      <Route path="/daftar" element={<Auth mode="register" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
