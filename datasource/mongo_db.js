import { MongoClient } from "mongodb";
//Variaveis de ambiente e definição da url de acesso ao mongoBD
const getMongoDbURL = () =>
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.v6frm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//metodo para salvar os pokemons
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
//método para buscar os pokemons
export const fetchPokemonsDataFromDB = async () => {
  try {
    //pegamos uma instancia do banco 
    const client = await MongoClient.connect(getMongoDbURL());
    const db = client.db();
    //pegamos uma refencia da coleção, p
    const pokemonsCollection = db.collection("pokemons");
    //Busca dentro da coleção e ocultação da informção e retornar em formato array
    const pokemons = await pokemonsCollection.find({}, { _id: 1 }).toArray();
    //fecha a conexão do banco 
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
    //Buscar o dado do document que possui o atributo name com o valor name
    const pokemons = await pokemonsCollection
      .find({
        name: pokemonName,
      })
      .toArray();
     //uso do toarray por questão de padronização
    await client.close();

    return pokemons;
  } catch (error) {
    console.log(error);
  }
};
