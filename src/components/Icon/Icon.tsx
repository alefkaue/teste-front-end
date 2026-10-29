import type { ReactNode } from 'react'

const drawings: Record<string, ReactNode> = {
  search: <><circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5 5" /></>,
  heart: <path d="M20.8 4.8a5.6 5.6 0 0 0-8 .1L12 6l-.8-1.1a5.6 5.6 0 0 0-8-.1c-2.3 2.3-2.3 6 0 8.3L12 22l8.8-8.9c2.3-2.3 2.3-6 0-8.3Z" />,
  cart: <><path d="M2 3h3l3 13h12l2-10H6M9 20h.01M19 20h.01" /><circle cx="9" cy="20" r="1" /><circle cx="19" cy="20" r="1" /></>,
  user: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="9" r="3" /><path d="M5 19c1-6 13-6 14 0" /></>,
  box: <><path d="M3 8h18v13H3zM3 8l3-6h12l3 6M12 2v6M7 14h9m-9 0 3-3m-3 3 3 3" /></>,
  shield: <><path d="M5 3h14v9c0 5-7 9-7 9s-7-4-7-9zM8 11l3 3 5-6" /></>,
  truck: <><path d="M2 5h12v12H2zM14 9h4l4 5v3h-8" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
  card: <><rect x="2" y="5" width="20" height="14" rx="1" /><path d="M2 10h20M5 15h5" /></>,
  crown: <path d="m2 6 5 5 5-8 5 8 5-5-3 15H5z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  facebook: <path d="M14 22V13h3l1-4h-4V6c0-1 1-2 3-2V1h-3c-3 0-5 2-5 5v3H6v4h3v9" />,
  linkedin: <><path d="M3 9h4v12H3zM11 21V9h4v2c4-4 6-1 6 3v7h-4v-7c0-2-2-2-2 0v7M5 3v1" /></>,
}

export function Icon({ name, size = 24 }: { name: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{drawings[name]}</svg>
}
