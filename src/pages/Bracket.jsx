import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GitBranch } from 'lucide-react'
import BracketCard from '../components/BracketCard'
import SectionBlock from '../components/SectionBlock'
import { tournamentService } from '../services/tournamentService'

export default function Bracket() {
  const { id } = useParams();
  const [t, setT] = useState(null);
  const [bracket, setBracket] = useState(null); 
  useEffect(() => {
    tournamentService.getById(id).then(setT);
    tournamentService.getBracketView(id).then(setBracket);
  }, [id]);

  return (
    <div className="space-y-4">
      <SectionBlock eyebrow="Bracket" title={t?.name || 'Cargando...'} icon={GitBranch}>
        {bracket ? (
          <BracketCard bracket={bracket} />
        ) : (
          <div className="p-8 text-center text-slate-500">Generando bracket...</div>
        )}
      </SectionBlock>
    </div>
  );
}
