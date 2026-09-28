import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { Logo, WhatsAppIcon } from '../lib.jsx'

export const NAV_LINKS = [
  ['services', '#prestations'],
  ['salon', '#salon'],
  ['inspirations', '#inspirations'],
  ['contact', '#contact'],
]

export function LangSwitch({ className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`flex items-center gap-2 text-xs tracking-[0.2em] ${className}`}>
      {['fr', 'en'].map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className="opacity-40">/</span>}
          <button
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`uppercase transition hover:text-gold ${lang === l ? 'text-gold' : 'opacity-70'}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  )
}

export default function Navbar({ onBook }) {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || open ? 'bg-ink/90 py-3 shadow-lg shadow-black/30 backdrop-blur-md' : 'py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 lg:px-10">
        <a href="#top" aria-label="Nour Bali — accueil" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-10 text-[13px] tracking-wide text-white/85 lg:flex">
          {NAV_LINKS.map(([key, href]) => (
            <a key={key} href={href} className="relative py-1 transition hover:text-gold after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100">
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-8 lg:flex">
          <LangSwitch className="text-white" />
          <button onClick={() => onBook()} className="btn-gold !py-2.5 !px-5">
            <WhatsAppIcon className="size-[18px]" />
            {t.nav.book}
          </button>
        </div>

        <button
          className="grid size-11 place-items-center text-white lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={t.nav.menu}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 lg:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-5 pb-8 pt-6">
            {NAV_LINKS.map(([key, href]) => (
              <a
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-serif text-2xl text-white transition hover:text-gold"
              >
                {t.nav[key]}
              </a>
            ))}
            <div className="mt-6 flex items-center justify-between">
              <LangSwitch className="text-white" />
              <button
                onClick={() => {
                  setOpen(false)
                  onBook()
                }}
                className="btn-gold"
              >
                <WhatsAppIcon className="size-[18px]" />
                {t.nav.book}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
