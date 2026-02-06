// src/app/debug-shopify/page.tsx
import { getShopifyConfig, getStorefrontApiUrl, shopifyQuery } from "@/lib/shopify"

export const dynamic = "force-dynamic"

export default async function DebugShopifyPage() {
  const cfg = getShopifyConfig()

  let result: unknown = null
  try {
    result = await shopifyQuery<unknown>(`
      query DebugShop {
        shop {
          name
          primaryDomain {
            url
            host
          }
        }
      }
    `)
  } catch (e) {
    result = { error: e instanceof Error ? e.message : String(e) }
  }

  return (
    <main style={{ padding: 24, maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Shopify debug</h1>

      <div style={{ lineHeight: 1.8 }}>
        <div><b>Domain</b>: {cfg.storeDomain}</div>
        <div><b>API version</b>: {cfg.apiVersion}</div>
        <div><b>Endpoint</b>: {getStorefrontApiUrl()}</div>
        <div>
          <b>Auth mode</b>:{" "}
          {cfg.privateToken ? "private token header" : cfg.publicToken ? "public token header" : "missing token"}
        </div>
      </div>

      <h2 style={{ marginTop: 24, fontSize: 18, fontWeight: 700 }}>GraphQL result</h2>
      <pre style={{ marginTop: 12, padding: 16, background: "#f7f7f7", borderRadius: 8, overflowX: "auto" }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </main>
  )
}
