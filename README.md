# Avaliação Sprint 2 - Programa de Bolsas Compass.uol e UFMS
Segunda sprint do programa de bolsas Compass.uol para formação em chatbot Rasa.

## :game_die: API :game_die:
- [ygoprodeck](https://db.ygoprodeck.com/api-guide/)

## :green_circle: Acesso ao App :green_circle:
    https://yugi-app-f-camuso.cloud.okteto.net/
    

## :gear: Desenvolvimento e funcionamento do app :gear: 
   ### Funcionamento :wrench:
   Primeiro você seleciona o atributo da carta que deseja randomizar, nisso é feito um fetch com o axios retornando 
   a imagem dessa carta e mostrando ela no Card placeholder. Depois, caso queira adicionar essa carta no banco de dados,
   basta clicar na carta e o Card placeholder vai atualizar com o id dessa carta. Esse click é na verdade um acesso no 
   endpoint interno /:id que vai passar o id da carta e buscar as outras informações dela(nome, id , descrição) e depois isso é armazenado no Atlas.
   As cartas escolhidas podem ser acessadas através do verifica histórico. Esse é um post que traz todas os objetos encontrados na collection cards.
    
   ### Desenvolvimento :hammer:
   
   Foi usado como base a documentação 'getting started' do okteto, a base do app é a mesma da primeira sprint. O diferencial 
   está na utilização do express e axios, que se fizeram necessários devido as dificuldades encontradas na integração com okteto usando o modelo antigo.
   A escolha da utilização do Atlas foi pelo motivo de ser um serviço cloud, dando uma maior liberdade na escalabilidade.
   Até essa versão, não houve muito foco no front-end, pois os problemas encontrados e a tentativa de solucioná-los tomou grande parte do tempo útil.
   Por fim, a disposição dos arquivos está mais organizado. Além de uma melhora nas questões levantadas da revisão da primeira sprint, como os comentários no código.

## :books: Documentações das tecnologias e dependências :books:
- [Nodejs](https://nodejs.org/en/docs/)
- [Docker](https://docs.docker.com/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Okteto](https://okteto.com/docs/getting-started/) 
- [MongoDB](https://docs.mongodb.com/)(Atlas)
- [Express](https://expressjs.com/en/5x/api.html)
- [Axios](https://www.npmjs.com/package/axios)
- [Mongoose](https://mongoosejs.com/docs/)
- [Cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- Baseado no [Develop on Okteto](https://cloud.okteto.com/deploy?repository=https://github.com/okteto/node-getting-started)

## :notebook: To do :notebook:
- Fix no css
- Melhoria na documentação
- Aplicar outro método para subir no okteto (usando k8 e imagem publicada no docker hub)