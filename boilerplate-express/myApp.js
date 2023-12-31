let express = require('express');
let app = express();
absolutePath = __dirname + "/views/index.html"
app.get("/", (req, res) => {
    res.sendFile(absolutePath);
    
})
console.log(absolutePath)


































 module.exports = app;
