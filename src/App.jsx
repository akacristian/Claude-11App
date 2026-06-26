import { useState } from 'react'
import { useGame } from './hooks/useGameState.jsx'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import Flashcards from './components/Flashcards.jsx'
import Quiz from './components/Quiz.jsx'
import AllergyGuard from './components/AllergyGuard.jsx'
import MenuBrowser from './components/MenuBrowser.jsx'

const TABS = [
  { key: 'home', label: '🏠 Home' },
  { key: 'flash', label: '🃏 Flashcards' },
  { key: 'quiz', label: '❓ Quiz' },
  { key: 'guard', label: '🛡️ Allergy Guard' },
  { key: 'browser', label: '📖 Menu' },
]

export default function App() {
  const [tab, setTab] = useState('home')
  const g = useGame()

  return (
    <div className="bg-slate-100 text-slate-800 min-h-screen">
      {/* feedback flash overlay */}
      {g.flash && (
        <div className={`pointer-events-none fixed inset-0 z-50 animate-flash ${g.flash === 'good' ? 'bg-emerald-400' : 'bg-rose-500'}`} />
      )}

      <Header />

      <nav className="sticky top-[88px] z-30 bg-slate-100/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-2 flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((t) => {
            const on = t.key === tab
            return (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 ${on ? 'border-emerald-500 text-slate-900' : 'border-transparent text-slate-500'}`}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-5 pb-24">
        {tab === 'home' && <Home onNavigate={setTab} />}
        {tab === 'flash' && <Flashcards />}
        {tab === 'quiz' && <Quiz />}
        {tab === 'guard' && <AllergyGuard />}
        {tab === 'browser' && <MenuBrowser />}
      </main>
    </div>
  )
}
