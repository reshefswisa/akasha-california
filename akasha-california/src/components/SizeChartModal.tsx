"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Category } from "@/lib/data";

interface SizeChartModalProps {
  category?: Category;
  trigger?: React.ReactNode;
}

export function SizeChartModal({ category, trigger }: SizeChartModalProps) {
  const isApparel = ["leggings", "tops", "sports-bras", "shorts", "hoodies-sweatshirts", "jackets"].includes(category || "");
  const isBra = category === "sports-bras";

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Size Guide
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Size Guide</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={isBra ? "bras" : "apparel"} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="apparel">Apparel</TabsTrigger>
            <TabsTrigger value="bras">Sports Bras</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>

          <TabsContent value="apparel" className="mt-6 space-y-6">
            {/* How to Measure */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-muted/50 rounded-sm">
                <p className="text-xs font-medium mb-1">Bust</p>
                <p className="text-[10px] text-muted-foreground">Fullest part, tape parallel to floor</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-sm">
                <p className="text-xs font-medium mb-1">Waist</p>
                <p className="text-[10px] text-muted-foreground">Natural waistline, comfortably loose</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-sm">
                <p className="text-xs font-medium mb-1">Hips</p>
                <p className="text-[10px] text-muted-foreground">Fullest part, about 8" below waist</p>
              </div>
            </div>

            {/* Size Chart */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Size</th>
                    <th className="text-left p-2 font-medium">Bust (in)</th>
                    <th className="text-left p-2 font-medium">Waist (in)</th>
                    <th className="text-left p-2 font-medium">Hips (in)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b"><td className="p-2 font-medium text-foreground">XXS</td><td className="p-2">31-32</td><td className="p-2">23-24</td><td className="p-2">34-35</td></tr>
                  <tr className="border-b"><td className="p-2 font-medium text-foreground">XS</td><td className="p-2">32-33</td><td className="p-2">24-25</td><td className="p-2">35-36</td></tr>
                  <tr className="border-b"><td className="p-2 font-medium text-foreground">S</td><td className="p-2">34-35</td><td className="p-2">26-27</td><td className="p-2">37-38</td></tr>
                  <tr className="border-b"><td className="p-2 font-medium text-foreground">M</td><td className="p-2">36-37</td><td className="p-2">28-29</td><td className="p-2">39-40</td></tr>
                  <tr className="border-b"><td className="p-2 font-medium text-foreground">L</td><td className="p-2">38-40</td><td className="p-2">30-32</td><td className="p-2">41-43</td></tr>
                  <tr className="border-b"><td className="p-2 font-medium text-foreground">XL</td><td className="p-2">41-43</td><td className="p-2">33-35</td><td className="p-2">44-46</td></tr>
                  <tr><td className="p-2 font-medium text-foreground">XXL</td><td className="p-2">44-46</td><td className="p-2">36-38</td><td className="p-2">47-49</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted-foreground">
              When between sizes, size up for a relaxed fit or down for a more compressive fit.
            </p>
          </TabsContent>

          <TabsContent value="bras" className="mt-6 space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Size</th>
                    <th className="text-left p-2 font-medium">Band (in)</th>
                    <th className="text-left p-2 font-medium">Cup Equivalent</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b"><td className="p-2 font-medium text-foreground">XS</td><td className="p-2">28-30</td><td className="p-2">A-B</td></tr>
                  <tr className="border-b"><td className="p-2 font-medium text-foreground">S</td><td className="p-2">30-32</td><td className="p-2">B-C</td></tr>
                  <tr className="border-b"><td className="p-2 font-medium text-foreground">M</td><td className="p-2">32-34</td><td className="p-2">C-D</td></tr>
                  <tr className="border-b"><td className="p-2 font-medium text-foreground">L</td><td className="p-2">34-36</td><td className="p-2">D-DD</td></tr>
                  <tr><td className="p-2 font-medium text-foreground">XL</td><td className="p-2">36-38</td><td className="p-2">DD-E</td></tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-muted/50 rounded-sm">
              <p className="text-sm font-medium mb-2">Support Levels</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li><span className="font-medium text-foreground">Low:</span> Yoga, pilates, barre</li>
                <li><span className="font-medium text-foreground">Medium:</span> Cycling, weight training, hiking</li>
                <li><span className="font-medium text-foreground">High:</span> Running, HIIT, jumping</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="accessories" className="mt-6 space-y-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Socks</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Size</th>
                        <th className="text-left p-2 font-medium">US Shoe Size</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b"><td className="p-2 font-medium text-foreground">S</td><td className="p-2">5-7</td></tr>
                      <tr className="border-b"><td className="p-2 font-medium text-foreground">M</td><td className="p-2">7.5-9</td></tr>
                      <tr><td className="p-2 font-medium text-foreground">L</td><td className="p-2">9.5-11</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Yoga Mats</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Size</th>
                        <th className="text-left p-2 font-medium">Dimensions</th>
                        <th className="text-left p-2 font-medium">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b"><td className="p-2 font-medium text-foreground">Standard</td><td className="p-2">68" x 24"</td><td className="p-2">Most practitioners</td></tr>
                      <tr><td className="p-2 font-medium text-foreground">Long</td><td className="p-2">74" x 24"</td><td className="p-2">Taller practitioners (5'10"+)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
