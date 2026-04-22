import { products as placeholderProducts, movements, categories } from "@/lib/data";
import { getShopifyProducts } from "@/lib/shopify-products";
import ShopClient from "./ShopClient";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const live = await getShopifyProducts(100);
  const products = live.length > 0 ? live : placeholderProducts;
  return <ShopClient products={products} movements={movements} categories={categories} />;
}
