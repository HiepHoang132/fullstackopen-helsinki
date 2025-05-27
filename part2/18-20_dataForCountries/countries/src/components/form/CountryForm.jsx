import CountriesDisplay from "../CountriesDisplay.jsx";

const CountryForm = ({handleQueryChange, resultCountries}) => (
    <>
        <form>
            <div>
                find countries
                <input onChange={handleQueryChange}/>
            </div>
        </form>
        <CountriesDisplay countries={resultCountries}/>
    </>
)

export default CountryForm;