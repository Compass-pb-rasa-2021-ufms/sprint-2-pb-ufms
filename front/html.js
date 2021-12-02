const axios = require('axios');

//o qual passa a resposta da função dataResult() que através do INNERHTML anexa ao código HTML da pagina
const getData = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ip = document.getElementById("ip-input").value;
    axios.get(`http://localhost:8080/${ip}`).then((response) => {
        dataResult(response.data);
    }).catch((error) => console.log(error));
};

/*Aguarda o elemento de id "search-button" para realizar a ação de envio do endereço IP para o backend*/
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getData);

/*
const returnData = (r) => {
    r.preventDefault();
    r.stopPropagation();
    axios.post(`http://localhost:8080/log`).then((response) =>{
        console.log(JSON.stringify(response.data));
        var prettyPrint = JSON.stringify(response.data, null, 4); 
        document.body.innerHTML = "<p class=\"overflow-style\">" + "<pre>" + prettyPrint + "</pre>" + "</p>";
    }).catch((error) => console.log("Esse erro esta no front! " + error));
};

const logButton = document.getElementById("log-button");
logButton.addEventListener("click", returnData);
*/

//Função responsavel por tratar o retorno da API-Location
function dataResult(input){
    document.getElementById('fieldReceiveData').innerHTML = "<span class=\"test_style\">" + "IP: " + input['ip'] + "<br>" +
    "País: " + input['country'] + "<br>" +
    "Cidade: " + input['city'] + "<br>" +
    "Estado: " + input['regionName'] + "<br>" +
    "Latitude: " + input['latitude'] + "<br>" +
    "Longitude: " + input['longitude'] + "</span>";
};
