//To extract the required port number

//first define a global variable to store the portNumber
var httpPortNumber;
var httpsPortNumber;
function getPort(){
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", function () {
var parser = new DOMParser();
var doc = parser.parseFromString(xhr.responseText, "application/xml");
httpPortNumber= doc.getElementsByTagName("node-port-http").item(0).textContent;
httpsPortNumber= doc.getElementsByTagName("node-port-https").item(0).textContent;
alert("Port : " + httpPortNumber);
});
// depending on whether we are in a browser or on a phone
// the location of the config file is different
// if we are on a phone then http and https won't be present

//then call and process the XML File
var configLocation = "res/port.xml";
xhr.open("get", configLocation, true);
xhr.send();
}