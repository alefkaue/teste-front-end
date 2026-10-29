import { mkdir, writeFile } from 'node:fs/promises'

const url = 'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'
const response = await fetch(url, { signal: AbortSignal.timeout(20_000) })
if (!response.ok) throw new Error(`API Econverse: HTTP ${response.status}`)
const data = await response.json()
if (data.success !== true || !Array.isArray(data.products) || !data.products.length ||
  !data.products.every(product => typeof product.productName === 'string' &&
    typeof product.descriptionShort === 'string' && typeof product.photo === 'string' &&
    Number.isFinite(product.price) && product.price >= 0)) {
  throw new Error('A API Econverse retornou dados inválidos. O build foi interrompido.')
}
await mkdir('public/data', { recursive: true })
await writeFile('public/data/produtos.json', `${JSON.stringify(data, null, 2)}\n`)
await writeFile('public/data/origem.json', `${JSON.stringify({ url, retrievedAt: new Date().toISOString() }, null, 2)}\n`)
console.log(`${data.products.length} produtos obtidos da API oficial da Econverse.`)
