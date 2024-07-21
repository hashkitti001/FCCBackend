const mongoose = require("mongoose")

async function dbConnect(){
    await mongoose.connect("mongodb://localhost:27017/exercise_api")
    console.log("Connected to database!")
}   
module.exports = dbConnect