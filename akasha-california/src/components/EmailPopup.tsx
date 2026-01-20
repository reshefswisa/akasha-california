"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("akasha-popup-seen");
    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("akasha-popup-seen", "true");
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      localStorage.setItem("akasha-popup-seen", "true");
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">Join the Movement - Subscribe for 15% off</DialogTitle>
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="hidden md:block relative aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80"
              alt="AKASHA California"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            {submitted ? (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-display font-medium mb-2">Welcome to AKASHA</h2>
                <p className="text-muted-foreground text-sm">
                  Check your inbox for your exclusive welcome offer.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-display font-medium mb-2">
                  Join the Movement
                </h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to receive 15% off your first order, plus early access to new collections and exclusive content.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full">
                    Get 15% Off
                  </Button>
                </form>

                <button
                  onClick={handleClose}
                  className="mt-4 text-sm text-muted-foreground hover:text-foreground text-center"
                >
                  No thanks, I'll pay full price
                </button>

                <p className="mt-6 text-xs text-muted-foreground">
                  By subscribing, you agree to receive marketing emails from AKASHA California.
                  You can unsubscribe at any time.
                </p>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
