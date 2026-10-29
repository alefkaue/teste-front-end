import { describe, expect, it, vi } from 'vitest'
import { fetchProducts } from '../services/products'
import { identifyProduct, formatPrice, clampQuantity } from '../utils/products'
import fixture from './fixtures/products.json'

describe('API oficial de produtos', () => {
  it('converte os dez produtos, mantendo os dados e preços originais', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify(fixture)))
    vi.stubGlobal('fetch', fetch)
    const controller = new AbortController()
    const products = await fetchProducts(controller.signal)
    expect(products).toHaveLength(10)
    expect(new Set(products.map(product => product.id)).size).toBe(10)
    expect(products.map(product => product.price)).toEqual(fixture.products.map(product => product.price))
    expect(fetch).toHaveBeenCalledWith('/api/produtos.json', { signal: controller.signal })
  })

  it.each([
    { success: false, products: [] },
    { success: true, products: [{ ...fixture.products[0], price: '15000' }] },
    { success: true, products: [{ ...fixture.products[0], price: -1 }] },
    { success: true, products: [fixture.products[0], fixture.products[0]] },
    { success: true, products: [null] },
    null,
  ])('rejeita uma resposta inválida: %j', async response => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(response))))
    await expect(fetchProducts()).rejects.toThrow()
  })

  it('expõe uma falha HTTP para permitir nova tentativa na interface', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 503 })))
    await expect(fetchProducts()).rejects.toThrow('Tente novamente')
  })

  it('propaga cancelamentos', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new DOMException('Aborted', 'AbortError')))
    await expect(fetchProducts()).rejects.toMatchObject({ name: 'AbortError' })
  })
})

describe('identidade e valores', () => {
  it('mantém o identificador e o slug após uma alteração de preço', () => {
    const original = identifyProduct(fixture.products[0])
    const changed = identifyProduct({ ...fixture.products[0], price: 42 })
    expect(changed.id).toBe(original.id)
    expect(changed.slug).toBe(original.slug)
    expect(changed.slug).toMatch(/^iphone-11-pro-max-branco-1-/)
  })

  it('formata o valor da API em reais, sem reinterpretá-lo como centavos', () => {
    expect(formatPrice(15000).replace(/\s/g, ' ')).toBe('R$ 15.000,00')
    expect(formatPrice(520).replace(/\s/g, ' ')).toBe('R$ 520,00')
  })

  it.each([[0, 1], [-5, 1], [1000, 99], [2.8, 2], [NaN, 1]])('limita quantidade %s para %s', (input, expected) => {
    expect(clampQuantity(input)).toBe(expected)
  })
})
