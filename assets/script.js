var citSearchEl = document.getElementById('city-search');
var searchButton = document.getElementById('search');
var cityCurrentEl = document.getElementById('current-city');
var currentTempEl= document.getElementById('temp');
var currentWindEl= document.getElementById('wind');
var currentHumidityEl= document.getElementById('humidity');



var apiKey = "a98edf90fc1d17ee19e0411dd892d134";
var citys = [];
var cityLon, cityLat;

searchButton.addEventListener('click', getCityName);

function getCityName(){
    var cityName = citSearchEl.value;
    if(!cityName){
         alert('Please Enter a city'); 
         return;
        }
    cityToLonLat(cityName);
}

function cityToLonLat(city){
    fetch ('http://api.openweathermap.org/geo/1.0/direct?q='+city +'&appid='+apiKey, {
       
 }) 
    .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if(data==""){
                alert('not a valid city please try again');
                return;
            }
            
            cityLon= data[0].lon;
            cityLat= data[0].lat;
            currentWeather();
          });
        
}

function currentWeather(){
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat='+cityLat+'&lon='+cityLon+'&appid='+apiKey, {

    })
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        cityCurrentEl.textContent= data.city.name;
        
      });
    
    

}