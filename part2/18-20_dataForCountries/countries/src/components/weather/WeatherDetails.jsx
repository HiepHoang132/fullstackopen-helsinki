const WeatherDetails = ({error, weatherDetails}) => {
    if(error) return <p style={{"color": "red"}}>{error}</p>

    return(
        <>
            {weatherDetails.map((wd, i) => {
                const {temp} = wd.main
                const {icon, description} = wd.weather[0]
                const {speed} = wd.wind

                return (
                    <div key={i}>
                        <h1>Weather in {wd.name}</h1>
                        <p>Temperature {temp} Celsius</p>
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description}></img>
                        <p>Wind {speed} m/s</p>
                    </div>
                )
            })}
        </>
    )
}

export default WeatherDetails