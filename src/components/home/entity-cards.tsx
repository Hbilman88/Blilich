"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface EntityData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  bullets: string[];
  image: string;
  href: string;
  ctaText: string;
  color: string;
  softTint: string;
}

const ENTITY_ITEMS: EntityData[] = [
  {
    id: "ingenierie",
    badge: "01 · Pôle Mère",
    title: "MOCOMEL Ingénierie",
    subtitle: "Études, Postes HTA/BT & Automatismes",
    desc: "Études d'exécution, réalisation et raccordement de postes de transformation 22 kV, armoires industrielles TGBT, automatisme et maintenance réseau accréditée ONEE.",
    bullets: [
      "Postes de transformation 12/20 kV et 18/30 kV",
      "Conception d'armoires TGBT sur-mesure",
      "Supervision SCADA & automates industriels",
    ],
    image: "/media/card-ingenierie.jpg",
    href: "/ingenierie",
    ctaText: "Explorer le Pôle Ingénierie",
    color: "#007A63",
    softTint: "#ECFDF5",
  },
  {
    id: "solutions",
    badge: "02 · Second Œuvre",
    title: "MOCOMEL Solutions",
    subtitle: "Aménagement Tertiaire & Sûreté",
    desc: "Aménagement clé en main de locaux tertiaires et commerciaux, réseaux courant faible, vidéosurveillance CCTV, contrôle d'accès biométrique et gestion technique (GTC).",
    bullets: [
      "Vidéosurveillance IP & Contrôle d'Accès",
      "Câblage VDI baie informatique Cat 6A / 7",
      "Détection incendie & Sonorisation de sécurité",
    ],
    image: "/media/card-solutions.jpg",
    href: "/solutions",
    ctaText: "Découvrir MOCOMEL Solutions",
    color: "#22409A",
    softTint: "#EFF6FF",
  },
  {
    id: "retail",
    badge: "03 · Comptoir B2B",
    title: "MOCOMEL Retail",
    subtitle: "Comptoir Matériel & Câbles HT/BT",
    desc: "Vente et négoce direct B2B aux installateurs et industriels : câbles de puissance HTA/BT, équipement de poste, outillage agréé, disjoncteurs et luminaires industriels.",
    bullets: [
      "Câbles HTA PRC, R2V, AR2V & Cuivre nu",
      "Appareillage modulaire & Disjoncteurs jusqu'à 3200A",
      "Magasin 7 Tit Mellil & Livraison sur chantier",
    ],
    image: "/media/card-retail.jpg",
    href: "/retail",
    ctaText: "Accéder au Catalogue Retail",
    color: "#9B112B",
    softTint: "#FFF1F2",
  },
];

export function EntityCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".entity-card-col", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#007A63] font-bold">
            Synergie Opérationnelle
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2">
            Trois Pôles Complémentaires, Une Seule Rigueur d'Ingénierie
          </h2>
          <p className="text-muted-foreground mt-3 text-base">
            Du dimensionnement des postes moyenne tension jusqu'au comptoir d'approvisionnement des chantiers, le Groupe MOCOMEL couvre l'ensemble du cycle de vie électrique.
          </p>
        </div>

        {/* Desktop Interactive Expanding Cards Container */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {ENTITY_ITEMS.map((entity) => {
            const isHovered = activeHoverId === entity.id;
            const hasHover = activeHoverId !== null;

            return (
              <div
                key={entity.id}
                onMouseEnter={() => setActiveHoverId(entity.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                className={`entity-card-col relative rounded-xl border border-border bg-card overflow-hidden flex flex-col justify-between transition-all duration-500 ease-out will-change-transform ${
                  hasHover
                    ? isHovered
                      ? "lg:flex-[1.3] shadow-2xl scale-[1.01]"
                      : "lg:flex-[0.85] opacity-80"
                    : "lg:flex-1 shadow-sm"
                }`}
              >
                {/* Entity-Color Top Hairline Indicator */}
                <div
                  className="h-1 w-full transition-all duration-500"
                  style={{
                    backgroundColor: entity.color,
                    opacity: isHovered ? 1 : 0.6,
                  }}
                />

                <div>
                  {/* Media Visual with Zoom */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={entity.image}
                      alt={entity.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className={`object-cover transition-transform duration-700 ease-out ${
                        isHovered ? "scale-108" : "scale-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-2.5 py-1 text-xs font-mono font-bold uppercase rounded text-white shadow"
                        style={{ backgroundColor: entity.color }}
                      >
                        {entity.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-heading font-bold text-white">
                        {entity.title}
                      </h3>
                      <p className="text-xs font-mono mt-0.5 text-slate-200">
                        {entity.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {entity.desc}
                    </p>

                    <ul className="space-y-2 text-xs text-foreground font-medium pt-1">
                      {entity.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: entity.color }}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <Link
                    href={entity.href}
                    className="w-full inline-flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? entity.color : `${entity.color}15`,
                      color: isHovered ? "#ffffff" : entity.color,
                    }}
                  >
                    <span>{entity.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
