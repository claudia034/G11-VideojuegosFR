import React, { useState } from 'react'

export default function CreateTournament(){
  const [form, setForm] = useState({name:'',game:'',participants:16,prize:0})
  const handle = (e)=> setForm({...form, [e.target.name]: e.target.value})
  const submit = (e)=>{e.preventDefault(); alert('Simulado: torneo creado ' + form.name)}

  return (
    <div className="space-y-4">
      <div>
        <div className="eyebrow">Admin</div>
        <h1 className="mt-1 text-2xl font-black">Crear Torneo</h1>
      </div>
      <form onSubmit={submit} className="card grid max-w-2xl gap-4">
        <label className="grid gap-2 text-sm font-bold text-slate-300">
          Nombre
          <input name="name" onChange={handle} placeholder="Night Cup #13" className="rounded-md border border-[#2d1747] bg-black/25 p-3 text-white outline-none focus:border-[#b65cff]" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-300">
          Juego
          <input name="game" onChange={handle} placeholder="Valorant" className="rounded-md border border-[#2d1747] bg-black/25 p-3 text-white outline-none focus:border-[#b65cff]" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-300">
            Participantes
            <input name="participants" type="number" onChange={handle} placeholder="16" className="rounded-md border border-[#2d1747] bg-black/25 p-3 text-white outline-none focus:border-[#b65cff]" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-300">
            Premio
            <input name="prize" type="number" onChange={handle} placeholder="120" className="rounded-md border border-[#2d1747] bg-black/25 p-3 text-white outline-none focus:border-[#b65cff]" />
          </label>
        </div>
        <button className="mt-2 w-fit rounded-md bg-[#b65cff] px-4 py-2 font-black text-white transition-colors hover:bg-[#a855f7]">Crear simulado</button>
      </form>
    </div>
  )
}
