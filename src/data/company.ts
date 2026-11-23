export interface LocationInfo {
  id: string;
  title: string;
  role: string;
  address: string;
  city: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface LegalIdentifiers {
  rc: string;
  if: string;
  tp: string;
  cnss: string;
  ice: string;
}

export interface StaffBreakdown {
  total: string;
  engineers: string;
  siteManagers: string;
  technicians: string;
  workshops: string;
}

export const COMPANY_INFO = {
  name: "MOCOMEL SARL",
  tradeName: "Groupe MOCOMEL",
  slogan: "Moroccan Engineering at Work",
  hrMotto: "Une entreprise n'a de richesses que d'Hommes",
  accreditation: "Accrédité ONEE (Branche Électricité) et régies de distribution du Royaume du Maroc",
  phoneStandard: "+212 665 922 500",
  phoneRetail: "+212 777 817 534",
  email: "mocomel.sarl@gmail.com",
  website: "www.mocomel.ma",
  whatsapp: "+212665922500",
  legal: {
    rc: "491823",
    if: "48599348",
    tp: "35703154",
    cnss: "2455054",
    ice: "002744770000083",
  } as LegalIdentifiers,
  staff: {
    total: "+40 Collaborateurs qualifiés",
    engineers: "5 Ingénieurs Chefs de Projet HT/BT & Bureau d'Études",
    siteManagers: "8 Conducteurs de Travaux / Chefs de Chantier",
    technicians: "+30 Techniciens & Ouvriers qualifiés",
    workshops: "1 Atelier Spécialisé à Casablanca",
  } as StaffBreakdown,
  locations: [
    {
      id: "siege",
      title: "Siège Social & Bureau d'Études",
      role: "Direction générale, ingénierie HT/BT, calculs et études d'exécution",
      address: "13, Immeuble 200, Lotissement Essalam, Tit Mellil",
      city: "Casablanca, Maroc",
      phone: "+212 665 922 500",
      coordinates: { lat: 33.5574, lng: -7.4812 },
    },
    {
      id: "retail",
      title: "Comptoir MOCOMEL Retail",
      role: "Magasin de vente directe B2B, distribution matériel HTA/BT et enlèvement",
      address: "Magasin 7, Immeuble 200, Lotissement Essalam, Tit Mellil",
      city: "Casablanca, Maroc",
      phone: "+212 777 817 534",
      coordinates: { lat: 33.5572, lng: -7.481 },
    },
    {
      id: "atelier",
      title: "Atelier de Fabrication & Câblage",
      role: "Montage d'armoires TGBT, pupitres d'automatisme et jeux de barres",
      address: "434, Résidence Basma Essalam 2, Anassi, Sidi Moumen",
      city: "Casablanca, Maroc",
      phone: "+212 665 922 500",
      coordinates: { lat: 33.5852, lng: -7.514 },
    },
  ] as LocationInfo[],
};

export const ENTITIES = [
  {
    id: "ingenierie",
    number: "01",
    name: "MOCOMEL Ingénierie",
    title: "Ingénierie Électrique HT/BT & Postes",
    scope: "Études techniques, postes de transformation HTA/BT, armoires industrielles TGBT, automatismes et maintenance préventive.",
    themeColor: "#007A63",
    hoverColor: "#005F4D",
    tintColor: "#ECFDF5",
    logo: "/logos/logo-mocomel.png",
    logoWhite: "/logos/logo-mocomel-white.png",
    href: "/ingenierie",
    ctaLabel: "Explorer le Pôle Ingénierie",
    badge: "Entité Mère & Cœur Métier",
  },
  {
    id: "solutions",
    number: "02",
    name: "MOCOMEL Solutions",
    title: "Aménagement Tertiaire & Sûreté",
    scope: "Courant faible, vidéosurveillance CCTV, contrôle d'accès biométrique, détection incendie, domotique, sonorisation et GTC.",
    themeColor: "#22409A",
    hoverColor: "#1D4ED8",
    tintColor: "#EFF6FF",
    logo: "/logos/logo-solutions.png",
    logoWhite: "/logos/logo-solutions-white.png",
    href: "/solutions",
    ctaLabel: "Découvrir MOCOMEL Solutions",
    badge: "Second Œuvre & Sûreté",
  },
  {
    id: "retail",
    number: "03",
    name: "MOCOMEL Retail",
    title: "Comptoir & Négoce Électrique B2B",
    scope: "Distribution et négoce B2B de câbles de puissance, matériel de ligne aérienne, équipements de poste et appareillage modulaire.",
    themeColor: "#9B112B",
    hoverColor: "#7E0E23",
    tintColor: "#FFF1F2",
    logo: "/logos/logo-retail.png",
    logoWhite: "/logos/logo-retail-white.png",
    href: "/retail",
    ctaLabel: "Consulter le Catalogue Retail",
    badge: "Distribution & Stock Chantier",
  },
];
