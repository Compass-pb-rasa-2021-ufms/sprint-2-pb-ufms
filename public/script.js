// Variaveis 'globais'
let attribute;
let rand;
let id;

// Definindo elementos que vem do html
const buttons = document.querySelectorAll('.btn');
const card = document.querySelector('.result');
card.addEventListener('click', sendDB)

/* Função base do app, onde passa por todos os .btn do html, gerando o valor do attribute 
para fazer a busca da carta.*/
buttons.forEach(function(currentBtn){
    currentBtn.addEventListener('click', async ()=>{
        //Garantia de carta aleatória, rand é usado como indice para retornar uma carta.
        rand = Math.floor(Math.random() * 300);
        attribute = currentBtn.value;
        axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?attribute=${attribute}`)
        .then((res) =>{
            id = res.data.data[rand].id;
            /* A api retorna todas as cartas com o atributo determinado, por isso 
            é necessário fazer um acesso ao data.data[rand]. Pois assim retorna apenas uma carta.
            Como essa função é só para visualização, a informação mostrada é apenas a imagem da carta. */ 
            document.querySelector('#carta').innerHTML = `<img src=${res.data.data[rand].card_images[0].image_url}>`
        })
    })
});

/* Função que garante o envio dos dados da carta randomizada na função anterior */
async function sendDB(){
    document.querySelector('#carta').innerHTML = '<p>Carta enviada para o deck</p>';
    /* Como na função anterior a gente define o ID da carta, eu consigo achar com precisão a carta randomizada e envia-lá pro bd
    Essa função está diretamente ligada com app.get('/:id'... no index.js */
    axios.get(id).then((response) => {
        document.querySelector('#carta').innerHTML = `<p> id da carta: ${id}`
    });
}
