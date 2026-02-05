type ShopifyFetchParams = {
  query: string
  variables?: Record<string, any>
  cache?: RequestCache
  revalidate?: number
}

function getShopifyUrl() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const version = process.env.SHOPIFY_API_VERSION || "2026-01"
  if (!domain) throw new Error("Missing SHOPIFY_STORE_DOMAIN")
  return `https://${domain}/api/${version}/graphql.json`
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  revalidate,
}: ShopifyFetchParams): Promise<T> {
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  if (!token) throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN")

  const res = await fetch(getShopifyUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: revalidate ? { revalidate } : undefined,
  })

  const json = await res.json()

  if (!res.ok || json.errors) {
    console.error("Shopify error", JSON.stringify(json, null, 2))
    throw new Error("Shopify request failed")
  }

  return json.data as T
}

export const PRODUCTS_QUERY = `
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
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

export async function getProducts(first = 12) {
  type Data = {
    products: {
      nodes: Array<{
        id: string
        handle: string
        title: string
        description: string
        featuredImage: null | {
          url: string
          altText: string | null
          width: number | null
          height: number | null
        }
        priceRange: {
          minVariantPrice: {
            amount: string
            currencyCode: string
          }
        }
      }>
    }
  }

  const data = await shopifyFetch<Data>({
    query: PRODUCTS_QUERY,
    variables: { first },
    revalidate: 60,
  })

  return data.products.nodes
}
