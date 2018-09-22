// map variable that is used to refer to the map throughout
var map;


// initialize the map
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 28.38, lng: 77.12},
		zoom: 4
	});	
}

// Create marker corresponding to a place 
function populatePlace(place) {
//    console.log("populatePlace: " + JSON.stringify(place));
    var marker = new google.maps.Marker({
		position: place.location,
		map: map,
        animation: google.maps.Animation.DROP,
		title: place.title,
		draggable: false,
		animation: google.maps.Animation.DROP,
        icon: makeMarkerIcon('0091ff')
	});
    
//    console.log("populatePlace: place: " + JSON.stringify(place));
    
    // add an info window
    var largeInfowindow = new google.maps.InfoWindow();
    
    // add an info window to the marker
    marker.addListener('click', function() {
        largeInfowindow.marker = this;
        this.setIcon(makeMarkerIcon('FFFF24'));
        populateInfoWindow(this, largeInfowindow);
	});
    
    return marker;
}


// Remove a place marker when a place is unchecked
function removePlace(lData) {
//    console.log("remove Place: " + JSON.stringify(lData.title));
    lData.mapMarkerDetail.setMap(null);
}


// Add a place marker when a place is checked
function addPlace(lData) {
//    console.log("add Place: " + JSON.stringify(lData.title));
    lData.mapMarkerDetail.setMap(map);
}


// Populate info window with details
function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker == marker) {
        infowindow.marker = marker;
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
            marker.setIcon(makeMarkerIcon('0091ff'));
          });
        
        // Add content to info window. Can be made richer and as needed.
        var content = "<div class='infoWindowTitle'>" + marker.title + "</div>";
        if(marker.content) {
            content += "<div class='infoWindowContent'>" + marker.content + "</div>";
        }
        
        infowindow.setContent(content);
        infowindow.open(map, marker);
    }
}


// Change the marker icon color when it is clicked
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
    return markerImage;
}
