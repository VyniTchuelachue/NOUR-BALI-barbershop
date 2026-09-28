import { useCallback, useState } from 'react'
import { useLang } from './i18n.jsx'
import { useContent, WhatsAppIcon } from './lib.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import WhyUs from './components/WhyUs.jsx'
import Salon from './components/Salon.jsx'
import Inspirations from './components/Inspirations.jsx'
import Reviews from './components/Reviews.jsx'
import Contact from './components/Contact.jsx'
import CtaBand from './components/CtaBand.jsx'
import Footer from './components/Footer.jsx'
import BookingModal from './components/BookingModal.jsx'

export default function App() {
  const { t } = useLang()
  const { content, error } = useContent()
  const [booking, setBooking] = useState({ open: false, preset: null })

  const openBooking = useCallback((preset = null) => setBooking({ open: true, preset }), [])
  const closeBooking = useCallback(() => setBooking((b) => ({ ...b, open: false })), [])

  return (
    <>
      <Navbar onBook={openBooking} />
      <main>
        <Hero onBook={openBooking} />
        {content ? (
          <>
            <Services services={content.services} extras={content.extras} onBook={openBooking} />
            <WhyUs />
            <Salon mapsUrl={content.info.mapsUrl} />
            <Inspirations items={content.inspirations} onBook={openBooking} />
            <Reviews reviews={content.reviews} mapsUrl={content.info.mapsUrl} />
            <Contact info={content.info} onBook={openBooking} />
            <CtaBand onBook={openBooking} />
          </>
        ) : (
          <div className="grid min-h-[50vh] place-items-center bg-cream text-sm text-ink/60">
            {error ? 'Impossible de charger le contenu — le serveur est-il démarré ?' : <span className="size-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />}
          </div>
        )}
      </main>
      {content && <Footer info={content.info} />}

      {content && (
        <BookingModal
          open={booking.open}
          preset={booking.preset}
          onClose={closeBooking}
          services={content.services}
          extras={content.extras}
          whatsapp={content.info.whatsapp}
        />
      )}

      {/* Bouton WhatsApp flottant (mobile) */}
      <button
        onClick={() => openBooking()}
        aria-label={t.nav.book}
        className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition hover:scale-105 lg:hidden"
      >
        <WhatsAppIcon className="size-7" />
      </button>
    </>
  )
}
