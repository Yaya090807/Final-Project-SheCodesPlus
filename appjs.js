function changeData (response){
    console.log(response.data);

    document.querySelector("#temp-num").innerHTML = Math.round(response.data.main.temp);
    
    document.querySelector("#wind-num").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#humidity-num").innerHTML = Math.round(response.data.main.humidity);
    document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;

    let city_name = response.data.name;
    let country_name = response.data.sys.country;
    let fullName = city_name + ", " + country_name;
    document.querySelector("#city-name").innerHTML= fullName;
    
    let iconelement = document.querySelector("#weather-icon");
    iconelement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);

    document.querySelector("#date-current").innerHTML = formatate(response.data.dt*1000);

    getForecast(response.data.coord);
}

function formatate (timestamp){
    let date = new Date(timestamp);
    //Horas
    let hours = date.getHours();
    if(hours<10){
        hours = `0${hours}`;
    }

    let letra = "m.d.";
    if (hours <12){
        letra ="a.m.";
    } else
            if (hours>12){
        letra = "p.m.";
    }

    //Minutos
    let minutes = date.getMinutes();
    if(minutes<10){
        minutes = `0${minutes}`;
    }

    //Fecha
    let fecha = date.getDate();

    //Dias
    let days = [ "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[date.getDay()];

    //Mes
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
    let month = months[date.getMonth()];
      
    return `${day} ${fecha} ${month}, ${hours}:${minutes} ${letra}`;
}

function getcity(event){
    event.preventDefault();
    let citysearched = document.querySelector("#city-searched").value;
    let apikey = "e8afbbe875eb43e7801438b2c0996358";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${citysearched}&appid=${apikey}&units=metric`;
    axios.get(apiurl).then(changeData);

}

function getForecast (coordinates){
    console.log(coordinates);
    let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiurl);
    axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
}

function displayForecast(response){
    console.log(response.data);

    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast-id");
  
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.day
            )}° </span>
            
          </div>
        </div>
    `;
      }
    });
    forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#searcher");
form.addEventListener("submit",getcity);

    let apikey = "e8afbbe875eb43e7801438b2c0996358";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=Managua&appid=${apikey}&units=metric`;
    axios.get(apiurl).then(changeData);
