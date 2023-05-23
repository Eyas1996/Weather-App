// ----------------------------------------------------------------
// Get all Necessery Element from Dom
let app = document.getElementById("app");
let search = document.getElementById("search");
let btn = document.getElementById("submit");
let popCities = document.getElementById("popular-cities");
let daily = document.getElementById("daily");
// ----------------------------------------------------------------
// Default City
let cityInput = "Berlin";
// Add addEventListener to the Search btn
btn.addEventListener("click", () => {
  // // prevent Browser Default Reload
  // event.preventDefault();
  // change the city after typing it in the input field and click the btn
  if (search.value.length < 3) {
    alert("invalid Input");
  } else {
    cityInput = search.value;
    fetchWeatherApi();
  }
});
// ----------------------------------------------------------------
// we Select a city form the Popular Cities List and add it the Api(Query String).
for (let i = 0; i < popCities.children.length; i++) {
  popCities.children[i].addEventListener("click", (event) => {
    cityInput = event.target.textContent;
    fetchWeatherApi();
  });
}
// ----------------------------------------------------------------
// Main Function That fetches and display all Wanted data form the Weather API
async function fetchWeatherApi() {
  let respons = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=44f47ce10e9f96180cf1dcf529849f54`
  );
  // let respons = await fetch('./data/weather02.json');
  let data = await respons.json();

  console.log(data);

  // ----------------------------------------------------------------
  // saving all wanted data form the Api into an Object
  let dataObject = {
    currentWeahter: `${Math.trunc(data.main.temp)}°`,
    currentC: data.name,
    // currentTime: data.location.localtime,
    currentMinMax: `${Math.trunc(data.main.temp_min)}°/${Math.trunc(
      data.main.temp_max
    )}°`,
    currentSkyIcon: data.weather[0].icon,
    currentSkyStatus: data.weather[0].main,
    feelsLike: `${Math.trunc(data.main.feels_like)}°`,
    // skyInfo: `${data.weather[0].main}`,
    description: `${data.weather[0].description}`,
    humidityInfo: `${data.main.humidity}%`,
    windInfo: `${data.wind.speed}km/h`,
  };
  console.log(dataObject.windInfo);
  // ----------------------------------------------------------------
  // give Danamic Value to the HTML Elements from Api Data
  document.getElementById("current-temp").textContent =
    dataObject.currentWeahter;
  document.getElementById("current-city").textContent = dataObject.currentC;
  // document.getElementById("time").textContent = dataObject.currentTime;
  document.getElementById("min-max-temp").textContent =
    dataObject.currentMinMax;

  document.getElementById(
    "icon"
  ).src = `https://openweathermap.org/img/wn/${dataObject.currentSkyIcon}@2x.png`;
  document.getElementById("status").textContent = dataObject.currentSkyStatus;
  document.getElementById("feel").textContent = dataObject.feelsLike;
  document.getElementById("description").textContent = dataObject.description;
  document.getElementById("humidity").textContent = dataObject.humidityInfo;
  document.getElementById("wind").textContent = dataObject.windInfo;

  // ----------------------------------------------------------------
  // function to Display Days
  // const displayDaysForecast = () => {
  // 	daily.textContent = '';
  // 	for (let i = 0; i < data.forecast.forecastday.length; i++) {
  // 		let theDays = [ 'So', 'Mo', 'Tu', 'We', 'Thu', 'Fr', 'Sa' ];
  // 		let date = new Date(data.forecast.forecastday[i].date);
  // 		let dayName = '';
  // 		if (i === 0) {
  // 			dayName = 'Today';
  // 		} else {
  // 			dayName = theDays[date.getDay()];
  // 		}
  // 		let day = document.createElement('div');
  // 		day.className = 'day';
  // 		day.innerHTML = `
  //         <span>${dayName}</span>
  //         <span><img src=${data.forecast.forecastday[i].day.condition.icon}></span>
  //         <span>${data.forecast.forecastday[i].day.mintemp_c}°/${data.forecast.forecastday[i].day.maxtemp_c}°</span>
  //         <span>${data.forecast.forecastday[i].day.maxwind_kph}km/h</span>
  //       `;
  // 		daily.appendChild(day);
  // 	}
  // };
  // displayDaysForecast();
  // ----------------------------------------------------------------
  // function to change the backgroundImage
  const changeBg = () => {
    // Set default time of day
    let timeOfDay = "Night";
    // give a random Day OR Night
    let num = Math.floor(Math.random() * 2) + 1;
    if (num === 1) {
      timeOfDay = "day";
    }
    console.log(timeOfDay);
    // Get the unique id-code for each weather condition
    let code = data.weather[0].id;
    // Set the background Image to clear if the Weather is Thunderstorm
    if (
      code === 200 ||
      code === 201 ||
      code === 202 ||
      code === 210 ||
      code === 211 ||
      code === 212 ||
      code === 230 ||
      code === 231 ||
      code === 232
    ) {
      app.style.backgroundImage = `url(../Images/${timeOfDay}/thunder.jpg)`;
    } else if (
      // for Drizzle Weather
      code === 300 ||
      code === 301 ||
      code === 302 ||
      code === 310 ||
      code === 311 ||
      code === 312 ||
      code === 313 ||
      code === 314 ||
      code === 321
    ) {
      app.style.backgroundImage = `url(../Images/${timeOfDay}/rain.jpg)`;
    } else if (
      // for Rain Weather
      code === 500 ||
      code === 501 ||
      code === 502 ||
      code === 503 ||
      code === 504 ||
      code === 511 ||
      code === 520 ||
      code === 521 ||
      code === 522 ||
      code === 531
    ) {
      app.style.backgroundImage = `url(../Images/${timeOfDay}/rain.jpg)`;
    } else if (
      // for Snow
      code === 600 ||
      code === 601 ||
      code === 602 ||
      code === 611 ||
      code === 612 ||
      code === 613 ||
      code === 615 ||
      code === 616 ||
      code === 620 ||
      code === 621 ||
      code === 622
    ) {
      app.style.backgroundImage = `url(../Images/${timeOfDay}/snow.jpg)`;
    } else if (
      // for Atmosphere
      code === 600 ||
      code === 601 ||
      code === 602 ||
      code === 611 ||
      code === 612 ||
      code === 613 ||
      code === 615 ||
      code === 616 ||
      code === 620 ||
      code === 621 ||
      code === 622
    ) {
      app.style.backgroundImage = `url(../Images/${timeOfDay}/fogy.jpg)`;
    } else if (code === 800) {
      // for Clear Weather
      app.style.backgroundImage = `url(../Images/${timeOfDay}/clear.jpg)`;
    } else if (code === 801 || code === 802 || code === 803 || code === 804) {
      //if its Cloudy Weather
      app.style.backgroundImage = `url(../Images/${timeOfDay}/cloudy.jpg)`;
      //if its Raining Weather
    }
    app.style.opacity = "1";
  };
  changeBg();
}

fetchWeatherApi();
