import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { categories, CategoryTabs, type Category } from '../../components/CategoryTabs/CategoryTabs'
import { ProductGrid } from '../../components/ProductGrid/ProductGrid'
import { EmptyState, ProductStatus } from '../../components/Status/Status'
import { useProducts } from '../../context/ProductsContext'
import { useCommerce } from '../../context/CommerceContext'
import { usePageMeta } from '../../hooks/usePageMeta'
import { normalizeText } from '../../utils/products'
import { useExpandedEdition } from '../../context/EditionContext'
import { expandedTechnologyCategories, findDepartment, productCategory, productDepartment } from '../../utils/catalog'

export function Products({ additionalOnly = false }: { additionalOnly?: boolean }) {
  const expanded = useExpandedEdition()
  const { departmentId } = useParams()
  const { products, loading, error } = useProducts()
  const { favorites } = useCommerce()
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('busca') ?? ''
  const department = departmentId ?? searchParams.get('departamento')
  const currentDepartment = findDepartment(department)
  const categoryOptions: readonly Category[] = expanded ? (currentDepartment?.categories ?? expandedTechnologyCategories) : categories
  const [order, setOrder] = useState('original')
  const selectedCategory = searchParams.get('categoria') as Category | null
  const category: Category = selectedCategory && categoryOptions.includes(selectedCategory) ? selectedCategory : expanded ? 'TODOS' : 'CELULAR'
  const onlyFavorites = searchParams.get('favoritos') === '1'
  const title = onlyFavorites ? 'Seus favoritos' : additionalOnly ? 'Novos produtos' : expanded && currentDepartment ? currentDepartment.name : 'Todos os produtos'
  usePageMeta(expanded ? title : onlyFavorites ? 'Favoritos' : 'Todos os produtos', expanded
    ? 'Consulte os produtos disponíveis. Busque por nome e ordene por preço.'
    : 'Consulte os produtos da API oficial Econverse. Busque por nome e ordene por preço.')

  const filtered = useMemo(() => {
    if (!expanded && (category !== 'CELULAR' || department)) return []
    if (expanded && department && !currentDepartment) return []
    const result = products.filter(product =>
      (!expanded || !department || productDepartment(product) === department) &&
      (category === 'TODOS' || productCategory(product) === category) &&
      (!additionalOnly || product.source === 'additional') &&
      normalizeText(product.productName).includes(normalizeText(search)) && (!onlyFavorites || favorites.includes(product.id)))
    if (order === 'lowest') result.sort((a, b) => a.price - b.price)
    if (order === 'highest') result.sort((a, b) => b.price - a.price)
    return result
  }, [products, category, department, currentDepartment, expanded, additionalOnly, search, onlyFavorites, favorites, order])

  return <main id="conteudo" className="page">
    <h1 className="section-title">{title}</h1>
    {expanded && <p className="muted">Os produtos e preços do catálogo complementar são demonstrativos.</p>}
    <CategoryTabs selected={category} items={categoryOptions} allHref={expanded && departmentId ? `/departamento/${departmentId}` : '/produtos'} onChange={value => {
      const next = new URLSearchParams(searchParams)
      if (!expanded) next.delete('departamento')
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
      {filtered.length ? <ProductGrid products={filtered} /> : <EmptyState title="Nenhum produto encontrado"><p>{!expanded && (category !== 'CELULAR' || department) ? 'A fonte oficial disponibiliza apenas celulares.' : 'Tente outro nome ou altere os filtros.'}</p></EmptyState>}
    </>}
  </main>
}
