import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Product } from '../types/product'
import { fetchProducts } from '../services/products'

interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
  retry: () => void
}

const ProductsContext = createContext<ProductsState | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)
  const retry = useCallback(() => setAttempt(value => value + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetchProducts(controller.signal)
      .then(data => { if (!controller.signal.aborted) setProducts(data) })
      .catch((reason: unknown) => {
        if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : 'Não foi possível carregar os produtos.')
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [attempt])

  return <ProductsContext.Provider value={{ products, loading, error, retry }}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) throw new Error('useProducts deve ser usado dentro de ProductsProvider')
  return context
}
