const express = require('express')
const path = require('path');
const axios = require('axios')
const Articles = require('../models/articles')
const History = require('../models/history')


const router = express.Router()


//rota para página principal
router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname+'../../../public/index.html'));
})

//rota para página de favoritos
router.get('/lista', async (req, res) => {
    res.sendFile(path.join(__dirname+'../../../public/favorites.html'));
})

//rota para histórico
router.get('/history', async (req, res) => {
    res.sendFile(path.join(__dirname+'../../../public/history.html'));
})

//retorna notícias gerais
router.get('/noticias', async (req, res) => {
    try {
    
        //extraindo os dados da api
        const { data:{data} } = await axios('http://api.mediastack.com/v1/news?access_key='+process.env.API_KEY+'&languages=pt')
        console.log(data)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})


//retorna notícias por categoria
router.post('/categoria', async (req, res) =>{
    try {
        const {categoria} = req.body
        const API_KEY = '743db5d581db75b4108b77d5f629e39e'
        const { data:{data} } = await axios(`http://api.mediastack.com/v1/news?access_key=`+process.env.API_KEY+`&languages=pt&categories=${categoria}`)
        //extraindo os dados da api
        res.json(data)
        console.log("pug")

    } catch (error) {
        console.log(error)
    }
    
})

//retorna notícias por palavra chave
router.post('/keyword', async (req, res) =>{
    try {
        const {keyword} = req.body
        const API_KEY = '743db5d581db75b4108b77d5f629e39e'
        const { data:{data} } = await axios(`http://api.mediastack.com/v1/news?access_key=`+process.env.API_KEY+`&languages=pt&keywords=${keyword}`)
        //extraindo os dados da api
        res.json(data)
    } catch (error) {
        console.log(error)
    }
    
})

// salva links nos favoritos
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


//retornar links salvos nos favoritos
router.post('/saved', async (req, res) =>{
    try {
        const response = await Articles.find()
        //extraindo os dados da api
        res.json(response)  

    } catch (error) {
        console.log(error)
    }
    
})

//salva dados nos histórico
router.post('/save-history', async (req, res) =>{
    try {
        const {field,search,day,month,year} = req.body
        const response = await History.create({
            field,
            search,
            day,
            month,
            year
        })
        //extraindo os dados da api
        res.json(response)

    } catch (error) {
        console.log(error)
    }
    
})

//retorna dados do histórico
router.post('/history-saved', async (req, res) =>{
    try {
        const response = await History.find().sort({"year":1,"month":1,"day":1})
        //extraindo os dados da api
        res.json(response)  

    } catch (error) {
        console.log(error)
    }
    
})

//retorna dados do histórico por palavra-chave
router.post('/history-keyword', async (req, res) =>{
    try {
        const response = await History.find({field:'keyword'}).sort({"year":1,"month":1,"day":1})
        //extraindo os dados da api
        res.json(response)  

    } catch (error) {
        console.log(error)
    }
    
})

//retorna dados do histórico por categoria
router.post('/history-category', async (req, res) =>{
    try {
        const response = await History.find({field:'category'}).sort({"year":1,"month":1,"day":1})
        //extraindo os dados da api
        res.json(response)  

    } catch (error) {
        console.log(error)
    }
    
})

// deleta dados do histórico e dos favoritos
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



module.exports = app => app.use('/', router)