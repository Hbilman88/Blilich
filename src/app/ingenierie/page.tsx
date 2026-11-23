import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LifecycleScrollytelling } from "@/components/ingenierie/lifecycle-scrollytelling";
import {
  Zap,
  Activity,
  Cpu,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Layers,
  Wrench,
  BarChart3,
  Flame,
  Check,
} from "lucide-react";

export const metadata = {
  title: "MOCOMEL Ingénierie | Postes HTA/BT, Tableaux TGBT & Électricité Industrielle",
  description:
    "Études d'exécution, postes de transformation 22 kV, montage d'armoires TGBT et automatismes industriels accrédités ONEE. Casablanca, Maroc.",
};

const LIFECYCLE_STEPS = [
  {
    step: "01",
    title: "Auditer & Diagnostiquer",
    desc: "Relevés de puissance sur site, analyse des harmoniques, thermographie infrarouge des armoires existantes et conformité avec les exigences de raccordement ONEE.",
    icon: Gauge,
  },
  {
    step: "02",
    title: "Concevoir & Modéliser",
    desc: "Élaboration des schémas unifilaires DWG, dimensionnement des câbles et jeux de barres sous Caneco BT/HT, notes de calcul de court-circuit et sélectivité.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Fabriquer & Câbler en Atelier",
    desc: "Montage et câblage dans notre atelier spécialisé de Sidi Moumen (Casablanca) : armoires TGBT compartimentées, jeux de barres cuivre façonnés et tests d'isolement diélectrique.",
    icon: Wrench,
  },
  {
    step: "04",
    title: "Déployer & Raccorder sur Chantier",
    desc: "Grutage et pose des transformateurs HTA, raccordement des cellules 24 kV par connecteurs embrochables, tirage des câbles armés et coordination avec les régies.",
    icon: Zap,
  },
  {
    step: "05",
    title: "Maintenir & Optimiser",
    desc: "Contrats de maintenance préventive et curative, resserrage thermographique programmé, régulation Cos phi et dépannage d'urgence 24/7 sur tout le Maroc.",
    icon: Activity,
  },
];

const TECHNICAL_PILLARS = [
  {
    id: "postes",
    title: "Réseaux & Postes HTA/BT",
    badge: "22 kV & 30 kV",
    desc: "Postes de livraison et de transformation cabines préfabriquées ou locaux maçonnés. Spécialiste agréé des interconnexions haute et moyenne tension.",
    items: [
      "Cellules HTA sous enveloppe métallique SF6 (24 kV - 36 kV)",
      "Transformateurs secs enrobés ou à bain d'huile minérale",
      "Kits d'extrémités et bornes embrochables 250A / 630A",
      "Protections homopolaires, surtensions et parafoudres de ligne",
    ],
    image: "/media/card-ingenierie.jpg",
  },
  {
    id: "tgbt",
    title: "Électricité Industrielle & Tableaux TGBT",
    badge: "Jusqu'à 4000A",
    desc: "Conception sur-mesure d'armoires générales de distribution forte puissance pour usines, hôpitaux, centres commerciaux et datacenters.",
    items: [
      "Tableaux Généraux Basse Tension compartimentés Forme 2b à 4b",
      "Inverseurs de sources automatiques Normal / Secours / Groupe",
      "Compensation automatique d'énergie réactive et selfs anti-harmoniques",
      "Jeux de barres cuivre électrolytique façonnés sur gabarits",
    ],
    image: "/media/lifecycle-atelier.jpg",
  },
  {
    id: "scada",
    title: "Automatisme, Supervision & SCADA",
    badge: "Télégestion & PLC",
    desc: "Intégration d'automates programmables industriels, écrans tactiles HMI et supervision centralisée pour l'optimisation des procédés de fabrication.",
    items: [
      "Programmation automates (Siemens, Schneider Electric, ABB)",
      "Synoptiques de supervision SCADA et télémesure énergétique",
      "Variateurs de vitesse forte puissance pour pompage et ventilation",
      "Armoires de commande moteurs (MCC) et départs progressifs",
    ],
    image: "/media/lifecycle-automation.jpg",
  },
];

export default function IngenieriePage() {
  return (
    <main className="w-full theme-ingenierie">
      {/* 1. Split Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-[#0B1120] text-white overflow-hidden pt-24 pb-16">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
        >
          <source src="/media/ingenierie-workshop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent z-10" />
        <div className="absolute inset-0 swiss-grid-dark opacity-30 z-10 pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#007A63]/30 border border-[#007A63]/50 text-emerald-300 text-xs font-mono uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>MOCOMEL Ingénierie · Pôle Cœur de Métier</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Ingénierie Électrique HTA/BT & Postes de Transformation
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Bureau d'études, atelier de câblage et équipes de chantier accrédités ONEE. Nous concevons, fabriquons et raccordons des infrastructures électriques à haute disponibilité énergétique sur l'ensemble du territoire marocain.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/rendez-vous?pole=ingenierie"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#007A63] hover:bg-[#005F4D] text-white font-semibold text-sm rounded shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Prendre RDV Ingénieur Avant-Vente</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/realisations"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm rounded backdrop-blur-sm transition-colors"
              >
                <span>Voir nos Réalisations Postes</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-4 text-xs font-mono text-slate-400">
              <div>
                <p className="text-white text-lg font-bold">22 kV / 30 kV</p>
                <p>Niveau d'intervention</p>
              </div>
              <div>
                <p className="text-white text-lg font-bold">Jusqu'à 4000A</p>
                <p>Tableaux TGBT</p>
              </div>
              <div>
                <p className="text-emerald-400 text-lg font-bold">ONEE Accrédité</p>
                <p>Agrément Officiel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 5-Step Lifecycle Pinned Scrollytelling */}
      <LifecycleScrollytelling />

      {/* 3. 3-Pillar Technical Bento */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#007A63] font-bold">
              Domaines d'Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2">
              Les Trois Piliers Techniques de MOCOMEL Ingénierie
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TECHNICAL_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="rounded-md border border-border bg-card overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full bg-slate-900">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase rounded bg-[#007A63] text-white">
                        {pillar.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-heading font-bold text-white">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.desc}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-border/60">
                      {pillar.items.map((it, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-foreground">
                          <Check className="w-3.5 h-3.5 text-[#007A63] shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/rendez-vous?pole=ingenierie&specialite=${pillar.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#007A63]/10 hover:bg-[#007A63] text-[#007A63] hover:text-white font-semibold text-xs transition-colors"
                  >
                    <span>Consulter un Spécialiste {pillar.badge}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Atelier de Câblage à Casablanca Spotlight */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#007A63] font-bold">
                Capacité Industrielle Propre
              </span>
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Notre Atelier de Fabrication & Câblage à Casablanca
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Situé à Anassi, Sidi Moumen, notre atelier de câblage est équipé de cisailles, poinçonneuses et plieuses hydrauliques pour le façonnage des barres de cuivre massif. Chaque armoire électrique sortant de notre atelier subit un protocole rigoureux de vérification : continuité des masses, serrage au couple dynamométrique et essai d'isolement à 2500V.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded border border-border bg-slate-50 dark:bg-slate-800/40">
                  <p className="font-bold text-foreground">Repérage Laser</p>
                  <p className="text-muted-foreground mt-0.5">Filerie numérotée selon plan unifilaire</p>
                </div>
                <div className="p-3 rounded border border-border bg-slate-50 dark:bg-slate-800/40">
                  <p className="font-bold text-foreground">Essais Diélectriques</p>
                  <p className="text-muted-foreground mt-0.5">Procès-verbal de réception fourni</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-80 sm:h-96 w-full rounded-md overflow-hidden border border-border shadow-md">
                <Image
                  src="/media/lifecycle-atelier.jpg"
                  alt="Atelier de câblage MOCOMEL"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Direct CTA Banner */}
      <section className="py-16 bg-[#007A63] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold">
              Un projet de poste HTA ou d'armoire industrielle ?
            </h3>
            <p className="text-emerald-100 text-sm mt-1">
              Échangez directement avec l'un de nos 5 ingénieurs chefs de projet HT/BT.
            </p>
          </div>
          <Link
            href="/rendez-vous?pole=ingenierie"
            className="px-6 py-3.5 rounded bg-white text-[#007A63] hover:bg-emerald-50 font-bold text-sm shadow transition-colors shrink-0"
          >
            Prendre RDV Technique
          </Link>
        </div>
      </section>
    </main>
  );
}
