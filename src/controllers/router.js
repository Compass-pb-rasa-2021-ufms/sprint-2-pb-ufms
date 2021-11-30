const express = require("express")
const path = require("path")
const router = express.Router()

// Definindo a rota para adicionar o favorito
const Favorito = require("../models/favorito")
router.post("/favoritar", async(req, res) => {
    try {
        const favorito = await Favorito.create(req.body)
        return res.send({ favorito })

    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: "Não favoritado :( "})
    }
})

module.exports = app => app.use("/house", router)