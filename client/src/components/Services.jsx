import { useState } from 'react'
import { ArrowRight, Plus, Minus } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { formatPrice, img, Reveal } from '../lib.jsx'

export default function Services({ services, extras, onBook }) {
  const { t, lang } = useLang()
  const [showAll, setShowAll] = useState(false)

  return (
    <section id="prestations" className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal className="grid items-end gap-6 lg:grid-cols-[1.1fr_1fr_auto] lg:gap-12">
          <div>
            <p className="eyebrow text-stone">{t.services.eyebrow}</p>
            <h2 className="mt-3 font-serif text-[42px] leading-[1.02] font-medium sm:text-5xl lg:text-[56px]">
              {t.services.title1}
              <br />
              {t.services.title2}
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-ink/70">{t.services.intro}</p>
          <button onClick={() => setShowAll((s) => !s)} className="link-arrow justify-self-start text-ink" aria-expanded={showAll}>
            {showAll ? t.services.less : t.services.more}
            {showAll ? <Minus className="size-4" /> : <ArrowRight className="size-4" />}
          </button>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              as="article"
              key={s.id}
              delay={i * 120}
              className="group flex flex-col overflow-hidden rounded-[4px] bg-white shadow-[0_20px_50px_-30px_rgba(13,11,9,0.45)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-ink">
                <img
                  src={img(s.image, 900)}
                  alt={s.name[lang]}
                  loading="lazy"
                  className="size-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-[28px] leading-tight font-medium">{s.name[lang]}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/65">{s.description[lang]}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-medium tracking-wide text-gold-dark">{formatPrice(s.price)}</span>
                  <button
                    onClick={() => onBook({ service: s.id })}
                    aria-label={`${t.services.book} — ${s.name[lang]}`}
                    className="grid size-11 place-items-center rounded-full border border-gold/70 text-gold-dark transition duration-300 group-hover:bg-gold group-hover:text-ink"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className={`grid transition-[grid-template-rows] duration-500 ${showAll ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="min-h-0 overflow-hidden">
            <div className="mt-10 rounded-[4px] border border-ink/10 bg-cream-2/60 p-6 sm:p-8">
              <p className="eyebrow text-stone">{t.services.extrasTitle}</p>
              <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
                {extras.map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-4 border-b border-ink/10 py-4">
                    <span className="font-serif text-xl">{e.name[lang]}</span>
                    <span className="flex items-center gap-4">
                      <span className="text-sm text-ink/55">{e.price ? formatPrice(e.price) : t.services.onRequest}</span>
                      <button
                        onClick={() => onBook({ service: e.id })}
                        className="grid size-8 place-items-center rounded-full border border-gold/70 text-gold-dark transition hover:bg-gold hover:text-ink"
                        aria-label={`${t.services.book} — ${e.name[lang]}`}
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
