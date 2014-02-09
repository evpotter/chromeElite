function showJams(zipcode){
	var keyapi = "5BAZ7QMPY2UEZNPCH5QKCCKQ";
	 var eventUrl = "http://api.jambase.com/events?zipCode="+zipcode+"&radius=10&page=0&api_key=7epku6upd99cy4y93xw9mgyz";
	$.getJSON(eventUrl,function(eventData){
		console.log(eventData['Events']);
		var allEvents = eventData['Events']; 
		console.log(allEvents.length);
		for(var i=0; i<allEvents.length; i++){
		console.log(allEvents[i]['TicketUrl']);
		var artistobj = allEvents[i]['Artists'];
		console.log(artistobj+":");
		var link  = artistobj[3];
	    console.log(link+"::");
		var venue =  allEvents[i]['Venue']['Address'];
 		console.log(venue+":::");
			for(var j=0; j<allEvents[i]['Artists']['length']; j++)
			{
				var artist = artistobj[j];
				var artistName = artist.Name;				
 				$('#events').append("<li><p>Name: "+artistName+"<br> Venue: "+venue+" <br>" + (link ? "<a href = " + link + "> Buy Tickets Now </a>" : "") + "</p></li>");
			}
		}
	}).done(function(){
		$('#event-container').unslider();
	});

}




function showError(error){
	switch(error.code) {
			case error.PERMISSION_DENIED:
				$('#nearbyEventsWidget').append("User denied the request for Geolocation.");
				break;
			case error.POSITION_UNAVAILABLE:
		 $('#nearbyEventsWidget').append("Location information is unavailable.");
				break;
			case error.TIMEOUT:
		 $('#nearbyEventsWidget').innerHTML="The request to get user location timed out."
				break;
			case error.UNKNOWN_ERROR:
		 $('#nearbyEventsWidget').innerHTML="An unknown error occurred."
				break;
	   }

}


function findJams(position){
	console.log(position);
	var nextUrl; 
	var apikey = "c98c7a6130638b6f";
	var url = "http://api.wunderground.com/api/" + apikey + "/geolookup/q/" + String(position.coords.latitude) + "," + String(position.coords.longitude) + ".json";
	$.getJSON( url, function( data ) {
	  nextUrl  = "http://api.wunderground.com/api/" + apikey + "/hourly/q/" + data.location.state + "/" + data.location.city + ".json";
	}).done(function(nextUrl){
	    console.log(nextUrl['location']['zip']);
	    showJams(nextUrl['location']['zip']);
	
	});
}



function getZip(){
if (navigator.geolocation) {
  		  navigator.geolocation.getCurrentPosition(findJams,showError);
  		}


}

$(window).load(function(){
	console.log("IN EVENT . JS");
	getZip();
});
