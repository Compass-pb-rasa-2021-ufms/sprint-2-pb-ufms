//Variável que recebe a lista da página HTML
var lista = document.querySelector('[data-list]');

/*Variável que recebe o botão OK da página na HTML e chamada do seu método ADDEVENTLISTENER para realizar a devida função quando é clickado.const*/ 
botaoOk = document.getElementById('okbutton'); 
botaoOk.addEventListener('click' , getContent);

//Função que realiza o que o botão OK deseja.
async function getContent() {
  //Recebe o input da página principal
  let inputText = document.querySelector('[data-form-input]').value;
  //Faz a validação desse INPUT
  if(inputText.length == 8 && /^[0-9]+$/.test(inputText)){
    //Recebe os dados da API em formato JSOn
    const response = await fetch(inputText);
    const data = await response.json();
    //Verifica se foi encontrado um erro, se sim, informa a mensagem de CEP inexistente
    if(data.hasOwnProperty('erro')){
      exibeMensagemErroInexistente();
    }else{
      //Se não encontrar erro exibe na página os dados do CEP informado.
      preencheLista(data);
    }
  }else{
    //Mensagem de CEP inválido que é exibida quando o valor válidado não está correto.
    exibeMensagemErroInvalido();
  }
  //Limpa a caixa de texto que o usuário informa dados
  document.querySelector('[data-form-input]').value = "";
}

//Método que chama todos os outros métodos necessários para preencher a lista com os dados
function preencheLista(dados){
  const endereco = [];
  insereDadosArray(dados, endereco);
  zeraLista();
  insereDadosList(endereco);
} 

//Método que insere na lista todos os dados a partir do vetor de dados informado
function insereDadosList(endereco){
  for(let i = 0; i < 10; i++){
    const tarefa = document.createElement('li');
    tarefa.classList.add('task');
    const conteudo = `<p class="content">${endereco[i]}</p>`;
    tarefa.innerHTML = conteudo;
    lista.appendChild(tarefa);
  }
}

//Percorre todos os dados do arquivo json inserindo devidamente no vetor endereço
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

//Limpa a lista da página tornando nulo todos os filhos dela
function zeraLista(){
  for(let i = 0; i < 10; i++){
    if(lista.lastChild != null){
        lista.lastChild.remove();
    }
  }
}

//Cria uma mensagem de erro quando o CEP é inválido, limpa a lista e exibe a mensagem
function exibeMensagemErroInvalido(){
  const tarefa = document.createElement('li');
  const conteudo = `<p class="content">CEP INVALIDO</p>`;
  tarefa.innerHTML = conteudo;
  zeraLista();
  lista.appendChild(tarefa);
}

//Cria uma mensagem de erro quando o CEP é inexistente, limpa a lista e exibe a mensagem
function exibeMensagemErroInexistente(){
  const tarefa = document.createElement('li');
  const conteudo = `<p class="content">CEP INEXISTENTE</p>`;
  tarefa.innerHTML = conteudo;
  zeraLista();
  lista.appendChild(tarefa);
}