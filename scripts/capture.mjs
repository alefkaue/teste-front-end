import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

await mkdir('docs/screenshots', { recursive: true })
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || (process.platform === 'win32' ? 'msedge' : undefined) })
const page = await browser.newPage()
const base = process.env.CAPTURE_URL || 'http://127.0.0.1:5173'
for (const width of [1834, 1440, 1024, 768, 390, 375]) {
  await page.setViewportSize({ width, height: width >= 1440 ? 900 : 844 })
  await page.goto(base)
  await page.getByRole('button', { name: /^Comprar / }).first().waitFor()
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all([...document.images].filter(image => image.loading !== 'lazy').map(image => image.decode().catch(() => {})))
  })
  await page.screenshot({ path: `docs/screenshots/vitrine-${width}.png`, fullPage: true })
  console.log(`${width}px`, await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth,
    cards: [...document.querySelectorAll('.carousel__slide:not([inert])')].map(el => {
      const rect = el.getBoundingClientRect()
      return { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) }
    }),
  })))
}
await page.setViewportSize({ width: 1440, height: 900 })
await page.goto(base)
await page.getByRole('button', { name: /^Comprar / }).first().click()
await page.getByRole('dialog').waitFor()
await page.screenshot({ path: 'docs/screenshots/modal-desktop.png', fullPage: true })
await page.getByRole('link', { name: 'Ver detalhes', exact: true }).click()
await page.screenshot({ path: 'docs/screenshots/produto-desktop.png', fullPage: true })
await page.goto(`${base}/produtos`)
await page.getByText('10 produtos encontrados', { exact: true }).waitFor()
await page.screenshot({ path: 'docs/screenshots/catalogo-desktop.png', fullPage: true })
await browser.close()
