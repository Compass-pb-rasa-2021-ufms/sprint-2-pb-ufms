import { MongoClient } from "mongodb";

const getMongoDbURL = () =>
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.v6frm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const savePokemonsData = async (data) => {
  try {
    const client = await MongoClient.connect(getMongoDbURL());
    const db = client.db();

    const pokemonsCollection = db.collection("pokemons");

    const result = await pokemonsCollection.insertMany(data);

    await client.close();
  } catch (error) {
    console.log(error);
  }
};

export const fetchPokemonsDataFromDB = async () => {
  try {
    const client = await MongoClient.connect(getMongoDbURL());
    const db = client.db();

    const pokemonsCollection = db.collection("pokemons");

    const pokemons = await pokemonsCollection.find({}, { _id: 1 }).toArray();

    await client.close();

    return pokemons;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPokemonsDataFromDBByName = async (pokemonName) => {
  try {
    const client = await MongoClient.connect(getMongoDbURL());
    const db = client.db();

    const pokemonsCollection = db.collection("pokemons");

    const pokemons = await pokemonsCollection
      .find({
        name: pokemonName,
      })
      .toArray();

    await client.close();

    return pokemons;
  } catch (error) {
    console.log(error);
  }
};
