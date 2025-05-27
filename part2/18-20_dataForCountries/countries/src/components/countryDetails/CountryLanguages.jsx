const CountryLanguages = ({languages}) => (
    <>
        <h1>Languages</h1>
        <ul>
            {languages.map(([key, value]) =>
                <li key={key}>{value}</li>
            )}
        </ul>
    </>
)

export default CountryLanguages;