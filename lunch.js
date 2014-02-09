$(window).load(function(){
	var availSports ="http://api.espn.com/v1/sports?apikey=euzzvzdbbz5qxr7e7me325us";
	var popPosts =  "http://api.espn.com/v1/now/popular?apikey=euzzvzdbbz5qxr7e7me325us";
	var completeJSON = $.getJSON( popPosts, function( data ) {
  		var items = [];
  		if(data['status'] == 'success'){
  			console.log("IT WORKED!"); 
  		} else {
  			console.log("Bad Request");
  			$('.container.s').append('<p> Could not load data...<p>'); 
  		}
  		console.log(data['feed'].length);
  		$.each( data['feed'], function( key, val ) {
   	    $('.container-s > #sports').append("<li><p> " + val.description+ "</p></li>");
 	    });
    $('#sport-container').unslider();
  });
})