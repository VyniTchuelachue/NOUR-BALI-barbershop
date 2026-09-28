import { Phone } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { Logo } from '../lib.jsx'
import { LangSwitch, NAV_LINKS } from './Navbar.jsx'

const SOCIAL_LABELS = { instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok' }

export default function Footer({ info }) {
  const { t } = useLang()
  const socials = Object.entries(info.social).filter(([, url]) => url)

  return (
    <footer className="bg-cream text-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-10 lg:flex-row lg:justify-between lg:px-10">
        <Logo className="[&>span]:!text-ink" />

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px]">
          {NAV_LINKS.map(([key, href]) => (
            <a key={key} href={href} className="transition hover:text-gold-dark">
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap items-center justify-center gap-6 text-[13px]">
          <LangSwitch />
          {socials.map(([key, url]) => (
            <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-dark">
              {SOCIAL_LABELS[key]}
            </a>
          ))}
          <a href={`tel:+${info.whatsapp}`} className="flex items-center gap-2 transition hover:text-gold-dark">
            <Phone className="size-4" />
            {info.phone}
          </a>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <p className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-ink/50 lg:px-10 lg:text-left">
          © {new Date().getFullYear()} Nour Bali Barber Shop — Bonapriso, Douala. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
