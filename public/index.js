//manipulçaõ do uso do html,manipulção atraves do input de busca
(function ($) {
  "use strict";
  //Busca do elemento de input de busca e busca o elemento de listagem pokemons
  let $searchText = $('[data-js="search-input"]').get();
  let $pokemonsListElement = $('[data-js="pokedex"]').get();

  //Função initialize que inicia os eventos 
  function initialize() {
    initEvents();
  }
  //que colocará o list no click de busca
  function initEvents() {
    $('[data-js="search-button"]').on("click", handlerSearchButton);
  }
  //Quando ocorrer o evento de click, ele irá chamar essa função 
  function handlerSearchButton(e) {
    e.preventDefault();
    //Nova instancia do XMLHtprequest do ajax
    const ajax = new XMLHttpRequest();

    const textToSearch = $searchText.value;
    //pega o valor do input e verifica 
    const URL = textToSearch
      ? `https://app-analia-beatriz.cloud.okteto.net/searchPokemon/${textToSearch}`
      : `https://app-analia-beatriz.cloud.okteto.net/pokemonsList`;
    //abrir o request declarando o verbo utilizando o get e que não será assincrono
    ajax.open("GET", URL, false);
    //interrompe a execução e passar para proxima instrução a partir do momento que recebe o retorno da request 
    ajax.send();
    //pega o retorno(lista de pokemons) e atribui ao innerHTML
    let gamesJsonDecoded = JSON.parse(ajax.responseText);

    $pokemonsListElement.innerHTML = gamesJsonDecoded;
  }

  initialize();
})(window.DOM);