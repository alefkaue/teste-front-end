import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import type { Product } from '../types/product'
import { ProductModal } from '../components/ProductModal/ProductModal'

const ModalContext = createContext<((product: Product) => void) | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null)
  const close = useCallback(() => setProduct(null), [])
  return <ModalContext.Provider value={setProduct}>
    {children}
    {product && <ProductModal product={product} onClose={close} />}
  </ModalContext.Provider>
}

export function useProductModal() {
  const open = useContext(ModalContext)
  if (!open) throw new Error('useProductModal deve ser usado dentro de ModalProvider')
  return open
}
