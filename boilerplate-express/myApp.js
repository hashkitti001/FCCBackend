let express = require('express');
let app = express();
const dotenv = require("dotenv").config()
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));
app.use((req, res, next) => {
     //Log a string with request method, path and ip
     console.log(`${req.method} ${req.path} - ${req.ip}`)
     next()
})
absolutePath = __dirname + "/views/index.html"
app.get("/", (req, res) => {
    res.sendFile(absolutePath);  
})
app.get("/json", (req,res) => {
   let msg =  process.env.MESSAGE_STYLE === "uppercase"? "HELLO JSON" : "Hello json"
    res.status(200).json({"message": msg})
   
})
































 module.exports = app;
