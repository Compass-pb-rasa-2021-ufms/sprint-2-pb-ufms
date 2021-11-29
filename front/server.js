//Frameworks comunicacao--------------------------------
const express = require("express");
const server = express();
const cors = require("cors");
const api = require("./api");
const factoryMongo = require("../mongo");
require("dotenv").config();
//------------------------------------------------------
server.use(cors());
server.use(express.static("front"));
server.listen(3000);

//MongoDB-----------------------------------------------
const instance = factoryMongo("resultados", process.env.DATABASE_URL);
instance.connectBD();
instance.checkConnection();

//------------------------------------------------------
server.get("/:ip", async (req, res) => {
  const {ip} = req.params;
  try{
    if(await instance.consultData(ip) == null){
      const {data} = await api.get(`${ip}`);
      instance.insertData(instance.dataForMongo(data));
      return res.send(formatReturn(data));
    }else{
      return res.send(await instance.consultData(ip));
    }
  }catch(error){
    res.send({error: error.message});
  }
});
//--------------------------------------------------------
/*
server.get("/log/"), function(req, res){
  try{
    console.log("OKAY");
    //return res.send({teste: "ok"});
  }catch(error){
    console.log("ERRO NO BACK");
    res.send({error: error.message});
  }
};
*/
//---------------------------------------------------------

function formatReturn(responseAPI){
  const format = {
    ip: responseAPI.query,
    country: responseAPI.country,
    city: responseAPI.city,
    regionName: responseAPI.regionName,
    latitude: responseAPI.lat,
    longitude: responseAPI.lon
  };

  return format;
}