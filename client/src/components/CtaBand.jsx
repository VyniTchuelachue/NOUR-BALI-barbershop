import { ArrowRight } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { img, Reveal, WhatsAppIcon } from '../lib.jsx'

const CHAIR_IMAGE = 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1'

export default function CtaBand({ onBook }) {
  const { t } = useLang()

  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 text-white lg:py-20">
      <img src={img(CHAIR_IMAGE, 2000)} alt="" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover opacity-50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/60" />

      <Reveal className="mx-auto flex max-w-7xl flex-col gap-8 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="eyebrow text-gold">{t.cta.eyebrow}</p>
          <h2 className="mt-3 font-serif text-[40px] leading-tight font-medium lg:text-[52px]">{t.cta.title}</h2>
        </div>
        <div className="flex items-center gap-12">
          <button onClick={() => onBook()} className="btn-gold group !px-8 !py-4">
            <WhatsAppIcon />
            {t.cta.btn}
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </button>
          <div className="hidden text-[11px] leading-6 tracking-[0.3em] text-white/80 uppercase xl:block">
            <span className="mb-3 block h-px w-8 bg-gold" />
            {t.cta.side.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
