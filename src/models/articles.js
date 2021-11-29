const mongoose = require('mongoose')

//estabelecendo a conexao
mongoose.connect('mongodb://mongodb:27017')


mongoose.Promise = global.Promise               

const articlesSchema = new mongoose.Schema({
    author:{
        type:String
    },
    title:{
        type:String
    },
    description: {
        type: String
    },
    url:{
        type:String
    },
    source:{
        type:String
    },
    
    image:{
        type:String
    },
    category:{
        type:String
    },
    language:{
        type:String
    }
})

const Articles = mongoose.model('articles', articlesSchema)

module.exports = Articles