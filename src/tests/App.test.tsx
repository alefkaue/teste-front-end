import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import fixture from './fixtures/products.json'
import { identifyProduct } from '../utils/products'

const product = identifyProduct(fixture.products[0])
const renderApp = (path = '/') => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockImplementation(async () => new Response(JSON.stringify(fixture))))
})

describe('jornada do catálogo', () => {
  it('mostra loading enquanto a API responde', () => {
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})))
    renderApp()
    expect(screen.getByRole('status')).toHaveTextContent('Carregando produtos')
  })

  it('renderiza os dez produtos, busca por nome e mostra busca vazia', async () => {
    const user = userEvent.setup()
    renderApp('/produtos')
    expect(await screen.findAllByRole('article')).toHaveLength(10)
    await user.type(screen.getByRole('searchbox'), 'mini')
    expect(screen.getAllByRole('article')).toHaveLength(5)
    await user.clear(screen.getByRole('searchbox'))
    await user.type(screen.getByRole('searchbox'), 'não existe')
    expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument()
  })

  it('ordena por menor e maior preço sem modificar os dados originais', async () => {
    const user = userEvent.setup()
    renderApp('/produtos')
    await screen.findAllByRole('article')
    await user.selectOptions(screen.getByRole('combobox'), 'lowest')
    expect(screen.getAllByRole('article')[0]).toHaveAccessibleName('IPHONE 13 MINI 4')
    await user.selectOptions(screen.getByRole('combobox'), 'highest')
    expect(screen.getAllByRole('article')[0]).toHaveAccessibleName('Iphone 11 PRO MAX BRANCO 5')
  })

  it('apresenta erro, permite nova tentativa e recupera a vitrine', async () => {
    const fetch = vi.fn().mockRejectedValueOnce(new Error('Falha de conexão')).mockResolvedValue(new Response(JSON.stringify(fixture)))
    vi.stubGlobal('fetch', fetch)
    const user = userEvent.setup()
    renderApp()
    expect(await screen.findByRole('alert')).toHaveTextContent('Falha de conexão')
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(await screen.findAllByRole('article')).toHaveLength(4)
  })

  it('não inventa produtos para categorias vazias', async () => {
    const user = userEvent.setup()
    renderApp()
    await screen.findAllByRole('article')
    await user.click(screen.getByRole('button', { name: 'TABLETS' }))
    expect(screen.getByText('Nenhum produto nesta categoria')).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('respeita os limites do carrossel', async () => {
    const user = userEvent.setup()
    renderApp()
    await screen.findAllByRole('article')
    const next = screen.getByRole('button', { name: 'Próximos produtos' })
    const previous = screen.getByRole('button', { name: 'Produtos anteriores' })
    expect(previous).toBeDisabled()
    for (let index = 0; index < 6; index++) await user.click(next)
    expect(next).toBeDisabled()
    expect(screen.getAllByRole('article')[0]).toHaveAccessibleName(fixture.products[6].productName)
    await user.click(previous)
    expect(next).toBeEnabled()
  })

  it('abre o produto selecionado no modal, bloqueia o fundo e fecha', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(await screen.findByRole('button', { name: `Comprar ${product.productName}` }))
    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByRole('heading')).toHaveTextContent(product.productName)
    expect(within(dialog).getByText(/15\.000,00/)).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')
    await user.click(within(dialog).getByRole('button', { name: 'Fechar produto' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('permite navegar do modal para os detalhes', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(await screen.findByRole('button', { name: `Comprar ${product.productName}` }))
    await user.click(screen.getByRole('link', { name: 'Ver detalhes' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(product.productName)
    expect(screen.getByRole('button', { name: 'ADICIONAR AO CARRINHO' })).toBeInTheDocument()
  })

  it('substitui uma imagem indisponível por uma mensagem acessível', async () => {
    renderApp()
    const image = (await screen.findAllByRole('img', { name: product.productName }))[0]
    fireEvent.error(image)
    expect(screen.getByRole('img', { name: `Imagem indisponível de ${product.productName}` })).toBeInTheDocument()
  })
})

describe('carrinho e favoritos persistentes', () => {
  it('adiciona duas unidades, restaura após remontagem, recalcula e remove', async () => {
    const user = userEvent.setup()
    const view = renderApp(`/produto/${product.slug}`)
    await user.click(await screen.findByRole('button', { name: 'Aumentar quantidade de produto' }))
    await user.click(screen.getByRole('button', { name: 'ADICIONAR AO CARRINHO' }))
    expect(JSON.parse(localStorage.getItem('econverse:cart:v1')!)).toEqual([{ productId: product.id, quantity: 2 }])
    view.unmount()
    renderApp('/carrinho')
    expect(await screen.findByRole('spinbutton')).toHaveValue(2)
    const summary = screen.getByRole('complementary', { name: 'Resumo do carrinho' })
    expect(summary).toHaveTextContent(/30\.000,00/)
    await user.click(screen.getByRole('button', { name: `Diminuir quantidade de ${product.productName}` }))
    expect(summary).toHaveTextContent(/15\.000,00/)
    await user.click(screen.getByRole('button', { name: `Remover ${product.productName} do carrinho` }))
    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument()
  })

  it('adiciona e remove favoritos com persistência e filtro no catálogo', async () => {
    const user = userEvent.setup()
    const view = renderApp(`/produto/${product.slug}`)
    await user.click(await screen.findByRole('button', { name: 'Adicionar aos favoritos' }))
    expect(screen.getByRole('button', { name: 'Remover dos favoritos' })).toHaveAttribute('aria-pressed', 'true')
    expect(JSON.parse(localStorage.getItem('econverse:favorites:v1')!)).toEqual([product.id])
    view.unmount()
    const catalogue = renderApp('/produtos?favoritos=1')
    expect(await screen.findAllByRole('article')).toHaveLength(1)
    catalogue.unmount()
    renderApp(`/produto/${product.slug}`)
    await user.click(await screen.findByRole('button', { name: 'Remover dos favoritos' }))
    expect(JSON.parse(localStorage.getItem('econverse:favorites:v1')!)).toEqual([])
  })

  it('trata dados de localStorage corrompidos sem quebrar a aplicação', async () => {
    localStorage.setItem('econverse:cart:v1', '{inválido')
    localStorage.setItem('econverse:favorites:v1', '[42]')
    renderApp('/carrinho')
    expect(await screen.findByText('Seu carrinho está vazio')).toBeInTheDocument()
  })
})
