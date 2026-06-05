import React, { useEffect, useState } from 'react'
import { Calendar, Shield, Trophy, User } from 'lucide-react'
import { tournamentService } from '../services/tournamentService'
import { playerService } from '../services/playerService'
import StatCard from '../components/StatCard'
import TournamentCard from '../components/TournamentCard'
import MatchCard from '../components/MatchCard'
import SectionBlock from '../components/SectionBlock'

export default function Dashboard(){
  const [tournaments, setTournaments] = useState([])
  const [players, setPlayers] = useState([])
  const [matches, setMatches] = useState([])

  useEffect(()=>{
    tournamentService.list().then(setTournaments)
    playerService.list().then(setPlayers)
    tournamentService.getMatches('t1').then(setMatches)
  },[])

  const currentPlayer = players[0]
  const activeTournaments = tournaments.filter((t) => ['active', 'upcoming', 'soon'].includes(t.status))
  const nextMatch = matches[0]

  return (
    <div className="space-y-8">
      <SectionBlock eyebrow="Lobby" title="Resumen jugador" icon={User}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Mi Elo" value={currentPlayer?.rating || 1847} subtitle={currentPlayer?.rank || 'Platinum II'} accent="text-[#60e1cf]" />
          <StatCard title="Torneos Jugados" value={currentPlayer?.tournamentsPlayed || 23} subtitle="Esta temporada" accent="text-[#b65cff]" />
          <StatCard title="Victorias" value={currentPlayer?.wins || 9} subtitle={`${currentPlayer?.winRate || 39}% win rate`} accent="text-[#ff9f1c]" />
          <StatCard title="Premios" value={`$${currentPlayer?.prizes || 240}`} subtitle="Acumulados" accent="text-[#35d978]" />
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Competencia" title="Torneos activos" icon={Trophy}>
        <div className="grid gap-4 lg:grid-cols-3">
          {activeTournaments.map((t)=> <TournamentCard key={t.id} t={t} />)}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Agenda"
        title="Actividad del jugador"
        icon={Calendar}
        action={<span className="w-fit rounded border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase text-emerald-300">Hoy 8:30 PM</span>}
      >
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          {nextMatch && (
            <MatchCard
              match={{
                ...nextMatch,
                players: ['xShadow99', 'NovaX']
              }}
            />
          )}

          <article className="card">
            <div className="eyebrow">Perfil activo</div>
            <div className="mt-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#b65cff] to-[#38f8d4] text-xl font-black text-black">
              XS
            </div>
            <div>
              <div className="text-xl font-black">xShadow99</div>
              <div className="text-sm font-medium text-slate-500">Jugador · Platinum II</div>
            </div>
          </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-md border border-[#2d1747] bg-black/20 p-3">
              <div className="text-lg font-black text-[#38f8d4]">23</div>
              <div className="text-[11px] font-bold uppercase text-slate-500">Torneos</div>
            </div>
            <div className="rounded-md border border-[#2d1747] bg-black/20 p-3">
              <div className="text-lg font-black text-[#ff9f1c]">9</div>
              <div className="text-[11px] font-bold uppercase text-slate-500">Wins</div>
            </div>
            <div className="rounded-md border border-[#2d1747] bg-black/20 p-3">
              <div className="text-lg font-black text-[#35d978]">$240</div>
              <div className="text-[11px] font-bold uppercase text-slate-500">Premios</div>
            </div>
          </div>
          </article>
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Panel admin"
        title="Control de torneos"
        icon={Shield}
        action={<span className="w-fit rounded border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-xs font-black uppercase text-[#ffbf69]">Admin disponible</span>}
      >
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ['Torneos gestionados', '12'],
            ['Reportes abiertos', '3'],
            ['Aprobaciones', '8'],
            ['Pagos pendientes', '5']
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-[#2d1747] bg-black/20 p-3">
              <div className="text-2xl font-black text-white">{value}</div>
              <div className="mt-1 text-xs font-bold uppercase text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </SectionBlock>
    </div>
  )
}
