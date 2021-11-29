const mongoose = require('mongoose');

async function connectDB(){
    await mongoose.connect('mongodb://root:root@dbmongo:27017/');
}

module.exports = connectDB;
