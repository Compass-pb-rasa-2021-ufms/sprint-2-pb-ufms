/* 
 * Esse script é reponsável por manipular eventos de click para exibir
 * detalhes ocultos de um item ou exclui-lo do histórico de requisições.
*/

/*
 * Ao carregar, o script encontra no DOM todos os botões que exibirão os
 * detalhes quando clicados e os transforma em array
*/
var detailButtonsArr = Array.from(document.querySelectorAll("button.btnDetail"))

/*
 * Adicionando um listener aos botões encontrados, que, ao serem clicados
 * iniciarão um evento que invoca a função responsável por exbir os detalhes ocultos
 * recebendo como parâmetro o botão clicado no momento.
*/
detailButtonsArr.forEach((button) => {
  button.addEventListener("click", function() { showDetails(this) })
})


// Método responsável por exbir os detalhes ocultos de um item do histórico
function showDetails(element) { 
  // adiciona ao botão clicado, de maneira toggle, uma classe CSS que gera o efeito de botão clicado 
  element.classList.toggle("active")

  // altera o texto do botão de maneira dinâmica, quando clicado ou desclicado, com mesmo 
  // comportamento da classe CSS toggle acima
  let btnText = element.innerText;
  element.innerText = btnText == 'Exibir detalhes ▶' ? 'Ocultar detalhes ▼' : 'Exibir detalhes ▶';
  
  // Busca os detalhes a serem exibidos no DOM e adiciona uma classe CSS, de maneira toggle, que exibirá
  // ou esconderá os detalhes
  var details = element.nextElementSibling;
  details.classList.toggle("hidden");
}

// Envia a request de delete
function deleteFetch(id){
  fetch(`/history${id}`, { method: 'DELETE', })
  .then(()=> window.location.reload())
}

// Deleta um elemento do histórico
function deleteElement(element){
  /*
   * Utilizo a sintaxe abaixo para obter apenas o elemento pai, pois uma seleção diferente
   * como "element.parentElement.textContent" resulta não só no texto do pai, mas também no
   * texto do filho. Comportamento que não é interessante, pois esse texto se tornará json
  */
  const prevTag = element.parentNode.childNodes[0].textContent
  const userConfirm = confirm('Tem certeza isso? Após deletado o item excluido não pode ser recuperado.')

  if (userConfirm){ 
    const json = JSON.parse(prevTag)
    deleteFetch(json['_id'])   
  }
}