
  // this variable will collect the html which will eventually be placed in the sidebar
  var sidebar_html = "";

  // arrays to hold copies of the markers and html used by the sidebar
  // because the function closure trick doesnt work there
  var gmarkers = [];
  var htmls = [];
  var i = 0;

  // A function to create the marker and set up the event window
  function createMarker(point,name,html) {
	var marker = new GMarker(point);
	GEvent.addListener(marker, "click", function() {
	  marker.openInfoWindowHtml(html);
	});
	// save the info we need to use later for the sidebar
	gmarkers[i] = marker;
	htmls[i] = html;
	// add a line to the sidebar html
	sidebar_html += '<a href="javascript:myclick(' + i + ')">' + name + '</a><br />';
	i++;
	return marker;
  }


  // This function picks up the click and opens the corresponding info window
  function myclick(i) {
	gmarkers[i].openInfoWindowHtml(htmls[i]);
  }


function load() {
	if (GBrowserIsCompatible()) {
	
	  // Read the data from ilg.xml
	  GDownloadUrl("../../../wp/wp-content/themes/web-standards-project/ilg_members.php", function(data, responseCode) {
		  var xmlDoc = GXml.parse(data);
		  // obtain the array of markers and loop through it
		  var markers = xmlDoc.documentElement.getElementsByTagName("marker");
		  
		  // create the map
		  var map = new GMap2(document.getElementById("ilg-map"));
		  map.addControl(new GLargeMapControl());
		  map.addControl(new GMapTypeControl());
		  // center the map at Nairobi, Kenya, Africa, lat -1.2744 long 36.8131, and set the zoom level to 1  
		  map.setCenter(new GLatLng(-1.2744,36.8131), 1);
		  map.setMapType(G_HYBRID_MAP);
	
		  for (var i = 0; i < markers.length; i++) {
			// obtain the attribues of each marker
			var lat = parseFloat(markers[i].getAttribute("lat"));
			var lng = parseFloat(markers[i].getAttribute("lng"));
			var point = new GLatLng(lat,lng);
			var html = "<div class=\"infobubble\">";
			html += markers[i].getAttribute("html");
			html += "</div>";
			var label = markers[i].getAttribute("label");
			// create the marker
			var marker = createMarker(point,label,html);
			map.addOverlay(marker);
		  }
		  
		  
		  // grab the item number for each member
		  
		  var memberlist = document.getElementById("ilg-member-list");
		  var members = memberlist.getElementsByTagName("li");
		  
		  for(j = 0; j < members.length; j++) {
		  	memberlink = members[j].getElementsByTagName("a");
			memberlink[0].setAttribute("onclick", "myclick(" + j + "); return false;");
		  }
		  
		  
		});
	}
	else {
		//alert("Oops! This doesn't work with your browser.");
	}

	// This Javascript is based on code provided by the
	// Blackpool Community Church Javascript Team
	// http://www.commchurch.freeserve.co.uk/   
	// http://www.econym.demon.co.uk/googlemaps/

}

//window.onload = load;
addOnLoad(load);


function Be(){try{
	if(window.XMLHttpRequest){
		return new XMLHttpRequest
	} 
	else if(typeof ActiveXObject!="undefined"){
		return new ActiveXObject("Microsoft.XMLHTTP")
	}
}catch(a){}return null}
