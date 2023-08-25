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


let form = document.querySelector("#searcher");
form.addEventListener("submit",getcity);

    let apikey = "e8afbbe875eb43e7801438b2c0996358";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=Managua&appid=${apikey}&units=metric`;
    axios.get(apiurl).then(changeData);
