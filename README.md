# Avaliação Sprint 2 - Programa de Bolsas Compass.uol e UFMS

## Autor
Leonardo Gabriel Mercurio Lino

## Definição
Esta implementação consome uma API que busca os dados de um CEP.

Ela possui uma página HTML simples, com dois formulários: 
- O primeiro contém apenas um campo de texto para o usuário informar o CEP que deseja buscar, um botão de OK para realizar a operação e uma lista a qual serão inseridos os dados da busca.
- O segundo contém apenas um botão para consultar o Log do banco de dados, que redireciona para a página onde eles são exibidos.

## Desenvolvimento

### Consumindo API no front-end: 
No arquivo index.html, mais especificamente no script, é onde são realizada as funções do front-end. Utiliza o fetch para buscar os dados da URL informada (neste caso é `https://buscacep-mercuriolino.cloud.okteto.net` + os dados de input), se comunica com o back-end para pegar as informações da API, recebe os dados de volta , e transforma em um JSON, e chama o devido método para exibir eles para o usuário.

###  Consumindo API no back-end: 
No arquivo main.js utilizo o axios para buscar os dados na URL da API com o CEP recebido por argumento (`https://viacep.com.br/ws/CEP/json/`) e retorna eles para o front, escutando a porta informada pelo Okteto ou então pela porta padrão 8080.

### Banco de Dados:
#### Conexão:
No arquivo database.js existe a função connectToDatabase que como o próprio nome diz faz a comunicação da API com o database através do mongoose utilizando o link para o DB do autor.
No arquivo main.js é feito o require e a chamada dessa função.

#### Inserção e busca de dados no DB:
No arquivo main.js é criado o Schema que será utilizado no DB. Dentro do `app.get` é realizado a chamada do método de inserção `insertOne` para o dado buscado no AXIOS, porém, esse dado só é inserido se já não tiver sido buscado anteriormente e nem contém erro.
Ainda no arquivo main.js porém no método `app.post` utilizamos o método `find()` para buscar dentro do BD todos os dados contidos e depois exibí-los.

## Dependências da aplicação durante o desenvolvimento:
- Express: Facilita o desenvolvimento da API.
- Nodemon: Observa a API enquanto são realizadas modificações e reinicia o servidor quando necessário.
- Cors: Permite que haja acesso do front-end para a API.
- Axios: Realiza a mesma função que o fetch.
- MongoDB: Database utilizado no projeto.
- Mongoose: Módulo do NodeJS que se conecta com o MongoDB

## Como utilizar
Podemos utilizar a API de duas maneiras, sendo elas:
1. Acessar o diretório da aplicação via terminal, utilizar o comando `npm start` e então abrir no navegador o `http://localhost:8080`
2. Acessar o link da aplicação upada no Okteto: `https://buscacep-mercuriolino.cloud.okteto.net`

Ao acessar a página, basta inserir o CEP desejado no campo de texto disponível e clickar no botão Ok que a informação será retornada. Caso deseja consultar o log basta clickar no botão 'Log' que o usuário será redirecionado para outra página que exibe todos os dados do banco.