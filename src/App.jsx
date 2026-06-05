import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tournaments from './pages/Tournaments'
import CreateTournament from './pages/CreateTournament'
import Ranking from './pages/Ranking'
import Bracket from './pages/Bracket'
import Profile from './pages/Profile'
import AdminProfile from './pages/AdminProfile'
import Notifications from './pages/Notifications'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/tournaments" element={<MainLayout><Tournaments /></MainLayout>} />
      <Route path="/tournaments/create" element={<MainLayout><CreateTournament /></MainLayout>} />
      <Route path="/ranking" element={<MainLayout><Ranking /></MainLayout>} />
      <Route path="/bracket/:id" element={<MainLayout><Bracket /></MainLayout>} />
      <Route path="/profile/:id" element={<MainLayout><Profile /></MainLayout>} />
      <Route path="/admin/profile" element={<MainLayout><AdminProfile /></MainLayout>} />
      <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
