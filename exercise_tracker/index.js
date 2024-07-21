const express = require('express')
const app = express()
//const cors = require('cors')
const publicRouter = require('./routes/public')
require('dotenv').config()
const dbConnect = require("./utils/dbConnect")
//app.use(cors())
dbConnect()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))
app.use(publicRouter)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
