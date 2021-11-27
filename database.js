const mongoose = require('mongoose');

function connectToDatabase(){
    //BD 
    mongoose.connect('mongodb+srv://leonardolino:91525437@cluster0.bbr4t.mongodb.net/sprint2-pb-compass?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    });
    const db = mongoose.connection;
    db.on("error", (error) => console.log(error));
}

module.exports = connectToDatabase;