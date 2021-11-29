const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect('mongodb+srv://leoliveira:senhainfalivel123@weatherapi.g4oda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    });
}

module.exports = connectDB;