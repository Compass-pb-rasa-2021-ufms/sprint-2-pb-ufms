//Require para o mongoose, que auxilia na conexão com o banco.
const mongoose = require('mongoose');

//Require para o dotenv que auxilia na segurança aos dados do BD
require('dotenv').config()
const BD_LINK = process.env.BD_LINK;

//Função que realiza a conexão com o BD
function connectToDatabase(){
    //BD 
    mongoose.connect(BD_LINK,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    });
    const db = mongoose.connection;
    db.on("error", (error) => console.log(error));
}

//Export da função
module.exports = connectToDatabase;