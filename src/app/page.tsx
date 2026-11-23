import React from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_INFO, ENTITIES } from "@/data/company";
import { CLIENTS } from "@/data/clients";
import { PROJECTS } from "@/data/projects";
import { HomeHeroSection } from "@/components/home/hero-section";
import { TelemetryStats } from "@/components/home/telemetry-stats";
import { EntityCards } from "@/components/home/entity-cards";
import {
  Calendar,
  FileText,
  ArrowRight,
  ShieldCheck,
  Zap,
  ShoppingBag,
  CheckCircle2,
  ChevronDown,
  Layers,
  Activity,
  Cpu,
  Building2,
  HardHat,
  ArrowUpRight,
} from "lucide-react";

export default function HomePage() {
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <main className="w-full flex-col">
      {/* 1. Full-viewport Hero with GSAP Entrance & Scrub */}
      <HomeHeroSection />

      {/* 2. Kinetic Telemetry Counters */}
      <TelemetryStats />

      {/* 3. 3-Entity Interactive Expanding Showcase Cards */}
      <EntityCards />

      {/* 4. Agréments & Clients de Référence */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ONEE Spotlight Box */}
          <div className="p-6 sm:p-8 rounded-md border-2 border-emerald-600/30 bg-emerald-50/40 dark:bg-emerald-950/20 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Habilitation Officielle de Référence</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                Accrédité ONEE (Branche Électricité) & Régies de Distribution
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Nos procédures de consignation, nos calculs de courts-circuits et nos protocoles de sécurité sont rigoureusement conformes aux exigences nationales de l'ONEE et des régies d'électricité (Lydec, Radeema, Redal, Radeec).
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 px-5 py-2.5 rounded text-xs font-mono font-bold uppercase bg-[#007A63] text-white hover:bg-[#005F4D] transition-colors"
            >
              Vérifier nos Agréments
            </Link>
          </div>

          {/* Client Logos / Names Grid */}
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Ils nous font confiance
            </span>
            <h3 className="text-2xl font-heading font-bold text-foreground mt-1">
              Partenaires & Clients Majeurs
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {CLIENTS.map((client) => (
              <div
                key={client.id}
                className="p-4 rounded border border-border bg-slate-50/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-400 transition-all text-center flex flex-col items-center justify-center min-h-[90px] group"
              >
                <span className="text-sm font-heading font-bold text-foreground group-hover:text-[#007A63] transition-colors">
                  {client.name}
                </span>
                <span className="text-[10px] text-muted-foreground mt-1 font-mono">
                  {client.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Réalisations Sélectionnées (Asymmetric Gallery) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#007A63] font-bold">
                Retours d'Expérience
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2">
                Projets Enseignes Réalisés
              </h2>
            </div>
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#007A63] hover:underline"
            >
              <span>Voir l'ensemble des 5 projets phares</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-md border border-border bg-card overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 text-[11px] font-mono font-bold uppercase rounded bg-black/70 text-white backdrop-blur-sm">
                        {project.voltage}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-xs text-[#007A63] font-mono font-medium">
                      {project.location}
                    </span>
                    <h3 className="text-lg font-heading font-bold text-foreground leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {project.summary}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-border/40 mt-4">
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Client : <strong className="text-foreground">{project.client}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Philosophie RH & Conversion Split */}
      <section className="py-20 bg-[#0B1120] text-white relative overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Editorial Image & Quote (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative h-80 sm:h-96 w-full rounded-md overflow-hidden border border-white/10">
                <Image
                  src="/media/team-philosophy.jpg"
                  alt="Équipe Ingénieurs MOCOMEL"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <blockquote className="text-lg sm:text-xl font-heading font-bold italic text-white leading-snug">
                    « {COMPANY_INFO.hrMotto} »
                  </blockquote>
                  <p className="text-xs text-emerald-400 font-mono mt-1">
                    Devise Fondatrice de MOCOMEL SARL
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Direct Dual Conversion Block (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Démarrer Votre Projet
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-2">
                  Un Interlocuteur Technique Dédié à Casablanca
                </h3>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  Que vous ayez un cahier des charges d'aménagement tertiaire, un poste HTA à équiper ou un bordereau de prix de matériel électrique, nos équipes vous répondent sous 24h ouvrées.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded border border-white/15 bg-white/5 hover:border-emerald-500/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Besoin d'une étude d'ingénierie ?</p>
                      <p className="text-xs text-slate-400 mt-0.5">Visite technique sur chantier ou réunion au siège.</p>
                    </div>
                    <Link
                      href="/rendez-vous"
                      className="shrink-0 px-3 py-1.5 rounded bg-[#007A63] hover:bg-[#005F4D] text-white text-xs font-semibold"
                    >
                      Prendre RDV
                    </Link>
                  </div>
                </div>

                <div className="p-4 rounded border border-white/15 bg-white/5 hover:border-emerald-500/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Besoin d'un chiffrage matériel ?</p>
                      <p className="text-xs text-slate-400 mt-0.5">Ajoutez vos références et générez votre devis RFQ.</p>
                    </div>
                    <Link
                      href="/demande-devis"
                      className="shrink-0 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20"
                    >
                      Demande Devis
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
