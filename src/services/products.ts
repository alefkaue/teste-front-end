import type { Product } from '../types/product'
import { identifyProduct, isApiProduct } from '../utils/products'

export const PRODUCTS_URL = import.meta.env.DEV ? '/api/produtos.json' : '/data/produtos.json'

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, { signal })
  if (!response.ok) throw new Error('Não foi possível carregar os produtos. Tente novamente.')
  const data: unknown = await response.json()
  if (typeof data !== 'object' || data === null || !('success' in data) || data.success !== true ||
    !('products' in data) || !Array.isArray(data.products) || !data.products.every(isApiProduct)) {
    throw new Error('A fonte de produtos retornou uma resposta inválida.')
  }
  const products = data.products.map(identifyProduct)
  if (new Set(products.map(product => product.id)).size !== products.length) {
    throw new Error('A fonte de produtos retornou identificadores duplicados.')
  }
  return products
}
