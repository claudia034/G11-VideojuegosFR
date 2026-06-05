import React, { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'
import { tournamentService } from '../services/tournamentService'
import TournamentCard from '../components/TournamentCard'
import SectionBlock from '../components/SectionBlock'

export default function Tournaments(){
  const [list, setList] = useState([])
  useEffect(()=>{ tournamentService.list().then(setList) },[])

  return (
    <div className="space-y-4">
      <SectionBlock eyebrow="Lobby" title="Torneos disponibles" icon={Trophy}>
        <div className="grid gap-4 md:grid-cols-3">
          {list.map(t => <TournamentCard key={t.id} t={t} />)}
        </div>
      </SectionBlock>
    </div>
  )
}
