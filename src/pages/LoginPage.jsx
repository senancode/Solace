import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    setLoading(false)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
        <h1 className="text-3xl font-bold mb-2">Giriş Yap</h1>
        <p className="text-zinc-400 mb-6">
          Hesabına giriş yap ve kaldığın yerden devam et.
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
              placeholder="Şifreni gir"
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
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        {errorMessage && (
          <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
        )}

        <p className="mt-6 text-sm text-zinc-400">
          Hesabın yok mu?{' '}
          <Link to="/register" className="text-white underline">
            Kayıt ol
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage