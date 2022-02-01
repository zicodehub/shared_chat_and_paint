const videoGrid = document.getElementById("webcamDiv")
const my_preview = document.getElementById("my_preview");
var my_video = document.getElementById("output");

const addVideoStream = (video, stream) => {
	video.src = stream;
	video.addEventListener("loadedmetadata", ()=>{
		video.play()
		videoGrid.append(video)
	})
}

const initCam = () => {
	var context = my_preview.getContext('2d');
	console.log('	début du recording')
	my_preview.width = 900;
	my_preview.height = 700;

	my_preview.width = my_preview.width;
	my_preview.height = my_preview.height;


	var socket = io();

	function logger(msg){
	    $('#log').text(msg);
	}

	function loadCamera(stream){
	  try {
	      my_video.srcObject = stream;
	      console.log("stream")
	  } 
	  
	  catch (error) {
   		console.log("objetxt")
	  }

	   logger("Camera connected");
	}

	function loadFail(){

	    logger("Camera not connected");
	}

	function Draw(video,context){
	    context.drawImage(video,0,0,context.width,context.height);
	    socket.emit('stream',my_preview.toDataURL('image/webp'));
	}

	$(function(){
	    navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia );

	    if(navigator.getUserMedia)
	    {
	    	console.log('cest ok')
	        navigator.getUserMedia({
	            video: true, 
	            audio: true
	        },loadCamera,loadFail);
	    }
	    else {
	    	alert("Votre navigateur ne supporte pas la webcam")
	    }

	    // setInterval(function(){
	    //     Draw(video,context);
	    // },0.1);
	});


}

const conference = () => {
	let 
}

let dodo = document.getElementById("webcam")
dodo.addEventListener("click", initCam)
