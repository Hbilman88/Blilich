"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Building2,
  Video,
  HardHat,
  Cpu,
  Layers,
  ShoppingBag,
  UploadCloud,
  FileText,
  Trash2,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { COMPANY_INFO } from "@/data/company";

interface AttachedFile {
  name: string;
  size: string;
}

const POLES = [
  {
    id: "energie-htbt",
    slug: "energie",
    altSlug: "ingenierie",
    title: "MOCOMEL Énergie · Postes HT/BT",
    desc: "Postes de transformation MT/BT, cellules HTA, réseaux aériens/souterrains et homologation ONEE.",
    icon: HardHat,
    color: "#007A63",
    badge: "Accrédité ONEE",
  },
  {
    id: "industrie-automation",
    slug: "energie",
    altSlug: "ingenierie",
    title: "Électricité Industrielle & Automation",
    desc: "TGBT, armoires d'automatisme, compensation d'énergie réactive, variateurs et maintenance préventive.",
    icon: Cpu,
    color: "#005F4D",
    badge: "Atelier Tit Mellil",
  },
  {
    id: "solutions-tertiaire",
    slug: "solutions",
    title: "Aménagement Tertiaire & Sûreté",
    desc: "Second œuvre technique, câblage VDI baie 19\", contrôle d'accès, vidéosurveillance et SSI.",
    icon: Layers,
    color: "#22409A",
    badge: "Tertiaire & Datacenter",
  },
  {
    id: "retail-fourniture",
    slug: "retail",
    title: "Fourniture & Dimensionnement B2B",
    desc: "Besoins quantitatifs en câbles HT/BT, appareillage modulaire, transformateurs et logistique chantier.",
    icon: ShoppingBag,
    color: "#9B112B",
    badge: "Magasin 7 Tit Mellil",
  },
];

const FORMATS = [
  {
    id: "chantier",
    title: "Visite technique sur site / chantier",
    desc: "Déplacement d'un ingénieur ou conducteur de travaux sur votre site pour relevés et diagnostics.",
    icon: HardHat,
    requiresLocation: true,
  },
  {
    id: "siege",
    title: "Rendez-vous au siège (Tit Mellil)",
    desc: "Réunion dans nos bureaux techniques à Tit Mellil (Grand Casablanca). Parking réservé.",
    icon: Building2,
    requiresLocation: false,
  },
  {
    id: "visio",
    title: "Visioconférence technique (Teams / Meet)",
    desc: "Échange à distance avec partage d'écrans pour analyse de plans unifilaires et CPS.",
    icon: Video,
    requiresLocation: false,
  },
];

const TIME_SLOTS = [
  { id: "matin", label: "Matinée (09h00 – 12h00)" },
  { id: "apres-midi", label: "Après-midi (14h00 – 17h30)" },
];

function RendezVousContent() {
  const searchParams = useSearchParams();
  const poleParam = searchParams.get("pole");

  const [step, setStep] = useState(1);
  const [selectedPole, setSelectedPole] = useState(POLES[0].id);
  const [format, setFormat] = useState(FORMATS[0].id);
  const [villeChantier, setVilleChantier] = useState("");
  const [adresseChantier, setAdresseChantier] = useState("");
  const [date, setDate] = useState("");
  const [creneau, setCreneau] = useState(TIME_SLOTS[0].label);

  const [nom, setNom] = useState("");
  const [societe, setSociete] = useState("");
  const [fonction, setFonction] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<AttachedFile[]>([]);

  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    reference: string;
    timestamp: string;
  } | null>(null);

  // Auto-detect min date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    if (poleParam) {
      const match = POLES.find(
        (p) => p.slug === poleParam || (p as any).altSlug === poleParam || p.id === poleParam
      );
      if (match) setSelectedPole(match.id);
    }
  }, [poleParam]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: AttachedFile[] = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} Mo`,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} fichier(s) technique(s) indexé(s)`);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const canProceedStep1 = Boolean(selectedPole);
  const canProceedStep2 =
    format !== "chantier" || (villeChantier.trim().length >= 2 && adresseChantier.trim().length >= 3);
  const canProceedStep3 = Boolean(date && creneau);
  const canProceedStep4 = Boolean(
    nom.trim().length >= 3 &&
      societe.trim().length >= 2 &&
      telephone.trim().length >= 8 &&
      email.trim().includes("@")
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceedStep4) {
      toast.error("Veuillez renseigner tous les champs obligatoires avec des valeurs valides.");
      return;
    }

    setLoading(true);

    const activePoleObj = POLES.find((p) => p.id === selectedPole);
    const activeFormatObj = FORMATS.find((f) => f.id === format);

    try {
      const res = await fetch("/api/rendez-vous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pole: activePoleObj?.title || selectedPole,
          format: activeFormatObj?.title || format,
          villeChantier: format === "chantier" ? villeChantier : undefined,
          adresseChantier: format === "chantier" ? adresseChantier : undefined,
          date,
          creneau,
          nom,
          societe,
          fonction,
          telephone,
          email,
          description,
          filesInfo: files,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setConfirmation({
          reference: data.reference,
          timestamp: data.timestamp,
        });
        toast.success("Rendez-vous planifié avec succès !", {
          description: `Référence dossier : ${data.reference}`,
        });
      } else {
        toast.error("Impossible d'enregistrer le rendez-vous.", {
          description: data.error || "Veuillez réessayer ou contacter directement le siège.",
        });
      }
    } catch {
      toast.error("Erreur de communication avec le serveur.");
    } finally {
      setLoading(false);
    }
  };

  const selectedPoleData = POLES.find((p) => p.id === selectedPole);
  const selectedFormatData = FORMATS.find((f) => f.id === format);

  // WhatsApp text formatting
  const getWhatsAppLink = () => {
    if (!confirmation) return "#";
    const text = encodeURIComponent(
      `Bonjour Groupe MOCOMEL,\n\nJe viens d'enregistrer une demande de RDV technique sur votre site web.\n\n*Réf Dossier :* ${confirmation.reference}\n*Pôle :* ${selectedPoleData?.title}\n*Date demandée :* ${date} (${creneau})\n*Format :* ${selectedFormatData?.title}${format === "chantier" ? ` (${villeChantier})` : ""}\n*Contact :* ${nom} (${societe}) - ${telephone}\n\nMerci de bien vouloir me confirmer la disponibilité du chef de projet.`
    );
    return `https://wa.me/212665922500?text=${text}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007A63]/10 border border-[#007A63]/20 text-[#007A63] text-xs font-mono font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Permanence Technique B2B · Réponse sous 24h</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-foreground tracking-tight">
          Prise de Rendez-vous Ingénieur Avant-Vente
        </h1>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Assistance technique et études de dimensionnement avec nos ingénieurs chefs de projet HT/BT. 
          Sélectionnez votre besoin, choisissez un créneau et transmettez votre dossier technique (CCTP, plans, CPS).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Trust Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="relative h-44 w-full bg-slate-900">
              <Image
                src="/media/team-philosophy.jpg"
                alt="Bureau d'études ingénierie Groupe MOCOMEL"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  Direction Technique
                </span>
                <p className="text-white text-sm font-heading font-bold">
                  5 Ingénieurs Chefs de Projet HT/BT Dédiés
                </p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#007A63] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Agrément & Homologation ONEE
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Conformité intégrale aux normes marocaines (NM) et internationales (CEI). Études de court-circuit et bilans de puissance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#007A63] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Engagement de Réactivité 24h
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Chaque demande fait l'objet d'un examen par un chef de projet sous 24h ouvrées maximum.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#007A63] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Couverture Nationale
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Interventions et visites sur chantiers à Casablanca, Tanger, Nador, Tétouan, Safi, Rabat et tout le Royaume.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Contact Direct Pôle Énergie
                </p>
                <a
                  href={`tel:${COMPANY_INFO.phoneStandard}`}
                  className="flex items-center gap-2.5 text-sm font-semibold text-foreground hover:text-[#007A63] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#007A63]" />
                  <span>{COMPANY_INFO.phoneStandard}</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phoneRetail}`}
                  className="flex items-center gap-2.5 text-sm font-semibold text-foreground hover:text-[#007A63] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#007A63]" />
                  <span>{COMPANY_INFO.phoneRetail}</span>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Interactive Stepper & Confirmation */}
        <div className="lg:col-span-8">
          {confirmation ? (
            /* Confirmation Card */
            <div className="rounded-xl border border-emerald-500/30 bg-card p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in duration-300">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#007A63] mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                  Demande de Rendez-vous Confirmée
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  Votre demande a bien été enregistrée et transmise à notre bureau d'études. Un ingénieur chef de projet prendra contact avec vous.
                </p>
                <div className="inline-block mt-2 px-4 py-2 rounded-md bg-[#007A63]/10 border border-[#007A63]/30">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground mr-2">Numéro Dossier:</span>
                  <span className="text-base font-mono font-bold text-[#007A63]">{confirmation.reference}</span>
                </div>
              </div>

              {/* Summary Box */}
              <div className="rounded-lg border border-border bg-slate-50 dark:bg-slate-900/60 p-6 space-y-4 text-sm">
                <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider border-b border-border pb-2">
                  Récapitulatif de la Réservation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground block">Pôle technique :</span>
                    <strong className="text-foreground">{selectedPoleData?.title}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Format du rendez-vous :</span>
                    <strong className="text-foreground">{selectedFormatData?.title}</strong>
                    {format === "chantier" && (
                      <span className="text-xs text-muted-foreground block mt-0.5">
                        Lieu: {villeChantier} ({adresseChantier})
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Date & Créneau :</span>
                    <strong className="text-foreground">{date} · {creneau}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Interlocuteur :</span>
                    <strong className="text-foreground">{nom} ({societe})</strong>
                    <span className="text-xs text-muted-foreground block mt-0.5">{telephone} · {email}</span>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground block mb-1">Pièces jointes indexées ({files.length}) :</span>
                    <ul className="text-xs font-mono text-muted-foreground space-y-1">
                      {files.map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#007A63]" />
                          <span>{f.name}</span>
                          <span className="text-slate-400">({f.size})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#25D366] text-slate-950 font-bold text-sm shadow hover:bg-[#20ba59] transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Confirmer aussi sur WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmation(null);
                    setStep(1);
                    setFiles([]);
                    setDescription("");
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg border border-border bg-card text-foreground font-semibold text-sm hover:bg-accent transition-colors"
                >
                  <span>Nouvelle réservation</span>
                </button>
              </div>
            </div>
          ) : (
            /* Stepper Form */
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-8">
              {/* Steps Progress Indicator */}
              <div className="grid grid-cols-4 gap-2 border-b border-border pb-6">
                {[
                  { num: 1, title: "Nature du besoin" },
                  { num: 2, title: "Format" },
                  { num: 3, title: "Date & Heure" },
                  { num: 4, title: "Coordonnées" },
                ].map((s) => {
                  const isActive = step === s.num;
                  const isDone = step > s.num;
                  return (
                    <div key={s.num} className="text-center sm:text-left">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                            isDone
                              ? "bg-[#007A63] text-white"
                              : isActive
                              ? "bg-[#007A63]/20 border-2 border-[#007A63] text-[#007A63]"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                        </span>
                        <span
                          className={`hidden sm:inline text-xs font-medium ${
                            isActive
                              ? "text-foreground font-bold"
                              : isDone
                              ? "text-muted-foreground"
                              : "text-muted-foreground/60"
                          }`}
                        >
                          {s.title}
                        </span>
                      </div>
                      <div
                        className={`mt-2 h-1 rounded-full ${
                          isDone
                            ? "bg-[#007A63]"
                            : isActive
                            ? "bg-[#007A63]/50"
                            : "bg-muted"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* STEP 1: Nature du besoin */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h2 className="text-xl font-heading font-bold text-foreground">
                      Étape 1 : Quel est l'objet de votre consultation ?
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Sélectionnez le domaine d'expertise correspondant à votre projet technique.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {POLES.map((pole) => {
                      const isSelected = selectedPole === pole.id;
                      const Icon = pole.icon;
                      return (
                        <div
                          key={pole.id}
                          onClick={() => setSelectedPole(pole.id)}
                          className={`relative p-5 rounded-lg border text-left cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#007A63] bg-[#007A63]/5 shadow-sm ring-1 ring-[#007A63]"
                              : "border-border hover:border-slate-400 bg-card"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div
                              className="p-2.5 rounded-md"
                              style={{
                                backgroundColor: `${pole.color}15`,
                                color: pole.color,
                              }}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                              {pole.badge}
                            </span>
                          </div>

                          <h3 className="mt-3 font-heading font-bold text-sm text-foreground">
                            {pole.title}
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                            {pole.desc}
                          </p>

                          <div className="mt-4 flex items-center justify-end">
                            <span
                              className={`text-xs font-semibold ${
                                isSelected ? "text-[#007A63]" : "text-muted-foreground"
                              }`}
                            >
                              {isSelected ? "✓ Sélectionné" : "Choisir ce pôle"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={!canProceedStep1}
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#007A63] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#005F4D] transition-colors disabled:opacity-50"
                    >
                      <span>Continuer vers le format</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Format du RDV */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h2 className="text-xl font-heading font-bold text-foreground">
                      Étape 2 : Quel format de rencontre préférez-vous ?
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Définissez si vous souhaitez recevoir un ingénieur sur chantier, venir au siège ou échanger en visioconférence.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {FORMATS.map((fmt) => {
                      const isSelected = format === fmt.id;
                      const Icon = fmt.icon;
                      return (
                        <div
                          key={fmt.id}
                          onClick={() => setFormat(fmt.id)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#007A63] bg-[#007A63]/5 ring-1 ring-[#007A63]"
                              : "border-border hover:border-slate-400 bg-card"
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="p-2 rounded bg-muted text-[#007A63] mt-0.5">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-heading font-bold text-sm text-foreground">
                                {fmt.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {fmt.desc}
                              </p>
                            </div>
                            <input
                              type="radio"
                              name="format"
                              checked={isSelected}
                              onChange={() => setFormat(fmt.id)}
                              className="mt-1 text-[#007A63] focus:ring-[#007A63]"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {format === "chantier" && (
                    <div className="p-5 rounded-lg border border-[#007A63]/30 bg-[#007A63]/5 space-y-4 animate-in fade-in">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#007A63]" />
                        <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                          Coordonnées d'intervention sur site
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1">
                            Ville / Région du chantier *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="ex: Casablanca, Mohammédia, Tanger, Nador..."
                            value={villeChantier}
                            onChange={(e) => setVilleChantier(e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#007A63]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1">
                            Adresse exacte / Point de repère *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="ex: Zone Industrielle Sapino, Lot 14..."
                            value={adresseChantier}
                            onChange={(e) => setAdresseChantier(e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#007A63]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {format === "siege" && (
                    <div className="p-4 rounded-lg border border-border bg-muted/40 text-xs text-muted-foreground flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-[#007A63] shrink-0" />
                      <span>
                        Rendez-vous à notre siège social : <strong>Route Principale 107, Tit Mellil, Grand Casablanca</strong>. Salle technique équipée et stationnement réservé aux visiteurs.
                      </span>
                    </div>
                  )}

                  {format === "visio" && (
                    <div className="p-4 rounded-lg border border-border bg-muted/40 text-xs text-muted-foreground flex items-center gap-3">
                      <Video className="w-5 h-5 text-[#007A63] shrink-0" />
                      <span>
                        Un lien de visioconférence (Microsoft Teams / Google Meet) vous sera communiqué par e-mail dès validation de votre créneau.
                      </span>
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Retour</span>
                    </button>
                    <button
                      type="button"
                      disabled={!canProceedStep2}
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#007A63] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#005F4D] transition-colors disabled:opacity-50"
                    >
                      <span>Continuer vers le créneau</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Date & Créneau */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h2 className="text-xl font-heading font-bold text-foreground">
                      Étape 3 : Choisissez votre date & créneau horaire
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Nos équipes techniques interviennent du lundi au samedi matin. Les créneaux du dimanche sont fermés.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Date souhaitée *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          min={minDateStr}
                          value={date}
                          onChange={(e) => {
                            const val = e.target.value;
                            const d = new Date(val);
                            if (d.getDay() === 0) {
                              toast.warning("Nos bureaux et ateliers sont fermés le dimanche. Veuillez sélectionner un jour du lundi au samedi.");
                              return;
                            }
                            setDate(val);
                          }}
                          className="w-full text-xs px-3 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#007A63]"
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1.5">
                        Veuillez prévoir un préavis minimum de 24 heures pour la mobilisation de nos ingénieurs.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Plage horaire souhaitée *
                      </label>
                      <div className="space-y-2">
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = creneau === slot.label;
                          return (
                            <div
                              key={slot.id}
                              onClick={() => setCreneau(slot.label)}
                              className={`p-3 rounded-lg border cursor-pointer text-xs font-semibold flex items-center justify-between transition-all ${
                                isSelected
                                  ? "border-[#007A63] bg-[#007A63]/10 text-[#007A63] ring-1 ring-[#007A63]"
                                  : "border-border text-foreground hover:border-slate-400 bg-card"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#007A63]" />
                                <span>{slot.label}</span>
                              </div>
                              <input
                                type="radio"
                                name="creneau"
                                checked={isSelected}
                                onChange={() => setCreneau(slot.label)}
                                className="text-[#007A63] focus:ring-[#007A63]"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Retour</span>
                    </button>
                    <button
                      type="button"
                      disabled={!canProceedStep3}
                      onClick={() => setStep(4)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#007A63] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#005F4D] transition-colors disabled:opacity-50"
                    >
                      <span>Continuer vers les coordonnées</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Coordonnées & Dossier Technique */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h2 className="text-xl font-heading font-bold text-foreground">
                      Étape 4 : Coordonnées de l'entreprise & Dossier technique
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Renseignez vos coordonnées directes et joignez vos schémas, bordereaux ou plans si disponibles.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Nom & Prénom du responsable *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ex: M. Mehdi Benjelloun"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#007A63]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Raison sociale / Société *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ex: SOMADIR, ENGIE Maroc, ONEE..."
                        value={societe}
                        onChange={(e) => setSociete(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#007A63]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Fonction / Rôle
                      </label>
                      <input
                        type="text"
                        placeholder="ex: Directeur Technique, Chef de Projet, Acheteur..."
                        value={fonction}
                        onChange={(e) => setFonction(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#007A63]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Téléphone direct (Maroc +212) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="ex: 06 61 XX XX XX"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#007A63]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        E-mail professionnel *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ex: contact@entreprise.ma"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#007A63]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Description synthétique du besoin / caractéristiques techniques
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Précisez la puissance estimée (ex: Poste 630 kVA), les tensions (22kV / 400V), ou la nature des travaux souhaités..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full text-xs p-3 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#007A63]"
                      />
                    </div>
                  </div>

                  {/* Drag-and-drop Attachment Zone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-foreground">
                      Pièces jointes techniques (Plans DWG, CCTP, CPS, Schémas unifilaires)
                    </label>
                    <label className="border-2 border-dashed border-border hover:border-[#007A63] rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-900/30">
                      <UploadCloud className="w-8 h-8 text-[#007A63] mb-2" />
                      <span className="text-xs font-semibold text-foreground">
                        Cliquez pour sélectionner vos fichiers techniques
                      </span>
                      <span className="text-[11px] text-muted-foreground mt-0.5">
                        Formats acceptés : PDF, DWG, DXF, XLSX, DOCX (Max 25 Mo par fichier)
                      </span>
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>

                    {files.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        {files.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-3 py-2 rounded bg-muted/50 border border-border text-xs"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="w-4 h-4 text-[#007A63] shrink-0" />
                              <span className="font-mono truncate">{file.name}</span>
                              <span className="text-muted-foreground text-[10px]">({file.size})</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                              title="Retirer ce fichier"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-border">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Retour</span>
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !canProceedStep4}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#007A63] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#005F4D] transition-colors disabled:opacity-50 shadow-md"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Validation en cours...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirmer la demande de RDV</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RendezVousPage() {
  return (
    <main className="w-full pt-28 pb-20 bg-slate-50/50 dark:bg-slate-950 min-h-screen">
      <Suspense
        fallback={
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <div className="w-8 h-8 border-2 border-[#007A63] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-muted-foreground font-mono">Chargement du portail de réservation technique...</p>
          </div>
        }
      >
        <RendezVousContent />
      </Suspense>
    </main>
  );
}
