import { getShopifyConfig, storefrontFetch } from "@/lib/shopify"

type ShopNameResponse = {
  data?: { shop?: { name?: string } }
  errors?: unknown
}

export default async function DebugShopifyPage() {
  const config = getShopifyConfig()

  const query = `
    query DebugShopName {
      shop {
        name
      }
    }
  `

  let result: ShopNameResponse | { error: string } = { data: {} }

  try {
    result = await storefrontFetch<ShopNameResponse>(query)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    result = { error: msg }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>Shopify debug</h1>

      <div style={{ marginTop: 12 }}>
        <div>Domain: {config.domain}</div>
        <div>Endpoint: {config.endpoint}</div>
      </div>

      <h2 style={{ marginTop: 16 }}>GraphQL result</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </main>
  )
}
