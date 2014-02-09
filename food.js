var yelpfunctionality = {

  getLocation: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(yelpfunctionality.makeCall,yelpfunctionality.showError);
    }
    else{$('#lunchWidget').innerHTML="Geolocation is not supported by this browser.";}
  },

  makeCall: function(loc) {
    var lat = loc.coords.latitude;
    lat = lat.toFixed(5);

    var lon = loc.coords.longitude;
    lon = lon.toFixed(5);

    var url = "http://api.yelp.com/business_review_search?term=food&lat=" + String(lat) + "&long="+ String(lon) + "&radius=10&limit=5&ywsid=U9jNwgdwQVgCv3nCiZ6Img";
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = yelpfunctionality.showFood.bind(req.responseText);
    req.send(null);
  },

  showError: function(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        $('#lunchWidget').append("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
     $('#lunchWidget').append("Location information is unavailable.");
        break;
      case error.TIMEOUT:
     $('#lunchWidget').innerHTML="The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
     $('#lunchWidget').innerHTML="An unknown error occurred."
        break;
     }
  },

  showFood: function(data) {
    var items = []
    var response = JSON.parse(data.target.response)
    $.each( response.businesses, function( key, val ) {
      $('.container-s > #lunch').append("<li><p><a href=\"" + val.url + "\">" + val.name + "</a></p><br/><img src=\"" + val.photo_url + "\"></li>");
      });
    $('#lunch-container').unslider();
  }
};

yelpfunctionality.getLocation();