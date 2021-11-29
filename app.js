export const getAppBody = (listPokemonsElements) => ` 
<!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <meta charset="UTF-8">
        <title>Pokedex</title>
        <link rel="stylesheet" href="./style.css" />
    </head>

    <body>
        <div class="container">

            <h1>pokedex</h1>
          
            <input search="Pokemon" data-js="search-input" type="text" />
            <button data-js="search-button">Search</button>
            
            <ul data-js="pokedex" class="pokedex">
                ${listPokemonsElements}
            </ul>
        </div>

        <script src="./dom.js"></script>
        <script src="./index.js"></script>
    </body> 
    </html>
    `;
//uso do reduce para retorna uma string com todos os pokemons
export const buildPokemonsElements = (pokemonsData) =>
  pokemonsData.reduce((accumulator, pokemon) => {
    const types = pokemon.types.map((typeInfo) => typeInfo.type.name);

    accumulator += getPokemonCard(
      pokemon.name,
      pokemon.sprites.front_default,
      pokemon.id,
      pokemon.name,
      types[0],
      types.join(" | ")
    );

    return accumulator;
  }, "");

export const getPokemonCard = (
  pokemonName,
  pokemonAvatarURL,
  pokemonId,
  firstType,
  types
) => `
  <li class="card ${firstType}"> 
    <img class = "card-image" alt="${pokemonName}" src="${pokemonAvatarURL}"/>
    <h2 class = "card-title"> ${pokemonId}.${pokemonName}</h2>
    <p class="card-subtitle">${types}</p>
    </li >
    `;
