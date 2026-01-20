"use client";

import { ProductCard } from "@/components/ProductCard";
import { useRecentlyViewed } from "@/lib/recently-viewed-context";

interface RecentlyViewedProps {
  excludeProductId?: string;
  maxItems?: number;
  title?: string;
}

export function RecentlyViewed({
  excludeProductId,
  maxItems = 4,
  title = "Recently Viewed"
}: RecentlyViewedProps) {
  const { items } = useRecentlyViewed();

  // Filter out the current product and limit items
  const displayItems = items
    .filter((item) => item.id !== excludeProductId)
    .slice(0, maxItems);

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-display font-medium mb-8">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {displayItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
