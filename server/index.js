import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { info, services, extras, inspirations, reviews } from './data/content.js'
import { buildWhatsAppMessage, validateBooking, whatsappUrl } from './booking.js'

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

  res.json({ ok: true, whatsappUrl: whatsappUrl(buildWhatsAppMessage(data)) })
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
