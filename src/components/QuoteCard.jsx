import { Quote } from 'lucide-react'

function QuoteCard({ quote, onRefresh }) {
  if (!quote) return null

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-xl">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-200">
          <Quote className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-lg text-white leading-relaxed">“{quote.text}”</p>
          <p className="mt-3 text-sm text-blue-200/80">— {quote.author || 'Unknown'}</p>
          {quote.mood && (
            <span className="inline-block mt-3 text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-200">{quote.mood}</span>
          )}
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={onRefresh} className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors">
          New quote
        </button>
        <a href="/" className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors">Home</a>
      </div>
    </div>
  )
}

export default QuoteCard
