import { NavLink } from 'react-router-dom'
import { useCommerce } from '../../context/CommerceContext'

export function Header() {
  const { cart } = useCommerce()
  const quantity = cart.reduce((total, item) => total + item.quantity, 0)
  return <header className="header">
    <NavLink to="/" className="header__brand" aria-label="Econverse — início">econverse<span>.</span></NavLink>
    <nav aria-label="Navegação principal">
      <NavLink to="/produtos">Produtos</NavLink>
      <NavLink to="/produtos?favoritos=1">Favoritos</NavLink>
      <NavLink to="/carrinho">Carrinho ({quantity})</NavLink>
    </nav>
  </header>
}
