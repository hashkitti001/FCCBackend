require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose")
const Url = require("./urlModel")
const dns = require("node:dns")
const urlparser = require("node:url")
// Basic Configuration
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
//Connects to the database
let dbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected successfully")

  }
  catch (e) {
    console.log(e)
  }
}
dbConn()
app.get('/api/shorturl/:id', async (req, res) => {
      
  try {
    let foundURL = await Url.findOne({identifier: req.params.id})
    res.redirect(foundURL.longurl)
  } catch (e) {
    console.error("Something went wrong", e)
    res.status(500).json({ message: "Internal server error" })
  }
})
app.post('/api/shorturl', async (req, res) => {
  try {
    let { url } = req.body
    const dnslookup = dns.lookup(
      new URL(url).hostname,
      async (err, addr) => {
        if (!addr) {
          res.json({ error: "Invalid URL" })
        }
        else {
          const previousURLs = await Url.find({})
          const urlCount = previousURLs.length
          const newURL = new Url({
            identifier: urlCount,
            longurl: req.body.url
          })
          await newURL.save()
          res.status(201).json({
            original_url: req.body.url,
            short_url: urlCount
          })

        }
      })

  }

  catch (e) {
    res.status(500).json({ message: "Internal Server Error" })
    console.error(e)
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
