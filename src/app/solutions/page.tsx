import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ParallaxImage } from "@/components/ui/parallax-image";
import {
  ShieldCheck,
  Video,
  KeyRound,
  BellRing,
  MonitorCheck,
  Building,
  Check,
  Calendar,
  ArrowRight,
  Briefcase,
  Store,
  Hotel,
  Tv,
} from "lucide-react";

export const metadata = {
  title: "MOCOMEL Solutions | Aménagement Tertiaire, Courant Faible & Sûreté",
  description:
    "Aménagement de locaux tertiaires, vidéosurveillance IP CCTV, contrôle d'accès biométrique, détection incendie et domotique. Casablanca, Maroc.",
};

const DOMAINS = [
  {
    id: "surete",
    title: "Sûreté Électronique, CCTV & Contrôle d'Accès",
    desc: "Sécurisation périmétrique et intérieure des bâtiments d'entreprises, usines et résidences de standing.",
    items: [
      "Vidéosurveillance IP haute définition (caméras dômes, dômes mobiles PTZ, enregistreurs NVR)",
      "Contrôle d'accès par badges RFID sans contact, biométrie faciale et empreinte digitale",
      "Obstacles physiques : tourniquets tripodes, couloirs rapides vitrés et barrières levantes",
      "Interphonie vidéo IP et gestion des visiteurs centralisée",
    ],
    image: "/media/solutions-security.jpg",
    badge: "Sûreté & CCTV",
  },
  {
    id: "courant-faible",
    title: "Câblage VDI, Audiovisuel & Domotique",
    desc: "Infrastructures numériques certifiées et solutions audiovisuelles pour espaces collaboratifs modernes.",
    items: [
      "Câblage structuré cuivre Cat 6A / Cat 7 et rocades fibre optique inter-bâtiments",
      "Équipement de baies serveurs, bandeaux de brassage et onduleurs de secours",
      "Salles de visioconférence intégrées (écrans interactifs, micros plafond et barres vidéo)",
      "Sonorisation d'ambiance et domotique d'éclairage intelligente",
    ],
    image: "/media/card-solutions.jpg",
    badge: "Réseaux VDI & AV",
  },
  {
    id: "amenagement",
    title: "Second Œuvre & Aménagement Clé en Main",
    desc: "Prise en charge intégrale de vos travaux d'aménagement intérieur pour bureaux, agences et showrooms.",
    items: [
      "Cloisonnement amovible vitré ou plein en aluminium thermolaqué",
      "Faux-planchers techniques surélevés pour passage discret des fluides et réseaux",
      "Éclairage architectural tertiaire LED basse consommation et dalles 600x600",
      "Alimentation modulaire des postes de travail par nourrices et colonnes rétractables",
    ],
    image: "/media/card-solutions.jpg",
    badge: "Second Œuvre",
  },
];

const SECTORS = [
  {
    title: "Sièges Sociaux & Bureaux",
    desc: "Plateaux d'affaires ouverts, bureaux de direction et espaces de coworking.",
    icon: Building,
  },
  {
    title: "Showrooms & Commerces",
    desc: "Espaces d'exposition commerciale, boutiques et agences bancaires.",
    icon: Store,
  },
  {
    title: "Salles de Conférence",
    desc: "Salles de conseil d'administration avec visioconférence haute fidélité.",
    icon: Tv,
  },
  {
    title: "Datarooms & Serveurs",
    desc: "Salles informatiques sécurisées avec climatisation et contrôle d'accès strict.",
    icon: MonitorCheck,
  },
  {
    title: "Hôtellerie & Résidences",
    desc: "Établissements d'accueil et résidences privées de haut standing.",
    icon: Hotel,
  },
];

export default function SolutionsPage() {
  return (
    <main className="w-full theme-solutions">
      {/* 1. Hero Section */}
      <section className="relative min-h-[75vh] flex items-center bg-[#0B1120] text-white overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/card-solutions.jpg"
            alt="MOCOMEL Solutions"
            fill
            sizes="100vw"
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent" />
          <div className="absolute inset-0 swiss-grid-dark opacity-30 pointer-events-none" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#22409A]/40 border border-[#22409A]/60 text-blue-300 text-xs font-mono uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>MOCOMEL Solutions · Second Œuvre & Sûreté</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Aménagement Tertiaire, Courant Faible & Sûreté Électronique
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Intégrateur de solutions technologiques pour environnements professionnels : vidéosurveillance IP, contrôle d'accès biométrique, détection incendie et aménagement d'espaces de travail à haute valeur ajoutée.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/rendez-vous?pole=solutions"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#22409A] hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Étudier un Projet d'Aménagement</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm rounded backdrop-blur-sm transition-colors"
              >
                <span>Contacter l'Équipe Solutions</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3-Domain Showcase */}
      <section className="py-24 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#22409A] font-bold">
              Domaines d'Intervention
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2">
              Technologies Bâtiment Intelligentes & Confort Collaboratif
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {DOMAINS.map((domain) => (
              <div
                key={domain.id}
                className="rounded-md border border-border bg-card overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full bg-slate-900 overflow-hidden">
                    <ParallaxImage
                      src={domain.image}
                      alt={domain.title}
                      containerClassName="relative h-full w-full overflow-hidden"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      yPercent={-8}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase rounded bg-[#22409A] text-white">
                        {domain.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-heading font-bold text-white leading-snug">
                        {domain.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {domain.desc}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-border/60">
                      {domain.items.map((it, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-foreground">
                          <Check className="w-3.5 h-3.5 text-[#22409A] shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/rendez-vous?pole=solutions&specialite=${domain.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#22409A]/10 hover:bg-[#22409A] text-[#22409A] hover:text-white font-semibold text-xs transition-colors"
                  >
                    <span>Demander une Faisabilité Technique</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Sectors of Activity */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#22409A] font-bold">
              Typologie de Locaux
            </span>
            <h2 className="text-3xl font-heading font-bold text-foreground mt-2">
              Secteurs d'Application au Maroc
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {SECTORS.map((sec, i) => {
              const Icon = sec.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded border border-border bg-card text-center flex flex-col items-center justify-between space-y-3 hover:border-[#22409A] hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#22409A] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-foreground">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-normal">
                      {sec.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CTA Banner */}
      <section className="py-16 bg-[#22409A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold">
              Vous réaménagez ou sécurisez vos locaux ?
            </h3>
            <p className="text-blue-100 text-sm mt-1">
              Bénéficiez d'une étude d'implantation et d'un chiffrage sous 48h.
            </p>
          </div>
          <Link
            href="/rendez-vous?pole=solutions"
            className="px-6 py-3.5 rounded bg-white text-[#22409A] hover:bg-blue-50 font-bold text-sm shadow transition-colors shrink-0"
          >
            Prendre RDV Solutions
          </Link>
        </div>
      </section>
    </main>
  );
}
