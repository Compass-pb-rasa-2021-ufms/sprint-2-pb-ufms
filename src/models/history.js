const mongoose = require('mongoose')

//estabelecendo a conexao
mongoose.connect('mongodb://mongodb:27017')


mongoose.Promise = global.Promise               

const historySchema = new mongoose.Schema({
    field:{
        type:String
    },
    search:{
        type:String
    },
    date: {
        type: String
    },
})

const History = mongoose.model('history', historySchema)

module.exports = History