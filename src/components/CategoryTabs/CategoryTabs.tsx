import { Link } from 'react-router-dom'

export const categories = ['CELULAR', 'ACESSÓRIOS', 'TABLETS', 'NOTEBOOKS', 'TVS'] as const
export type Category = typeof categories[number]

export function CategoryTabs({ selected, onChange }: { selected: Category; onChange: (category: Category) => void }) {
  return <nav className="categories" aria-label="Categorias de produtos">
    {categories.map(category => <button key={category} onClick={() => onChange(category)}
      aria-pressed={selected === category} className={selected === category ? 'is-active' : ''}>{category}</button>)}
    <Link to="/produtos">VER TODOS</Link>
  </nav>
}
