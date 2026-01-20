import Link from "next/link";

export const metadata = {
  title: "Size Guide | AKASHA California",
  description: "Find your perfect fit with our comprehensive size guide.",
};

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Size Guide</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-medium">Size Guide</h1>
          <p className="text-muted-foreground mt-2">Find your perfect fit.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* How to Measure */}
          <section>
            <h2 className="text-xl font-medium mb-4">How to Measure</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-muted/50 rounded-sm">
                <h3 className="font-medium mb-2">Bust</h3>
                <p className="text-sm text-muted-foreground">
                  Measure around the fullest part of your bust, keeping the tape parallel to the floor.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-sm">
                <h3 className="font-medium mb-2">Waist</h3>
                <p className="text-sm text-muted-foreground">
                  Measure around your natural waistline, keeping the tape comfortably loose.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-sm">
                <h3 className="font-medium mb-2">Hips</h3>
                <p className="text-sm text-muted-foreground">
                  Measure around the fullest part of your hips, about 8" below your waist.
                </p>
              </div>
            </div>
          </section>

          {/* Women's Sizing */}
          <section>
            <h2 className="text-xl font-medium mb-4">Women's Sizing</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Size</th>
                    <th className="text-left p-3">Bust (in)</th>
                    <th className="text-left p-3">Waist (in)</th>
                    <th className="text-left p-3">Hips (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">XXS</td>
                    <td className="p-3">31-32</td>
                    <td className="p-3">23-24</td>
                    <td className="p-3">34-35</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">XS</td>
                    <td className="p-3">32-33</td>
                    <td className="p-3">24-25</td>
                    <td className="p-3">35-36</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">S</td>
                    <td className="p-3">34-35</td>
                    <td className="p-3">26-27</td>
                    <td className="p-3">37-38</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">M</td>
                    <td className="p-3">36-37</td>
                    <td className="p-3">28-29</td>
                    <td className="p-3">39-40</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">L</td>
                    <td className="p-3">38-40</td>
                    <td className="p-3">30-32</td>
                    <td className="p-3">41-43</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">XL</td>
                    <td className="p-3">41-43</td>
                    <td className="p-3">33-35</td>
                    <td className="p-3">44-46</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">XXL</td>
                    <td className="p-3">44-46</td>
                    <td className="p-3">36-38</td>
                    <td className="p-3">47-49</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Sports Bra Sizing */}
          <section>
            <h2 className="text-xl font-medium mb-4">Sports Bra Sizing</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Size</th>
                    <th className="text-left p-3">Band (in)</th>
                    <th className="text-left p-3">Cup Equivalent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">XS</td>
                    <td className="p-3">28-30</td>
                    <td className="p-3">A-B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">S</td>
                    <td className="p-3">30-32</td>
                    <td className="p-3">B-C</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">M</td>
                    <td className="p-3">32-34</td>
                    <td className="p-3">C-D</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">L</td>
                    <td className="p-3">34-36</td>
                    <td className="p-3">D-DD</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">XL</td>
                    <td className="p-3">36-38</td>
                    <td className="p-3">DD-E</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Fit Tips */}
          <section className="bg-muted/50 p-6 rounded-sm">
            <h2 className="text-xl font-medium mb-4">Fit Tips</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>When between sizes, size up for a more relaxed fit or down for a more compressive fit.</li>
              <li>Our leggings are designed for a snug, supportive fit that doesn't restrict movement.</li>
              <li>Tops and tanks run true to size with a relaxed silhouette.</li>
              <li>For layering pieces like hoodies, consider sizing up for an oversized look.</li>
            </ul>
          </section>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">Still unsure about your size?</p>
            <Link href="/contact" className="text-foreground font-medium hover:underline">
              Contact us for personalized fit advice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
