# Lista de Filmes App

Este é um aplicativo simples que permite ao usuário manter uma lista de filmes e uma lista de filmes para assistir.

## Como Funciona

O aplicativo foi desenvolvido usando React Native, que é uma estrutura popular para criar aplicativos móveis usando JavaScript e React. Ele mantém uma lista de filmes, permite adicionar novos filmes e marcar filmes para assistir.

## Como Usar

 **Navegação:**
   - Você verá uma lista de filmes na tela inicial.
   - Para adicionar um novo filme, preencha o título, gênero e avaliação, e clique em "Adicionar Filme".
   - Para marcar um filme para assistir, clique em "Assistir".
   - Para remover um filme da lista de assistir, clique em "Remover".

## Estrutura do Código

- **`App.tsx`:** Este é o componente principal do aplicativo onde todo o código reside.
- **`Movie` Interface:** Define a estrutura dos objetos de filme usados no aplicativo.
- **`useState` Hooks:** São usados para gerenciar os estados de filmes, novo filme e lista de assistir.
- **Funções auxiliares:** Como `validateMovie`, `addMovie`, `addToWatchlist` e `removeFromWatchlist`.
- **Renderização de Componentes:** Usa `ScrollView`, `FlatList`, e componentes como `TouchableOpacity`, `Text`, `View`, `TextInput` e `FontAwesome` para a interface do usuário.

## Contribuição

Se você quiser contribuir para este projeto, sinta-se à vontade para abrir uma _pull request_ com suas melhorias. Ficamos felizes em receber contribuições!
