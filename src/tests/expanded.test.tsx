import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import fixture from './fixtures/products.json'
import { additionalProducts } from '../data/additionalProducts'

const renderEdition = (path: string, expanded = true) => render(<MemoryRouter initialEntries={[path]}><App expanded={expanded} /></MemoryRouter>)

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockImplementation(async () => new Response(JSON.stringify(fixture))))
})

describe('versão ampliada separada', () => {
  it('mantém os dez produtos oficiais na tela inicial e acrescenta o catálogo separado', async () => {
    const view = renderEdition('/')
    const showcase = within(await screen.findByRole('region', { name: 'Vitrine de produtos' }))
    expect(showcase.getAllByRole('article')).toHaveLength(4)
    expect(showcase.getAllByRole('article')[0]).toHaveAccessibleName(fixture.products[0].productName)
    view.unmount()
    renderEdition('/produtos')
    expect(await screen.findAllByRole('article')).toHaveLength(61)
    expect(additionalProducts).toHaveLength(51)
  })

  it('as novas abas de áudio e relógios filtram os produtos complementares', async () => {
    const user = userEvent.setup()
    renderEdition('/produtos')
    await screen.findAllByRole('article')
    await user.click(screen.getByRole('button', { name: 'ÁUDIO' }))
    expect(screen.getAllByRole('article')).toHaveLength(4)
    expect(screen.getByRole('article', { name: 'Apple AirPods' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'RELÓGIOS' }))
    expect(screen.getAllByRole('article')).toHaveLength(4)
    expect(screen.getByRole('article', { name: 'Apple Watch Series 4 dourado' })).toBeInTheDocument()
  })

  it('apresenta o novo departamento com os mesmos cards e modal', async () => {
    const user = userEvent.setup()
    renderEdition('/departamento/supermercado')
    expect(await screen.findAllByRole('article')).toHaveLength(4)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Supermercado')
    await user.click(screen.getByRole('button', { name: 'Comprar Maçãs' }))
    expect(within(screen.getByRole('dialog')).getByRole('heading')).toHaveTextContent('Maçãs')
    expect(within(screen.getByRole('dialog')).getByText(/catálogo complementar demonstrativo/)).toBeInTheDocument()
  })

  it('a tela de novos produtos não reapresenta os itens da API como adicionais', async () => {
    renderEdition('/lancamentos')
    expect(await screen.findAllByRole('article')).toHaveLength(51)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Novos produtos')
    expect(screen.queryByRole('article', { name: fixture.products[0].productName })).not.toBeInTheDocument()
  })

  it('a versão original continua com dez itens e sem as novas abas', async () => {
    renderEdition('/produtos', false)
    expect(await screen.findAllByRole('article')).toHaveLength(10)
    expect(screen.queryByRole('button', { name: 'ÁUDIO' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'RELÓGIOS' })).not.toBeInTheDocument()
  })

  it('o carrinho e os favoritos adicionais não alteram os dados salvos da versão original', async () => {
    const user = userEvent.setup()
    const product = additionalProducts[0]
    const view = renderEdition(`/produto/${product.slug}`)
    await user.click(await screen.findByRole('button', { name: 'ADICIONAR AO CARRINHO' }))
    await user.click(screen.getByRole('button', { name: 'Adicionar aos favoritos' }))
    expect(JSON.parse(localStorage.getItem('econverse:expanded:cart:v1')!)).toEqual([{ productId: product.id, quantity: 1 }])
    expect(JSON.parse(localStorage.getItem('econverse:expanded:favorites:v1')!)).toEqual([product.id])
    expect(localStorage.getItem('econverse:cart:v1')).toBeNull()
    view.unmount()
    renderEdition('/carrinho', false)
    expect(await screen.findByText('Seu carrinho está vazio')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('econverse:favorites:v1')!)).toEqual([])
  })
})
