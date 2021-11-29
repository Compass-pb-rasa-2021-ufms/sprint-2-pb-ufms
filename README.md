# sprint-2-pb-ufms

Segundo sprint do programa de bolsas Compass.uol para formação em chatbot Rasa.

# Simple Lyrics Search 2.0

- Criador: Leonardo C. Biazom
- Acesso: https://faker3po-f-fakeus3r.cloud.okteto.net/

# Objetivo e Funcionalidade

O objetivo do projeto é consumir uma API pública em NodeJS.
A API escolhida foi a Lyrics.ovh. Sua funcionalidade é trazer a letra de uma música, a partir da entrada do nome do Artista e do nome da mesma.
Nessa nova versão, a aplicação é hospedada no Okteto Cloud, facilitando a manutenção do código.
Além disso, foi incluído uma conexão ao banco de dados MongoDB, e agora é possível ver as últimas buscas feitas, por meio do botão Recent Searches

# Uso do aplicativo

O aplicativo possui a função de busca de letras, e consulta as últimas buscas feitas.

## Busca

Para efetuar a busca, basta inserir o nome do artista, e o nome da música desejada.
Os resultados são trazidos por meio de uma comunicação à API pública Lyrics.OVH, de origem estrangeira. Sendo assim, sua base de dados comporta músicas internacionais, majoritariamente.
![Exemplo de busca](/assets/exemploBusca.gif)

## Buscas Recentes

Para consultar as buscas recentes, basta clicar no botão "Recent Searches".
É feita a consulta a um banco de dados do MongoDB, conectado à aplicação.
Os resultados são ordenados do mais antigo ao mais recente.
(Em atualizações futuras, espera-se implementar um melhor visual à esta funcionalidade)
![Exemplo Recents](/assets/exemploRecentSearches.gif)

# Tecnologias utilizadas

## Geral:

Foram utilizados:

- HTML e CSS para o front-end;
- Javascript para o servidor NodeJS, onde é feito o consumo da API;
- MongoDB para inserção e consulta de dados;
- Configuração de Kubernete no Okteto Cloud.

## Dependências do pacote:

- yarn
- http-server
- mongoose
- axios
- express
- cors

# Para rodar o arquivo localmente

- Clone o repositório

- Execute o terminal no diretório da aplicação

- Instale as dependências com:
  `yarn install`

- Inicialize o servidor com:
  `yarn start`

- Sirva com o HTTP-Server (pode ser necessário abrir outro terminal no diretório da aplicação):
  `http-server`

- Acesse em http://localhost:8080
