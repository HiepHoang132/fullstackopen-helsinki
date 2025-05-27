import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (query) => {
    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: query,
                appid: api_key,
                units: 'metric'
            },
        })
        .then(response => response.data)
}

export default { getWeather }