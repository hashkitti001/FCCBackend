let express = require('express');
let app = express();
let bodyParser = require("body-parser")
const dotenv = require("dotenv").config()
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
//Logger middleware 
// app.use((req, res, next) => {
//      //Log a string with request method, path and ip
//      console.log(`${req.method} ${req.path} - ${req.ip}`)
//      next()
// })
absolutePath = __dirname + "/views/index.html"
app.get("/", (req, res) => {
    res.sendFile(absolutePath);  
})
app.get("/json", (req,res) => {
   let msg =  process.env.MESSAGE_STYLE === "uppercase"? "HELLO JSON" : "Hello json"
    res.status(200).json({"message": msg})
   
})
//Get timestamp
const timeStampMiddleWare = 
app.get("/now", (req, res, next) => {
    req.time = new Date().toString()
    next()
}, (req, res) => {
    res.status(200).json({"time": req.time})
})
app.get("/:word/echo", (req, res) => {
    let word = req.params.word
    console.log(word)
    res.send({echo: word})
})


app.route("/name").get((req, res) => {
    let {first, last} = req.query
    res.send({name: `${first} ${last}`})
}).post((req, res ) => {
    let {first, last} = req.body
    res.json({name: `${first} ${last}`})
})
module.exports = app;
