// https://github.com/LibreTranslate/LibreTranslate
// https://libretranslate.de/docs/

const got = require('got')
const translateApiURL =  'https://libretranslate.de/translate'
async function requestTranslateAPI(text){
	try {
		const {body} = await got.post(translateApiURL, {
            json: {q: text, source: "en", target: "pt"},
            responseType: 'json' 
        });
		textoTraduzido = body['translatedText']
		return textoTraduzido
	}
	catch (err) {
		console.error(err);
		return err
	}
};
module.exports = { requestTranslateAPI }
