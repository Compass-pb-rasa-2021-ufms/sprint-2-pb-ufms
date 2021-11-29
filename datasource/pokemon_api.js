import axios from "axios";

export const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

export const fetchPokemonsDataFromAPI = async () => {
  const pokemonPromises = [];

  for (let i = 1; i <= 150; i++) {
    pokemonPromises.push(
      axios.get(getPokemonUrl(i)).then((response) => response.data)
    );
  }

  const pokemons = await Promise.all(pokemonPromises);

  return pokemons;
};

export const fetchPokemonsByName = async (pokemonName) => {
  try {
    if (pokemonName !== "") {
      const url = getPokemonUrl(pokemonName);
      const pokemonResponse = await axios.get(url);

      const pokemons = pokemonResponse.data;

      return [pokemons];
    }

    return await fetchPokemonsDataFromAPI();
  } catch (error) {
    console.error(error);
  }
};
