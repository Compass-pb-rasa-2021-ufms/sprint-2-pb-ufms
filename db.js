const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect('mongodb+srv://leoliveira:senha123@weatherapi.g4oda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    });
}

module.exports = connectDB;