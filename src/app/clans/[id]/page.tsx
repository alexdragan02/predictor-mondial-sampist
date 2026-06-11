import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Users, Copy, Trophy, Medal } from 'lucide-react'

export default async function ClanDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const clanId = resolvedParams.id
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Fetch Clan details
  const { data: clan, error: clanError } = await supabase
    .from('clans')
    .select('*')
    .eq('id', clanId)
    .single()

  if (clanError || !clan) {
    redirect('/clans')
  }

  // 2. Verifica daca user-ul face parte din acest clan
  const { data: isMember } = await supabase
    .from('clan_members')
    .select('id')
    .eq('clan_id', clanId)
    .eq('user_id', user.id)
    .single()

  if (!isMember) {
    redirect('/clans') // Daca nu e membru, il trimitem inapoi
  }

  // 3. Fetch Leaderboard (Membrii + Punctele lor totale)
  // Aceasta interogare foloseste relatiile din Supabase
  const { data: members, error: memErr } = await supabase
    .from('clan_members')
    .select(`
      user_id,
      profiles (email),
      predictions (points_awarded)
    `)
    .eq('clan_id', clanId)

  // Procesam datele pentru a calcula punctajul total
  const leaderboard = (members || []).map((m: any) => {
    // Calculam suma punctelor
    const totalPoints = m.predictions?.reduce((sum: number, p: any) => sum + (p.points_awarded || 0), 0) || 0
    return {
      userId: m.user_id,
      email: m.profiles?.email || 'User necunoscut',
      points: totalPoints
    }
  }).sort((a, b) => b.points - a.points) // Sortam descrescator

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="w-full bg-white shadow-sm border-b border-gray-100 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/clans" className="flex items-center gap-2 text-gray-500 hover:text-brazuca-blue transition-colors font-bold">
            <ArrowLeft size={20} />
            Înapoi la Clanuri
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-brazuca-dark tracking-tight">{clan.name}</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-4xl mx-auto w-full p-4 md:p-8 space-y-8">
        
        {/* Clan Header / Invite Code */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brazuca-blue/5 rounded-bl-[100px] -z-0"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-brazuca-dark mb-2">{clan.name}</h1>
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <Users size={18} />
                <span>{leaderboard.length} Membrii</span>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 min-w-[250px]">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cod de Invitație</p>
              <div className="flex items-center justify-between gap-4">
                <span className="text-2xl font-black text-brazuca-blue tracking-widest">{clan.invite_code}</span>
                {/* In viitor, aici putem pune un buton real de copy-to-clipboard (Client Component) */}
                <button className="text-gray-400 hover:text-brazuca-blue transition-colors">
                  <Copy size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="text-brazuca-orange" size={28} />
            <h2 className="text-2xl font-black text-brazuca-dark">Clasament</h2>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            {leaderboard.map((player, index) => (
              <div 
                key={player.userId}
                className={`flex items-center justify-between p-4 px-6 border-b border-gray-50 last:border-0 ${
                  player.userId === user.id ? 'bg-brazuca-blue/5' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="w-8 font-black text-lg text-center">
                    {index === 0 ? <Medal className="text-yellow-400 mx-auto" size={24} /> : 
                     index === 1 ? <Medal className="text-gray-400 mx-auto" size={24} /> : 
                     index === 2 ? <Medal className="text-amber-600 mx-auto" size={24} /> : 
                     <span className="text-gray-400">{index + 1}</span>}
                  </div>
                  
                  <div className="flex flex-col">
                    <span className={`font-bold ${player.userId === user.id ? 'text-brazuca-blue' : 'text-gray-700'}`}>
                      {player.email.split('@')[0]} {player.userId === user.id && '(Tu)'}
                    </span>
                  </div>
                </div>

                <div className="font-black text-2xl text-brazuca-dark">
                  {player.points} <span className="text-sm text-gray-400 font-bold uppercase">pct</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}
