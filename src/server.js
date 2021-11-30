const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require("./controllers/router")(app)

const port = process.env.PORT || 3000
app.listen(port, () => { console.log("Server ON | Port: 3000") })

// Definindo Front-End
app.use(express.static("public")) 


/* 

CORS ATRAPALHA A COMUNICACAO !

const cors = require("cors")
app.use(cors())

*/