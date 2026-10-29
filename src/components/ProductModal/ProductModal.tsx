import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/products'
import { ProductImage } from '../ProductImage/ProductImage'

export function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const element = dialog.current
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    element?.showModal()
    return () => {
      element?.close()
      document.body.style.overflow = overflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])

  return <dialog className="product-modal" ref={dialog} aria-labelledby="modal-product-name" aria-describedby="modal-product-description"
    onKeyDown={event => {
      if (event.key !== 'Tab') return
      const focusable = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), [tabindex="0"]')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }}
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => {
      if (event.target !== event.currentTarget) return
      const rect = event.currentTarget.getBoundingClientRect()
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
    }}>
    <button className="product-modal__close" onClick={onClose} aria-label="Fechar produto" autoFocus>×</button>
    <ProductImage product={product} eager />
    <div className="product-modal__info">
      <h2 id="modal-product-name">{product.productName}</h2>
      <p className="product-modal__price">{formatPrice(product.price)}</p>
      <p id="modal-product-description">{product.descriptionShort}</p>
      <Link className="text-link" to={`/produto/${product.slug}`} onClick={onClose}>Ver detalhes</Link>
    </div>
  </dialog>
}
