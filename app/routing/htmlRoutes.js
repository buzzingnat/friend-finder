// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require(`fs`);

// Routes
var htmlRoutes = function(app, data) {
  // Basic route that sends the user to the home page
  app.get("/", function(req, res) {
    console.log(`trying the / path`);
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
  app.get("/home", function(req, res) {
    console.log(`trying the /home path`);
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
  app.get("/survey", function(req, res) {
    console.log(`trying the /survey path`);
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });
  // make css stylesheet accessible
  app.get("/style.css", function(req, res) {
    console.log(`finding app/public/style.css`);
    res.sendFile(path.join(__dirname, "../public/style.css"));
  });
  app.get("/friendFinder-customColors.css", function(req, res) {
    console.log(`finding app/public/friendFinder-customColors.css`);
    res.sendFile(path.join(__dirname, "../public/friendFinder-customColors.css"));
  });
  // make copyright.js accessible
  app.get("/copyright.js", function(req, res) {
    console.log(`finding app/public/copyright.js`);
    res.sendFile(path.join(__dirname, "../public/copyright.js"));
  });
}

exports.htmlRoutes = htmlRoutes;
