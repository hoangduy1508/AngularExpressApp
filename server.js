// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");

require('dotenv').config()
// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way
// to consume and produce data through the
// exposed APIs
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//importing route
let routes = require('./api/routes')

routes(app)

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/AngularExpressApp";
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.get("/api/status", function (req, res) {
  res.status(200).json({ status: "UP" });
});


