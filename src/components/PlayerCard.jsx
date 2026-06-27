import React from 'react';

export default function PlayerCard({ player }) {
  if (!player) return null;

  const username = player.username ?? 'Player';
  const elo = player.eloRating ?? 0;
  const wins = player.wins ?? 0;
  const losses = player.losses ?? 0;

  const initials = username.slice(0, 2).toUpperCase();

  const getRankBadge = (eloScore) => {
    if (eloScore >= 1800) return 'Grandmaster 👑';
    if (eloScore >= 1500) return 'Diamante 💎';
    if (eloScore >= 1200) return 'Oro 🥇';
    if (eloScore >= 1000) return 'Plata 🥈';
    return 'Bronce 🥉';
  };

  return (
    <div className="card interactive-card flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#b65cff] to-[#38f8d4] text-sm font-black text-black">
          {initials}
        </div>

        <div>
          <div className="font-black">{username}</div>
          <div className="text-xs text-slate-500">
            {wins} Victorias • {losses} Derrotas
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-lg font-black text-[#38f8d4]">
          {elo}
        </div>

        <div className="text-[10px] font-bold text-slate-500">
          {getRankBadge(elo)}
        </div>
      </div>
    </div>
  );
}