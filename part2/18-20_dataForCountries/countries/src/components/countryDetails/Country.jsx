import CountryHeader from "./CountryHeader.jsx";
import CountryCapital from "./CountryCapital.jsx";
import CountryArea from "./CountryArea.jsx";
import CountryLanguages from "./CountryLanguages.jsx";
import CountryFlag from "./CountryFlag.jsx";
import Weather from "../weather/Weather.jsx";

const Country = ({country}) => {
    return (
        <div>
            <CountryHeader commonName={country.name.common}/>
            <CountryCapital capital={country.capital}/>
            <CountryArea area={country.area}/>
            <CountryLanguages languages={Object.entries(country.languages)}/>
            <CountryFlag flag={country.flags}/>
            <Weather capitals={country.capital}/>
        </div>
    );
};

export default Country;