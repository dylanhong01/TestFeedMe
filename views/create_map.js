var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
	zoom: 13, // The larger the zoom number, the bigger the zoom
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var rectangle = new google.maps.Rectangle();


function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	loadEvents()
}

function loadEvents() 
{
	var http = new XMLHttpRequest();
	var response_string;
	var url = "http://localhost:3000/see-events";
	http.open("GET", url, true);
    //http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            response_string = http.responseText;
            getMyLocation(response_string);
            sendEvents(response_string);
        }
    }
    http.send(null);
} 

function sendEvents (results) 
{
	var html = "";


	document.getElementById("list_of_event").innerHTML = "<p>Hey i made it here</p>";
}


function getMyLocation(results) {
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap(results);
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap(results)
{
	me = new google.maps.LatLng(myLat, myLng);
	
	// Update map and go there...
	map.panTo(me);
	
	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "Here I Am!"
	});
	marker.setMap(map);
		
	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
}



//proof of concept geolocations
// TODO: hard code all academic and res buildings on campus
//       or at least enough to get the point accross
var building_locations =
{	
  "TischLibrary" : {"lat":42.406204, "lng":-71.118877},
  "Halligan" : {"lat":42.408215, "lng":-71.116240},
  "574" : {"lat":42.403515, "lng":-71.113987},
  "CampusCenter" : {"lat":42.4075, "lng":-71.1190},
  "Carmichael Hall" : {"lat":42.409489, "lng":-71.122417},
  "Prez Lawn" : {"lat":42.407049, "lng":-71.120636},
  "Dewick" : {"lat":42.405327, "lng":-71.121081},
  "TischGym" : {"lat":42.409026, "lng":-71.115491},
  "SEC" : {"lat":42.405984, "lng":-71.116886},
  "SoGo" : {"lat":42.404970, "lng":-71.118651},

};


function geolocation_of_building (building) 
{
	building_locations[building];
}