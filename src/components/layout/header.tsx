"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQuoteCart } from "@/context/quote-cart-context";
import {
  Calendar,
  FileText,
  Menu,
  X,
  Zap,
  ShieldCheck,
  ShoppingBag,
  Building2,
  ArrowRight,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { totalUniqueLines, lastAddedItemName } = useQuoteCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Determine current active entity and corresponding logo
  const isSolutions = pathname.startsWith("/solutions");
  const isRetail = pathname.startsWith("/retail");
  const isEnergie = pathname.startsWith("/energie") || pathname.startsWith("/ingenierie");
  const isHome = pathname === "/";

  // When at top of Home or Energie (which have dark full-screen video heroes), use white logo
  const isOverDarkHero = (isHome || isEnergie) && !isScrolled;

  let logoSrc = "/logos/logo-mocomel.png";
  let entityTitle = "Groupe MOCOMEL";

  if (isSolutions) {
    logoSrc = "/logos/logo-solutions.png";
    entityTitle = "MOCOMEL Solutions";
  } else if (isRetail) {
    logoSrc = "/logos/logo-retail.png";
    entityTitle = "MOCOMEL Retail";
  } else {
    // Default group / énergie
    logoSrc = isOverDarkHero ? "/logos/logo-mocomel-white.png" : "/logos/logo-mocomel.png";
    entityTitle = isEnergie ? "MOCOMEL Énergie" : "Groupe MOCOMEL";
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-border py-3 shadow-xs text-foreground"
            : isOverDarkHero
            ? "bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4 text-white"
            : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-border/60 py-4 text-foreground"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Dynamic Entity Logo */}
            <div className="flex items-center shrink-0">
              <Link
                href="/"
                className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-sm"
              >
                <div className="relative h-10 w-36 sm:w-44 transition-transform group-hover:scale-[1.02]">
                  <Image
                    src={logoSrc}
                    alt={entityTitle}
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Center: Unified Navigation Structure (Desktop) */}
            <nav className="hidden lg:flex items-center gap-2">
              {/* Entity & Group Segmented Pill */}
              <div
                className={`flex items-center p-1 rounded-full border text-xs font-medium transition-all ${
                  isOverDarkHero
                    ? "bg-white/10 border-white/20 text-white/90"
                    : "bg-slate-100/90 dark:bg-slate-900/90 border-border text-muted-foreground shadow-2xs"
                }`}
              >
                <Link
                  href="/"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isHome
                      ? isOverDarkHero
                        ? "bg-white/25 text-white font-bold shadow-xs"
                        : "bg-white dark:bg-slate-800 text-foreground font-bold shadow-xs"
                      : isOverDarkHero
                      ? "hover:text-white hover:bg-white/10"
                      : "hover:text-foreground hover:bg-white/60 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Le groupe</span>
                </Link>

                <Link
                  href="/energie"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isEnergie
                      ? "bg-[#007A63] text-white font-bold shadow-xs"
                      : isOverDarkHero
                      ? "hover:text-white hover:bg-white/10"
                      : "hover:text-foreground hover:bg-white/60 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Zap className={`w-3.5 h-3.5 ${isEnergie ? "text-emerald-200" : "text-[#007A63]"}`} />
                  <span>Énergie</span>
                </Link>

                <Link
                  href="/solutions"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isSolutions
                      ? "bg-[#22409A] text-white font-bold shadow-xs"
                      : isOverDarkHero
                      ? "hover:text-white hover:bg-white/10"
                      : "hover:text-foreground hover:bg-white/60 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <ShieldCheck className={`w-3.5 h-3.5 ${isSolutions ? "text-blue-200" : "text-[#22409A]"}`} />
                  <span>Solutions</span>
                </Link>

                <Link
                  href="/retail"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isRetail
                      ? "bg-[#9B112B] text-white font-bold shadow-xs"
                      : isOverDarkHero
                      ? "hover:text-white hover:bg-white/10"
                      : "hover:text-foreground hover:bg-white/60 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <ShoppingBag className={`w-3.5 h-3.5 ${isRetail ? "text-rose-200" : "text-[#9B112B]"}`} />
                  <span>Retail</span>
                </Link>
              </div>

              {/* Editorial Links: Réalisations & Contact */}
              <div className="flex items-center space-x-1 pl-1">
                <Link
                  href="/realisations"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    pathname === "/realisations"
                      ? isOverDarkHero
                        ? "text-white bg-white/20 font-bold"
                        : "text-foreground bg-slate-100 dark:bg-slate-800 font-bold"
                      : isOverDarkHero
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  Réalisations
                </Link>

                <Link
                  href="/contact"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    pathname === "/contact"
                      ? isOverDarkHero
                        ? "text-white bg-white/20 font-bold"
                        : "text-foreground bg-slate-100 dark:bg-slate-800 font-bold"
                      : isOverDarkHero
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  Contact
                </Link>
              </div>
            </nav>

            {/* Right: CTA Cluster */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* RDV Avant-Vente Button */}
              <Link
                href="/rendez-vous"
                className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-sm border transition-all ${
                  isOverDarkHero
                    ? "bg-white/10 border-white/30 text-white hover:bg-white/20"
                    : "bg-card border-border text-foreground hover:border-slate-400 hover:bg-slate-50 shadow-2xs"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>RDV Avant-Vente</span>
              </Link>

              {/* Mon Devis (N) Live Badge Button */}
              <Link
                href="/demande-devis"
                className={`relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-sm transition-all shadow-xs ${
                  isRetail
                    ? "bg-[#9B112B] hover:bg-[#7E0E23] text-white"
                    : isSolutions
                    ? "bg-[#22409A] hover:bg-[#1D4ED8] text-white"
                    : "bg-[#007A63] hover:bg-[#005F4D] text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Mon Devis</span>
                <span
                  key={totalUniqueLines}
                  className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold rounded-full transition-transform ${
                    totalUniqueLines > 0
                      ? "bg-white text-slate-900 animate-in zoom-in-50 duration-200"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {totalUniqueLines}
                </span>
              </Link>

              {/* Mobile menu trigger button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-sm border focus:outline-none ${
                  isOverDarkHero
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-border text-foreground hover:bg-slate-100"
                }`}
                aria-label="Ouvrir le menu mobile"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Live Cart Toast notification bubble */}
        {lastAddedItemName && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-slate-950 text-white text-xs rounded shadow-lg border border-slate-800 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Article ajouté au devis : <strong>{lastAddedItemName}</strong></span>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-border px-4 pt-3 pb-6 space-y-4 shadow-xl">
            {/* 4-Entity & Group Switcher for Mobile */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-border text-[11px] font-medium text-center">
              <Link
                href="/"
                className={`py-2 px-1 rounded transition-colors ${
                  isHome ? "bg-white dark:bg-slate-800 text-foreground font-bold shadow-2xs" : "text-muted-foreground"
                }`}
              >
                Le groupe
              </Link>
              <Link
                href="/energie"
                className={`py-2 px-1 rounded transition-colors ${
                  isEnergie ? "bg-[#007A63] text-white font-bold" : "text-muted-foreground"
                }`}
              >
                Énergie
              </Link>
              <Link
                href="/solutions"
                className={`py-2 px-1 rounded transition-colors ${
                  isSolutions ? "bg-[#22409A] text-white font-bold" : "text-muted-foreground"
                }`}
              >
                Solutions
              </Link>
              <Link
                href="/retail"
                className={`py-2 px-1 rounded transition-colors ${
                  isRetail ? "bg-[#9B112B] text-white font-bold" : "text-muted-foreground"
                }`}
              >
                Retail
              </Link>
            </div>

            {/* Nav links (Réalisations, Contact) */}
            <div className="flex flex-col space-y-1 divide-y divide-border/40 pt-1">
              <Link
                href="/realisations"
                className={`pt-2.5 pb-2 text-sm font-medium flex items-center justify-between ${
                  pathname === "/realisations" ? "text-primary font-bold" : "text-foreground"
                }`}
              >
                <span>Réalisations</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link
                href="/contact"
                className={`pt-2.5 pb-2 text-sm font-medium flex items-center justify-between ${
                  pathname === "/contact" ? "text-primary font-bold" : "text-foreground"
                }`}
              >
                <span>Contact</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>

            {/* Mobile CTAs */}
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/rendez-vous"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded bg-slate-100 text-foreground border border-border"
              >
                <Calendar className="w-4 h-4 text-[#007A63]" />
                <span>Prendre un RDV Ingénieur Avant-Vente</span>
              </Link>
              <Link
                href="/demande-devis"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded bg-[#007A63] text-white"
              >
                <FileText className="w-4 h-4" />
                <span>Consulter / Envoyer mon devis ({totalUniqueLines})</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
