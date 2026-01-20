"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/lib/wishlist-context";
import { useQuickView } from "@/lib/quickview-context";
import { SizeChartModal } from "@/components/SizeChartModal";

interface ProductCardProps {
  product: Product;
  showMovementTags?: boolean;
}

export function ProductCard({ product, showMovementTags = false }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredColorIndex, setHoveredColorIndex] = useState<number | null>(null);
  const { isInWishlist, toggleItem } = useWishlist();
  const { openQuickView } = useQuickView();

  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleColorHover = (index: number) => {
    setHoveredColorIndex(index);
    // Use different images for different colors (cycle through available images)
    const imageIndex = index % product.images.length;
    setCurrentImageIndex(imageIndex);
  };

  const handleColorLeave = () => {
    setHoveredColorIndex(null);
    // Return to hover image (index 1) if card is hovered, otherwise index 0
    if (isHovered && product.images.length > 1) {
      setCurrentImageIndex(1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  return (
    <div
      className="group product-card block"
      onMouseEnter={() => {
        setIsHovered(true);
        if (hoveredColorIndex === null && product.images.length > 1) {
          setCurrentImageIndex(1);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredColorIndex(null);
        setCurrentImageIndex(0);
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted mb-3">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge variant="secondary" className="bg-background/90 text-foreground text-xs">
              New
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge variant="secondary" className="bg-background/90 text-foreground text-xs">
              Best Seller
            </Badge>
          )}
          {product.originalPrice && (
            <Badge variant="secondary" className="bg-destructive/90 text-destructive-foreground text-xs">
              Sale
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all z-10"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            className={`w-5 h-5 transition-colors ${inWishlist ? "text-red-500 fill-red-500" : "text-foreground"}`}
            fill={inWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Quick View & Size Chart Buttons */}
        <div
          className={`absolute bottom-3 left-3 right-3 flex gap-2 transform transition-all duration-300 z-10 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <button
            onClick={handleQuickViewClick}
            className="flex-1 bg-background/95 backdrop-blur-sm py-2.5 px-4 rounded-sm text-sm font-medium text-center hover:bg-background"
          >
            Quick View
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <SizeChartModal
              category={product.category}
              trigger={
                <button className="bg-background/95 backdrop-blur-sm py-2.5 px-3 rounded-sm hover:bg-background" aria-label="Size Guide">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </button>
              }
            />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="space-y-1">
          {showMovementTags && product.movements.length > 0 && (
            <div className="flex gap-1 mb-1">
              {product.movements.slice(0, 2).map((movement) => (
                <span
                  key={movement}
                  className="text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {movement.replace("-", " ")}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-sm font-medium leading-tight group-hover:underline">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Color Options - Interactive */}
          {product.colors.length > 1 && (
            <div className="flex gap-1.5 pt-1.5">
              {product.colors.slice(0, 5).map((color, index) => (
                <button
                  key={color.name}
                  onMouseEnter={() => handleColorHover(index)}
                  onMouseLeave={handleColorLeave}
                  onClick={(e) => e.preventDefault()}
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    hoveredColorIndex === index
                      ? "border-foreground scale-125"
                      : "border-border hover:border-muted-foreground"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`View in ${color.name}`}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="text-xs text-muted-foreground self-center">
                  +{product.colors.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
