(function(){
  var yelpfunctionality = {

    getLocation: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(yelpfunctionality.makeCall,yelpfunctionality.showError);
      }
      else{$('#bars-parent').innerHTML="Geolocation is not supported by this browser.";}
    },

    makeCall: function(loc) {
      var lat = loc.coords.latitude;
      lat = lat.toFixed(5);

      var lon = loc.coords.longitude;
      lon = lon.toFixed(5);

      var url = "http://api.yelp.com/business_review_search?term=bars&lat=" + String(lat) + "&long="+ String(lon) + "&radius=10&limit=5&ywsid=U9jNwgdwQVgCv3nCiZ6Img";
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onload = yelpfunctionality.showFood.bind(req.responseText);
      req.send(null);
    },

    showError: function(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          $('#bars-parent').append("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
       $('#bars-parent').append("Location information is unavailable.");
          break;
        case error.TIMEOUT:
       $('#bars-parent').innerHTML="The request to get user location timed out."
          break;
        case error.UNKNOWN_ERROR:
       $('#bars-parent').innerHTML="An unknown error occurred."
          break;
       }
    },

    showFood: function(data) {
      var items = []
      var response = JSON.parse(data.target.response)
      $.each( response.businesses, function( key, val ) {
        $('.container-s > #bars').append("<li><p><a href=\"" + val.url + "\">" + val.name + "</a><br/><span class=\"address\">"+val.address1 + ', '+val.address2 + '<br/>'+ val.city +  '<br/>'+val.state +val.zip+ "</span></p></li>");


        });
      $('#bars-container').unslider();
    }
  };

  yelpfunctionality.getLocation();
})()
