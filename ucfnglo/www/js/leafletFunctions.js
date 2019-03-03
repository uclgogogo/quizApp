function addPointLinePoly() {

// add a point
    L.marker([51.5, -0.09]).addTo(mymap)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
// add a circle
    L.circle([51.508, -0.11], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a circle.");
// add a polygon with 3 end points (i.e. a triangle)
    var myPolygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a polygon.");

    mymap.setView([51.505, -0.09], 13);
}

var xhrFormData;

function startFormDataLoad() {
    xhrFormData = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/getGeoJSON/formdata/geom/" + httpPortNumber;
    xhrFormData.open("GET", url, true);
    xhrFormData.onreadystatechange = formDataResponse;
    xhrFormData.send();
}

function formDataResponse() {
    if (xhrFormData.readyState == 4) {
        // once the data is ready, process the data
        var formData = xhrFormData.responseText;
        loadFormData(formData);
    }
}

// keep the layer global so that we can automatically pop up a
// pop-up menu on a point if necessary
// we can also use this to determine distance for the proximity alert

var formLayer;

function loadFormData(formData) {
    // convert the text received from the server to JSON
    var formJSON = JSON.parse(formData);
    // load the geoJSON layer
    formLayer = L.geoJson(formJSON, {
        // use point to layer to create the points
        pointToLayer: function (feature, latlng) {
            // in this case, we build an HTML DIV string
            // using the values in the data
            var htmlString = "<DIV id='popup'" + feature.properties.id + "><h2>" + feature.properties.name + "</h2><br>";
            htmlString = htmlString + "<h3>" + feature.properties.surname + "</h3><br>";
            htmlString = htmlString + "<input type='radio' name='answer' id ='" + feature.properties.id + "_1'/>" + feature.properties.module + "<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id ='" + feature.properties.id + "_2'/>" + feature.properties.language + "<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id ='" + feature.properties.id + "_3'/>" + feature.properties.lecturetime + "<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id ='" + feature.properties.id + "_4'/>" + feature.properties.port_id + "<br>";
            htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";
            // now include a hidden element with the answer
            // in this case the answer is alwasy the first choice
            // for the assignment this will of course vary - you can use
            feature.properties.correct_answer
            htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>1</div>";
            htmlString = htmlString + "</div>";
            return L.marker(latlng).bindPopup(htmlString);
        },
    }).addTo(mymap);
    mymap.fitBounds(formLayer.getBounds());
}
