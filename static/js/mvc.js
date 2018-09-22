// Start with 5 static places
var locations = [
  {title: 'New Delhi, India', location: {lat: 28.38, lng: 77.12}},
  {title: 'Banglore, India', location: {lat: 12.9716, lng: 77.5946}},
  {title: 'Jaipur, India', location: {lat: 26.9124, lng: 75.7873}},
  {title: 'Varanasi, India', location: {lat: 25.3176, lng: 82.9739}},
  {title: 'Chennai, India', location: {lat: 13.0827, lng: 80.2707}},
  {title: 'Mumbai, India', location: {lat: 19.0760, lng: 72.8777}}
];


// Knoctout binding
window.onload = function() {
	ko.applyBindings(new ViewModel());
}


// View Model
var ViewModel = (function() {
	function vmSkeleton() {
		var self = this;
        
        // locations array
		this.locations = ko.observableArray([]);
        
        // set as observable and subscribe to when selectAll changes
        this.selectAll = ko.computed(function() {
            var flag = true;
            
            for (var i = 0; i < this.locations().length; i++) {
                flag = flag && this.locations()[i].s();
            }
            return flag;
        }, this);
        
        // error message
        this.errorMessage = ko.observable("");
        
		this.init();
	}

	vmSkeleton.prototype.init = function() {
		this.loadLoactions();
	};
	
	vmSkeleton.prototype.loadLoactions = function() {
		for (var i = 0; i < window.locations.length; i++) {
			var l = {};
			l.data = window.locations[i];
			l.s = ko.observable(true);
            
            l.s.subscribe(function(selected) {
                if (selected === true) {
                    addPlace(this.data);
                } else {
                    removePlace(this.data);
                }
            }, l);
		    
            // populatePlace (from map.js) returns the marker associated with this location
            // this is used to operate on the marker on the map
            l.data.mapMarkerDetail = populatePlace(l.data);
            
            // get api data: since I'm working on a static list, which is pretty small, 
            // I'm getting all api information at the beginning.
            this.getWikipediaDetails(l.data.title, i);
            
            // add this location to the array
            this.locations.push(l);
		}
	};
	
	vmSkeleton.prototype.checkOrUncheckAll = function(data, event) {
        var checked = event.target.checked;
        for (var i = 0; i < this.locations().length; i++) {
			var l = this.locations()[i];
			l.s(checked); 
            if (checked === true) {
                addPlace(l.data);
            } else {
                removePlace(l.data);
            }
		}
	};	
    
    // Get third party api (here, Wikipedia), details associated with the place if it is available
    vmSkeleton.prototype.getWikipediaDetails = function(title, i) {
        var self = this;
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() { self.renderContents(i, httpRequest) };
        httpRequest.open('GET', 'https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&srlimit=2&list=search&srsearch=' + title, true);
        httpRequest.send();    
    }

    vmSkeleton.prototype.renderContents = function(i, httpRequest) {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            var l = this.locations()[i];
            var m = {};
            m.title = l.title;
            m.data = l.data;
            m.s = l.s;
            
            var content = "";
            if (httpRequest.status === 200) {
                var response = JSON.parse(httpRequest.responseText);
                if(response && response.query && response.query.search && response.query.search[0]) {
                    var res1 = response.query.search[0].snippet;
//                    console.log(response);
                    content = res1;                     
                    content += "<br /><div style='font-size: .8em; color: #aaa;'><i>Source: Wikipedia</i></div>";
                }
                else {
                    content = "<i style='font-size: .8em;'>The content couldn't be loaded.</i>";
                }
            } else {
                // There was a problem with the request.
                // For example, the response may have a 404 (Not Found)
                // or 500 (Internal Server Error) response code.
                if(httpRequest.status == 404) {
                    content = "<i style='font-size: .8em;'>A Wikipedia article for this city was not found.</i>";
                }
                else {
                    content = "<i style='font-size: .8em;'>There was a problem getting to Wikipedia.</i>";
                }
            }
            
            m.data.wiki = content;
            m.data.mapMarkerDetail.content = content;
            this.locations.replace(l, m);

        } else {
            // Not ready yet.
        }
    
    }
    
    return vmSkeleton;
})();