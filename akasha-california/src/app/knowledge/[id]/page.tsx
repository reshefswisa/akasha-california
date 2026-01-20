import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { articles, getProductById } from "@/lib/data";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  const relatedProducts = article.relatedProducts
    .map((productId) => getProductById(productId))
    .filter(Boolean);

  const otherArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/knowledge" className="hover:text-foreground">Knowledge</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span className="bg-muted px-3 py-1 rounded-full">{article.category}</span>
                <span>·</span>
                <span>{article.readTime} min read</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-medium mb-4">
                {article.title}
              </h1>
              <p className="text-lg text-muted-foreground">{article.excerpt}</p>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] rounded-sm overflow-hidden mb-8">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-neutral max-w-none">
              <p className="text-lg leading-relaxed mb-6">{article.content}</p>

              {/* Expanded content based on category */}
              {article.category === "Yoga Fundamentals" && (
                <>
                  <h2>Getting Started with Yoga</h2>
                  <p>
                    Yoga is a practice that meets you exactly where you are. There's no need to be flexible,
                    strong, or have any prior experience. The beauty of yoga lies in its accessibility and
                    the way it can be adapted to suit any body, any level, any intention.
                  </p>
                  <h3>Choosing Your First Class</h3>
                  <p>
                    For beginners, we recommend starting with a gentle or beginner-friendly vinyasa class.
                    These classes move at a slower pace, giving you time to understand the foundational
                    poses and connect with your breath.
                  </p>
                  <h3>What to Wear</h3>
                  <p>
                    Comfort is key. Choose form-fitting clothing that moves with you and doesn't restrict
                    your range of motion. Our high-waisted leggings and breathable tanks are designed
                    specifically for the demands of yoga practice.
                  </p>
                  <h3>Essential Props</h3>
                  <p>
                    A good yoga mat is your foundation. Look for one with adequate cushioning for your
                    joints and enough grip to prevent slipping. Blocks and straps can help you access
                    poses that might otherwise be out of reach.
                  </p>
                </>
              )}

              {article.category === "Pilates Fundamentals" && (
                <>
                  <h2>The Pilates Method</h2>
                  <p>
                    Developed by Joseph Pilates in the early 20th century, Pilates is a system of
                    exercises designed to improve physical strength, flexibility, and posture while
                    enhancing mental awareness.
                  </p>
                  <h3>The Core Principles</h3>
                  <p>
                    <strong>Centering:</strong> All movements originate from your center, or "powerhouse."<br/>
                    <strong>Concentration:</strong> Full attention to each movement brings maximum value.<br/>
                    <strong>Control:</strong> Every movement is performed with complete muscle control.<br/>
                    <strong>Precision:</strong> Awareness of proper alignment in every exercise.<br/>
                    <strong>Breath:</strong> Deep, coordinated breathing enhances each movement.<br/>
                    <strong>Flow:</strong> Exercises are performed with fluidity and grace.
                  </p>
                  <h3>Mat vs. Reformer</h3>
                  <p>
                    Mat Pilates uses your body weight for resistance and can be practiced anywhere.
                    Reformer Pilates uses a specialized machine that provides variable resistance
                    through springs and pulleys. Both are effective; choose based on your goals and access.
                  </p>
                </>
              )}

              {article.category === "Fitness Training" && (
                <>
                  <h2>Building a Strong Foundation</h2>
                  <p>
                    Effective fitness training isn't about pushing yourself to exhaustion—it's about
                    building strength progressively while maintaining proper form and preventing injury.
                  </p>
                  <h3>Progressive Overload</h3>
                  <p>
                    The key to building strength is gradually increasing the demands on your body.
                    This can mean adding weight, increasing reps, or reducing rest time between sets.
                  </p>
                  <h3>Recovery is Training</h3>
                  <p>
                    Your muscles grow during rest, not during the workout itself. Adequate sleep,
                    proper nutrition, and active recovery days are essential components of any
                    effective training program.
                  </p>
                  <h3>What to Wear</h3>
                  <p>
                    Choose moisture-wicking fabrics that keep you cool and dry during high-intensity
                    workouts. Supportive sports bras and compression shorts help you move with confidence.
                  </p>
                </>
              )}

              {(article.category === "Breathwork" || article.category === "Recovery & Sleep") && (
                <>
                  <h2>The Power of Intentional Practice</h2>
                  <p>
                    Whether you're focusing on breathwork or recovery, the key is consistency and
                    intention. Small daily practices compound into significant changes over time.
                  </p>
                  <h3>Creating a Practice Space</h3>
                  <p>
                    Designate a quiet corner of your home for your practice. It doesn't need to be
                    large—just a space where you can sit or lie comfortably without interruption.
                  </p>
                  <h3>Starting Small</h3>
                  <p>
                    Begin with just 5 minutes a day. Consistency matters more than duration. As your
                    practice deepens, you'll naturally want to spend more time in these restorative states.
                  </p>
                </>
              )}

              <div className="bg-muted/50 p-6 rounded-sm my-8">
                <h3 className="text-lg font-medium mb-2">Ready to Practice?</h3>
                <p className="text-muted-foreground mb-4">
                  Explore our curated collection of apparel and accessories designed for your practice.
                </p>
                <Button asChild>
                  <Link href={`/movement/${article.relatedMovements[0]}`}>
                    Shop {article.relatedMovements[0]?.charAt(0).toUpperCase() + article.relatedMovements[0]?.slice(1)} Collection
                  </Link>
                </Button>
              </div>
            </div>

            {/* Share */}
            <div className="border-t pt-8 mt-8">
              <p className="text-sm text-muted-foreground mb-4">Share this article</p>
              <div className="flex gap-4">
                <button className="text-muted-foreground hover:text-foreground">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="text-muted-foreground hover:text-foreground">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="text-muted-foreground hover:text-foreground">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Shop the Look</h3>
                  <div className="space-y-4">
                    {relatedProducts.map((product) => product && (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="flex gap-4 group"
                      >
                        <div className="w-20 h-24 rounded-sm overflow-hidden bg-muted shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover:underline">{product.name}</p>
                          <p className="text-sm text-muted-foreground">${product.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Articles */}
              <div>
                <h3 className="text-lg font-medium mb-4">Keep Reading</h3>
                <div className="space-y-4">
                  {otherArticles.map((otherArticle) => (
                    <Link
                      key={otherArticle.id}
                      href={`/knowledge/${otherArticle.id}`}
                      className="block group"
                    >
                      <div className="aspect-[16/9] rounded-sm overflow-hidden mb-2">
                        <img
                          src={otherArticle.image}
                          alt={otherArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{otherArticle.category}</p>
                      <p className="text-sm font-medium group-hover:underline">{otherArticle.title}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-muted/50 p-6 rounded-sm">
                <h3 className="font-medium mb-2">Stay Inspired</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get weekly movement tips and exclusive content delivered to your inbox.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/#newsletter">Subscribe</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Articles */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-medium mb-8">More from the Knowledge Hub</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {otherArticles.map((otherArticle) => (
              <Link
                key={otherArticle.id}
                href={`/knowledge/${otherArticle.id}`}
                className="group bg-background rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={otherArticle.image}
                    alt={otherArticle.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span>{otherArticle.category}</span>
                    <span>·</span>
                    <span>{otherArticle.readTime} min read</span>
                  </div>
                  <h3 className="font-medium leading-tight group-hover:underline">
                    {otherArticle.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return { title: "Article Not Found | AKASHA California" };
  }

  return {
    title: `${article.title} | AKASHA California`,
    description: article.excerpt,
  };
}
