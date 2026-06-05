export const players = [
  {
    id: 'p1',
    name: 'xShadow99',
    handle: 'Shadow',
    rating: 1847,
    rank: 'Platinum II',
    country: 'SV',
    role: 'Jugador',
    avatar: '',
    tournamentsPlayed: 23,
    wins: 9,
    winRate: 39,
    prizes: 240
  },
  { id: 'p2', name: 'NovaX', handle: 'Nova', rating: 1780, rank: 'Gold I', country: 'US', role: 'Jugador', avatar: '', tournamentsPlayed: 17, wins: 6, winRate: 35, prizes: 160 },
  { id: 'p3', name: 'Spectre', handle: 'Spectre', rating: 1710, rank: 'Gold II', country: 'BR', role: 'Jugador', avatar: '', tournamentsPlayed: 14, wins: 5, winRate: 36, prizes: 90 },
  { id: 'p4', name: 'Valkyr', handle: 'Valkyr', rating: 1650, rank: 'Silver III', country: 'SE', role: 'Jugador', avatar: '', tournamentsPlayed: 11, wins: 3, winRate: 27, prizes: 40 }
]

export const adminProfile = {
  id: 'a1',
  name: 'Admin Nexus',
  handle: 'NexusOps',
  role: 'Admin',
  permissions: ['Crear torneos', 'Gestionar brackets', 'Moderar jugadores', 'Publicar premios'],
  managedTournaments: 12,
  openReports: 3,
  pendingApprovals: 8,
  payoutQueue: 5
}
