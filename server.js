// Use the express module for nodeJS
// Express is a framework for implementing a more
// complete web server with nodeJS
var express = require('express');

var app = express.createServer();

// Indicate where static files are located
app.configure(function () {
    app.use(express.static(__dirname + '/client/'));
});
app.get('/', function (req, res) {
    //res.render('client/paint.html');
    res.redirect("/paint.html");
});
app.listen(80);

// Creation of a web socket server using nowJS
var nowjs = require("now");
var everyone = nowjs.initialize(app);


nowjs.on("connect", function () {
    console.log("Joined: " + this.user.clientId);
});

nowjs.on("disconnect", function () {
    console.log("Left: " + this.user.clientId);
});

// Function called by a chat client, passes the message to each client
// connected by calling its processIncomingChatMessage shared function
everyone.now.distributeMessage = function (message) {
    // send the message to everyone
    everyone.now.processIncomingChatMessage(this.now.name, message);
};