# Referências e revisão visual

## Referência da versão atual

O material principal é o [Figma oficial da Econverse](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1). A aplicação adota a página completa em azul e amarelo apresentada nesse protótipo. A [cópia disponibilizada](https://www.figma.com/design/8sb81wsImNxDHlD1C6IK3U/Untitled?node-id=0-1) também foi consultada.

Na implementação, o projeto [Yuurih44/teste-front-end](https://github.com/Yuurih44/teste-front-end) e sua [demonstração](https://yuurih44.github.io/teste-front-end/?versao=teste) foram usados como referência auxiliar. Essa participação está preservada nos [créditos dos assets](CREDITOS-VISUAIS.md). A comparação com outra solução não substitui a avaliação frente ao material da empresa.

## Conferência direta do material oficial

Na revisão da documentação, foi possível abrir o [protótipo oficial](https://www.figma.com/proto/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=1-1248&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A1248) no navegador e examinar os dois frames públicos: a página inicial e o modal, este no nó `12730:2`. Não houve acesso ao Dev Mode ou às propriedades dos nós.

A conferência visual confirmou, no material da empresa, a identidade azul e amarela, o cabeçalho, o banner, os departamentos, quatro cards visíveis e a composição do modal com imagem à esquerda, informações à direita, quantidade e botão amarelo. Essas características não foram validadas apenas pela implementação de outro candidato.

Há ressalvas de fidelidade que permanecem nesta entrega:

- **Materiais oficiais diferentes:** a [imagem isolada da vitrine](https://app.econverse.com.br/teste-front-end/junior/tecnologia/layout/vitrine-produtos.png), também preservada em [referencia-vitrine.png](referencia-vitrine.png), usa rosa e cards maiores; o Figma oficial usa azul. A aplicação segue o Figma completo, portanto não reproduz literalmente a imagem rosa. O impacto é visual, e a escolha da referência precisa ser considerada na avaliação.
- **Textos comerciais:** o Figma contém desconto de 50%, frete grátis, preço anterior e parcelamento ilustrativos. A aplicação omite essas condições ou usa textos neutros, porque a API não as informa. A estrutura é mantida, mas o conteúdo e a densidade dos cards diferem.
- **Detalhes visuais:** há diferenças no enquadramento e na tonalidade do banner, nos traços dos ícones e em detalhes de altura, alinhamento e linhas junto à imagem do modal. A correspondência não foi certificada como pixel a pixel.
- **Ação complementar do modal:** a aplicação oferece acesso à página do produto e transporta a quantidade selecionada. Essa navegação é uma extensão funcional da experiência representada no protótipo.

Esses pontos foram documentados sem alterar componentes, estilos ou comportamento nesta revisão. Os requisitos funcionais foram verificados separadamente; isso não elimina as ressalvas visuais acima.

## Registro da comparação auxiliar

As medidas abaixo foram obtidas anteriormente no navegador da referência auxiliar, na mesma largura de 1440 px. Elas são mantidas como registro técnico e **não representam medidas extraídas do Figma oficial**.

## Comparação em 1440 px

| Elemento | Referência auxiliar | Implementação |
| --- | --- | --- |
| Área principal do cabeçalho | x=80, y=32, 1280 × 72 px | Igual |
| Banner | y=144, 1440 × 390 px | Igual |
| Título do banner | x=80, y=222, 48 px, peso 600 | Igual |
| Departamentos | x=80, y=534, 1280 × 210 px | Igual |
| Primeira seção de produtos | x=80, y=833, 1280 × 634 px | Igual |
| Primeiro card | x=84, y=947, ~305 × 500 px | Igual |
| Primeiro conjunto de parceiros | x=80, y=1538, 1280 × 350 px | Igual |
| Marcas | y=3103 px | y=3104 px |
| Newsletter | y=4185 px, altura 162 px | y=4187 px, altura 162 px |
| Cor principal / amarelo / roxo | `#3442b5` / `#f7ca11` / `#271c47` | Iguais |

As coordenadas registram o estado com produtos carregados e fontes locais disponíveis. Os cards apresentam quatro itens por vitrine no desktop, três em 1024 px, dois em 768 px e um em 390/375 px. Cada vitrine tem navegação independente.

## Diferenças conhecidas

- O banner mantém a composição visual, mas usa “Confira nossos produtos” no lugar do desconto ilustrativo de 50%, ausente da fonte de produtos.
- O cabeçalho não afirma frete grátis ou parcelamento sem condições informadas pela API.
- Nos cards, nomes, descrições, fotos e preços vêm do JSON oficial. Não são inventados preço anterior, frete, desconto ou parcelamento. As áreas correspondentes ficam livres.
- As imagens de produto são as da API, de resolução limitada.
- O modal segue a composição com imagem à esquerda, dados à direita, quantidade e ação amarela. COMPRAR nele segue para os detalhes com a quantidade selecionada; a adição ao carrinho continua na página individual.
- Os ícones de interface foram desenhados em SVG; podem existir pequenas diferenças de traço em relação ao Figma.
- Newsletter, conta e conteúdo institucional são demonstrativos, sem envio de dados ou serviços externos.
- Não há alegação de reprodução 100% pixel a pixel ou validação em Safari/Firefox e aparelhos físicos.

## Capturas reais

[Início desktop](screenshots/inicio-desktop.png) · [Página completa desktop](screenshots/vitrine-1440.png) · [Mobile](screenshots/vitrine-390.png) · [Modal](screenshots/modal-desktop.png)

A [prévia do README](screenshots/preview-desktop.png) foi capturada em 1440 × 1490 px para mostrar o cabeçalho, o banner e a primeira vitrine em uma única imagem.

Capturas adicionais estão em [screenshots](screenshots/) para 1834, 1024, 768 e 375 px, além de catálogo e detalhes. Foram geradas da aplicação com os dados oficiais. O script aguarda as fontes e a decodificação das imagens visíveis antes de capturar.

Para reproduzir, mantenha `npm run dev` aberto e execute `npm run screenshots` em outro terminal. `CAPTURE_URL` pode apontar para outra porta; `PLAYWRIGHT_CHANNEL` seleciona o navegador instalado.
