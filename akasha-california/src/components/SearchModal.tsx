"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { products, movements, categories, type Product } from "@/lib/data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("akasha-recent-searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  // Search results
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();

    return products
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.shortDescription.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.movements.some((m) => m.toLowerCase().includes(searchTerm))
        );
      })
      .slice(0, 6);
  }, [query]);

  // Category and movement suggestions
  const suggestions = useMemo(() => {
    if (!query.trim()) return { categories: [], movements: [] };

    const searchTerm = query.toLowerCase();

    return {
      categories: categories.filter((c) => c.name.toLowerCase().includes(searchTerm)).slice(0, 3),
      movements: movements.filter((m) => m.name.toLowerCase().includes(searchTerm)).slice(0, 3),
    };
  }, [query]);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    // Add to recent searches
    const updated = [searchTerm, ...recentSearches.filter((s) => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("akasha-recent-searches", JSON.stringify(updated));
  };

  const handleProductClick = (product: Product) => {
    handleSearch(product.name);
    onClose();
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("akasha-recent-searches");
  };

  const hasResults = searchResults.length > 0 || suggestions.categories.length > 0 || suggestions.movements.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 max-h-[85vh] overflow-hidden">
        <DialogTitle className="sr-only">Search Products</DialogTitle>

        {/* Search Input */}
        <div className="flex items-center border-b px-4">
          <svg className="w-5 h-5 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products, categories, movements..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-base h-14 px-3"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[calc(85vh-56px)]">
          {!query.trim() ? (
            <div className="p-4 space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-muted-foreground">Recent Searches</p>
                    <button
                      onClick={handleClearRecent}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => setQuery(search)}
                        className="px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-muted/80"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Categories */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Popular Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 6).map((category) => (
                    <Link
                      key={category.id}
                      href={`/shop?category=${category.id}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 rounded-sm hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center">
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <span className="text-sm">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Shop by Movement */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Shop by Movement</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {movements.slice(0, 4).map((movement) => (
                    <Link
                      key={movement.id}
                      href={`/movement/${movement.id}`}
                      onClick={onClose}
                      className="relative aspect-square rounded-sm overflow-hidden group"
                    >
                      <img
                        src={movement.image}
                        alt={movement.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{movement.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : hasResults ? (
            <div className="p-4 space-y-4">
              {/* Category & Movement Suggestions */}
              {(suggestions.categories.length > 0 || suggestions.movements.length > 0) && (
                <div className="flex flex-wrap gap-2 pb-4 border-b">
                  {suggestions.movements.map((movement) => (
                    <Link
                      key={movement.id}
                      href={`/movement/${movement.id}`}
                      onClick={onClose}
                    >
                      <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        {movement.name}
                      </Badge>
                    </Link>
                  ))}
                  {suggestions.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/shop?category=${category.id}`}
                      onClick={onClose}
                    >
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                        {category.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}

              {/* Product Results */}
              {searchResults.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">Products</p>
                  <div className="space-y-2">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={() => handleProductClick(product)}
                        className="flex items-center gap-4 p-2 rounded-sm hover:bg-muted transition-colors"
                      >
                        <div className="w-16 h-20 rounded-sm overflow-hidden bg-muted shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{product.shortDescription}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-medium">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* View All Link */}
              <Link
                href={`/shop?search=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="block text-center py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                View all results for "{query}"
              </Link>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-2">No results found for "{query}"</p>
              <p className="text-sm text-muted-foreground">Try searching for a product name, category, or movement</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
