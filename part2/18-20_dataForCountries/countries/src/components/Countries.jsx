import {useState} from "react";
import Country from "./countryDetails/Country.jsx";

const Countries = ({countries}) => {
    const [toggleShow, setToggleShow] = useState({})

    const handleBtnClick = (countryName) => {
        setToggleShow({
            ...toggleShow,
            [countryName]: !toggleShow[countryName]
        })
    }

    return (
        countries.map((country) => {
            const name = country.name.common
            const isShown = toggleShow[name]

            return (
                <div key={country.name.common} className="countries">
                    <>
                        {country.name.common}
                        <button key={country.name.common} onClick={() => handleBtnClick(name)} className='showBtn'>
                            {toggleShow[name] ? "close" : "show"}
                        </button>
                        {isShown && <Country country={country}/>}
                    </>
                </div>
            )
        })
    )
}


export default Countries;