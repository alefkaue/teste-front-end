import { useProducts } from '../../context/ProductsContext'

export function ProductStatus() {
  const { loading, error, retry } = useProducts()
  if (loading) return <div className="status" role="status"><span className="spinner" />Carregando produtos…</div>
  if (error) return <div className="status" role="alert"><p>{error}</p><button className="button" onClick={retry}>Tentar novamente</button></div>
  return null
}

export function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return <div className="status"><h2>{title}</h2>{children}</div>
}
