"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, Project } from "@/data/projects";
import { ParallaxImage } from "@/components/ui/parallax-image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  MapPin,
  Calendar,
  Building2,
  Zap,
  Check,
  ArrowRight,
  ExternalLink,
  Layers,
} from "lucide-react";

const CATEGORIES = [
  "Tous",
  "HT/BT & Énergie",
  "Industrie & Infrastructure",
  "Éclairage Public & Lotissements",
] as const;

export default function RealisationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedCategory === "Tous") return true;
    return proj.category === selectedCategory;
  });

  return (
    <main className="w-full pt-24 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Top Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#007A63] font-bold">
            Références Chantiers & Ouvrages d'Art
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-foreground">
            Études de Cas & Réalisations Électriques
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Découvrez nos interventions majeures sur le territoire marocain : postes de transformation hospitaliers, branchements souverains pour datacenters, infrastructures institutionnelles et électrification urbaine.
          </p>

          {/* Category Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#007A63] text-white font-semibold shadow-xs"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-md border border-border bg-card overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setActiveProject(project)}
            >
              <div>
                <div className="relative h-60 w-full bg-slate-900 overflow-hidden">
                  <ParallaxImage
                    src={project.image}
                    alt={project.title}
                    containerClassName="relative h-full w-full overflow-hidden"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    yPercent={-8}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase rounded bg-[#007A63] text-white shadow">
                      {project.voltage}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{project.location.split(",")[0]}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-[#007A63] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  <div className="pt-2 border-t border-border/60 grid grid-cols-2 gap-2 text-[11px] font-mono">
                    {project.highlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="p-2 rounded bg-slate-50 dark:bg-slate-800/50 border border-border">
                        <p className="text-muted-foreground">{hl.label}</p>
                        <p className="font-bold text-foreground truncate">{hl.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded bg-slate-100 dark:bg-slate-800 text-foreground text-xs font-semibold group-hover:bg-[#007A63] group-hover:text-white transition-colors"
                >
                  <span>Consulter la Fiche Technique</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Detail Dialog Modal */}
      {activeProject && (
        <Dialog open={!!activeProject} onOpenChange={(open) => !open && setActiveProject(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#007A63] uppercase font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>{activeProject.voltage} · {activeProject.category}</span>
              </div>
              <DialogTitle className="text-2xl font-heading font-bold text-foreground">
                {activeProject.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground font-mono">
                Client : <strong>{activeProject.client}</strong> · Localisation : {activeProject.location}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 pt-2">
              <div className="relative h-64 w-full rounded-md overflow-hidden bg-slate-900 border border-border">
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold">
                  Présentation du Chantier
                </h4>
                <p className="text-sm text-foreground leading-relaxed">
                  {activeProject.summary}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold">
                  Périmètre Technique Exécuté
                </h4>
                <div className="space-y-2">
                  {activeProject.scope.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground">
                      <Check className="w-4 h-4 text-[#007A63] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                {activeProject.highlights.map((hl, i) => (
                  <div key={i} className="p-3 rounded bg-slate-100 dark:bg-slate-800 text-center">
                    <p className="text-[10px] text-muted-foreground font-mono uppercase">{hl.label}</p>
                    <p className="text-xs font-bold font-mono text-foreground mt-0.5">{hl.value}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                <Link
                  href={`/rendez-vous?projet=${activeProject.id}`}
                  className="px-5 py-2.5 bg-[#007A63] hover:bg-[#005F4D] text-white text-xs font-semibold rounded flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Étudier un projet similaire</span>
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
