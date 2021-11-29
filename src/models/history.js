const mongoose = require("../database")  

mongoose.Promise = global.Promise               

const historySchema = new mongoose.Schema({
    field:{
        type:String
    },
    search:{
        type:String
    },
    day: {
        type: String
    },
    month:{
        type:Number
    },
    year:{
        type:Number
    }
})

const History = mongoose.model('history', historySchema)

module.exports = History