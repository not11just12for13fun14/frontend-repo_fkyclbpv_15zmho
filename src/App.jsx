import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import StaticPage from './pages/StaticPage'

function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-white text-stone-800">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/om" element={<StaticPage title="Om oss">Vi er et utlån for frilufts- og sportsutstyr i Lier. Vårt mål er å gjøre det enkelt å prøve nye aktiviteter uten å måtte kjøpe alt nytt. Sammen skaper vi et mer inkluderende og bærekraftig lokalsamfunn.</StaticPage>} />
        <Route path="/betingelser" element={<StaticPage title="Betingelser & Veiledning">Slik fungerer utlån: registrer deg som medlem, reserver utstyr, hent og lever til avtalt tid. Ta vare på utstyret og gi beskjed om skader.</StaticPage>} />
        <Route path="/kontakt" element={<StaticPage title="Kontakt & Lokasjon">Finn oss i Lierbyen og Tranby. Se åpningstider nederst på siden eller ta kontakt via e-post og telefon.</StaticPage>} />
        <Route path="/baerekraft" element={<StaticPage title="Bærekraft & Fellesskap">Deling reduserer forbruk og gjør flere aktiviteter tilgjengelige for alle. Takk for at du er med!</StaticPage>} />
        <Route path="/utstyr" element={<Home />} />
        <Route path="*" element={<StaticPage title="Fant ikke siden">Siden finnes ikke.</StaticPage>} />
      </Routes>
    </AppShell>
  )
}

export default App
