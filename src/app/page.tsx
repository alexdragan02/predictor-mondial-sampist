import Link from 'next/link';
import { Trophy, Users, TrendingUp, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col">
      {/* Navbar */}
      <nav className="w-full p-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2">
          <Trophy className="text-brazuca-blue" size={28} />
          <span className="text-xl font-black text-brazuca-dark tracking-tight">CampionatPredictii</span>
        </div>
        <Link href="/login" className="font-bold text-brazuca-dark hover:text-brazuca-blue transition-colors px-4 py-2">
          Intră în cont
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 relative z-10">
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-brazuca-blue/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-brazuca-green/10 rounded-full blur-[80px] -z-10" />
        <div className="absolute top-[30%] right-[30%] w-[20%] h-[20%] bg-brazuca-orange/10 rounded-full blur-[60px] -z-10" />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brazuca-blue/20 shadow-sm text-sm font-bold text-brazuca-blue mb-4">
            <span className="w-2 h-2 rounded-full bg-brazuca-green animate-pulse"></span>
            Pregătește-te pentru Campionatul Mondial
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-brazuca-dark tracking-tighter leading-[1.1]">
            Ghicește scorul.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brazuca-blue via-brazuca-green to-brazuca-orange">
              Câștigă respectul.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Creează-ți propriul clan, invită-ți prietenii și demonstrează cine este adevăratul expert în fotbal.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-brazuca-blue rounded-full overflow-hidden shadow-xl shadow-brazuca-blue/30 transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="flex items-center gap-2">Începe acum <ChevronRight size={20} /></span>
            </Link>
          </div>
        </div>

        {/* Features / Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-24 mb-16 px-4">
          <div className="bg-white/60 backdrop-blur-md border border-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-brazuca-blue/10 rounded-2xl flex items-center justify-center text-brazuca-blue mb-6">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-black text-brazuca-dark mb-3">Creează Clanuri</h3>
            <p className="text-gray-600 font-medium leading-relaxed">Fă-ți propriul grup cu prietenii sau colegii de muncă și concurează într-un clasament privat.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-md border border-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-brazuca-orange/10 rounded-2xl flex items-center justify-center text-brazuca-orange mb-6">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-2xl font-black text-brazuca-dark mb-3">Fă Predicții</h3>
            <p className="text-gray-600 font-medium leading-relaxed">Meciurile se actualizează automat. Pune scorul corect înainte de fluierul de start.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-md border border-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-brazuca-green/10 rounded-2xl flex items-center justify-center text-brazuca-green mb-6">
              <Trophy size={28} />
            </div>
            <h3 className="text-2xl font-black text-brazuca-dark mb-3">Câștigă Puncte</h3>
            <p className="text-gray-600 font-medium leading-relaxed">1 punct pentru rezultatul corect. 3 puncte pentru scorul exact. Urcă în topul clasamentului!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
