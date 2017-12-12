var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
	zoom: 15, // The larger the zoom number, the bigger the zoom
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
	getMyLocation();
}

function getMyLocation() {
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);
	
	// Update map and go there...
	map.panTo(me);
	
	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "Your Location"
	});
	marker.setMap(map);
		
	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});

	placeEvents();

}

function placeEvents()
{
	var sendIt = new XMLHttpRequest();
	var url = "https://frozen-depths-55905.herokuapp.com/print";
	
	sendIt.open("POST", url, true);
	sendIt.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	

	sendIt.send();
	sendIt.onreadystatechange = function()
	{
		if (sendIt.readyState == 4 && sendIt.status == 200)
		{
			rawData = sendIt.responseText;
			events = JSON.parse(rawData);
			//format_events(events);

			for (count = 0; count < events.length; count++)
			{
				var food = events[count].food;
            	var location = events[count].location;
           	 	var room = events[count].room;
            	var timeStart = events[count].timeStart;
            	var timeEnd = events[count].timeEnd;
            	var xtrainfo = events[count].extraInfo;
				var infoContent = '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">'
									+ food + '</h1></div>';
				infoContent += '<div id="bodyContent"><p>' + "Location: " + location + '</p>';
				infoContent += '<p>' + "Room: " + room + '</p>';
				infoContent += '<p>' + "Start Time: " + timeStart + '</p>';
				infoContent += '<p>' + "End Time: " + timeEnd + '</p>';
				infoContent += '<p>' + "Additional Information: " + xtrainfo + '</p></div>';
				var newInfoWindow = new google.maps.InfoWindow ({
					content:infoContent
				});
    			var newMarker = new google.maps.Marker({
        			position: geolocation_of_building(location),
        			icon: 'FMsmall.png',
        			map: map,
        			title: events[count].food,
        			infowindow: newInfoWindow
  				});
				google.maps.event.addListener(newMarker, 'click', function() {
					this.infowindow.open(map, this);
				});
  				newMarker.setMap(map);
			}
		}
	}
}

/*

function format_events (all_events)
{
    var len = all_events.length;
    var toprint = "";
    for (i = 0; i < len; i++) {
        if (all_events[i] != null) {
            var groupings = [];
            groupings.push(all_events[i]);
            var build = all_events[i].location;
            delete all_events[i];
            for (j = i + 1; j < len; j++) {
                if (all_events[i] != null) {
                    if (build == all_events[j].location) {
                        groupings.push(all_events);
                        delete all_events[j]
                    }
                }
            }
            toprint += print_grouping(groupings);
        }
    }
 
 
    document.getElementById('list_of_event').innerHTML = toprint;
 
}
 
function print_grouping (groupings) {
    var infoContent = "";
    for (i in groupings) {
        var food = groupings[i].food;
        var location = groupings[i].location;  
        var room = groupings[i].room;
        var timeStart = groupings[i].timeStart;
        var timeEnd = groupings[i].timeEnd;
        var xtrainfo = groupings[i].extraInfo;
 
        infoContent = '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">'
                        + location + '</h1></div>';
        infoContent += '<div id="bodyContent"><p>' + "Food: " + food + '</p>';
        infoContent += '<p>' + "Room: " + room + '</p>';
        infoContent += '<p>' + "Start Time: " + timeStart + '</p>';
        infoContent += '<p>' + "End Time: " + timeEnd + '</p>';
        infoContent += '<p>' + "Additional Information: " + xtrainfo + '</p></div>'
    }
 
    //TODO send this
    return infoContent;
}

*/

var building_locations =
{
	"TischLibrary" : {"lat":42.406204, "lng":-71.118877},
	"Halligan" : {"lat":42.408215, "lng":-71.116240},
	"574" : {"lat":42.403515, "lng":-71.113987},
	"CampusCenter" : {"lat":42.4075, "lng":-71.1190},
	"Carm" : {"lat":42.409489, "lng":-71.122417},
	"PrezLawn" : {"lat":42.407049, "lng":-71.120636},
	"Dewick" : {"lat":42.405327, "lng":-71.121081},
	"TischGym" : {"lat":42.409026, "lng":-71.115491},
	"SEC" : {"lat":42.405984, "lng":-71.116886},
	"SoGo" : {"lat":42.404970, "lng":-71.118651},

};


function geolocation_of_building (building) 
{
	var latLng = building_locations[building];
	return latLng;
}



























