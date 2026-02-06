type ShopifyConfig = {
  domain: string
  apiVersion: string
  storefrontAccessToken: string
  endpoint: string
}

export function getShopifyConfig(): ShopifyConfig {
  const domain = process.env.SHOPIFY_STORE_DOMAIN || ""
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || ""
  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-10"

  if (!domain) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN env var")
  }
  if (!storefrontAccessToken) {
    throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN env var")
  }

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`

  return { domain, apiVersion, storefrontAccessToken, endpoint }
}

export async function shopifyStorefrontFetch<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const { endpoint, storefrontAccessToken } = getShopifyConfig()

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
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
