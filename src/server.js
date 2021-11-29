// Inicializando server
const express = require("express")
const app = express()

// Definindo rota
const port = process.env.PORT || 3000
app.listen(port, () => { console.log("Server ON | Port: 3000") })

// Permitindo acesso aos recursos
const cors = require("cors")
app.use(cors())

// Definindo Front-End
app.use(express.static("public")) 


/*
// Configurando MongoDB
const bodyParser = require("body-parser")

app.use(bodyParser.json()) // Traduzir as requisições para json
app.use(bodyParser.urlencoded({ extended: false })) // Decodar os parametros via url

// req == dados da requisicao | res == objeto utilizado para enviar resposta
app.get("/mongodb", (req, res) => {
    res.send("OK")
})
*/