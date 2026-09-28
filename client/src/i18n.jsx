import { createContext, useContext, useEffect, useState } from 'react'

const dict = {
  fr: {
    nav: { services: 'Prestations', salon: 'Le salon', inspirations: 'Inspirations', contact: 'Nous trouver', book: 'Réserver sur WhatsApp', menu: 'Menu' },
    hero: {
      eyebrow: 'Bonapriso — Douala',
      title1: 'Votre style.',
      title2: 'Notre signature.',
      sub1: 'Coupe, barbe et précision du geste.',
      sub2: 'Une expérience soignée pour un style qui vous ressemble.',
      cta2: 'Découvrir nos prestations',
      values: ['Confiance', 'Style', 'Caractère', 'Élégance'],
      side: ['Plus', 'qu’une coupe', 'un meilleur vous'],
    },
    services: {
      eyebrow: 'Nos prestations',
      title1: 'L’art du détail,',
      title2: 'pour un style affirmé.',
      intro: 'Des prestations soignées, réalisées avec précision et passion pour révéler la meilleure version de vous.',
      more: 'Voir toutes les prestations',
      less: 'Masquer les prestations',
      extrasTitle: 'Autres prestations',
      onRequest: 'Prix sur demande',
      book: 'Réserver',
    },
    why: {
      eyebrow: 'Pourquoi choisir Nour Bali ?',
      title1: 'Plus qu’un barber shop,',
      title2: 'une expérience.',
      items: [
        { t: 'Précision', d: 'Un savoir-faire maîtrisé dans les moindres détails.' },
        { t: 'Accueil premium', d: 'Un service attentionné dans un cadre élégant.' },
        { t: 'Hygiène irréprochable', d: 'Un environnement propre et sécurisé.' },
        { t: 'Expertise', d: 'Des barbiers passionnés et constamment formés.' },
      ],
    },
    salon: {
      eyebrow: 'Notre univers',
      title1: 'Le savoir-faire',
      title2: 'au service de votre style.',
      body: 'Chez Nour Bali, chaque coupe est le fruit d’une expertise, d’une écoute et d’une passion pour l’art du grooming. Nous vous accueillons à Bonapriso, Douala, dans un espace élégant et convivial, pensé pour votre confort.',
      cta: 'Découvrir le salon',
    },
    insp: {
      eyebrow: 'Inspirations',
      title: 'Trouvez votre prochain style.',
      hint: 'Un style vous plaît ? Touchez-le pour le réserver.',
      note: 'Inspiration',
    },
    reviews: { eyebrow: 'Avis clients', title: 'Ils nous font confiance.', google: 'Voir nos avis Google' },
    contact: { eyebrow: 'Nous trouver', title: 'Rendez-vous à Bonapriso.', directions: 'Voir l’itinéraire', mapTitle: 'Carte — Nour Bali Barber Shop' },
    cta: { eyebrow: 'Votre style vous attend', title: 'Prêt pour votre prochaine coupe ?', btn: 'Réserver maintenant sur WhatsApp', side: ['Même style', 'plus grand demain'] },
    footer: { rights: 'Tous droits réservés.', credit: 'Photos d’illustration' },
    booking: {
      title: 'Réserver votre rendez-vous',
      sub: 'Indiquez vos préférences : nous ouvrons WhatsApp avec votre message prêt à envoyer.',
      name: 'Votre nom',
      service: 'Prestation',
      choose: 'Choisir une prestation',
      date: 'Date',
      time: 'Heure',
      note: 'Précision (facultatif)',
      notePh: 'Ex. dégradé bas, contours nets…',
      submit: 'Continuer sur WhatsApp',
      sending: 'Préparation…',
      error: 'Merci de vérifier les champs en rouge.',
      sunday: 'Le dimanche, nous recevons uniquement sur rendez-vous confirmé.',
      close: 'Fermer',
    },
  },
  en: {
    nav: { services: 'Services', salon: 'The shop', inspirations: 'Inspiration', contact: 'Find us', book: 'Book on WhatsApp', menu: 'Menu' },
    hero: {
      eyebrow: 'Bonapriso — Douala',
      title1: 'Your style.',
      title2: 'Our signature.',
      sub1: 'Cuts, beards and precision in every move.',
      sub2: 'A refined experience for a style that truly fits you.',
      cta2: 'Explore our services',
      values: ['Trust', 'Style', 'Character', 'Elegance'],
      side: ['More', 'than a cut', 'a better you'],
    },
    services: {
      eyebrow: 'Our services',
      title1: 'The art of detail,',
      title2: 'for a confident style.',
      intro: 'Carefully crafted services, delivered with precision and passion to reveal the best version of you.',
      more: 'See all services',
      less: 'Hide services',
      extrasTitle: 'More services',
      onRequest: 'Price on request',
      book: 'Book',
    },
    why: {
      eyebrow: 'Why choose Nour Bali?',
      title1: 'More than a barber shop,',
      title2: 'an experience.',
      items: [
        { t: 'Precision', d: 'Mastered craftsmanship, down to the smallest detail.' },
        { t: 'Premium welcome', d: 'Attentive service in an elegant setting.' },
        { t: 'Spotless hygiene', d: 'A clean and safe environment.' },
        { t: 'Expertise', d: 'Passionate barbers, constantly trained.' },
      ],
    },
    salon: {
      eyebrow: 'Our world',
      title1: 'Craftsmanship',
      title2: 'at the service of your style.',
      body: 'At Nour Bali, every cut comes from expertise, listening and a passion for the art of grooming. We welcome you in Bonapriso, Douala, in an elegant and friendly space designed for your comfort.',
      cta: 'Discover the shop',
    },
    insp: {
      eyebrow: 'Inspiration',
      title: 'Find your next style.',
      hint: 'Like a style? Tap it to book it.',
      note: 'Inspiration',
    },
    reviews: { eyebrow: 'Client reviews', title: 'They trust us.', google: 'See our Google reviews' },
    contact: { eyebrow: 'Find us', title: 'Meet us in Bonapriso.', directions: 'Get directions', mapTitle: 'Map — Nour Bali Barber Shop' },
    cta: { eyebrow: 'Your style is waiting', title: 'Ready for your next cut?', btn: 'Book now on WhatsApp', side: ['Same style', 'bigger tomorrow'] },
    footer: { rights: 'All rights reserved.', credit: 'Illustrative photos' },
    booking: {
      title: 'Book your appointment',
      sub: 'Tell us your preferences — we’ll open WhatsApp with your message ready to send.',
      name: 'Your name',
      service: 'Service',
      choose: 'Choose a service',
      date: 'Date',
      time: 'Time',
      note: 'Details (optional)',
      notePh: 'E.g. low fade, sharp line-up…',
      submit: 'Continue on WhatsApp',
      sending: 'Preparing…',
      error: 'Please check the fields in red.',
      sunday: 'On Sundays we only see clients with a confirmed appointment.',
      close: 'Close',
    },
  },
}

const LangContext = createContext(null)

function initialLang() {
  try {
    const saved = localStorage.getItem('nb-lang')
    if (saved === 'fr' || saved === 'en') return saved
  } catch {
    // stockage indisponible
  }
  return 'fr'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('nb-lang', lang)
    } catch {
      // stockage indisponible
    }
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
