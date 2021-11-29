const getLyric = (e) => {
  e.preventDefault(); //Impedir que o formulário atualize
  e.stopPropagation(); //Impedir que o formulário atualize

  //Pegando elementos do HTML e salvando-os em variáveis
  var artist = document.getElementById("artist-name").value;
  var song = document.getElementById("song-name").value;
  //var resultBox = document.getElementById("result-box");
  var resultP = document.getElementById("result-p");

  if (!artist || !song) {
    //Verifica se digitou tudo certinho
    console.log("No entries");
    resultP.innerHTML = "Are you sure you've filled all the fields? &#129300";
  } else {
    console.log("Entries verified");
    //Fazendo a comunicação com a API pelo método GET
    axios
      /*.get(
        `https://simple-lyrics-search-byfake.herokuapp.com/${artist}/${song}`
      )*/

      .get(`${artist}/${song}`) /*Uso em Local*/
      .then((response) => {
        console.log(response);
        if (!response.data.error) {
          var lyricText = response.data;
          var splitLetterText = lyricText.split(" ");
          splitText = lyricText.split("\n");
          if (splitLetterText[0] === "Paroles") {
            splitText.shift();
          }
          lyricText = splitText.join("<br />");
          resultP.innerHTML = lyricText;
        } else {
          resultP.innerHTML =
            "No results were found.<br /> (The database is mostly composed by songs in english).";
        }
      })
      .catch((error) => {
        console.log(error);
        resultP.innerHTML =
          "There were no results based on your input. <br /> Are you sure you've filled all the fields? &#129300";
      });
  }
};

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getLyric);
searchButton.addEventListener("keyup", function (e) {
  // Number 13 is the "Enter" key on the keyboard
  if (e.key === 13 || 32) {
    getLyric();
  }
});
