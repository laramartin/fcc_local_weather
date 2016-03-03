$(document).ready(function() {
	$("#clickHere").on("click", function() {
		console.log("CLICKEDDDDDDDDDDDDD");

		// geolocation
		// https://developer.mozilla.org/es/docs/Web/API/Geolocation/getCurrentPosition
		var options = {
			enableHighAccuracy: false,
			timeout: 10000,
			maximumAge: 0
		};

		var url = "";
		var tempMax = 0;
		var tempMin = 0;

		function success(pos) {
			var crd = pos.coords;

			console.log("========BEGIN TEST=====");

			var lat = crd.latitude;
			var lon = crd.longitude;
			var key = "adb5c1c65e2b6af4260846cb9ec37296";
			url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + key + "&units=metric";

			// console.log("si que va....");
			// console.log("lat: "  + lat);
			// console.log("lat round: "  + Math.round(lat));
			// console.log("lon: " + lon);
			// console.log("url is: " + url);

			// calling the JSON
			weatherJS(url);


		};

		function error(err) {
			console.warn('ERROR(' + err.code + '): ' + err.message);
		};

		navigator.geolocation.getCurrentPosition(success, error, options);


		function weatherJS(url){
			$.getJSON(url, function(data){

				var location = data.name;
				var tempMax = Math.round(data.main.temp_max);
				var tempMin = Math.round(data.main.temp_min);
				var forecast = data.weather[0].main;
				var humidity = data.main.humidity;
				var wind = data.wind.speed;
				var icon = data.weather[0].icon;

				var urlIcon = "http://openweathermap.org/img/w/" + icon + ".png";
				console.log("icon url: " + urlIcon);

				console.log("location: " + location);
				console.log("weathermain: " + forecast);
				console.log("temp min: " + tempMin);
				console.log("temp max: " + tempMax);
				console.log("icon: " + icon);

				// local time
				d = new Date();
				var localTime = d.toLocaleString();

				var html = "<div class= 'localWeather'> location: " + location +
					"<br> max: " + tempMax + "&#8451" +
					"<br> min: " + tempMin + "&#8451" +
					"<br> forecast: "+ forecast +
					"<br> humidity: " + humidity + "%" +
					"<br> wind: " + wind + " meter/sec" + "</div>" +
					"<div class= 'imgWeather'><img src=\"" + urlIcon + "\"></div>" +
					"<div class= 'localTime'><br>" + localTime + "</div>";
					
				$(".weatherInfo").html(html);

			})
		};




	});


})
