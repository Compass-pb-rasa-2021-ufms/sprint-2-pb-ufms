const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const informationSchema = new Schema({
    ip: String, 
    country: String,
    city: String, 
    regionName: String, 
    latitude: String,
    longitude: String
}, {versionKey: false});

const informationModel = mongoose.model("locations", informationSchema);

function factoryMongo(modelName, uriConnection){
    let monguinho = {};
    monguinho.schemaData = informationSchema;
    monguinho.modelName = modelName;
    monguinho.uriConnection = uriConnection;
    monguinho.connectBD = connectBD;
    monguinho.insertData = insertData;
    monguinho.infoBD = infoBD;
    monguinho.checkConnection = checkConnection;
    monguinho.dataForMongo = dataForMongo;
    monguinho.consultData = consultData;
    monguinho.consultAll = consultAll;
    
    async function connectBD(){
        try{
            await mongoose.connect(uriConnection, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }catch(error){
            console.error("Falha ao conectar no database! " + error);
        }
    };

    async function insertData(input){
        try{
            const newInformation = new informationModel(input);
            newInformation.save();
        }catch(error){
            console.error("Erro na inserção dos dados! " + error);
        }
    };

    function infoBD(){
        return "Schema: " + schemaData + "\nModel Name: " + modelName + "\nURI Connection: " + uriConnection + "\n";
    };

    async function checkConnection(){
        const db = await mongoose.connection;
        db.on("error", (error) => console.log("Erro na conexão a database!" + error));
        db.once("open", () => console.log("Conectado a database!"));
    };

    //Objeto dataForMongo, a unidade deste objeto sera inserida no mongoDB
    function dataForMongo(responseData){
        let dataInsert = {
            "ip": responseData['query'],
            "country": responseData['country'],
            "city": responseData['city'],
            "regionName": responseData['regionName'],
            "latitude": responseData['lat'],
            "longitude": responseData['lon'],
        };
        return dataInsert;
    };

    async function consultData(value){
        return await informationModel.findOne({ip: value}).exec();
    };

    async function consultAll(){
        return await informationModel.find();
    }
    return monguinho;
};

module.exports = factoryMongo;