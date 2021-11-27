const got = require('got')
const numbersApiURL = "http://numbersapi.com/"

async function requestNumbersAPI(number){
	try {
		requestURL = numbersApiURL + number
		const response = await got(requestURL, {resolveBodyOnly: true});
        return response
	} catch (error) {
		console.log(error);
        return (error)
	}
};

module.exports = { requestNumbersAPI }