// src/lib/shopify.ts

const domain = process.env.SHOPIFY_STORE_DOMAIN
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

if (!domain) throw new Error("Missing SHOPIFY_STORE_DOMAIN")
if (!token) throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN")

// Pick a stable Storefront API version
const apiVersion = "2025-01"

// This MUST be exactly this format
const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`

type ShopifyResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
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

  let json: ShopifyResponse<T>
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(`Shopify returned non JSON: ${text}`)
  }

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
      shop {
        name
      }
    }
  `
  const data = await shopifyFetch<{ shop: { name: string } }>(query)
  return data.shop.name
}
