//Require para o mongoose, que auxilia na conexão com o banco.
const mongoose = require('mongoose')
const link = "mongodb://root:root@mongodb:27017/" 

function connectToDatabase(){
    mongoose.connect(link, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })

    const db = mongoose.connection
    db.on("error", (error) => console.log(error))
}

module.exports = connectToDatabase