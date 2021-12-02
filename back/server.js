//Instância das libs-------------------------------------------------------------------------------------------------------
//express: responsável por encaminhar as requests 
const express = require('express');
//cors: permite que um aplicativo web seja executado em uma origem e acesse recursos de um servidor de outra origem
const cors = require("cors");
//Instância do arquivo api.js responsável por retornar os resultados obtidos atraves do endereço IP informado
const api = require("./api");
//dotev: responsável pelas variáveis de ambiente do projeto
require("dotenv").config();
//-------------------------------------------------------------------------------------------------------------------------

//EXPRESS------------------------------------------------------------------------------------------------------------------
//Chamada para a lib express dentro da const app
const app = express();
//Informa a const app = express que será utilizado a lib cors
app.use(cors());
//-------------------------------------------------------------------------------------------------------------------------

app.use(express.static(path.join(__dirname, '..', '/front')));

//MONGODB------------------------------------------------------------------------------------------------------------------
//Instância do arquivo mongo.js responsável por fazer a comunicação com o banco de dados que armazena as buscas realizadas
const factoryMongo = require("./mongo");
//Instância do objeto factoryMongo que realizara todas as operações com o banco de dados
const instance = factoryMongo("resultados", "mongodb+srv://dezan:adm@cluster0.mnvnq.mongodb.net/resultados?retryWrites=true&w=majority");
//Inicializa a conexão com o mongodb
instance.connectBD();
//Verifica a conexão com o banco de dados após inicialização
instance.checkConnection();
//-------------------------------------------------------------------------------------------------------------------------

//ROTAS--------------------------------------------------------------------------------------------------------------------
//Backend está escutando atráves da porta 8080
app.listen(8080, () => {
  //Realiza um console.log informando onde a rota foi iniciada HOST_BACK:PORT_BACK
  console.log(`Backend iniciado na porta 8080`);
});

//Rota GET definida para receber o endereço IP passado via input no frontend
//É realizado o envio da informação para o endereço da API definido no arquivo api.js
//que realiza o retorno da informação para o backend o qual direciona para o front
app.get('/:ip', async function (req, res) {
  //const ip recebe o valor de params passado via req
  const {ip} = req.params;
  //É realizado a tentativa de comunicação com a API
  //Caso a comunicação ocorra sem erro é retornado as informações para o front
  try{
    //Atribui a const data = retorno da API, que recebe await devido a necessidade da assíncronicidade
    if(await instance.consultData(ip) == null){
      const {data} = await api.get(`${ip}`);
      instance.insertData(instance.dataForMongo(data));
      //Retorna o resultado como resposta para o front
      return res.send(formatReturn(data));
    }else{
      return res.send(await instance.consultData(ip));
    }
  //Caso ocorra algum problema
  }catch(error){
    console.log("Erro na comunicação ({ip})BACK->API - " + error);
    //O retorno para o front será a mensagem "Erro na comunicação BACK->API - " + o erro ocorrido
    res.send("Erro na comunicação BACK->API - " + error);
  }
});

app.get('/', async function (req, res){
  res.sendFile(path.join(__dirname, '../front/index.html'));
});

//ROTA POST definida para receber o retorno do mongodb
app.post("/log", async (req,res) => {
  //Caso a comunicação ocorra sem erro é retornado as informações para o front
  try{
    //Retorna o resultado da busca no banco de dados e realizar o retorno para o front
    return res.send(await instance.consultAll());
  //Caso ocorra algum problema
  }catch(error){
    console.log("Erro na comunicação (/log)BACK->API - " + error);
    //O retorno para o front será a mensagem "Erro na comunicação BACK->API - " + o erro ocorrido
    return res.send({error: error.message});
  }
});
//-------------------------------------------------------------------------------------------------------------------------

//FUNCOES------------------------------------------------------------------------------------------------------------------
function formatReturn(input){
  const format = {
    ip: input.query,
    country: input.country,
    city: input.city,
    regionName: input.regionName,
    latitude: input.lat,
    longitude: input.lon
  };

  return format;
};
//-------------------------------------------------------------------------------------------------------------------------