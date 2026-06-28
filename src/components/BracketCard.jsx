import React from 'react'
import { Trophy } from 'lucide-react'

const CANVAS_WIDTH = 1040
const CANVAS_HEIGHT = 600
const NODE_WIDTH = 122
const CHAMPION_WIDTH = 120
const ROUND_X = {
  left: [62, 190, 310, 390],
  right: [978, 850, 730, 670]
}
const Y_BY_COUNT = {
  1: [296],
  2: [168, 424],
  4: [104, 232, 360, 488],
  8: [72, 136, 200, 264, 328, 392, 456, 520]
}
const CHAMPION = { x: 520, y: 296 }

function toPlayers(item) {
  return Array.isArray(item) ? item : [item]
}

function containsPlayer(item, player) {
  return toPlayers(item).includes(player)
}

function winnerFor(item, nextRound, champion) {
  const players = toPlayers(item)
  if (players.includes(champion)) return champion
  if (!nextRound) return players[0]
  return players.find((player) => nextRound.some((nextItem) => containsPlayer(nextItem, player))) || ''
}

function buildNodes(rounds, side, champion) {
  return rounds.flatMap((round, roundIndex) => {
    const yValues = Y_BY_COUNT[round.length] || Y_BY_COUNT[1]
    return round.map((item, itemIndex) => ({
      id: `${side}-${roundIndex}-${itemIndex}`,
      side,
      roundIndex,
      itemIndex,
      players: toPlayers(item),
      winner: winnerFor(item, rounds[roundIndex + 1], champion),
      x: ROUND_X[side][roundIndex],
      y: yValues[itemIndex] || yValues[0]
    }))
  })
}

function edgeX(node, direction) {
  return direction === 'right' ? node.x + NODE_WIDTH / 2 : node.x - NODE_WIDTH / 2
}

function elbowPath(from, to, side) {
  const fromX = edgeX(from, side === 'left' ? 'right' : 'left')
  const toX = edgeX(to, side === 'left' ? 'left' : 'right')
  const middleX = (fromX + toX) / 2
  return `M ${fromX} ${from.y} H ${middleX} V ${to.y} H ${toX}`
}

function centerPath(node, side) {
  if (side === 'left') {
    const fromX = node.x + NODE_WIDTH / 2
    const toX = CHAMPION.x - CHAMPION_WIDTH / 2
    return `M ${fromX} ${node.y} H ${toX}`
  }
  const fromX = node.x - NODE_WIDTH / 2
  const toX = CHAMPION.x + CHAMPION_WIDTH / 2
  return `M ${fromX} ${node.y} H ${toX}`
}

function buildPaths(nodes, side) {
  const paths = []
  const rounds = [...new Set(nodes.map((node) => node.roundIndex))]

  rounds.slice(0, -1).forEach((roundIndex) => {
    const current = nodes.filter((node) => node.roundIndex === roundIndex)
    const next = nodes.filter((node) => node.roundIndex === roundIndex + 1)

    current.forEach((node) => {
      const parent = next[Math.floor(node.itemIndex / 2)]
      if (parent) paths.push({ id: `${node.id}-to-${parent.id}`, d: elbowPath(node, parent, side), side })
    })
  })

  const finalist = nodes.find((node) => node.roundIndex === rounds.length - 1)
  if (finalist) paths.push({ id: `${side}-final-center`, d: centerPath(finalist, side), side, final: true })

  return paths
}

function BracketNode({ node }) {
  return (
    <div
      className={`bracket-node ${node.winner ? 'bracket-node-winner' : ''}`}
      style={{ left: node.x, top: node.y }}
    >
      {node.players.map((player) => (
        <div key={`${node.id}-${player}`} className={`bracket-node-player ${player === node.winner ? 'bracket-node-player-winner' : ''}`}>
          {player}
        </div>
      ))}
    </div>
  )
}

function RoundLabels() {
  return (
    <>
      {ROUND_X.left.map((x, index) => (
        <div key={`left-${index}`} className="bracket-round-label" style={{ left: x }}>R{index + 1}</div>
      ))}
      {ROUND_X.right.map((x, index) => (
        <div key={`right-${index}`} className="bracket-round-label" style={{ left: x }}>{index === 3 ? 'Final' : `R${index + 1}`}</div>
      ))}
    </>
  )
}

function BracketDisplay({ data }) {
  const leftRounds = data.left || []
  const rightRounds = data.right || []
  const leftNodes = buildNodes(leftRounds, 'left', data.champion)
  const rightNodes = buildNodes(rightRounds, 'right', data.champion)
  const paths = [...buildPaths(leftNodes, 'left'), ...buildPaths(rightNodes, 'right')]

  return (
    <section className="card interactive-card overflow-hidden p-0">
      <div className="flex items-center justify-between gap-3 border-b border-[#2d1747] px-4 py-4">
        <div>
          <div className="eyebrow">Mi Bracket</div>
          <h2 className="mt-1 text-xl font-black">Ruta al campeonato</h2>
        </div>
        <div className="rounded-full border border-[#b65cff]/25 bg-[#b65cff]/10 p-2 text-[#b65cff]">
          <Trophy className="h-5 w-5" />
        </div>
      </div>

      <div className="bracket-viewport">
        <div className="bracket-canvas">
          <svg className="bracket-lines" viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} aria-hidden="true">
            {paths.map((path) => (
              <path key={path.id} d={path.d} className={`bracket-line ${path.side === 'right' ? 'bracket-line-right' : ''} ${path.final ? 'bracket-line-final' : ''}`} />
            ))}
          </svg>
          <RoundLabels />
          {[...leftNodes, ...rightNodes].map((node) => <BracketNode key={node.id} node={node} />)}
          <div className="bracket-center" style={{ left: CHAMPION.x, top: CHAMPION.y }}>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Campeon</div>
            <Trophy className="my-2 h-5 w-5 text-[#ff9f1c]" />
            <div className="bracket-champion">{data.champion || 'Por definir'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default function BracketCard({ bracket }) {
  if (!bracket) {
    return <div className="p-8 text-center text-slate-500">Sin datos de bracket.</div>
  }
  return <BracketDisplay data={bracket} />
}
