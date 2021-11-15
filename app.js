// app.js
var express = require("express");
var app = express();
var server = require("http").createServer(app);

// Creation of a web socket server using socketio

var io = require("socket.io")(server);

// Indicate where static files are located
app.use(express.static(__dirname + "/client"));
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/client/paint.html");
});
app.get("/test", (req, res, next) => {
  res.send("It works !!!");
});

io.on("connection", (client) => {
  client.on("infouser", (lastname, firstname) => {
    // global storing of user data in the server with socket
    client.lastname = lastname;
    client.firstname = firstname;
  });
  client.on("msg", (msg) => {
    console.log("msg SERVER: ", msg);
    // send user message to all
    client.broadcast.emit("message", {
      msg: msg,
      lastname: client.lastname,
      firstname: client.firstname,
    });
  });

  client.on("paint", (paintCommand) => {
    client.broadcast.emit("paint", paintCommand);
  });

  client.on('stream',function(data){
      client.broadcast.emit('stream', data);
  });

  console.log("Client connected...");
});
io.on("disconnect", () => {
  console.log("the user has left");
});

server.listen(8797, console.log("server in running on port 8797"));
