"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "./data";

interface RecentlyViewedContextType {
  items: Product[];
  addItem: (product: Product) => void;
  clearItems: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_ITEMS = 8;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("akasha-recently-viewed");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recently viewed", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("akasha-recently-viewed", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item.id !== product.id);
      // Add to beginning
      const updated = [product, ...filtered];
      // Limit to MAX_ITEMS
      return updated.slice(0, MAX_ITEMS);
    });
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        items,
        addItem,
        clearItems,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  }
  return context;
}
