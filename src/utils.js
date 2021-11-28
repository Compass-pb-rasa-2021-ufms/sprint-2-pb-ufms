	
/* 
 * Por uma questão de usabilidade (buscando facilitar o entendimento do usuário) a página HTML,
 * referente ao formulario de busca de atividades, atua com uma escala de [0,100] ao inves de [0.00, 1.00]
 * como definido pela www.boredapi.com por isso deve haver uma conversão ao receber os parametros
*/
function treatsBoredApiInput(searchParams) {
	var objectValue = searchParams

	// não existem atividade com 0 participantes
	if (objectValue['participants'] == 0){
		objectValue['participants'] = 1
	}

	// se o numero de preco minimo existir realiza a divisão por 100
	// para que esse numero esteja de acordo com o definido pela API
	if (objectValue['minprice']){
		objectValue['minprice'] = objectValue['minprice']/100
	}
	if (objectValue['maxprice']){
		objectValue['maxprice'] = objectValue['maxprice']/100
	}

	if (objectValue['minaccessibility']){
		objectValue['minaccessibility'] = objectValue['minaccessibility']/100
	}

	if (objectValue['maxaccessibility']){
		objectValue['maxaccessibility'] = objectValue['maxaccessibility']/100
	}
	return objectValue
}

function formatDate(date) {
    dformat = [date.getMonth()+1,
               date.getDate(),
               date.getFullYear()].join('/')+' '+
              [date.getHours(),
				date.getMinutes(),
				date.getSeconds()].join(':');

	console.log('dformat', dformat)
	return dformat
}

module.exports = { treatsBoredApiInput, formatDate }