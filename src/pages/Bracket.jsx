import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GitBranch } from 'lucide-react'
import BracketCard from '../components/BracketCard'
import SectionBlock from '../components/SectionBlock'
import { tournamentService } from '../services/tournamentService'

export default function Bracket(){
  const { id } = useParams()
  const [t, setT] = useState(null)
  useEffect(()=>{ tournamentService.getById(id).then(setT) },[id])

  const bracketData = {
    champion: 'xShadow99',
    left: [
      [['xShadow99', 'NovaX'], ['Spectre', 'Valkyr'], ['RiftKing', 'Arceus'], ['Meta Knight', 'Link'], ['K. Dedede', 'Kirby'], ['Doom Slayer', 'Kratos'], ['Dante', 'Asura'], ['Bayonetta', 'Joker']],
      ['xShadow99', 'Valkyr', 'Link', 'Kirby'],
      ['xShadow99', 'Link'],
      ['xShadow99']
    ],
    right: [
      [['Steve', 'Valentina'], ['Megaman', 'Pit'], ['AstroBot', 'Sackboy'], ['Marth', 'Tarnished'], ['Banjo Kazooie', 'Crash Bandicoot'], ['Master Chief', 'Samus'], ['Raiden', 'Rayman'], ['Meatboy', 'Donkey Kong']],
      ['Steve', 'Megaman', 'AstroBot', 'Tarnished'],
      ['Megaman', 'AstroBot'],
      ['Megaman']
    ]
  }

  return (
    <div className="space-y-4">
      <SectionBlock eyebrow="Bracket" title={t?.name || 'Night Cup #12'} icon={GitBranch}>
        <BracketCard bracket={bracketData} />
      </SectionBlock>
    </div>
  )
}
