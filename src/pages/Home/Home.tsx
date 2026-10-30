import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryTabs, type Category } from '../../components/CategoryTabs/CategoryTabs'
import { ProductCarousel } from '../../components/ProductCarousel/ProductCarousel'
import { EmptyState, ProductStatus } from '../../components/Status/Status'
import { useProducts } from '../../context/ProductsContext'
import { usePageMeta } from '../../hooks/usePageMeta'
import { Hero, DepartmentTiles, Partners, Brands, Newsletter } from '../../components/Storefront/Storefront'
import { useExpandedEdition } from '../../context/EditionContext'
import { productCategory, productDepartment } from '../../utils/catalog'

export function Home() {
  const { products, officialProducts, loading, error } = useProducts()
  const expanded = useExpandedEdition()
  const [category, setCategory] = useState<Category>('CELULAR')
  const categoryProducts = expanded
    ? products.filter(product => productDepartment(product) === 'tecnologia' && productCategory(product) === category)
    : officialProducts
  const emptyCategory = category !== 'CELULAR' && (!expanded || (!loading && !error && !categoryProducts.length))
  usePageMeta('Produtos relacionados', 'Explore a vitrine de produtos do desafio front-end Econverse. Consulte os produtos e seus detalhes.')
  return <>
    <main id="conteudo" className="home">
      <Hero />
      <DepartmentTiles />
      <section className="showcase container" id="produtos" aria-labelledby="showcase-title">
        <h2 id="showcase-title" className="section-title">Produtos relacionados</h2>
        <CategoryTabs selected={category} onChange={setCategory} />
        {emptyCategory
          ? <EmptyState title="Nenhum produto nesta categoria"><p>{expanded ? 'Escolha outra categoria do catálogo.' : 'A fonte oficial disponibiliza apenas celulares.'}</p><button className="text-link" onClick={() => setCategory('CELULAR')}>Ver celulares</button></EmptyState>
          : <><ProductStatus />{!loading && !error && (categoryProducts.length ? <ProductCarousel key={category} products={categoryProducts} /> : <EmptyState title="Nenhum produto disponível" />)}</>}
      </section>
      <Partners label="Parceiros" />
      <section className="showcase container" aria-labelledby="highlights-title">
        <h2 id="highlights-title" className="section-title">Produtos relacionados</h2><Link className="see-all" to="/produtos">Ver todos</Link>
        {!loading && !error && officialProducts.length > 0 && <ProductCarousel products={officialProducts} label="Vitrine de destaques" />}
      </section>
      <Partners label="Mais parceiros" />
      <Brands />
      <section className="showcase container" aria-labelledby="more-title">
        <h2 id="more-title" className="section-title">Produtos relacionados</h2><Link className="see-all" to="/produtos">Ver todos</Link>
        {!loading && !error && officialProducts.length > 0 && <ProductCarousel products={officialProducts} label="Mais produtos" />}
      </section>
      <Newsletter />
    </main>
  </>
}
