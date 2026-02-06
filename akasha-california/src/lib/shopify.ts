type ShopifyError = {
  message?: string
  extensions?: { code?: string }
}

type ShopifyResponse<T> = {
  data?: T
  errors?: ShopifyError[]
}

const SHOPIFY_API_VERSION = "2026-01"

function mustGetEnv(name: string): string {
  const v = process.env[name]
  if (!v || v.trim().length === 0) throw new Error(`Missing ${name}`)
  return v.trim()
}

function getShopifyConfig() {
  const domain = mustGetEnv("SHOPIFY_STORE_DOMAIN")
  const token = mustGetEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN")

  const endpoint = `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`

  return { domain, token, endpoint }
}

export async function shopifyFetch<T>(args: {
  query: string
  variables?: Record<string, any>
  tags?: string[]
  cacheSeconds?: number
}): Promise<T> {
  const { token, endpoint } = getShopifyConfig()

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query: args.query,
      variables: args.variables ?? {},
    }),
    next: {
      revalidate: args.cacheSeconds ?? 60,
      tags: args.tags ?? [],
    },
  })

  if (!res.ok) {
    const txt = await res.text().catch(() => "")
    throw new Error(`Shopify HTTP ${res.status} ${txt}`)
  }

  const json = (await res.json()) as ShopifyResponse<T>

  if (json.errors && json.errors.length) {
    const msg = json.errors.map(e => e.message || "Unknown error").join(" | ")
    throw new Error(`Shopify error ${msg}`)
  }

  if (!json.data) throw new Error("Shopify returned no data")

  return json.data
}

export type MoneyV2 = { amount: string; currencyCode: string }

export type ShopifyImage = {
  url: string
  altText: string | null
  width: number | null
  height: number | null
}

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  description: string
  featuredImage: ShopifyImage | null
  priceRange: {
    minVariantPrice: MoneyV2
    maxVariantPrice: MoneyV2
  }
}

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      nodes {
        id
        handle
        title
        description
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
      }
    }
  }
`

export async function getProducts(first = 12): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { nodes: ShopifyProduct[] }
  }>({
    query: PRODUCTS_QUERY,
    variables: { first },
    tags: ["shopify", "products"],
    cacheSeconds: 60,
  })

  return data.products.nodes
}
