// src/lib/shopify.ts

const apiVersion = "2025-01"

function getConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  if (!domain) throw new Error("Missing env SHOPIFY_STORE_DOMAIN")
  if (!token) throw new Error("Missing env SHOPIFY_STOREFRONT_ACCESS_TOKEN")

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`

  return { domain, token, endpoint }
}

type ShopifyResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  const { endpoint, token } = getConfig()

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}: ${text}`)
  }

  const json = JSON.parse(text) as ShopifyResponse<T>

  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL error: ${json.errors.map(e => e.message).join(", ")}`)
  }

  if (!json.data) {
    throw new Error(`Shopify missing data: ${text}`)
  }

  return json.data
}

export async function getShopName(): Promise<string> {
  const query = `
    query ShopName {
      shop { name }
    }
  `
  const data = await shopifyFetch<{ shop: { name: string } }>(query)
  return data.shop.name
}

export function getShopifyEndpointForDebug(): string {
  const { endpoint } = getConfig()
  return endpoint
}
