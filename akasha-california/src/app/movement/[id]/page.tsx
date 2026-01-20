import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import {
  movements,
  getProductsByMovement,
  getArticlesByMovement,
  type MovementType,
} from "@/lib/data";

interface MovementPageProps {
  params: Promise<{ id: string }>;
}

export default async function MovementPage({ params }: MovementPageProps) {
  const { id } = await params;
  const movement = movements.find((m) => m.id === id);

  if (!movement) {
    notFound();
  }

  const products = getProductsByMovement(id as MovementType);
  const articles = getArticlesByMovement(id as MovementType);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movement.heroImage}
            alt={movement.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-4">
            {movement.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {movement.tagline}
          </p>
        </div>
      </section>

      {/* Products Grid - Primary Section */}
      <section id="products" className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-medium mb-2">
                {movement.name} Collection
              </h2>
              <p className="text-muted-foreground">
                {products.length} products curated for your {movement.name.toLowerCase()} practice.
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href={`/shop?movement=${movement.id}`}>View in Shop</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Movement Description */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {movement.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Knowledge Articles */}
      {articles.length > 0 && (
        <section className="py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-medium mb-2">
                  Deepen Your Practice
                </h2>
                <p className="text-muted-foreground">
                  Articles and guides for your {movement.name.toLowerCase()} journey.
                </p>
              </div>
              <Button variant="outline" asChild className="hidden sm:flex">
                <Link href="/knowledge">Explore All</Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/knowledge/${article.id}`}
                  className="group bg-muted/30 rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
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
          </div>
        </section>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return movements.map((movement) => ({
    id: movement.id,
  }));
}

export async function generateMetadata({ params }: MovementPageProps) {
  const { id } = await params;
  const movement = movements.find((m) => m.id === id);

  if (!movement) {
    return {
      title: "Movement Not Found | AKASHA California",
    };
  }

  return {
    title: `${movement.name} Collection | AKASHA California`,
    description: movement.longDescription,
  };
}
