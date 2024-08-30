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

app.get("/api/:date", (req, res) => {
  const paramsDate = req.params.date;

  let dateObj;

  // Check if paramsDate is a Unix timestamp (all digits)
  if (!isNaN(paramsDate) && paramsDate.length === 10) {
    // Convert Unix timestamp (in seconds) to a Date object
    dateObj = new Date(parseInt(paramsDate) * 1000);
  } else if (!isNaN(paramsDate) && paramsDate.length === 13) {
    // If timestamp is in milliseconds
    dateObj = new Date(parseInt(paramsDate));
  } else {
    // Attempt to parse it as a normal date string
    dateObj = new Date(paramsDate);
  }

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return res.status(400).json({ msg: "Invalid date format" });
  }

  // Convert to UTC string
  const utcDate = dateObj.toUTCString();

  // Convert to Unix timestamp (in seconds)
  const unixTimestamp = Math.floor(dateObj.getTime() / 1000);

  res.status(200).json({ unixTimestamp, utcDate });

  console.log("UTC Date:", utcDate);
  console.log("Unix Timestamp:", unixTimestamp);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
