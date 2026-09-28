// Fonction serverless Vercel — POST /api/booking
// Sur Vercel le disque est en lecture seule : la demande n'est pas enregistrée,
// le message WhatsApp fait office de trace.
import { buildWhatsAppMessage, validateBooking, whatsappUrl } from '../server/booking.js'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  const { errors, data } = validateBooking(req.body || {})
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors })

  console.log('Réservation :', data.service.id, data.date, data.time)
  res.status(200).json({ ok: true, whatsappUrl: whatsappUrl(buildWhatsAppMessage(data)) })
}
