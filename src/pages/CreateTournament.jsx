import React, { useState } from 'react'
import { Workflow, PlusCircle } from 'lucide-react'
import { tournamentService } from '../services/tournamentService'
import { useNavigate } from 'react-router-dom'

export default function CreateTournament() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', description: '', gameName: '', 
    format: 'SINGLE_ELIMINATION', maxParticipants: 16, 
    prize: 0, minElo: 0, maxElo: 3000,
    registrationStartAt: '', registrationEndAt: '', startAt: ''
  })

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    try {
      await tournamentService.create({ ...form, status: 'DRAFT' })
      alert('Torneo creado exitosamente')
      navigate('/dashboard')
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <main className="min-h-screen bg-[#07070c] px-4 py-12 text-slate-100">
      <div className="mx-auto w-full max-w-5xl">
        <section className="grid w-full overflow-hidden rounded-xl border border-[#2d1747] bg-[#0d0d14] shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:grid-cols-[0.8fr_1.2fr]">
          
          <div className="border-b border-[#2d1747] bg-black/20 p-8 md:border-b-0 md:border-r">
            <div className="flex items-center gap-3">
              <Workflow className="h-8 w-8 text-[#ff9f1c]" />
              <div className="text-2xl font-black tracking-[0.18em] text-[#b65cff]">NEXUS GG</div>
            </div>
            <div className="mt-12">
              <div className="eyebrow">Panel Admin</div>
              <h1 className="mt-2 text-4xl font-black leading-tight">Crear Nuevo Torneo</h1>
              <p className="mt-4 text-sm font-medium leading-6 text-slate-500">
                Configura los parámetros iniciales para tu competición. El torneo comenzará en estado de borrador (DRAFT).
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="grid gap-5 p-8">
            <div className="grid grid-cols-2 gap-4">
              <label className="grid gap-2 text-sm font-bold text-slate-300">
                Nombre del Torneo
                <input name="name" onChange={handle} className="rounded-md border border-[#2d1747] bg-black/25 p-3 outline-none focus:border-[#b65cff]" required />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-300">
                Juego
                <input name="gameName" onChange={handle} className="rounded-md border border-[#2d1747] bg-black/25 p-3 outline-none focus:border-[#b65cff]" required />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-bold text-slate-300">
              Formato
              <select name="format" onChange={handle} className="rounded-md border border-[#2d1747] bg-[#07070c] p-3 outline-none focus:border-[#b65cff]">
                <option value="SINGLE_ELIMINATION">Eliminatoria Simple</option>
                <option value="DOUBLE_ELIMINATION">Eliminatoria Doble</option>
                <option value="ROUND_ROBIN">Liga (Round Robin)</option>
              </select>
            </label>

            <div className="grid grid-cols-3 gap-4">
              <label className="grid gap-2 text-sm font-bold text-slate-300">
                Participantes
                <input name="maxParticipants" type="number" onChange={handle} className="rounded-md border border-[#2d1747] bg-black/25 p-3 outline-none focus:border-[#b65cff]" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-300">
                Elo Mínimo
                <input name="minElo" type="number" onChange={handle} className="rounded-md border border-[#2d1747] bg-black/25 p-3 outline-none focus:border-[#b65cff]" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-300">
                Premio ($)
                <input name="prize" type="number" onChange={handle} className="rounded-md border border-[#2d1747] bg-black/25 p-3 outline-none focus:border-[#b65cff]" />
              </label>
            </div>

            <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-[#b65cff] py-3 font-black text-white transition-colors hover:bg-[#a855f7]">
              <PlusCircle className="h-5 w-5" />
              Crear Torneo
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}