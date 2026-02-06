import { getShopifyConfig, shopifyStorefrontFetch } from "@/lib/shopify"

type ShopQueryResponse = {
  data?: {
    shop?: {
      name?: string
      primaryDomain?: { url?: string }
    }
  }
  errors?: Array<{ message: string }>
}

export default async function DebugShopifyPage() {
  const cfg = getShopifyConfig()

  let result: any = null
  let error: string | null = null

  const query = `
    query DebugShop {
      shop {
        name
        primaryDomain {
          url
        }
      }
    }
  `

  try {
    const data = await shopifyStorefrontFetch<ShopQueryResponse>(query)
    result = data
  } catch (e: any) {
    error = e?.message || String(e)
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Shopify debug</h1>

      <div className="space-y-2 mb-6">
        <div>Domain: {cfg.domain}</div>
        <div>API version: {cfg.apiVersion}</div>
        <div>Endpoint: {cfg.endpoint}</div>
        <div className="text-sm text-muted-foreground">
          If shop.name loads, your Storefront API endpoint and token are correct.
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-2">GraphQL result</h2>

      {error ? (
        <pre className="whitespace-pre-wrap rounded-md border p-4 text-sm">
          {error}
        </pre>
      ) : (
        <pre className="whitespace-pre-wrap rounded-md border p-4 text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}
