import React from 'react'
import { Bell, Trophy, Shield } from 'lucide-react'
import SectionBlock from '../components/SectionBlock'

const notifications = [
  { icon: Trophy, title: 'Bracket actualizado', text: 'Tu partida de Night Cup #12 esta programada para hoy a las 8:30 PM.', accent: 'text-[#b65cff]' },
  { icon: Bell, title: 'Inscripcion abierta', text: 'ELO Summit Semanal aun tiene cupos disponibles.', accent: 'text-[#38f8d4]' },
  { icon: Shield, title: 'Revision admin', text: 'Hay 3 reportes pendientes para moderacion.', accent: 'text-[#ff9f1c]' }
]

export default function Notifications(){
  return (
    <div className="space-y-4">
      <SectionBlock eyebrow="Centro" title="Notificaciones" icon={Bell}>
        <div className="grid gap-3">
          {notifications.map(({ icon: Icon, title, text, accent }) => (
            <article key={title} className="card flex items-start gap-4">
              <div className="rounded-lg border border-[#2d1747] bg-black/20 p-3">
                <Icon className={`h-5 w-5 ${accent}`} />
              </div>
              <div>
                <h2 className="font-black">{title}</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionBlock>
    </div>
  )
}
