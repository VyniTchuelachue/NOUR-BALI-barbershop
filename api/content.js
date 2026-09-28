// Fonction serverless Vercel — GET /api/content
import { info, services, extras, inspirations, reviews } from '../server/data/content.js'

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Method not allowed' })
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400')
  res.status(200).json({ info, services, extras, inspirations, reviews })
}
