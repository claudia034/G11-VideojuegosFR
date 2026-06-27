import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, Bell, CalendarDays, Crown, GitBranch, Play, ShieldCheck, Sparkles, Trophy, Users } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'
import logo from '../assets/logo.svg'

const features = [
  { icon: GitBranch, title: 'Brackets vivos', text: 'Cruces, resultados y avances listos para seguir cada ronda.' },
  { icon: ShieldCheck, title: 'Panel admin', text: 'Gestiona torneos, reportes, pagos y aprobaciones desde un solo lugar.' },
  { icon: Users, title: 'Comunidad', text: 'Perfiles, ranking y notificaciones para mantener el lobby activo.' }
]

const liveMatches = [
  ['xShadow99', 'NovaX', '5 - 3'],
  ['PixelRush', 'VoltKai', '2 - 5'],
  ['Orion', 'Blaze', '4 - 4']
]

function ArenaPreview(){
  return (
    <div className="home-arena-preview" aria-hidden="true">
      <div className="home-preview-top">
        <span className="home-live-dot" />
        <span>Night Cup #12</span>
        <strong>LIVE</strong>
      </div>

      <div className="home-preview-grid">
        <div className="home-preview-panel home-preview-main">
          <div className="home-panel-header">
            <div>
              <span>Bracket</span>
              <strong>Semifinal</strong>
            </div>
            <Trophy className="h-5 w-5" />
          </div>

          <div className="home-mini-bracket">
            <div className="home-mini-round">
              <span>xShadow99</span>
              <span>NovaX</span>
            </div>
            <div className="home-mini-connector" />
            <div className="home-mini-round home-mini-winner">
              <Crown className="h-4 w-4" />
              <span>VoltKai</span>
            </div>
            <div className="home-mini-connector" />
            <div className="home-mini-round">
              <span>PixelRush</span>
              <span>Blaze</span>
            </div>
          </div>
        </div>

        <div className="home-preview-panel home-score-feed">
          <div className="home-panel-header">
            <div>
              <span>Actividad</span>
              <strong>Ahora</strong>
            </div>
            <Activity className="h-5 w-5" />
          </div>

          <div className="home-match-list">
            {liveMatches.map(([a, b, score]) => (
              <div key={`${a}-${b}`} className="home-match-row">
                <span>{a}</span>
                <small>{score}</small>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="home-preview-panel home-side-card">
          <CalendarDays className="h-5 w-5" />
          <strong>8:30 PM</strong>
          <span>Proxima partida</span>
        </div>

        <div className="home-preview-panel home-side-card">
          <Bell className="h-5 w-5" />
          <strong>12</strong>
          <span>Notificaciones</span>
        </div>
      </div>
    </div>
  )
}

export default function Landing(){
  return (
    <main className="home-page min-h-screen text-slate-100">
      <header className="home-nav">
        <Link to="/" className="home-brand">
          <img src={logo} alt="" />
          <span>NEXUS GG</span>
        </Link>

        <nav className="home-nav-actions">
          <ThemeToggle compact />
          <Link to="/login" className="home-login-link">Iniciar sesion</Link>
          <Link to="/signup" className="home-signup-link">Crear cuenta</Link>
        </nav>
      </header>

      <section className="home-hero">
        <div className="home-copy page-enter">
          <div className="home-kicker">
            <Sparkles className="h-4 w-4" />
            Torneos, rankings y comunidad en una sola arena
          </div>

          <h1>Convierte cada torneo en una experiencia competitiva.</h1>
          <p>
            Diseña brackets, controla inscripciones, acompaña partidas en vivo y entrega a jugadores y admins un lobby que se siente activo desde el primer clic.
          </p>

          <div className="home-actions">
            <Link to="/signup" className="home-primary-action">
              Comenzar ahora
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/bracket/t1" className="home-secondary-action">
              <Play className="h-5 w-5" />
              Ver demo de bracket
            </Link>
          </div>
        </div>

        <ArenaPreview />
      </section>

      <section className="home-feature-band" aria-label="Funciones principales">
        {features.map(({ icon: Icon, title, text }) => (
          <article key={title} className="home-feature-card">
            <Icon className="h-6 w-6" />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
