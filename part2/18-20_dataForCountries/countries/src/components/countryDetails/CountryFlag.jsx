const CountryFlag = ({flag}) => (
    <img src={flag.png}
         alt={flag.alt}
         className="flag"
    />
)

export default CountryFlag;