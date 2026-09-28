import { ArrowRight } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { WhatsAppIcon } from '../lib.jsx'

export default function Hero({ onBook }) {
  const { t } = useLang()

  return (
    <section id="top" className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-ink text-white lg:min-h-[720px] h-[100svh] max-h-[900px]">
      <img
        src="/images/hero.webp"
        srcSet="/images/hero-1000.webp 1000w, /images/hero.webp 2000w"
        sizes="100vw"
        alt=""
        className="animate-slow-zoom absolute inset-0 -z-20 size-full object-cover object-[72%_center]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-ink/45 lg:bg-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/60" />

      <div className="mx-auto w-full max-w-7xl px-5 pt-20 lg:px-10">
        <div className="max-w-xl">
          <p className="eyebrow text-white/80">{t.hero.eyebrow}</p>
          <h1 className="mt-5 font-serif text-[56px] leading-[0.95] font-medium sm:text-7xl lg:text-[88px]">
            {t.hero.title1}
            <br />
            <span className="text-gold-light">{t.hero.title2}</span>
          </h1>
          <p className="mt-6 text-lg font-light text-white/85 sm:text-xl">
            {t.hero.sub1}
            <br />
            {t.hero.sub2}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button onClick={() => onBook()} className="btn-gold group">
              <WhatsAppIcon />
              {t.nav.book}
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </button>
            <a href="#prestations" className="btn-outline">
              {t.hero.cta2}
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] tracking-[0.25em] text-white/70 uppercase">
            {t.hero.values.map((v, i) => (
              <li key={v} className="flex items-center gap-5">
                {i > 0 && <span className="h-3 w-px bg-white/30" />}
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute right-10 bottom-14 hidden text-[11px] leading-6 tracking-[0.3em] text-white/85 uppercase xl:block">
        <span className="mb-4 block h-px w-8 bg-gold" />
        {t.hero.side.map((l) => (
          <span key={l} className="block">{l}</span>
        ))}
        <span className="mt-4 block h-px w-8 bg-gold" />
      </div>
    </section>
  )
}
