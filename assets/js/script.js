var apiKey = "388964fc2ffae47f3a212b1f9aac6d8b";
var getBtn = document.querySelector("#btn");
var currentWeatherEl = document.querySelector("#CurrentWeather");
var currentIconEl = document.querySelector("#currentIcon")
var citySearchEl=document.querySelector("#CitySearch");
var forecastEl = document.querySelector("#fiveday")
var searchInput=document.querySelector("#City")
var currentTemp = document.querySelector("#Temp")
var currentWind = document.querySelector("#Wind")
var currentHumidity = document.querySelector("#Humidity")
var currentuv = document.querySelector("#uv")
var historyContainer = document.querySelector("#history");
var fiveDayHeader = document.querySelector("#fivedayh2");
console.log(searchInput.textContent)
console.log(getBtn)
console.log(currentWeatherEl)
console.log(forecastEl)
var cityArray=JSON.parse(localStorage.getItem("History")) ||[];
console.log(cityArray);


function callInputAPI(city){
    var currentApiUrl= ("https://api.openweathermap.org/data/2.5/weather?q="+city+ ",us&units=imperial&appid="+apiKey);    

    fetch(currentApiUrl)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        if(data.cod!=="404"){
            searchHistory(city);
        }
        else if(data.cod==="404"){
            searchInput.value= "";
            alert("Please Enter a City Name");
            return;
        }
        console.log(data);
        var openAPIURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ data.coord.lat + "&lon="+data.coord.lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
        var iconCode= data.weather[0].icon;
        var dateUnix =data.dt;
        var dateMilisecs= dateUnix*1000;
        var dateObject = new Date(dateMilisecs);
        var dateNormal= dateObject.toLocaleString();
        console.log(dateNormal)
        var iconSource="http://openweathermap.org/img/w/"+ iconCode+ ".png";
        var imgIcon = document.createElement('img');
        imgIcon.src = iconSource;
        citySearchEl.textContent= city +" "+ dateNormal+ " "; 
        citySearchEl.appendChild(imgIcon);
       
        fetch(openAPIURL)
        .then(function(res){
            return res.json();
        })
        .then(function(data2){
            currentTemp.textContent = "Temp: "+data2.current.temp;
            currentWind.textContent = "Wind: "+data2.current.wind_speed + " MPH";
            currentHumidity.textContent = "Humidity: "+data2.current.humidity;
            currentuv.textContent = "UV Index: "+data2.current.uvi;
            fiveDayHeader.classList.remove("d-none")
            var dailyData = data2.daily;
            for (let i = 0; i < dailyData.length; i++) {
                const element = dailyData[i];
                    if(i>0 && i<6){
                        var div= document.createElement("div")
                        var h3= document.createElement("h3")
                        var icon= document.createElement('img')
                        var iconCode= element.weather[0].icon;
                        var iconSource="http://openweathermap.org/img/w/"+ iconCode+ ".png";
                        var temp= document.createElement("p")
                        var wind= document.createElement("p")
                        var humidity= document.createElement("p")
                        var dateUnix =element.dt;
                        var dateMilisecs= dateUnix*1000;
                        var dateObject = new Date(dateMilisecs);
                        var dateNormal= dateObject.toLocaleString();
                        div.id=element.length;
                        div.className="card col-2 bg-secondary"
                        h3.innerText= dateNormal;
                        icon.src= iconSource;
                        temp.textContent ="Temp: "+ element.temp.day;
                        wind.textContent="Wind: " + element.wind_speed;
                        humidity.textContent="Humidity: "+element.humidity;
                        h3.appendChild(icon);
                        div.appendChild(h3);
                        div.appendChild(temp);
                        div.appendChild(wind);
                        div.appendChild(humidity);
                        forecastEl.appendChild(div);
                    }};
        })
           
    })
    .catch(function (err) {
        console.error(err);
    });
}

// Store searche history in array
var searchHistory = function(city){
    if(cityArray.indexOf(city)<0){
    cityArray.push(city)
    localStorage.setItem("History", JSON.stringify(cityArray))
    historyButtons();
};
    console.log(cityArray);
}
var historyButtons = function(){
    historyContainer.innerHTML="";
    cityArray.forEach(city => {
        var btn =document.createElement("button");
        btn.className = "mt-1 col-12";
        btn.id=city;
        btn.innerText= city;
        btn.addEventListener("click", function(event){
            var city= event.target.id;
            callInputAPI(city);
        })
        historyContainer.appendChild(btn);
    });
}


// Listen For button Click and log the City that was searched for
historyButtons();
getBtn.addEventListener("click", function(){
    var city= searchInput.value;
    if (city=== ""){
        alert("Please Enter a City Name");
        return;
    }
    callInputAPI(city);
});


