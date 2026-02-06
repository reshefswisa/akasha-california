import { getShopName } from "@/lib/shopify"

export default async function HomePage() {
  const name = await getShopName()
  return (
    <main style={{ padding: 24 }}>
      <h1>Shopify connection OK</h1>
      <p>Store name: {name}</p>
    </main>
  )
}
