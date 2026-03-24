import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { supabase } from '../lib/supabase'

function JournalDetailPage() {
  const { id } = useParams()

  const [entry, setEntry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchEntry()
  }, [id])

  async function fetchEntry() {
    setLoading(true)

    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    setEntry(data)
    setLoading(false)
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString('tr-TR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        Yükleniyor...
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        {errorMessage}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/journal"
          className="mb-6 inline-block text-sm text-zinc-400 hover:text-white"
        >
          ← Geri dön
        </Link>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h1 className="text-3xl font-bold mb-2">{entry.title}</h1>

          <p className="text-sm text-zinc-500 mb-6">
            {formatDate(entry.created_at)}
          </p>

          <p className="leading-7 text-zinc-300 whitespace-pre-line">
            {entry.content}
          </p>
        </div>
      </div>
    </div>
  )
}

export default JournalDetailPage