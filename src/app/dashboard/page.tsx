import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Trophy, Clock, LogOut, Shield } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Aici în viitor vom prelua meciurile din baza de date
  // Pentru moment folosim date de test (mock data)
  const mockMatches = [
    { id: 1, homeTeam: 'Brazilia', awayTeam: 'Franța', time: '21:00', status: 'SCHEDULED' },
    { id: 2, homeTeam: 'Germania', awayTeam: 'Spania', time: '18:00', status: 'SCHEDULED' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar Dashboard */}
      <nav className="w-full bg-white shadow-sm border-b border-gray-100 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="text-brazuca-blue" size={24} />
            <span className="text-lg font-black text-brazuca-dark tracking-tight">CampionatPredictii</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/clans" className="flex items-center gap-2 text-sm font-bold text-brazuca-green hover:text-brazuca-green/80 transition-colors bg-brazuca-green/10 px-3 py-1.5 rounded-full">
              <Shield size={16} />
              <span>Clanurile Mele</span>
            </Link>
            <form action="/auth/signout" method="post">
              <button className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                <LogOut size={20} />
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full p-4 md:p-8">
        
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-brazuca-dark">Meciurile de Azi</h1>
            <p className="text-gray-500 font-medium mt-1">Fă predicții pentru meciurile de astăzi și câștigă puncte.</p>
          </div>
          <div className="bg-brazuca-blue text-white px-4 py-2 rounded-2xl shadow-lg shadow-brazuca-blue/20 flex items-center gap-2 w-fit">
            <span className="font-bold text-sm">Puncte totale:</span>
            <span className="text-xl font-black">12</span> {/* Placeholder points */}
          </div>
        </div>

        <div className="space-y-6">
          {mockMatches.map(match => (
            <div key={match.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-brazuca-blue"></div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-bold bg-gray-100 px-3 py-1 rounded-full">
                  <Clock size={14} />
                  Astăzi, {match.time}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-brazuca-orange bg-brazuca-orange/10 px-2 py-1 rounded-md">
                  Așteaptă predicție
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                
                {/* Home Team */}
                <div className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-20 h-20 bg-gray-50 rounded-full border-2 border-gray-100 flex items-center justify-center text-2xl shadow-inner">
                    🇧🇷
                  </div>
                  <span className="text-xl font-black text-brazuca-dark">{match.homeTeam}</span>
                </div>

                {/* Score Inputs */}
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <input type="number" min="0" max="20" placeholder="-" className="w-16 h-16 text-center text-2xl font-black bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brazuca-blue focus:border-brazuca-blue transition-all" />
                  <span className="text-gray-400 font-bold">:</span>
                  <input type="number" min="0" max="20" placeholder="-" className="w-16 h-16 text-center text-2xl font-black bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brazuca-blue focus:border-brazuca-blue transition-all" />
                </div>

                {/* Away Team */}
                <div className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-20 h-20 bg-gray-50 rounded-full border-2 border-gray-100 flex items-center justify-center text-2xl shadow-inner">
                    🇫🇷
                  </div>
                  <span className="text-xl font-black text-brazuca-dark">{match.awayTeam}</span>
                </div>

              </div>

              <div className="mt-8 flex justify-center">
                <button className="bg-brazuca-dark hover:bg-black text-white font-bold py-3 px-12 rounded-xl transition-all shadow-lg active:scale-95">
                  Salvează Predicția
                </button>
              </div>

            </div>
          ))}
        </div>

      </main>
    </div>
  )
}
