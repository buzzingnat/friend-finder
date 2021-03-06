// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require(`fs`);

var jsonRoutes = (app, data) => {
    // Displays all friends
    app.get("/api/friends", function(req, res) {
        res.json(data);
    });
};

var matchFriends = (data) => {
	var match = {name: "", photo: ""},
	user = data[data.length-1],
	smallestDifference = 500; // start with a higher number than is possible to calculate
    // compare survey results of last friend in friends.js file with all others
    for (var i = 0; i < data.length - 1; i++) {
    	var totalDifference = 0;
    	data[i].scores.forEach(function(value, index){
    		totalDifference -= Math.abs(value - user.scores[index]);
    	});
    	totalDifference = Math.abs(totalDifference);
    	if (totalDifference < smallestDifference) {
			smallestDifference = totalDifference;
			match.name = data[i].name;
			match.photo = data[i].photo;
		}
    }
    // return closest match
    console.log(`Closest match is:\n${match.name}\nwith a match distance of\n${smallestDifference}`);
    return match;
};

var postNewData = (app, data) => {
    // Create new friends - takes in JSON input
    app.post("/api/new", function(req, res) {
        var newfriend = req.body;
        data.push(newfriend);
        fs.writeFile(
            'app/data/friends.js',
            `var friendObject = ` + JSON.stringify(data, null, 2) + `; module.exports = friendObject;`,
            function(err) {
                if (err) throw err;
        });
        var match = matchFriends(data);
        var value = 'value';
        res.json(match);
    });
};

exports.jsonRoutes = jsonRoutes;
exports.postNewData = postNewData;
