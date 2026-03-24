import { useNavigate } from 'react-router'
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
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-zinc-400 mt-2">
              Hoş geldin, {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500/90 hover:bg-red-500 transition"
          >
            Çıkış Yap
          </button>
        </div>

        <div className="rounded-2xl border border-zinc-800 p-6 bg-zinc-900/50">
          <p className="text-zinc-300">
            Auth sistemi çalışıyor. Bir sonraki adımda journal modülünü buraya bağlayacağız.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage