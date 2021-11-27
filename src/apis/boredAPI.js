// https://www.boredapi.com/documentation#endpoints-price

const got = require('got')
const boredApiURL = "http://www.boredapi.com/api/activity"
// simular erros, como mudar a url pra ver se o sistema printa esses erros e como ele se comporta
async function requestBoredAPI(searchParams){
	try {
		const response = await got(boredApiURL, {
			searchParams: { ...searchParams },
			responseType: 'json',
			resolveBodyOnly: true
		});
        return response
	} catch (error) {   
		console.log(error)
        return (error)
	}
};
module.exports = { requestBoredAPI }
