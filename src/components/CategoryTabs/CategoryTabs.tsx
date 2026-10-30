import { Link } from 'react-router-dom'
import { categories } from '../../utils/catalog'
import type { Category } from '../../types/catalog'

export { categories }
export type { Category }

export function CategoryTabs({ selected, onChange, items = categories, allHref = '/produtos' }: {
  selected: Category; onChange: (category: Category) => void; items?: readonly Category[]; allHref?: string
}) {
  return <nav className={`categories${items.length !== categories.length ? ' categories--additional' : ''}`} aria-label="Categorias de produtos"
    style={items.length < categories.length ? { gridTemplateColumns: `repeat(${items.length + 1}, minmax(0, 1fr))` } : undefined}>
    {items.map(category => <button key={category} onClick={() => onChange(category)}
      aria-pressed={selected === category} className={selected === category ? 'is-active' : ''}>{category}</button>)}
    <Link to={allHref} className={selected === 'TODOS' ? 'is-active' : undefined}>VER TODOS</Link>
  </nav>
}
