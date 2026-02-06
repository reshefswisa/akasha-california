// src/lib/shopify.ts

type ShopifyError = {
  errors?: Array<{
    message: string
    extensions?: { code?: string }
  }>
}

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

// If you do not create this env var, it will default to 2026-01
const API_VERSION = process.env.SHOPIFY_API_VERSION || "2026-01"

function getStorefrontEndpoint(domain: string) {
  // domain should be like: txnad-d3.myshopify.com
  return `https://${domain}/api/${API_VERSION}/graphql.json`
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  tags,
}: {
  query: string
  variables?: Record<string, any>
  cache?: RequestCache
  tags?: string[]
}): Promise<T> {
  if (!SHOP_DOMAIN) throw new Error("Missing SHOPIFY_STORE_DOMAIN")
  if (!STOREFRONT_TOKEN) throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN")

  const endpoint = getStorefrontEndpoint(SHOP_DOMAIN)

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // This header name must include the hyphens exactly like this
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    // Next.js cache tags (optional)
    ...(tags ? { next: { tags } } : {}),
  })

  // Shopify can return non 200 codes when the endpoint is wrong, version is wrong, etc.
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Shopify HTTP ${res.status}. ${text}`)
  }

  const json = (await res.json()) as (ShopifyError & { data?: T })

  if (json.errors?.length) {
    throw new Error(`Shopify error: ${JSON.stringify(json.errors)}`)
  }

  return json.data as T
}

// Minimal example query so we can prove the connection works
export async function getShopName() {
  const query = /* GraphQL */ `
    query ShopName {
      shop {
        name
      }
    }
  `

  const data = await shopifyFetch<{ shop: { name: string } }>({
    query,
    cache: "no-store",
  })

  return data.shop.name
}
