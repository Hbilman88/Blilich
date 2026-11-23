export interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  category: "HT/BT & Énergie" | "Industrie & Infrastructure" | "Éclairage Public & Lotissements";
  summary: string;
  scope: string[];
  voltage: string;
  image: string;
  highlights: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: "hopital-tetouan",
    title: "Hôpital Provincial de Tétouan",
    client: "Ministère de la Santé / Régie de Tétouan",
    location: "Tétouan, Région Tanger-Tétouan-Al Hoceïma",
    category: "HT/BT & Énergie",
    summary:
      "Études d'exécution, fourniture, montage et mise en service complète du poste de livraison HTA 22 kV et des postes de transformation dédiés aux blocs opératoires et services critiques.",
    scope: [
      "Fourniture et installation de cellules HTA compactes sous enveloppe métallique 24 kV",
      "Raccordement et mise en service des transformateurs de puissance triphasés",
      "Déploiement des tableaux généraux basse tension (TGBT) à inverseurs de source automatiques",
      "Essais diélectriques et conformité ONEE selon les normes hospitalières C13-100",
    ],
    voltage: "22 kV HTA / 400V BT",
    image: "/media/project-hopital-tetouan.jpg",
    highlights: [
      { label: "Puissance Déployée", value: "2 x 1250 kVA" },
      { label: "Niveau de Sécurité", value: "Alimentation Secourue Prioritaire" },
      { label: "Régime de Neutre", value: "Régime IT Médicalisé" },
    ],
  },
  {
    id: "datacenter-nador",
    title: "Datacenter Orange (Nador)",
    client: "Orange Maroc / Finatech Group",
    location: "Nador, Région de l'Oriental",
    category: "Industrie & Infrastructure",
    summary:
      "Ingénierie et exécution du branchement aéro-souterrain 22 kV avec double adduction HTA pour la sécurisation continue d'un datacenter télécom souverain.",
    scope: [
      "Pose de câbles HTA PRC armés en tranchée technique renforcée",
      "Confection d'extrémités thermorétractables et embrochables 24 kV",
      "Interconnexion réseau aéro-souterraine et protections contre les surtensions atmosphériques",
      "Contrôle de continuité, mesures d'isolement et réception technique par l'ONEE",
    ],
    voltage: "22 kV HTA",
    image: "/media/project-datacenter-nador.jpg",
    highlights: [
      { label: "Disponibilité Cible", value: "Tier III Architecture" },
      { label: "Linéaire Câble HTA", value: "1 850 mètres" },
      { label: "Type Adduction", value: "Double boucle redondante" },
    ],
  },
  {
    id: "gir-safi",
    title: "Groupe d'Intervention Rapide (GIR) - Safi",
    client: "Direction Générale de la Sûreté Nationale (DGSN)",
    location: "Safi, Région Marrakech-Safi",
    category: "HT/BT & Énergie",
    summary:
      "Équipement électrique complet du poste principal HTA/BT pour une infrastructure institutionnelle hautement stratégique à exigences de service continu.",
    scope: [
      "Cellules de distribution moyenne tension et disjoncteur général HTA",
      "Poste de transformation à huile diélectrique minérale agréé ONEE",
      "Armoire TGBT modulaire compartimentée forme 3b avec disjoncteurs compacts débrochables",
      "Compensation d'énergie réactive automatique et réseau d'équipotentialité des masses",
    ],
    voltage: "22 kV / 400V",
    image: "/media/project-gir-safi.jpg",
    highlights: [
      { label: "Disjoncteur TGBT", value: "2 500 A Débrochable" },
      { label: "Conformité Réglementaire", value: "Normes ONEE & DGSN" },
      { label: "Continuité de Service", value: "Bascule automatique Groupe" },
    ],
  },
  {
    id: "lotissement-birjdid",
    title: "Lotissement Amical Azhar (Bir Jdid)",
    client: "Aménageur Urbanisme & Régie RADEEC",
    location: "Bir Jdid, Province d'El Jadida",
    category: "Éclairage Public & Lotissements",
    summary:
      "Travaux d'électrification complète d'un nouveau lotissement résidentiel et commercial : réseaux HTA/BT souterrains, postes préfabriqués et raccordements abonnés.",
    scope: [
      "Pose de réseau souterrain HTA en câbles aluminium PRC et BT en AR2V",
      "Implantation et raccordement de postes de transformation cabine préfabriquée",
      "Installation de coffrets de distribution et bornes de coupure réseau",
      "Coordination technique et essais de réception avec les services de la régie",
    ],
    voltage: "22 kV HTA / 230-400V BT",
    image: "/media/project-lotissement-birjdid.jpg",
    highlights: [
      { label: "Capacité Raccordement", value: "+320 Lots Abonnés" },
      { label: "Postes Installés", value: "2 Cabines Compactes" },
      { label: "Réseau Souterrain", value: "TPC Double Paroi 100%" },
    ],
  },
  {
    id: "eclairage-meknes",
    title: "Réseau d'Éclairage Public SSMK (Meknès)",
    client: "Commune Urbaine de Meknès (SSMK)",
    location: "Meknès, Région Fès-Meknès",
    category: "Éclairage Public & Lotissements",
    summary:
      "Rénovation complète, sécurisation et déploiement d'un réseau d'éclairage public moderne à haute efficacité énergétique LED sur grands boulevards urbains.",
    scope: [
      "Dépose des anciens câbles corrodés et tirage de nouveaux câbles cuivre armés RVFV",
      "Armoires de commande crépusculaires avec télégestion et comptage divisionnaire",
      "Installation de luminaires LED architecturaux haute performance et parafoudres BT",
      "Mise à la terre systématique de l'ensemble des mâts et candélabres",
    ],
    voltage: "Basse Tension 400V Triphasé",
    image: "/media/project-eclairage-meknes.jpg",
    highlights: [
      { label: "Gain Énergétique", value: "-48% Consommation kVA" },
      { label: "Points Lumineux", value: "+450 Mâts LED" },
      { label: "Régulation", value: "Horloge astronomique" },
    ],
  },
];
