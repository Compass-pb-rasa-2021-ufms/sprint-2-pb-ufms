const mongoose = require("mongoose")

mongoose.connect("mongodb://root:root@mongodb:27017/", { useMongoClient: true })
mongoose.Promise = global.Promise

module.exports = mongoose