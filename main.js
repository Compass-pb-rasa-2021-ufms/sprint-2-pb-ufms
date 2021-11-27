const cors = require('cors');
const express = require('express');
const app = express();
const axios = require('axios');

const mongoose = require ('mongoose');
const connectToDatabase = require('./database'); 
connectToDatabase();

var Schema = mongoose.Schema
var cepSchema = new Schema({})
var Cep = mongoose.model('ceps', cepSchema);

//const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('public'));

app.get('/:cep', async(req, res) => {
    const { cep } = req.params;
    try{
        const { data } = await axios(`https://viacep.com.br/ws/${cep}/json/`);
        Cep.collection.findOne({"cep": data.cep}, (error, dado) =>{
            try{
                if(dado){
                    console.log('CEP já buscado anteriormente! Não será armazenado no BD');
                } else if(error){
                    console.log('erro');
                } else{
                    if(!(data.hasOwnProperty('erro'))){
                        console.log('Novo CEP encontrado! Armazenando no BD...');
                        Cep.collection.insertOne(data);
                    }
                }
            } catch(error){
                console.log(error);
            }
        })
        return res.json(data);
    } catch (error){
        console.log(error);
    }
});

app.post('/log', (req,res) =>{
    var stringjson = []
    if(Cep.length == 0){
        res.send('Banco de dados vazio, volte a página e realize consultas para preenche-lo')
    } else{
        Cep.find({}, (error, dado) =>{
            if(error){
                console.log(error)
            } else{
                res.send('CEPS buscados anteriormente: <br></br> <pre>' + 
                JSON.stringify(dado, null, '\t') + 
                '</pre><br></br>Volte a página caso queira realizar mais consultas!');
            }
        })
    }
})

app.listen('3000');
