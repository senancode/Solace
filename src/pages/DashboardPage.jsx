import { Link, useNavigate } from 'react-router'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      alert(error.message)
      return
    }

    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-zinc-400 mt-2">
              Hoş geldin, {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-fit rounded-xl bg-red-500/90 px-4 py-2 text-white hover:bg-red-500 transition"
          >
            Çıkış Yap
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link
            to="/journal"
            className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:border-zinc-600 hover:bg-zinc-900"
          >
            <div className="mb-4 text-3xl">📝</div>
            <h2 className="text-2xl font-semibold mb-2">Journal</h2>
            <p className="text-zinc-400">
              Günlük yazılarını kaydet, duygularını daha sonra analiz etmek için biriktir.
            </p>
          </Link>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 opacity-80">
            <div className="mb-4 text-3xl">🎬</div>
            <h2 className="text-2xl font-semibold mb-2">Movies</h2>
            <p className="text-zinc-400">
              İzlediğin filmleri ekle, puan ver ve kendi yorumlarını sakla.
            </p>
            <span className="inline-block mt-4 rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
              Yakında
            </span>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 opacity-80">
            <div className="mb-4 text-3xl">📚</div>
            <h2 className="text-2xl font-semibold mb-2">Books</h2>
            <p className="text-zinc-400">
              Okuduğun kitapları kaydet, notlar al ve hislerini takip et.
            </p>
            <span className="inline-block mt-4 rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
              Yakında
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage