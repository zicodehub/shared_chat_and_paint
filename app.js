// app.js
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var siofu = require("socketio-file-upload");

// Creation of a web socket server using socketio
var port = process.env.PORT || 3000
var io = require("socket.io")(server);

// Indicate where static files are located
app.use(express.static(__dirname + "/client"));
app.use(siofu.router)

app.get("/uploads/", (req, res, next) => {
  res.sendFile(__dirname + "/uploads/"+req.query.path);
});

// app.post("/uploads/", (req, res, next) => {
//   res.sendFile(__dirname + "/uploads/"+req.query.path);
// });

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/client/paint.html");
});
app.get("/test", (req, res, next) => {
  res.send("It works !!!");
});

io.on("connection", (client) => {

  var uploader = new siofu();
      uploader.dir = "uploads";
      uploader.listen(client);


  client.on("infouser", ({lastname, firstname}) => {
    // global storing of user data in the server with socket
    client.lastname = lastname;
    client.firstname = firstname;
    console.log(lastname, firstname, "est arrivé")
    client.broadcast.emit("welcome", {
      msg: `${lastname} a rejoint le chat`,
    });
  
  });
  client.on("msg", (msg) => {
    // console.log("msg SERVER: ", msg);
    // send user message to all
    client.broadcast.emit("message", {
      msg: msg,
      lastname: client.lastname,
      firstname: client.firstname,
    });
  });

  client.on("file", (filePath) => {
    console.log("file -> SERVER: ", filePath);
    // send user message to all
    client.broadcast.emit("file", {
      filePath: filePath,
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

server.listen(port, console.log(`server in running on port ${port}`));
