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

dotenv.config();

const app = express();

app.use(express.static(path.join(`./public`)));

app.get("/", async (_, res) => {
  // const pokemonsData = await fetchPokemonsDataFromAPI();
  const pokemonsData = await fetchPokemonsDataFromDB();

  // await savePokemonsData(pokemonsData);

  const listPokemonsElements = buildPokemonsElements(pokemonsData);

  const html = getAppBody(listPokemonsElements);

  res.send(html);
});

app.get("/searchPokemon/:pokemonName", async (req, res) => {
  const pokemonNameSearch = req.params.pokemonName;

  const pokemonsData = await fetchPokemonsDataFromDBByName(pokemonNameSearch);

  const listPokemonsElements = buildPokemonsElements(pokemonsData);

  res.json(listPokemonsElements);
});

app.get("/pokemonsList", async (_, res) => {
  const pokemonsData = await fetchPokemonsDataFromDB();

  const listPokemonsElements = buildPokemonsElements(pokemonsData);

  res.json(listPokemonsElements);
});

app.listen(process.env.PORT || 3000);
