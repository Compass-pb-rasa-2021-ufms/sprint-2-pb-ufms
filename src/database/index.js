const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_DB)
mongoose.Promise = global.Promise

module.exports = mongoose