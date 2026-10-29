import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { CartItem } from '../types/product'
import { clampQuantity } from '../utils/products'

const isCart = (value: unknown): value is CartItem[] => Array.isArray(value) && value.every(item =>
  typeof item === 'object' && item !== null && typeof item.productId === 'string' &&
  Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 99) &&
  new Set(value.map(item => item.productId)).size === value.length
const isFavorites = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(item => typeof item === 'string')

interface CommerceState {
  cart: CartItem[]
  favorites: string[]
  addToCart: (id: string, quantity: number) => void
  setQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  toggleFavorite: (id: string) => void
  storageUnavailable: boolean
}

const CommerceContext = createContext<CommerceState | null>(null)

export function CommerceProvider({ children }: { children: ReactNode }) {
  const [cart, setCart, cartStorageUnavailable] = useLocalStorage('econverse:cart:v1', [], isCart)
  const [favorites, setFavorites, favoritesStorageUnavailable] = useLocalStorage('econverse:favorites:v1', [], isFavorites)

  function addToCart(id: string, quantity: number) {
    setCart(current => {
      const existing = current.find(item => item.productId === id)
      return existing
        ? current.map(item => item.productId === id ? { ...item, quantity: clampQuantity(item.quantity + quantity) } : item)
        : [...current, { productId: id, quantity: clampQuantity(quantity) }]
    })
  }

  return <CommerceContext.Provider value={{
    cart, favorites, addToCart,
    setQuantity: (id, quantity) => setCart(current => current.map(item => item.productId === id ? { ...item, quantity: clampQuantity(quantity) } : item)),
    removeFromCart: id => setCart(current => current.filter(item => item.productId !== id)),
    toggleFavorite: id => setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]),
    storageUnavailable: cartStorageUnavailable || favoritesStorageUnavailable,
  }}>{children}</CommerceContext.Provider>
}

export function useCommerce() {
  const context = useContext(CommerceContext)
  if (!context) throw new Error('useCommerce deve ser usado dentro de CommerceProvider')
  return context
}
