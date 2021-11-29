//Requires das ferramentas auxiliares necessárias para o funcionamento da API
const cors = require('cors');
const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require ('mongoose');
const connectToDatabase = require('./database'); 

//Conexão com o DB
connectToDatabase();

//Criação do Schema do banco de dados
var Schema = mongoose.Schema
var cepSchema = new Schema({})
var Cep = mongoose.model('ceps', cepSchema);

//Definição das possíveis portas de funcionamento no servidor local
const port = 8080 || process.env.PORT || 3000;

//Utilização do CORS
app.use(cors());

//Passa a pasta onde está a página HTML para o express
app.use(express.static('public'));

//Método get que consulta os dados desejados na API
app.get('/:cep', async(req, res) => {
    //Recebe por parâmetro o CEP desejado
    const { cep } = req.params;
    try{
        //Consome o arquivo JSON da API através do axios
        const { data } = await axios(`https://viacep.com.br/ws/${cep}/json/`);
        //Busca se esse CEP ja está cadastrado no DB
        Cep.collection.findOne({"cep": data.cep}, (error, dado) =>{
            if(dado){
                //Mensagem que ocorre quando o CEP ja está cadastrado
                console.log('CEP já buscado anteriormente! Não será armazenado no BD');
            } else if(error){
                //Exibe no console mensagem de erro caso encontre um erro.
                console.log('erro');
            } else{
                //Verifica se apesar de não estar cadastrado no DB é um CEP válido
                if(!(data.hasOwnProperty('erro'))){
                    //Insere os dados no DB se for um CEP válido.
                    console.log('Novo CEP encontrado! Armazenando no BD...');
                    Cep.collection.insertOne(data);
                }
            }
            
        })
        //Retorna os dados para o Front-End
        return res.json(data);
    } catch (error){
        console.log(error);
    }
});

//Método POST que exibe todos os dados armazenados no DB na aba /log da página
app.post('/log', (req,res) =>{
    //Caso o DB esteja vazio exibe esta mensagem
    if(Cep.length == 0){
        res.send('Banco de dados vazio, volte a página e realize consultas para preenche-lo')
    } else{
        //Se o DB não estiver vazio chama o método FIND para exibir os dados
        Cep.find({}, (error, data) =>{
            if(error){
                //Exibe no console mensagem de erro caso encontre um erro.
                console.log(error)
            } else{
                //Mostra na página todos os CEPs cadastrados no DB.
                res.send('CEPS buscados anteriormente: <br></br> <pre>' + 
                JSON.stringify(data, null, '\t') + 
                '</pre><br></br>Volte a página caso queira realizar mais consultas!');
            }
        })
    }
})

//Método listen que faz o app ouvir a devida porta.
app.listen(port);
