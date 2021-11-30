const express = require('express')
const axios = require('axios')

const router = express.Router()

let house = "gryffindor"

router.get(`/${house}`, async(req, res) => {
	try{
		const { data } = await axios(`https://hp-api.herokuapp.com/api/characters/house/${house}`)
        console.log(data)
        return res.json(data)
	}
	catch(error){	
		throw new Error(error.message) 
	}
})

module.exports = app => app.use("/house", router)