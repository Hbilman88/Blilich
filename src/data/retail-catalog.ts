export interface RetailProduct {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  unit: "Mètre" | "Unité" | "Lot" | "Bobine" | "Ens";
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  badge?: string;
}

export interface RetailCategory {
  id: string;
  label: string;
  description: string;
  image: string;
  itemCount: number;
}

export const RETAIL_CATEGORIES: RetailCategory[] = [
  {
    id: "cables-puissance",
    label: "Câbles de Puissance & Conducteurs",
    description: "Câbles HTA PRC, câbles BT cuivre R2V/RVFV, aluminium AR2V et cuivre nu pour réseaux souterrains et colonnes montantes.",
    image: "/media/retail-cables-puissance.jpg",
    itemCount: 5,
  },
  {
    id: "cables-signal",
    label: "Câbles de Signalisation & Instrumentation",
    description: "Câbles blindés et armés pour liaisons de télécommande, automatismes industriels, boucles de mesure et milieux sévères.",
    image: "/media/retail-cables-signal.jpg",
    itemCount: 3,
  },
  {
    id: "ligne-hta",
    label: "Matériel de Ligne HTA/BT",
    description: "Isolateurs composites, parafoudres moyenne tension, pinces d'ancrage, connecteurs étanches et interrupteurs aériens IACM.",
    image: "/media/retail-ligne-hta.jpg",
    itemCount: 5,
  },
  {
    id: "poste-transfo",
    label: "Matériel de Poste de Transformation",
    description: "Bornes et connecteurs embrochables 250A/630A, fusibles HTA Solarkron, kits d'extrémités et sectionneurs sous enveloppe métallique.",
    image: "/media/retail-poste-transfo.jpg",
    itemCount: 4,
  },
  {
    id: "cheminement",
    label: "Cheminement & Canalisations",
    description: "Gaines annelées TPC double paroi, tubes Isogris, tubes PVC armé et chemins de câbles en tôle perforée ou fil d'acier.",
    image: "/media/retail-cheminement.jpg",
    itemCount: 4,
  },
  {
    id: "raccordement",
    label: "Raccordement & Équipement d'Armoires",
    description: "Cosses bimétal aluminium-cuivre, manchons de jonction, borniers industriels, rails DIN et supports de jeux de barres en cuivre.",
    image: "/media/retail-raccordement.jpg",
    itemCount: 4,
  },
  {
    id: "disjoncteurs",
    label: "Protections & Appareillage Modulaire",
    description: "Disjoncteurs boîtier moulé compacts jusqu'à 3200A, gammes modulaires tertiaires et industrielles, blocs différentiels et relais.",
    image: "/media/retail-disjoncteurs.jpg",
    itemCount: 4,
  },
  {
    id: "energie-eclairage",
    label: "Énergie, Éclairage & Continuité",
    description: "Groupes électrogènes insonorisés 20 à 1250 kVA, batteries automatiques de condensateurs et luminaires industriels LED High-Bay.",
    image: "/media/retail-energie-eclairage.jpg",
    itemCount: 3,
  },
];

export const RETAIL_PRODUCTS: RetailProduct[] = [
  // A. Câbles de Puissance
  {
    id: "cb-prc-hta",
    name: "Câble HTA PRC Aluminium / Cuivre 12/20 kV & 18/30 kV",
    category: "cables-puissance",
    categoryLabel: "Câbles de Puissance",
    unit: "Mètre",
    description: "Câble unipolaire ou tripolaire moyenne tension isolé au polyéthylène réticulé (PRC) avec écran cuivre et gaine extérieure renforcée. Conforme normes ONEE.",
    specs: [
      { label: "Tension Nominale", value: "12/20(24) kV et 18/30(36) kV" },
      { label: "Sections Disponibles", value: "50, 95, 150, 240 mm²" },
      { label: "Âme Conductrice", value: "Aluminium ou Cuivre massif/câblé" },
    ],
    image: "/media/retail-cables-puissance.jpg",
    badge: "Norme ONEE",
  },
  {
    id: "cb-r2v-bt",
    name: "Câble BT Cuivre Rigide U-1000 R2V / Armé RVFV",
    category: "cables-puissance",
    categoryLabel: "Câbles de Puissance",
    unit: "Mètre",
    description: "Câble d'alimentation basse tension industriel et tertiaire. Version standard R2V ou version armée de feuillards d'acier RVFV pour enterrement direct sans gaine.",
    specs: [
      { label: "Tension", value: "0,6/1 kV" },
      { label: "Nombre de Conducteurs", value: "1G, 2X, 3G, 4G, 5G" },
      { label: "Section", value: "1,5 mm² à 300 mm²" },
    ],
    image: "/media/retail-cables-puissance.jpg",
    badge: "Stock Permanent",
  },
  {
    id: "cb-ar2v-alu",
    name: "Câble BT Aluminium AR2V / Armé ARVFV",
    category: "cables-puissance",
    categoryLabel: "Câbles de Puissance",
    unit: "Mètre",
    description: "Câble de distribution principale forte intensité avec âme aluminium. Solution économique et allégée pour les liaisons TGBT-transformateur et lotissements.",
    specs: [
      { label: "Tension", value: "0,6/1 kV" },
      { label: "Sections", value: "3x50+50mm² à 3x240+95mm²" },
      { label: "Usage", value: "Distribution générale & réseaux" },
    ],
    image: "/media/retail-cables-puissance.jpg",
  },
  {
    id: "cb-cuivre-nu",
    name: "Câble Cuivre Nu pour Réseau de Terre",
    category: "cables-puissance",
    categoryLabel: "Câbles de Puissance",
    unit: "Mètre",
    description: "Conducteur en cuivre électrolytique recuit pour la boucle de fondation, les puits de terre et l'équipotentialité des masses de poste HTA.",
    specs: [
      { label: "Sections Normalisées", value: "29 mm², 50 mm², 75 mm²" },
      { label: "Pureté Cuivre", value: "99,9% IACS" },
      { label: "Conditionnement", value: "Touret ou couronne de 50m / 100m" },
    ],
    image: "/media/retail-cables-puissance.jpg",
    badge: "Indispensable Poste",
  },
  {
    id: "cb-h07rn-f",
    name: "Câble Souple Caoutchouc H07RN-F Néoprène",
    category: "cables-puissance",
    categoryLabel: "Câbles de Puissance",
    unit: "Mètre",
    description: "Câble souple en élastomère résistant aux huiles, graisses, abrasions et intempéries. Idéal pour groupes électrogènes, chantiers et équipements mobiles.",
    specs: [
      { label: "Gaine", value: "Polychloroprène (PCP / Néoprène)" },
      { label: "Température", value: "-25°C à +60°C" },
      { label: "Sections", value: "3G2,5 à 4G120 mm²" },
    ],
    image: "/media/retail-cables-puissance.jpg",
  },

  // B. Câbles de Signalisation
  {
    id: "cb-liycy",
    name: "Câble Blindé de Contrôle-Commande LIYCY / LIYY",
    category: "cables-signal",
    categoryLabel: "Câbles de Signalisation",
    unit: "Mètre",
    description: "Câbles souples multiconducteurs avec tresse de cuivre étamé contre les perturbations électromagnétiques (CEM). Indispensable pour automates et TGBT.",
    specs: [
      { label: "Blindage", value: "Tresse cuivre étamé (couverture >85%)" },
      { label: "Nombre de Paires / Conducteurs", value: "2 à 36 conducteurs" },
      { label: "Sections", value: "0,5 mm² à 2,5 mm²" },
    ],
    image: "/media/retail-cables-signal.jpg",
    badge: "Antiparasite",
  },
  {
    id: "cb-egsf",
    name: "Câble d'Instrumentation Armé EGSF / EGFA",
    category: "cables-signal",
    categoryLabel: "Câbles de Signalisation",
    unit: "Mètre",
    description: "Câbles d'instrumentation industrielle armés par feuillard d'acier (EGSF) ou fil d'acier galvanisé (EGFA) pour environnements pétroliers et usines sévères.",
    specs: [
      { label: "Protection Mécanique", value: "Armure acier zingué" },
      { label: "Paires", value: "1 à 27 paires blindées individuelles" },
      { label: "Tenue chimique", value: "Hydrocarbures et UV" },
    ],
    image: "/media/retail-cables-signal.jpg",
  },
  {
    id: "cb-reseau-cat6a",
    name: "Câble Réseau Informatique Cat 6A / Cat 7 S/FTP",
    category: "cables-signal",
    categoryLabel: "Câbles de Signalisation",
    unit: "Bobine",
    description: "Câbles 4 paires torsadées blindées pour réseaux informatiques tertiaires, vidéosurveillance IP CCTV et liaisons de contrôle d'accès.",
    specs: [
      { label: "Débit", value: "10 Gbits/s - 500 MHz" },
      { label: "Gaine", value: "LSZH Zéro Halogène non propagateur de flamme" },
      { label: "Conditionnement", value: "Touret de 305m / 500m" },
    ],
    image: "/media/retail-cables-signal.jpg",
  },

  // C. Matériel de Ligne HTA/BT
  {
    id: "lg-pinces",
    name: "Pinces d'Ancrage & de Suspension Réseau Torsadé",
    category: "ligne-hta",
    categoryLabel: "Matériel de Ligne",
    unit: "Unité",
    description: "Ensemble de pièces d'armement pour lignes aériennes HTA et faisceaux BT torsadés. Corps en alliage d'aluminium haute résistance mécanique.",
    specs: [
      { label: "Capacité", value: "Faisceaux 3x50+54.6 à 3x70+54.6 mm²" },
      { label: "Tenue Mécanique", value: "Jusqu'à 1500 daN" },
      { label: "Certification", value: "Conforme spécifications ONEE" },
    ],
    image: "/media/retail-ligne-hta.jpg",
  },
  {
    id: "lg-isolateur-24kv",
    name: "Isolateurs Composites & Verre 24 kV / 36 kV",
    category: "ligne-hta",
    categoryLabel: "Matériel de Ligne",
    unit: "Unité",
    description: "Isolateurs à jupe en silicone composite ou verre trempé pour l'isolation électrique des lignes aériennes moyenne tension en ambiance côtière ou polluée.",
    specs: [
      { label: "Niveau de Tension", value: "24 kV et 36 kV" },
      { label: "Ligne de Fuite", value: "Adaptée aux zones salines et désertiques" },
      { label: "Charge de Rupture", value: "70 kN à 120 kN" },
    ],
    image: "/media/retail-ligne-hta.jpg",
    badge: "Haute Résistance",
  },
  {
    id: "lg-parafoudre-hta",
    name: "Parafoudres HTA à Oxyde de Zinc (ZnO) 24 kV",
    category: "ligne-hta",
    categoryLabel: "Matériel de Ligne",
    unit: "Unité",
    description: "Protection de tête de ligne et de transformateur contre les surtensions de foudre et de manœuvre. Enveloppe en élastomère de silicone hydrophobe.",
    specs: [
      { label: "Courant Nominal de Décharge", value: "10 kA (Classe 1)" },
      { label: "Tension Continue Max (Uc)", value: "24 kV eff." },
      { label: "Déconnecteur", value: "Dispositif de déconnexion automatique inclus" },
    ],
    image: "/media/retail-ligne-hta.jpg",
  },
  {
    id: "lg-connecteurs-bt",
    name: "Connecteurs Étanches à Perforation d'Isolant (CBS/CT)",
    category: "ligne-hta",
    categoryLabel: "Matériel de Ligne",
    unit: "Unité",
    description: "Raccordement sous tension sur réseau aérien torsadé basse tension avec tête fusible assurant un couple de serrage calibré sans dénudage de câble.",
    specs: [
      { label: "Plage Principal", value: "16 à 95 mm²" },
      { label: "Plage Dérivation", value: "1,5 à 35 mm²" },
      { label: "Étanchéité", value: "Rigoureuse IP67 - 6 kV dans l'eau" },
    ],
    image: "/media/retail-ligne-hta.jpg",
  },
  {
    id: "lg-iacm",
    name: "Interrupteur Aérien à Commande Manuelle (IACM) 24 kV",
    category: "ligne-hta",
    categoryLabel: "Matériel de Ligne",
    unit: "Unité",
    description: "Appareil de coupure tripolaire sur poteau pour le sectionnement et l'isolement des dérivations de réseaux HTA ruraux et périurbains.",
    specs: [
      { label: "Tension", value: "24 kV - 50 Hz" },
      { label: "Courant Nominal", value: "400 A / 630 A" },
      { label: "Pouvoir de Coupure", value: "Charge nominale et boucle" },
    ],
    image: "/media/retail-ligne-hta.jpg",
    badge: "Équipement Réseau",
  },

  // D. Matériel de Poste de Transformation
  {
    id: "pt-bornes-embrochables",
    name: "Bornes & Connecteurs Déconnectables Embrochables HTA",
    category: "poste-transfo",
    categoryLabel: "Poste de Transformation",
    unit: "Unité",
    description: "Connecteurs coudés ou droits déconnectables 250A et 630A pour le raccordement direct des câbles HTA sur traversées de transformateur et cellules.",
    specs: [
      { label: "Calibre", value: "250 A (Interface A) & 630 A (Interface C)" },
      { label: "Tension", value: "24 kV" },
      { label: "Point de Test Capacitif", value: "Intégré avec bouchon de protection" },
    ],
    image: "/media/retail-poste-transfo.jpg",
    badge: "Agréé Cellules",
  },
  {
    id: "pt-fusibles-solarkron",
    name: "Fusibles HTA Haute Tension Solarkron & Fusibles d'Accompagnement",
    category: "poste-transfo",
    categoryLabel: "Poste de Transformation",
    unit: "Unité",
    description: "Fusibles limiteurs à percuteur pour la protection des transformateurs contre les courts-circuits internes et les surcharges sévères.",
    specs: [
      { label: "Tension d'Emploi", value: "10/24 kV et 24/36 kV" },
      { label: "Calibres", value: "6.3A, 10A, 16A, 25A, 40A, 63A, 100A" },
      { label: "Pouvoir de Coupure", value: "Jusqu'à 50 kA" },
    ],
    image: "/media/retail-poste-transfo.jpg",
  },
  {
    id: "pt-extremites-kit",
    name: "Kits d'Extrémités HTA Intérieur / Extérieur",
    category: "poste-transfo",
    categoryLabel: "Poste de Transformation",
    unit: "Lot",
    description: "Kits de terminaison thermorétractable ou rétractable à froid pour confection des têtes de câbles unipolaires et tripolaires HTA en poste ou sur poteau.",
    specs: [
      { label: "Usage", value: "Intérieur sous cellule ou Extérieur plein air" },
      { label: "Sections Compatibles", value: "50 à 240 mm²" },
      { label: "Contenu", value: "Gaines de contrôle de champ, mastic étanche, cosses" },
    ],
    image: "/media/retail-poste-transfo.jpg",
  },
  {
    id: "pt-interrupteur-sectionneur",
    name: "Interrupteur-Sectionneur HTA d'Intérieur Sous SF6",
    category: "poste-transfo",
    categoryLabel: "Poste de Transformation",
    unit: "Unité",
    description: "Appareillage de coupure sous gaz SF6 pour cellules de ligne et protection combinée fusibles en poste de transformation maçonné ou préfabriqué.",
    specs: [
      { label: "Tension Nominale", value: "24 kV" },
      { label: "Courant Assigné", value: "630 A" },
      { label: "Tenue au Court-Circuit", value: "20 kA / 1s" },
    ],
    image: "/media/retail-poste-transfo.jpg",
  },

  // E. Cheminement & Canalisations
  {
    id: "ch-gaine-tpc",
    name: "Gaines Double Paroi TPC Annelées (Rouge / Bleu / Vert)",
    category: "cheminement",
    categoryLabel: "Cheminement & Canalisations",
    unit: "Mètre",
    description: "Fourreaux en polyéthylène haute densité avec extérieur annelé pour la résistance mécanique et intérieur lisse avec tire-fil pour passage de câbles souterrains.",
    specs: [
      { label: "Diamètres Disponibles", value: "DN 40, 50, 63, 75, 90, 110, 160 mm" },
      { label: "Résistance Écrasement", value: "450 N (Norme NF EN 61386-24)" },
      { label: "Codes Couleur", value: "Rouge (Électricité BT/HT), Bleu, Vert" },
    ],
    image: "/media/retail-cheminement.jpg",
  },
  {
    id: "ch-chemin-cables",
    name: "Chemins de Câbles en Tôle Perforée Galvanisée & Fil d'Acier",
    category: "cheminement",
    categoryLabel: "Cheminement & Canalisations",
    unit: "Mètre",
    description: "Système complet de support de câbles industriels : dalles perforées, treillis fils, éclisses de raccordement, consoles murales et couvercles clipsables.",
    specs: [
      { label: "Largeurs", value: "50, 100, 150, 200, 300, 400, 500, 600 mm" },
      { label: "Hauteurs d'Aile", value: "35 mm, 50 mm, 60 mm, 100 mm" },
      { label: "Finition", value: "Galvanisé Sendzimir ou Galvanisé à chaud (HDG)" },
    ],
    image: "/media/retail-cheminement.jpg",
  },
  {
    id: "ch-tube-isogris",
    name: "Tubes Rigides Isogris & PVC Armé M1",
    category: "cheminement",
    categoryLabel: "Cheminement & Canalisations",
    unit: "Mètre",
    description: "Conduits rigides non propagateurs de flamme pour canalisations électriques apparentes dans les ateliers, locaux techniques et parkings.",
    specs: [
      { label: "Diamètres", value: "IRL 16, 20, 25, 32, 40, 50 mm" },
      { label: "Classification", value: "3321 non propagateur de flamme M1" },
      { label: "Accessoires", value: "Coudes, manchons, tés et colliers lyres" },
    ],
    image: "/media/retail-cheminement.jpg",
  },
  {
    id: "ch-goulotte-distribution",
    name: "Goulottes de Distribution & Plastrons Appareillage",
    category: "cheminement",
    categoryLabel: "Cheminement & Canalisations",
    unit: "Mètre",
    description: "Goulottes PVC à compartiments pour la séparation des courants forts et courants faibles dans les locaux tertiaires et salles de serveurs.",
    specs: [
      { label: "Dimensions", value: "50x100, 50x150, 60x200 mm" },
      { label: "Intégration", value: "Plastrons au format 45x45 pour prises RJ45 et 2P+T" },
      { label: "Fermeture", value: "Couvercle intégral résistant aux chocs" },
    ],
    image: "/media/retail-cheminement.jpg",
  },

  // F. Raccordement & Armoires
  {
    id: "rc-cosses-bimetal",
    name: "Cosses Bimétalliques Aluminium-Cuivre & Manchons de Jonction",
    category: "raccordement",
    categoryLabel: "Raccordement",
    unit: "Unité",
    description: "Cosses à sertir par rétreint pour la liaison fiable sans couple galvanique entre câbles aluminium et bornes ou plages en cuivre de transformateur/TGBT.",
    specs: [
      { label: "Sections Câble Alu", value: "50, 70, 95, 120, 150, 185, 240, 300 mm²" },
      { label: "Perçage Plage Cuivre", value: "M8, M10, M12, M14, M16" },
      { label: "Technologie", value: "Soudage par friction moléculaire Alu/Cuivre" },
    ],
    image: "/media/retail-raccordement.jpg",
    badge: "Haute Qualité",
  },
  {
    id: "rc-borniers-din",
    name: "Borniers de Jonction sur Rail DIN & Traversées",
    category: "raccordement",
    categoryLabel: "Raccordement",
    unit: "Unité",
    description: "Bornes modulaires à vis ou à ressort pour le raccordement propre et structuré des départs force et commande à l'intérieur des armoires électriques.",
    specs: [
      { label: "Sections Prises en Charge", value: "2,5 mm² à 95 mm²" },
      { label: "Tension Assignée", value: "800V / 1000V" },
      { label: "Fixation", value: "Rail DIN symétrique standard 35 mm" },
    ],
    image: "/media/retail-raccordement.jpg",
  },
  {
    id: "rc-jeux-barres",
    name: "Barres de Cuivre Électrolytique & Supports Isolateurs",
    category: "raccordement",
    categoryLabel: "Raccordement",
    unit: "Unité",
    description: "Barres méplates en cuivre rouge pour la confection des jeux de barres principaux de TGBT jusqu'à 4000A avec isolateurs étagés haute tenue aux efforts électrodynamiques.",
    specs: [
      { label: "Sections Cuivre", value: "20x5, 30x5, 40x10, 50x10, 80x10, 100x10 mm" },
      { label: "Isolateurs", value: "Polyester chargé fibres de verre sans halogène" },
      { label: "Tenue Diélectrique", value: "1000V AC / 1500V DC" },
    ],
    image: "/media/retail-raccordement.jpg",
  },
  {
    id: "rc-presse-etoupe",
    name: "Presses-Étoupes Métalliques & Polyamide IP68",
    category: "raccordement",
    categoryLabel: "Raccordement",
    unit: "Unité",
    description: "Raccordement d'entrée étanche pour câbles armés et non armés assurant la protection IP68 contre la poussière et l'humidité à l'entrée des coffrets.",
    specs: [
      { label: "Filetages", value: "M16 à M63 et pas PG 9 à PG 48" },
      { label: "Matériaux", value: "Laiton nickelé pour industrie ou Polyamide 6.6" },
      { label: "Joint d'Étanchéité", value: "Néoprène haute résistance" },
    ],
    image: "/media/retail-raccordement.jpg",
  },

  // G. Protections & Appareillage
  {
    id: "pr-disjoncteur-compact",
    name: "Disjoncteurs Boîtier Moulé Compacts Industriels 160A à 3200A",
    category: "disjoncteurs",
    categoryLabel: "Protections & Appareillage",
    unit: "Unité",
    description: "Disjoncteurs de puissance 3P et 4P à déclencheur magnétothermique ou électronique Micrologic pour la protection de tête de TGBT et départs moteurs.",
    specs: [
      { label: "Calibres", value: "160A, 250A, 400A, 630A, 800A, 1250A, 1600A, 3200A" },
      { label: "Pouvoir de Coupure (Icu)", value: "36 kA, 50 kA, 70 kA sous 415V" },
      { label: "Montage", value: "Fixe ou Débrochable sur châssis" },
    ],
    image: "/media/retail-disjoncteurs.jpg",
    badge: "Protection TGBT",
  },
  {
    id: "pr-modulaire",
    name: "Disjoncteurs Modulaires Courbe C & D (1P+N, 3P, 4P)",
    category: "disjoncteurs",
    categoryLabel: "Protections & Appareillage",
    unit: "Unité",
    description: "Gamme modulaire pour la distribution divisionnaire tertiaire et résidentielle. Protection contre les surcharges et courts-circuits.",
    specs: [
      { label: "Calibres", value: "6A, 10A, 16A, 20A, 25A, 32A, 40A, 63A" },
      { label: "Pouvoir de Coupure", value: "6 kA, 10 kA et 15 kA" },
      { label: "Courbes", value: "Courbe C (standard) et Courbe D (forts courants d'appel)" },
    ],
    image: "/media/retail-disjoncteurs.jpg",
  },
  {
    id: "pr-differentiels",
    name: "Interrupteurs & Blocs Différentiels Type AC, A et Super Immunisé",
    category: "disjoncteurs",
    categoryLabel: "Protections & Appareillage",
    unit: "Unité",
    description: "Protection des personnes et des biens contre les contacts indirects et les courants de fuite à la terre selon la norme C15-100.",
    specs: [
      { label: "Sensibilités", value: "30 mA (sécurité des personnes) et 300 mA (protection incendie)" },
      { label: "Intensité Nominale", value: "25A, 40A, 63A, 80A, 100A" },
      { label: "Immunité", value: "Type 'Si' contre les déclenchements intempestifs sur variateurs" },
    ],
    image: "/media/retail-disjoncteurs.jpg",
  },
  {
    id: "pr-relais-protection",
    name: "Relais Thermiques & Disjoncteurs-Moteurs Magnétothermiques",
    category: "disjoncteurs",
    categoryLabel: "Protections & Appareillage",
    unit: "Unité",
    description: "Protection dédiée aux moteurs électriques asynchrones triphasés contre les surcharges lentes, les blocages de rotor et les disparitions de phase.",
    specs: [
      { label: "Plage de Réglage", value: "0,1A jusqu'à 80A direct" },
      { label: "Sensibilité Déphasage", value: "Déclenchement instantané en cas de coupure de phase" },
      { label: "Bouton de Test", value: "Test manuel et réarmement automatique/manuel" },
    ],
    image: "/media/retail-disjoncteurs.jpg",
  },

  // H. Énergie & Éclairage
  {
    id: "en-groupe-electrogene",
    name: "Groupes Électrogènes Industriels Capotés Insonorisés 20 kVA à 1250 kVA",
    category: "energie-eclairage",
    categoryLabel: "Énergie & Éclairage",
    unit: "Unité",
    description: "Groupes de secours automatiques diesel avec inverseur de source normal/secours (ATS), motorisation industrielle renommée et insonorisation acoustique.",
    specs: [
      { label: "Gamme de Puissance", value: "20, 50, 100, 250, 500, 800, 1250 kVA" },
      { label: "Niveau Sonore", value: "<68 dB(A) à 7 mètres" },
      { label: "Automate de Contrôle", value: "Démarrage automatique sur panne secteur ONEE" },
    ],
    image: "/media/retail-energie-eclairage.jpg",
    badge: "Secours Garanti",
  },
  {
    id: "en-batterie-condensateurs",
    name: "Batteries Automatiques de Condensateurs HT/BT & Filtrage d'Harmoniques",
    category: "energie-eclairage",
    categoryLabel: "Énergie & Éclairage",
    unit: "Unité",
    description: "Élimination des pénalités pour dépassement de consommation de puissance réactive (Cos phi) facturées par l'ONEE et optimisation des réseaux d'usine.",
    specs: [
      { label: "Puissances Réactives", value: "25 kVAR à 800 kVAR étagés" },
      { label: "Régulation", value: "Régulateur var-métrique à microprocesseur" },
      { label: "Selfs Anti-Harmoniques", value: "Disponibles en accord 189 Hz ou 134 Hz" },
    ],
    image: "/media/retail-energie-eclairage.jpg",
    badge: "Économies Facture ONEE",
  },
  {
    id: "en-led-highbay",
    name: "Luminaires Industriels LED High-Bay IP65 / IK08 Forte Puissance",
    category: "energie-eclairage",
    categoryLabel: "Énergie & Éclairage",
    unit: "Unité",
    description: "Projecteurs suspendus en aluminium moulé pour l'éclairage de grandes hauteurs (entrepôts logistiques, ateliers de fabrication et hangars industriels).",
    specs: [
      { label: "Puissances", value: "100W, 150W, 200W, 240W" },
      { label: "Efficacité Lumineuse", value: "150 à 170 Lumens / Watt" },
      { label: "Durée de Vie", value: "L80B10 > 50 000 heures de fonctionnement" },
    ],
    image: "/media/retail-energie-eclairage.jpg",
  },
];
