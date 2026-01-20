"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/lib/wishlist-context";
import { getBestSellers } from "@/lib/data";

export default function WishlistPage() {
  const { items, clearWishlist, totalItems } = useWishlist();
  const recommendedProducts = getBestSellers().filter(
    (p) => !items.some((item) => item.id === p.id)
  ).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Wishlist</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-medium">Your Wishlist</h1>
              {totalItems > 0 && (
                <p className="text-muted-foreground mt-2">{totalItems} saved item{totalItems !== 1 ? "s" : ""}</p>
              )}
            </div>
            {totalItems > 0 && (
              <Button variant="outline" onClick={clearWishlist}>
                Clear Wishlist
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-display font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Save your favorite items by clicking the heart icon on any product. They'll appear here for easy access.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/shop">Start Shopping</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#movement">Shop by Movement</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} showMovementTags />
            ))}
          </div>
        )}

        {/* You May Also Like */}
        {items.length > 0 && recommendedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t">
            <h2 className="text-2xl font-display font-medium mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Recommendations for empty wishlist */}
        {items.length === 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-display font-medium mb-8 text-center">Popular Right Now</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {getBestSellers().slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
