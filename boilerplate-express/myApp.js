let express = require('express');
let app = express();
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));
absolutePath = __dirname + "/views/index.html"
app.get("/", (req, res) => {
    res.sendFile(absolutePath);  
})
app.get("/json", (req,res) => {
    res.status(200).json({"message": "Hello json"})
})
































 module.exports = app;
