// Atenção com o nome da conexão
const mongoose = require("mongoose")
mongoose.connect("mongodb://mongodb:27017")

mongoose.Promise = global.Promise

const charactherSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    casa: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
})

const Characters = mongoose.model("characters", charactherSchema)

module.exports = Characters