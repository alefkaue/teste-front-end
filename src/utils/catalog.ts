import type { Category, DepartmentId } from '../types/catalog'
import type { Product } from '../types/product'

export const categories = ['CELULAR', 'ACESSÓRIOS', 'TABLETS', 'NOTEBOOKS', 'TVS'] as const
export const expandedTechnologyCategories: readonly Category[] = [...categories, 'ÁUDIO', 'RELÓGIOS']

export const departments: { id: DepartmentId; name: string; categories: readonly Category[] }[] = [
  { id: 'tecnologia', name: 'Tecnologia', categories: expandedTechnologyCategories },
  { id: 'supermercado', name: 'Supermercado', categories: ['ALIMENTOS'] },
  { id: 'bebidas', name: 'Bebidas', categories: ['BEBIDAS'] },
  { id: 'ferramentas', name: 'Ferramentas', categories: ['FERRAMENTAS'] },
  { id: 'saude', name: 'Saúde', categories: ['CUIDADOS'] },
  { id: 'esportes', name: 'Esportes e Fitness', categories: ['ESPORTES'] },
  { id: 'moda', name: 'Moda', categories: ['ROUPAS'] },
  { id: 'livros', name: 'Livros', categories: ['LIVROS'] },
]

export const productDepartment = (product: Product): DepartmentId => product.department ?? 'tecnologia'
export const productCategory = (product: Product): Category => product.category ?? 'CELULAR'
export const findDepartment = (id: string | null | undefined) => departments.find(department => department.id === id)
