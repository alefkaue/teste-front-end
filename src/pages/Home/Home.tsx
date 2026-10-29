import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryTabs, type Category } from '../../components/CategoryTabs/CategoryTabs'
import { ProductCarousel } from '../../components/ProductCarousel/ProductCarousel'
import { EmptyState, ProductStatus } from '../../components/Status/Status'
import { useProducts } from '../../context/ProductsContext'
import { usePageMeta } from '../../hooks/usePageMeta'

export function Home() {
  const { products, loading, error } = useProducts()
  const [category, setCategory] = useState<Category>('CELULAR')
  usePageMeta('Produtos relacionados', 'Explore a vitrine de produtos do desafio front-end Econverse. Consulte os produtos e seus detalhes.')
  return <>
    <main id="conteudo" className="home">
      <h1 className="section-title">Produtos relacionados</h1>
      <CategoryTabs selected={category} onChange={setCategory} />
      {category !== 'CELULAR'
        ? <EmptyState title="Nenhum produto nesta categoria"><p>A fonte oficial disponibiliza apenas celulares.</p><button className="text-link" onClick={() => setCategory('CELULAR')}>Ver celulares</button></EmptyState>
        : <><ProductStatus />{!loading && !error && (products.length ? <ProductCarousel products={products} /> : <EmptyState title="Nenhum produto disponível" />)}</>}
    </main>
    <footer className="home-footer" aria-label="Navegação complementar">
      <Link to="/produtos">Explorar catálogo</Link><Link to="/produtos?favoritos=1">Favoritos</Link><Link to="/carrinho">Carrinho demonstrativo</Link>
      <small>Teste técnico de desenvolvimento front-end · Econverse</small>
    </footer>
  </>
}
