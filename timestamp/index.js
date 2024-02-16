// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { time } = require('console');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... f
app.get("/api/", function (req, res) {
  let date = new Date()
  let unixOffset = date.getTime()
  let utc = date.toUTCString()
  res.json({ "unix": unixOffset, "utc": utc });
});
const isInvalidDate = (date) => {
  return date.toUTCString() === "Invalid Date"
}
app.get("/api/:date", function (req, res) {
  /*There are two types of input 
  DD-MM-YY
  Numerical 
  and a condition to return the current time if nothing is specified
  */

  let date = new Date(req.params.date)
  //  console.log(isInvalidDate())
  if (isInvalidDate(date)) {
    date = new Date(+req.params.date)
  }
  if (isInvalidDate(date)) {
    res.json({ error: "Invalid date" })
    return;
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })

  //console.log(dateObj, unixOffset)
  //res.json({greeting: 'hello API'});
});




// listen for requests :)
var listener = app.listen(9000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
