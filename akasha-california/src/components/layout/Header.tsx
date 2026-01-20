"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { movements, categories } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { SearchModal } from "@/components/SearchModal";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      const headerHeight = headerRef.current?.offsetHeight || 100;

      // Always show header at the top of the page
      if (currentScrollY < headerHeight) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader, { passive: true });

    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm">
        <p>Free shipping on orders over $150 | Movement is a way of life</p>
      </div>

      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <span className="text-xl font-display font-medium tracking-tight">
                      AKASHA CA
                    </span>
                  </Link>
                </div>
                <div className="flex-1 overflow-auto py-6">
                  <div className="px-6 space-y-6">
                    <div>
                      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                        Movement
                      </h3>
                      <div className="space-y-2">
                        {movements.map((movement) => (
                          <Link
                            key={movement.id}
                            href={`/movement/${movement.id}`}
                            className="block py-2 text-base hover-underline"
                            onClick={() => setIsOpen(false)}
                          >
                            {movement.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                        Shop
                      </h3>
                      <div className="space-y-2">
                        <Link
                          href="/shop"
                          className="block py-2 text-base hover-underline"
                          onClick={() => setIsOpen(false)}
                        >
                          Shop All
                        </Link>
                        {categories.slice(0, 6).map((category) => (
                          <Link
                            key={category.id}
                            href={`/shop?category=${category.id}`}
                            className="block py-2 text-base hover-underline"
                            onClick={() => setIsOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href="/knowledge"
                        className="block py-2 text-base hover-underline"
                        onClick={() => setIsOpen(false)}
                      >
                        Knowledge
                      </Link>
                      <Link
                        href="/about"
                        className="block py-2 text-base hover-underline"
                        onClick={() => setIsOpen(false)}
                      >
                        About
                      </Link>
                      <Link
                        href="/contact"
                        className="block py-2 text-base hover-underline"
                        onClick={() => setIsOpen(false)}
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t space-y-2">
                  <Link
                    href="/account"
                    className="block py-2 text-base"
                    onClick={() => setIsOpen(false)}
                  >
                    Account
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-display font-medium tracking-tight">
              AKASHA CA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Movement
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[500px] gap-3 p-6 md:grid-cols-2">
                      <div className="space-y-1">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                          Choose Your Practice
                        </h4>
                        {movements.map((movement) => (
                          <NavigationMenuLink key={movement.id} asChild>
                            <Link
                              href={`/movement/${movement.id}`}
                              className="block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none mb-1">
                                {movement.name}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {movement.tagline}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                      <div
                        className="relative rounded-sm overflow-hidden"
                        style={{ minHeight: "200px" }}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80"
                          alt="Movement lifestyle"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white text-sm font-medium">
                            Movement is a way of life
                          </p>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] gap-3 p-6 md:grid-cols-3">
                      <div className="space-y-1">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                          Apparel
                        </h4>
                        {categories.slice(0, 6).map((category) => (
                          <NavigationMenuLink key={category.id} asChild>
                            <Link
                              href={`/shop?category=${category.id}`}
                              className="block select-none rounded-sm p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-sm"
                            >
                              {category.name}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                          Accessories
                        </h4>
                        {categories.slice(6).map((category) => (
                          <NavigationMenuLink key={category.id} asChild>
                            <Link
                              href={`/shop?category=${category.id}`}
                              className="block select-none rounded-sm p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-sm"
                            >
                              {category.name}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                        <div className="pt-4 space-y-1">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/shop?filter=new"
                              className="block select-none rounded-sm p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-sm font-medium"
                            >
                              New Arrivals
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/shop?filter=bestsellers"
                              className="block select-none rounded-sm p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-sm font-medium"
                            >
                              Best Sellers
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                          Shop by Movement
                        </h4>
                        {movements.map((movement) => (
                          <NavigationMenuLink key={movement.id} asChild>
                            <Link
                              href={`/movement/${movement.id}`}
                              className="block select-none rounded-sm p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-sm"
                            >
                              {movement.name}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                        <div className="pt-4">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/shop"
                              className="block select-none rounded-sm p-2 leading-none no-underline outline-none transition-colors bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium text-center"
                            >
                              Shop All
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/knowledge" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-sm bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Knowledge
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-sm bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-sm bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </Button>

            <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
              <Link href="/account">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="sr-only">Account</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/wishlist">
                <svg
                  className="h-5 w-5"
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
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setCartOpen(true)} className="relative">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </nav>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
