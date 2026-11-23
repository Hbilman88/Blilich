import React from "react";
import Link from "next/link";
import { COMPANY_INFO } from "@/data/company";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Building2,
  Wrench,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Contact & Implantations | Groupe MOCOMEL Casablanca",
  description:
    "Coordonnées officielles, téléphones, adresses du siège, du magasin Retail et de l'atelier de câblage du Groupe MOCOMEL à Casablanca.",
};

export default function ContactPage() {
  return (
    <main className="w-full pt-24 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#007A63] font-bold">
            Implantations & Contacts Directs
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-foreground">
            Contactez les Équipes du Groupe MOCOMEL
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Trois sites opérationnels complémentaires à Casablanca : notre siège social avec bureau d'études, notre comptoir de vente Retail et notre atelier de fabrication et de câblage d'armoires industrielles.
          </p>
        </div>

        {/* Quick Contact Action Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <a
            href={`tel:${COMPANY_INFO.phoneStandard}`}
            className="p-5 rounded-md border border-border bg-card hover:border-[#007A63] hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#007A63] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono">Standard / Pôle Énergie</p>
              <p className="text-base font-bold font-mono text-foreground group-hover:text-[#007A63] transition-colors">
                {COMPANY_INFO.phoneStandard}
              </p>
            </div>
          </a>

          <a
            href={`tel:${COMPANY_INFO.phoneRetail}`}
            className="p-5 rounded-md border border-border bg-card hover:border-[#9B112B] hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/40 text-[#9B112B] flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono">Service Commercial Retail</p>
              <p className="text-base font-bold font-mono text-foreground group-hover:text-[#9B112B] transition-colors">
                {COMPANY_INFO.phoneRetail}
              </p>
            </div>
          </a>

          <a
            href="https://wa.me/212665922500"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-md border border-border bg-card hover:border-emerald-500 hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono">WhatsApp Entreprise</p>
              <p className="text-base font-bold font-mono text-foreground group-hover:text-emerald-600 transition-colors">
                +212 665 922 500
              </p>
            </div>
          </a>
        </div>

        {/* 3 Locations Detailed Cards */}
        <div className="mt-14 space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Nos 3 Implantations à Casablanca
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Site 1: Siège Social */}
            <div className="p-6 rounded-md border border-border bg-card space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-[#007A63]/10 text-[#007A63] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#007A63] font-bold">Site Principal</span>
                  <h3 className="text-lg font-heading font-bold text-foreground mt-0.5">
                    Siège Social & Bureau d'Études
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Direction générale, calculs de réseaux HTA/BT, gestion contractuelle et études d'exécution.
                  </p>
                </div>
                <div className="space-y-2 text-xs font-mono pt-3 border-t border-border">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#007A63] shrink-0 mt-0.5" />
                    <span>13, Immeuble 200, Lotissement Essalam, Tit Mellil, Casablanca</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#007A63] shrink-0" />
                    <a href="tel:+212665922500" className="hover:underline font-bold">+212 665 922 500</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#007A63] shrink-0" />
                    <span>Lun – Ven : 08h30 – 18h30</span>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href="/rendez-vous"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#007A63] text-white text-xs font-semibold hover:bg-[#005F4D] transition-colors"
                >
                  <span>Prendre RDV au Siège</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Site 2: Magasin Retail */}
            <div className="p-6 rounded-md border border-border bg-card space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-[#9B112B]/10 text-[#9B112B] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#9B112B] font-bold">Comptoir B2B</span>
                  <h3 className="text-lg font-heading font-bold text-foreground mt-0.5">
                    Magasin MOCOMEL Retail
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Comptoir d'enlèvement, vente directe de câbles, matériel de poste et appareillage modulaire.
                  </p>
                </div>
                <div className="space-y-2 text-xs font-mono pt-3 border-t border-border">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#9B112B] shrink-0 mt-0.5" />
                    <span>Magasin 7, Immeuble 200, Lotissement Essalam, Tit Mellil, Casablanca</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#9B112B] shrink-0" />
                    <a href="tel:+212777817534" className="hover:underline font-bold">+212 777 817 534</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#9B112B] shrink-0" />
                    <span>Lun – Ven : 08h00 – 19h00 | Sam : 08h30 – 13h00</span>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href="/retail"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#9B112B] text-white text-xs font-semibold hover:bg-[#7E0E23] transition-colors"
                >
                  <span>Commander sur Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Site 3: Atelier Câblage */}
            <div className="p-6 rounded-md border border-border bg-card space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 text-foreground flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-muted-foreground font-bold">Site Industriel</span>
                  <h3 className="text-lg font-heading font-bold text-foreground mt-0.5">
                    Atelier de Fabrication & Câblage
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Montage des armoires TGBT, façonnage des jeux de barres cuivre et tests diélectriques.
                  </p>
                </div>
                <div className="space-y-2 text-xs font-mono pt-3 border-t border-border">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                    <span>434, Résidence Basma Essalam 2, Anassi, Sidi Moumen, Casablanca</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-foreground shrink-0" />
                    <a href="tel:+212665922500" className="hover:underline font-bold">+212 665 922 500</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-foreground shrink-0" />
                    <span>Lun – Ven : 08h00 – 17h30 (Accès sur autorisation)</span>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Demande%20Visite%20Atelier%20MOCOMEL`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-slate-900 text-white text-xs font-semibold hover:bg-black transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Demander une Visite Atelier</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Casablanca Map Section */}
        <div className="mt-16 rounded-md border border-border bg-card p-6 overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono text-[#007A63] font-bold uppercase">Zone Géographique</span>
              <h3 className="text-xl font-heading font-bold text-foreground mt-0.5">
                Couverture Grand Casablanca & Royaume du Maroc
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Tit Mellil & Sidi Moumen (Casablanca)</span>
            </div>
          </div>

          <div className="relative h-80 sm:h-96 w-full rounded border border-border overflow-hidden bg-slate-100 dark:bg-slate-900">
            {/* Clean OpenStreetMap Casablanca Frame */}
            <iframe
              title="Carte Implantations MOCOMEL Casablanca"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-7.5300%2C33.5400%2C-7.4600%2C33.6000&amp;layer=mapnik&amp;marker=33.5574%2C-7.4812"
              className="w-full h-full border-0 filter contrast-[1.05]"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
