import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProducts } from '../../context/ProductsContext'
import { useCommerce } from '../../context/CommerceContext'
import { usePageMeta } from '../../hooks/usePageMeta'
import { ProductImage } from '../../components/ProductImage/ProductImage'
import { QuantityControl } from '../../components/QuantityControl/QuantityControl'
import { ProductCarousel } from '../../components/ProductCarousel/ProductCarousel'
import { EmptyState, ProductStatus } from '../../components/Status/Status'
import { formatPrice } from '../../utils/products'

export function ProductDetails() {
  const { slug } = useParams()
  const { products, loading, error } = useProducts()
  const { addToCart, favorites, toggleFavorite } = useCommerce()
  const product = products.find(item => item.slug === slug)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  usePageMeta(product?.productName ?? 'Produto', product?.descriptionShort ?? 'Consulte as informações do produto na Econverse.')

  if (loading || error) return <main id="conteudo" className="page"><ProductStatus /></main>
  if (!product) return <main id="conteudo" className="page"><EmptyState title="Produto não encontrado"><Link className="text-link" to="/produtos">Voltar ao catálogo</Link></EmptyState></main>

  const favorite = favorites.includes(product.id)
  return <main id="conteudo" className="page">
    <nav className="breadcrumb" aria-label="Você está aqui"><Link to="/">Início</Link><span>/</span><Link to="/produtos">Produtos</Link><span>/</span><span aria-current="page">{product.productName}</span></nav>
    <section className="product-details">
      <div className="product-details__image"><ProductImage key={product.id} product={product} eager /></div>
      <div className="product-details__info">
        <h1>{product.productName}</h1>
        <p>{product.descriptionShort}</p>
        <p className="product-details__price">{formatPrice(product.price)}</p>
        <label className="quantity-label">Quantidade</label>
        <QuantityControl value={quantity} onChange={value => { setQuantity(value); setAdded(false) }} />
        <button className="button" onClick={() => { addToCart(product.id, quantity); setAdded(true) }}>ADICIONAR AO CARRINHO</button>
        <button className="favorite-button" aria-pressed={favorite} onClick={() => toggleFavorite(product.id)}>
          <span aria-hidden="true">{favorite ? '♥' : '♡'}</span>{favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        </button>
        <p className="add-feedback" role="status">{added && <>Produto adicionado. <Link className="text-link" to="/carrinho">Ver carrinho</Link></>}</p>
        <small>Carrinho demonstrativo, sem pagamento.</small>
      </div>
    </section>
    <section className="related" aria-labelledby="related-title"><h2 id="related-title" className="section-title">Produtos relacionados</h2>
      <ProductCarousel key={product.id} products={products.filter(item => item.id !== product.id)} />
    </section>
  </main>
}
