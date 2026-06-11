'use client'

import { useState, Suspense } from 'react'
import { login, signup } from './actions'
import { Trophy, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const searchParams = useSearchParams()
  const errorMsg = searchParams.get('error')

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [mismatch, setMismatch] = useState(false)

  function handleRegister(formData: FormData) {
    if (password !== confirmPassword) {
      setMismatch(true)
      return
    }
    setMismatch(false)
    signup(formData)
  }

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
            {mode === 'login'
              ? 'Intră în cont pentru a vedea meciurile și predicțiile tale.'
              : 'Creează un cont nou pentru a începe competiția cu prietenii tăi.'}
          </p>
        </div>

        {/* Toggle Login / Register */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setMismatch(false) }}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mode === 'login' ? 'bg-white text-brazuca-blue shadow-sm' : 'text-gray-500'}`}
          >
            Autentificare
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setMismatch(false) }}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mode === 'register' ? 'bg-white text-brazuca-green shadow-sm' : 'text-gray-500'}`}
          >
            Înregistrare
          </button>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50/50 border border-red-200 text-red-600 text-sm rounded-xl flex items-start gap-3 backdrop-blur-sm">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <p className="font-medium">{errorMsg}</p>
          </div>
        )}

        {mismatch && (
          <div className="mb-6 p-4 bg-red-50/50 border border-red-200 text-red-600 text-sm rounded-xl flex items-start gap-3 backdrop-blur-sm">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <p className="font-medium">Parolele nu coincid!</p>
          </div>
        )}

        {/* ===== LOGIN FORM ===== */}
        {mode === 'login' && (
          <form action={login} className="flex flex-col gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-brazuca-dark/80 ml-1" htmlFor="email-login">
                Email
              </label>
              <input
                id="email-login"
                name="email"
                type="email"
                required
                placeholder="nume@exemplu.com"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazuca-blue/50 focus:border-brazuca-blue transition-all placeholder:text-gray-400 font-medium text-brazuca-dark"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-brazuca-dark/80 ml-1" htmlFor="password-login">
                Parolă
              </label>
              <input
                id="password-login"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazuca-blue/50 focus:border-brazuca-blue transition-all placeholder:text-gray-400 font-medium text-brazuca-dark"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brazuca-blue hover:bg-brazuca-blue-dark text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-brazuca-blue/30 active:scale-[0.98] mt-2"
            >
              Intră în cont
            </button>
          </form>
        )}

        {/* ===== REGISTER FORM ===== */}
        {mode === 'register' && (
          <form action={handleRegister} className="flex flex-col gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-brazuca-dark/80 ml-1" htmlFor="email-register">
                Email
              </label>
              <input
                id="email-register"
                name="email"
                type="email"
                required
                placeholder="nume@exemplu.com"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazuca-green/50 focus:border-brazuca-green transition-all placeholder:text-gray-400 font-medium text-brazuca-dark"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-brazuca-dark/80 ml-1" htmlFor="password-register">
                Parolă
              </label>
              <div className="relative">
                <input
                  id="password-register"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Minim 6 caractere"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazuca-green/50 focus:border-brazuca-green transition-all placeholder:text-gray-400 font-medium text-brazuca-dark"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brazuca-dark transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-brazuca-dark/80 ml-1" htmlFor="confirm-password">
                Confirmă Parola
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="Repetă parola"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setMismatch(false) }}
                  className={`w-full px-4 py-3 pr-12 bg-white/50 border rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 font-medium text-brazuca-dark ${
                    mismatch ? 'border-red-400 focus:ring-red-300 focus:border-red-400' : 'border-gray-200 focus:ring-brazuca-green/50 focus:border-brazuca-green'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brazuca-dark transition-colors"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brazuca-green hover:bg-brazuca-green/90 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-brazuca-green/30 active:scale-[0.98] mt-2"
            >
              Creează cont
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
