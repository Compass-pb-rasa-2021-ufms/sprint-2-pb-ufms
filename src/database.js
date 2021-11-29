/* 
 * Esse arquivo contém todas as operações referentes ao MongoDB.
 * As operações utilizadas são: criação de schema e modelo, conexão, inserção, remoção e listagem.
*/ 

const mongoose = require('mongoose');
const utils = require('./utils');

// Definindo um schema, pois mongoose funciona através de schemas
const historySchema = new mongoose.Schema({
    name: String,
    date: Date,
    request: Object,
    response: Object
  });

// Instanciando o shchema em um modelo, o qual representa a collecion no banco
const History = mongoose.model('History', historySchema);

// Realiza a conexão com o banco
async function connectToMongo() {
	try {
        await mongoose.connect("mongodb://root:root@mongodb:27017/");
        console.log('Conexão com o banco realizada com sucesso.')
    } catch (error) {
        console.log(error)
    }
}

// Adiciona um item ao histórico
async function addToHistory(nameAPI, requestParametersSend, responseReceived) {
    /* 
     * A API de atividades permite realizar requisições sem parâmetros, quando solicitamos
     * uma requisição aleatória, logo o parâmetro "requestParametersSend" pode ser vazio.
     * Entretanto, todas as APIs geram uma resposta, então, só faz sentido adicionar ao banco
     * se o parâmetro "responseReceived" possuir algum valor.
    */
    if (responseReceived) {
        const historyItem = new History({ 
            name: nameAPI, 
            date: Date.now(), 
            request: requestParametersSend, 
            response: responseReceived });

        try {
            await historyItem.save();
            console.log('Item adicionado ao histórico')
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log("O parâmetro requestParametersSend não possui nenhum valor.")
    }
}

// Exibe todos os itens do histórico
async function showHistory(){
    /*
     * Busca todos os itens ja adicionados no histórico, filtrando o campo __v gerado automaticamente
     * pelo banco quando um item é inserido e orenando de acordo com a data, do mais
     * recente para o mais antigo.
    */
    const historyItems = await History.find().select(['-__v']).sort({date: -1});
    
    // Formata a data dos itens retornados do banco
    const historyItemsFormated = historyItems.map((item) => {
        item = item.toObject()
        item.date = res = utils.formatDate(item.date)
        return { ...item }
    })
    return historyItemsFormated
}


// Deleta um item do histórico
async function deleteFromHistory(id){
    var isDeleted = null
    if (id) {
        isDeleted = await History.deleteOne({ _id: id })
        return isDeleted
    }
    return isDeleted
}

module.exports = { connectToMongo, addToHistory, showHistory, deleteFromHistory }
