(function ($) {
  "use strict";

  let $searchText = $('[data-js="search-input"]').get();
  let $pokemonsListElement = $('[data-js="pokedex"]').get();

  function initialize() {
    initEvents();
  }

  function initEvents() {
    $('[data-js="search-button"]').on("click", handlerSearchButton);
  }

  function handlerSearchButton(e) {
    e.preventDefault();

    const ajax = new XMLHttpRequest();

    const textToSearch = $searchText.value;

    const URL = textToSearch
      ? `https://app-analia-beatriz.cloud.okteto.net/searchPokemon/${textToSearch}`
      : `https://app-analia-beatriz.cloud.okteto.net/pokemonsList`;

    ajax.open("GET", URL, false);

    ajax.send();

    let gamesJsonDecoded = JSON.parse(ajax.responseText);

    $pokemonsListElement.innerHTML = gamesJsonDecoded;
  }

  initialize();
})(window.DOM);