import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, fallback: T, validate: (value: unknown) => value is T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(key) ?? 'null')
      return validate(stored) ? stored : fallback
    } catch { return fallback }
  })
  const [storageUnavailable, setStorageUnavailable] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) }
    catch { setStorageUnavailable(true) }
  }, [key, value])

  return [value, setValue, storageUnavailable] as const
}
