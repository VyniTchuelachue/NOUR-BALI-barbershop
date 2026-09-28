# Nour Bali — Barber Shop (Bonapriso, Douala)

Site vitrine bilingue (FR/EN) : **React + Vite + Tailwind CSS v4** côté client, **Node.js + Express** côté serveur.

## Démarrer

```bash
npm install
npm run dev      # API sur :4000 + site sur http://localhost:5173
```

Production :

```bash
npm run build    # génère client/dist
npm start        # Express sert le site + l'API sur http://localhost:4000 (PORT configurable)
```

## Structure

- `server/data/content.js` — **tout le contenu modifiable** : téléphone, horaires, prestations & prix, inspirations, avis, réseaux sociaux.
- `server/index.js` — API : `GET /api/content`, `POST /api/booking` (valide la demande, l'enregistre dans `server/data/bookings.json`, renvoie un lien WhatsApp pré-rempli).
- `client/src/i18n.jsx` — textes FR/EN de l'interface.
- `client/src/components/` — sections de la page (Hero, Prestations, Salon, Inspirations, Avis, Contact…).

## À compléter avant la mise en ligne

- Remplacer les photos d'illustration (Unsplash) par les vraies photos du salon.
- Remplacer les avis d'exemple par de vrais avis Google.
- Vérifier horaires et prix, renseigner Instagram/Facebook dans `info.social`.

## Déploiement Vercel

Importez le dépôt sur Vercel sans rien changer : `vercel.json` configure le build (`client/dist`) et les
fonctions serverless du dossier `api/` remplacent le serveur Express. Sur Vercel, les réservations ne sont
pas enregistrées sur disque : le message WhatsApp fait office de trace.
