"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Send,
  MessageSquare,
  Building2,
  Truck,
  MapPin,
  CheckCircle2,
  UploadCloud,
  Layers,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { useQuoteCart, QuoteCartItem } from "@/context/quote-cart-context";
import { RETAIL_CATEGORIES, RETAIL_PRODUCTS } from "@/data/retail-catalog";
import { COMPANY_INFO } from "@/data/company";
import { generateQuotePDF } from "@/lib/generate-quote-pdf";

interface LocalRowPriceType {
  [itemId: string]: "unit" | "total";
}

interface AttachedBOQ {
  name: string;
  size: string;
}

const UNITS = ["Unité", "Mètre", "Lot", "Forfait", "Bobine", "Ens"];

export default function DemandeDevisPage() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    updateTargetUnitPrice,
    updateNotes,
    updateItem,
    clearCart,
    totalUniqueLines,
    totalItemsCount,
  } = useQuoteCart();

  // Price type toggles per row: "unit" vs "total"
  const [rowPriceTypes, setRowPriceTypes] = useState<LocalRowPriceType>({});

  // Logistics state
  const [deliveryMode, setDeliveryMode] = useState<"magasin" | "chantier">("magasin");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [semiTrailerAccess, setSemiTrailerAccess] = useState(true);

  // Buyer contact details
  const [nom, setNom] = useState("");
  const [societe, setSociete] = useState("");
  const [ice, setIce] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [remarques, setRemarques] = useState("");

  // BOQ File
  const [boqFile, setBoqFile] = useState<AttachedBOQ | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    reference: string;
    timestamp: string;
  } | null>(null);

  // Calculate live dynamic budget HT based on unit vs total toggle
  const computedTotalBudgetHT = useMemo(() => {
    return items.reduce((acc, item) => {
      const price = item.targetUnitPrice || 0;
      if (price <= 0) return acc;
      const type = rowPriceTypes[item.id] || "unit";
      if (type === "total") {
        return acc + price;
      }
      return acc + price * item.quantity;
    }, 0);
  }, [items, rowPriceTypes]);

  // Handle adding a free/custom article row
  const handleAddFreeItem = () => {
    const freeId = `libre-${Date.now()}`;
    addItem({
      id: freeId,
      name: "Nouvel article sur mesure",
      category: "autre",
      categoryLabel: "Prestation / Autre",
      unit: "Unité",
    });
    toast.success("Ligne d'article ajoutée au bordereau");
  };

  // Handle quick catalog item injection
  const handleQuickCatalogAdd = (productId: string) => {
    if (!productId) return;
    const product = RETAIL_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    addItem({
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      category: product.category,
      categoryLabel: product.categoryLabel,
      unit: product.unit,
      image: product.image,
    });
    toast.success(`Ajouté : ${product.name}`);
  };

  // Delete row with Sonner undo option
  const handleDeleteRow = (item: QuoteCartItem) => {
    removeItem(item.id);
    toast("Article retiré du bordereau", {
      description: item.name,
      action: {
        label: "Annuler",
        onClick: () => {
          addItem(
            {
              id: item.id,
              name: item.name,
              category: item.category,
              categoryLabel: item.categoryLabel,
              unit: item.unit,
              image: item.image,
            },
            item.quantity,
            item.targetUnitPrice,
            item.notes
          );
        },
      },
    });
  };

  // Handle BOQ file upload
  const handleBOQUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setBoqFile({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} Mo`,
      });
      toast.success("Bordereau technique indexé", {
        description: `${f.name} (${(f.size / (1024 * 1024)).toFixed(2)} Mo)`,
      });
    }
  };

  // Trigger client-side PDF export
  const handleExportPDF = () => {
    if (items.length === 0 && !boqFile) {
      toast.error("Veuillez ajouter au moins une référence ou joindre un bordereau avant l'export.");
      return;
    }

    const currentRef =
      submissionSuccess?.reference ||
      `DEV-MOC-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const dateStr = new Date().toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    generateQuotePDF({
      reference: currentRef,
      date: dateStr,
      clientInfo: {
        nom: nom || "Acheteur Professionnel",
        societe: societe || "Société B2B",
        ice: ice || undefined,
        telephone: telephone || "Non renseigné",
        email: email || "Non renseigné",
        remarques: remarques || undefined,
      },
      deliveryMode,
      deliveryCity: deliveryMode === "chantier" ? deliveryCity : undefined,
      deliveryAddress: deliveryMode === "chantier" ? deliveryAddress : undefined,
      semiTrailerAccess: deliveryMode === "chantier" ? semiTrailerAccess : undefined,
      items: items.map((it) => ({
        category: it.categoryLabel || "Matériel Électrique",
        designation: it.name,
        quantity: it.quantity,
        unit: it.unit,
        targetPrice: it.targetUnitPrice,
        priceType: rowPriceTypes[it.id] || "unit",
        notes: it.notes,
      })),
      estimatedBudgetHT: computedTotalBudgetHT,
      boqFileName: boqFile?.name,
    });

    toast.success("Bordereau PDF généré avec succès !");
  };

  // Handle form submission to /api/devis
  const handleSubmitDevis = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0 && !boqFile) {
      toast.error("Veuillez ajouter au moins un article ou joindre un bordereau quantitatif.");
      return;
    }

    if (!nom.trim() || !telephone.trim() || !email.trim()) {
      toast.error("Veuillez renseigner vos coordonnées (Nom, Téléphone, E-mail).");
      return;
    }

    if (deliveryMode === "chantier" && !deliveryCity.trim()) {
      toast.error("Veuillez spécifier la ville ou la région du chantier.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        items: items.map((it) => ({
          id: it.id,
          category: it.categoryLabel,
          designation: it.name,
          quantity: it.quantity,
          unit: it.unit,
          targetPrice: it.targetUnitPrice,
          priceType: rowPriceTypes[it.id] || "unit",
          notes: it.notes,
        })),
        deliveryMode,
        deliveryCity: deliveryMode === "chantier" ? deliveryCity : undefined,
        deliveryAddress: deliveryMode === "chantier" ? deliveryAddress : undefined,
        semiTrailerAccess: deliveryMode === "chantier" ? semiTrailerAccess : undefined,
        clientInfo: {
          nom,
          societe,
          ice,
          telephone,
          email,
          remarques,
        },
        estimatedBudgetHT: computedTotalBudgetHT,
        boqFileName: boqFile?.name,
      };

      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionSuccess({
          reference: data.reference,
          timestamp: data.timestamp,
        });
        toast.success("Demande de devis transmise avec succès !", {
          description: `Numéro de dossier : ${data.reference}`,
        });
      } else {
        toast.error("Impossible de transmettre la demande de devis.", {
          description: data.error || "Veuillez réessayer.",
        });
      }
    } catch {
      toast.error("Erreur de connexion au serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp formatted string generator
  const getWhatsAppRFQLink = () => {
    const ref = submissionSuccess?.reference || "DEV-MOC-2026-EXPRESS";
    const modeLabel =
      deliveryMode === "magasin"
        ? "Enlèvement Magasin 7 (Tit Mellil)"
        : `Livraison Chantier (${deliveryCity || "Maroc"})`;

    const itemsSummary = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.name} | Qté: ${it.quantity} ${it.unit}${
            it.targetUnitPrice ? ` (Cible: ${it.targetUnitPrice} MAD)` : ""
          }`
      )
      .join("\n");

    const message = `Bonjour Groupe MOCOMEL,\n\nJe souhaite obtenir un chiffrage officiel pour le bordereau suivant :\n\n*Réf Consultation :* ${ref}\n*Client :* ${nom || "Non renseigné"} (${societe || "Entreprise"})\n*Contact :* ${telephone} · ${email}\n*Mode :* ${modeLabel}\n\n*Articles demandés (${items.length}) :*\n${itemsSummary || "Voir bordereau joint"}\n\n*Budget Cible Estimé :* ${
      computedTotalBudgetHT > 0
        ? `${computedTotalBudgetHT.toLocaleString("fr-FR")} MAD HT`
        : "À chiffrer"
    }\n\nMerci de nous transmettre votre offre de prix sous 24h.`;

    return `https://wa.me/212665922500?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="w-full pt-28 pb-24 bg-slate-50/50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
            <Link href="/" className="hover:text-foreground">Accueil</Link>
            <span>/</span>
            <Link href="/retail" className="hover:text-foreground">Catalogue Retail</Link>
            <span>/</span>
            <span className="text-[#9B112B] font-bold">Demande de Cotation B2B</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B112B]/10 border border-[#9B112B]/20 text-[#9B112B] text-xs font-mono font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Comptoir B2B · Chiffrage sous 24h</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight">
                Bordereau de Demande de Devis (RFQ)
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Configurez vos lignes de câbles, appareillages ou postes de transformation. 
                Importez votre CCTP ou bordereau quantitatif et exportez en PDF officiel.
              </p>
            </div>

            {/* Quick Actions Header */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleExportPDF}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-xs font-bold hover:bg-accent transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 text-[#007A63]" />
                <span>Exporter PDF Officiel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Screen if submitted */}
        {submissionSuccess && (
          <div className="mb-10 rounded-xl border border-emerald-500/40 bg-card p-6 sm:p-8 shadow-lg animate-in fade-in space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#007A63] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-heading font-bold text-foreground">
                  Demande de Chiffrage Enregistrée !
                </h3>
                <p className="text-xs text-muted-foreground">
                  Notre équipe commerciale étudie vos spécifications techniques et vous transmettra une offre formelle sous 24h ouvrées.
                </p>
              </div>
              <div className="sm:ml-auto px-4 py-2 rounded-lg bg-[#007A63]/10 border border-[#007A63]/30 text-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                  Numéro de Dossier
                </span>
                <span className="text-sm font-mono font-bold text-[#007A63]">
                  {submissionSuccess.reference}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex flex-wrap items-center justify-center sm:justify-end gap-3">
              <a
                href={getWhatsAppRFQLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-slate-950 text-xs font-bold hover:bg-[#20ba59] transition-all shadow"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Notifier aussi par WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={handleExportPDF}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground text-xs font-semibold hover:bg-accent transition-colors"
              >
                <Download className="w-4 h-4 text-[#007A63]" />
                <span>Télécharger le Récapitulatif PDF</span>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitDevis} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* MAIN COLUMN (8 cols): Line-Items Table Workspace */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              {/* Action Toolbar */}
              <div className="p-4 sm:p-5 border-b border-border bg-slate-50/70 dark:bg-slate-900/40 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                    Articles du Bordereau
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {totalUniqueLines} ligne(s)
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Quick catalog add dropdown */}
                  <select
                    aria-label="Ajouter depuis le catalogue Retail"
                    defaultValue=""
                    onChange={(e) => {
                      handleQuickCatalogAdd(e.target.value);
                      e.target.value = "";
                    }}
                    className="text-xs px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                  >
                    <option value="" disabled>
                      + Insérer depuis le Catalogue...
                    </option>
                    {RETAIL_PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.categoryLabel} · {prod.name}
                      </option>
                    ))}
                  </select>

                  {/* Free article button */}
                  <button
                    type="button"
                    onClick={handleAddFreeItem}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#9B112B] text-white text-xs font-bold hover:bg-[#7E0E23] transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter Article Libre</span>
                  </button>

                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Voulez-vous réinitialiser toutes les lignes de devis ?")) {
                          clearCart();
                          toast.info("Bordereau vidé");
                        }
                      }}
                      className="p-2 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-muted transition-colors"
                      title="Vider tout le bordereau"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Items List Table */}
              {items.length === 0 ? (
                <div className="p-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto text-muted-foreground">
                    <ShoppingBag className="w-6 h-6 stroke-1" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-foreground">
                      Aucun article dans votre bordereau pour le moment
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-md mx-auto">
                      Ajoutez des références libres, sélectionnez des articles du catalogue ci-dessus ou importez votre fichier CCTP/Bordereau quantitatif.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleAddFreeItem}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#9B112B] text-white text-xs font-bold hover:bg-[#7E0E23] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter une ligne libre</span>
                    </button>
                    <Link
                      href="/retail"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-accent transition-colors"
                    >
                      <span>Parcourir le catalogue Retail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {items.map((item, index) => {
                    const priceType = rowPriceTypes[item.id] || "unit";
                    const lineBudget =
                      (item.targetUnitPrice || 0) * (priceType === "total" ? 1 : item.quantity);

                    return (
                      <div
                        key={item.id}
                        className="p-4 sm:p-5 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors space-y-3"
                      >
                        {/* Top row: Number, Category Select, Designation Input, Delete Button */}
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded bg-muted text-muted-foreground text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-1">
                            {index + 1}
                          </span>

                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-3">
                            {/* Category Select (4 cols on sm) */}
                            <div className="sm:col-span-4">
                              <select
                                aria-label="Catégorie du produit"
                                value={item.category}
                                onChange={(e) => {
                                  const catId = e.target.value;
                                  const catObj = RETAIL_CATEGORIES.find((c) => c.id === catId);
                                  updateItem(item.id, {
                                    category: catId,
                                    categoryLabel: catObj?.label || "Prestation / Autre",
                                  });
                                }}
                                className="w-full text-xs px-2.5 py-1.5 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                              >
                                {RETAIL_CATEGORIES.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.label}
                                  </option>
                                ))}
                                <option value="autre">Prestation / Autre</option>
                              </select>
                            </div>

                            {/* Designation Input (8 cols on sm) */}
                            <div className="sm:col-span-8">
                              <input
                                aria-label="Désignation ou référence de l'article"
                                type="text"
                                placeholder="Désignation de l'article ou référence constructeur..."
                                value={item.name}
                                onChange={(e) => updateItem(item.id, { name: e.target.value })}
                                className="w-full text-xs font-semibold px-2.5 py-1.5 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteRow(item)}
                            className="text-muted-foreground hover:text-red-500 p-1.5 rounded hover:bg-muted transition-colors shrink-0"
                            title="Supprimer cet article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Bottom row: Quantité & Unité, Budget Cible (MAD HT) with Toggle, Notes */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pl-9">
                          {/* Quantité & Unité (4 cols) */}
                          <div className="sm:col-span-4 flex items-center gap-1.5">
                            <div className="flex-1">
                              <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-0.5">
                                Quantité
                              </label>
                              <input
                                aria-label="Quantité"
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
                                }
                                className="w-full text-xs font-mono font-bold px-2.5 py-1.5 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                              />
                            </div>

                            <div className="w-24">
                              <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-0.5">
                                Unité
                              </label>
                              <select
                                aria-label="Unité de mesure"
                                value={item.unit}
                                onChange={(e) => updateItem(item.id, { unit: e.target.value })}
                                className="w-full text-xs px-2 py-1.5 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                              >
                                {UNITS.map((u) => (
                                  <option key={u} value={u}>
                                    {u}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Budget Cible + Toggle (4 cols) */}
                          <div className="sm:col-span-4">
                            <div className="flex items-center justify-between mb-0.5">
                              <label className="text-[10px] font-mono uppercase text-muted-foreground">
                                Budget Cible (MAD HT)
                              </label>
                              <div className="flex items-center text-[10px] font-mono">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setRowPriceTypes((prev) => ({ ...prev, [item.id]: "unit" }))
                                  }
                                  className={`px-1 rounded-l ${
                                    priceType === "unit"
                                      ? "bg-[#007A63] text-white font-bold"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  /Unité
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setRowPriceTypes((prev) => ({ ...prev, [item.id]: "total" }))
                                  }
                                  className={`px-1 rounded-r ${
                                    priceType === "total"
                                      ? "bg-[#007A63] text-white font-bold"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  Total
                                </button>
                              </div>
                            </div>
                            <div className="relative">
                              <input
                                aria-label="Budget cible en dirhams marocains hors taxes"
                                type="number"
                                min="0"
                                placeholder="Optionnel"
                                value={item.targetUnitPrice || ""}
                                onChange={(e) => {
                                  const val = e.target.value ? parseFloat(e.target.value) : undefined;
                                  updateTargetUnitPrice(item.id, val);
                                }}
                                className="w-full text-xs font-mono px-2.5 py-1.5 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#007A63]"
                              />
                            </div>
                          </div>

                          {/* Spécifications / Notes (4 cols) */}
                          <div className="sm:col-span-4">
                            <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-0.5">
                              Spécifications / Marque
                            </label>
                            <input
                              aria-label="Spécifications techniques ou marque souhaitée"
                              type="text"
                              placeholder="ex: C1000, Schneider, 3x185..."
                              value={item.notes || ""}
                              onChange={(e) => updateNotes(item.id, e.target.value)}
                              className="w-full text-xs px-2.5 py-1.5 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                            />
                          </div>
                        </div>

                        {/* Calculated Subtotal Line */}
                        {lineBudget > 0 && (
                          <div className="pl-9 flex items-center justify-end text-[11px] font-mono text-muted-foreground">
                            <span>Sous-total estimé ligne : </span>
                            <span className="ml-1.5 font-bold text-[#007A63]">
                              {lineBudget.toLocaleString("fr-FR")} MAD HT
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* BOQ File Upload Zone */}
            <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-heading font-bold text-foreground">
                    Import de Bordereau Quantitatif / CCTP (Optionnel)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Vous avez déjà un fichier Excel, CSV ou PDF émis par votre bureau d'études ? Joignez-le directement ici.
                  </p>
                </div>
              </div>

              {boqFile ? (
                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/40 text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-4 h-4 text-[#007A63] shrink-0" />
                    <span className="font-mono font-semibold truncate">{boqFile.name}</span>
                    <span className="text-muted-foreground text-[10px]">({boqFile.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBoqFile(null)}
                    className="text-muted-foreground hover:text-red-500 p-1 transition-colors"
                    title="Retirer ce bordereau"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-border hover:border-[#9B112B] rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-900/30">
                  <UploadCloud className="w-6 h-6 text-[#9B112B] mb-1.5" />
                  <span className="text-xs font-semibold text-foreground">
                    Cliquez pour attacher votre bordereau (.xlsx, .csv, .pdf)
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">
                    Taille maximale acceptée : 25 Mo
                  </span>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv,.pdf,.dwg"
                    className="hidden"
                    onChange={handleBOQUpload}
                  />
                </label>
              )}
            </div>
          </div>

          {/* SIDEBAR COLUMN (4 cols): Sticky Summary, Logistics & Client Info */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Financial & Volume Summary Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="border-b border-border pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">
                  Synthèse de la Consultation
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xs text-muted-foreground">Budget Cible Global :</span>
                  <span className="text-xl font-heading font-extrabold text-[#007A63]">
                    {computedTotalBudgetHT > 0
                      ? `${computedTotalBudgetHT.toLocaleString("fr-FR")} MAD HT`
                      : "Sur Consultation"}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Tarifs indicatifs nets HT. Offre officielle chiffrée selon cours des métaux.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-border/50">
                  <span className="text-muted-foreground">Références distinctes :</span>
                  <strong className="font-mono text-foreground">{totalUniqueLines}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-border/50">
                  <span className="text-muted-foreground">Volume total d'unités :</span>
                  <strong className="font-mono text-foreground">{totalItemsCount}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Délai d'étude :</span>
                  <strong className="text-emerald-600 font-semibold">24h ouvrées max</strong>
                </div>
              </div>

              {/* Mode de mise à disposition */}
              <div className="pt-2 border-t border-border space-y-3">
                <label className="text-xs font-heading font-bold text-foreground uppercase tracking-wider block">
                  Mode de mise à disposition
                </label>
                <div className="space-y-2">
                  <label
                    onClick={() => setDeliveryMode("magasin")}
                    className={`p-3 rounded-lg border cursor-pointer flex items-start gap-2.5 transition-all ${
                      deliveryMode === "magasin"
                        ? "border-[#9B112B] bg-[#9B112B]/5 ring-1 ring-[#9B112B]"
                        : "border-border bg-card"
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#9B112B] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="block text-foreground">Enlèvement Magasin 7 (Casablanca)</strong>
                      <span className="text-muted-foreground text-[11px]">
                        Tit Mellil · Stock immédiat & préparation rapide
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setDeliveryMode("chantier")}
                    className={`p-3 rounded-lg border cursor-pointer flex items-start gap-2.5 transition-all ${
                      deliveryMode === "chantier"
                        ? "border-[#9B112B] bg-[#9B112B]/5 ring-1 ring-[#9B112B]"
                        : "border-border bg-card"
                    }`}
                  >
                    <Truck className="w-4 h-4 text-[#9B112B] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="block text-foreground">Livraison sur chantier</strong>
                      <span className="text-muted-foreground text-[11px]">
                        Flotte de camions avec grue de déchargement
                      </span>
                    </div>
                  </label>
                </div>

                {deliveryMode === "chantier" && (
                  <div className="space-y-2 pt-2 animate-in fade-in">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-0.5">
                        Ville du chantier *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ex: Tanger, Casablanca, Nador..."
                        value={deliveryCity}
                        onChange={(e) => setDeliveryCity(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-0.5">
                        Adresse / Point de repère
                      </label>
                      <input
                        type="text"
                        placeholder="ex: Zone Industrielle, Lot 14..."
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                      />
                    </div>
                    <label className="flex items-center gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={semiTrailerAccess}
                        onChange={(e) => setSemiTrailerAccess(e.target.checked)}
                        className="rounded text-[#9B112B] focus:ring-[#9B112B]"
                      />
                      <span className="text-[11px] text-muted-foreground">
                        Accès semi-remorque (38T) praticable
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* Coordonnées Client */}
              <div className="pt-2 border-t border-border space-y-3">
                <label className="text-xs font-heading font-bold text-foreground uppercase tracking-wider block">
                  Coordonnées de l'acheteur
                </label>
                <div className="space-y-2 text-xs">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Nom & Prénom *"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Société / Raison Sociale"
                      value={societe}
                      onChange={(e) => setSociete(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Numéro ICE (recommandé)"
                      value={ice}
                      onChange={(e) => setIce(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-border bg-background font-mono focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Téléphone direct (Maroc +212) *"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="E-mail professionnel *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Remarques complémentaires ou conditions particulières..."
                      value={remarques}
                      onChange={(e) => setRemarques(e.target.value)}
                      className="w-full p-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-[#9B112B]"
                    />
                  </div>
                </div>
              </div>

              {/* Submission Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting || (items.length === 0 && !boqFile)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#9B112B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7E0E23] transition-colors disabled:opacity-50 shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmission en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmettre la Cotation</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleExportPDF}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-xs font-semibold hover:bg-accent transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#007A63]" />
                    <span>Bordereau PDF</span>
                  </button>

                  <a
                    href={getWhatsAppRFQLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] text-slate-950 text-xs font-bold hover:bg-[#20ba59] transition-all shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Reassurance Footer */}
              <div className="pt-2 border-t border-border flex items-start gap-2 text-[10px] text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-[#007A63] shrink-0 mt-0.5" />
                <span>
                  Accréditation ONEE. Stock certifié conforme aux normes marocaines NM et CEI. Magasin 7 Tit Mellil.
                </span>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
