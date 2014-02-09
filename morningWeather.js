var morningWeather = {

	getLocation: function() {
  		if (navigator.geolocation) {
  		  navigator.geolocation.getCurrentPosition(morningWeather.getCity,morningWeather.showError);
  		}
  		else{$('#weatherWidget').innerHTML="Geolocation is not supported by this browser.";}
  	},

	getCity: function(position) {
		console.log(position);
		var apikey = "c98c7a6130638b6f";
		var url = "http://api.wunderground.com/api/" + apikey + "/geolookup/q/" + String(position.coords.latitude) + "," + String(position.coords.longitude) + ".json";
		console.log(url);
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.onload = morningWeather.callWeather.bind(req.responseText);
		req.send(null);
	},

	showError: function(error) {
		switch(error.code) {
			case error.PERMISSION_DENIED:
				$('#weatherWidget').append("User denied the request for Geolocation.");
				break;
			case error.POSITION_UNAVAILABLE:
		 $('#weatherWidget').append("Location information is unavailable.");
				break;
			case error.TIMEOUT:
		 $('#weatherWidget').innerHTML="The request to get user location timed out."
				break;
			case error.UNKNOWN_ERROR:
		 $('#weatherWidget').innerHTML="An unknown error occurred."
				break;
	   }
	},

	callWeather: function(resp) {
		morningWeather.getMorningWeather(resp);
		morningWeather.getAfternoonWeather(resp);
		morningWeather.getNightWeather(resp);
	},

	getMorningWeather: function(resp) {
		var apikey = "c98c7a6130638b6f";
		var loc = JSON.parse(resp.target.responseText);
		console.log(loc);
		var url = "http://api.wunderground.com/api/" + apikey + "/hourly/q/" + loc.location.state + "/" + loc.location.city + ".json";
		console.log(url);
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.onload = morningWeather.showMorningWeather.bind(req.responseText);
		req.send(null);
	},

	getAfternoonWeather: function(resp) {
		var apikey = "c98c7a6130638b6f";
		var loc = JSON.parse(resp.target.responseText);
		console.log(loc);
		var url = "http://api.wunderground.com/api/" + apikey + "/forecast/q/" + loc.location.state + "/" + loc.location.city + ".json";
		console.log(url);
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.onload = morningWeather.showAfternoonWeather.bind(req.responseText);
		req.send(null);
	},

	getNightWeather: function(resp) {
		var apikey = "c98c7a6130638b6f";
		var loc = JSON.parse(resp.target.responseText);
		console.log(loc);
		var url = "http://api.wunderground.com/api/" + apikey + "/forecast/q/" + loc.location.state + "/" + loc.location.city + ".json";
		console.log(url);
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.onload = morningWeather.showNightWeather.bind(req.responseText);
		req.send(null);
	},

	showMorningWeather: function(resp) {
		var weather = JSON.parse(resp.target.responseText);
		console.log(weather);
		var hours = [];
		var temps = [];
		weather.hourly_forecast.forEach(function(entry) {
			hours.push(entry.FCTTIME.civil);
			temps.push(parseInt(entry.temp.english));
		});
		console.log(typeof(temps[0]));
		$('#weatherWidget1').highcharts({
			chart: {
				type: 'area',
    			backgroundColor: null,
    			plotBackgroundColor: null,
    			width: 900
			},
            title: {
                text: 'Hourly Temperatures for Day',
                x: -20, //center
                style: {
                  color: '#fff',
                  font: 'Roboto'
                }
            },
            subtitle: {
                text: 'Source: Wunderground.com',
                x: -20
            },
            xAxis: {
                categories: hours
            },
            yAxis: {
                title: {
                    text: 'Temperature (F)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'F'
            },
            legend: {
                      enabled: false
            },
            series: [{
              name:"Temp",
              data: temps
            }],
    		labels: {
              style: {
                       color:'white'
                     }
    		}

        });
	},

	showAfternoonWeather: function(resp) {
		var weather = JSON.parse(resp.target.responseText);
		console.log(weather);
		var temp = ("High: " + weather.forecast.simpleforecast.forecastday[0].high.fahrenheit + "&#186;F / Low: " + weather.forecast.simpleforecast.forecastday[0].low.fahrenheit) + " &#186;F" ;
		var forecast = weather.forecast.simpleforecast.forecastday[0].icon;
		var img = weather.forecast.simpleforecast.forecastday[0].icon_url;
		$('#weatherWidget2').append('<img src="'+ img + '">');
		$('#weatherWidget2').append('<p>'+ forecast + '</p>');
		$('#weatherWidget2').append('<p>'+ temp + '</p>');
	},

	showNightWeather: function(resp) {
		var weather = JSON.parse(resp.target.responseText);
		console.log(weather);
		var temp1 = (weather.forecast.simpleforecast.forecastday[0].high.fahrenheit + "/" + weather.forecast.simpleforecast.forecastday[0].low.fahrenheit);
		var forecast1 = weather.forecast.simpleforecast.forecastday[0].icon;
		var img1 = weather.forecast.simpleforecast.forecastday[0].icon_url;
		$('#weatherWidget3').append('<img src="'+ img1 + '">');
		$('#weatherWidget3').append('<p>'+ forecast1 + '</p>');
		$('#weatherWidget3').append('<p>'+ temp1 + '</p>');
		$('#weatherWidget4').append('<img src="'+ img1 + '">');
		$('#weatherWidget4').append('<p>'+ forecast1 + '</p>');
		$('#weatherWidget4').append('<p>'+ temp1 + '</p>');
		var temp2 = (weather.forecast.simpleforecast.forecastday[1].high.fahrenheit + "/" + weather.forecast.simpleforecast.forecastday[0].low.fahrenheit);
		var forecast2 = weather.forecast.simpleforecast.forecastday[1].icon;
		var img2 = weather.forecast.simpleforecast.forecastday[1].icon_url;
		$('#weatherWidget3').append('<img src="'+ img2 + '">');
		$('#weatherWidget3').append('<p>'+ forecast2 + '</p>');
		$('#weatherWidget3').append('<p>'+ temp2 + '</p>');
		$('#weatherWidget4').append('<img src="'+ img2 + '">');
		$('#weatherWidget4').append('<p>'+ forecast2 + '</p>');
		$('#weatherWidget4').append('<p>'+ temp2 + '</p>');
	}
};

morningWeather.getLocation();
