import { ArrowUpRight, Star } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { Reveal } from '../lib.jsx'

export default function Reviews({ reviews, mapsUrl }) {
  const { t, lang } = useLang()

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,161,91,0.10),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_2.4fr] lg:items-center lg:px-10">
        <Reveal>
          <p className="eyebrow text-gold">{t.reviews.eyebrow}</p>
          <h2 className="mt-3 font-serif text-[40px] leading-[1.05] font-medium lg:text-5xl">{t.reviews.title}</h2>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-6 text-white/80 hover:!text-gold">
            {t.reviews.google}
            <ArrowUpRight className="size-4" />
          </a>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal
              as="figure"
              key={r.author}
              delay={i * 120}
              className="flex flex-col rounded-[4px] border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/40"
            >
              <div className="flex gap-1 text-gold" aria-label={`${r.rating}/5`}>
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-white/85">“{r.text[lang]}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-gold/15 font-serif text-lg text-gold">
                  {r.author[0]}
                </span>
                <span>
                  <span className="block text-sm font-medium">{r.author}</span>
                  <span className="block text-xs text-white/50">{r.since[lang]}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
