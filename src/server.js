const express = require('express')
const app = express()
const axios = require('axios')
const mongoose = require ('mongoose')

// Liberando a porta 3000
const port = process.env.PORT || 3000
app.listen(port, () => {console.log("Server ON | Port: 3000")})

// Conectando ao BD
const connectToDatabase = require('./database')
connectToDatabase()

const FavoritoSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Favorito = mongoose.model("Favorito", FavoritoSchema)

// Permitindo a comunicação
const cors = require('cors')
app.use(cors())

// Servindo o front-end
app.use(express.static('public'))
 
app.get('/:house', async(req, res) => {
    const { house } = req.params
    try{
        const { data } = await axios(`https://hp-api.herokuapp.com/api/characters/house/${house}`)
        let random = getRandomInt(0, 10)
        let character = data[random]

        Favorito.collection.insertOne(character)

        return res.json(character)
    } catch (error){
        console.log(error)
    }
})

app.post('/favoritos', (req,res) =>{
    if(Favorito.length == 0){
        res.send("Nenhum personagem foi escolhido, escolha sua casa favorita na página principal!")
    } else{
        Favorito.find({}, (error, data) =>{
            if(error){
                console.log(error)
            } else{
                res.send('Personagens adicionados anteriormente: <br></br> <pre>' + 
                JSON.stringify(data, null, '\t') + 
                '</pre><br></br>Melhores mágicos de Hogwarts!')
            }
        })
    }
})

// Função para gerar número random
function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}