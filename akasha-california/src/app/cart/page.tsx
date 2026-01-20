"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart-context";
import { getBestSellers } from "@/lib/data";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const recommendedProducts = getBestSellers().slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Cart</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-medium">Your Cart</h1>
          {totalItems > 0 && (
            <p className="text-muted-foreground mt-2">{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-display font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet.
              Explore our collections and find something you love.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/shop">Shop All</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#movement">Shop by Movement</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Cart Items</h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-6">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                    className="flex gap-4 sm:gap-6 pb-6 border-b"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/product/${item.product.id}`}
                      className="w-24 sm:w-32 h-32 sm:h-40 rounded-sm overflow-hidden bg-muted shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link
                            href={`/product/${item.product.id}`}
                            className="font-medium hover:underline line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.selectedColor} / {item.selectedSize}
                          </p>
                        </div>
                        <p className="font-medium shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground mt-2">
                        ${item.product.price} each
                      </p>

                      {/* Quantity and Remove */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                          className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-muted/30 rounded-sm p-6">
                <h2 className="text-lg font-medium mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-muted-foreground">
                      {totalPrice >= 150 ? "Free" : "Calculated at checkout"}
                    </span>
                  </div>
                  {totalPrice < 150 && (
                    <div className="bg-primary/5 border border-primary/20 rounded-sm p-3">
                      <p className="text-sm">
                        Add <span className="font-medium">${(150 - totalPrice).toFixed(2)}</span> more for free shipping
                      </p>
                      <div className="mt-2 h-2 bg-primary/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${Math.min((totalPrice / 150) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between font-medium text-lg mb-6">
                  <span>Estimated Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                {/* Checkout Button - Links to external Shopify */}
                <Button size="lg" className="w-full mb-3">
                  Proceed to Checkout
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout powered by Shopify
                </p>

                {/* Payment Icons */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-muted-foreground mb-3 text-center">We accept</p>
                  <div className="flex justify-center gap-2">
                    {["Visa", "MC", "Amex", "PayPal", "Apple Pay"].map((payment) => (
                      <div
                        key={payment}
                        className="w-10 h-6 bg-muted rounded flex items-center justify-center text-[10px] text-muted-foreground"
                      >
                        {payment}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Secure SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                    </svg>
                    <span>30-Day Free Returns</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Free Shipping over $150</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* You May Also Like */}
        {items.length > 0 && (
          <section className="mt-16 pt-16 border-t">
            <h2 className="text-2xl font-display font-medium mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Empty cart recommendations */}
        {items.length === 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-display font-medium mb-8 text-center">Popular Right Now</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
