import { notFound } from "next/navigation";
import { getProductById, products as placeholderProducts } from "@/lib/data";
import { getShopifyProducts, getShopifyProductByHandle } from "@/lib/shopify-products";
import ProductClient from "./ProductClient";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const liveProduct = await getShopifyProductByHandle(id);
  const product = liveProduct ?? getProductById(id) ?? null;
  if (!product) notFound();

  const liveAll = await getShopifyProducts(100);
  const allProducts = liveAll.length > 0 ? liveAll : placeholderProducts;

  return <ProductClient product={product} allProducts={allProducts} />;
}
