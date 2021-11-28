const lista = document.querySelector('[data-list]');
const botaoOk = document.getElementById('okbutton'); 
botaoOk.addEventListener('click' , getContent);

async function getContent() {
  let inputText = document.querySelector('[data-form-input]').value;
  if(inputText.length == 8 && /^[0-9]+$/.test(inputText)){
    /*const response = await fetch('https://buscacep-compass.herokuapp.com/' + inputText);*/
    const response = await fetch('http://localhost:3000/' + inputText);
    const data = await response.json();
    if(data.hasOwnProperty('erro')){
      exibeMensagemErroInexistente();
    }else{
      preencheLista(data);
    }
  }else{
    exibeMensagemErroInvalido();
  }
  document.querySelector('[data-form-input]').value = "";
}

const preencheLista = (dados) => {
  const endereco = [];
  const lista = document.querySelector('[data-list]');
  insereDadosArray(dados, endereco);
  zeraLista();
  insereDadosList(lista, endereco);
} 

const insereDadosList = (lista, endereco) => {
  for(let i = 0; i < 10; i++){
    const tarefa = document.createElement('li');
    tarefa.classList.add('task');
    const conteudo = `<p class="content">${endereco[i]}</p>`;
    tarefa.innerHTML = conteudo;
    lista.appendChild(tarefa);
  }
}

const insereDadosArray  = (dados, endereco) => {
  endereco.push("CEP: " + dados.cep);
  endereco.push("Logradouro: " + dados.logradouro);
  endereco.push("Complemento: " + dados.complemento);
  endereco.push("Bairro: " + dados.bairro);
  endereco.push("Localidade: " + dados.localidade);
  endereco.push("UF: " + dados.uf);
  endereco.push("IBGE: " + dados.ibge);
  endereco.push("GIA: " + dados.gia);
  endereco.push("DDD: " + dados.ddd);
  endereco.push("SIAFI: " + dados.siafi);
}

function zeraLista(){
  for(let i = 0; i < 10; i++){
    if(document.querySelector('[data-list]').lastChild != null){
        document.querySelector('[data-list]').lastChild.remove();
    }
  }
}

const exibeMensagemErroInvalido = () => {
  const lista = document.querySelector('[data-list]')
  const tarefa = document.createElement('li');
  const conteudo = `<p class="content">CEP INVALIDO</p>`;
  zeraLista();
  tarefa.innerHTML = conteudo;
  lista.appendChild(tarefa);
}

const exibeMensagemErroInexistente = () => {
  const lista = document.querySelector('[data-list]')
  const tarefa = document.createElement('li');
  const conteudo = `<p class="content">CEP INEXISTENTE</p>`;
  zeraLista();
  tarefa.innerHTML = conteudo;
  lista.appendChild(tarefa);
}