const mongoose = require('mongoose')
const urlSchema = new mongoose.Schema(
    {
        "index": Number,
        "longurl": String
    }
)
const Url = mongoose.model("Url", urlSchema)
module.exports = Url