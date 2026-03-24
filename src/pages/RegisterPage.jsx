import { useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '../lib/supabase'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setErrorMessage('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      setMessage(
        'Kayıt başarılı. E-posta doğrulaması açıksa mail kutunu kontrol et.'
      )
    }

    setLoading(false)
    setEmail('')
    setPassword('')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
        <h1 className="text-3xl font-bold mb-2">Kayıt Ol</h1>
        <p className="text-zinc-400 mb-6">
          Solace hesabını oluştur.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm text-zinc-300">E-posta</label>
            <input
              type="email"
              placeholder="ornek@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 outline-none focus:border-zinc-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-300">Şifre</label>
            <input
              type="password"
              placeholder="En az 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 outline-none focus:border-zinc-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white text-black font-semibold py-3 disabled:opacity-60"
          >
            {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-emerald-400">{message}</p>
        )}

        {errorMessage && (
          <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
        )}

        <p className="mt-6 text-sm text-zinc-400">
          Zaten hesabın var mı?{' '}
          <Link to="/login" className="text-white underline">
            Giriş yap
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage