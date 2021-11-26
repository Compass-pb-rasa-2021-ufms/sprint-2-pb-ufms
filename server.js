// Inicializando server
const express = require("express")
const app = express()

// Definindo rota
const port = process.env.PORT || 3000
app.listen(port, () => { console.log("Server ON | Port: 3000")})


// Permitindo acesso aos recursos
const cors = require("cors")
app.use(cors())

// Definindo Front-End
app.use(express.static("public")) 