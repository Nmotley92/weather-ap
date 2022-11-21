var citSearchEl = document.getElementById('city-search');
var searchButton = document.getElementById('search');
var cityCurrentEl = document.getElementById('current-city');
var currentTempEl = document.getElementById('temp');
var currentWindEl = document.getElementById('wind');
var currentHumidityEl = document.getElementById('humidity');
var listEl = document.getElementById('list');
var iconSpotEl = document.getElementById('icon-spot');
var listItem;

var apiKey = "a98edf90fc1d17ee19e0411dd892d134";
var citys = [];
var cityLon, cityLat;
iconSpotEl.style.display = "none";
searchButton.addEventListener('click', function (event) {
    var cityName = citSearchEl.value;
    listItem = document.createElement("button");
    listItem.setAttribute('id', cityName);
    listItem.classList.add("btns", "list-group-item", "list-group-item-action");
    listItem.textContent = cityName;
    listEl.appendChild(listItem);
    
    getCityName(cityName);
});

function getCityName(name) {
    if (!name) {
        alert('Please Enter a city');
        return;
    }
    citys.push(name);
    console.log(citys)
    cityToLonLat(name);

}

function cityToLonLat(city) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey, {

        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data == "") {
                alert('not a valid city please try again');
                citys.pop();
                return;
            }
            localStorage.setItem('citys', JSON.stringify(citys));
            cityLon = data[0].lon;
            cityLat = data[0].lat;
            currentWeather();
        });

}

function currentWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + apiKey + '&units=imperial', {

        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var weaatherIcon = data.weather[0].icon;
            var weatherIconUrl = "http://openweathermap.org/img/wn/" + weaatherIcon + "@2x.png";
            iconSpotEl.src = weatherIconUrl;
            iconSpotEl.style.display = "block";

            cityCurrentEl.textContent = data.name + " " + new Date(data.dt*1000).toLocaleString();
            currentTempEl.textContent = "Temp: " + data.main.temp + ' °F';
            currentWindEl.textContent = "Wind: " + data.wind.speed + ' mph';
            currentHumidityEl.textContent = "Humidity: " + data.main.humidity + ' %';
            fiveDayForcast();
        });
}

function fiveDayForcast() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + apiKey + '&units=imperial', {

        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            for (let i = 1; i <= 5; i++) {
                var iconElement = document.getElementById('icon-' + i);
                var futureDates = document.getElementById('future-days-' + i);
                var futureTemps = document.getElementById('future-temps-' + i);
                var futureWind = document.getElementById('future-wind-' + i);
                var futureHumidity = document.getElementById('future-humidity-' + i);
                var dayHourCount = (i * 8) - 1;
                var icon = data.list[dayHourCount].weather[0].icon;
                var weatherIconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                iconElement.src = weatherIconUrl;
                futureDates.textContent = new Date(data.list[dayHourCount].dt * 1000).toDateString();
                futureTemps.textContent = "Temp: " + data.list[dayHourCount].main.temp + " °F";
                futureWind.textContent = "Wind: " + data.list[dayHourCount].wind.speed + " mph";
                futureHumidity.textContent = "Humidity: " + data.list[dayHourCount].main.humidity + " %";


            }
        });
}

listEl.addEventListener('click', function (event) {
    var targetcity = event.target.id;
    getCityName(targetcity);
})

window.onload = function() {        
   var citys = JSON.parse(localStorage.getItem('citys'))
   for(let i=0; i<citys.length;i++)
   {var listItems = document.createElement('button');
    listItems.classList.add("btns", "list-group-item", "list-group-item-action");
    listItems.textContent= citys[i];
    listItems.setAttribute('id', citys[i]);
    listEl.appendChild(listItems);
   }
   }
   
clrBtn=document.getElementById('clear');
clrBtn.addEventListener('click', ()=>{
    localStorage.clear();
    window.location.reload();
})