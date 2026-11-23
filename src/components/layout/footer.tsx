import React from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_INFO, ENTITIES } from "@/data/company";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B1120] text-slate-200 border-t border-white/10 relative overflow-hidden">
      {/* Subtle Swiss grid backdrop */}
      <div className="absolute inset-0 swiss-grid-dark opacity-40 pointer-events-none" />

      {/* Top Banner: Accreditation & Motto */}
      <div className="border-b border-white/10 py-6 relative z-10 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <p className="text-xs sm:text-sm font-mono tracking-wide text-emerald-400 uppercase">
                {COMPANY_INFO.accreditation}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs sm:text-sm text-slate-400 italic">
                {COMPANY_INFO.hrMotto}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative h-12 w-48">
              <Image
                src="/logos/logo-mocomel-white.png"
                alt="Groupe MOCOMEL"
                fill
                sizes="192px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Groupe d'ingénierie électrique, d'aménagements techniques et de distribution de matériel haute et basse tension fondé à Casablanca.
            </p>
            <div className="p-3.5 rounded border border-emerald-500/20 bg-emerald-950/30 max-w-sm">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accréditation ONEE</span>
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Habilité pour les travaux sous tension et hors tension sur les réseaux de transport et distribution du Royaume du Maroc.
              </p>
            </div>
            <div className="space-y-1 text-xs font-mono text-slate-400">
              <p>Standard : <a href={`tel:${COMPANY_INFO.phoneStandard}`} className="text-slate-200 hover:text-emerald-400">{COMPANY_INFO.phoneStandard}</a></p>
              <p>Retail / Magasin : <a href={`tel:${COMPANY_INFO.phoneRetail}`} className="text-slate-200 hover:text-emerald-400">{COMPANY_INFO.phoneRetail}</a></p>
              <p>Courriel : <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-200 hover:text-emerald-400">{COMPANY_INFO.email}</a></p>
            </div>
          </div>

          {/* Column 2: 3 Entities Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-2">
              Architecture des 3 Pôles
            </h4>
            <ul className="space-y-3.5">
              {ENTITIES.map((entity) => (
                <li key={entity.id}>
                  <Link
                    href={entity.href}
                    className="group block p-2 rounded hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  >
                    <div className="flex items-center justify-between text-sm font-semibold text-white group-hover:text-emerald-400">
                      <span>{entity.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {entity.title}
                    </p>
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-white/5 flex flex-col gap-2 text-xs">
                <Link href="/realisations" className="text-slate-300 hover:text-white flex items-center justify-between py-1">
                  <span>Études de Cas & Réalisations</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
                <Link href="/rendez-vous" className="text-slate-300 hover:text-white flex items-center justify-between py-1">
                  <span>Prendre RDV Ingénieur Avant-Vente</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
                <Link href="/demande-devis" className="text-slate-300 hover:text-white flex items-center justify-between py-1">
                  <span>Formulaire de Devis RFQ</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The 3 Casablanca Locations (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-2">
              Implantations à Casablanca
            </h4>
            <div className="space-y-3">
              {COMPANY_INFO.locations.map((loc) => (
                <div
                  key={loc.id}
                  className="p-3 rounded bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-white uppercase tracking-wide">
                        {loc.title}
                      </p>
                      <p className="text-xs text-slate-300">
                        {loc.address}, {loc.city}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {loc.role} · Tél: {loc.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal Identifiers Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 text-xs text-slate-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left space-y-1">
              <p className="font-semibold text-slate-300">
                © {new Date().getFullYear()} {COMPANY_INFO.name}. Tous droits réservés.
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {COMPANY_INFO.slogan} — Casablanca, Royaume du Maroc.
              </p>
            </div>

            {/* Official Legal IDs */}
            <div className="font-mono text-[11px] text-slate-400 bg-black/40 px-3 py-1.5 rounded border border-white/10 text-center flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span>RC : <strong className="text-slate-200">{COMPANY_INFO.legal.rc}</strong></span>
              <span>·</span>
              <span>IF : <strong className="text-slate-200">{COMPANY_INFO.legal.if}</strong></span>
              <span>·</span>
              <span>TP : <strong className="text-slate-200">{COMPANY_INFO.legal.tp}</strong></span>
              <span>·</span>
              <span>CNSS : <strong className="text-slate-200">{COMPANY_INFO.legal.cnss}</strong></span>
              <span>·</span>
              <span>ICE : <strong className="text-slate-200">{COMPANY_INFO.legal.ice}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
