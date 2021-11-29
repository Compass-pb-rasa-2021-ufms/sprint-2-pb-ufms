# Avaliação Sprint 2 - Programa de Bolsas Compass.uol e UFMS

## Autor

Anália Beatriz

## Definição

O projeto em questão faz o consumo da API `https://pokeapi.co/api/v2/pokemon/`,
que retorna os dados dos mais diversos Pokemons.

Há uma única página com a listagem de vários Pokemons, a qual além de visualizar
o nome dos pokenmons, é possível ver tambéms seus tipos e uma foto do mesmo. Além disso,
foi adicionado um campo de busca do Pokemon por nome.

## Desenvolvimento

### Consumindo API no front-end:

Ao realizar o GET na raiz da API, é retornado um arquivo par ao html, um arquivo .css e dois arquivos .js.
Um desses arquivos é utilizado como uma lib de manipulaçlão do DOM, o dom.JS já o outro faz uso do mesmo para realizar a pesquisa e mudar a listagem dos Pokemons dinâmicamente. Essa mudança se dá no envio de um requisição GET a API na URL `"/searchPokemon/:pokemonName"`, ou na `"/pokemonsList"`. A primeira rota, faz um consulta do banco, MongoDB, buscando pelo nome informado, já a segunda lista todos os pokemons salvos no banco.

### Consumindo API no back-end:

O Backend se comunica com um banco MongoDB hospedado na Cloud. Lá já foi feita a inserção dos dados a consulta a API de Pokemons, e todos os dado exibidos pelo Frontend estão armazenados neste banco.

## Como utilizar

Há dois meios de visualizar a aplicação em execução:

1. Acessar o diretório da aplicação via terminal, e executar o comando `npm run start`. Isso irá roda a aplicação com o Nodemon e para visualiza-la, basta abrir no navegador na URL `http://localhost:3000`;
2. Acessar o link da aplicação upada no Okteto: `https://app-analia-beatriz.cloud.okteto.net/`;
