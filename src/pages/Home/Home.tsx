import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryTabs, type Category } from '../../components/CategoryTabs/CategoryTabs'
import { ProductCarousel } from '../../components/ProductCarousel/ProductCarousel'
import { EmptyState, ProductStatus } from '../../components/Status/Status'
import { useProducts } from '../../context/ProductsContext'
import { usePageMeta } from '../../hooks/usePageMeta'
import { Hero, DepartmentTiles, Partners, Brands, Newsletter } from '../../components/Storefront/Storefront'

export function Home() {
  const { products, loading, error } = useProducts()
  const [category, setCategory] = useState<Category>('CELULAR')
  usePageMeta('Produtos relacionados', 'Explore a vitrine de produtos do desafio front-end Econverse. Consulte os produtos e seus detalhes.')
  return <>
    <main id="conteudo" className="home">
      <Hero />
      <DepartmentTiles />
      <section className="showcase container" id="produtos" aria-labelledby="showcase-title">
        <h2 id="showcase-title" className="section-title">Produtos relacionados</h2>
        <CategoryTabs selected={category} onChange={setCategory} />
        {category !== 'CELULAR'
          ? <EmptyState title="Nenhum produto nesta categoria"><p>A fonte oficial disponibiliza apenas celulares.</p><button className="text-link" onClick={() => setCategory('CELULAR')}>Ver celulares</button></EmptyState>
          : <><ProductStatus />{!loading && !error && (products.length ? <ProductCarousel products={products} /> : <EmptyState title="Nenhum produto disponível" />)}</>}
      </section>
      <Partners label="Parceiros" />
      <section className="showcase container" aria-labelledby="highlights-title">
        <h2 id="highlights-title" className="section-title">Produtos relacionados</h2><Link className="see-all" to="/produtos">Ver todos</Link>
        {!loading && !error && products.length > 0 && <ProductCarousel products={products} label="Vitrine de destaques" />}
      </section>
      <Partners label="Mais parceiros" />
      <Brands />
      <section className="showcase container" aria-labelledby="more-title">
        <h2 id="more-title" className="section-title">Produtos relacionados</h2><Link className="see-all" to="/produtos">Ver todos</Link>
        {!loading && !error && products.length > 0 && <ProductCarousel products={products} label="Mais produtos" />}
      </section>
      <Newsletter />
    </main>
  </>
}
