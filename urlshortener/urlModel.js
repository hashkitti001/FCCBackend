const mongoose = require('mongoose')
const urlSchema = new mongoose.Schema(
    {
        "identifier": Number,
        "longurl": String
    }
)
const Url = mongoose.model("Url", urlSchema)
module.exports = Url