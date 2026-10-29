import { Link } from 'react-router-dom'
import { useCommerce } from '../../context/CommerceContext'
import { useProducts } from '../../context/ProductsContext'
import { ProductImage } from '../../components/ProductImage/ProductImage'
import { QuantityControl } from '../../components/QuantityControl/QuantityControl'
import { EmptyState, ProductStatus } from '../../components/Status/Status'
import { formatPrice } from '../../utils/products'
import { usePageMeta } from '../../hooks/usePageMeta'

export function Cart() {
  const { products, loading, error } = useProducts()
  const { cart, setQuantity, removeFromCart } = useCommerce()
  usePageMeta('Seu carrinho', 'Carrinho demonstrativo do desafio Econverse. Consulte itens, quantidades e subtotal. Sem pagamento real.')
  const items = cart.flatMap(item => {
    const product = products.find(product => product.id === item.productId)
    return product ? [{ ...item, product }] : []
  })
  const unavailable = cart.filter(item => !products.some(product => product.id === item.productId))
  const subtotal = items.reduce((total, item) => total + item.quantity * item.product.price, 0)

  return <main id="conteudo" className="page">
    <h1 className="section-title">Seu carrinho</h1>
    <p className="muted">Uma demonstração, sem pagamento ou envio de pedidos.</p>
    <ProductStatus />
    {!loading && !error && (cart.length ? <div className="cart-layout">
      <ul className="cart-items">{items.map(({ product, quantity }) => <li className="cart-item" key={product.id}>
        <Link to={`/produto/${product.slug}`}><ProductImage product={product} /></Link>
        <div><h2><Link to={`/produto/${product.slug}`}>{product.productName}</Link></h2><p>{formatPrice(product.price)}</p>
          <QuantityControl name={product.productName} value={quantity} onChange={value => setQuantity(product.id, value)} />
          <button className="text-link cart-item__remove" onClick={() => removeFromCart(product.id)} aria-label={`Remover ${product.productName} do carrinho`}>Remover</button>
        </div>
        <strong>{formatPrice(product.price * quantity)}</strong>
      </li>)}
        {unavailable.map(item => <li className="cart-item" key={item.productId}><p>Este produto não está mais na fonte oficial.</p><button className="text-link" onClick={() => removeFromCart(item.productId)}>Remover item indisponível</button></li>)}
      </ul>
      <aside className="cart-summary" aria-label="Resumo do carrinho"><h2>Resumo</h2><p>Subtotal <strong>{formatPrice(subtotal)}</strong></p><small>Sem cálculo de frete ou pagamento.</small><Link className="button" to="/produtos">CONTINUAR EXPLORANDO</Link></aside>
    </div> : <EmptyState title="Seu carrinho está vazio"><p>Explore os produtos e adicione seus favoritos ao carrinho.</p><Link className="button" to="/produtos">VER PRODUTOS</Link></EmptyState>)}
  </main>
}
