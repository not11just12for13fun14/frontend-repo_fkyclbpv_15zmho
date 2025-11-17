import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Hjem' },
  { to: '/utstyr', label: 'Utstyr' },
  { to: '/om', label: 'Om oss' },
  { to: '/betingelser', label: 'Betingelser' },
  { to: '/baerekraft', label: 'Bærekraft' },
  { to: '/kontakt', label: 'Kontakt' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-emerald-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600/90 text-white grid place-content-center font-bold">B</div>
            <div className="leading-tight">
              <div className="font-semibold text-stone-800">BUA Lier</div>
              <div className="text-xs text-stone-500">Utlån av utstyr</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-stone-700">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) => `hover:text-emerald-700 transition-colors ${isActive ? 'text-emerald-700 font-medium' : ''}`}
              >
                {n.label}
              </NavLink>
            ))}
            <Link to="/bli-medlem" className="ml-2 inline-flex items-center rounded-md bg-emerald-700 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-emerald-800 transition-colors">
              Bli medlem
            </Link>
          </nav>

          <button onClick={() => setOpen((v) => !v)} className="md:hidden p-2 rounded-md border border-stone-300 text-stone-700">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-stone-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-stone-700 hover:text-emerald-700">
                {n.label}
              </Link>
            ))}
            <Link to="/bli-medlem" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-md bg-emerald-700 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-emerald-800">
              Bli medlem
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
