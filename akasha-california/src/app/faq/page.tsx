import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata = {
  title: "FAQ | AKASHA California",
  description: "Frequently asked questions about AKASHA California products, shipping, and returns.",
};

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-7 business days within the US. Express shipping (2-3 business days) is available at checkout. International shipping times vary by destination.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free standard shipping on all orders over $150 within the US.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely. Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order in your account or on our Order Tracking page.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to select international destinations. Shipping costs and delivery times are calculated at checkout based on your location.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer free returns within 30 days of purchase. Items must be unworn, unwashed, and have all original tags attached.",
      },
      {
        q: "How do I start a return?",
        a: "Log into your account and navigate to your order history to initiate a return. You'll receive a prepaid shipping label via email.",
      },
      {
        q: "Can I exchange an item for a different size?",
        a: "Yes! You can request an exchange for a different size during the return process. We'll ship the new size as soon as we receive your return.",
      },
    ],
  },
  {
    category: "Products",
    questions: [
      {
        q: "How do I find my size?",
        a: "Check our Size Guide for detailed measurements and fit recommendations for each product type. When in doubt, size up for a more relaxed fit.",
      },
      {
        q: "What materials do you use?",
        a: "We use a variety of premium, performance-focused materials including organic cotton, recycled polyester, nylon, and sustainable bamboo blends. Material information is listed on each product page.",
      },
      {
        q: "How should I care for my AKASHA items?",
        a: "Most items can be machine washed cold and laid flat to dry. Avoid fabric softeners and bleach. Specific care instructions are included on each product tag.",
      },
    ],
  },
  {
    category: "Account & Payment",
    questions: [
      {
        q: "Do I need an account to order?",
        a: "No, you can checkout as a guest. However, creating an account lets you track orders, save favorites, and earn rewards.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. We also offer Buy Now, Pay Later options through Afterpay.",
      },
      {
        q: "Do you offer gift cards?",
        a: "Yes! Digital gift cards are available in various amounts and are delivered instantly via email.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">FAQ</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-medium">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mt-2">Find answers to common questions about our products and services.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqs.map((category) => (
            <div key={category.category}>
              <h2 className="text-xl font-medium mb-4">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`${category.category}-${index}`}>
                    <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="text-center pt-8 border-t">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link href="/contact" className="text-foreground font-medium hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
