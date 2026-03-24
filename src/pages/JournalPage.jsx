import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

function JournalPage() {
  const { user } = useAuth()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchingEntries, setFetchingEntries] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function fetchEntries() {
    if (!user) return

    setFetchingEntries(true)

    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      setErrorMessage(error.message)
      setFetchingEntries(false)
      return
    }

    setEntries(data || [])
    setFetchingEntries(false)
  }

  useEffect(() => {
    fetchEntries()
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle || !trimmedContent) {
      setErrorMessage('Lütfen başlık ve içerik alanını doldur.')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('journal_entries').insert([
      {
        user_id: user.id,
        title: trimmedTitle,
        content: trimmedContent,
      },
    ])

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    setSuccessMessage('Günlük kaydı başarıyla eklendi.')
    setTitle('')
    setContent('')
    setLoading(false)

    fetchEntries()
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString('tr-TR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Journal</h1>
            <p className="mt-2 text-zinc-400">
              Düşüncelerini kaydet, sonra analiz katmanını bunun üstüne kuracağız.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="w-fit rounded-xl border border-zinc-700 px-4 py-2 text-zinc-200 transition hover:bg-zinc-800"
          >
            Dashboard’a Dön
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
            <h2 className="mb-6 text-2xl font-semibold">Yeni Günlük Kaydı</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Başlık
                </label>
                <input
                  type="text"
                  placeholder="Bugün içimde neler var?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  İçerik
                </label>
                <textarea
                  placeholder="Bugün hissettiklerini yaz..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="10"
                  className="w-full resize-none rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-zinc-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-white px-5 py-3 font-semibold text-black transition disabled:opacity-60"
              >
                {loading ? 'Kaydediliyor...' : 'Kaydı Oluştur'}
              </button>
            </form>

            {errorMessage && (
              <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
            )}

            {successMessage && (
              <p className="mt-4 text-sm text-emerald-400">{successMessage}</p>
            )}
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h2 className="mb-6 text-2xl font-semibold">Geçmiş Kayıtlar</h2>

            {fetchingEntries ? (
              <p className="text-zinc-400">Kayıtlar yükleniyor...</p>
            ) : entries.length === 0 ? (
              <p className="text-zinc-400">
                Henüz bir günlük kaydın yok. İlk kaydın burada görünecek.
              </p>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <Link
                    to={`/journal/${entry.id}`}
                    key={entry.id}
                    className="block rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 transition hover:border-zinc-600 hover:bg-zinc-900"
                  >
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold">{entry.title}</h3>
                      <span className="shrink-0 text-xs text-zinc-500">
                        {formatDate(entry.created_at)}
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-zinc-300">
                      {entry.content}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JournalPage