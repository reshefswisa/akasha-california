import { NextResponse } from "next/server";
import { shopifyQuery } from "@/lib/shopify";
import { getShopifyProductByHandle } from "@/lib/shopify-products";

export const dynamic = "force-dynamic";

type InputLine = {
  productId: string;
  color: string;
  size: string;
  quantity: number;
};

type CartCreateResponse = {
  data: {
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  };
};

function matchVariantId(
  variants: { id: string; color: string; size: string }[] | undefined,
  color: string,
  size: string,
): string | null {
  if (!variants || variants.length === 0) return null;
  const norm = (s: string) => s.trim().toLowerCase();
  const exact = variants.find(
    (v) => norm(v.color) === norm(color) && norm(v.size) === norm(size),
  );
  if (exact) return exact.id;
  const sizeOnly = variants.find((v) => norm(v.size) === norm(size));
  if (sizeOnly) return sizeOnly.id;
  return variants[0]?.id ?? null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { items: InputLine[] };
    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const lines: { merchandiseId: string; quantity: number }[] = [];
    const unresolved: InputLine[] = [];

    for (const item of items) {
      const product = await getShopifyProductByHandle(item.productId);
      const merchandiseId = matchVariantId(product?.variants, item.color, item.size);
      if (merchandiseId) {
        lines.push({ merchandiseId, quantity: Math.max(1, item.quantity) });
      } else {
        unresolved.push(item);
      }
    }

    if (lines.length === 0) {
      return NextResponse.json(
        {
          error: "No cart items could be matched to Shopify variants.",
          unresolved,
        },
        { status: 422 },
      );
    }

    const mutation = `
      mutation CartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart { id checkoutUrl }
          userErrors { field message }
        }
      }
    `;
    const res = await shopifyQuery<CartCreateResponse>(mutation, {
      input: { lines },
    });

    const cart = res.data.cartCreate.cart;
    const userErrors = res.data.cartCreate.userErrors;
    if (!cart || userErrors.length > 0) {
      return NextResponse.json(
        { error: "Shopify cartCreate failed", userErrors },
        { status: 502 },
      );
    }

    return NextResponse.json({
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
      unresolved,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[/api/checkout] failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
