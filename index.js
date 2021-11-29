// Requerindo dependencias
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Usando cors para "liberar" requests e express para definir o servidor e usar a pasta public também
app.use(cors());
app.use(express.static("public"));

// Conexão com o db(mongoDB Atlas)
mongoose.connect('mongodb+srv://yugiadm:yugi123@cluster0.ayqy5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));

// Criando Schema o Cards refere a collections lá no Atlas, Schema 'livre' para possibilidade de adicionar mais informações no futuro
const Schema = mongoose.Schema;
const cardSchema = new Schema({});
const dataModel = mongoose.model("Cards", cardSchema);

/* Usando o get para receber o id que vem da função sendDB em script.js
com esse id é feito uma nova requisição para adicionar a carta que foi randomizada no banco */
app.get('/:id', async(req, res) =>{
  const {id} = req.params;
  try {
    const { data } = await axios(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
    const dataBanco ={
      id: data.data[0].id,
      name: data.data[0].name,
      desc: data.data[0].desc,
    };
    dataModel.collection.insertOne(dataBanco);
    return res.send(data.data[0]);
  } catch (error) {
    console.log(error);
  }
})

// Acesso a todas as cartas que foram adicionadas ao banco
app.post('/cartas', (req,res) =>{
  dataModel.find({}, { _id: 0}).exec((err, data) => {
    if(err){
      console.log(err);
    }else{
      res.send(`<pre>${JSON.stringify(data, null, "\t")}</pre>`);
    }
  })
})

// Definição da porta e fazendo o 'server' ouvir na porta definida
const port = 8080 || process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Starting yugi-app server...');
})
