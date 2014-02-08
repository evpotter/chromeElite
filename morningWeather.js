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
		req.onload = morningWeather.getWeather.bind(req.responseText);
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

	getWeather: function(resp) {
		var apikey = "c98c7a6130638b6f";
		var loc = JSON.parse(resp.target.responseText);
		console.log(loc);
		var url = "http://api.wunderground.com/api/" + apikey + "/hourly/q/" + loc.location.state + "/" + loc.location.city + ".json";
		console.log(url);
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.onload = morningWeather.showWeather.bind(this.responseText);
		req.send(null);
	},

	showWeather: function(resp) {
		var weather = JSON.parse(resp.target.responseText);
		console.log(weather);
		var hours = [];
		var temps = [];
		weather.hourly_forecast.forEach(function(entry) {
			hours.push(entry.FCTTIME.civil);
			temps.push(parseInt(entry.temp.english));
		});
		console.log(typeof(temps[0]));
		$('#weatherWidget').highcharts({
			chart: {
				type: 'area',
    backgroundColor: null,
    plotBackgroundColor: null
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
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                      enabled: false
            },
            series: [{
                data: temps
            }],
    labels: {
              style: {
                       color:'white'
                     }
    }

        });
	}
};

morningWeather.getLocation();
