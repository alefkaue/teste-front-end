import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { ProductsProvider } from './context/ProductsContext'
import { CommerceProvider, useCommerce } from './context/CommerceContext'
import { ModalProvider } from './context/ModalContext'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { Products } from './pages/Products/Products'
import { ProductDetails } from './pages/ProductDetails/ProductDetails'
import { Cart } from './pages/Cart/Cart'
import { EmptyState } from './components/Status/Status'
import { Footer } from './components/Storefront/Storefront'

function Layout() {
  const { pathname } = useLocation()
  const { storageUnavailable } = useCommerce()
  useEffect(() => {
    window.scrollTo(0, 0)
    const main = document.getElementById('conteudo')
    main?.setAttribute('tabindex', '-1')
    main?.focus({ preventScroll: true })
  }, [pathname])

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    {storageUnavailable && <p className="storage-notice" role="status">O navegador não permitiu salvar os dados. Carrinho e favoritos funcionarão durante esta visita.</p>}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Products />} />
      <Route path="/produto/:slug" element={<ProductDetails key={pathname} />} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="*" element={<main id="conteudo" className="page"><EmptyState title="Página não encontrada"><Link className="text-link" to="/">Voltar ao início</Link></EmptyState></main>} />
    </Routes>
    <Footer />
  </>
}

export default function App() {
  return <ProductsProvider><CommerceProvider><ModalProvider><Layout /></ModalProvider></CommerceProvider></ProductsProvider>
}
