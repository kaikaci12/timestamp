// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", (req, res) => {
  const paramsDate = req.params.date;
  if (!paramsDate) {
    return res.status(401).json({ msg: "please provide date" });
  }
  const utcDate = new Date(paramsDate).toUTCString();
  const unixTimestamp = Math.floor(new Date(paramsDate).getTime() / 1000);
  res.status(200).json({ unixTimestamp, utcDate });
  console.log("UTC Date:", utcDate);
  console.log("Unix Timestamp:", unixTimestamp);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
