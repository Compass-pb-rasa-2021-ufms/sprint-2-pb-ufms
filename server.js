import express from "express";
import path from "path";
import {
  fetchPokemonsDataFromAPI,
  fetchPokemonsByName,
} from "./datasource/pokemon_api.js";
import { getAppBody, buildPokemonsElements } from "./app.js";
import {
  savePokemonsData,
  fetchPokemonsDataFromDB,
  fetchPokemonsDataFromDBByName,
} from "./datasource/mongo_db.js";

import dotenv from "dotenv";

//uso do dotenv que permite uso de arquivos tipo env para variaveis de ambiente 
dotenv.config();

//criação de uma nova instancia express
const app = express();
//arquivos estaticos que seram retornados para o front-end
app.use(express.static(path.join(`./public`)));

app.get("/", async (_, res) => {
  // const pokemonsData = await fetchPokemonsDataFromAPI();
  //Busca todos os pokemons do mongodb, que irá retorna um vetor
  const pokemonsData = await fetchPokemonsDataFromDB();

  // await savePokemonsData(pokemonsData);
  //Retornar um string com todos os elementos de cada um dos pokemons
  const listPokemonsElements = buildPokemonsElements(pokemonsData);

  const html = getAppBody(listPokemonsElements);

  res.send(html);
});
// Pesquisa que recebe o nome como parametro, que busca no banco de dados os dados de um pokemon específico
app.get("/searchPokemon/:pokemonName", async (req, res) => {
  const pokemonNameSearch = req.params.pokemonName;

  const pokemonsData = await fetchPokemonsDataFromDBByName(pokemonNameSearch);

  const listPokemonsElements = buildPokemonsElements(pokemonsData);

  res.json(listPokemonsElements);
});
//Retorna só o conteudo da listagem de pokemons
app.get("/pokemonsList", async (_, res) => {
  const pokemonsData = await fetchPokemonsDataFromDB();

  const listPokemonsElements = buildPokemonsElements(pokemonsData);

  res.json(listPokemonsElements);
});

app.listen(process.env.PORT || 3000);
