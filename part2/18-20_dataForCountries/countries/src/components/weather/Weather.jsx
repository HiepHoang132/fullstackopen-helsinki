import {useEffect, useState} from "react";
import weatherService from "../../services/weather.js";
import WeatherDetails from "./WeatherDetails.jsx";

const Weather = ({capitals}) => {
    const [weatherDetails, setWeatherDetails] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        if (!capitals || capitals.length === 0) return

        Promise.all(capitals.map(c => weatherService.getWeather(c)))
            .then(setWeatherDetails)
            .catch(error => setError(error.response.data.message))
    })

    return (
        <WeatherDetails error={error} weatherDetails={weatherDetails}/>
    )
}

export default Weather