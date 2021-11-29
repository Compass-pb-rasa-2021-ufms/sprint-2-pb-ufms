//o qual passa a resposta da função dataResult() que através do INNERHTML anexa ao código HTML da pagina
const getData = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const ip = document.getElementById("ip-input").value;
  axios.get(`http://localhost:3000/${ip}`).then((response) => {
      dataResult(response.data);
  }).catch((error) => console.log(error));
};

/*Aguarda o elemento de id "search-button" para realizar a ação de envio do endereço IP para o backend*/
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getData);

//Função responsavel por tratar o retorno da API-Location
function dataResult(responseData){
  document.getElementById('fieldReceiveData').innerHTML = "<span class=\"test_style\">" + "IP: " + responseData['ip'] + "<br>" +
  "País: " + responseData['country'] + "<br>" +
  "Cidade: " + responseData['city'] + "<br>" +
  "Estado: " + responseData['regionName'] + "<br>" +
  "Latitude: " + responseData['latitude'] + "<br>" +
  "Longitude: " + responseData['longitude'] + "</span>";
};

//Função responsavel por tratar o retorno da API-Location
function dataResult(responseData){
  document.getElementById('fieldReceiveData').innerHTML = "<span class=\"test_style\">" + "IP: " + responseData['ip'] + "<br>" +
  "País: " + responseData['country'] + "<br>" +
  "Cidade: " + responseData['city'] + "<br>" +
  "Estado: " + responseData['regionName'] + "<br>" +
  "Latitude: " + responseData['latitude'] + "<br>" +
  "Longitude: " + responseData['longitude'] + "</span>";
};