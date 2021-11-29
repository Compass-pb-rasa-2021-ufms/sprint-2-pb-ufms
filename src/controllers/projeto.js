const express = require('express')
const path = require('path');
const axios = require('axios')
const Articles = require('../models/articles')
const History = require('../models/history')


const router = express.Router()


router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname+'../../../public/index.html'));
})

router.get('/lista', async (req, res) => {
    res.sendFile(path.join(__dirname+'../../../public/favorites.html'));
})

router.get('/history', async (req, res) => {
    res.sendFile(path.join(__dirname+'../../../public/history.html'));
})

router.get('/noticias', async (req, res) => {
    try {
        const API_KEY = '743db5d581db75b4108b77d5f629e39e'
        //extraindo os dados da api
        const { data:{data} } = await axios('http://api.mediastack.com/v1/news?access_key='+API_KEY+'&languages=pt')
        console.log(data)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

router.post('/categoria', async (req, res) =>{
    try {
        const {categoria} = req.body
        const API_KEY = '743db5d581db75b4108b77d5f629e39e'
        const { data:{data} } = await axios(`http://api.mediastack.com/v1/news?access_key=`+API_KEY+`&languages=pt&categories=${categoria}`)
        //extraindo os dados da api
        res.json(data)
        console.log("pug")

    } catch (error) {
        console.log(error)
    }
    
})

router.post('/keyword', async (req, res) =>{
    try {
        const {keyword} = req.body
        const API_KEY = '743db5d581db75b4108b77d5f629e39e'
        const { data:{data} } = await axios(`http://api.mediastack.com/v1/news?access_key=`+API_KEY+`&languages=pt&keywords=${keyword}`)
        //extraindo os dados da api
        res.json(data)
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/save', async (req, res) =>{
    try {
        const {author, title, description, url, source,image, category,language} = req.body
        const response = await Articles.create({
            author,
            title,
            description,
            url,
            source,
            image,
            category,
            language
        })
        //extraindo os dados da api
        res.json(response)

    } catch (error) {
        console.log(error)
    }
    
})



router.post('/saved', async (req, res) =>{
    try {
        const response = await Articles.find()
        //extraindo os dados da api
        res.json(response)  

    } catch (error) {
        console.log(error)
    }
    
})

router.post('/save-history', async (req, res) =>{
    try {
        const {field,search,date} = req.body
        const response = await History.create({
            field,
            search,
            date
        })
        //extraindo os dados da api
        res.json(response)

    } catch (error) {
        console.log(error)
    }
    
})

router.post('/history-saved', async (req, res) =>{
    try {
        const response = await History.find()
        //extraindo os dados da api
        res.json(response)  

    } catch (error) {
        console.log(error)
    }
    
})

router.get('/delete', async (req, res) =>{
    try {
        const response = await Articles.deleteMany({})
        const response2 = await History.deleteMany({})
        //extraindo os dados da api
        res.json(response)  

    } catch (error) {
        console.log(error)
    }
    
})

router.get('/ret', async (req, res) =>{
    try {
        //const response = await Articles.find()
        //extraindo os dados da api
        res.json({"Ola":"Mundo"})  
        console.log("Ola")

    } catch (error) {
        console.log(error)
    }
    
})

module.exports = app => app.use('/', router)