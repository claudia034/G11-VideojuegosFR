import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Workflow } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'
import api from '../services/axiosClient'

export default function Signup() {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setIsLoading(true)

    try {
      const response = await api.post('/auth/register', { 
        email, 
        username, 
        password, 
        confirmPassword 
      })
      
      const data = response.data.data

      navigate('/login', {
        state: {  successMsg: '¡Cuenta creada! Por favor, inicia sesión.'}
      })
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al crear la cuenta. Verifica tus datos.'
      setError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell min-h-screen bg-[#07070c] px-4 py-8 text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl justify-end">
        <ThemeToggle />
      </div>
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <section className="page-enter grid w-full overflow-hidden rounded-xl border border-[#2d1747] bg-[#0d0d14] shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-[#2d1747] bg-black/20 p-6 md:border-b-0 md:border-r md:p-8">
            <div className="flex items-center gap-3">
              <Workflow className="h-8 w-8 text-[#ff9f1c]" />
              <div className="text-2xl font-black tracking-[0.18em] text-[#b65cff]">NEXUS GG</div>
            </div>

            <div className="mt-12">
              <div className="eyebrow">Registro</div>
              <h1 className="mt-2 max-w-sm text-4xl font-black leading-tight">Crea tu cuenta de jugador</h1>
              <p className="mt-4 max-w-sm text-sm font-medium leading-6 text-slate-500">
                Únete a la plataforma para inscribirte en torneos, subir en el ranking y gestionar tus estadísticas.
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="grid gap-5 p-6 md:p-8">
            <label className="grid gap-2 text-sm font-bold text-slate-300">
              Correo Electrónico
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="rounded-md border border-[#2d1747] bg-black/25 p-3 text-white outline-none focus:border-[#b65cff]"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-300">
              Gamertag (Usuario)
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                className="rounded-md border border-[#2d1747] bg-black/25 p-3 text-white outline-none focus:border-[#b65cff]"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-300">
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="rounded-md border border-[#2d1747] bg-black/25 p-3 text-white outline-none focus:border-[#b65cff]"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-300">
              Confirmar Contraseña
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                className="rounded-md border border-[#2d1747] bg-black/25 p-3 text-white outline-none focus:border-[#b65cff]"
                required
              />
            </label>

            {error && (
              <div className="rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm font-bold text-red-300">
                {error}
              </div>
            )}

            <button 
              disabled={isLoading}
              className="rounded-md bg-[#b65cff] px-4 py-3 font-black text-white transition-colors hover:bg-[#a855f7] disabled:opacity-50"
            >
              {isLoading ? 'Conectando...' : 'Crear cuenta'}
            </button>

            <div className="text-center text-sm font-medium text-slate-400">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-[#b65cff] hover:underline">
                Inicia sesión
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}