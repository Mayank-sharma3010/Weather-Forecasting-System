async function getWeather() {
    let city = document.getElementById("city").value.trim();
    if(city === ""){
        document.getElementById("result").innerHTML = "⚠ Please enter a city name";
        return;
    }

    let apiKey = "API KEY HERE "; // <-- Yaha apni API key paste karo
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        // FIX: API cod check numeric me hota hai, string nahi
        if (data.cod == 404) {
            document.getElementById("result").innerHTML = "❌ City Not Found!";
            return;
        }

        let icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("result").innerHTML = `
            <img src="${icon}" class="icon">
            <h3>${data.name}</h3>
            <p>${data.weather[0].description.toUpperCase()}</p>
            <p>🌡 Temperature: <b>${data.main.temp}°C</b></p>
            <p>💧 Humidity: <b>${data.main.humidity}%</b></p>
            <p>💨 Wind: <b>${data.wind.speed} km/h</b></p>
        `;
    }
    catch (error) {
        document.getElementById("result").innerHTML = "⚠ Network Issue!";
        console.log(error);
    }
}
