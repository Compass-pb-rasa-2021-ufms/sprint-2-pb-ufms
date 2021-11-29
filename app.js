//Configuração do MongoDB via Mongoose
const mongoose = require("mongoose");
const dbConnection = mongoose.connect(
  "mongodb+srv://fake:db123_@mycluster.uw16e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewURLParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);
//Schema
const Schema = mongoose.Schema;
const DataSchema = new Schema(
  {
    artist: String,
    song: String,
  },
  {
    collection: "Buscas",
  }
);

const DataModel = mongoose.model("data", DataSchema);

//Usando Axios para fazer a comunicação com a API
const axios = require("axios");
const api = axios.create({
  baseURL: "https://api.lyrics.ovh/v1/",
});

//Usando Express como servidor
const express = require("express");
const app = express();
app.use(express.static("public")); //Definindo a pasta public para elementos frontend

//Requisitando o CORS no servidor
const cors = require("cors");
app.use(cors());

const port = 8080 || process.env.PORT || 3000;
app.listen(port),
  function () {
    console.log("Server started.......");
  };

//Fazendo a conexão com a API pelo método GET
app.get("/:artist/:song", async (req, res) => {
  const { artist, song } = req.params;

  try {
    const { data } = await api.get(`${artist}/${song}`);
    //Salvando os dados de input para o MongoDB
    const dadosDeBusca = {
      artist: artist,
      song: song,
    };
    DataModel.collection.insertOne(dadosDeBusca); //Inserindo o dado no DB
    console.log(data);
    return res.send(data.lyrics);
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.post("/recentsearches", (req, res) => {
  DataModel.find({}, { _id: 0 }) //Encontrando os dados para listagem, excluindo a tag id
    .select("artist song") //Selecionando apenas as tags artist e song, que é o que me interessa
    .exec((err, data) => {
      //Executando a função
      if (err) {
        console.log(err);
      } else {
        //Trazendo a resposta como JSON Stringificado, com a tag <pre> no HTML para melhor visualização
        res.send(`<pre>${JSON.stringify(data, null, "\t")}</pre>`);
      }
    });
});
