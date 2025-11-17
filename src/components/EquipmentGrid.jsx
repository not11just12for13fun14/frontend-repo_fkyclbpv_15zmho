import { useEffect, useMemo, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

export default function EquipmentGrid() {
  const [items, setItems] = useState([])
  const [allItems, setAllItems] = useState([])
  const [loading, setLoading] = useState(true)

  // filters
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')

  const dq = useDebounced(q, 350)

  // Load all items once for facets
  useEffect(() => {
    const loadAll = async () => {
      try {
        const url = new URL('/api/equipment', baseUrl)
        const res = await fetch(url.toString())
        const data = await res.json()
        setAllItems(data.items || [])
      } catch (e) {
        console.error(e)
      }
    }
    loadAll()
  }, [])

  // Load filtered items
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const url = new URL('/api/equipment', baseUrl)
        if (dq) url.searchParams.set('q', dq)
        if (category) url.searchParams.set('category', category)
        if (location) url.searchParams.set('location', location)
        const res = await fetch(url.toString())
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [dq, category, location])

  const categories = useMemo(() => {
    const set = new Set(allItems.map((i) => i.category).filter(Boolean))
    return ['Alle', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'no'))]
  }, [allItems])

  const locations = useMemo(() => {
    const set = new Set(allItems.map((i) => i.location).filter(Boolean))
    return ['Alle', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'no'))]
  }, [allItems])

  const activeFilters = [
    dq ? { key: 'q', label: `Søk: ${dq}` } : null,
    category ? { key: 'category', label: `Kategori: ${category}` } : null,
    location ? { key: 'location', label: `Sted: ${location}` } : null,
  ].filter(Boolean)

  const clearFilter = (key) => {
    if (key === 'q') setQ('')
    if (key === 'category') setCategory('')
    if (key === 'location') setLocation('')
  }

  const clearAll = () => {
    setQ('')
    setCategory('')
    setLocation('')
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:items-center justify-between">
            <h2 className="text-2xl font-semibold text-stone-900">Utstyr</h2>
            <div className="flex flex-1 sm:flex-none gap-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Søk etter ski, sykkel, telt..."
                className="flex-1 sm:flex-none w-full sm:w-64 px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
              />
              <select
                aria-label="Filtrer på kategori"
                value={category || 'Alle'}
                onChange={(e) => setCategory(e.target.value === 'Alle' ? '' : e.target.value)}
                className="px-3 py-2 rounded-md border border-stone-300"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                aria-label="Filtrer på lokasjon"
                value={location || 'Alle'}
                onChange={(e) => setLocation(e.target.value === 'Alle' ? '' : e.target.value)}
                className="px-3 py-2 rounded-md border border-stone-300"
              >
                {locations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex items-center flex-wrap gap-2">
              {activeFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => clearFilter(f.key)}
                  className="text-sm inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-900 px-3 py-1 border border-emerald-900/10"
                >
                  {f.label}
                  <span className="text-emerald-700">×</span>
                </button>
              ))}
              <button onClick={clearAll} className="text-sm underline text-stone-600 hover:text-emerald-700">Nullstill</button>
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-stone-600">Laster...</p>
        ) : items.length === 0 ? (
          <p className="text-stone-600">Ingen treff akkurat nå.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <article key={item.id} className="rounded-lg border border-emerald-900/10 bg-white overflow-hidden">
                <div className="aspect-[4/3] bg-stone-100">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full grid place-content-center text-stone-400">Bilde mangler</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-stone-900">{item.title}</h3>
                  <p className="text-sm text-stone-600 mt-1">
                    {item.category} • {item.location} {item.size ? `• ${item.size}` : ''}
                  </p>
                  {item.description && (
                    <p className="text-sm text-stone-700 line-clamp-2 mt-2">{item.description}</p>
                  )}
                  <div className="mt-3 text-xs text-stone-500">Tilstand: {item.condition || 'ukjent'}</div>
                  <div className="mt-4">
                    <button className="w-full inline-flex items-center justify-center rounded-md bg-emerald-700 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-800">
                      Reserver
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
