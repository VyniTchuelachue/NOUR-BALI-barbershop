import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { info, services, extras, inspirations, reviews } from './data/content.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 4000
const BOOKINGS_FILE = path.join(__dirname, 'data', 'bookings.json')
const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist')

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.get('/api/content', (_req, res) => {
  res.json({ info, services, extras, inspirations, reviews })
})

// --- Réservation -----------------------------------------------------------
// Valide la demande, l'enregistre, puis renvoie un lien WhatsApp pré-rempli.

const allServices = [...services, ...extras]

function validateBooking(body = {}) {
  const errors = {}
  const name = String(body.name ?? '').trim()
  const serviceId = String(body.service ?? '')
  const date = String(body.date ?? '')
  const time = String(body.time ?? '')
  const note = String(body.note ?? '').trim()
  const lang = body.lang === 'en' ? 'en' : 'fr'

  if (name.length < 2 || name.length > 80) errors.name = true
  const service = allServices.find((s) => s.id === serviceId)
  if (!service) errors.service = true
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    errors.date = true
  } else {
    const today = new Date().toISOString().slice(0, 10)
    if (date < today) errors.date = true
  }
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) errors.time = true
  if (note.length > 300) errors.note = true

  return { errors, data: { name, service, date, time, note, lang } }
}

function buildWhatsAppMessage({ name, service, date, time, note, lang }) {
  const locale = lang === 'en' ? 'en-GB' : 'fr-FR'
  const prettyDate = new Date(`${date}T12:00:00`).toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const l = lang === 'en'
    ? { hi: 'Hello Nour Bali 👋', want: "I'd like to book:", s: 'Service', d: 'Date', t: 'Time', n: 'Name', note: 'Note' }
    : { hi: 'Bonjour Nour Bali 👋', want: 'Je souhaite réserver :', s: 'Prestation', d: 'Date', t: 'Heure', n: 'Nom', note: 'Note' }

  return [
    l.hi,
    l.want,
    `• ${l.s} : ${service.name[lang]}`,
    `• ${l.d} : ${prettyDate}`,
    `• ${l.t} : ${time}`,
    `• ${l.n} : ${name}`,
    note ? `• ${l.note} : ${note}` : null,
  ].filter(Boolean).join('\n')
}

function saveBooking(entry) {
  let list = []
  try {
    list = JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8'))
  } catch {
    // fichier absent ou vide : on repart d'une liste vide
  }
  list.push(entry)
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(list, null, 2))
}

app.post('/api/booking', (req, res) => {
  const { errors, data } = validateBooking(req.body)
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors })

  const message = buildWhatsAppMessage(data)
  try {
    saveBooking({
      name: data.name,
      service: data.service.id,
      date: data.date,
      time: data.time,
      note: data.note,
      createdAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Impossible d’enregistrer la réservation :', err.message)
  }

  res.json({ ok: true, whatsappUrl: `https://wa.me/${info.whatsapp}?text=${encodeURIComponent(message)}` })
})

app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'Not found' }))

// --- Front-end (build de production) ---------------------------------------
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST, { maxAge: '7d', index: false }))
  app.use((_req, res) => res.sendFile(path.join(CLIENT_DIST, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`Nour Bali API → http://localhost:${PORT}`)
})
