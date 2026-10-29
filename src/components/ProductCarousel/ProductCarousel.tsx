import { useEffect, useId, useState } from 'react'
import type { Product } from '../../types/product'
import { ProductCard } from '../ProductCard/ProductCard'

function visibleCount() {
  if (window.matchMedia('(max-width: 599px)').matches) return 1
  if (window.matchMedia('(max-width: 899px)').matches) return 2
  if (window.matchMedia('(max-width: 1099px)').matches) return 3
  return 4
}

export function ProductCarousel({ products, label = 'Vitrine de produtos' }: { products: Product[]; label?: string }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(visibleCount)
  const id = useId()
  const maxIndex = Math.max(0, products.length - visible)
  const current = Math.min(index, maxIndex)

  useEffect(() => {
    const resize = () => { setVisible(visibleCount()); setIndex(0) }
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  function move(direction: number) {
    setIndex(Math.min(maxIndex, Math.max(0, current + direction)))
  }

  return <section className="carousel" aria-label={label} aria-roledescription="carrossel"
    onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
    }}>
    <button className="carousel__arrow carousel__arrow--previous" aria-label="Produtos anteriores" aria-controls={id}
      disabled={current === 0} onClick={() => move(-1)}><span /></button>
    <div className="carousel__viewport" id={id}>
      <div className="carousel__track" style={{ transform: `translateX(calc(${current} * -1 * ((100% - ${visible - 1} * var(--card-gap)) / ${visible} + var(--card-gap))))` }}>
        {products.map((product, position) => <div className="carousel__slide" key={product.id}
          inert={position < current || position >= current + visible} aria-hidden={position < current || position >= current + visible}>
          <ProductCard product={product} eager={position < visible} />
        </div>)}
      </div>
    </div>
    <button className="carousel__arrow carousel__arrow--next" aria-label="Próximos produtos" aria-controls={id}
      disabled={current === maxIndex} onClick={() => move(1)}><span /></button>
    <p className="sr-only" aria-live="polite">Produtos {current + 1} a {Math.min(current + visible, products.length)} de {products.length}</p>
  </section>
}
