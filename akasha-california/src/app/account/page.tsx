"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <AccountDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Account</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-medium">Account</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-muted-foreground hover:text-foreground">
                    Forgot password?
                  </button>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="newsletter" className="mt-1" />
                  <Label htmlFor="newsletter" className="text-sm font-normal">
                    Subscribe to our newsletter for exclusive offers and movement tips
                  </Label>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Create Account
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="underline">Terms of Service</Link> and{" "}
                  <Link href="/privacy" className="underline">Privacy Policy</Link>.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function AccountDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("orders");

  const mockOrders = [
    {
      id: "AK-2024-001",
      date: "January 15, 2024",
      status: "Delivered",
      total: 186,
      items: [
        { name: "Essence High-Rise Legging", color: "Sage", size: "M", price: 98 },
        { name: "Serenity Wrap", color: "Oatmeal", size: "One Size", price: 88 },
      ],
    },
    {
      id: "AK-2024-002",
      date: "January 8, 2024",
      status: "Shipped",
      total: 128,
      items: [
        { name: "Foundation Pro Mat", color: "Sage", size: "Standard", price: 128 },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Account</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-medium">My Account</h1>
              <p className="text-muted-foreground mt-1">Welcome back!</p>
            </div>
            <Button variant="outline" onClick={onLogout}>Sign Out</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {[
                { id: "orders", label: "Order History" },
                { id: "profile", label: "Profile" },
                { id: "addresses", label: "Addresses" },
                { id: "wishlist", label: "Wishlist" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-2 rounded-sm transition-colors ${
                    activeTab === item.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-medium mb-6">Order History</h2>
                {mockOrders.length > 0 ? (
                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border rounded-sm p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <p className="font-medium">Order {order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                              order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{item.name} - {item.color}, {item.size}</span>
                              <span>${item.price}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                          <span className="font-medium">Total: ${order.total}</span>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-sm">
                    <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                    <Button asChild>
                      <Link href="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-medium mb-6">Profile Settings</h2>
                <form className="space-y-4 max-w-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input defaultValue="Sarah" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input defaultValue="Johnson" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" defaultValue="sarah@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input type="tel" placeholder="(555) 000-0000" />
                  </div>
                  <Button>Save Changes</Button>
                </form>
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <h2 className="text-xl font-medium mb-6">Saved Addresses</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-sm p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs bg-muted px-2 py-1 rounded">Default</span>
                      <button className="text-sm text-muted-foreground hover:text-foreground">Edit</button>
                    </div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      123 Yoga Lane<br />
                      Los Angeles, CA 90001<br />
                      United States
                    </p>
                  </div>
                  <button className="border border-dashed rounded-sm p-4 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                    + Add New Address
                  </button>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <h2 className="text-xl font-medium mb-6">Wishlist</h2>
                <div className="text-center py-12 bg-muted/30 rounded-sm">
                  <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
                  <Button asChild>
                    <Link href="/shop">Explore Products</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
