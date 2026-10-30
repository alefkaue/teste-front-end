import { createHash } from 'node:crypto'
import { expect, test, type Page } from '@playwright/test'

async function readyHome(page: Page) {
  await expect(page.getByRole('region', { name: 'Vitrine de produtos', exact: true }).getByRole('article')).toHaveCount(page.viewportSize()!.width < 600 ? 1 : 4)
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all([...document.images].filter(image => image.loading !== 'lazy').map(image => image.decode()))
  })
}

for (const width of [1440, 390]) {
  test(`a tela inicial das duas versões tem os mesmos pixels em ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width === 1440 ? 1490 : 844 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await readyHome(page)
    const original = await page.screenshot({ fullPage: true })
    await page.goto('/ampliada/')
    await readyHome(page)
    const expanded = await page.screenshot({ fullPage: true })
    const hash = (buffer: Buffer) => createHash('sha256').update(buffer).digest('hex')
    if (hash(original) !== hash(expanded)) {
      await testInfo.attach('original', { body: original, contentType: 'image/png' })
      await testInfo.attach('ampliada', { body: expanded, contentType: 'image/png' })
    }
    expect(hash(expanded)).toBe(hash(original))
  })
}

test('catálogo ampliado, novas abas e lançamentos preservam o catálogo original', async ({ page }) => {
  await page.goto('/ampliada/#/produtos')
  await expect(page.getByRole('article')).toHaveCount(61)
  await page.getByRole('button', { name: 'ÁUDIO', exact: true }).click()
  await expect(page.getByRole('article')).toHaveCount(4)
  await page.getByRole('button', { name: 'RELÓGIOS', exact: true }).click()
  await expect(page.getByRole('article')).toHaveCount(4)
  await page.getByRole('navigation', { name: 'Departamentos', exact: true }).getByRole('link', { name: 'LANÇAMENTOS' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Novos produtos')
  await expect(page.getByRole('article')).toHaveCount(51)
  await page.goto('/produtos')
  await expect(page.getByRole('article')).toHaveCount(10)
  await expect(page.getByRole('button', { name: 'ÁUDIO', exact: true })).toHaveCount(0)
})

for (const [department, name, count] of [
  ['tecnologia', 'Tecnologia', 33], ['supermercado', 'Supermercado', 4], ['bebidas', 'Bebidas', 4],
  ['ferramentas', 'Ferramentas', 4], ['saude', 'Saúde', 4], ['esportes', 'Esportes e Fitness', 4],
  ['moda', 'Moda', 4], ['livros', 'Livros', 4],
] as const) {
  test(`nova tela de ${name} funciona e mantém o layout em telas pequenas`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`/ampliada/#/departamento/${department}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(name)
    await expect(page.getByRole('article')).toHaveCount(count)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.getByRole('button', { name: /^Comprar / }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.getByRole('link', { name: 'Ver detalhes', exact: true }).click()
    expect((await page.reload())?.status()).toBe(200)
    await expect(page.getByRole('button', { name: 'ADICIONAR AO CARRINHO', exact: true })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

test('novos produtos usam modal, detalhes, carrinho e favoritos sem misturar as versões', async ({ page }) => {
  await page.goto('/ampliada/#/departamento/supermercado')
  await page.getByRole('button', { name: 'Comprar Maçãs', exact: true }).click()
  await expect(page.getByRole('dialog').getByRole('heading')).toHaveText('Maçãs')
  await page.getByRole('link', { name: 'Ver detalhes', exact: true }).click()
  await page.getByRole('button', { name: 'Adicionar aos favoritos', exact: true }).click()
  await page.getByRole('button', { name: 'Aumentar quantidade de produto', exact: true }).click()
  await page.getByRole('button', { name: 'ADICIONAR AO CARRINHO', exact: true }).click()
  await page.getByRole('link', { name: 'Carrinho (2)', exact: true }).click()
  await expect(page).toHaveURL(/ampliada\/#\/carrinho$/)
  await page.reload()
  await expect(page.getByRole('spinbutton')).toHaveValue('2')
  await expect(page.getByRole('complementary')).toContainText('15,80')
  await page.getByRole('link', { name: 'Favoritos', exact: true }).click()
  await expect(page.getByRole('article')).toHaveCount(1)
  await page.goto('/carrinho')
  await expect(page.getByText('Seu carrinho está vazio', { exact: true })).toBeVisible()
})

test('as 51 imagens complementares estão disponíveis e podem ser decodificadas', async ({ page }) => {
  await page.goto('/ampliada/#/produtos')
  await expect(page.getByRole('article')).toHaveCount(61)
  const images = await page.locator('.product-card img').evaluateAll(elements =>
    elements.map(element => (element as HTMLImageElement).src).filter(src => src.includes('/images/additional/')))
  expect(new Set(images).size).toBe(51)
  await page.evaluate(async sources => {
    await Promise.all(sources.map(async src => {
      const image = new Image()
      image.src = src
      await image.decode()
    }))
  }, images)
})
