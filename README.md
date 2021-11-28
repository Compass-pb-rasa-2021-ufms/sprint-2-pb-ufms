## Avaliação Sprint 2 - Programa de Bolsas Compass.uol e UFMS
- Segunda sprint do programa de bolsas Compass.uol para formação em chatbot Rasa.

## Acesso ao app
- https://harrypotter-jpwakugawa.herokuapp.com/

## Harry Potter
- Criador: João Paulo de Souza Wakugawa.
- Projeto: Desenvolver um site que mostre diversos personagens de Harry Potter em um loop infinito permitindo que o usuário escolha a sua casa favorita.
- Entre no app e veja a magia acontecer.

## Informações
- API utilizada: http://hp-api.herokuapp.com/api/characters
- Hospedagem: Heroku & Github
- Front-end: Html & CSS
- Back-end: NodeJS  

## Acesso local
### Localhost: 3000
```
$ git clone
$ npm install (Deve ser no diretório especificado)
```

## Upando no Heroku
```
$ heroku login
$ heroku container:login
$ heroku create  (Anote o nome do site criado)
$ docker build -t registry.heroku.com/'nome-do-app-criado'/web . (Não esqueça de especificar o diretório)
$ docker push registry.heroku.com/'nome-do-app-criado'/web
$ heroku container:release web -a 'nome-do-app-criado'
$ heroku open -a 'nome-do-app-criado'
```

## Buildando a imagem
```
$ docker build -f "nome-dockerfile' -t 'nome-da-img' . (Especifique o diretório) 
$ docker run -d -p 'porta-fora':'porta-container' 'nome-da-img'
```

## Bibliotecas utilizadas
- express
- nodemon
- cors
- mongoose
- body-parser