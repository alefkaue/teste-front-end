import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/teste-front-end/' : '/',
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        main: 'index.html',
        expanded: 'ampliada/index.html',
      },
    },
  },
  server: {
    proxy: {
      '/api/produtos.json': {
        target: 'https://app.econverse.com.br',
        changeOrigin: true,
        rewrite: () => '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json',
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    clearMocks: true,
  },
}))
