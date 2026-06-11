import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Shield, Plus, ArrowRight, ArrowLeft } from 'lucide-react'
import { createClan, joinClan } from './actions'

export default async function ClansPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch clans where user is a member
  const { data: userClans } = await supabase
    .from('clan_members')
    .select('clan_id, clans(name, invite_code)')
    .eq('user_id', user.id)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="w-full bg-white shadow-sm border-b border-gray-100 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-brazuca-blue transition-colors font-bold">
            <ArrowLeft size={20} />
            Înapoi la Meciuri
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="text-brazuca-green" size={24} />
            <span className="text-lg font-black text-brazuca-dark tracking-tight">Clanurile Mele</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-4xl mx-auto w-full p-4 md:p-8 space-y-12">
        
        {/* Clanurile tale */}
        <section>
          <h2 className="text-2xl font-black text-brazuca-dark mb-6">Clanurile din care faci parte</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {userClans && userClans.length > 0 ? (
              userClans.map((membership: any) => (
                <Link 
                  href={`/clans/${membership.clan_id}`} 
                  key={membership.clan_id}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brazuca-blue/30 transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brazuca-blue/10 rounded-xl flex items-center justify-center text-brazuca-blue font-black text-xl">
                      {membership.clans.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-brazuca-dark">{membership.clans.name}</h3>
                      <p className="text-sm text-gray-400">Vezi clasamentul</p>
                    </div>
                  </div>
                  <ArrowRight className="text-gray-300 group-hover:text-brazuca-blue transition-colors" />
                </Link>
              ))
            ) : (
              <div className="col-span-2 bg-white/50 border border-dashed border-gray-300 rounded-2xl p-8 text-center text-gray-500">
                Nu faci parte din niciun clan încă.
              </div>
            )}
          </div>
        </section>

        {/* Actions (Create / Join) */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Clan */}
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brazuca-blue/5 rounded-bl-full -z-0"></div>
             <h3 className="text-xl font-black text-brazuca-dark mb-2 relative z-10">Creează un Clan</h3>
             <p className="text-gray-500 text-sm mb-6 relative z-10">Fii liderul propriului tău grup și invită-ți prietenii.</p>
             
             <form action={createClan} className="flex flex-col gap-4 relative z-10">
               <input 
                 type="text" 
                 name="name" 
                 placeholder="Ex: Suporterii de Duminică" 
                 required
                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazuca-blue focus:border-brazuca-blue transition-all"
               />
               <button type="submit" className="bg-brazuca-blue hover:bg-brazuca-blue-dark text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.98] flex justify-center items-center gap-2">
                 <Plus size={18} /> Creează Clanul
               </button>
             </form>
          </section>

          {/* Join Clan */}
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brazuca-green/5 rounded-bl-full -z-0"></div>
             <h3 className="text-xl font-black text-brazuca-dark mb-2 relative z-10">Alătură-te unui Clan</h3>
             <p className="text-gray-500 text-sm mb-6 relative z-10">Ai primit un cod de invitație? Introdu-l mai jos.</p>
             
             <form action={joinClan} className="flex flex-col gap-4 relative z-10">
               <input 
                 type="text" 
                 name="invite_code" 
                 placeholder="Codul de invitație (ex: aB3x9Z)" 
                 required
                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazuca-green focus:border-brazuca-green transition-all"
               />
               <button type="submit" className="bg-white border-2 border-brazuca-green text-brazuca-green hover:bg-brazuca-green hover:text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-[0.98] flex justify-center items-center gap-2">
                 Intră în Clan
               </button>
             </form>
          </section>
        </div>

      </main>
    </div>
  )
}
