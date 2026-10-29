import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories, CategoryTabs, type Category } from '../../components/CategoryTabs/CategoryTabs'
import { ProductGrid } from '../../components/ProductGrid/ProductGrid'
import { EmptyState, ProductStatus } from '../../components/Status/Status'
import { useProducts } from '../../context/ProductsContext'
import { useCommerce } from '../../context/CommerceContext'
import { usePageMeta } from '../../hooks/usePageMeta'
import { normalizeText } from '../../utils/products'

export function Products() {
  const { products, loading, error } = useProducts()
  const { favorites } = useCommerce()
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('busca') ?? ''
  const department = searchParams.get('departamento')
  const [order, setOrder] = useState('original')
  const selectedCategory = searchParams.get('categoria') as Category | null
  const category: Category = selectedCategory && categories.includes(selectedCategory) ? selectedCategory : 'CELULAR'
  const onlyFavorites = searchParams.get('favoritos') === '1'
  usePageMeta(onlyFavorites ? 'Favoritos' : 'Todos os produtos', 'Consulte os produtos da API oficial Econverse. Busque por nome e ordene por preço.')

  const filtered = useMemo(() => {
    if (category !== 'CELULAR' || department) return []
    const result = products.filter(product => normalizeText(product.productName).includes(normalizeText(search)) && (!onlyFavorites || favorites.includes(product.id)))
    if (order === 'lowest') result.sort((a, b) => a.price - b.price)
    if (order === 'highest') result.sort((a, b) => b.price - a.price)
    return result
  }, [products, category, department, search, onlyFavorites, favorites, order])

  return <main id="conteudo" className="page">
    <h1 className="section-title">{onlyFavorites ? 'Seus favoritos' : 'Todos os produtos'}</h1>
    <CategoryTabs selected={category} onChange={value => {
      const next = new URLSearchParams(searchParams)
      next.delete('departamento')
      next.set('categoria', value)
      setSearchParams(next)
    }} />
    <div className="catalog-controls">
      <label>Buscar por nome<input type="search" placeholder="Buscar produto" value={search} onChange={event => {
        const next = new URLSearchParams(searchParams)
        if (event.target.value) next.set('busca', event.target.value); else next.delete('busca')
        setSearchParams(next, { replace: true })
      }} /></label>
      <label>Ordenar por<select value={order} onChange={event => setOrder(event.target.value)}>
        <option value="original">Ordem original</option><option value="lowest">Menor preço</option><option value="highest">Maior preço</option>
      </select></label>
      <label className="checkbox"><input type="checkbox" checked={onlyFavorites} onChange={event => {
        const next = new URLSearchParams(searchParams)
        if (event.target.checked) next.set('favoritos', '1'); else next.delete('favoritos')
        setSearchParams(next)
      }} />Somente favoritos</label>
    </div>
    <ProductStatus />
    {!loading && !error && <>
      <p className="result-count" role="status">{filtered.length} {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}</p>
      {filtered.length ? <ProductGrid products={filtered} /> : <EmptyState title="Nenhum produto encontrado"><p>{category !== 'CELULAR' || department ? 'A fonte oficial disponibiliza apenas celulares.' : 'Tente outro nome ou altere os filtros.'}</p></EmptyState>}
    </>}
  </main>
}
