require("dotenv").config();
const mongoose = require("mongoose");

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

console.log(username, password);

async function dbConnect() {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.rmjefxt.mongodb.net/exercise_tracker`, {
            useNewUrlParser: true,
        });
        console.log("Connected to database!");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

module.exports = dbConnect;
