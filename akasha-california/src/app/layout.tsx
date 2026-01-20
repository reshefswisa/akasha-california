import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { QuickViewProvider } from "@/lib/quickview-context";
import { RecentlyViewedProvider } from "@/lib/recently-viewed-context";
import { CartDrawer } from "@/components/CartDrawer";
import { EmailPopup } from "@/components/EmailPopup";
import { QuickViewModalWrapper } from "@/components/QuickViewModalWrapper";
import { BackToTop } from "@/components/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AKASHA California | Movement is a Way of Life",
  description:
    "Modern California lifestyle and wellness brand. Shop apparel and accessories designed for yoga, pilates, fitness, and mindful living.",
  keywords: [
    "yoga",
    "pilates",
    "fitness",
    "activewear",
    "wellness",
    "California",
    "lifestyle",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <CartProvider>
          <WishlistProvider>
            <QuickViewProvider>
              <RecentlyViewedProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartDrawer />
                <EmailPopup />
                <QuickViewModalWrapper />
                <BackToTop />
              </RecentlyViewedProvider>
            </QuickViewProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
