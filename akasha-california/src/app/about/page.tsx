import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About | AKASHA California",
  description: "Learn about AKASHA California and our commitment to movement as a way of life.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80"
            alt="AKASHA California"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-4">
            Our Story
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Born in California, built for movement.
          </p>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-medium mb-6">Movement as Lifestyle</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  AKASHA California was born from a simple belief: movement is not just exercise—it's a way of life.
                  Whether you're flowing through yoga, building strength in pilates, pushing limits in the gym,
                  or simply finding stillness in rest, every moment deserves intentional design.
                </p>
                <p>
                  Our name comes from the Sanskrit word for "ether" or "space"—the fifth element that connects
                  all things. We believe apparel should create space for you to move, breathe, and be fully present
                  in your practice.
                </p>
                <p>
                  Rooted in the California lifestyle of health, nature, and mindful living, we design apparel
                  and accessories that support your journey both on and off the mat.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
                alt="Yoga practice"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Two Brands */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-medium mb-4">Two Connected Worlds</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AKASHA exists in two interconnected parts, each supporting the other in your movement journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background p-8 rounded-sm">
              <h3 className="text-xl font-display font-medium mb-4">AKASHA Movement</h3>
              <p className="text-muted-foreground mb-6">
                The practice world. AKASHA Movement offers yoga, pilates, fitness, melt, mobility,
                breathwork, and mindful living classes. This is where the journey begins—on the mat,
                in the studio, in your body.
              </p>
              <Button variant="outline" asChild>
                <a href="https://akashamovement.com" target="_blank" rel="noopener noreferrer">
                  Explore AKASHA Movement
                </a>
              </Button>
            </div>

            <div className="bg-background p-8 rounded-sm">
              <h3 className="text-xl font-display font-medium mb-4">AKASHA California</h3>
              <p className="text-muted-foreground mb-6">
                The lifestyle brand. AKASHA California completes the movement experience with apparel
                and accessories designed with intention. From studio to street, we've got you covered.
              </p>
              <Button asChild>
                <Link href="/shop">Shop the Collection</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-medium mb-4">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Intention</h3>
              <p className="text-sm text-muted-foreground">Every design decision is made with purpose and care.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Quality</h3>
              <p className="text-sm text-muted-foreground">Premium materials that perform practice after practice.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Sustainability</h3>
              <p className="text-sm text-muted-foreground">Mindful choices for people and planet.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">California Spirit</h3>
              <p className="text-sm text-muted-foreground">Inspired by the laid-back, health-conscious West Coast lifestyle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-medium mb-4">Join the Movement</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Discover apparel designed for every practice. From yoga to fitness, pilates to lounge,
            we've got you covered.
          </p>
          <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
