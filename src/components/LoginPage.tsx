import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
// useUser is not strictly needed anymore if not using context values directly in LoginPage
// but keeping it doesn't harm if other context values were to be used later.
// For now, login is removed.

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  // const { login } = useUser(); // Removed: login is handled by UserContext internally via onAuthStateChange

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data: _data, error } = await supabase.auth.signInWithPassword({ // Prefixed data with _
        email,
        password
      })

      if (error) throw error

      // If signInWithPassword is successful, UserContext's onAuthStateChange
      // will handle setting authUser and fetching the profile.
      // No explicit login() call needed here anymore.
      // if (data.user) {
      //   await login(data.user) // Removed
      // }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-jade-50 to-mint-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/piv4f-logo.png" alt="Protocolo Vital 4F" className="h-12 mx-auto mb-4" /> 
          {/* Logo added, adjusted height and margin */}
          <h1 className="text-2xl font-bold text-jade-800 mb-2">
            Acesse sua conta
          </h1>
          <p className="text-jade-600">
            Bem-vindo de volta ao Protocolo Vital 4F!
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jade-500 focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jade-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-jade hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            // Changed bg-jade-600 to bg-jade, and hover:bg-jade-700 to hover:bg-opacity-90 (applied to bg-jade)
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
