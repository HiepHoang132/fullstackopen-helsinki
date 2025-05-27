import {useEffect, useState} from "react";
import countryService from "./services/countries.js"
import CountryForm from "./components/form/CountryForm.jsx";

const App = () => {
    const [allCountries, setAllCountries] = useState(null)
    const [resultCountries, setResultCountries] = useState(null)

    useEffect(() => {
        countryService
            .getAll()
            .then(setAllCountries)
    }, [allCountries]);

    if(allCountries === null){
        return (
            <p>Loading data... Please wait</p>
        )
    }

    const handleQueryChange = (e) => {
        const searchQuery = e.target.value.toLowerCase()

        if(searchQuery === ''){
            setResultCountries(null)
            return
        }

        updateCountriesToShow(searchQuery)
    }
    
    const updateCountriesToShow = (searchQuery) => {
        const countriesToShow = allCountries.filter(c =>
            c.name.common.toLowerCase().includes(searchQuery))

        setResultCountries(countriesToShow)
    }

    return (
        <div>
            <CountryForm handleQueryChange={handleQueryChange} resultCountries={resultCountries}/>
        </div>
    );
};

export default App;