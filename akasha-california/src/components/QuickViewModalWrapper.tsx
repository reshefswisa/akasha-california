"use client";

import { QuickViewModal } from "@/components/QuickViewModal";
import { useQuickView } from "@/lib/quickview-context";

export function QuickViewModalWrapper() {
  const { product, isOpen, closeQuickView } = useQuickView();

  return (
    <QuickViewModal
      product={product}
      isOpen={isOpen}
      onClose={closeQuickView}
    />
  );
}
