"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { ImageZoom } from "@/components/ImageZoom";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { products, movements, getProductById } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useRecentlyViewed } from "@/lib/recently-viewed-context";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { addItem: addToRecentlyViewed } = useRecentlyViewed();

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);

  // Track recently viewed
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    notFound();
  }

  const inWishlist = isInWishlist(product.id);
  const productUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleAddToCart = () => {
    if (selectedSize && product) {
      addItem({
        product,
        quantity,
        selectedColor: product.colors[selectedColor].name,
        selectedSize,
      });
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.movements.some((m) => product.movements.includes(m)))
    .slice(0, 4);

  const completeTheLookProducts = products
    .filter((p) => p.id !== product.id && p.category !== product.category && p.movements.some((m) => product.movements.includes(m)))
    .slice(0, 4);

  // Generate mock reviews
  const mockReviews = [
    { name: "Sarah M.", rating: 5, date: "2 weeks ago", comment: "Absolutely love these! The fit is perfect and the fabric is so soft. They stay in place during my entire yoga practice.", verified: true },
    { name: "Jessica L.", rating: 5, date: "1 month ago", comment: "Best leggings I've ever owned. High waist is flattering and comfortable. Will be buying more colors!", verified: true },
    { name: "Amanda K.", rating: 4, date: "1 month ago", comment: "Great quality and very comfortable. Sizing is accurate. Only wish they had more color options.", verified: true },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image with Zoom */}
            <div className="aspect-[3/4] rounded-sm overflow-hidden bg-muted relative group">
              <ImageZoom
                src={product.images[mainImage]}
                alt={product.name}
                className="w-full h-full"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
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
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-7 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                    mainImage === index ? "border-foreground" : "border-transparent hover:border-muted-foreground/50"
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            {/* Movement Tags */}
            <div className="flex flex-wrap gap-2">
              {product.movements.map((m) => {
                const movement = movements.find((mov) => mov.id === m);
                return (
                  <Link key={m} href={`/movement/${m}`}>
                    <Badge variant="outline" className="hover:bg-muted cursor-pointer">
                      {movement?.name}
                    </Badge>
                  </Link>
                );
              })}
            </div>

            {/* Title and Price */}
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-medium mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-medium">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-sm">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.reviews.rating) ? "text-yellow-500" : "text-muted"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-muted-foreground">({product.reviews.count})</span>
                </div>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-muted-foreground">{product.shortDescription}</p>

            {/* Social Share */}
            <SocialShareButtons
              url={productUrl}
              title={product.name}
              description={product.shortDescription}
              image={product.images[0]}
            />

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Color: <span className="font-normal">{product.colors[selectedColor].name}</span></h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === index ? "border-foreground scale-110" : "border-muted hover:border-muted-foreground"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={color.name}
                  >
                    {selectedColor === index && (
                      <svg
                        className={`w-4 h-4 ${color.hex === "#FFFFFF" || color.hex === "#F5F5F5" ? "text-foreground" : "text-white"}`}
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
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Size</h3>
                <Link href="/size-guide" className="text-sm text-muted-foreground hover:text-foreground underline">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] px-4 py-2.5 border rounded-sm text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-sm text-muted-foreground mt-2">Please select a size</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border rounded-l-sm flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <div className="w-16 h-12 border-t border-b flex items-center justify-center font-medium">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border rounded-r-sm flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button size="lg" className="flex-1 h-14 text-base" disabled={!selectedSize} onClick={handleAddToCart}>
                  {selectedSize ? `Add to Cart - ${(product.price * quantity).toFixed(2)}` : "Select a Size"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 w-14 shrink-0"
                  onClick={() => toggleItem(product)}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <svg
                    className={`w-6 h-6 transition-colors ${inWishlist ? "text-red-500 fill-red-500" : "text-foreground"}`}
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
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Free shipping on orders over $150
              </p>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
              <div className="text-center">
                <svg className="w-6 h-6 mx-auto mb-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <svg className="w-6 h-6 mx-auto mb-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
                <p className="text-xs text-muted-foreground">30-Day Returns</p>
              </div>
              <div className="text-center">
                <svg className="w-6 h-6 mx-auto mb-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-xs text-muted-foreground">Quality Guarantee</p>
              </div>
            </div>

            {/* Accordion Info */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger>Product Details</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Intensity: {product.intensity.charAt(0).toUpperCase() + product.intensity.slice(1)}</li>
                    <li>Fit: True to size</li>
                    <li>Rise: High-rise</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="materials">
                <AccordionTrigger>Materials & Care</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Materials</p>
                      <p className="text-sm text-muted-foreground">{product.materials.join(", ")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Care Instructions</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>Machine wash cold with like colors</li>
                        <li>Do not bleach</li>
                        <li>Tumble dry low or lay flat to dry</li>
                        <li>Do not iron</li>
                        <li>Do not dry clean</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div>
                      <p className="font-medium text-foreground mb-1">Shipping</p>
                      <p>Free standard shipping on orders over $150. Standard shipping takes 5-7 business days. Express options available at checkout.</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Returns</p>
                      <p>Free returns within 30 days. Items must be unworn with tags attached. See our <Link href="/shipping" className="underline">return policy</Link> for details.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Product Tabs - Reviews, Q&A */}
        <div className="mt-16 lg:mt-24">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3">
                Reviews ({product.reviews.count})
              </TabsTrigger>
              <TabsTrigger value="qa" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3">
                Q&A
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="pt-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Rating Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-muted/30 rounded-sm p-6">
                    <div className="text-center mb-6">
                      <p className="text-5xl font-display font-medium mb-2">{product.reviews.rating}</p>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(product.reviews.rating) ? "text-yellow-500" : "text-muted"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">Based on {product.reviews.count} reviews</p>
                    </div>
                    <Button variant="outline" className="w-full">Write a Review</Button>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-6">
                  {mockReviews.map((review, index) => (
                    <div key={index} className="border-b pb-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{review.name}</p>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "text-yellow-500" : "text-muted"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="qa" className="pt-8">
              <div className="text-center py-12 bg-muted/30 rounded-sm">
                <p className="text-muted-foreground mb-4">No questions yet. Be the first to ask!</p>
                <Button variant="outline">Ask a Question</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Complete the Look */}
        {completeTheLookProducts.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="text-2xl font-display font-medium mb-8">Complete the Look</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {completeTheLookProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="text-2xl font-display font-medium mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        <div className="mt-16 lg:mt-24 border-t pt-8">
          <RecentlyViewed excludeProductId={product.id} />
        </div>
      </div>

      {/* Mobile Sticky Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 lg:hidden z-40">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="font-medium">${product.price}</p>
            <p className="text-xs text-muted-foreground">{selectedSize ? `Size: ${selectedSize}` : "Select size above"}</p>
          </div>
          <Button size="lg" disabled={!selectedSize} onClick={handleAddToCart} className="flex-1">
            Add to Cart
          </Button>
        </div>
      </div>
      {/* Spacer for mobile sticky bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
