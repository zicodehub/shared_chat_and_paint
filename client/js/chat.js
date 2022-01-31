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
        `<p class="msg sent"> <span class="msg-content msg-text">${chatText}</span> </p>`
      );
      $("#chatMessages").get(0).scrollTop = $("#chatMessages").get(0).scrollHeight;
    }
  }

  // This function is called when a chat message arrives. Called by the server !
  socket.on("message", (data) => {
    // console.log("dagiubuuuibioiuioussta", data);
    // appends the incoming message to the messageLogs
    $("#chatMessages").append(
        `<p class="msg received"><strong class="user-name"> ${data.firstname} </strong> :  <span class="msg-content msg-text">${data.msg}</span> </p>`
    );
    $("#chatMessages").get(0).scrollTop = $("#chatMessages").get(0).scrollHeight;
  });


  socket.on("file", (data) => {
    $("#chatMessages").append(
      `<p class="msg received"><strong  class="user-name"> ${data.lastname} </strong> : <span class="msg-content msg-file"> <a href="/uploads/?path=${data.filePath}" download=${data.filePath} class="msg-file-link" > Télécharger le fichier </a> </span> </p> `
    );
  });


  socket.on("welcome", (data) => {
    console.log("Welcommmmme !!!", data);
    // appends the incoming message to the messageLogs
    $("#chatMessages").append(
        `<p class="msg received received-from-system"><strong class="user-name user-system"> Système </strong> :  <span class="msg_content">${data.msg}</span> </p>`
    );
    $("#chatMessages").get(0).scrollTop ;
    $("#chatMessages").get(0).scrollHeight;
  });


}
  