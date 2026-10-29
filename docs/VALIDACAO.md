# Validação da entrega

Verificação local em 29/10/2026, Windows, Node 24.19.0 e Microsoft Edge (Chromium). Os E2E usam o build de produção servido pelo Vite Preview.

| Verificação | Resultado |
| --- | --- |
| Vitest + React Testing Library | 31 testes aprovados |
| Playwright sobre o build | 14 testes aprovados |
| TypeScript strict e build Vite | Aprovados |
| JSON de produção comparado à API oficial | Dados iguais no teste E2E |
| Revisão visual | Capturas reais em seis larguras |
| Overflow horizontal | Ausente nos fluxos verificados em 1440, 1024, 768, 390 e 375 px |

## Cobertura funcional

- API: dez produtos, preços originais, IDs estáveis, erros HTTP, respostas inválidas e cancelamento.
- Loading, nova tentativa e fallback de imagem.
- Carrossel: avanço, retorno, limites, quantidade de cards e setas do teclado.
- Modal: dados corretos, fechamento pelo botão, Escape e fundo; bloqueio de scroll; circulação e restauração do foco.
- Detalhes: navegação, acesso direto e atualização da rota.
- Catálogo: busca, ordenação, favoritos e categorias vazias.
- Carrinho: adição, quantidades, subtotal, remoção e estado vazio.
- Persistência: carrinho e favoritos após reload; dados locais corrompidos.
- Responsividade: vitrine, modal, detalhes, catálogo e carrinho em cinco larguras.
- Página completa: cabeçalho, banner, departamentos, três vitrines, parceiros, marcas, newsletter e rodapé.
- Medidas em 1440 px: banner em y=144 com 390 px de altura; primeiro card em x=84, y=947 e altura de 500 px.
- Busca global, departamentos vazios, retorno pelo VER TODOS e validação da newsletter sem persistir dados pessoais.

O teste da API depende da disponibilidade externa da Econverse. Os testes unitários usam uma fixture obtida do JSON oficial em 29/10/2026, isolada em `src/tests/fixtures`; ela não é importada pela aplicação.

Configurações de fallback SPA para Vercel e Netlify estão incluídas, mas não foram verificadas em um deploy. Não houve teste em Safari/Firefox ou aparelhos físicos. A consulta ao Figma se limitou à prévia pública. A CI executa instalação, testes, build e E2E em Linux/Chromium.
