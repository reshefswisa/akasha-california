export function getShopifyConfig() {
  const domain = "txnxad-d3.myshopify.com"
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  if (!token) {
    throw new Error("Missing env SHOPIFY_STOREFRONT_ACCESS_TOKEN")
  }

  const endpoint =
    "https://txnxad-d3.myshopify.com/api/2026-01/graphql.json"

  return { domain, token, endpoint }
}

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, any> = {}
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

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Shopify error: ${text}`)
  }

  return res.json()
}
