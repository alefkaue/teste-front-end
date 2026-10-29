import { useState } from 'react'
import type { Product } from '../../types/product'

export function ProductImage({ product, eager = false }: { product: Product; eager?: boolean }) {
  const [failed, setFailed] = useState(false)
  return failed
    ? <span className="product-image product-image--fallback" role="img" aria-label={`Imagem indisponível de ${product.productName}`}>Imagem indisponível</span>
    : <img className="product-image" src={product.photo} alt={product.productName} width="247" height="228"
        loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />
}
