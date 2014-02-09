var yelpfunctionality = {

  getLocation: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(yelpfunctionality.makeCall,yelpfunctionality.showError);
    }
    else{$('#lunchWidget').innerHTML="Geolocation is not supported by this browser.";}
  },

  makeCall: function(loc) {

    console.log(loc);

    var lat = loc.coords.latitude;
    lat = lat.toFixed(5);

    var lon = loc.coords.longitude;
    lon = lon.toFixed(5);

    var url = "http://api.yelp.com/business_review_search?term=food&lat=" + String(lat) + "&long="+ String(lon) + "&radius=10&limit=5&ywsid=U9jNwgdwQVgCv3nCiZ6Img";
    console.log(url);
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = yelpfunctionality.showFood.bind(req.responseText);
    req.send(null);

    /*var auth = { 
      //
      // Update with your auth tokens.
      //
      consumerKey: "7UG2EV7D5jmfeLlr0oeawA", 
      consumerSecret: "zXw5K_0kdDKpfPucYJBO5YQo1Oo",
      accessToken: "fQcJTYxe4ZboDziZQJc4BBOpfX6tv37B",
      // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
      // You wouldn't actually want to expose your access token secret like this in a real application.
      accessTokenSecret: "YRT7w2btqOZvZG4m8LPx36kNo9A",
      serviceProvider: { 
        signatureMethod: "HMAC-SHA1"
      }
    };

    var terms = 'food';
    //var near = (String(loc.coords.latitude) + "," + String(loc.coords.longitude));

    var accessor = {
      consumerSecret: auth.consumerSecret,
      tokenSecret: auth.accessTokenSecret
    };

    parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['sort', '1']);
    parameters.push(['lat', loc.coords.latitude]);
    parameters.push(['long', loc.coords.longitude]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = { 
      'action': 'http://api.yelp.com/business_review_search',
      'method': 'GET',
      'parameters': parameters 
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
    console.log(parameterMap);

    $.ajax({
      'url': message.action,
      'data': parameterMap,
      'cache': true,
      'dataType': 'jsonp',
      'jsonpCallback': 'cb',
      'success': function(data, textStats, XMLHttpRequest) {
        console.log(data);
      }*/
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

  showFood: function(rests) {
    console.log(rests);
  }
};

yelpfunctionality.getLocation();