function startup() {
	trackLocation();
	addPointLinePoly();
	getEarthquakes();
	getPort();
	loadW3HTML();
	startFormDataLoad();
	document.addEventListener('DOMContentLoaded', function () {
		trackAndCircle();
	}, false);
}

function loadW3HTML() {
		w3.includeHTML();
	}