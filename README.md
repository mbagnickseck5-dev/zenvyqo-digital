# Zenvyqo Digital — site officiel

Site de l'agence Zenvyqo Digital : création de sites internet pour les PME canadiennes, avec priorité à Montréal et au Québec.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Supabase · Stripe.

## Démarrage rapide

Prérequis : Node.js 20.9 ou plus récent.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvrir http://localhost:3000 (redirige vers `/fr`). La version anglaise est sur `/en`.

Sans aucune variable d'environnement, le site fonctionne en **mode démo** : le formulaire valide et confirme la demande, mais ne l'enregistre nulle part (un bandeau l'indique dans la confirmation).

## Structure

```
src/
├─ app/
│  ├─ [locale]/                 fr | en
│  │  ├─ layout.tsx             <html>, métadonnées SEO, en-tête, pied de page
│  │  ├─ page.tsx               page d'accueil (assemble les sections)
│  │  ├─ legal/[slug]/page.tsx  mentions légales, confidentialité, conditions
│  │  └─ merci/page.tsx         retour après paiement Stripe
│  ├─ api/
│  │  ├─ leads/route.ts         reçoit les demandes → Supabase (+ webhook optionnel)
│  │  ├─ checkout/route.ts      crée la session Stripe Checkout
│  │  └─ stripe/webhook/route.ts  marque le prospect « paid »
│  ├─ globals.css               thème (couleurs, typographies, animations CSS du héros)
│  ├─ fonts/                    Montserrat et Inter (woff2, sous-ensemble latin, licence OFL)
│  ├─ icon.svg · favicon.ico · apple-icon.png   icônes du site
│  ├─ sitemap.ts · robots.ts
├─ components/
│  ├─ sections/                 Hero, Advantages, Services, Pricing, Process,
│  │                            Portfolio, About, Faq, Contact, CtaBand
│  ├─ Header.tsx · Footer.tsx · Logo.tsx · HeroVisual.tsx · OfferBar.tsx
│  ├─ QuoteProvider.tsx         fenêtre de devis, ouverte depuis n'importe quel bouton
│  ├─ LazyLeadForm.tsx          charge le formulaire à la demande (allège la page)
│  ├─ QuoteButton.tsx · LeadForm.tsx · Reveal.tsx · MotionProvider.tsx
└─ lib/
   ├─ plans.ts                  LES PRIX et l'offre de lancement : source unique (affichage, formulaire, Stripe)
   ├─ seo.ts · fonts.ts          balises de partage, polices
   ├─ i18n/fr.ts · en.ts        tous les textes du site
   ├─ validation.ts             schéma Zod partagé client/serveur
   ├─ supabase.ts · stripe.ts · site.ts · ui.ts · provinces.ts
public/og/                      images de partage 1200 × 630 (FR et EN)
public/logo-zenvyqo.png         logo carré (données structurées Google)
supabase/schema.sql             table `leads`
```

Pour modifier un texte : `src/lib/i18n/fr.ts` (et `en.ts`). Pour modifier un prix : `src/lib/plans.ts`, puis les textes des conditions dans les fichiers i18n.

## Variables d'environnement

Toutes sont décrites dans `.env.example`.

| Variable | Rôle | Obligatoire |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, retours Stripe) | En production |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Remplace le numéro WhatsApp Business (par défaut 15145525923) | Non |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Remplace le courriel affiché (par défaut contactzenvyqo@gmail.com) | Non |
| `NEXT_PUBLIC_CONTACT_PHONE` | Remplace le téléphone affiché (par défaut +1 514 552-5923) | Non |
| `SUPABASE_URL` | URL du projet Supabase | Pour enregistrer les prospects |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé serveur Supabase (secrète) | Pour enregistrer les prospects |
| `LEADS_WEBHOOK_URL` | Relaie chaque demande (Make, Zapier, n8n, Slack) | Non |
| `NEXT_PUBLIC_STRIPE_ENABLED` | `true` affiche le bouton de paiement après l'envoi | Non |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe, de test (`sk_test_…`) | Pour le paiement |
| `STRIPE_WEBHOOK_SECRET` | Secret de signature du webhook | Pour le suivi des paiements |
| `STRIPE_ALLOW_LIVE` | `true` autorise une clé réelle | Seulement à l'activation |
| `NEXT_PUBLIC_FOUNDERS_OFFER` | `false` retire l'offre « clients fondateurs » (bandeau, forfaits, FAQ, conditions) | Quand les 5 places sont prises |
| `NEXT_PUBLIC_LEGAL_NAME` | Dénomination légale, affichée dans les mentions légales | Dès l'immatriculation |
| `NEXT_PUBLIC_BUSINESS_NUMBER` | Numéro d'entreprise (ex. `NEQ 1234567890`) | Dès l'immatriculation |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Code de la balise HTML de Google Search Console | Pour valider le site dans Search Console |

## Réception des demandes

À l'envoi d'un formulaire (devis ou contact) :

1. **WhatsApp** s'ouvre chez le visiteur avec sa demande déjà rédigée (forfait, nom, entreprise, courriel, téléphone, ville, secteur, projet, rappel souhaité), adressée au numéro WhatsApp Business de `src/lib/site.ts`. Le visiteur n'a plus qu'à appuyer sur « Envoyer ».
2. **Copie de sauvegarde** dans Netlify Forms (formulaire `demande`, déclaré dans `public/__forms.html`) : Netlify → projet → Forms. Pour recevoir chaque demande par courriel : Forms → Form notifications → Add notification → Email notification.
3. **Supabase** (facultatif, voir plus bas) via `/api/leads`.

Le code est dans `src/lib/leadDelivery.ts`.

## Supabase : enregistrer les prospects

1. Créer un projet sur supabase.com.
2. SQL Editor → coller le contenu de `supabase/schema.sql` → Run.
3. Project Settings → API : copier l'URL du projet dans `SUPABASE_URL` et la clé `service_role` dans `SUPABASE_SERVICE_ROLE_KEY`.
4. Redémarrer le site, envoyer une demande de test, vérifier la ligne dans Table Editor → `leads`.

La table a le RLS activé sans politique : elle est illisible avec les clés publiques. Seul le serveur du site y écrit. La colonne `status` (`new`, `contacted`, `qualified`, `paid`, `won`, `lost`) sert de mini-CRM directement dans Supabase.

## Stripe : mode test

Le parcours : le visiteur envoie le formulaire avec un forfait → la confirmation propose « Payer et démarrer l'abonnement » → Stripe Checkout facture la mensualité et les frais de création sur la première facture.

1. Créer un compte Stripe et rester en **mode test**.
2. Copier la clé secrète de test dans `STRIPE_SECRET_KEY` et mettre `NEXT_PUBLIC_STRIPE_ENABLED=true`.
3. Tester avec la carte `4242 4242 4242 4242`, une date future et un CVC quelconque.
4. Webhook en local : `stripe listen --forward-to localhost:3000/api/stripe/webhook`, puis copier le secret affiché dans `STRIPE_WEBHOOK_SECRET`. En production : Stripe → Developers → Webhooks → ajouter `https://votre-domaine/api/stripe/webhook` avec l'événement `checkout.session.completed`.

Aucun produit n'est à créer dans Stripe : les montants sont envoyés depuis `src/lib/plans.ts`.

**Garde-fou.** Une clé réelle (`sk_live_…`) est refusée tant que `STRIPE_ALLOW_LIVE` n'est pas `true`. À faire avant l'activation réelle :

- valider les conditions d'abonnement (voir plus bas) ;
- décider du traitement des taxes (TPS/TVQ) et, au besoin, activer Stripe Tax ;
- l'engagement de 12 mois est contractuel : Stripe Checkout ne l'impose pas techniquement. Pour l'imposer, utiliser les « subscription schedules » de Stripe.

Le parcours Stripe n'a pas pu être exécuté pendant le développement (aucune clé disponible) : le tester en mode test avant toute mise en production.

## Offre de lancement « clients fondateurs »

Réglée dans `src/lib/plans.ts` (`FOUNDERS_OFFER` : 5 places, engagement de 3 mois, frais de création offerts). Tant qu'elle est active : bandeau en haut des pages, encadré et prix barrés dans les forfaits, note dans la FAQ, section dans les conditions, et paiement Stripe sans frais de création.

Pour la retirer : Netlify → Project configuration → Environment variables → `NEXT_PUBLIC_FOUNDERS_OFFER` = `false`, puis Deploys → Trigger deploy.

## Visuels

Les quatre visuels du site sont générés par IA : le héros (`hero-sites.png` : tablette, portable et téléphone affichant des sites de démonstration) et les trois aperçus de la section Réalisations (`modele-restaurant.png`, `modele-salon.png`, `modele-nettoyage.png`). Le script `scripts/fetch-visuals.mjs` les télécharge dans `public/visuels/` avant chaque compilation (`npm run build`).

- Si un téléchargement échoue, la compilation continue et la section affiche son illustration de secours.
- Pour ne plus dépendre des liens d'origine : lancer `npm run build` une fois en local, puis commiter les quatre fichiers `public/visuels/*.png`. Un fichier présent n'est jamais retéléchargé.
- Pour remplacer un visuel : déposer un fichier du même nom (`hero-sites.png`, `modele-restaurant.png`, `modele-salon.png`, `modele-nettoyage.png`).

## Déploiement sur Netlify

Le projet Netlify `zenvyqo-digital` existe déjà (https://zenvyqo-digital.netlify.app). `netlify.toml` contient la configuration de build ; Next.js est pris en charge sans extension.

1. Pousser le code sur un dépôt GitHub.
2. Netlify → projet `zenvyqo-digital` → Project configuration → Build & deploy → Link repository, puis choisir le dépôt.
3. Project configuration → Environment variables : ajouter les variables du tableau ci-dessus (`NEXT_PUBLIC_SITE_URL=https://zenvyqo-digital.netlify.app` au minimum).
4. Chaque `git push` déclenche ensuite un déploiement.

## Déploiement sur Vercel

1. Pousser le projet sur GitHub.
2. vercel.com → Add New → Project → importer le dépôt (Next.js est détecté, aucun réglage de build).
3. Settings → Environment Variables : ajouter les variables ci-dessus. `NEXT_PUBLIC_SITE_URL` doit être l'URL finale (ex. `https://zenvyqo.ca`).
4. Deploy, puis Settings → Domains pour brancher le nom de domaine.
5. Après tout changement de variable `NEXT_PUBLIC_…`, relancer un déploiement (elles sont lues à la compilation).

## Reste à faire

- [x] Pages légales complétées (éditeur, hébergeur Netlify, responsable Loi 25 = le fondateur, conservation, témoins, résiliation, fin d'abonnement, droit applicable). Une relecture par un professionnel du droit reste recommandée.
- [ ] Immatriculation : renseigner `NEXT_PUBLIC_LEGAL_NAME` et `NEXT_PUBLIC_BUSINESS_NUMBER` ; les lignes apparaissent alors dans les mentions légales.
- [ ] FAQ « délais » : remplacer la réponse générale par vos délais réels si vous voulez vous engager sur un chiffre.
- [ ] Portfolio : les trois projets sont des démonstrations, signalées comme telles. Les remplacer par les sites des clients fondateurs.
- [x] Image de partage (Open Graph) : `public/og/zenvyqo-fr.jpg` et `zenvyqo-en.jpg`.
- [ ] Si un outil de mesure ou un pixel publicitaire (Meta, Google) est ajouté : mettre à jour la section « Témoins » de la politique de confidentialité et demander le consentement (Loi 25).

Volontairement absents, faute d'informations réelles : témoignages clients, statistiques commerciales, adresse physique.

## Commandes

```bash
npm run dev         # développement
npm run build       # compilation de production
npm run start       # sert la version compilée
npm run typecheck   # vérification TypeScript
```
