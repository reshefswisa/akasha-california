import { getShopifyConfig } from "@/lib/shopify"

export default async function HomePage() {
  const { domain, endpoint } = getShopifyConfig()

  return (
    <main style={{ padding: 24 }}>
      <h1>Shopify config OK</h1>
      <p>Domain: {domain}</p>
      <p>Endpoint: {endpoint}</p>
    </main>
  )
}
