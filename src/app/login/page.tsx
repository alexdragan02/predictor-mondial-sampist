import { login, signup } from './actions'
import { Trophy, AlertCircle } from 'lucide-react'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const resolvedSearchParams = await searchParams;
  const errorMsg = resolvedSearchParams?.error;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brazuca-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brazuca-green/10 rounded-full blur-3xl" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-brazuca-orange/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brazuca-blue rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-brazuca-blue/30">
            <Trophy size={32} />
          </div>
          <h1 className="text-3xl font-black text-brazuca-dark tracking-tight">Campionat Predictii</h1>
          <p className="text-gray-500 mt-2 text-center text-sm font-medium">
            Intră în cont sau creează unul nou pentru a începe competiția cu prietenii tăi.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50/50 border border-red-200 text-red-600 text-sm rounded-xl flex items-start gap-3 backdrop-blur-sm">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <p className="font-medium">{errorMsg}</p>
          </div>
        )}

        <form className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-brazuca-dark/80 ml-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="nume@exemplu.com"
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazuca-blue/50 focus:border-brazuca-blue transition-all placeholder:text-gray-400 font-medium text-brazuca-dark"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-brazuca-dark/80 ml-1" htmlFor="password">
              Parolă
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazuca-blue/50 focus:border-brazuca-blue transition-all placeholder:text-gray-400 font-medium text-brazuca-dark"
            />
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button
              formAction={login}
              className="w-full bg-brazuca-blue hover:bg-brazuca-blue-dark text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-brazuca-blue/30 active:scale-[0.98] flex justify-center items-center gap-2"
            >
              Intră în cont
            </button>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Sau</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button
              formAction={signup}
              className="w-full bg-white hover:bg-gray-50 text-brazuca-dark font-bold py-3.5 px-4 rounded-xl border border-gray-200 transition-all active:scale-[0.98]"
            >
              Creează cont nou
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
