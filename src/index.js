//importando as bibliotecas para gerenciamento do app
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//adcionando as funcionalidades do BodyParser ao nosso app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//app.use(cors())
app.set('trust proxy', 1)

//referenciano os controllers
require('./controllers/projeto')(app)

//colocando o app para rodar na porta 3000
app.listen(process.env.PORT || 3000)