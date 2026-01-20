import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MovementTile } from "@/components/MovementTile";
import { ProductCard } from "@/components/ProductCard";
import { movements, getBestSellers, getNewArrivals, articles } from "@/lib/data";

export default function HomePage() {
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80"
            alt="AKASHA California - Movement is a way of life"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-4 leading-tight animate-slide-up">
              Movement is a Way of Life
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
              AKASHA California completes the movement experience with apparel
              and accessories designed for yoga, pilates, fitness, and
              mindful living.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button
                size="lg"
                className="bg-white text-foreground hover:bg-white/90"
                asChild
              >
                <Link href="#movement">Choose Your Movement</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-white text-foreground hover:bg-white/90"
                asChild
              >
                <Link href="/shop">Shop All</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Movement Tiles Section */}
      <section id="movement" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
              Choose Your Movement
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every movement practice deserves apparel designed with intention.
              Select your practice to explore curated collections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {movements.map((movement) => (
              <MovementTile key={movement.id} movement={movement} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-medium mb-2">
                Best Sellers
              </h2>
              <p className="text-muted-foreground">
                Community favorites, loved by practitioners everywhere.
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/shop?filter=bestsellers">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} showMovementTags />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/shop?filter=bestsellers">View All Best Sellers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Collection Banner */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80"
            alt="Pilates collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="ml-auto max-w-lg text-right">
            <span className="text-white/80 text-sm uppercase tracking-wider mb-2 block">
              Featured Collection
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white mb-4">
              The Pilates Edit
            </h2>
            <p className="text-white/90 mb-6">
              Precision meets comfort. Our pilates collection is engineered for
              controlled movements that build strength from your center.
            </p>
            <Button
              size="lg"
              className="bg-white text-foreground hover:bg-white/90"
              asChild
            >
              <Link href="/movement/pilates">Shop Pilates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-medium mb-2">
                New Arrivals
              </h2>
              <p className="text-muted-foreground">
                Fresh styles for your evolving practice.
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/shop?filter=new">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} showMovementTags />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/shop?filter=new">View All New Arrivals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Knowledge Hub Preview */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-medium mb-2">
                Knowledge Hub
              </h2>
              <p className="text-muted-foreground">
                Deepen your practice with insights and guidance.
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/knowledge">Explore All</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/knowledge/${article.id}`}
                className="group block bg-background rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span>{article.category}</span>
                    <span>·</span>
                    <span>{article.readTime} min read</span>
                  </div>
                  <h3 className="font-medium leading-tight group-hover:underline mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/knowledge">Explore Knowledge Hub</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AKASHA Movement CTA */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-foreground/70 text-sm uppercase tracking-wider mb-2 block">
                Our Sister Brand
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
                AKASHA Movement
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-lg">
                AKASHA Movement is the practice world—offering yoga, pilates,
                fitness, melt, mobility, breathwork, and mindful living
                classes. AKASHA California is the lifestyle brand that
                completes the experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  asChild
                >
                  <a
                    href="https://akashamovement.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore AKASHA Movement
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&q=80"
                alt="AKASHA Movement"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-4">
              The AKASHA Way
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every piece is designed with intention, crafted with care, and
              made to support your journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-foreground"
                  fill="none"
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
              </div>
              <h3 className="font-medium mb-2">Movement First</h3>
              <p className="text-sm text-muted-foreground">
                Designed for how you move, not just how you look.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="font-medium mb-2">California Made</h3>
              <p className="text-sm text-muted-foreground">
                Born from the California lifestyle and mindset.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Quality Crafted</h3>
              <p className="text-sm text-muted-foreground">
                Premium materials that last practice after practice.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Mindful Living</h3>
              <p className="text-sm text-muted-foreground">
                Supporting your journey on and off the mat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
