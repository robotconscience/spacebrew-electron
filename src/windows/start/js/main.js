window.$ = window.jQuery = require('./js/jquery-2.1.0.min.js');
var ipc = require('ipc');

$(document).ready(function(){
	var isStarted = false;
	$("#start").click(function(){
		console.log(isStarted);
		if ( isStarted ){
			ipc.send("stopServer");
			$("#start").css("background", "green");
			$("#start").html("Start server");
			isStarted = false;
		} else {
			ipc.send("startServer");
			$("#start").css("background", "red");
			$("#start").html("Stop server");
			isStarted = true;
		}
	})
});