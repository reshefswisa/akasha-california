type ShopifyConfig = {
  domain: string
  token: string
  apiVersion: string
  endpoint: string
}

export function getShopifyConfig(): ShopifyConfig {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  const apiVersion = process.env.SHOPIFY_API_VERSION || "2026-01"

  if (!domain) throw new Error("Missing env SHOPIFY_STORE_DOMAIN")
  if (!token) throw new Error("Missing env SHOPIFY_STOREFRONT_ACCESS_TOKEN")

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`

  return { domain, token, apiVersion, endpoint }
}

export async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const { endpoint, token } = getShopifyConfig()

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(
      `Shopify HTTP ${res.status}: ${JSON.stringify(json)}`
    )
  }

  return json as T
}
