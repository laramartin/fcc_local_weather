$(document).ready(function() {
	weather();

	$("#myonoffswitch").on("click", function(){
		weather();
	});
});

function weather(){
	// geolocation
	// https://developer.mozilla.org/es/docs/Web/API/Geolocation/getCurrentPosition
	var options = {
		enableHighAccuracy: false,
		timeout: 10000,
		maximumAge: 0
	};

	var url = "";

	function success(pos) {
		var crd = pos.coords;
		var lat = crd.latitude;
		var lon = crd.longitude;
		var key = "adb5c1c65e2b6af4260846cb9ec37296";
		url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + key + "&units=metric";

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
			var celsius = $("#myonoffswitch").is(':checked') ;
			if (celsius) {
				var temp = Math.round(data.main.temp);
				var tempStr = "&#8451";
			}
			else{
				var temp = Math.round(data.main.temp) *  9/5 + 32;
				var tempStr = "&#8457";
			}

			var forecast = data.weather[0].main;
			var humidity = data.main.humidity;
			var wind = data.wind.speed;
			var icon = data.weather[0].icon;
			var urlIcon = "http://openweathermap.org/img/w/" + icon + ".png";

			// local time
			d = new Date();
			var localTime = d.toLocaleString();

			var html = "<div class= 'localWeather'>" +
			"<div id='city'>" + location + "</div>" +
			"<br><br>" + localTime +
			"<br><br> Temp: " + temp + tempStr +
			"<br><br> Humidity: " + humidity + "%" +
			"<br><br> Wind: " + wind + " meter/sec" +
			"<br><br> Forecast: "+ forecast +
			"<div class= 'imgWeather'><img src=\"" + urlIcon + "\"></div>"
			+ "</div>";

			$(".weatherInfo").html(html);
		})
	};

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-74642232-1', 'auto');
	ga('send', 'pageview');
};
