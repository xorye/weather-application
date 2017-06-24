$(document).ready(function(){

	$("#btn").click(function() {
		getWeather();
	});

	$("#city").on("keypress", function(e) {
		if (e.keyCode == 13) {
			getWeather();
			return false;
		}
	});




});



function getWeather() {

	var city = $("#city").val()
	if (city === "") {
		alert("Please enter a city name.");
	}else {
		fadeOutForm();
		getWeatherJson(city);

	}
	

}

function getWeatherJson(city) {

	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&APPID=9163b6aabce8d204588292197d456a76",
		success: function(data) {
			outputData(data);
		}
	});

}

function outputData(data) {


	var desc = data.weather[0].description;
	desc = desc.charAt(0).toUpperCase() + desc.substring(1);
	var cityName = data.name;
	var countryName = data.sys.country;
	var degrees = data.main.temp;

	$(".main").append('<div class="data-div"></div>');
	$(".main").css("height", "30rem");
	$(".data-div").append("<p class='data'>Location: "+ cityName +", "+ countryName+"</p>");
	$(".data-div").append("<p class='data'>Temperature: "+ degrees +"</p>");
	$(".data-div").append("<p class='data'>"+ desc +"</p>");
}


/**
 * Fades out .form-div
 * @return {None}
 */
function fadeOutForm() {
	$(".form-div").fadeOut("slow");
}

