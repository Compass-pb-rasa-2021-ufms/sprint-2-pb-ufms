const mongoose = require("mongoose")
mongoose.connect("mongodb://root:root@mongodb:27017/")

module.exports = mongoose