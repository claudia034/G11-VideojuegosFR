import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User } from 'lucide-react'
import { playerService } from '../services/playerService'
import SectionBlock from '../components/SectionBlock'

export default function Profile(){
  const { id } = useParams()
  const [player, setPlayer] = useState(null)
  useEffect(()=>{ playerService.getById(id).then(setPlayer) },[id])

  return (
    <div className="space-y-4">
      <SectionBlock eyebrow="Perfil de usuario" title="Jugador" icon={User}>
        {player ? (
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="card">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#b65cff] to-[#38f8d4] text-2xl font-black text-black">{player.name.slice(0,2).toUpperCase()}</div>
                <div>
                  <div className="text-2xl font-black">{player.name}</div>
                  <div className="text-sm font-medium text-slate-500">{player.role} · {player.country}</div>
                  <div className="mt-2 rounded-full border border-[#38f8d4]/25 bg-[#38f8d4]/10 px-3 py-1 text-xs font-black uppercase text-[#38f8d4]">{player.rank}</div>
                </div>
              </div>
            </section>

            <section className="card">
              <div className="grid gap-3 sm:grid-cols-4">
                <div>
                  <div className="eyebrow">ELO</div>
                  <div className="mt-1 text-3xl font-black text-[#38f8d4]">{player.rating}</div>
                </div>
                <div>
                  <div className="eyebrow">Torneos</div>
                  <div className="mt-1 text-3xl font-black text-[#b65cff]">{player.tournamentsPlayed}</div>
                </div>
                <div>
                  <div className="eyebrow">Victorias</div>
                  <div className="mt-1 text-3xl font-black text-[#ff9f1c]">{player.wins}</div>
                </div>
                <div>
                  <div className="eyebrow">Premios</div>
                  <div className="mt-1 text-3xl font-black text-[#35d978]">${player.prizes}</div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="card">Cargando perfil...</div>
        )}
      </SectionBlock>
    </div>
  )
}
