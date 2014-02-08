var morningWeather = {

	getLocation: function() {
  		if (navigator.geolocation) {
  		  navigator.geolocation.getCurrentPosition(this.getCity,this.showError);
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
				x.innerHTML="User denied the request for Geolocation."
				break;
			case error.POSITION_UNAVAILABLE:
				x.innerHTML="Location information is unavailable."
				break;
			case error.TIMEOUT:
				x.innerHTML="The request to get user location timed out."
				break;
			case error.UNKNOWN_ERROR:
				x.innerHTML="An unknown error occurred."
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
		/*var weatherdiv = document.getElementById("weatherWidget");
		var weathertable = document.createElement('table');
		var header = document.createElement('tr');
		var hours = document.createElement('th');
		hours.innerHTML = "Hours";
		header.appendChild(hours);
		var temps = document.createElement('th');
		temps.innerHTML = "Temps";
		header.appendChild(temps);
		weathertable.appendChild(header);
		weather.hourly_forecast.forEach(function(entry) {
			var row = document.createElement('tr');
			var hour = document.createElement('td');
			hour.innerHTML = entry.FCTTIME.civil;
			row.appendChild(hour);
			var temp = document.createElement('td');
			temp.innerHTML = entry.temp.english;
			row.appendChild(temp);
			weathertable.appendChild(row);
		});
		weatherdiv.appendChild(weathertable);*/
		var hours = []//'12:00 am', '1:00 am', '2:00 am', '3:00 am', '4:00 am', '5:00 am',
                    //'6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm',
                    //'6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm'];
		var temps = []
		weather.hourly_forecast.forEach(function(entry) {
			hours.push(entry.FCTTIME.civil);
			temps.push(parseInt(entry.temp.english));
		});
		console.log(typeof(temps[0]));
		$('#weatherWidget').highcharts({
			chart: {
				type: 'area'
			},
            title: {
                text: 'Hourly Temperatures for Day',
                x: -20 //center
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
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                data: temps
            }]
        });
	}
};

morningWeather.getLocation();