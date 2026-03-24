import { Link } from 'react-router'

function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Solace</h1>
        <p className="text-zinc-300 mb-8">
          Duygularını, izlediklerini ve okuduklarını sakince düzenleyebileceğin kişisel alan.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-3 rounded-xl bg-white text-black font-medium"
          >
            Giriş Yap
          </Link>

          <Link
            to="/register"
            className="px-5 py-3 rounded-xl border border-zinc-700 text-white"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage