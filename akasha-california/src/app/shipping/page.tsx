import Link from "next/link";

export const metadata = {
  title: "Shipping & Returns | AKASHA California",
  description: "Learn about AKASHA California shipping options and return policy.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Shipping & Returns</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-medium">Shipping & Returns</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto prose prose-neutral">
          <h2>Shipping</h2>

          <h3>Domestic Shipping (United States)</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 border-b">Method</th>
                <th className="text-left p-2 border-b">Delivery Time</th>
                <th className="text-left p-2 border-b">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b">Standard</td>
                <td className="p-2 border-b">5-7 business days</td>
                <td className="p-2 border-b">$8 (Free over $150)</td>
              </tr>
              <tr>
                <td className="p-2 border-b">Express</td>
                <td className="p-2 border-b">2-3 business days</td>
                <td className="p-2 border-b">$15</td>
              </tr>
              <tr>
                <td className="p-2 border-b">Next Day</td>
                <td className="p-2 border-b">1 business day</td>
                <td className="p-2 border-b">$25</td>
              </tr>
            </tbody>
          </table>

          <h3>International Shipping</h3>
          <p>
            We ship to select international destinations. Shipping rates and delivery times
            are calculated at checkout based on your location. Please note that international
            orders may be subject to customs duties and taxes, which are the responsibility
            of the customer.
          </p>

          <h3>Order Processing</h3>
          <p>
            Orders are processed within 1-2 business days. Orders placed after 2 PM PST
            may not ship until the following business day. You will receive a shipping
            confirmation email with tracking information once your order ships.
          </p>

          <hr className="my-8" />

          <h2>Returns</h2>

          <h3>Return Policy</h3>
          <p>
            We want you to love your AKASHA items. If you're not completely satisfied,
            we accept returns within 30 days of purchase for a full refund to your
            original payment method.
          </p>

          <h3>Return Requirements</h3>
          <ul>
            <li>Items must be unworn, unwashed, and in original condition</li>
            <li>All original tags must be attached</li>
            <li>Items must be returned in their original packaging</li>
            <li>Sale items are final sale and cannot be returned</li>
          </ul>

          <h3>How to Return</h3>
          <ol>
            <li>Log into your account and navigate to your order history</li>
            <li>Select the items you wish to return and the reason</li>
            <li>Print the prepaid return shipping label</li>
            <li>Pack items securely and drop off at any UPS location</li>
          </ol>

          <h3>Exchanges</h3>
          <p>
            Need a different size or color? Start a return and indicate that you'd like
            an exchange. We'll process your exchange as soon as we receive your return,
            and ship the new item within 1-2 business days.
          </p>

          <h3>Refund Processing</h3>
          <p>
            Once we receive your return, please allow 5-7 business days for us to process
            your refund. You will receive an email confirmation once your refund has been
            issued. Refunds will appear on your statement within 5-10 business days
            depending on your financial institution.
          </p>

          <div className="bg-muted/50 p-6 rounded-sm mt-8">
            <h3 className="mt-0">Need Help?</h3>
            <p className="mb-0">
              If you have any questions about shipping or returns, please{" "}
              <Link href="/contact" className="underline">contact us</Link> or email{" "}
              <a href="mailto:support@akashacalifornia.com" className="underline">
                support@akashacalifornia.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
