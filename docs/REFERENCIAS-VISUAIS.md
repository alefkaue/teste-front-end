# Referências e revisão visual

## Fontes consultadas

- [Imagem oficial da vitrine](https://app.econverse.com.br/teste-front-end/junior/tecnologia/layout/vitrine-produtos.png), preservada em [referencia-vitrine.png](referencia-vitrine.png).
- [Figma original](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1).
- [Cópia do Figma](https://www.figma.com/design/8sb81wsImNxDHlD1C6IK3U/Untitled?node-id=0-1): prévia pública consultada, incluindo a composição do modal.

Não houve acesso ao Dev Mode ou às propriedades dos nós. Fonte, dimensões, sombra e espaçamentos foram estimados a partir da imagem. A prévia da cópia contém uma página maior com azul e amarelo; a referência principal adotada foi a vitrine rosa explicitamente indicada. A página completa de marketing da prévia não faz parte desta entrega.

## Medidas

A imagem oficial tem 1834 × 874 px. Valores aproximados, comparados com a aplicação em Microsoft Edge na mesma largura:

| Elemento | Referência estimada | Implementação medida |
| --- | --- | --- |
| Cards visíveis | 4 | 4 |
| Card | 350 × 646 px | 351 × 646 px |
| Primeiro card | x=99, y=167 px | x=98, y=168 px |
| Espaço entre cards | 78–80 px | 78 px |
| Título | Poppins, ~38 px, negrito | Poppins, 38 px, 700 |
| Categorias | ~52 px de altura | 52 px |
| Botão | ~317 × 57 px | ~317 × 57 px |
| Cor principal | RGB(247, 25, 99), amostra do botão | `#f71963` |
| Raio do card | ~14 px | 14 px |

Em 1440 px há quatro cards de cerca de 276 × 508 px. Em 1024, 768 e 390/375 px são exibidos três, dois e um card, respectivamente. A adaptação usa breakpoints, sem reduzir proporcionalmente a página inteira.

## Diferenças e limites

- Nomes, descrições e preços vêm do JSON e diferem do conteúdo ilustrativo da imagem.
- Não há preço anterior, desconto, parcelamento ou frete na API. Essas linhas não foram inventadas. A altura do card e as posições aproximadas de preço e botão são preservadas com espaço livre.
- A imagem disponibilizada pela API tem resolução limitada; sua ampliação não aumenta a nitidez.
- A seta anterior aparece mais clara quando desabilitada para comunicar o início do carrossel.
- A navegação complementar fica abaixo da vitrine; favoritos e carrinho ficam fora dos cards.
- O modal segue a composição observável da prévia, com imagem à esquerda e informações à direita. Cores seguem a vitrine rosa. Suas medidas exatas não puderam ser inspecionadas.
- Houve revisão visual, sem alegação de reprodução 100% pixel a pixel. Safari/Firefox e aparelhos físicos não foram verificados.

## Capturas reais

As imagens em [screenshots](screenshots/) foram geradas da aplicação funcionando por `npm run screenshots`. Há capturas da vitrine em 1834, 1440, 1024, 768, 390 e 375 px, além do modal, detalhes e catálogo.

Para reproduzir, mantenha `npm run dev` aberto e execute `npm run screenshots` em outro terminal. O script usa Edge no Windows e Chromium nos demais sistemas. `PLAYWRIGHT_CHANNEL` seleciona um canal instalado; `CAPTURE_URL` permite apontar para o preview.
