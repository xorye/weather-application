$(document).ready(function(){
	var metric = true;

	$("#btn").click(function() {
		getWeather(metric);
	});

	$("#city").on("keypress", function(e) {
		if (e.keyCode == 13) {
			getWeather(metric);
			return false;
		}
	});

	$("#unit-toggle").click(function() {
		if($(this).prop("checked")) {
			metric = true;
		}else {
			metric = false;
		}
	});


});



function getWeather(metric) {

	var city = $("#city").val();
	if (city === "") {
		alert("Please enter a city name.");
	}else {
		fadeOutForm();
		getWeatherJson(city, metric);

	}
	

}

function getWeatherJson(city, metric) {

	var units;
	if (metric) units = "metric";
	else units = "imperial"


	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&APPID=9163b6aabce8d204588292197d456a76",
		success: function(data) {
			outputData(data, metric);
		}
	});

}

function outputData(data, metric) {

	var desc = data.weather[0].description;
	desc = desc.charAt(0).toUpperCase() + desc.substring(1);
	var cityName = data.name;
	var countryName = data.sys.country;
	var degrees = data.main.temp;
	var units;

	if (metric) units = "&#176;C";
	else units = "&#176;F"

	$(".main").append('<div class="data-div"></div>');
	$(".main").css("height", "30rem");
	$(".data-div").append("<p class='data'>Location: "+ cityName +", "+ countryName+"</p>");
	$(".data-div").append("<p class='data'>Temperature: "+ degrees +" "+units+"</p>");
	$(".data-div").append("<p class='data'>"+ desc +"</p>");
}


/**
 * Fades out .form-div
 * @return {None}
 */
function fadeOutForm() {
	$(".form-div").fadeOut("slow");
}

