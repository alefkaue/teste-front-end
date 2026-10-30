# Notas técnicas

Este documento reúne os detalhes de execução e implementação que complementam o README.

## Produtos e CORS

A fonte é o [JSON oficial da Econverse](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json). O endpoint não envia `Access-Control-Allow-Origin` nas respostas verificadas, bloqueando a consulta direta de outro domínio no navegador.

- Em desenvolvimento, o serviço consulta `/api/produtos.json`, encaminhado à API oficial pelo proxy do Vite.
- Antes de `dev` e `build`, `scripts/sync-products.mjs` baixa e valida o JSON. Se a fonte falhar, o comando é interrompido.
- Em produção estática, a Fetch API carrega `/data/produtos.json`, gerado pelo build. `/data/origem.json` registra a fonte e a data da consulta. Um novo build atualiza o catálogo.

Os arquivos gerados não são versionados. A fixture em `src/tests/fixtures` é usada apenas nos testes, sem participar dos dados da aplicação.

Os preços são exibidos em reais com `Intl.NumberFormat`, sem dividir os valores por 100. Não há informação de centavos, preço anterior, frete, estoque ou parcelamento no contrato da API. Categorias e departamentos sem produtos exibem um estado vazio.

## Identificadores e persistência

O JSON não fornece IDs. O projeto calcula identificadores e slugs determinísticos a partir do nome, da descrição e da imagem. A identidade não depende do índice, de valores aleatórios ou do preço.

Carrinho e favoritos usam `localStorage`, com validação dos dados recuperados. As quantidades ficam entre 1 e 99. Quando o navegador bloqueia o armazenamento, a aplicação funciona em memória e informa a limitação.

Newsletter, conta e áreas institucionais são demonstrativas. O formulário da newsletter valida os campos sem enviar ou persistir inscrições. Não há autenticação, checkout ou pagamento.

## Organização

```text
src/
  components/   # Componentes compartilhados e seções da página
  context/      # Produtos, modal, carrinho e favoritos
  hooks/        # Persistência local e metadados
  pages/        # Início, catálogo, detalhes e carrinho
  services/     # Consulta e validação da API
  styles/       # SCSS e tokens visuais
  tests/        # Testes de integração, serviço e fixture
  types/        # Contratos de dados
  utils/        # Identificadores, preços, busca e quantidades
e2e/            # Fluxos no navegador
scripts/        # Sincronização da API e capturas
docs/           # Referências, créditos e validação
```

As dependências de execução são React, React DOM e React Router. O carrossel usa CSS e estado React, e os diálogos usam `<dialog>` nativo. Os metadados são atualizados no cliente, sem renderização no servidor.

## Validação e publicação

Os comandos e a cobertura estão em [VALIDACAO.md](VALIDACAO.md). `npm run test:watch` inicia o Vitest em modo de observação. Com o servidor de desenvolvimento aberto, `npm run screenshots` gera as capturas; `CAPTURE_URL` permite selecionar outra porta.

O Playwright usa Edge no Windows e Chromium nos demais sistemas. A variável `PLAYWRIGHT_CHANNEL` seleciona outro canal instalado. A CI do GitHub executa instalação, testes, build e E2E em Linux.

O código é entregue na branch `main` do fork, com publicação automática no [GitHub Pages](https://alefkaue.github.io/teste-front-end/) pelo workflow `deploy-pages.yml`. O build para essa hospedagem usa `npm run build:pages`, com base `/teste-front-end/` e rotas por hash, como `/teste-front-end/#/produtos`. Assim, os links internos também funcionam ao atualizar a aba. A execução local mantém as rotas convencionais e os comandos do README.

Para conferir esse build localmente, use `npm run build:pages` e `npm run preview -- --mode pages`; o Vite informa a URL com `/teste-front-end/`. O catálogo é obtido do endpoint oficial durante a publicação e servido junto aos arquivos estáticos. Não houve deploy em Vercel ou Netlify; suas configurações de fallback permanecem disponíveis.

As imagens de produtos dependem do servidor oficial. A interface foi verificada em Edge/Chromium; Safari, Firefox e aparelhos físicos não foram avaliados.

## Versões da aplicação

A entrada principal continua usando somente os produtos oficiais. A entrada `/ampliada/` ativa o catálogo complementar com as mesmas rotas, componentes e estilos, além das telas de departamentos e lançamentos. Os detalhes e as verificações de preservação visual estão em [VERSAO-AMPLIADA.md](VERSAO-AMPLIADA.md).
