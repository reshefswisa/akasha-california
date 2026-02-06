import { getShopifyConfig } from "@/lib/shopify"

export default function DebugShopifyPage() {
  const { domain, endpoint } = getShopifyConfig()

  return (
    <main style={{ padding: 24 }}>
      <h1>Shopify debug</h1>
      <p>Domain: {domain}</p>
      <p>Endpoint: {endpoint}</p>
      <p>
        If this page loads, Next is reading your env variables correctly. Next
        step is to run a real GraphQL query.
      </p>
    </main>
  )
}
