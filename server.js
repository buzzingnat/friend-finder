var express = require(`express`);
var path = require(`path`);
var bodyParser = require(`body-parser`);
var _ = require(`lodash`);

var app = express();
var PORT = process.env.PORT || 3000;

// local external files
var data = require(`./app/data/friends.js`);
console.log(`file`, data[0].name);
var htmlRoutes = require(`./app/routing/htmlRoutes`);
var apiRoutes = require(`./app/routing/apiRoutes`);

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// call routing code
htmlRoutes.htmlRoutes(app, data);
apiRoutes.jsonRoutes(app, data);
apiRoutes.postNewData(app, data);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
