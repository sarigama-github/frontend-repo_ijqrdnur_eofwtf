import { useEffect, useState } from 'react'
import QuoteCard from './components/QuoteCard'

function App() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mood, setMood] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchQuote = async () => {
    setLoading(true)
    setError('')
    try {
      const endpoint = mood ? `${backend}/api/quotes?mood=${encodeURIComponent(mood)}` : `${backend}/api/quotes/random`
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error('Failed to fetch quote')
      const data = await res.json()
      setQuote(Array.isArray(data) ? data[0] : data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_0%_0%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(800px_circle_at_100%_100%,rgba(147,197,253,0.12),transparent_40%)]" />
      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white tracking-tight">Daily Inspiration</h1>
            <p className="text-blue-200/80 mt-2">Get a random quote, or filter by mood</p>
          </div>

          <div className="flex gap-3">
            <input
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="Try: motivation, focus, calm"
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <button onClick={fetchQuote} className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors">Search</button>
          </div>

          {loading && (
            <div className="text-center text-blue-200">Loading...</div>
          )}
          {error && (
            <div className="text-center text-red-300 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">{error}</div>
          )}
          {!loading && !error && quote && (
            <QuoteCard quote={quote} onRefresh={() => fetchQuote()} />
          )}

          <div className="text-center text-blue-200/60 text-sm">
            Powered by a tiny API you can extend.
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
