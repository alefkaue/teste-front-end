import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/products'
import { ProductImage } from '../ProductImage/ProductImage'
import { QuantityControl } from '../QuantityControl/QuantityControl'
import { Dialog } from '../Dialog/Dialog'

export function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [quantity, setQuantity] = useState(1)
  return <Dialog className="product-modal" labelledBy="modal-product-name" describedBy="modal-product-description" closeLabel="Fechar produto" onClose={onClose}>
    <div className="product-modal__image"><ProductImage product={product} eager /></div>
    <div className="product-modal__info">
      <h2 id="modal-product-name">{product.productName}</h2>
      <p className="product-modal__price">{formatPrice(product.price)}</p>
      <p id="modal-product-description">{product.descriptionShort}</p>
      <Link className="text-link" to={`/produto/${product.slug}`} onClick={onClose}>Ver detalhes</Link>
      <div className="product-modal__actions"><QuantityControl value={quantity} onChange={setQuantity} />
        <Link className="yellow-button" to={`/produto/${product.slug}?quantidade=${quantity}`} onClick={onClose}>COMPRAR</Link>
      </div>
    </div>
  </Dialog>
}
