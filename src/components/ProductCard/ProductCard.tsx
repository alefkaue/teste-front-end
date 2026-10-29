import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/products'
import { useProductModal } from '../../context/ModalContext'
import { ProductImage } from '../ProductImage/ProductImage'

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const open = useProductModal()
  return <article className="product-card" aria-label={product.productName}>
    <button className="product-card__open" onClick={() => open(product)} aria-label={`Ver produto ${product.productName}`}>
      <ProductImage product={product} eager={eager} />
      <span className="product-card__name">{product.productName}</span>
      <span className="product-card__price">{formatPrice(product.price)}</span>
    </button>
    <button className="button product-card__buy" onClick={() => open(product)} aria-label={`Comprar ${product.productName}`}>COMPRAR</button>
  </article>
}
