var express = require(`express`);
var path = require(`path`);
var bodyParser = require(`body-parser`);
var helmet = require('helmet');

var app = express();
app.use(helmet());
var PORT = process.env.PORT || 3000;

// local external files
// =============================================================
var data = require(`./app/data/friends.js`);
// native express function to have a folder display static files to browser
app.use(express.static('app/public'));
// routing for post and json data calls
var apiRoutes = require(`./app/routing/apiRoutes`);

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// call routing code
apiRoutes.jsonRoutes(app, data);
apiRoutes.postNewData(app, data);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
