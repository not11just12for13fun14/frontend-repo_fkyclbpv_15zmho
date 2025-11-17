import { useEffect, useMemo, useRef, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'

function withinOpeningHours(date = new Date()) {
  // Opening hours: 14:00–18:00 local time
  const h = date.getHours()
  return h >= 14 && h < 18
}

const starterHints = [
  'Åpningstider',
  'Hvordan reserverer jeg?',
  'Bli medlem',
  'Hvor holder dere til?',
  'Hvilke kategorier finnes?',
]

function answerFor(input, context) {
  const q = (input || '').toLowerCase().trim()

  const answers = [
    {
      test: /åpning|åpningstid|når åpent|åpent/i,
      reply: () => {
        const open = withinOpeningHours()
        return open
          ? 'Vi har åpent nå mellom 14:00–18:00. Kom innom! 😺'
          : 'Våre bemannede tider er tir–tor 14:00–18:00 (eksempel). Jeg er her 24/7 hvis du lurer på noe. '
      },
    },
    {
      test: /medlem|bli medlem|registrer/i,
      reply: () =>
        'Slik blir du medlem: 1) Fyll ut skjema (kommer snart), 2) Bekreft e-post, 3) Hent utstyr med legitimasjon. Medlemskap er gratis for barn/unge. 😺',
    },
    {
      test: /reserver|booking|låne|leie/i,
      reply: () =>
        'Finn utstyr i katalogen, trykk «Reserver», velg dato og send inn. Du får bekreftelse på e-post. (Dato-valg kommer snart i nettbutikken.)',
    },
    {
      test: /hvor|adresse|ligger|lokasjon|sted/i,
      reply: () =>
        'Vi er i Lierbyen og Tranby. Du finner adresser i bunnteksten. Trenger du veibeskrivelse, si ifra! 🐾',
    },
    {
      test: /kategori|utvalg|hva har dere/i,
      reply: () => {
        const cats = (context.categories || []).filter(Boolean).join(', ')
        return cats
          ? `Typiske kategorier: ${cats}. Spør meg om spesifikt utstyr!`
          : 'Vi har alt fra ski og skøyter til telt, sekker og sykler. Spør meg om noe spesifikt!'
      },
    },
    {
      test: /kontakt|telefon|e-post|mail/i,
      reply: () => 'Du kan nå oss på e-post: post@bua-lier.no og telefon: 32 00 00 00. Hvis vi er stengt, svarer jeg så godt jeg kan! 😺',
    },
    {
      test: /donasjon|gi bort|gave|reparasjon|ødelagt/i,
      reply: () => 'Tusen takk for at du vil bidra! Du kan levere donasjoner i åpningstiden, eller registrere en gaverapport/rep-rapport via skjema (kommer snart).',
    },
    {
      test: /personvern|gdpr|data/i,
      reply: () => 'Vi lagrer bare nødvendig info for medlemskap og lån, og deler aldri uten samtykke. Be meg gjerne om detaljer!',
    },
  ]

  for (const a of answers) {
    if (a.test.test(q)) return a.reply()
  }

  // Fallback
  return 'Mjau! Jeg er BUA-katten. Jeg kan svare på spørsmål om åpningstider, utstyr, reservasjoner og medlemskap. Prøv å spørre: «Åpningstider?» eller «Hvordan reserverer jeg?»'
}

export default function CatBot({ categories = [] }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() => {
    const intro = withinOpeningHours()
      ? 'Hei! Jeg er din katt-assistent. Vi har åpent 14–18, men jeg kan hjelpe nå også. Hva lurer du på?'
      : 'Hei! Jeg er din katt-assistent og er her 24/7. Spør meg om åpningstider, utstyr og reservasjon. Hva kan jeg hjelpe med?'
    return [{ from: 'bot', text: intro, ts: Date.now() }]
  })

  const listRef = useRef(null)
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open])

  const context = useMemo(() => ({ categories }), [categories])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text, ts: Date.now() }])
    setInput('')
    const reply = answerFor(text, context)
    // Small delay for natural feel
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: reply, ts: Date.now() }])
    }, 300)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <button
          aria-label="Åpne katt-chat"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-emerald-700 text-white px-4 py-3 shadow-lg hover:bg-emerald-800"
        >
          <MessageCircle size={18} />
          <span>Chat med katt</span>
        </button>
      )}
      {open && (
        <div className="w-80 sm:w-96 h-96 bg-white rounded-xl shadow-2xl border border-emerald-900/10 flex flex-col">
          <div className="px-4 py-3 border-b border-stone-200 flex items-center justify-between bg-emerald-50/60">
            <div>
              <div className="font-semibold text-stone-800">BUA-katten</div>
              <div className="text-xs text-stone-500">Jeg svarer 24/7. Mjau!</div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-stone-100">
              <X size={18} />
            </button>
          </div>
          <div ref={listRef} className="flex-1 overflow-auto p-3 space-y-2 bg-gradient-to-b from-white to-emerald-50/40">
            {messages.map((m, idx) => (
              <div key={idx} className={`max-w-[80%] ${m.from === 'bot' ? 'bg-emerald-100 text-stone-800' : 'bg-stone-800 text-white'} px-3 py-2 rounded-lg ${m.from === 'bot' ? 'mr-auto' : 'ml-auto'}`}>
                {m.text}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="text-xs text-stone-500 mt-2">
                Prøv: {starterHints.map((h, i) => (
                  <button key={h} onClick={() => setInput(h)} className="underline hover:text-emerald-700 mr-1">
                    {h}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-3 border-t border-stone-200 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Skriv en melding..."
              className="flex-1 px-3 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
            />
            <button onClick={send} className="inline-flex items-center justify-center rounded-md bg-emerald-700 text-white px-3 py-2 hover:bg-emerald-800">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
