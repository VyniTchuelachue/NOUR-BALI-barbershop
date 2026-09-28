import { Crown, Scissors, ShieldCheck, Star } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { Reveal } from '../lib.jsx'

const ICONS = [Scissors, Crown, ShieldCheck, Star]

export default function WhyUs() {
  const { t } = useLang()

  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,161,91,0.12),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1fr_2.2fr] lg:px-10">
        <Reveal>
          <p className="eyebrow text-gold">{t.why.eyebrow}</p>
          <h2 className="mt-3 font-serif text-4xl leading-[1.08] font-medium lg:text-[44px]">
            {t.why.title1}
            <br />
            {t.why.title2}
          </h2>
        </Reveal>

        <ul className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {t.why.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal
                as="li"
                key={item.t}
                delay={i * 100}
                className={`px-4 text-center lg:px-6 ${i > 0 ? 'lg:border-l lg:border-white/15' : ''} ${i % 2 ? 'border-l border-white/15 lg:border-l' : ''}`}
              >
                <Icon className="mx-auto size-9 text-gold" strokeWidth={1.2} />
                <h3 className="mt-4 font-serif text-xl">{item.t}</h3>
                <p className="mx-auto mt-2 max-w-[190px] text-[13px] leading-relaxed text-white/65">{item.d}</p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
