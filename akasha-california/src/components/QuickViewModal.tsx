"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/data";
import { movements } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  if (!product) return null;

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem({
        product,
        quantity,
        selectedColor: product.colors[selectedColor].name,
        selectedSize,
      });
      onClose();
    }
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">{product.name} - Quick View</DialogTitle>
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] md:aspect-auto">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-foreground text-background">New</Badge>
              )}
              {product.isBestSeller && (
                <Badge variant="secondary">Best Seller</Badge>
              )}
              {product.originalPrice && (
                <Badge className="bg-destructive text-destructive-foreground">Sale</Badge>
              )}
            </div>
            {/* Wishlist Button */}
            <button
              onClick={() => toggleItem(product)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
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
          </div>

          {/* Product Info */}
          <div className="p-6 flex flex-col">
            {/* Movement Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.movements.slice(0, 3).map((m) => {
                const movement = movements.find((mov) => mov.id === m);
                return (
                  <Badge key={m} variant="outline" className="text-xs">
                    {movement?.name}
                  </Badge>
                );
              })}
            </div>

            {/* Title and Price */}
            <h2 className="text-xl font-display font-medium mb-2">{product.name}</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg font-medium">${product.price}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through">${product.originalPrice}</span>
              )}
              {/* Rating */}
              <div className="flex items-center gap-1 text-sm">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{product.reviews.rating}</span>
                <span className="text-muted-foreground">({product.reviews.count})</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">{product.shortDescription}</p>

            {/* Color Selection */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">
                Color: <span className="font-normal">{product.colors[selectedColor].name}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(index)}
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === index ? "border-foreground scale-110" : "border-muted hover:border-muted-foreground"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={color.name}
                  >
                    {selectedColor === index && (
                      <svg
                        className={`w-3 h-3 ${color.hex === "#FFFFFF" || color.hex === "#F5F5F5" ? "text-foreground" : "text-white"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Size</p>
                <Link href="/size-guide" className="text-xs text-muted-foreground hover:text-foreground underline" onClick={onClose}>
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[40px] px-3 py-2 border rounded-sm text-sm transition-all ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Quantity</p>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded-l-sm flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <div className="w-12 h-10 border-t border-b flex items-center justify-center font-medium text-sm">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded-r-sm flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-3">
              <Button
                size="lg"
                className="w-full"
                disabled={!selectedSize}
                onClick={handleAddToCart}
              >
                {selectedSize ? `Add to Cart - $${(product.price * quantity).toFixed(2)}` : "Select a Size"}
              </Button>
              <Button variant="outline" size="lg" className="w-full" asChild onClick={onClose}>
                <Link href={`/product/${product.id}`}>View Full Details</Link>
              </Button>
            </div>

            {/* Shipping Info */}
            <p className="text-xs text-center text-muted-foreground mt-4">
              Free shipping on orders over $150
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
