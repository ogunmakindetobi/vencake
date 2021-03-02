const api = {
    key: "0291e5efce57289cb5dc680ac884cf64",
    base: "https://api.openweathermap.org/data/2.5/"
}

window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(postition => {
            long = postition.coords.longitude;
            lat = postition.coords.latitude;
        })

    } else {
        h1.textContent = "Allow your location"
    }
})

// Question 1: When to use querySelector v.s. getElementById ?
const searchbox = document.getElementById('search-box-input');

// you can also just write an "anonymous"
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    console.log(event, "event")
    if (event.key === 'Enter') { // can also use event.keyCode = 13
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    let city = document.getElementById('city-container');
    city.innerText = `${weather.name}, ${weather.sys.country}`; // changes the text inside the element that we stored in city

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current  .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let app = document.getElementById('app-container')
    // if weahter is less then 23
   
    if (weather.main.temp < 23) {
        app.classList.add('cold')
    } else {
        app.classList.add('warm')
        app.classList.remove('cold')
    }

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

    let icon = document.getElementById('icon-container')
    console.log(weather.weather[0], "weather")
    icon.innerHTML = steIcons(weather.weather[0].icon, weather.weather[0].id)

}

function steIcons(icon, iconID) {
    const skycons = new skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skypcons.play();
    return skycons.set(iconID, skycons[currentIcon]);
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
};