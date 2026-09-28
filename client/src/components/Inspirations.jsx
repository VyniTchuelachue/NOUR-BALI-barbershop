import { useLang } from '../i18n.jsx'
import { img, Reveal } from '../lib.jsx'

export default function Inspirations({ items, onBook }) {
  const { t, lang } = useLang()

  return (
    <section id="inspirations" className="bg-cream py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-stone">{t.insp.eyebrow}</p>
            <h2 className="mt-3 font-serif text-[40px] leading-tight font-medium lg:text-5xl">{t.insp.title}</h2>
          </div>
          <p className="text-sm text-ink/60">{t.insp.hint}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((it, i) => (
            <Reveal key={it.id} delay={i * 80}>
              <button
                onClick={() => onBook({ note: `${t.insp.note} : ${it.name[lang]}` })}
                className="group block w-full text-center"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-ink">
                  <img
                    src={img(it.image, 500)}
                    alt={it.name[lang]}
                    loading="lazy"
                    className="size-full object-cover grayscale-[25%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-[2px] bg-gold py-1.5 text-xs font-medium tracking-wide text-ink opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    {t.services.book}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-lg leading-tight">{it.name[lang]}</h3>
                <p className="mt-0.5 text-[10px] tracking-[0.25em] text-stone uppercase">{it.tag[lang]}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
