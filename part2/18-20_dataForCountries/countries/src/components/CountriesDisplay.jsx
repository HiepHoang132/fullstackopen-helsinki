import Country from "./countryDetails/Country.jsx";
import Countries from "./Countries.jsx";

const CountriesDisplay = ({countries}) => {
    if(!countries) return null

    return (
        <>
            {countries.length >= 10 && <p>Too many matches, specify another filter</p>}
            {countries.length > 1 && countries.length <= 10 && <Countries countries={countries}/>}
            {countries.length === 1 && <Country country={countries[0]}/>}
            {countries.length === 0 && <p>No matches found</p>}
        </>
    )
}

export default CountriesDisplay;