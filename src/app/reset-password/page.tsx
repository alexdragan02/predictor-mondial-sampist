'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Trophy, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Parolele nu coincid!')
      return
    }

    if (password.length < 6) {
      setError('Parola trebuie să aibă minim 6 caractere.')
      return
    }

    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brazuca-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brazuca-green/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brazuca-orange rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-brazuca-orange/30">
            <Trophy size={32} />
          </div>
          <h1 className="text-3xl font-black text-brazuca-dark tracking-tight">Parolă Nouă</h1>
          <p className="text-gray-500 mt-2 text-center text-sm font-medium">
            Introdu noua ta parolă mai jos.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50/50 border border-red-200 text-red-600 text-sm rounded-xl flex items-start gap-3">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {success ? (
          <div className="p-6 bg-green-50/50 border border-green-200 text-green-700 rounded-xl flex flex-col items-center gap-3 text-center">
            <CheckCircle size={40} />
            <p className="font-bold text-lg">Parola a fost schimbată cu succes!</p>
            <p className="text-sm">Vei fi redirecționat în câteva secunde...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-brazuca-dark/80 ml-1" htmlFor="new-password">
                Parolă Nouă
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Minim 6 caractere"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  className="w-full px-4 py-3 pr-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazuca-orange/50 focus:border-brazuca-orange transition-all placeholder:text-gray-400 font-medium text-brazuca-dark"
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
              <label className="text-sm font-bold text-brazuca-dark/80 ml-1" htmlFor="confirm-new-password">
                Confirmă Parola Nouă
              </label>
              <div className="relative">
                <input
                  id="confirm-new-password"
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="Repetă parola"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError('') }}
                  className="w-full px-4 py-3 pr-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazuca-orange/50 focus:border-brazuca-orange transition-all placeholder:text-gray-400 font-medium text-brazuca-dark"
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
              className="w-full bg-brazuca-orange hover:bg-brazuca-orange/90 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-brazuca-orange/30 active:scale-[0.98] mt-2"
            >
              Salvează Parola Nouă
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
