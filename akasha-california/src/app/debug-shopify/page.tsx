import { getShopifyConfig } from "@/lib/shopify"

export default async function DebugShopifyPage() {
  const { domain, endpoint, token } = getShopifyConfig()

  let result: any = null
  let error: any = null

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({
        query: `
          query DebugShopQuery {
            shop {
              name
              primaryDomain { url }
            }
          }
        `,
      }),
      cache: "no-store",
    })

    result = await res.json()
  } catch (e: any) {
    error = e?.message || String(e)
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Shopify debug</h1>
      <div>Domain: {domain}</div>
      <div>Endpoint: {endpoint}</div>

      <h2>GraphQL result</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>

      {error && (
        <>
          <h2>Error</h2>
          <pre>{String(error)}</pre>
        </>
      )}
    </main>
  )
}
