import { getShopName, getShopifyEndpointForDebug } from "@/lib/shopify"

export default async function HomePage() {
  try {
    const endpoint = getShopifyEndpointForDebug()
    const name = await getShopName()

    return (
      <main style={{ padding: 24 }}>
        <h1>Shopify connection OK</h1>
        <p>Endpoint: {endpoint}</p>
        <p>Store name: {name}</p>
      </main>
    )
  } catch (err: any) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Shopify connection failed</h1>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {String(err?.message || err)}
        </pre>
      </main>
    )
  }
}
