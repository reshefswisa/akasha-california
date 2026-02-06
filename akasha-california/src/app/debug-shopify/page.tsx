import { getShopifyConfig, getShopifyEndpointForDebug, storefrontGraphQL } from "@/lib/shopify"

type ShopQuery = {
  data?: {
    shop?: {
      name: string
      primaryDomain?: { host: string }
    }
  }
  errors?: Array<{ message: string }>
}

export default async function DebugShopifyPage() {
  const cfg = getShopifyConfig()
  const endpoint = getShopifyEndpointForDebug()

  let result: unknown = null
  let error: string | null = null

  try {
    const q = `
      query DebugShop {
        shop {
          name
          primaryDomain { host }
        }
      }
    `
    result = await storefrontGraphQL<ShopQuery>(q)
  } catch (e) {
    error = e instanceof Error ? e.message : String(e)
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Shopify debug</h1>

      <div className="space-y-2 text-sm">
        <div><span className="font-semibold">Domain:</span> {cfg.storeDomain}</div>
        <div><span className="font-semibold">API version:</span> {cfg.apiVersion}</div>
        <div><span className="font-semibold">Endpoint:</span> {endpoint}</div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-3">GraphQL result</h2>

      <pre className="text-xs bg-muted/30 border rounded-lg p-4 overflow-auto">
        {error ? error : JSON.stringify(result, null, 2)}
      </pre>
    </div>
  )
}
