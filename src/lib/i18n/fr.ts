import type { PlanId } from "../plans";

export interface LegalPage {
  title: string;
  sections: { heading: string; paragraphs: string[] }[];
}

export const fr = {
  meta: {
    title: "Zenvyqo Digital | Création de sites web pour les PME à Montréal et au Canada",
    description:
      "Sites vitrines, boutiques en ligne et référencement local pour les PME de Montréal, du Québec et du Canada. Forfaits mensuels à partir de 69 $ CA.",
  },
  slogan: "Votre croissance commence en ligne.",
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
    photoAlt: "Entrepreneur souriant travaillant sur son ordinateur portable, devant la silhouette d'une ville au crépuscule",
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
    chooseAria: "Choisir le forfait",
    commitment:
      "Prix en dollars canadiens, avant taxes. Engagement initial de 12 mois.",
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
      "Les trois projets ci-dessous sont des démonstrations, et non des sites de clients réels. Ils montrent le type de résultat possible selon votre secteur.",
    demoBadge: "Exemple de démonstration",
    items: [
      { name: "Restaurant", type: "Site vitrine avec menu et réservation", headline: "Une table vous attend" },
      { name: "Salon de coiffure", type: "Site vitrine avec prise de rendez-vous", headline: "Votre style, sur rendez-vous" },
      { name: "Entreprise de nettoyage", type: "Site vitrine avec demande de devis", headline: "Des locaux impeccables" },
    ],
  },
  about: {
    eyebrow: "À propos",
    title: "Une agence web au service des PME",
    paragraphs: [
      "Zenvyqo Digital conçoit des sites internet pour les petites et moyennes entreprises canadiennes, avec une attention particulière pour Montréal et le Québec.",
      "Nous travaillons entièrement en ligne, en français comme en anglais. Notre formule par abonnement vous évite un gros investissement de départ : des frais de création réduits, puis une mensualité qui couvre l'hébergement, l'entretien et vos modifications courantes.",
    ],
    points: [
      "Le français d'abord, l'anglais en option",
      "Des prix affichés, sans surprise",
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
        a: "Vous réglez les frais de création au lancement du projet, puis une mensualité fixe. Les prix sont en dollars canadiens, avant taxes, avec un engagement initial de 12 mois. Le paiement se fait par carte, de façon sécurisée.",
      },
      {
        q: "Puis-je demander des modifications après la mise en ligne ?",
        a: "Oui. Chaque forfait inclut du temps de modification ou de support chaque mois : 30 minutes avec Business Pro, 1 heure avec Business Plus et Boutique Pro. Au-delà, nous vous envoyons un devis avant toute intervention.",
      },
      {
        q: "À qui appartient le site ?",
        a: "Vos contenus (textes, photos, logo) et votre nom de domaine restent les vôtres. Pendant l'abonnement, nous hébergeons et entretenons le site. Les modalités à la fin de l'engagement sont détaillées dans les conditions d'abonnement.",
      },
      {
        q: "Travaillez-vous avec des entreprises hors de Montréal ?",
        a: "Oui. Tout se fait à distance : nous accompagnons des PME partout au Québec et au Canada, en français ou en anglais.",
      },
    ],
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
    demoNote:
      "Mode démonstration : la base de données n'est pas encore configurée, cette demande n'a pas été enregistrée.",
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
  thanks: {
    title: "Merci, votre paiement est confirmé",
    text: "Nous vous écrivons par courriel pour lancer la création de votre site.",
    testNote: "Paiement effectué en mode test.",
    back: "Retour à l'accueil",
  },
  legal: {
    notice:
      "Modèle à compléter : ce texte est un gabarit. Il doit être complété avec les informations réelles de l'entreprise et validé par un professionnel du droit avant la mise en ligne.",
    back: "Retour à l'accueil",
    pages: {
      "mentions-legales": {
        title: "Mentions légales",
        sections: [
          {
            heading: "Éditeur du site",
            paragraphs: [
              "Ce site est édité par Zenvyqo Digital.",
              "Dénomination légale : [À COMPLÉTER]. Forme juridique : [À COMPLÉTER]. Numéro d'entreprise : [À COMPLÉTER]. Adresse du siège : [À COMPLÉTER].",
              "Responsable de la publication : [À COMPLÉTER]. Contact : {email}, {phone}.",
            ],
          },
          {
            heading: "Hébergement",
            paragraphs: ["Hébergeur du site : [NOM ET COORDONNÉES DE L'HÉBERGEUR À COMPLÉTER]."],
          },
          {
            heading: "Propriété intellectuelle",
            paragraphs: [
              "Les textes, visuels et éléments graphiques de ce site sont la propriété de Zenvyqo Digital, sauf mention contraire. Toute reproduction sans autorisation est interdite.",
              "Les projets présentés dans la section « Réalisations » sont des exemples de démonstration.",
            ],
          },
        ],
      },
      confidentialite: {
        title: "Politique de confidentialité",
        sections: [
          {
            heading: "Renseignements recueillis",
            paragraphs: [
              "Lorsque vous remplissez un formulaire, nous recueillons : votre nom, le nom de votre entreprise, votre adresse courriel, votre numéro de téléphone, votre ville et votre province, votre secteur d'activité et la description de votre projet.",
            ],
          },
          {
            heading: "Utilisation",
            paragraphs: [
              "Ces renseignements servent uniquement à répondre à votre demande, à préparer un devis et à assurer le suivi de votre projet. Ils ne sont ni vendus ni loués.",
            ],
          },
          {
            heading: "Conservation et fournisseurs",
            paragraphs: [
              "Les demandes sont enregistrées chez notre fournisseur de base de données (Supabase). Les paiements sont traités par Stripe : nous ne conservons aucun numéro de carte.",
              "Durée de conservation : [À COMPLÉTER]. Lieu d'hébergement des données : [À COMPLÉTER].",
            ],
          },
          {
            heading: "Vos droits",
            paragraphs: [
              "Conformément aux lois applicables au Québec et au Canada, dont la Loi 25, vous pouvez demander l'accès à vos renseignements, leur rectification ou leur suppression.",
              "Responsable de la protection des renseignements personnels : [NOM À COMPLÉTER], joignable à {email}.",
            ],
          },
        ],
      },
      conditions: {
        title: "Conditions d'utilisation et d'abonnement",
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
            heading: "Engagement initial de 12 mois",
            paragraphs: [
              "Chaque forfait comporte un engagement initial de 12 mois à compter de [DATE DE DÉPART À DÉFINIR : commande ou mise en ligne].",
              "Renouvellement après 12 mois : [À COMPLÉTER]. Résiliation anticipée et frais éventuels : [À COMPLÉTER]. Préavis : [À COMPLÉTER].",
            ],
          },
          {
            heading: "Modifications et support inclus",
            paragraphs: [
              "Le temps de modification ou de support inclus chaque mois dépend du forfait. Le temps non utilisé : [REPORT OU NON À COMPLÉTER]. Toute demande au-delà fait l'objet d'un devis préalable.",
            ],
          },
          {
            heading: "Propriété du site et fin d'abonnement",
            paragraphs: [
              "Le client reste propriétaire de ses contenus (textes, photos, logo) et de son nom de domaine.",
              "Sort du site à la fin de l'abonnement (transfert, rachat ou mise hors ligne) : [À COMPLÉTER].",
            ],
          },
          {
            heading: "Droit applicable",
            paragraphs: ["Droit applicable et tribunaux compétents : [À COMPLÉTER]."],
          },
        ],
      },
    } satisfies Record<string, LegalPage>,
  },
};

export type Dictionary = typeof fr;
