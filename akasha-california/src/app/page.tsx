import { getProducts } from "@/lib/shopify"

export default async function HomePage() {
  const products = await getProducts(6)

  return (
    <main style={{ padding: 24 }}>
      <h1>Shopify connection test</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(products, null, 2)}
      </pre>
    </main>
  )
}
