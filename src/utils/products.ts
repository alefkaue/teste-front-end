import type { ApiProduct, Product } from '../types/product'

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

export const normalizeText = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

// FNV-1a: identidade determinística, independente da posição e do preço.
export function identifyProduct(product: ApiProduct): Product {
  const identity = `${product.productName}|${product.descriptionShort}|${product.photo}`
  let hash = 2166136261
  for (let i = 0; i < identity.length; i++) {
    hash = Math.imul(hash ^ identity.charCodeAt(i), 16777619)
  }
  const id = (hash >>> 0).toString(36)
  const name = normalizeText(product.productName).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return { ...product, id, slug: `${name}-${id}` }
}

export function isApiProduct(value: unknown): value is ApiProduct {
  if (typeof value !== 'object' || value === null) return false
  const product = value as Record<string, unknown>
  return typeof product.productName === 'string' && product.productName.trim().length > 0 &&
    typeof product.descriptionShort === 'string' && typeof product.photo === 'string' &&
    typeof product.price === 'number' && Number.isFinite(product.price) && product.price >= 0
}

export const clampQuantity = (value: number) =>
  Number.isFinite(value) ? Math.min(99, Math.max(1, Math.trunc(value))) : 1
