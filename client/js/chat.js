var chat;

function ChatObject(socket, lastname, firstname) {
  // Handle message input for the chat
  // When the send button has been clicked... or when the enter key has been pressed -> send content to the chat
  // server
  $("#chatTextInput").keypress(function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      sendChatMessage();
    }
  });

  $("#chatSendButton").click(function () {
    sendChatMessage();
  });

  function sendChatMessage() {
    if ($("#chatTextInput").val() != "") {
      // This function is defined on the JavaScript code that runs on the server
      const chatText = $("#chatTextInput").val();
      socket.emit("msg", chatText);
      $("#chatTextInput").val("");

      $("#chatMessages").append(
        // display the message to the sende
        "<p><strong>" + lastname + "</strong> : " + chatText + "</p>"
      );
      $("#chatMessages").get(0).scrollTop =
        $("#chatMessages").get(0).scrollHeight;
    }
  }

  // This function is called when a chat message arrives. Called by the server !
  socket.on("message", (data) => {
    console.log("dagiubuuuibioiuioussta", data);
    // appends the incoming message to the messageLogs
    $("#chatMessages").append(
      "<p><strong>" + data.lastname + "</strong> : " + data.msg + "</p>"
    );
    $("#chatMessages").get(0).scrollTop =
      $("#chatMessages").get(0).scrollHeight;
  });
}
