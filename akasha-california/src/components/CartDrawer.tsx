"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Cart
            {totalItems > 0 && (
              <span className="text-sm font-normal text-muted-foreground">({totalItems} items)</span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <svg className="w-16 h-16 text-muted-foreground/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => setIsOpen(false)} asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`} className="flex gap-4">
                    <div className="w-20 h-24 rounded-sm overflow-hidden bg-muted shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="font-medium text-sm hover:underline line-clamp-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.selectedColor} / {item.selectedSize}
                      </p>
                      <p className="text-sm font-medium mt-1">${item.product.price}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-muted"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-muted"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                          className="text-xs text-muted-foreground hover:text-destructive"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              <Separator />
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  Checkout
                </Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)} asChild>
                <Link href="/cart">View Cart</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
