

function changeData (response){
    console.log(response.data);

    document.querySelector("#temp-num").innerHTML = Math.round(response.data.main.temp);
    
    document.querySelector("#wind-num").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#humidity-num").innerHTML = Math.round(response.data.main.humidity);
    document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;

    let city_name = response.data.name;
    let country_name = response.data.sys.country;
    console.log(city_name);
    console.log(country_name);
    
    
}

let apikey = "e8afbbe875eb43e7801438b2c0996358";
let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=Managua&appid=${apikey}&units=metric`;

axios.get(apiurl).then(changeData);

