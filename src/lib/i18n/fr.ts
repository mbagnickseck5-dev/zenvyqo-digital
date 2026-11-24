import type { PlanId } from "../plans";

export interface LegalPage {
  title: string;
  /** Description pour les moteurs de recherche */
  description: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export const fr = {
  meta: {
    title: "Création de site web à Montréal pour PME | Zenvyqo Digital",
    description:
      "Conception de sites web pour les PME de Montréal, du Québec et du Canada : site vitrine, boutique en ligne, SEO local. Dès 69 $ CA/mois, sans engagement.",
    ogAlt: "Zenvyqo Digital : création de sites web pour les PME de Montréal, du Québec et du Canada, dès 69 $ CA par mois",
  },
  slogan: "Votre croissance commence en ligne.",
  // {price} : mensualité la plus basse (MIN_MONTHLY, src/lib/plans.ts)
  topBar: {
    text: "Sites web dès {price}\u00a0$\u00a0CA par mois, sans engagement.",
    cta: "Voir les forfaits",
  },
  nav: {
    home: "Accueil",
    services: "Services",
    plans: "Forfaits",
    work: "Réalisations",
    about: "À propos",
    contact: "Contact",
    quote: "Obtenir un devis",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    main: "Navigation principale",
    switchLabel: "Passer à l'anglais",
    call: "Appeler le",
    skip: "Aller au contenu",
  },
  hero: {
    badge: "Sites web pour les PME du Canada",
    titleStart: "Un site web professionnel qui fait grandir votre entreprise",
    titleAccent: "au Canada",
    subtitle:
      "Nous créons des sites web modernes, rapides et conçus pour attirer davantage de clients.",
    ctaPlans: "Découvrir nos forfaits",
    ctaQuote: "Demander un devis gratuit",
    location: "Montréal, Québec",
    locationSub: "et partout au Canada",
    photoAlt: "Tablette, ordinateur portable et téléphone affichant des sites web modernes de rénovation, de restaurant et de salon de coiffure",
    previewLabel: "Aperçu d'un site web sur un ordinateur portable, devant la silhouette de Montréal",
    previewBrand: "Votre entreprise",
    previewTitle: "Bienvenue chez vous, en ligne",
    previewCta: "Réserver",
    previewChip: "Nouvelle demande de devis",
  },
  advantages: [
    { title: "Design moderne", text: "et sur mesure" },
    { title: "100 % adapté", text: "au mobile" },
    { title: "Référencement", text: "(SEO) local" },
    { title: "Assistance", text: "personnalisée" },
    { title: "Site sécurisé", text: "(certificat SSL)" },
  ],
  services: {
    eyebrow: "Nos services",
    title: "Tout ce qu'il faut pour être trouvé et choisi",
    intro:
      "Un seul interlocuteur pour concevoir, mettre en ligne et faire vivre votre site.",
    items: [
      {
        title: "Création de sites vitrines",
        text: "Un site clair et rapide qui présente vos services, vos heures et vos coordonnées, et qui donne envie de vous contacter.",
      },
      {
        title: "Création de boutiques e-commerce",
        text: "Catalogue, paiement sécurisé et gestion des commandes : vous vendez en ligne et gardez la main sur votre boutique.",
      },
      {
        title: "Référencement SEO local",
        text: "Titres, balises et contenus pensés pour votre ville et votre métier, afin d'apparaître dans les recherches près de chez vous.",
      },
      {
        title: "Maintenance et assistance",
        text: "Mises à jour, sauvegardes et petites modifications chaque mois. Votre site reste à jour sans que vous y pensiez.",
      },
    ],
  },
  pricing: {
    eyebrow: "Nos forfaits",
    titleStart: "Des solutions adaptées à",
    titleAccent: "votre entreprise",
    intro: "Trois forfaits clairs, en dollars canadiens, avant taxes.",
    currency: "$ CA",
    perMonth: "/ mois",
    setupPrefix: "+",
    setupSuffix: "$ CA de frais de création",
    popular: "Le plus populaire",
    choose: "Choisir ce forfait",
    commitment:
      "Prix en dollars canadiens, avant taxes. Sans engagement : résiliable en tout temps avec un préavis de 30 jours.",
    termsLink: "Lire les conditions d'abonnement",
    plans: {
      "business-pro": {
        tagline: "L'essentiel pour une présence professionnelle en ligne",
        features: [
          "Jusqu'à 5 pages",
          "Design personnalisé et responsive",
          "SEO local initial",
          "Formulaire de devis",
          "Intégration WhatsApp",
          "30 minutes de modifications par mois",
        ],
      },
      "business-plus": {
        tagline: "Plus de fonctionnalités pour développer votre activité",
        features: [
          "Jusqu'à 8 pages",
          "Site bilingue français/anglais",
          "Réservation en ligne simple",
          "SEO local initial",
          "Statistiques de visites",
          "1 heure de modifications par mois",
        ],
      },
      "boutique-pro": {
        tagline: "Votre boutique en ligne clé en main",
        features: [
          "Boutique e-commerce",
          "Jusqu'à 20 produits initiaux",
          "Paiement sécurisé",
          "Gestion des commandes",
          "Formation à l'utilisation",
          "1 heure de support par mois",
        ],
      },
    } satisfies Record<PlanId, { tagline: string; features: string[] }>,
  },
  process: {
    eyebrow: "Processus",
    title: "Comment ça marche",
    steps: [
      {
        title: "On échange sur vos besoins",
        text: "Vous nous décrivez votre entreprise et vos objectifs. On vous confirme le forfait qui convient.",
      },
      {
        title: "On conçoit votre site",
        text: "Structure, textes et design : on prépare une première version à partir de vos contenus.",
      },
      {
        title: "Vous validez le résultat",
        text: "Vous relisez sur un lien privé et demandez vos ajustements avant la mise en ligne.",
      },
      {
        title: "Mise en ligne et accompagnement",
        text: "Votre site est publié sur votre nom de domaine, puis entretenu chaque mois.",
      },
    ],
  },
  portfolio: {
    eyebrow: "Réalisations",
    title: "Exemples de sites que nous concevons",
    intro:
      "Les trois projets ci-dessous sont des démonstrations, et non des sites de clients réels. Ils montrent le type de résultat possible selon votre secteur : cliquez sur un exemple pour le visiter.",
    demoBadge: "Exemple de démonstration",
    cta: "Voir la démo",
    items: [
      { slug: "restaurant", name: "Restaurant", type: "Site vitrine avec menu et réservation", headline: "Une table vous attend", alt: "Aperçu d'un site de restaurant sur ordinateur portable et téléphone" },
      { slug: "salon", name: "Salon de coiffure", type: "Site vitrine avec prise de rendez-vous", headline: "Votre style, sur rendez-vous", alt: "Aperçu d'un site de salon de coiffure sur ordinateur portable et téléphone" },
      { slug: "nettoyage", name: "Entreprise de nettoyage", type: "Site vitrine avec demande de devis", headline: "Des locaux impeccables", alt: "Aperçu d'un site d'entreprise de nettoyage sur ordinateur portable et téléphone" },
    ],
  },
  about: {
    eyebrow: "À propos",
    title: "Une agence web au service des PME",
    paragraphs: [
      "Zenvyqo Digital conçoit des sites internet pour les petites et moyennes entreprises canadiennes, avec une attention particulière pour Montréal et le Québec.",
      "Nous travaillons entièrement en ligne, en français comme en anglais. Notre formule par abonnement vous évite un gros investissement de départ : des frais de création réduits, puis une mensualité sans engagement qui couvre l'hébergement, l'entretien et vos modifications courantes.",
    ],
    points: [
      "Le français d'abord, l'anglais en option",
      "Des prix affichés, sans engagement",
      "Un site entretenu chaque mois",
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    items: [
      {
        q: "Quels sont les délais de création ?",
        a: "Le délai dépend du forfait et de la rapidité avec laquelle vous nous transmettez vos contenus (textes, photos, logo). Nous vous communiquons un calendrier précis par écrit avant le début du projet.",
      },
      {
        q: "Comment se passent les paiements ?",
        a: "Vous réglez les frais de création au lancement du projet, puis une mensualité fixe, sans engagement : vous pouvez arrêter en tout temps avec un préavis de 30 jours. Les prix sont en dollars canadiens, avant taxes. Le paiement se fait par carte, de façon sécurisée.",
      },
      {
        q: "Puis-je demander des modifications après la mise en ligne ?",
        a: "Oui. Chaque forfait inclut du temps de modification ou de support chaque mois : 30 minutes avec Business Pro, 1 heure avec Business Plus et Boutique Pro. Au-delà, nous vous envoyons un devis avant toute intervention.",
      },
      {
        q: "À qui appartient le site ?",
        a: "Vos contenus (textes, photos, logo) et votre nom de domaine restent les vôtres. Pendant l'abonnement, nous hébergeons et entretenons le site. Les modalités à la fin de l'abonnement sont détaillées dans les conditions d'abonnement.",
      },
      {
        q: "Travaillez-vous avec des entreprises hors de Montréal ?",
        a: "Oui. Tout se fait à distance : nous accompagnons des PME partout au Québec et au Canada, en français ou en anglais.",
      },
    ] as FaqItem[],
  },
  contact: {
    eyebrow: "Contact",
    title: "Parlons de votre projet",
    intro:
      "Une question avant de choisir un forfait ? Appelez-nous ou écrivez-nous, nous vous répondons rapidement.",
    whatsapp: "Écrire sur WhatsApp",
    whatsappMessage: "Bonjour Zenvyqo Digital, j'aimerais un devis pour un site web.",
    emailLabel: "Courriel",
    phoneLabel: "Téléphone",
  },
  form: {
    quoteTitle: "Demande de devis",
    quoteIntro: "Remplissez ce formulaire, nous revenons vers vous rapidement.",
    close: "Fermer",
    plan: "Forfait",
    planNone: "Je ne sais pas encore",
    fullName: "Nom et prénom",
    company: "Nom de l'entreprise",
    email: "Adresse courriel",
    phone: "Téléphone",
    city: "Ville",
    province: "Province",
    provincePlaceholder: "Choisir une province",
    sector: "Secteur d'activité",
    sectorPlaceholder: "Ex. : restauration, coiffure, rénovation",
    description: "Description du projet",
    descriptionPlaceholder: "Décrivez votre entreprise et ce que vous attendez de votre site.",
    message: "Votre message",
    wantsCall: "Je souhaite être rappelé par téléphone",
    consentStart: "J'accepte que mes renseignements soient utilisés pour traiter ma demande, conformément à la",
    consentLink: "politique de confidentialité",
    optional: "facultatif",
    submitQuote: "Envoyer ma demande",
    submitContact: "Envoyer le message",
    sending: "Envoi en cours…",
    errorSummary: "Certains champs sont à corriger.",
    serverError: "L'envoi a échoué. Vérifiez votre connexion et réessayez.",
    serverErrorAlt: "Vous pouvez aussi nous envoyer votre demande sur WhatsApp, ou nous joindre au {phone} ou à {email}.",
    errors: {
      required: "Ce champ est requis.",
      email: "Entrez une adresse courriel valide, par exemple nom@entreprise.ca.",
      tooShort: "Ajoutez quelques détails (10 caractères minimum).",
      consent: "Votre accord est nécessaire pour envoyer la demande.",
    },
    successTitle: "Demande envoyée",
    successText: "Merci ! Nous avons bien reçu votre demande et vous répondrons par courriel.",
    successCall: "Vous avez demandé un appel : nous vous contacterons au numéro indiqué.",
    successPlan: "Forfait sélectionné :",
    waTitle: "Vous préférez WhatsApp ?",
    waReady: "Votre demande est déjà rédigée : ouvrez WhatsApp et appuyez sur « Envoyer » pour poursuivre la conversation avec nous.",
    waOpen: "Continuer sur WhatsApp",
    waSend: "Envoyer par WhatsApp",
    waIntroQuote: "Bonjour Zenvyqo Digital, voici ma demande de devis :",
    waIntroContact: "Bonjour Zenvyqo Digital, voici mon message :",
    waSep: " : ",
    waPerMonth: "/mois",
    waPlan: "Forfait",
    waName: "Nom",
    waCompany: "Entreprise",
    waEmail: "Courriel",
    waPhone: "Téléphone",
    waCity: "Ville",
    waSector: "Secteur",
    waProject: "Projet",
    waMessage: "Message",
    waCall: "Rappel souhaité",
    yes: "oui",
    no: "non",
    payTitle: "Démarrer maintenant",
    payText:
      "Vous pouvez régler les frais de création et activer votre abonnement dès maintenant.",
    payButton: "Payer et démarrer l'abonnement",
    payTestNote: "Paiement en mode test : aucune somme réelle n'est prélevée.",
    payError: "Le paiement en ligne n'est pas disponible pour le moment.",
    done: "Fermer",
    newRequest: "Envoyer une autre demande",
  },
  cta: {
    title: "Prêt à propulser votre entreprise en ligne ?",
    text: "Demandez votre devis gratuit dès aujourd'hui.",
    button: "Obtenir un devis gratuit",
  },
  footer: {
    navTitle: "Navigation",
    contactTitle: "Contact",
    legalTitle: "Informations légales",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation et d'abonnement",
    rights: "Tous droits réservés.",
    serving: "Au service des PME de Montréal, du Québec et du Canada.",
  },
  consent: {
    label: "Témoins publicitaires",
    text: "Avec votre accord, nous utilisons le pixel Meta (Facebook) pour mesurer l'efficacité de nos publicités et vous montrer des offres pertinentes. Si vous refusez, il reste désactivé.",
    more: "En savoir plus",
    accept: "Accepter",
    refuse: "Refuser",
    manage: "Gérer les témoins",
  },
  thanks: {
    title: "Merci, votre paiement est confirmé",
    text: "Nous vous écrivons par courriel pour lancer la création de votre site.",
    testNote: "Paiement effectué en mode test.",
    back: "Retour à l'accueil",
  },
  legal: {
    updated: "Dernière mise à jour : 24 novembre 2026",
    back: "Retour à l'accueil",
    pages: {
      "mentions-legales": {
        title: "Mentions légales",
        description: "Éditeur, hébergeur et coordonnées du site de Zenvyqo Digital, agence de création de sites web pour les PME.",
        sections: [
          {
            heading: "Éditeur du site",
            paragraphs: [
              "Ce site est édité par Zenvyqo Digital, agence de création de sites web pour les PME.",
              // Lignes masquées tant que les informations d'immatriculation ne sont pas renseignées (src/lib/site.ts).
              "Dénomination légale : {legalName}.",
              "Numéro d'entreprise : {businessNumber}.",
              "Responsable de la publication : le fondateur de Zenvyqo Digital.",
              "Pour nous joindre : {email} ou {phone} (appel ou WhatsApp).",
            ],
          },
          {
            heading: "Hébergement",
            paragraphs: [
              "Le site est hébergé par Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, États-Unis (netlify.com).",
            ],
          },
          {
            heading: "Propriété intellectuelle",
            paragraphs: [
              "Les textes, visuels et éléments graphiques de ce site sont la propriété de Zenvyqo Digital, sauf mention contraire. Toute reproduction sans autorisation est interdite.",
              "Sauf mention contraire, les projets présentés dans la section « Réalisations » sont des exemples de démonstration.",
            ],
          },
        ],
      },
      confidentialite: {
        title: "Politique de confidentialité",
        description:
          "Comment Zenvyqo Digital recueille, utilise, conserve et protège vos renseignements personnels, conformément à la Loi 25.",
        sections: [
          {
            heading: "Responsable de la protection des renseignements personnels",
            paragraphs: [
              "Le fondateur de Zenvyqo Digital est responsable de la protection des renseignements personnels. Pour toute question ou demande, écrivez à {email} ou appelez le {phone}.",
            ],
          },
          {
            heading: "Renseignements recueillis",
            paragraphs: [
              "Lorsque vous remplissez un formulaire, nous recueillons : votre nom, le nom de votre entreprise, votre adresse courriel, votre numéro de téléphone, votre ville et votre province, votre secteur d'activité et la description de votre projet.",
              "Si vous nous écrivez sur WhatsApp, nous recevons aussi votre numéro et le nom de votre profil WhatsApp. Nous ne recueillons que les renseignements nécessaires pour traiter votre demande.",
              "Seulement si vous acceptez les témoins publicitaires, le pixel Meta recueille aussi des données sur votre navigation (voir « Témoins (cookies) et pixel Meta » ci-dessous).",
            ],
          },
          {
            heading: "Utilisation",
            paragraphs: [
              "Ces renseignements servent uniquement à répondre à votre demande, à préparer un devis et à assurer le suivi de votre projet. Ils ne sont ni vendus ni loués.",
              "Seules les personnes de Zenvyqo Digital qui traitent votre demande y ont accès.",
            ],
          },
          {
            heading: "Fournisseurs et lieu de conservation",
            paragraphs: [
              "Les demandes envoyées par formulaire sont enregistrées chez notre hébergeur, Netlify, aux États-Unis, qui nous les transmet par courriel dans notre boîte Gmail (Google), et, le cas échéant, dans notre base de données (Supabase). Les messages WhatsApp sont transmis par WhatsApp (Meta). Avec votre accord, le pixel Meta transmet des données de navigation à Meta Platforms, notamment aux États-Unis. Si le paiement en ligne est utilisé, il est traité par Stripe : nous ne conservons aucun numéro de carte.",
              "Notre équipe travaille à distance et peut consulter vos renseignements depuis l'extérieur du Canada. Vos renseignements peuvent donc être conservés et consultés à l'extérieur du Québec.",
            ],
          },
          {
            heading: "Durée de conservation",
            paragraphs: [
              "Une demande qui n'aboutit pas à un contrat est supprimée au plus tard 24 mois après notre dernier échange. Les renseignements de nos clients sont conservés pendant toute la durée de l'abonnement, puis le temps exigé par nos obligations comptables et fiscales.",
            ],
          },
          {
            heading: "Témoins (cookies) et pixel Meta",
            paragraphs: [
              "Ce site n'utilise aucun témoin de mesure d'audience. Il utilise un seul outil de suivi, le pixel Meta (Facebook), qui permet le profilage publicitaire. Il est désactivé par défaut : il ne se charge que si vous cliquez sur « Accepter » dans le bandeau des témoins.",
              "Une fois activé, le pixel transmet à Meta Platforms l'adresse des pages que vous consultez, des renseignements techniques sur votre appareil et votre navigateur (dont l'adresse IP) et certaines actions, comme l'envoi d'une demande de devis ou un clic pour nous appeler, nous écrire ou nous joindre sur WhatsApp. Il dépose aussi des témoins (comme _fbp). Si la correspondance avancée de Meta est activée, l'adresse courriel ou le numéro de téléphone saisis dans un formulaire peuvent aussi être transmis sous forme chiffrée (hachée).",
              "Ces données nous servent à mesurer l'efficacité de nos publicités et à les présenter à des personnes susceptibles d'être intéressées par nos services. Meta peut les relier à votre compte Facebook ou Instagram et les utilise selon sa propre politique de confidentialité.",
              "Vous pouvez changer d'avis en tout temps avec le lien « Gérer les témoins » au bas des pages du site. Si vous refusez ou retirez votre accord, le pixel ne se charge plus et le site fonctionne normalement.",
            ],
          },
          {
            heading: "Vos droits",
            paragraphs: [
              "Conformément aux lois applicables au Québec et au Canada, dont la Loi 25, vous pouvez demander l'accès à vos renseignements, leur rectification ou leur suppression, et retirer votre consentement. Écrivez-nous à {email} : nous vous répondons au plus tard dans les 30 jours.",
              "Si vous estimez que vos droits ne sont pas respectés, vous pouvez aussi vous adresser à la Commission d'accès à l'information du Québec.",
            ],
          },
        ],
      },
      conditions: {
        title: "Conditions d'utilisation et d'abonnement",
        description:
          "Forfaits, prix, résiliation et propriété du site pour les abonnements de création de sites web Zenvyqo Digital, sans engagement.",
        sections: [
          {
            heading: "Utilisation du site",
            paragraphs: [
              "L'utilisation de ce site implique l'acceptation des présentes conditions. Les informations publiées sont fournies à titre indicatif et peuvent être modifiées.",
            ],
          },
          {
            heading: "Forfaits et prix",
            paragraphs: [
              "Business Pro : 69 $ CA par mois, frais de création de 149 $ CA. Business Plus : 99 $ CA par mois, frais de création de 249 $ CA. Boutique Pro : 149 $ CA par mois, frais de création de 399 $ CA.",
              "Tous les prix sont en dollars canadiens, avant taxes applicables.",
            ],
          },
          {
            heading: "Sans engagement",
            paragraphs: [
              "Les forfaits sont sans engagement de durée. L'abonnement mensuel commence à la mise en ligne du site.",
              "Vous pouvez résilier en tout temps, par écrit, avec un préavis de 30 jours.",
            ],
          },
          {
            heading: "Frais de création",
            paragraphs: [
              "Les frais de création couvrent la conception et la mise en ligne du site. Ils sont payables au lancement du projet et ne sont pas remboursables une fois le projet commencé.",
            ],
          },
          {
            heading: "Modifications et support inclus",
            paragraphs: [
              "Le temps de modification ou de support inclus chaque mois dépend du forfait : 30 minutes avec Business Pro, 1 heure avec Business Plus et Boutique Pro. Le temps non utilisé n'est pas reporté au mois suivant. Toute demande au-delà fait l'objet d'un devis préalable.",
            ],
          },
          {
            heading: "Propriété du site et fin d'abonnement",
            paragraphs: [
              "Le client reste propriétaire de ses contenus (textes, photos, logo) et de son nom de domaine.",
              "À la fin de l'abonnement, le client peut demander le transfert de son site, moyennant des frais établis sur devis. À défaut, le site est mis hors ligne et ses contenus lui sont remis sur demande.",
            ],
          },
          {
            heading: "Droit applicable",
            paragraphs: [
              "Les présentes conditions sont régies par les lois applicables au Québec. Tout différend relève des tribunaux du district judiciaire de Montréal.",
            ],
          },
        ],
      },
    } satisfies Record<string, LegalPage>,
  },
};

export type Dictionary = typeof fr;
