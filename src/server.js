const express = require('express');
const app = express();
const path = require('path')

// APIs
const numbersAPI = require('./apis/numbersAPI');
const translateAPI = require('./apis/translateAPI');
const boredAPI = require('./apis/boredAPI');

// database
const mongo = require('./database');

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
				const responseObj = {
					textoEN: data,
					textoPT: translatedText
				}
				
				res.render(path.join(__dirname, '..', '/public/views/number.html'), responseObj);
				mongo.addToHistory('numbersAPI', { numero: req.query.numero},  responseObj)
			
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
	const resultadoTratado = utils.treatsBoredApiInput(req.query)
	boredAPI.requestBoredAPI(resultadoTratado).then(function(data) {
		/*
		 * Caso boredAPI não encontre uma atividade com os parâmetros informados pelo usuário
		 * ela retornará uma resposta contendo a string que informa tal acontecimento. Então, 
		 * antes de qualquer processo de tramaneto de dados, realizo a busca por essa string na
		 * resposta e, caso encontrada, renderizo a página informando o acontecido. Isso evita que
		 * o processamento de dados continue em um cenário em que esses dados forem inexistentes
		 * ou seja, quando nenhuma atividade for encontrada. 
		*/
		if (Object.values(data).indexOf('No activity found with the specified parameters') > -1){
			res.render(path.join(__dirname, '..', '/public/views/activity.html'), { naoEncontrado: true });
			return
		}

		var t1 = translateAPI.requestTranslateAPI(data.activity)
		var t2 = translateAPI.requestTranslateAPI(data.type)
		Promise.all([t1, t2]).then((values) => {
			
			const responseObj =  {
				atividade: `${data.activity} (${values[0]})`,
				tipo: `${data.type} (${values[1]})`,
				participantes: data.participants,
				preco: data.price,
				link: data.link,
				acessibilidade: data.accessibility
			}

			// verificar se a data contem dados
			res.render(path.join(__dirname, '..', '/public/views/activity.html'), responseObj);

			// salva no banco
			mongo.addToHistory('boredAPI', resultadoTratado, data)
		}).catch(err => console.log(err))
	})
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public/views/index.html'));
});

// Rota que retorna a página de histórico de requisições
app.get('/history', (req, res) => {
	list = mongo.showHistory()
	list.then((item) => {
		res.render(path.join(__dirname, '..', '/public/views/history.html'), { newListItems : item } );
	})
});

// Rota que deleta um item da página de histórico de requisições
app.delete('/history:id', async (req, res) => {
	if(req.params) {
		const isDeleted = await mongo.deleteFromHistory(req.params['id'])
		if (isDeleted) {
			res.sendStatus(204)
			return
		}
	}
	res.sendStatus(404)
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server rodando');
  mongo.connectToMongo()
});