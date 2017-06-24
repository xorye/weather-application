$(document).ready(function(){

	$("#btn").click(function() {
		getWeather();
	});





	$("#city").on("keypress", function(e) {
		if (e.keyCode == 13) {
			getWeather();
			return false;
		}
	})

});



function getWeather() {

	var city = $("#city").val()
	if (city === "") {
		alert("Invalid city name");
	}else {
		getWeatherJson(city);
	}
	
	


}

function getWeatherJson(city) {

	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=9163b6aabce8d204588292197d456a76",
		success: function(data) {
			printData(data);
		}
	});

}

function printData(data) {
	var desc = data.weather[0].description;
	var cityName = data.name;
	var countryName = data.sys.country;
	var degrees = data.main.temp;

	console.log(cityName);
	console.log(countryName);
	console.log(desc);
	console.log(degrees);
}