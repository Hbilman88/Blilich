"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Gauge, Layers, Wrench, Zap, Activity, CheckCircle2, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const STEPS = [
  {
    step: "01",
    title: "Auditer & Diagnostiquer",
    desc: "Relevés de puissance sur site, analyse des harmoniques, thermographie infrarouge des armoires existantes et conformité avec les exigences de raccordement ONEE.",
    specs: "Analyseurs Chauvin Arnoux · Caméra Flir T540 · Norme NM 06.1.001",
    image: "/media/card-ingenierie.jpg",
    icon: Gauge,
    badge: "Phase 1 · Audit Réseau",
    hudVolt: "22 kV / 400V",
    hudPhase: "Diagnostic Sur Site",
  },
  {
    step: "02",
    title: "Concevoir & Modéliser",
    desc: "Élaboration des schémas unifilaires DWG, dimensionnement des câbles et jeux de barres sous Caneco BT/HT, notes de calcul de court-circuit et sélectivité.",
    specs: "Caneco BT / HT · AutoCAD Electrical · Bilans Icc 50kA",
    image: "/media/card-ingenierie.jpg",
    icon: Layers,
    badge: "Phase 2 · Bureau d'Études",
    hudVolt: "Caneco BT / HT",
    hudPhase: "Calculs de Sélectivité",
  },
  {
    step: "03",
    title: "Fabriquer & Câbler en Atelier",
    desc: "Montage et câblage dans notre atelier spécialisé de Sidi Moumen (Casablanca) : armoires TGBT compartimentées, jeux de barres cuivre façonnés et tests d'isolement diélectrique.",
    specs: "Atelier Sidi Moumen · Cuivre électrolytique 4000A · Essais 2.5 kV",
    image: "/media/lifecycle-atelier.jpg",
    icon: Wrench,
    badge: "Phase 3 · Atelier Sidi Moumen",
    hudVolt: "Jusqu'à 4000A",
    hudPhase: "Câblage & Essais Diélectriques",
  },
  {
    step: "04",
    title: "Déployer & Raccorder sur Chantier",
    desc: "Grutage et pose des transformateurs HTA, raccordement des cellules 24 kV par connecteurs embrochables, tirage des câbles armés et coordination avec les régies.",
    specs: "Camions-grues 38T · Connecteurs Euromold · Agrément ONEE",
    image: "/media/lifecycle-atelier.jpg",
    icon: Zap,
    badge: "Phase 4 · Déploiement Réseau",
    hudVolt: "Homologation ONEE",
    hudPhase: "Raccordement 24 kV / 36 kV",
  },
  {
    step: "05",
    title: "Maintenir & Optimiser",
    desc: "Contrats de maintenance préventive et curative, resserrage thermographique programmé, régulation Cos phi et dépannage d'urgence 24/7 sur tout le Maroc.",
    specs: "Astreinte 24/7 · Régulation Cos phi 0.98 · Pièces d'origine",
    image: "/media/lifecycle-automation.jpg",
    icon: Activity,
    badge: "Phase 5 · Exploitation & SAV",
    hudVolt: "Cos φ ≥ 0.98",
    hudPhase: "Supervision & Maintenance 24/7",
  },
];

export function LifecycleScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      // Check prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // Desktop Pinning and Step Progression (>= 1024px)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!containerRef.current || !pinnedSectionRef.current) return;

        const pinTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=2200",
          pin: pinnedSectionRef.current,
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            // Update progress bar rail
            if (progressBarRef.current) {
              progressBarRef.current.style.height = `${Math.min(100, Math.max(0, progress * 100))}%`;
            }

            // Calculate active index
            const newIndex = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
            setActiveIdx(newIndex);
          },
        });

        return () => {
          pinTrigger.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const activeStepData = STEPS[activeIdx];

  return (
    <section ref={containerRef} className="relative bg-white dark:bg-slate-900 border-b border-border">
      {/* DESKTOP PINNED SECTION (>= 1024px) */}
      <div
        ref={pinnedSectionRef}
        className="hidden lg:flex h-screen w-full flex-col justify-between overflow-hidden px-8 py-12 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="flex items-end justify-between border-b border-border pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#007A63] font-bold">
              Méthodologie Intégrale · Scrollytelling
            </span>
            <h2 className="text-3xl font-heading font-extrabold text-foreground mt-1">
              Le Cycle de Vie d'un Projet Électrique HT/BT
            </h2>
          </div>
          <div className="text-right font-mono text-xs text-muted-foreground">
            <span>Étape Actuelle : </span>
            <strong className="text-[#007A63] font-bold text-sm">
              {activeStepData.step} / 05
            </strong>
          </div>
        </div>

        {/* Main Split Screen */}
        <div className="grid grid-cols-12 gap-10 items-center flex-1 my-auto">
          {/* Left Column (5 cols): Step indicators & detail text */}
          <div className="col-span-5 space-y-6">
            <div className="flex items-start gap-4">
              {/* Progress Rail */}
              <div className="relative w-1.5 self-stretch bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shrink-0 min-h-[140px]">
                <div
                  ref={progressBarRef}
                  className="w-full bg-[#007A63] rounded-full transition-all duration-150 ease-out"
                  style={{ height: `${((activeIdx + 1) / STEPS.length) * 100}%` }}
                />
              </div>

              {/* Step info list */}
              <div className="space-y-4 flex-1">
                <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase rounded bg-emerald-50 text-[#007A63] border border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-800">
                  {activeStepData.badge}
                </span>

                <h3 className="text-2xl font-heading font-extrabold text-foreground leading-snug">
                  {activeStepData.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeStepData.desc}
                </p>

                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-border space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block font-bold">
                    Outils & Spécifications de Contrôle
                  </span>
                  <p className="text-xs font-mono text-foreground font-medium">
                    {activeStepData.specs}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick click step navigation */}
            <div className="pt-2 flex items-center gap-2">
              {STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`w-9 h-9 rounded-lg font-mono text-xs font-bold transition-all ${
                    idx === activeIdx
                      ? "bg-[#007A63] text-white shadow-md scale-105"
                      : "bg-muted text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                  aria-label={`Étape ${s.step} : ${s.title}`}
                >
                  {s.step}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (7 cols): Crossfading Image & Technical HUD */}
          <div className="col-span-7 relative h-[440px] w-full rounded-2xl overflow-hidden border border-border shadow-2xl bg-slate-950">
            {STEPS.map((s, idx) => (
              <div
                key={s.step}
                className={`absolute inset-0 transition-opacity duration-700 ease-out will-change-transform ${
                  idx === activeIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="58vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/40" />

                {/* Technical HUD Overlay on Image */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{s.hudPhase}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-bold text-emerald-300">
                    {s.hudVolt}
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Groupe MOCOMEL Ingénierie
                    </span>
                    <p className="text-white font-heading font-bold text-lg">
                      {s.step} · {s.title}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <s.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Hint */}
        <div className="text-center text-xs font-mono text-muted-foreground pt-2">
          <span>Défilez vers le bas pour progresser dans les 5 phases du cycle technique</span>
        </div>
      </div>

      {/* MOBILE / TABLET STACKED VIEW (< 1024px) */}
      <div className="lg:hidden py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#007A63] font-bold">
              Méthodologie Intégrale
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
              Le Cycle de Vie d'un Projet Électrique
            </h2>
            <p className="text-sm text-muted-foreground">
              De l'audit initial jusqu'à la maintenance pluriannuelle, notre méthode garantit sécurité et longévité.
            </p>
          </div>

          <div className="space-y-6">
            {STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="rounded-xl border border-border bg-card overflow-hidden shadow-sm space-y-4 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded bg-emerald-50 text-[#007A63] border border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-800">
                      Étape {item.step}
                    </span>
                    <Icon className="w-5 h-5 text-[#007A63]" />
                  </div>

                  <div className="relative h-44 w-full rounded-lg overflow-hidden bg-slate-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        {item.hudVolt}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="p-3 rounded bg-muted/60 text-[11px] font-mono text-muted-foreground">
                    <strong className="block text-foreground mb-0.5">Spécifications :</strong>
                    {item.specs}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
