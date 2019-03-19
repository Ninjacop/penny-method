var timesCompleted = 0;
var currentScore = 1;
var seconds = 0, minutes = 0, hours = 0;
var toggleMode = 0; // 0 = light, 1 = dark
var backdrop = "./img/backdrop.jpg";
var check = "./img/check.png";

window.onload = (function() {
  // set all the check marks to not show
	resetMarks();
	timer();
});

/*
document.addEventListener("keypress", function(event) {
    console.log(event.which);
});
*/

document.addEventListener("keypress", parseInput);

function resetMarks() {
  for (var i = 1; i < 6; i++) {
    document.getElementById(i.toString()).src = backdrop;
  }
}

function changeChecks() {
	for (var i = 1; i < currentScore; i++) {
		document.getElementById(i.toString()).src = check;
	}
}

function update() {
  document.getElementById("completion").innerHTML = "Times Completed: " + timesCompleted;
}

function addMarkAt(i) {
  document.getElementById(i).src = check;
}

function parseInput(event) {
  if (event.which == 32) { // space
    if (currentScore >= 6) { // < is used for catching errors
      currentScore = 1;
      resetMarks();
      timesCompleted++;
      update();
    } else {
    	//console.log(currentScore);
      addMarkAt(currentScore++);
		}   
	} else if (event.which == 114) { // R key
		resetMarks();
		currentScore = 1;
	}
}

function timer() {
  t = setTimeout(add, 1000);
}

function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }
  }

	document.getElementById("stopwatch").textContent = "Time spent: " + 
	  (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
		(seconds > 9 ? seconds : "0" + seconds);

	timer();
}

function lightMode() {
	if (toggleMode == 1) {
		backdrop = "./img/backdrop.jpg";
		check = "./img/check.png";
		toggleMode = 0;
		document.body.style.backgroundColor = "#ffffff";
		document.body.style.color = "#000000";
		changeChecks();
		if (currentScore == 1) {
		  resetMarks();
	  }
	}
}

function darkMode() {
  if (toggleMode === 0) {
		backdrop = "./img/darkBackdrop.png";
		check = "./img/darkCheck.png";
		toggleMode = 1;
		document.body.style.backgroundColor = "#2c3038";
		document.body.style.color = "#ffffff";
		changeChecks();
	}

	if (currentScore == 1) {
		resetMarks();
	}
}