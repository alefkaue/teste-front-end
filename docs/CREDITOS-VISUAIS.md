# Créditos visuais

O layout e a identidade visual pertencem ao [desafio da Econverse](https://github.com/EconverseAG/teste-front-end), com [protótipo no Figma](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1).

A revisão da página completa foi orientada pelo repositório [Yuurih44/teste-front-end](https://github.com/Yuurih44/teste-front-end), indicado pelo usuário, consultado no commit `ad514ff64eff11842b57432e851181ac05bfa6b4`, e por sua [versão oficial publicada](https://yuurih44.github.io/teste-front-end/?versao=teste).

Os arquivos `logo.png`, `black-friday.webp`, `parceiros.webp` e os sete ícones de departamentos em `public/images/` foram obtidos da pasta de assets dessa referência. Sua [documentação de créditos](https://github.com/Yuurih44/teste-front-end/blob/ad514ff64eff11842b57432e851181ac05bfa6b4/docs/IMAGE-CREDITS.md) os identifica como extrações do protótipo da Econverse. Não houve exportação direta pelo Dev Mode nesta implementação.

Os componentes React, serviços, contextos e estilos desta aplicação foram implementados neste fork; o outro projeto não foi incorporado como base de código. Na versão original, as imagens de produtos continuam sendo as URLs retornadas pela API oficial da Econverse. A versão ampliada usa um catálogo complementar independente, descrito abaixo.

Poppins é distribuída sob SIL Open Font License, preservada em `public/fonts/OFL.txt`. Os arquivos WOFF2 locais da referência correspondem à distribuição dessa fonte. Os ícones de interface são SVGs definidos em `src/components/Icon/Icon.tsx`.

## Produtos da versão ampliada

- Fotos de acessórios, tablets, notebooks, áudio, relógios, mercado, bebidas, cuidados, esportes e roupas vêm do [DummyJSON](https://dummyjson.com/docs/products), fonte de dados demonstrativos. Os IDs e URLs de cada imagem estão em [CATALOGO-COMPLEMENTAR.md](CATALOGO-COMPLEMENTAR.md).
- As ilustrações SVG de televisores e capas de livros foram criadas neste projeto. São representações para a demonstração, sem vínculo com editoras ou fabricantes.
- As quatro fotos de ferramentas foram obtidas dos assets da referência anteriormente creditada e mantidas sem alteração, com suas licenças originais:
  - Furadeira: [TaurusEmerald](https://commons.wikimedia.org/wiki/File:DeWalt_20_Volt_Max_Cordless_Drill.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
  - Alicate: [Mansurbiohazard](https://commons.wikimedia.org/wiki/File:05-02_combination_pliers_big.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
  - Trena: [多多123](https://commons.wikimedia.org/wiki/File:B%26Q_Tape_Measure.jpg), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
  - Martelo: [Evan-Amos](https://commons.wikimedia.org/wiki/File:Claw-hammer.jpg), domínio público.

Os preços complementares são exemplos definidos para a interface. Não representam ofertas ou conversão dos preços do DummyJSON. Nenhum dado adicional foi incluído no JSON da Econverse.
