var apiKey = "388964fc2ffae47f3a212b1f9aac6d8b";
var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=" + apiKey;
var getBtn = document.querySelector("#btn");
var currentWeatherEl = document.querySelector("#CurrentWeather");
var forecastEl = document.querySelector("#fiveday")
var searchInput=document.querySelector("#City")
console.log(searchInput.textContent)
console.log(getBtn)
console.log(currentWeatherEl)
console.log(forecastEl)
var city= searchInput.value;
var currentApiUrl= ("api.openweathermap.org/data/2.5/weather?q="+city+ "&appid="+apiKey);    

// Listen For button Click and log the City that was searched for
getBtn.addEventListener("click", function(){
    
    console.log(city);
    console.log(currentApiUrl);
    callInputAPI();
    
});
function callInputAPI(){
    fetch(currentApiUrl)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
    
    })
    // .catch(function (err) {
    //     console.error(err);
    // });
}

// function callAPI() {
//     fetch(apiURL)
//     .then(function (res) {
//         return res.json();
//     })
//     .then(function (data) {
//         console.log(data);
    
//     // var h1El= document.createElement('h1');
//     // h1El.setAttribute("class", "h1El");
//     // h1El.textContent = "hello";

//     // h2El.textContent = "Temp: " + bob.main.temp + " degrees F";

//     })
//     .catch(function (err) {
//         console.error(err);
//     });
// };
callInputAPI()
// callAPI();