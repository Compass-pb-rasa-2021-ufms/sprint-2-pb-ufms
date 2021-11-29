# Avaliação Sprint 2 - Programa de Bolsas Compass.uol e UFMS
Segundo sprint do programa de bolsas Compass.uol para formação em chatbot Rasa.

Link da aplicação no Okteto: [https://web-viniciusmarchi.cloud.okteto.net/](https://web-viniciusmarchi.cloud.okteto.net/)

A utilização da aplicação se manteve simples, as páginas são autoexplicativas, basta navegar, clicar nos botões desejados e preencher os campos solicitados. As diferenças, em relação às páginas, da versão anterior (desenvolvida na sprint 1) são: 

* Adição de um botão de acesso ao histórico na homepage
![Botão de acesso a página de histórico](/assets/btnAcessHistory.png)

* Página que exibe o histórico, com botões para exibir detalhes e deletar itens do histórico
![Página de histórico](/assets/pageHistory.png)

# Tabela de conteúdos
   * [APIs públicas utilizadas](#apis-utilizadas)
   * [Tecnologias utilizadas](#tecnologias-utilizadas)
   * [Estrutura de arquivos do projeto](#estrutura-de-arquivos-do-projeto)
   * [Deploy no Okteto](#deploy-no-okteto)
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

   Além disso, as requisições realizadas são armazenadas em um banco de dados, no caso o [MongoDB](https://www.mongodb.com/), que é definido e gerenciado através do [Mongoose](https://mongoosejs.com/), uma ferramenta para NodeJS que permite modelar esquemas, gerenciar e validar objetos, e conexões com MongoDB. Os esquemas gerados para representar as requisições possuem os seguintes campos:
   * ```name``` - Nome da API que foi requisitada
   * ```date``` - Data e horário da requisição
   * ```request``` - Os parâmetros enviados na requisição (boredAPI permite a busca de atividades aleatoriamente, nesse caso esse campo permanecerá vazio, uma vez que não são especificado parâmetros para realizar uma busca aleatória)
   * ```response``` - Resposta da API

   Todos esses dados serão salvos no banco de dados e exibidos na página de histórico, a qual também permite deletar itens do histórico.

  Por fim, o [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/) foram utilizados para encapsular o sistema em um container e realizar deploy no *heroku*.

# Estrutura de arquivos do projeto
```
.
├── assets                       # Imagens para compor o README
├── public   
│   ├── css                      # Arquivos Css
│   ├── images                   # Imagens utilizadas pelas páginas
│   ├── js                       # Scripts utilizados nas páginas
│   └── views                    # Páginas HTML
├── src                          
│   ├── apis                     # Módulos que realizam requisições HTTP as APIs públicas
│   │   ├── boredAPI.js          
│   │   ├── numbersAPI.js
│   │   └── translateAPI.js 
│   ├── database.js              # Conexão e CRUD com o mongoDB 
│   ├── server.js                # Definição das rotas e do fluxo descrito na seção de Tecnologias utilizadas
│   └── utils.js                 # Métodos que modificam dados
└── ...
```

# Deploy no okteto
Para realizar o deploy no Okteto optei pela maneira mais simples, a construção do arquivo ```docker-compose.yml```. O Okteto, por padrão, oferece suporte a arquivos .yml e consegue, automaticamente, identeficiar esse arquivo no repositório do projeto e iniciar o processo de build e deploy dos serviços nele definidos.
Abaixo, a imagem exibe os dois serviços (web e mongodb) definidos no docker-compose.

![Serviços definidos no Docker Compose](/assets/dockercomposeServices.png)

Para enviar o código deste projeto ao servidor do Okteto, optei por não utilizar a Oketo CLI, ao invés disso, realizei login na [plataforma web](https://okteto.com/) vinculando minha conta do GitHub e selecionei este repositório, como exibe a imagem abaixo:

![Página de login do Okteto com GitHub](/assets/oktetoGitDeploy.png)

Ou seja, não foi necessário a instalação da Oketo CLI para enviar o código diretamente da minha máquina (embora seja completamente possível), pois o Okteto se encarregará de clonar o repositório diretamente do GitHub.

Por fim, o Oketo inicia o processo de deploy. Como dois serviços foram definidos no docker-compose, o Okteto reserva um pod para cada. Como exibe a imagem abaixo.

![Pods gerados no Okteto](/assets/oktetoPods.png)

Pronto, o projeto foi implantado e será gerenciado pela plataforma do Okteto. O mesmo pode ser acessado em [https://web-viniciusmarchi.cloud.okteto.net/](https://web-viniciusmarchi.cloud.okteto.net/)

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

Instale as dependências
```bash
npm install
```

Inicialize a aplicação
```bash
npm start
```

Acesse a aplicação através do endereço [localhost:3000](http://localhost:8080/), ou na porta definida.