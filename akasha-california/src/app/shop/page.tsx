"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/Skeletons";
import { products, movements, categories, type MovementType, type Category } from "@/lib/data";

function ShopContent() {
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") as Category | null;
  const initialMovement = searchParams.get("movement") as MovementType | null;
  const initialFilter = searchParams.get("filter");

  const [selectedMovements, setSelectedMovements] = useState<MovementType[]>(
    initialMovement ? [initialMovement] : []
  );
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [showNew, setShowNew] = useState(initialFilter === "new");
  const [showBestSellers, setShowBestSellers] = useState(initialFilter === "bestsellers");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedMovements.length > 0) {
      result = result.filter((p) =>
        p.movements.some((m) => selectedMovements.includes(m))
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedGenders.length > 0) {
      result = result.filter((p) => selectedGenders.includes(p.gender));
    }

    if (showNew) {
      result = result.filter((p) => p.isNew);
    }

    if (showBestSellers) {
      result = result.filter((p) => p.isBestSeller);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "bestsellers":
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [selectedMovements, selectedCategories, selectedGenders, showNew, showBestSellers, sortBy]);

  const toggleMovement = (movement: MovementType) => {
    setSelectedMovements((prev) =>
      prev.includes(movement) ? prev.filter((m) => m !== movement) : [...prev, movement]
    );
  };

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleGender = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const clearFilters = () => {
    setSelectedMovements([]);
    setSelectedCategories([]);
    setSelectedGenders([]);
    setShowNew(false);
    setShowBestSellers(false);
  };

  const hasActiveFilters =
    selectedMovements.length > 0 || selectedCategories.length > 0 || selectedGenders.length > 0 || showNew || showBestSellers;

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3 text-sm uppercase tracking-wider">Movement</h3>
        <div className="space-y-2">
          {movements.map((movement) => (
            <div key={movement.id} className="flex items-center space-x-2">
              <Checkbox
                id={`movement-${movement.id}`}
                checked={selectedMovements.includes(movement.id)}
                onCheckedChange={() => toggleMovement(movement.id)}
              />
              <Label htmlFor={`movement-${movement.id}`} className="text-sm font-normal cursor-pointer">
                {movement.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3 text-sm uppercase tracking-wider">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3 text-sm uppercase tracking-wider">Gender</h3>
        <div className="space-y-2">
          {["women", "men", "unisex"].map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox
                id={`gender-${gender}`}
                checked={selectedGenders.includes(gender)}
                onCheckedChange={() => toggleGender(gender)}
              />
              <Label htmlFor={`gender-${gender}`} className="text-sm font-normal cursor-pointer capitalize">
                {gender}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3 text-sm uppercase tracking-wider">Quick Filters</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="new-arrivals" checked={showNew} onCheckedChange={() => setShowNew(!showNew)} />
            <Label htmlFor="new-arrivals" className="text-sm font-normal cursor-pointer">New Arrivals</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="best-sellers" checked={showBestSellers} onCheckedChange={() => setShowBestSellers(!showBestSellers)} />
            <Label htmlFor="best-sellers" className="text-sm font-normal cursor-pointer">Best Sellers</Label>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <Separator />
          <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">Clear All Filters</Button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Shop</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-medium">Shop All</h1>
          <p className="text-muted-foreground mt-2">Browse our complete collection of movement-inspired apparel and accessories.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-auto">
                    <div className="py-4">
                      <h2 className="text-lg font-medium mb-6">Filters</h2>
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>
                <p className="text-sm text-muted-foreground">{filteredProducts.length} products</p>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border rounded-sm px-3 py-2 bg-background"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="bestsellers">Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showMovementTags />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products match your current filters.</p>
                <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen">
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="h-8 w-48 bg-muted animate-pulse rounded mb-2" />
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <ProductGridSkeleton count={12} />
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
