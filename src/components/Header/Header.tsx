import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCommerce } from '../../context/CommerceContext'
import { Icon } from '../Icon/Icon'
import { InfoDialog } from '../Dialog/Dialog'

export function Header() {
  const { cart } = useCommerce()
  const [search, setSearch] = useState('')
  const [info, setInfo] = useState<string | null>(null)
  const navigate = useNavigate()
  const quantity = cart.reduce((total, item) => total + item.quantity, 0)

  function submit(event: FormEvent) {
    event.preventDefault()
    navigate(`/produtos${search.trim() ? `?busca=${encodeURIComponent(search.trim())}` : ''}`)
  }

  return <>
    <header className="site-header" id="inicio">
      <div className="benefits container">
        <span><Icon name="shield" size={20} />Compra <strong>100% segura</strong></span>
        <span><Icon name="truck" size={20} /><strong>Entrega</strong> consulte as condições</span>
        <span><Icon name="card" size={20} /><strong>Pagamento</strong> consulte as condições</span>
      </div>
      <div className="header-main container">
        <Link to="/" aria-label="Econverse — início"><img className="brand-logo" src="/images/logo.png" width="139" height="41" alt="Econverse" /></Link>
        <form className="header-search" role="search" onSubmit={submit}>
          <label className="sr-only" htmlFor="header-search">Buscar produtos</label>
          <input id="header-search" type="search" placeholder="O que você está buscando?" value={search} onChange={event => setSearch(event.target.value)} />
          <button type="submit" aria-label="Buscar"><Icon name="search" size={28} /></button>
        </form>
        <nav className="header-actions" aria-label="Navegação principal">
          <button aria-label="Meus pedidos" onClick={() => setInfo('Meus pedidos')}><Icon name="box" size={28} /></button>
          <Link to="/produtos?favoritos=1" aria-label="Favoritos"><Icon name="heart" size={28} /></Link>
          <button aria-label="Minha conta" onClick={() => setInfo('Minha conta')}><Icon name="user" size={28} /></button>
          <Link to="/carrinho" aria-label={`Carrinho (${quantity})`}><Icon name="cart" size={28} />{quantity > 0 && <span className="header-count" aria-hidden="true">{quantity}</span>}</Link>
        </nav>
      </div>
      <nav className="department-nav container" aria-label="Departamentos">
        <Link to="/produtos" aria-label="Produtos">TODAS CATEGORIAS</Link>
        <Link to="/produtos?departamento=supermercado">SUPERMERCADO</Link>
        <Link to="/produtos?departamento=livros">LIVROS</Link>
        <Link to="/produtos?departamento=moda">MODA</Link>
        <Link to="/produtos">LANÇAMENTOS</Link>
        <Link className="is-highlighted" to="/produtos">OFERTAS DO DIA</Link>
        <button onClick={() => setInfo('Assinatura')}><Icon name="crown" size={21} />ASSINATURA</button>
      </nav>
    </header>
    {info && <InfoDialog title={info} onClose={() => setInfo(null)}><p>Esta experiência é demonstrativa. Você pode explorar os produtos, salvar favoritos e montar seu carrinho sem criar uma conta ou realizar pagamentos.</p><Link className="text-link" to="/produtos" onClick={() => setInfo(null)}>Explorar produtos</Link></InfoDialog>}
  </>
}
