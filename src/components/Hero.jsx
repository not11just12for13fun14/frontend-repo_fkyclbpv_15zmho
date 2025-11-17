export default function Hero() {
  return (
    <section className="bg-emerald-50/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900">
            Deling gjør mer mulig
          </h1>
          <p className="mt-4 text-lg text-stone-700">
            Hos oss kan du låne frilufts- og sportsutstyr gratis eller rimelig. Vi tror på fellesskap, bærekraft og tilgjengelighet for alle i Lier.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/bli-medlem" className="inline-flex items-center rounded-md bg-emerald-700 text-white px-5 py-3 font-medium shadow-sm hover:bg-emerald-800">
              Bli medlem
            </a>
            <a href="/utstyr" className="inline-flex items-center rounded-md bg-white text-emerald-800 ring-1 ring-emerald-700/30 px-5 py-3 font-medium hover:bg-emerald-50">
              Se utstyr
            </a>
          </div>
          <p className="mt-4 text-sm text-stone-500">
            Lierbyen og Tranby • Enkelt å komme i gang
          </p>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-stone-100 to-emerald-100 border border-emerald-900/10 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop" alt="Fellesskap ute i naturen" className="w-full h-full object-cover opacity-90 mix-blend-multiply" />
          </div>
        </div>
      </div>
    </section>
  )
}
