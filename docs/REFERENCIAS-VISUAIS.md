# Referências e revisão visual

## Referência da versão atual

Esta versão implementa a página completa em azul e amarelo do [Figma original](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1) e da [cópia disponibilizada](https://www.figma.com/design/8sb81wsImNxDHlD1C6IK3U/Untitled?node-id=0-1).

A revisão foi feita usando o projeto [Yuurih44/teste-front-end](https://github.com/Yuurih44/teste-front-end), indicado pelo usuário, e a [versão oficial executável](https://yuurih44.github.io/teste-front-end/?versao=teste). A vitrine rosa isolada deixou de ser a referência principal. A página contém cabeçalho, banner, departamentos, três vitrines, dois conjuntos de parceiros, marcas, newsletter e rodapé.

Não houve acesso ao Dev Mode do Figma. As medidas abaixo foram conferidas no navegador da referência executável e comparadas com esta aplicação, na mesma largura de 1440 px. Isso não equivale a inspecionar as propriedades originais do arquivo Figma. Consulte os [créditos dos assets](CREDITOS-VISUAIS.md).

## Comparação em 1440 px

| Elemento | Referência executável | Implementação |
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

Capturas adicionais estão em [screenshots](screenshots/) para 1834, 1024, 768 e 375 px, além de catálogo e detalhes. Foram geradas da aplicação com os dados oficiais. O script aguarda as fontes e a decodificação das imagens visíveis antes de capturar.

Para reproduzir, mantenha `npm run dev` aberto e execute `npm run screenshots` em outro terminal. `CAPTURE_URL` pode apontar para outra porta; `PLAYWRIGHT_CHANNEL` seleciona o navegador instalado.
