import { useEffect } from 'react'

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | Econverse`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
