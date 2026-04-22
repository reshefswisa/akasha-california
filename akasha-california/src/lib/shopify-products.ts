import "server-only"
import { shopifyQuery } from "./shopify"
import type { Product, ProductVariant, Category, MovementType } from "./data"

type ShopifyImage = { url: string; altText: string | null }
type ShopifyPrice = { amount: string; currencyCode: string }
type ShopifyVariant = {
  id: string
  availableForSale: boolean
  selectedOptions: { name: string; value: string }[]
  price: ShopifyPrice
  compareAtPrice: ShopifyPrice | null
}
type ShopifyProductNode = {
  id: string
  handle: string
  title: string
  description: string
  tags: string[]
  vendor: string
  productType: string
  availableForSale: boolean
  createdAt: string
  images: { edges: { node: ShopifyImage }[] }
  options: { name: string; values: string[] }[]
  variants: { edges: { node: ShopifyVariant }[] }
  priceRange: { minVariantPrice: ShopifyPrice; maxVariantPrice: ShopifyPrice }
  compareAtPriceRange: { minVariantPrice: ShopifyPrice }
  metafields?: ({ key: string; value: string; namespace: string } | null)[]
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  tags
  vendor
  productType
  availableForSale
  createdAt
  images(first: 10) { edges { node { url altText } } }
  options { name values }
  variants(first: 50) {
    edges {
      node {
        id
        availableForSale
        selectedOptions { name value }
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
      }
    }
  }
  priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
`

const VALID_CATEGORIES = new Set<Category>([
  "leggings","tops","sports-bras","shorts","hoodies-sweatshirts",
  "jackets","mats","straps","bags","hats","socks","accessories",
])
const VALID_MOVEMENTS = new Set<MovementType>([
  "yoga","pilates","run","train","lounge","meditation",
])

function parseTagValue(tags: string[], prefix: string): string | null {
  const hit = tags.find((t) => t.toLowerCase().startsWith(`${prefix}:`))
  return hit ? hit.slice(prefix.length + 1).trim().toLowerCase() : null
}

function parseTagValues(tags: string[], prefix: string): string[] {
  return tags
    .filter((t) => t.toLowerCase().startsWith(`${prefix}:`))
    .map((t) => t.slice(prefix.length + 1).trim().toLowerCase())
}

function hasTag(tags: string[], needle: string): boolean {
  return tags.some((t) => t.toLowerCase() === needle.toLowerCase())
}

function mapShopifyToProduct(node: ShopifyProductNode): Product {
  const lowerTags = node.tags.map((t) => t.toLowerCase())

  const rawCategory = parseTagValue(lowerTags, "category") || node.productType.toLowerCase().replace(/\s+/g, "-")
  const category = (VALID_CATEGORIES.has(rawCategory as Category) ? rawCategory : "accessories") as Category

  const movements = parseTagValues(lowerTags, "movement")
    .filter((m): m is MovementType => VALID_MOVEMENTS.has(m as MovementType))

  const intensityRaw = parseTagValue(lowerTags, "intensity") || "medium"
  const intensity = (["low","medium","high"].includes(intensityRaw) ? intensityRaw : "medium") as "low"|"medium"|"high"

  const genderRaw = parseTagValue(lowerTags, "gender") || "unisex"
  const gender = (["women","men","unisex"].includes(genderRaw) ? genderRaw : "unisex") as "women"|"men"|"unisex"

  const materials = parseTagValues(lowerTags, "material")

  const colorOption = node.options.find((o) => /color|colour/i.test(o.name))
  const colors = (colorOption?.values || []).map((v) => ({ name: v, hex: slugToHex(v) }))

  const sizeOption = node.options.find((o) => /size/i.test(o.name))
  const sizes = sizeOption?.values || []

  const images = node.images.edges.map((e) => e.node.url)

  const price = Number.parseFloat(node.priceRange.minVariantPrice.amount || "0")
  const compareAt = Number.parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || "0")
  const originalPrice = compareAt > price ? compareAt : undefined

  const shortDescription = (node.description || "").split(/\.\s/)[0].slice(0, 160)

  const variants: ProductVariant[] = node.variants.edges.map((e) => {
    const v = e.node
    const colorOpt = v.selectedOptions.find((o) => /color|colour/i.test(o.name))
    const sizeOpt = v.selectedOptions.find((o) => /size/i.test(o.name))
    return {
      id: v.id,
      color: colorOpt?.value || "",
      size: sizeOpt?.value || "",
      availableForSale: v.availableForSale,
      price: Number.parseFloat(v.price.amount || "0"),
    }
  })

  return {
    id: node.handle,
    name: node.title,
    price,
    originalPrice,
    description: node.description,
    shortDescription,
    category,
    movements,
    images,
    colors,
    sizes,
    materials,
    intensity,
    gender,
    isNew: hasTag(lowerTags, "new"),
    isBestSeller: hasTag(lowerTags, "bestseller") || hasTag(lowerTags, "best-seller"),
    reviews: { rating: 5, count: 0 },
    inStock: node.availableForSale,
    variants,
  }
}

const COLOR_MAP: Record<string, string> = {
  black: "#1A1A1A", white: "#FFFFFF", navy: "#0A1F3D", grey: "#808080", gray: "#808080",
  sage: "#9CAF88", sandstone: "#C4A882", midnight: "#2C3E50", cloud: "#F5F5F5",
  blush: "#E8C4C4", slate: "#708090", olive: "#808000", cream: "#F5F5DC",
  tan: "#D2B48C", stone: "#8D7F6A", charcoal: "#36454F", rose: "#BC8F8F",
}
function slugToHex(name: string): string {
  const key = name.toLowerCase().trim().replace(/\s+/g, "")
  return COLOR_MAP[key] || "#888888"
}

export async function getShopifyProducts(first = 100): Promise<Product[]> {
  try {
    const res = await shopifyQuery<{
      data: { products: { edges: { node: ShopifyProductNode }[] } }
    }>(`
      query Products($first: Int!) {
        products(first: $first) { edges { node { ${PRODUCT_FIELDS} } } }
      }
    `, { first })
    return res.data.products.edges.map((e) => mapShopifyToProduct(e.node))
  } catch (err) {
    console.error("[shopify] getShopifyProducts failed:", err)
    return []
  }
}

export async function getShopifyProductByHandle(handle: string): Promise<Product | null> {
  try {
    const res = await shopifyQuery<{
      data: { productByHandle: ShopifyProductNode | null }
    }>(`
      query ProductByHandle($handle: String!) {
        productByHandle(handle: $handle) { ${PRODUCT_FIELDS} }
      }
    `, { handle })
    return res.data.productByHandle ? mapShopifyToProduct(res.data.productByHandle) : null
  } catch (err) {
    console.error(`[shopify] getShopifyProductByHandle(${handle}) failed:`, err)
    return null
  }
}

export async function getShopifyCollectionHandles(): Promise<string[]> {
  try {
    const res = await shopifyQuery<{
      data: { collections: { edges: { node: { handle: string } }[] } }
    }>(`{ collections(first: 50) { edges { node { handle } } } }`)
    return res.data.collections.edges.map((e) => e.node.handle)
  } catch {
    return []
  }
}
