const express = require('express');									// podemos usar o proprio express para fazer isso
const app = express();
const path = require('path')

// APIs
const numbersAPI = require('./apis/numbersAPI');
const translateAPI = require('./apis/translateAPI');
const boredAPI = require('./apis/boredAPI');

// utils
const utils = require('./utils');

// engine para enviar dados e exbili-los dinamicamente no arquivo HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// permite o parser
app.use(express.urlencoded({ extended: true })); 

// expondo a pasta public, que serve os arquivos staticos como css/js/image
app.use(express.static(path.join(__dirname, '..', '/public')));


/* 
 * Essa rota redireciona para a página de curiosidade dos numeros e, assim que o usuário
 * preencher o campo com o número desejado é realizada uma requisição a API de curiosidade
 * de numeros e, em seguida, sua resposta é enviada a uma API de tradução, a qual vai traduzir
 * a resposta da API anterior para o portugues.
*/ 
app.get('/numero', (req, res) => {
	if (req.query.numero){
		numbersAPI.requestNumbersAPI(req.query.numero).then(function(data) { 
			translateAPI.requestTranslateAPI(data).then(function(translatedText){
				res.render(path.join(__dirname, '..', '/public/views/number.html'), {
					textoEN: data,
					textoPT: translatedText
				});
			
			})
		}).catch(err => console.log(err));
	} else {
		res.render(path.join(__dirname, '..', '/public/views/number.html'), {
			vazio: 'O campo acima está vazio, por favor, informe um número.'
		});
	}
});


// Essa rota direciona o usuário para a pagina que contém o formulário para buscar atividades
app.get('/entediado', (req, res) => {
	res.render(path.join(__dirname, '..', '/public/views/activityform.html'));
});

/*
 * Realiza uma requisição a API de atividades e depois realiza uma requisição
 * para a API de traduções com a reposta obtida pela API de atividades.
 * Por fim, retorna a página contendo a atividade em questão, bem como sua tradução.
*/
app.get('/atividade', (req, res) => {
	resultadoTratado = utils.treatsBoredApiInput(req.query)
	boredAPI.requestBoredAPI(resultadoTratado).then(function(data) {
		var t1 = translateAPI.requestTranslateAPI(data.activity)
		var t2 = translateAPI.requestTranslateAPI(data.type)
		Promise.all([t1, t2]).then((values) => {
			// verificar se a data contem dados
			res.render(path.join(__dirname, '..', '/public/views/activity.html'), {
				atividade: data.activity,
				atividadeTraduziza: values[0],
				tipo: data.type,
				tipoTraduzido: values[1],
				participantes: data.participants,
				preco: data.price,
				link: data.link,
				acessibilidade: data.accessibility
			});
		}).catch(err => console.log(err))
	})
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public/views/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server rodando');
});