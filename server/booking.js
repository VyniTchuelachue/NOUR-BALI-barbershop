import { info, services, extras } from './data/content.js'

// Logique de réservation partagée entre le serveur Express (server/index.js)
// et les fonctions serverless Vercel (api/booking.js).

const allServices = [...services, ...extras]

export function validateBooking(body = {}) {
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

export function buildWhatsAppMessage({ name, service, date, time, note, lang }) {
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

export const whatsappUrl = (message) => `https://wa.me/${info.whatsapp}?text=${encodeURIComponent(message)}`
