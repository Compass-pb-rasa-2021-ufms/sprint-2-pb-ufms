const mongoose = require("../database/index")

const FavoritoSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    name: { type: String },
    house: { type: String},
    dateOfBirth: { type: String},
    patronus: { type: String},
    ancestry: { type: String},
})

const Favorito = mongoose.model("Favorito", FavoritoSchema)

module.exports = Favorito