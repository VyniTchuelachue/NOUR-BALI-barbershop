// Contenu éditable du site. Les textes sont bilingues { fr, en }.
// Les images pointent vers Unsplash (photos d'illustration) : remplacez `image`
// par un chemin local (ex. "/images/coupe.jpg" dans client/public/images) pour
// utiliser les vraies photos du salon.

export const info = {
  name: 'Nour Bali',
  tagline: 'Barber Shop',
  phone: '+237 673 93 78 79',
  whatsapp: '237673937879',
  address: { fr: 'Bonapriso, Douala — Cameroun', en: 'Bonapriso, Douala — Cameroon' },
  hours: [
    { fr: 'Lun – Sam : 9h – 20h', en: 'Mon – Sat: 9am – 8pm' },
    { fr: 'Dimanche : sur rendez-vous', en: 'Sunday: by appointment' },
  ],
  geo: { lat: 4.0249381, lng: 9.6966442 },
  mapsUrl: 'https://maps.app.goo.gl/ayVgzRQehz1YYSvV8',
  social: { instagram: '', facebook: '', tiktok: '' },
}

export const services = [
  {
    id: 'coupe',
    name: { fr: 'Coupe homme', en: "Men's haircut" },
    description: {
      fr: 'Une coupe précise, moderne ou classique, adaptée à votre style et à votre personnalité.',
      en: 'A precise cut, modern or classic, tailored to your style and personality.',
    },
    price: { min: 3000, max: 8000 },
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c',
  },
  {
    id: 'barbe',
    name: { fr: 'Taille de barbe', en: 'Beard trim' },
    description: {
      fr: 'Une barbe soignée, des contours nets, pour un caractère affirmé.',
      en: 'A well-groomed beard with sharp lines, for a bold character.',
    },
    price: { min: 3000, max: 7000 },
    image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186',
  },
  {
    id: 'coupe-barbe',
    name: { fr: 'Coupe & barbe', en: 'Cut & beard' },
    description: {
      fr: 'L’alliance parfaite pour un look complet et harmonieux.',
      en: 'The perfect pairing for a complete, balanced look.',
    },
    price: { min: 5000, max: 20000 },
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a',
  },
]

// Prestations complémentaires — ajustez les prix quand ils sont fixés.
export const extras = [
  { id: 'rasage', name: { fr: 'Rasage traditionnel', en: 'Traditional shave' }, price: null },
  { id: 'contours', name: { fr: 'Contours & tracés', en: 'Line-up & designs' }, price: null },
  { id: 'enfant', name: { fr: 'Coupe enfant', en: "Kids' haircut" }, price: null },
  { id: 'soin', name: { fr: 'Soin du visage', en: 'Facial care' }, price: null },
  { id: 'teinture', name: { fr: 'Teinture barbe / cheveux', en: 'Beard / hair colouring' }, price: null },
]

export const inspirations = [
  { id: 'classique', name: { fr: 'Style classique', en: 'Classic style' }, tag: { fr: 'Élégant', en: 'Elegant' }, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d' },
  { id: 'moderne', name: { fr: 'Style moderne', en: 'Modern style' }, tag: { fr: 'Affirmé', en: 'Bold' }, image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0' },
  { id: 'degrade', name: { fr: 'Dégradé', en: 'Fade' }, tag: { fr: 'Intemporel', en: 'Timeless' }, image: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38' },
  { id: 'barbe', name: { fr: 'Barbe sculptée', en: 'Sculpted beard' }, tag: { fr: 'Caractère', en: 'Character' }, image: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af' },
  { id: 'texture', name: { fr: 'Style texturé', en: 'Textured style' }, tag: { fr: 'Tendance', en: 'Trendy' }, image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6' },
  { id: 'urbain', name: { fr: 'Style urbain', en: 'Urban style' }, tag: { fr: 'Audacieux', en: 'Daring' }, image: 'https://images.unsplash.com/photo-1590540179852-2110a54f813a' },
]

// ⚠️ Avis d'exemple repris de la maquette — remplacez-les par de vrais avis clients (Google).
export const reviews = [
  {
    author: 'Julien T.',
    since: { fr: 'Client fidèle', en: 'Loyal client' },
    rating: 5,
    text: {
      fr: 'Meilleur barber shop de Douala ! Accueil au top, coupe toujours impeccable.',
      en: 'Best barber shop in Douala! Great welcome, always a flawless cut.',
    },
  },
  {
    author: 'Marc D.',
    since: { fr: 'Client depuis 1 an', en: 'Client for 1 year' },
    rating: 5,
    text: {
      fr: 'Un vrai savoir-faire. L’équipe est professionnelle et l’ambiance est incroyable.',
      en: 'Real craftsmanship. The team is professional and the vibe is amazing.',
    },
  },
  {
    author: 'Steve M.',
    since: { fr: 'Client régulier', en: 'Regular client' },
    rating: 5,
    text: {
      fr: 'Je ressors toujours satisfait. Propreté, précision et excellent service.',
      en: 'I always leave satisfied. Clean, precise and excellent service.',
    },
  },
]
