"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { RETAIL_CATEGORIES, RETAIL_PRODUCTS, RetailProduct } from "@/data/retail-catalog";
import { useQuoteCart } from "@/context/quote-cart-context";
import {
  Search,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  FileText,
  Phone,
  Truck,
  Building2,
  ShieldCheck,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function RetailPage() {
  const { addItem, items, totalUniqueLines } = useQuoteCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return RETAIL_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = (product: RetailProduct) => {
    const qty = quantities[product.id] || 1;
    addItem(
      {
        id: product.id,
        name: product.name,
        category: product.category,
        categoryLabel: product.categoryLabel,
        unit: product.unit,
        image: product.image,
      },
      qty
    );

    // Trigger visual feedback
    setAddedAnimation((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <main className="w-full theme-retail">
      {/* 1. Commercial Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-[#0B1120] text-white overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/card-retail.jpg"
            alt="MOCOMEL Retail"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent" />
          <div className="absolute inset-0 swiss-grid-dark opacity-30 pointer-events-none" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#9B112B]/40 border border-[#9B112B]/60 text-rose-300 text-xs font-mono uppercase tracking-widest">
              <ShoppingBag className="w-3.5 h-3.5 text-rose-400" />
              <span>MOCOMEL Retail · Comptoir & Négoce B2B</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Votre Partenaire en Matériel Électrique Basse et Moyenne Tension
            </h1>

            <p className="text-base text-slate-300 leading-relaxed font-sans">
              Distribution directe aux installateurs, bureaux d'études et entreprises générales. Câbles HTA PRC, câblerie industrielle R2V, accessoires de poste, appareillage modulaire et outillage agréé ONEE.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 border border-white/15">
                <Building2 className="w-4 h-4 text-rose-400" />
                <span>Magasin 7, Tit Mellil (Casablanca)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 border border-white/15">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Livraison sur Chantier Tout Maroc</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 border border-white/15">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Service Commercial : +212 777 817 534</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Sticky Filter Bar */}
      <section className="sticky top-[69px] z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-border py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un câble, un équipement de poste, un calibre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-border rounded focus:outline-none focus:ring-2 focus:ring-[#9B112B]/40 focus:border-[#9B112B] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Cart Summary Badge */}
            <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
              <span className="text-muted-foreground font-mono">
                {filteredProducts.length} référence{filteredProducts.length > 1 ? "s" : ""} disponible{filteredProducts.length > 1 ? "s" : ""}
              </span>

              <Link
                href="/demande-devis"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#9B112B] hover:bg-[#7E0E23] text-white font-semibold rounded text-xs transition-colors shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Mon Devis ({totalUniqueLines})</span>
              </Link>
            </div>
          </div>

          {/* Category Filter Pills (Horizontal Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs font-medium">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-[#9B112B] text-white font-semibold shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:text-foreground"
              }`}
            >
              Toutes les Catégories ({RETAIL_PRODUCTS.length})
            </button>
            {RETAIL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#9B112B] text-white font-semibold shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Catalog Grid */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Références du Catalogue Matériel</h2>
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded border border-border bg-card max-w-lg mx-auto space-y-4">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto stroke-1" />
              <h3 className="text-lg font-heading font-bold text-foreground">
                Aucune référence trouvée
              </h3>
              <p className="text-xs text-muted-foreground">
                Aucun produit ne correspond à votre recherche « {searchQuery} ». Essayez un autre terme ou réinitialisez les filtres.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 bg-[#9B112B] text-white text-xs font-semibold rounded"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const qty = quantities[product.id] || 1;
                const isAdded = addedAnimation[product.id];
                const inCart = items.some((item) => item.id === product.id);

                return (
                  <div
                    key={product.id}
                    className="rounded-md border border-border bg-card overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Product Image Frame */}
                      <div className="relative h-48 w-full bg-[#F1F5F9] border-b border-border/60 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <div className="absolute top-2.5 right-2.5">
                            <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#9B112B] text-white shadow-xs">
                              {product.badge}
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-2.5 left-2.5">
                          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/90 dark:bg-black/80 text-foreground border border-border">
                            Unité : {product.unit}
                          </span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="p-5 space-y-3">
                        <span className="text-[11px] font-mono text-[#9B112B] uppercase font-bold tracking-wide">
                          {product.categoryLabel}
                        </span>
                        <h3 className="text-sm font-heading font-bold text-foreground leading-snug group-hover:text-[#9B112B] transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-normal line-clamp-2">
                          {product.description}
                        </p>

                        {/* Technical Specs List */}
                        <div className="space-y-1 pt-2 border-t border-border/50 text-[11px] font-mono">
                          {product.specs.slice(0, 2).map((sp, idx) => (
                            <div key={idx} className="flex justify-between text-muted-foreground">
                              <span>{sp.label} :</span>
                              <span className="font-semibold text-foreground text-right">{sp.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer with Quantity & Add Button */}
                    <div className="p-5 pt-0 border-t border-border/40 mt-3">
                      <div className="flex items-center justify-between gap-3 pt-3">
                        {/* Stepper */}
                        <div className="flex items-center border border-border rounded overflow-hidden bg-slate-50 dark:bg-slate-800">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-1 text-xs font-mono font-bold min-w-8 text-center text-foreground">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Add Button */}
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded font-semibold text-xs active:scale-95 duration-150 ease-out transition-all ${
                            isAdded
                              ? "bg-emerald-600 text-white"
                              : inCart
                              ? "bg-slate-100 dark:bg-slate-800 text-[#9B112B] border border-[#9B112B]/40 hover:bg-[#9B112B] hover:text-white"
                              : "bg-[#9B112B] hover:bg-[#7E0E23] text-white shadow-xs"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Ajouté !</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{inCart ? "Rajouter" : "Ajouter au devis"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. Bottom Sticky Banner if Cart Has Items */}
      {totalUniqueLines > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Link
            href="/demande-devis"
            className="flex items-center gap-3 px-5 py-3.5 bg-slate-950 text-white rounded-md shadow-2xl border border-slate-800 hover:border-[#9B112B] transition-all group"
          >
            <div className="relative">
              <FileText className="w-5 h-5 text-rose-400" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#9B112B] text-white text-[10px] font-bold flex items-center justify-center">
                {totalUniqueLines}
              </span>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-wide">
                Finaliser votre demande de devis
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                {totalUniqueLines} référence{totalUniqueLines > 1 ? "s" : ""} dans votre panier
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </main>
  );
}
