# Avaliação Sprint 1 - Programa de Bolsas Compass.uol e UFMS
Primeira sprint do programa de bolsas Compass.uol para formação em chatbot Rasa.

Link da aplicação no heroku: [https://vinicius-compassuol.herokuapp.com](https://vinicius-compassuol.herokuapp.com)

A utilização da aplicação é simples, as páginas são autoexplicativas, basta navegar, clicar nos botões desejados e preencher os campos solicitados.

# Tabela de conteúdos
   * [APIs públicas utilizadas](#apis-utilizadas)
   * [Tecnologias utilizadas](#tecnologias-utilizadas)
   * [Estrutura de arquivos do projeto](#estrutura-de-arquivos-do-projeto)
   * [Como executar localmente](#executando-o-projeto-localmente)
      * [Com docker](#com-docker)
      * [Sem docker](#sem-docker)

# APIs utilizadas
3 APIs públicas foram utilizadas para compor o sistema
   1. [BoredAPI](http://www.boredapi.com/): "The Bored API. Let's find you something to do". Essa API fornece um endpoint que retorna uma atividade aleatória para ocupar o tempo. As atividades são classificadas em diversos tipos (educação, recreação, social, diy, cozinhar, relaxar, etc). Além disso, existem outros parâmetros que caracterizam as atividades, sendo eles: diferentes quantidades de participantes envolvidos e diversos níveis de preço e acessibilidade para realizá-la.
   2. [numbersAPI](http://numbersapi.com/#42): Essa API fornece diversas curiosidades sobre os números naturais, basta informar o número desejado.
   3. [TranslateAPI](https://libretranslate.de/): Resliza a tradução de texto entre idiomas. Escolhi adicionar essa API para traduzir os textos, originalmente em inglês, retornados como resposta pelas APIs anteriores. Ou seja, o sistema exibe respostas em EN e PT-BR.
# Tecnologias utilizadas
   NodeJS compõem todo o sistema executando o fluxo de lidar com as requisições do usuário, consumir as APIs públicas, tratar os dados resultantes e enviá-los ao usuário.
   
   Para prover a navegação entre as páginas HTML foi utilizado o framework [Express](https://www.npmjs.com/package/express). Ele provê as rotas da aplicação, recebendo solicitações do usuário e devolvendo respostas a ele. Ao receber uma solicitação do usuário, uma página HTML é devolvida como resposta, normalmente essa paǵina possui campos a serem preenchidos. Ao preenchê-los o usuário envia de volta a aplicação e, nesse momento, as APIs públicas são consultadas.
   
   Para realizar as requisições HTTP as APIs públicas foi utilizado a biblioteca [got](https://www.npmjs.com/package/got). 
   
   Os dados obtidos como respostas das APIs públicas são tratados e adicionados dinamicamente a uma página HTML, que será retornada ao usuário. Para possibilitar essa dinamicidade foi utilizado o [ejs](https://www.npmjs.com/package/ejs), o qual oferece um suporte client-side através de templates que possibilitam a existência de variáveis e estruturas condicionais dentro do HTML.

  Por fim, o [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/) foram utilizados para encapsular o sistema em um container e realizar deploy no *heroku*.

# Estrutura de arquivos do projeto
```
.
├── public             
│   ├── css                      # Arquivos Css
│   └── views                    # Páginas HTML
├── src                          
│   ├── apis                     # Códigos modularizados responsáveis por realizar requisições HTTP as APIs públicas
│   │   ├── boredAPI.js          
│   │   ├── numbersAPI.js
│   │   └── translateAPI.js      
│   ├── server.js                # Arquivo raiz do sistema. Onde as rotas e todo o fluxo descrito na seção de Tecnologias utilizadas é definido.
│   └── utils.js                 # Trata os dados, recebidos através do formulário, para a requisição na boredAPI. O código da função possui comentários detalhados.
└── ...
```
# Executando o projeto localmente
Embora o projeto esteja no [heroku](https://vinicius-compassuol.herokuapp.com), abaixo seguem duas opções para executá-lo localmente.
## Com docker
Com o *docker* e *docker-compose* devidamente instalados, basta clonar e acessar o diretório desse projeto e executar os seguintes comandos:

Realize o build do projeto
```bash
docker-compose build
```

Inicialize a aplicação
```bash
docker-compose up -d
```

Acesse a aplicação através do endereço [localhost:3000](http://localhost:3000/)

Para encerrar a aplicação, utilize
```bash
docker-compose down
```

## Sem docker
Para executar sem docker, basta acessar o diretório do projeto e executar os seguintes comandos:

Instale as dependencias
```bash
npm install
```

Inicialize a aplicação
```bash
npm start
```

Acesse a aplicação através do endereço [localhost:3000](http://localhost:8080/), ou na porta definida.