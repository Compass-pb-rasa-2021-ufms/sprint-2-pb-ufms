(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

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

//Função responsavel por tratar o retorno da API-Location
function dataResult(responseData){
    document.getElementById('fieldReceiveData').innerHTML = "<span class=\"test_style\">" + "IP: " + responseData['ip'] + "<br>" +
    "País: " + responseData['country'] + "<br>" +
    "Cidade: " + responseData['city'] + "<br>" +
    "Estado: " + responseData['regionName'] + "<br>" +
    "Latitude: " + responseData['latitude'] + "<br>" +
    "Longitude: " + responseData['longitude'] + "</span>";
};
*/
},{}]},{},[1]);
