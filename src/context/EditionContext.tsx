import { createContext, useContext } from 'react'

export const EditionContext = createContext(false)
export const useExpandedEdition = () => useContext(EditionContext)
