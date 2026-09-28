import { ArrowRight } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { img, Reveal } from '../lib.jsx'

const TOOLS_IMAGE = 'https://images.unsplash.com/photo-1621605815971-fbc98d665033'
const SHOP_IMAGE = 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70'

export default function Salon({ mapsUrl }) {
  const { t } = useLang()

  return (
    <section id="salon" className="grid bg-cream lg:grid-cols-2">
      <div className="relative min-h-[320px] overflow-hidden bg-ink lg:min-h-[520px]">
        <img src={img(TOOLS_IMAGE, 1400)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
      </div>

      <div className="relative isolate overflow-hidden">
        <img
          src={img(SHOP_IMAGE, 1400)}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-20 size-full object-cover opacity-90"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cream via-cream/95 to-cream/40" />

        <Reveal className="flex h-full max-w-xl flex-col justify-center px-6 py-16 sm:px-12 lg:py-20 xl:px-16">
          <p className="eyebrow text-stone">{t.salon.eyebrow}</p>
          <h2 className="mt-3 font-serif text-[40px] leading-[1.05] font-medium lg:text-5xl">
            {t.salon.title1}
            <br />
            {t.salon.title2}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/75">{t.salon.body}</p>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold group mt-8 self-start">
            {t.salon.cta}
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
