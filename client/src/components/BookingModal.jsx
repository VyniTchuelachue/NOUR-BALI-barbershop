import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { WhatsAppIcon, whatsappLink } from '../lib.jsx'

const TIMES = Array.from({ length: 22 }, (_, i) => {
  const h = 9 + Math.floor(i / 2)
  return `${String(h).padStart(2, '0')}:${i % 2 ? '30' : '00'}`
})

const localToday = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export default function BookingModal({ open, preset, onClose, services, extras, whatsapp }) {
  const { t, lang } = useLang()
  const dialogRef = useRef(null)
  const [form, setForm] = useState({ name: '', service: '', date: localToday(), time: '10:00', note: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!open) return
    setErrors({})
    setForm((f) => ({
      ...f,
      service: preset?.service ?? f.service,
      note: preset?.note ?? f.note,
    }))
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    setTimeout(() => dialogRef.current?.querySelector('input,select')?.focus(), 50)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, preset, onClose])

  if (!open) return null

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const isSunday = form.date && new Date(`${form.date}T12:00:00`).getDay() === 0

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    // Ouvre l'onglet tout de suite (sinon les navigateurs bloquent la pop-up après l'await)
    const tab = window.open('', '_blank')
    let url
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      })
      const data = await res.json()
      if (!data.ok) {
        tab?.close()
        setErrors(data.errors || {})
        setSending(false)
        return
      }
      url = data.whatsappUrl
    } catch {
      // API injoignable : on prépare le message côté navigateur
      const s = [...services, ...extras].find((x) => x.id === form.service)
      url = whatsappLink(
        whatsapp,
        `${lang === 'en' ? 'Hello Nour Bali, I would like to book' : 'Bonjour Nour Bali, je souhaite réserver'} : ${s?.name[lang] ?? ''} — ${form.date} ${form.time} — ${form.name}${form.note ? ` — ${form.note}` : ''}`,
      )
    }
    if (tab) tab.location.href = url
    else window.location.href = url
    setSending(false)
    onClose()
  }

  const field = (key) =>
    `mt-1.5 w-full rounded-[3px] border bg-white px-4 py-3 text-[15px] outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25 ${
      errors[key] ? 'border-red-500' : 'border-ink/15'
    }`

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <div className="absolute inset-0 bg-ink/75 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialogRef}
        className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-xl bg-cream p-6 shadow-2xl sm:rounded-md sm:p-9"
      >
        <button onClick={onClose} className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-ink/60 transition hover:bg-ink/5 hover:text-ink" aria-label={t.booking.close}>
          <X className="size-5" />
        </button>

        <p className="eyebrow text-gold-dark">Nour Bali — Barber Shop</p>
        <h2 id="booking-title" className="mt-2 font-serif text-[34px] leading-tight font-medium">{t.booking.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">{t.booking.sub}</p>

        <form onSubmit={submit} className="mt-7 grid gap-4" noValidate>
          <label className="text-sm font-medium">
            {t.booking.name}
            <input className={field('name')} value={form.name} onChange={set('name')} autoComplete="name" required maxLength={80} />
          </label>

          <label className="text-sm font-medium">
            {t.booking.service}
            <select className={field('service')} value={form.service} onChange={set('service')} required>
              <option value="" disabled>{t.booking.choose}</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>{s.name[lang]}</option>
              ))}
              {extras.map((s) => (
                <option key={s.id} value={s.id}>{s.name[lang]}</option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-medium">
              {t.booking.date}
              <input type="date" className={field('date')} value={form.date} min={localToday()} onChange={set('date')} required />
            </label>
            <label className="text-sm font-medium">
              {t.booking.time}
              <select className={field('time')} value={form.time} onChange={set('time')}>
                {TIMES.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>
            </label>
          </div>
          {isSunday && <p className="-mt-1 text-xs text-gold-dark">{t.booking.sunday}</p>}

          <label className="text-sm font-medium">
            {t.booking.note}
            <textarea className={`${field('note')} resize-none`} rows={2} value={form.note} onChange={set('note')} placeholder={t.booking.notePh} maxLength={300} />
          </label>

          {Object.keys(errors).length > 0 && <p className="text-sm text-red-600">{t.booking.error}</p>}

          <button type="submit" disabled={sending} className="btn-gold mt-2 w-full disabled:opacity-60">
            <WhatsAppIcon />
            {sending ? t.booking.sending : t.booking.submit}
          </button>
        </form>
      </div>
    </div>
  )
}
