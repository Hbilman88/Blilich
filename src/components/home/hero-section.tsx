"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Calendar, FileText, ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COMPANY_INFO } from "@/data/company";

export function HomeHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const bottomStripRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // 1. Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: -15,
        scale: 0.95,
        duration: 0.7,
        delay: 0.15,
      })
        .from(
          ".hero-headline-line",
          {
            y: "115%",
            opacity: 0,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.14,
          },
          "-=0.4"
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
          },
          "-=0.6"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            scale: 0.98,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          pillsRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          bottomStripRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
          },
          "-=0.4"
        );

      // 2. Scroll-scrubbed parallax video scale & translation
      if (videoRef.current && containerRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.14,
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[640px] w-full flex items-center justify-center overflow-hidden bg-[#0B1120] text-white"
    >
      {/* Background Looping Video with Hardware Acceleration */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center opacity-45 will-change-transform scale-100"
      >
        <source src="/media/hero-power-grid.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Architectural Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/50 to-black/75 z-10" />
      <div className="absolute inset-0 swiss-grid-dark opacity-35 z-10 pointer-events-none" />

      {/* Hero Content Box */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        {/* Top Tagline Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{COMPANY_INFO.slogan}</span>
          <span className="text-emerald-500/50">|</span>
          <span className="text-white/90">Accrédité ONEE</span>
        </div>

        {/* Main Title with Masked Line Reveals */}
        <h1
          ref={titleRef}
          className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold tracking-tight text-white max-w-5xl leading-[1.1] mb-6 overflow-hidden"
        >
          <span className="block overflow-hidden pb-1">
            <span className="hero-headline-line block will-change-transform">
              L'Ingénierie Électrique
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="hero-headline-line block will-change-transform text-slate-100">
              de Haute Précision
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="hero-headline-line block will-change-transform text-[#007A63]">
              au Cœur du Royaume
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10 font-sans will-change-transform"
        >
          Partenaire certifié des régies et industriels marocains pour les <strong>postes HTA/BT</strong>, le <strong>second œuvre tertiaire & sûreté</strong>, et la <strong>distribution de matériel électrique B2B</strong>.
        </p>

        {/* Dual Call To Actions */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto will-change-transform">
          <Link
            href="/rendez-vous"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#007A63] hover:bg-[#005F4D] text-white font-semibold text-sm rounded shadow-lg shadow-emerald-900/40 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Prendre RDV Ingénieur Avant-Vente</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/demande-devis"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm rounded backdrop-blur-md transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Créer une Demande de Devis (RFQ)</span>
          </Link>
        </div>

        {/* Quick Entity Nav Pills */}
        <div ref={pillsRef} className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
          <Link
            href="/ingenierie"
            className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 border border-emerald-500/30 text-emerald-300 transition-colors"
          >
            01 · Ingénierie HT/BT & Postes
          </Link>
          <Link
            href="/solutions"
            className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 border border-blue-500/30 text-blue-300 transition-colors"
          >
            02 · Solutions Tertiaires & Sûreté
          </Link>
          <Link
            href="/retail"
            className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 border border-rose-500/30 text-rose-300 transition-colors"
          >
            03 · Comptoir & Négoce Retail B2B
          </Link>
        </div>
      </div>

      {/* Bottom Architectural Metadata Strip */}
      <div
        ref={bottomStripRef}
        className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-md py-3 px-6 hidden sm:flex items-center justify-between text-xs font-mono text-slate-400"
      >
        <div className="flex items-center gap-4">
          <span className="text-white">CASABLANCA · ROYAUME DU MAROC</span>
          <span>·</span>
          <span>AGRÉMENT ONEE BRANCHE ÉLECTRICITÉ</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300 animate-bounce">
          <span>DÉCOUVRIR LE GROUPE</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </section>
  );
}
