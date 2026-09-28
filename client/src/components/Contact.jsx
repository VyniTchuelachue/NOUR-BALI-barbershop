import { Clock, MapPin, Phone } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { img, Reveal, WhatsAppIcon } from '../lib.jsx'

const FRONT_IMAGE = 'https://images.unsplash.com/photo-1512690459411-b9245aed614b'

export default function Contact({ info, onBook }) {
  const { t, lang } = useLang()
  const { lat, lng } = info.geo
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  const embed = `https://www.google.com/maps?q=${lat},${lng}&z=16&hl=${lang}&output=embed`

  return (
    <section id="contact" className="grid bg-cream lg:grid-cols-[1fr_1.1fr_1fr]">
      <div className="relative min-h-[260px] overflow-hidden bg-ink">
        <img src={img(FRONT_IMAGE, 1000)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <p className="absolute bottom-6 left-6 font-serif text-3xl leading-none text-gold-light">
          NOUR BALI
          <span className="mt-1 block font-sans text-[10px] tracking-[0.5em] text-gold-light/80">BARBER SHOP</span>
        </p>
      </div>

      <Reveal className="flex flex-col justify-center px-6 py-14 sm:px-10">
        <p className="eyebrow text-stone">{t.contact.eyebrow}</p>
        <h2 className="mt-3 font-serif text-[38px] leading-tight font-medium">{t.contact.title}</h2>

        <dl className="mt-8 grid gap-6 text-[15px] sm:grid-cols-2">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-gold-dark" />
            <div>
              <dt className="font-medium">Nour Bali — Barber Shop</dt>
              <dd className="text-ink/60">{info.address[lang]}</dd>
            </div>
          </div>
          <div className="space-y-4">
            <a href={`tel:+${info.whatsapp}`} className="flex items-center gap-3 transition hover:text-gold-dark">
              <Phone className="size-5 shrink-0 text-gold-dark" />
              {info.phone}
            </a>
            <div className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-gold-dark" />
              <div className="text-ink/70">
                {info.hours.map((h) => (
                  <p key={h.fr}>{h[lang]}</p>
                ))}
              </div>
            </div>
          </div>
        </dl>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => onBook()} className="btn-gold">
            <WhatsAppIcon className="size-[18px]" />
            {t.nav.book}
          </button>
          <a href={directions} target="_blank" rel="noopener noreferrer" className="btn-dark">
            {t.contact.directions}
          </a>
        </div>
      </Reveal>

      <div className="min-h-[320px] bg-cream-2">
        <iframe
          title={t.contact.mapTitle}
          src={embed}
          className="size-full min-h-[320px] border-0 grayscale-[35%] sepia-[15%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
