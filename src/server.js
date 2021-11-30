const express = require("express")
const bodyParser = require("body-parser")
const Favorito = require("./models/favorito")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require("./controllers/router")(app)

const port = process.env.PORT || 3000
app.listen(port, () => { console.log("Server ON | Port: 3000") })

// Definindo Front-End
app.use(express.static("public")) 

app.post('/favoritos', (req,res) =>{
    //Caso o DB esteja vazio exibe esta mensagem
    if(Favorito.length == 0){
        res.send("Nenhum personagem foi escolhido, pause seu personagem favorito na página principal.")
    } else{
        //Se o DB não estiver vazio chama o método FIND para exibir os dados
        Favorito.find({}, (error, data) =>{
            if(error){
                console.log(error)
            } else{
                //Mostra na página todos os CEPs cadastrados no DB.
                res.send('Personagens adicionados anteriormente: <br></br> <pre>' + 
                JSON.stringify(data, null, '\t') + 
                '</pre><br></br>Melhores mágicos de Hogwarts!');
            }
        })
    }
})
