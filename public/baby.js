
function toggleBaby() {
	var toggleBaby = document.getElementById("toggleBaby");
	if (toggleBaby.style.display === "block") {
		toggleBaby.style.display = "none";
	} else {
		toggleBaby.style.display = "block";
	}
}
function toggleFeed(){
	var toggleFeed = document.getElementById("toggleFeed");
	if (toggleFeed.style.display === "block") {
		toggleFeed.style.display = "none";
	} else {
		toggleFeed.style.display = "block";
	}
}
function toggleDiaper() {
	var toggleDiaper = document.getElementById("toggleDiaper");
	if (toggleDiaper.style.display === "block") {
		toggleDiaper.style.display = "none";
	} else {
		toggleDiaper.style.display = "block";
	}
	}
	//stop submit from rerouting
	$(function() {
		$('#newBaby').submit(function(event) {
			event.preventDefault(); // Stops browser from navigating away from page
			var data;
			// build a json object or do something with the form, store in data
			$.post('/newBaby', data, function(resp) {
				alert(resp);
				// do something when it was successful
			});
		});
	});

	//trying to get all the database back as JSON
function getAll(){
	console.log("inside getAll")
    // $.getJSON('/getdata', function(res){
    //     console.log(res);
    // })
}