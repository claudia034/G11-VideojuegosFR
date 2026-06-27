import React, { useEffect, useState } from 'react'
import { Award } from 'lucide-react'
import { playerService } from '../services/playerService'
import PlayerCard from '../components/PlayerCard'
import SectionBlock from '../components/SectionBlock'

const getRankBadge = (eloScore) => {
  if (eloScore >= 1800) return 'Grandmaster 👑';
  if (eloScore >= 1500) return 'Diamante 💎';
  if (eloScore >= 1200) return 'Oro 🥇';
  if (eloScore >= 1000) return 'Plata 🥈';
  return 'Bronce 🥉';
}

export default function Ranking() {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(0); 
  const [hasMore, setHasMore] = useState(true); 

  useEffect(() => {
    playerService.getRanking(0).then(setPlayers);
  }, []);

  const loadMore = async () => {
    const nextPage = page + 1;
    const newPlayers = await playerService.getRanking(nextPage);

    if (newPlayers.length > 0) {
      setPlayers([...players, ...newPlayers]); 
      setPage(nextPage);
    } else {
      setHasMore(false); 
    }
  };

  const top3 = players.slice(0, 3);

  return (
    <div className="space-y-5">
      <SectionBlock eyebrow="Ranking" title="Top jugadores" icon={Award}>
        <div className="grid gap-4 md:grid-cols-3">
          {top3.map((p, index) => (
            <div key={p.playerId} className="card interactive-card text-center">
              <div className="eyebrow">Top {index + 1}</div>
              <div className="mt-2 text-2xl font-black">{p.username}</div>
              <div className="mt-1 text-sm font-medium text-slate-500">
                {getRankBadge(p.eloRating)}
              </div>
              <div className="mt-3 text-3xl font-black text-[#38f8d4]">{p.eloRating}</div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Clasificación" title="Ranking global">
        <div className="grid gap-3">
          {players.map(p => <PlayerCard key={p.playerId} player={p} />)}
        </div>
        
        {hasMore && players.length > 0 && (
          <button 
            onClick={loadMore}
            className="w-full mt-4 py-3 border border-[#2d1747] bg-black/20 hover:bg-[#b65cff]/10 hover:border-[#b65cff] transition-all font-black uppercase tracking-widest text-sm text-slate-400"
          >
            Cargar más jugadores
          </button>
        )}
      </SectionBlock>
    </div>
  )
}