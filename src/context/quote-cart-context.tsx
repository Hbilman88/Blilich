"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface QuoteCartItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  unit: string;
  quantity: number;
  targetUnitPrice?: number;
  notes?: string;
  image?: string;
}

interface QuoteCartContextType {
  items: QuoteCartItem[];
  addItem: (
    product: {
      id: string;
      name: string;
      category: string;
      categoryLabel: string;
      unit: string;
      image?: string;
    },
    quantity?: number,
    targetUnitPrice?: number,
    notes?: string
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateTargetUnitPrice: (id: string, price: number | undefined) => void;
  updateNotes: (id: string, notes: string) => void;
  updateItem: (id: string, updates: Partial<QuoteCartItem>) => void;
  clearCart: () => void;
  totalItemsCount: number;
  totalUniqueLines: number;
  estimatedBudgetHT: number;
  lastAddedItemName: string | null;
}

const QuoteCartContext = createContext<QuoteCartContextType | undefined>(undefined);

const STORAGE_KEY = "mocomel_quote_cart_v1";

export function QuoteCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteCartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastAddedItemName, setLastAddedItemName] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load quote cart from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save quote cart to localStorage", e);
    }
  }, [items, isHydrated]);

  const addItem = useCallback(
    (
      product: {
        id: string;
        name: string;
        category: string;
        categoryLabel: string;
        unit: string;
        image?: string;
      },
      quantity: number = 1,
      targetUnitPrice?: number,
      notes?: string
    ) => {
      setItems((prev) => {
        const existingIdx = prev.findIndex((item) => item.id === product.id);
        if (existingIdx > -1) {
          const updated = [...prev];
          const curr = updated[existingIdx];
          updated[existingIdx] = {
            ...curr,
            quantity: curr.quantity + (quantity > 0 ? quantity : 1),
            targetUnitPrice: targetUnitPrice !== undefined ? targetUnitPrice : curr.targetUnitPrice,
            notes: notes !== undefined ? notes : curr.notes,
          };
          return updated;
        } else {
          return [
            ...prev,
            {
              id: product.id,
              name: product.name,
              category: product.category,
              categoryLabel: product.categoryLabel,
              unit: product.unit,
              quantity: quantity > 0 ? quantity : 1,
              targetUnitPrice,
              notes,
              image: product.image,
            },
          ];
        }
      });
      setLastAddedItemName(product.name);
      setTimeout(() => setLastAddedItemName(null), 3000);
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const updateTargetUnitPrice = useCallback((id: string, price: number | undefined) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, targetUnitPrice: price } : item
      )
    );
  }, []);

  const updateNotes = useCallback((id: string, notes: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<QuoteCartItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItemsCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalUniqueLines = items.length;
  const estimatedBudgetHT = items.reduce((acc, curr) => {
    if (curr.targetUnitPrice && curr.targetUnitPrice > 0) {
      return acc + curr.targetUnitPrice * curr.quantity;
    }
    return acc;
  }, 0);

  return (
    <QuoteCartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateTargetUnitPrice,
        updateNotes,
        updateItem,
        clearCart,
        totalItemsCount,
        totalUniqueLines,
        estimatedBudgetHT,
        lastAddedItemName,
      }}
    >
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext);
  if (!context) {
    throw new Error("useQuoteCart must be used within a QuoteCartProvider");
  }
  return context;
}
