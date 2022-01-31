var uploader = new SocketIOFileUpload(socket);
let fileInput = document.getElementById("siofu_input") ;
let submitButton = document.getElementById("send_siofu_input")
uploader.listenOnSubmit(submitButton, fileInput);

submitButton.addEventListener("click", (e)=> {
	const currentFile = fileInput.files[0]
    const duration = currentFile.size * 5 / 416448
    console.log("DURATION ", duration)

    setTimeout((e)=>{
        let fileName = currentFile.name
        console.log(fileName)
        socket.emit("file",  fileName)
        fileInput.value = ""

        $("#chatMessages").append(
	      `<p class="msg sent"><strong  class="user-name"> ${name} </strong> : <span class="msg-content msg-file"> <a href="/uploads/?path=${fileName}" download=${fileName} class="msg-file-link" > Télécharger le fichier </a> </span> </p> `
	    );

    }, duration)
})
