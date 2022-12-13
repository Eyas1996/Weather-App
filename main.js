// ----------------------------------------------------------------
// Get all Necessery Element from Dom
let app = document.getElementById('app');
let search = document.getElementById('search');
let btn = document.getElementById('submit');
let popCities = document.getElementById('popular-cities');
let daily = document.getElementById('daily');
// ----------------------------------------------------------------
// Default City
let cityInput = 'Berlin';
// Add addEventListener to the Search btn
btn.addEventListener('click', (event) => {
	// // prevent Browser Default Reload
	// event.preventDefault();
	// change the city after typing it in the input field and click the btn
	if (search.value.length < 4) {
		alert('invalid Input');
	} else {
		cityInput = search.value;
		fetchWeatherApi();
	}
});
// ----------------------------------------------------------------
// we Select a city form the Popular Cities List and add it the Api(Query String).
for (let i = 0; i < popCities.children.length; i++) {
	popCities.children[i].addEventListener('click', (event) => {
		cityInput = event.target.textContent;
		fetchWeatherApi();
	});
}
// ----------------------------------------------------------------
// Main Function That fetches and display all Wanted data form the Weather API
async function fetchWeatherApi() {
	// let resopse = await fetch(
	// 	`https://api.weatherapi.com/v1/forecast.json?key=f1a7e2ed4cc8463a884192227223011&q=${cityInput}&days=10&aqi=no&alerts=no`
	// );
	let resopse = await fetch('./data/weather.json');
	let data = await resopse.json();
	console.log(data);
	// ----------------------------------------------------------------
	// saving all wanted data form the Api into an Object
	let dataObject = {
		currentWeahter: `${data.current.temp_c}°`,
		currentC: data.location.name,
		currentTime: data.location.localtime,
		currentMinMax: `${data.forecast.forecastday[0].day.mintemp_c}°/${data.forecast.forecastday[0].day.maxtemp_c}°`,
		currentSkyIcon: data.current.condition.icon,
		currentSkyStatus: data.current.condition.text,
		skyInfo: `${data.current.cloud}%`,
		feelsLike: `${data.current.feelslike_c}°`,
		humidityInfo: `${data.current.humidity}%`,
		windInfo: `${data.current.wind_kph}km/h`,
		rainInfo: `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`
	};
	console.log(dataObject);
	// ----------------------------------------------------------------
	// give Danamic Value to the HTML Elements from Api Data
	document.getElementById('current-temp').textContent = dataObject.currentWeahter;
	document.getElementById('current-city').textContent = dataObject.currentC;
	document.getElementById('time').textContent = dataObject.currentTime;
	document.getElementById('min-max-temp').textContent = dataObject.currentMinMax;
	document.getElementById('icon').src = dataObject.currentSkyIcon;
	document.getElementById('status').textContent = dataObject.currentSkyStatus;
	document.getElementById('sky').textContent = dataObject.skyInfo;
	document.getElementById('feel').textContent = dataObject.feelsLike;
	document.getElementById('humidity').textContent = dataObject.humidityInfo;
	document.getElementById('wind').textContent = dataObject.windInfo;
	document.getElementById('rain').textContent = dataObject.rainInfo;
	// ----------------------------------------------------------------
	// function to Display Days
	const displayDaysForecast = () => {
		daily.textContent = '';
		for (let i = 0; i < data.forecast.forecastday.length; i++) {
			let theDays = [ 'So', 'Mo', 'Tu', 'We', 'Thu', 'Fr', 'Sa' ];
			let date = new Date(data.forecast.forecastday[i].date);
			let dayName = '';
			if (i === 0) {
				dayName = 'Today';
			} else {
				dayName = theDays[date.getDay()];
			}
			let day = document.createElement('div');
			day.className = 'day';
			day.innerHTML = `
          <span>${dayName}</span>
          <span><img src=${data.forecast.forecastday[i].day.condition.icon}></span>
          <span>${data.forecast.forecastday[i].day.mintemp_c}°/${data.forecast.forecastday[i].day.maxtemp_c}°</span>
          <span>${data.forecast.forecastday[i].day.maxwind_kph}km/h</span>
        `;
			daily.appendChild(day);
		}
	};
	displayDaysForecast();
	// ----------------------------------------------------------------
	// function to change the backgroundImage
	const changeBg = () => {
		// Set default time of day
		let timeOfDay = 'Day';
		// Get the unique id-code for each weather condition
		let code = data.current.condition.code;
		// Change it to night if its night time in the selected City
		if (!data.current.is_day) {
			timeOfDay = 'Night';
		}
		if (code === 1000) {
			// Set the background Image to clear if the Weather is clear
			app.style.backgroundImage = `url(/Images/${timeOfDay}/clear.jpg)`;
		} else if (
			code === 1003 ||
			code === 1006 ||
			code === 1009 ||
			code === 1030 ||
			code === 1087 ||
			code === 1135 ||
			code === 1273 ||
			code === 1276 ||
			code === 1279 ||
			code === 1282
		) {
			//if its Cloudy Weather
			app.style.backgroundImage = `url(/Images/${timeOfDay}/cloudy.jpg)`;
		} else if (
			code === 1063 ||
			code === 1069 ||
			code === 1072 ||
			code === 1150 ||
			code === 1153 ||
			code === 1180 ||
			code === 1183 ||
			code === 1186 ||
			code === 1189 ||
			code === 1192 ||
			code === 1195 ||
			code === 1204 ||
			code === 1207 ||
			code === 1240 ||
			code === 1243 ||
			code === 1243 ||
			code === 1246 ||
			code === 1249 ||
			code === 1252
		) {
			//if its Raining Weather
			app.style.backgroundImage = `url(/Images/${timeOfDay}/rain.jpg)`;
		} else {
			// for Snow Weather
			app.style.backgroundImage = `url(/Images/${timeOfDay}/snow.jpg)`;
		}
		app.style.opacity = '1';
	};
	changeBg();
}

fetchWeatherApi();
