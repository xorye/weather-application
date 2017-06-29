$(document).ready(function(){
	var metric = $("#unit-toggle").is(':checked');

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
		// url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&APPID=9163b6aabce8d204588292197d456a76",
		url: "http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&units="+units+"&cnt=5&APPID=9163b6aabce8d204588292197d456a76",
		success: function(data) {
			outputData(data, metric);
		}
	});

}

function outputData(data, metric) {

	var cityName = data.city.name;
	var countryName = getCountryName(data.city.country);
	var units;

	var thirdDay = getDate(data.list[2].dt);
	var fourthDay = getDate(data.list[3].dt);
	var fifthDay = getDate(data.list[4].dt);

	
	if (metric) units = "&#176;C";
	else units = "&#176;F"

	$(".main").append('<div class="data-div hidden"></div>');
	$(".main").animate({height: "30rem"}, 200, function() {
		$(".data-div").fadeIn();
	});
	// $(".data-div").append("<p class='data'>Location: "+ cityName +", "+ countryName+"</p>");
	// $(".data-div").append("<p class='data'>Temperature: "+ degrees +" "+units+"</p>");
	// $(".data-div").append("<p class='data'>"+ desc +"</p>");

	$(".data-div").append("\
		<h1 class='data-table-header'>5 Day Weather Forcast</h1> \
		<h2 class='data-table-sub-header'>"+cityName+", "+countryName+"</h2> \
		<table class='data-table'> \
		<tr> \
		<th class='data-table-day-header'>Today</th> \
		<th class='data-table-day-header'>Tommorrow</th> \
		<th class='data-table-day-header'>"+thirdDay+"</th> \
		<th class='data-table-day-header'>"+fourthDay+"</th> \
		<th class='data-table-day-header'>"+fifthDay+"</th> \
		</tr> \
		<tr> \
		<td id='weather-box-1'></td> \
		<td id='weather-box-2'></td> \
		<td id='weather-box-3'></td> \
		<td id='weather-box-4'></td> \
		<td id='weather-box-5'></td> \
		</tr> \
		</table> \
		<p class='credit-link'>Weather icons<a href='http://www.flaticon.com/authors/smartline'> designed by Smartline from Flaticon</a></p> \
		");


	populateTable(data, units);
}

/**
 * Returns date from epoch
 * @param {String epxoxh}
 * @return {String}
 */
function getDate(epoch){
	var date = new Date(0);
	date.setUTCSeconds(epoch);
	dateStr = date.toString();
	return (dateStr.charAt(8) === "0") ? dateStr.substring(4, 8) + dateStr.substring(9, 10) : dateStr.substring(4, 10);

}

/**
 * Fades out .form-div
 * @return {None}
 */
function fadeOutForm() {
	$(".form-div").fadeOut("slow");
}

function populateTable(data, units) {
	
	var high, low, desc, icon;

	for (i = 0; i < 5; i++) {
		high = data.list[i].temp.max;
		low = data.list[i].temp.min;
		desc = data.list[i].weather[0].description;
		desc = desc.charAt(0).toUpperCase() + desc.substring(1);
		icon = data.list[i].weather[0].icon;

		$("#weather-box-"+(i+1)).append("<img class='weather-icon' src='./images/svg/"+icon.substring(0, 2)+".svg'>");
		$("#weather-box-"+(i+1)).append("<p>High: "+high+" "+units+"</br>Low: "+low+" "+units+"</br>"+desc+"</p>");
	}
}


var isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russia',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Vietnam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};

function getCountryName(code) {
	return isoCountries[code];
}



