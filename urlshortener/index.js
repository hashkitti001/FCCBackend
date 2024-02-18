require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose")
const Url = require("./urlModel")
const dns = require("node:dns")
// Basic Configuration
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
//Connects to the database
let dbConn = async () => {
  try {
  await mongoose.connect(process.env.MONGO_URI)
  console.log("Connected successfully")
  
}
  catch(e) {
    console.log(e)
  }
}
dbConn()
const generateURLId = () => {
  return Math.floor(Math.random() * 1000)
}
app.get('/api/shorturl/:id', async(req, res) => {
  try {
     let shortURLId = parseInt(req.params.id, 10)
     const ans = await Url.findOne({id: shortURLId})
    if(ans != null && !(ans.longurl.startsWith("http"))){
      res.redirect(`https://${ans.longurl}`)
    }
    else if(ans != null && ans.longurl.startsWith("http")){
       res.redirect(ans.longurl)
    }
    else {
      res.json({message: "No such URL on this service"})
    }
    // res.redirect("https://www.google.com")
  } catch(e){
        console.error("Something went wrong", e)
        res.status(500).json({message: "Internal server error"})
  }
})
app.post('/api/shorturl', async(req, res) => {
  try { 
    let { url } = req.body
    dns.lookup(url, async (err, address) => {
      if(err){
        res.json({message: "Try another URL or complete this one"})
      }
      else {
        const shortURLId = generateURLId()
        const newURL = new Url({
          "id": shortURLId,
          "longurl": url
        })
        await newURL.save()
        res.status(201).json({
          original_url: url, 
          short_url: shortURLId
        })
      }
    })
    
  }
catch(e) {
 res.status(500).json({message:"Internal Server Error"})
}
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
