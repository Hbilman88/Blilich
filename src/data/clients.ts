export interface ClientPartner {
  id: string;
  name: string;
  category: "Institutionnel" | "Énergie & Infrastructure" | "Industrie & Tertiaire";
  description: string;
  badge?: string;
}

export const CLIENTS: ClientPartner[] = [
  {
    id: "onee",
    name: "ONEE (Branche Électricité)",
    category: "Institutionnel",
    description: "Office National de l'Électricité et de l'Eau Potable — Opérateur national de production et transport électrique.",
    badge: "Accréditation Officielle",
  },
  {
    id: "oncf",
    name: "ONCF",
    category: "Institutionnel",
    description: "Office National des Chemins de Fer — Réseaux d'infrastructure ferroviaire et sous-stations électriques.",
  },
  {
    id: "engie",
    name: "ENGIE",
    category: "Énergie & Infrastructure",
    description: "Leader mondial des services à l'énergie et des infrastructures décarbonées.",
  },
  {
    id: "saint-gobain",
    name: "Saint-Gobain",
    category: "Industrie & Tertiaire",
    description: "Groupe industriel mondial des matériaux de construction et solutions durables.",
  },
  {
    id: "finatech",
    name: "Finatech Group",
    category: "Énergie & Infrastructure",
    description: "Groupe intégrateur de référence dans les télécoms, l'énergie et les infrastructures.",
  },
  {
    id: "waterleau",
    name: "Waterleau Group",
    category: "Industrie & Tertiaire",
    description: "Spécialiste international du traitement des eaux et de l'ingénierie environnementale industrielle.",
  },
  {
    id: "sofalim",
    name: "Sofalim",
    category: "Industrie & Tertiaire",
    description: "Acteur majeur de l'agro-industrie et de la transformation alimentaire au Maroc.",
  },
  {
    id: "orobrique",
    name: "Orobrique",
    category: "Industrie & Tertiaire",
    description: "Complexe industriel de briqueterie automatisée forte puissance.",
  },
  {
    id: "enerlux",
    name: "Enerlux Power",
    category: "Énergie & Infrastructure",
    description: "Solutions de gestion et compensation de puissance électrique industrielle.",
  },
  {
    id: "prometi",
    name: "Prometi",
    category: "Industrie & Tertiaire",
    description: "Entreprise générale d'installations techniques tertiaires et industrielles.",
  },
  {
    id: "planasa",
    name: "Planasa",
    category: "Industrie & Tertiaire",
    description: "Leader agro-industriel international dans l'innovation végétale et l'agritech.",
  },
  {
    id: "maribat",
    name: "Maribat",
    category: "Industrie & Tertiaire",
    description: "Fabricant national d'accumulateurs et solutions de stockage d'énergie.",
  },
];
