# Versão ampliada

A [entrega original](https://alefkaue.github.io/teste-front-end/) continua no endereço principal. A [versão ampliada](https://alefkaue.github.io/teste-front-end/ampliada/) tem uma entrada HTML própria, mas carrega os mesmos componentes React e os mesmos estilos. Não há uma cópia divergente da aplicação.

## O que foi acrescentado

- 51 produtos demonstrativos em um catálogo complementar: os dez produtos oficiais continuam presentes e mantêm os valores originais.
- Novas abas de áudio e relógios no catálogo. As categorias existentes de acessórios, tablets, notebooks e TVs passam a ter produtos na versão ampliada.
- Telas de Tecnologia, Supermercado, Bebidas, Ferramentas, Saúde, Esportes e Fitness, Moda e Livros.
- A seção Lançamentos abre a seleção dos produtos complementares.
- Os produtos novos usam o mesmo modal, página de detalhes, busca, ordenação, favoritos e carrinho.

A tela inicial mantém os dez iPhones oficiais nas três vitrines. Assim, a entrada ampliada começa com a mesma composição da versão original; os novos conteúdos são acessados pelas categorias e departamentos. Nenhum elemento de escolha de versão foi inserido no layout do teste. Os dois links ficam no README.

[Captura do catálogo ampliado com a aba de áudio](screenshots/ampliada-catalogo.png).

## Dados e isolamento

O arquivo `src/data/additionalProducts.ts` contém o catálogo demonstrativo. Ele só é carregado na versão ampliada. A camada de serviço, o sincronizador e a resposta JSON oficial da Econverse permanecem inalterados.

Os produtos adicionais têm metadados de categoria, departamento e origem. As fotos são locais, e os preços são ilustrativos. A interface informa isso no catálogo e na descrição de cada item. As fontes estão em [CATALOGO-COMPLEMENTAR.md](CATALOGO-COMPLEMENTAR.md) e [CREDITOS-VISUAIS.md](CREDITOS-VISUAIS.md).

Carrinho e favoritos da ampliação usam chaves próprias no armazenamento local. Itens adicionais não aparecem como indisponíveis no carrinho da versão original, nem alteram os favoritos já salvos nela.

## Acesso local e publicação

Os comandos do README continuam válidos. Com `npm run dev`, abra `/` para o teste e `/ampliada/` para a ampliação. A versão ampliada usa rotas por hash também localmente, permitindo atualizar URLs como `/ampliada/#/departamento/livros`.

O Vite gera `dist/index.html` e `dist/ampliada/index.html`, com o código compartilhado. O workflow do GitHub Pages publica ambos no mesmo deploy. Na hospedagem, os endereços internos da ampliação começam por `/teste-front-end/ampliada/#/`.

## Preservação visual

Os testes comparam capturas completas das duas telas iniciais em 1440 e 390 px. As imagens tiveram os mesmos pixels nas comparações locais. Uma captura da versão original publicada antes desta ampliação também coincidiu com a nova em 1440 px. Isso verifica a preservação da interface existente, sem alterar as ressalvas anteriores de fidelidade ao Figma.

Cards, botões, tipografia, cores, modal e demais seções usam os componentes e SCSS existentes. As únicas regras adicionais de estilo tratam as bordas das novas linhas de abas. Mais abas e dados produzem novas telas sem redefinir a identidade visual.
