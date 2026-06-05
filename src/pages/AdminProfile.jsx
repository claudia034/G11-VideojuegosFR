import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Users, GitBranch, DollarSign } from 'lucide-react'
import { adminProfile } from '../data/players'
import SectionBlock from '../components/SectionBlock'

const metrics = [
  { label: 'Torneos gestionados', value: adminProfile.managedTournaments, icon: GitBranch, accent: 'text-[#b65cff]' },
  { label: 'Reportes abiertos', value: adminProfile.openReports, icon: Shield, accent: 'text-[#ff9f1c]' },
  { label: 'Aprobaciones', value: adminProfile.pendingApprovals, icon: Users, accent: 'text-[#38f8d4]' },
  { label: 'Pagos pendientes', value: adminProfile.payoutQueue, icon: DollarSign, accent: 'text-[#35d978]' }
]

export default function AdminProfile(){
  return (
    <div className="space-y-4">
      <SectionBlock eyebrow="Perfil admin" title="Administrador" icon={Shield}>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="card">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#ff9f1c] to-[#b65cff] text-2xl font-black text-black">AN</div>
              <div>
                <div className="text-2xl font-black">{adminProfile.name}</div>
                <div className="text-sm font-medium text-slate-500">@{adminProfile.handle}</div>
                <div className="mt-2 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-xs font-black uppercase text-[#ffbf69]">{adminProfile.role}</div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {adminProfile.permissions.map((permission) => (
                <span key={permission} className="rounded-md border border-[#2d1747] bg-black/20 px-3 py-1.5 text-xs font-bold text-slate-300">{permission}</span>
              ))}
            </div>

            <Link to="/tournaments/create" className="mt-5 inline-flex rounded-md bg-[#b65cff] px-4 py-2 text-sm font-black text-white hover:bg-[#a855f7]">
              Crear torneo
            </Link>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            {metrics.map(({ label, value, icon: Icon, accent }) => (
              <div key={label} className="card">
                <Icon className={`h-5 w-5 ${accent}`} />
                <div className={`mt-4 text-3xl font-black ${accent}`}>{value}</div>
                <div className="mt-1 text-xs font-bold uppercase text-slate-500">{label}</div>
              </div>
            ))}
          </section>
        </div>
      </SectionBlock>
    </div>
  )
}
