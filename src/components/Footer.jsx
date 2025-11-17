export default function Footer() {
  return (
    <footer className="mt-16 border-t border-emerald-900/10 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-sm text-stone-600 grid sm:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold text-stone-800">BUA Lier</div>
          <p className="mt-2">Sammen deler vi utstyr og muligheter. Gratis utlån for barn, unge og familier i Lier.</p>
        </div>
        <div>
          <div className="font-semibold text-stone-800">Åpningstider (eksempel)</div>
          <ul className="mt-2 space-y-1">
            <li>Lierbyen: Tir & Tor 16–19</li>
            <li>Tranby: Ons 16–19</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-stone-800">Kontakt</div>
          <ul className="mt-2 space-y-1">
            <li>E-post: post@bua-lier.no</li>
            <li>Telefon: 32 00 00 00</li>
            <li>Adresse: Eksempelveien 1, 3400 Lier</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
