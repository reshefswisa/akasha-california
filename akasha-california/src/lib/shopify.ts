// src/lib/shopify.ts
import "server-only"

function mustGetEnv(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env ${name}`)
  return v
}

function normalizeShopDomain(input: string) {
  // Accepts "akashaca.myshopify.com" or "https://akashaca.myshopify.com"
  return input.replace(/^https?:\/\//, "").trim()
}

export function getShopifyConfig() {
  const storeDomain = normalizeShopDomain(mustGetEnv("SHOPIFY_STORE_DOMAIN"))
  const apiVersion = process.env.SHOPIFY_API_VERSION?.trim() || "2025-10"

  // Use ONE of these. If both exist, we will prefer private header mode.
  const publicToken = process.env.SHOPIFY_STOREFRONT_API_TOKEN?.trim()
  const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim()

  return { storeDomain, apiVersion, publicToken, privateToken }
}

export function getStorefrontApiUrl() {
  const { storeDomain, apiVersion } = getShopifyConfig()
  return `https://${storeDomain}/api/${apiVersion}/graphql.json`
}

export function getStorefrontHeaders(contentType: "json" | "graphql" = "json") {
  const { publicToken, privateToken } = getShopifyConfig()

  const headers: Record<string, string> = {
    "Accept": "application/json",
    "Content-Type": contentType === "json" ? "application/json" : "application/graphql",
  }

  // Private token mode
  if (privateToken) {
    headers["Shopify-Storefront-Private-Token"] = privateToken
    return headers
  }

  // Public token mode
  if (publicToken) {
    headers["X-Shopify-Storefront-Access-Token"] = publicToken
    return headers
  }

  throw new Error("Missing env SHOPIFY_STOREFRONT_API_TOKEN or SHOPIFY_STOREFRONT_PRIVATE_TOKEN")
}

export async function shopifyQuery<T>(query: string, variables?: Record<string, unknown>) {
  const url = getStorefrontApiUrl()
  const res = await fetch(url, {
    method: "POST",
    headers: getStorefrontHeaders("json"),
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  })

  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}: ${text}`)
  }

  return JSON.parse(text) as T
}
