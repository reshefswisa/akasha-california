type ShopifyConfig = {
  storeDomain: string
  apiVersion: string
  storefrontToken: string
}

export function getShopifyConfig(): ShopifyConfig {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN
  const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-10"
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_API_TOKEN

  if (!storeDomain) throw new Error("Missing env SHOPIFY_STORE_DOMAIN")
  if (!storefrontToken) throw new Error("Missing env SHOPIFY_STOREFRONT_API_TOKEN")

  return { storeDomain, apiVersion, storefrontToken }
}

export function getShopifyEndpointForDebug(): string {
  const { storeDomain, apiVersion } = getShopifyConfig()
  return `https://${storeDomain}/api/${apiVersion}/graphql.json`
}

export async function storefrontGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const { storefrontToken } = getShopifyConfig()
  const endpoint = getShopifyEndpointForDebug()

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}: ${text}`)
  }

  return JSON.parse(text) as T
}
